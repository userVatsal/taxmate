"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface User {
  id: string
  email: string
  companyName: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, companyName: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        // TODO: Implement actual auth check
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("Auth check failed:", error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      // TODO: Implement actual login logic
      const mockUser = {
        id: "1",
        email,
        companyName: "Test Company",
      }
      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    }
  }

  const register = async (email: string, password: string, companyName: string) => {
    try {
      // TODO: Implement actual registration logic
      const mockUser = {
        id: "1",
        email,
        companyName,
      }
      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))
    } catch (error) {
      console.error("Registration failed:", error)
      throw error
    }
  }

  const logout = async () => {
    try {
      // TODO: Implement actual logout logic
      setUser(null)
      localStorage.removeItem("user")
    } catch (error) {
      console.error("Logout failed:", error)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
} 