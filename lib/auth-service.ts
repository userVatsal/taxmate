import { createHash } from 'crypto'

export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'user'
  companyName?: string
  vatNumber?: string
  createdAt: string
  updatedAt: string
}

export interface AuthResponse {
  user: User
  token: string
}

export class AuthService {
  private static instance: AuthService
  private users: User[] = []
  private sessions: Map<string, { userId: string; expiresAt: Date }> = new Map()

  private constructor() {
    // Initialize with mock admin user
    this.users.push({
      id: '1',
      email: 'admin@taxmate.com',
      name: 'Admin User',
      role: 'admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  private hashPassword(password: string): string {
    return createHash('sha256').update(password).digest('hex')
  }

  public async register(
    email: string,
    password: string,
    name: string,
    companyName?: string,
    vatNumber?: string
  ): Promise<AuthResponse> {
    // Check if user already exists
    if (this.users.some(user => user.email === email)) {
      throw new Error('User already exists')
    }

    // Create new user
    const user: User = {
      id: `U${Date.now()}`,
      email,
      name,
      role: 'user',
      companyName,
      vatNumber,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // Store user (in a real app, we'd store the hashed password in a database)
    this.users.push(user)

    // Generate session token
    const token = this.generateToken(user)

    return { user, token }
  }

  public async login(email: string, password: string): Promise<AuthResponse> {
    // Find user
    const user = this.users.find(u => u.email === email)
    if (!user) {
      throw new Error('Invalid credentials')
    }

    // In a real app, we'd verify the password hash
    // For now, we'll just check if the password matches the email
    if (this.hashPassword(password) !== this.hashPassword(email)) {
      throw new Error('Invalid credentials')
    }

    // Generate session token
    const token = this.generateToken(user)

    return { user, token }
  }

  public async validateToken(token: string): Promise<User | null> {
    const session = this.sessions.get(token)
    if (!session) {
      return null
    }

    if (session.expiresAt < new Date()) {
      this.sessions.delete(token)
      return null
    }

    const user = this.users.find(u => u.id === session.userId)
    return user || null
  }

  public async logout(token: string): Promise<void> {
    this.sessions.delete(token)
  }

  public async updateUser(
    userId: string,
    updates: Partial<Omit<User, 'id' | 'email' | 'role' | 'createdAt'>>
  ): Promise<User> {
    const userIndex = this.users.findIndex(u => u.id === userId)
    if (userIndex === -1) {
      throw new Error('User not found')
    }

    const updatedUser = {
      ...this.users[userIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    this.users[userIndex] = updatedUser
    return updatedUser
  }

  private generateToken(user: User): string {
    const token = `token_${Date.now()}_${Math.random().toString(36).substr(2)}`
    const expiresAt = new Date()
    expiresAt.setHours(expiresAt.getHours() + 24) // Token expires in 24 hours

    this.sessions.set(token, {
      userId: user.id,
      expiresAt,
    })

    return token
  }
} 