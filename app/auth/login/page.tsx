"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "../../../lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Separator } from "../../../components/ui/separator"
import { Brain, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error

      // Проверяем и создаем запись в таблице users, если её нет
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        // Проверяем, существует ли пользователь в нашей таблице
        const { data: existingUser } = await supabase
          .from('users')
          .select('id')
          .eq('id', user.id)
          .single()

        // Если пользователя нет в таблице, создаем запись
        if (!existingUser) {
          const { error: userInsertError } = await supabase
            .from('users')
            .insert({
              id: user.id,
              email: user.email,
              first_name: user.user_metadata?.first_name || '',
              last_name: user.user_metadata?.last_name || '',
              phone: user.user_metadata?.phone || '',
              role: user.user_metadata?.user_role || 'client',
              is_verified: false
            })

          if (userInsertError) {
            console.error('Error creating user record on login:', userInsertError)
            // Не выбрасываем ошибку, продолжаем
          }
        }

        // Получаем роль пользователя для правильного редиректа
        const { data: userData } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .single()

        const userRole = userData?.role || 'client'

        // Редирект в зависимости от роли
        if (userRole === 'therapist') {
          router.push("/therapist-dashboard")
        } else if (userRole === 'admin') {
          router.push("/admin")
        } else {
          router.push("/dashboard")
        }
      } else {
        router.push("/dashboard")
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Произошла ошибка при входе")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to home */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Вернуться на главную
        </Link>

        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Brain className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-semibold text-gray-900">Добро пожаловать</CardTitle>
            <CardDescription className="text-gray-600">Войдите в свой аккаунт MindCare</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form className="space-y-4" onSubmit={handleLogin}>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="h-11"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Пароль
                  </Label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Забыли пароль?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="h-11"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</div>}

              <Button type="submit" className="w-full h-11 bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                {isLoading ? "Вход..." : "Войти"}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">или</span>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Нет аккаунта?{" "}
                <Link href="/auth/register" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                  Зарегистрироваться
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <p className="text-xs text-gray-500 text-center mt-6">
          Входя в систему, вы соглашаетесь с нашими{" "}
          <Link href="/terms" className="text-blue-600 hover:underline">
            Условиями использования
          </Link>{" "}
          и{" "}
          <Link href="/privacy" className="text-blue-600 hover:underline">
            Политикой конфиденциальности
          </Link>
        </p>
      </div>
    </div>
  )
}
