"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  email: string
  name: string
  companyName?: string
  vatNumber?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (
    email: string,
    password: string,
    name: string,
    companyName?: string,
    vatNumber?: string
  ) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check for existing session
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      // TODO: Implement session check with your backend
      const session = localStorage.getItem("session")
      if (session) {
        const userData = JSON.parse(session)
        setUser(userData)
      }
    } catch (err) {
      console.error("Auth check failed:", err)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      setError(null)
      // TODO: Implement actual login with your backend
      // This is a mock implementation
      const mockUser = {
        id: "1",
        email,
        name: "Test User",
      }
      setUser(mockUser)
      localStorage.setItem("session", JSON.stringify(mockUser))
      router.push("/dashboard")
    } catch (err) {
      setError("Invalid email or password")
      throw err
    }
  }

  const register = async (
    email: string,
    password: string,
    name: string,
    companyName?: string,
    vatNumber?: string
  ) => {
    try {
      setError(null)
      // TODO: Implement actual registration with your backend
      // This is a mock implementation
      const mockUser = {
        id: "1",
        email,
        name,
        companyName,
        vatNumber,
      }
      setUser(mockUser)
      localStorage.setItem("session", JSON.stringify(mockUser))
      router.push("/dashboard")
    } catch (err) {
      setError("Registration failed")
      throw err
    }
  }

  const logout = async () => {
    try {
      setError(null)
      // TODO: Implement actual logout with your backend
      setUser(null)
      localStorage.removeItem("session")
      router.push("/login")
    } catch (err) {
      setError("Logout failed")
      throw err
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
      }}
    >
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