"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Brain, Clock, Users, Star, ArrowRight, CheckCircle, Loader2, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { createClient } from "../../lib/supabase/client"
import ProfileHeader from '@/components/ProfileHeader'
import Footer from '@/components/Footer'

interface Test {
  id: string
  title: string
  description: string
  duration: string
  questions: number
  category: string
  difficulty: string
  isFree: boolean
  completions: number
  rating: number
  features: string[]
}

export default function TestsPage() {
  const [tests, setTests] = useState<Test[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [checkingRole, setCheckingRole] = useState(true)

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (user) {
          const { data: userData } = await supabase
            .from('users')
            .select('role')
            .eq('id', user.id)
            .single()

          setUserRole(userData?.role || 'client')
        } else {
          setUserRole('client') // Для неавторизованных пользователей
        }
      } catch (error) {
        console.error('Error checking user role:', error)
        setUserRole('client')
      } finally {
        setCheckingRole(false)
      }
    }

    checkUserRole()
  }, [])

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await fetch('/api/tests')
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch tests')
        }

        setTests(data.tests)
      } catch (err) {
        console.error('Error fetching tests:', err)
        setError(err instanceof Error ? err.message : 'Failed to load tests')
        // Fallback to hardcoded data if API fails
        setTests([
          {
            id: "depression-anxiety",
            title: "Тест на депрессию и тревожность",
            description: "Научно обоснованный тест для оценки уровня депрессии и тревожных расстройств",
            duration: "10-15 мин",
            questions: 21,
            category: "Эмоциональное состояние",
            difficulty: "Легкий",
            isFree: true,
            completions: 15420,
            rating: 4.8,
            features: [
              "Основан на шкале Бека",
              "Детальный анализ результатов",
              "Персональные рекомендации",
              "Отслеживание динамики",
            ],
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchTests()
  }, [])

  if (checkingRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          <span>Проверка доступа...</span>
        </div>
      </div>
    )
  }

  // Проверяем роль пользователя - тесты доступны только клиентам
  if (userRole === 'therapist') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8">
            <AlertTriangle className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Доступ ограничен</h2>
            <p className="text-gray-600 mb-4">
              Тесты предназначены для клиентов. Как терапевт, вы можете управлять своими сессиями и профилем.
            </p>
            <Button asChild>
              <Link href="/therapist-dashboard">Перейти в кабинет терапевта</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          <span>Загрузка тестов...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* ProfileHeader */}
      <ProfileHeader />

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-4">
            Научно обоснованные тесты
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-balance">
            Психологические тесты для самопознания
          </h1>
          <p className="text-xl text-gray-600 mb-8 text-pretty max-w-2xl mx-auto">
            Пройдите профессиональные психологические тесты, получите детальный анализ и персональные рекомендации от
            экспертов
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>Первый тест бесплатно</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>Научная основа</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>Конфиденциально</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tests Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          {error && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
              <p className="text-yellow-800 text-sm">⚠️ {error}</p>
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-8">
            {tests.map((test, index) => (
              <Card
                key={test.id}
                className="relative overflow-hidden group hover:shadow-xl transition-all duration-300"
              >
                {test.isFree && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-green-600 hover:bg-green-700">Бесплатно</Badge>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                <CardHeader className="relative pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Brain className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{test.rating}</span>
                    </div>
                  </div>

                  <CardTitle className="text-xl mb-2">{test.title}</CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed">{test.description}</CardDescription>

                  <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{test.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{test.completions.toLocaleString()} прошли</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="relative">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Категория:</span>
                      <Badge variant="outline">{test.category}</Badge>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Вопросов:</span>
                      <span className="font-medium">{test.questions}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Сложность:</span>
                      <span className="font-medium">{test.difficulty}</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Что вы получите:</h4>
                    <ul className="space-y-2">
                      {test.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button asChild className="w-full mt-6 h-11">
                    <Link href={`/tests/${test.id}`}>
                      {test.isFree ? "Пройти бесплатно" : "Начать тест"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Готовы узнать больше о себе?</h2>
          <p className="text-gray-600 mb-8">
            Зарегистрируйтесь, чтобы получить доступ ко всем тестам, сохранить результаты и отслеживать свой прогресс
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/auth/register">
                Создать аккаунт
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/tests/depression-anxiety">Попробовать бесплатный тест</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
