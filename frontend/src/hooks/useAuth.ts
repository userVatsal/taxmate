import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { LoginFormData, SignupFormData } from '@/lib/validations/auth'
import { Session } from '@supabase/supabase-js'

interface AuthError {
  message: string
  field?: string
}

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<AuthError | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const login = async (data: LoginFormData) => {
    try {
      setIsLoading(true)
      setError(null)
      
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })

      if (error) throw error

      router.push('/dashboard')
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : 'An error occurred',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (data: SignupFormData) => {
    try {
      setIsLoading(true)
      setError(null)
      
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      })

      if (error) throw error

      router.push('/login')
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : 'An error occurred',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return {
    session,
    login,
    signup,
    logout,
    isLoading,
    error,
  }
} 