"use client"

import { useState, useEffect, createContext, useContext } from "react"
import { createClient } from "../../lib/supabase/client"
import type { User } from "@supabase/supabase-js"

interface AuthUser extends User {
  firstName?: string
  lastName?: string
  subscriptionStatus?: "free" | "premium" | "pro"
}

interface AuthContextType {
  user: AuthUser | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (userData: RegisterData) => Promise<void>
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
}

interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function useAuthState() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const supabase = createClient()

  useEffect(() => {
    const getInitialUser = async () => {
      const {
        data: { user },
        error
      } = await supabase.auth.getUser()

      if (!error && user) {
        setUser(user as AuthUser)
      } else {
        setUser(null)
      }
      setIsLoading(false)
    }

    getInitialUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        // Use getUser for security when we have a session
        const { data: { user } } = await supabase.auth.getUser()
        setUser((user as AuthUser) || null)
      } else {
        setUser(null)
      }
      setIsLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error
    } catch (error) {
      throw new Error("Ошибка входа в систему")
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: RegisterData) => {
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            first_name: userData.firstName,
            last_name: userData.lastName,
          },
        },
      })

      if (error) throw error
    } catch (error) {
      throw new Error("Ошибка регистрации")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })
      if (error) throw error
    } catch (error) {
      throw new Error("Ошибка восстановления пароля")
    }
  }

  return {
    user,
    isLoading,
    login,
    register,
    logout,
    resetPassword,
  }
}
