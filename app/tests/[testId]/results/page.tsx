"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../components/ui/card"
import { Button } from "../../../../components/ui/button"
import { Badge } from "../../../../components/ui/badge"
import { Progress } from "../../../../components/ui/progress"
import { Brain, ArrowLeft, Download, Share2, Calendar, TrendingUp, AlertTriangle, CheckCircle, Star, Clock, MapPin, Languages, User, Trash2 } from "lucide-react"
import Link from "next/link"
import { sendTestResults } from "../../../../lib/email-service"
import ProfileHeader from '@/components/ProfileHeader'
import Footer from '@/components/Footer'

const getResultAnalysis = (score: number, scoringLogic?: any) => {
  // Use database scoring logic if available
  if (scoringLogic?.levels) {
    const level = scoringLogic.levels.find((l: any) => score >= l.min && score <= l.max)
    if (level) {
      return {
        level: level.level,
        color: level.level === "Минимальный" ? "bg-green-600" :
               level.level === "Легкий" ? "bg-yellow-500" :
               level.level === "Умеренный" ? "bg-orange-500" : "bg-red-600",
        description: level.description,
        recommendations: [
          "Продолжайте поддерживать здоровый образ жизни",
          "Регулярно занимайтесь физической активностью",
          "Поддерживайте социальные связи",
          "Практикуйте техники релаксации",
        ],
        icon: level.level === "Минимальный" ? CheckCircle : AlertTriangle,
        iconColor: level.level === "Минимальный" ? "text-green-600" :
                   level.level === "Легкий" ? "text-yellow-600" :
                   level.level === "Умеренный" ? "text-orange-600" : "text-red-600",
      }
    }
  }

  // Fallback to hardcoded logic
  if (score <= 6) {
    return {
      level: "Минимальный",
      color: "bg-green-600",
      description: "Ваши результаты указывают на минимальный уровень депрессивных и тревожных симптомов.",
      recommendations: [
        "Продолжайте поддерживать здоровый образ жизни",
        "Регулярно занимайтесь физической активностью",
        "Поддерживайте социальные связи",
        "Практикуйте техники релаксации",
      ],
      icon: CheckCircle,
      iconColor: "text-green-600",
    }
  } else if (score <= 13) {
    return {
      level: "Легкий",
      color: "bg-yellow-500",
      description: "Обнаружены легкие признаки депрессии или тревожности, которые могут влиять на повседневную жизнь.",
      recommendations: [
        "Обратите внимание на режим сна и питания",
        "Рассмотрите возможность консультации с психологом",
        "Изучите техники управления стрессом",
        "Ведите дневник настроения",
      ],
      icon: AlertTriangle,
      iconColor: "text-yellow-600",
    }
  } else if (score <= 20) {
    return {
      level: "Умеренный",
      color: "bg-orange-500",
      description: "Результаты указывают на умеренный уровень депрессивных или тревожных симптомов.",
      recommendations: [
        "Настоятельно рекомендуется консультация специалиста",
        "Рассмотрите возможность психотерапии",
        "Обратитесь к врачу для исключения медицинских причин",
        "Избегайте алкоголя и наркотических веществ",
      ],
      icon: AlertTriangle,
      iconColor: "text-orange-600",
    }
  } else {
    return {
      level: "Высокий",
      color: "bg-red-600",
      description: "Результаты указывают на высокий уровень депрессивных или тревожных симптомов, требующих внимания.",
      recommendations: [
        "Немедленно обратитесь к специалисту по ментальному здоровью",
        "Рассмотрите возможность медикаментозного лечения",
        "Обеспечьте себе поддержку близких людей",
        "При мыслях о самоповреждении обратитесь за экстренной помощью",
      ],
      icon: AlertTriangle,
      iconColor: "text-red-600",
    }
  }
}

interface Therapist {
  id: string
  name: string
  title: string
  specializations: string[]
  experience: number
  rating: number
  reviews_count: number
  hourly_rate: number
  location: string
  languages: string[]
  approach: string
  available_today: boolean
  next_available: string
  total_sessions: number
  image: string
  bio: string
}

interface ResultsPageProps {
  params: {
    testId: string
  }
}

// Removed helper functions for calendar and booking - now using separate booking page

export default function ResultsPage({ params }: ResultsPageProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const resultId = searchParams.get("resultId")
  const score = Number.parseInt(searchParams.get("score") || "0")
  const maxScore = 15 // 5 questions × 3 max points each
  const [emailSent, setEmailSent] = useState(false)
  const [therapists, setTherapists] = useState<Therapist[]>([])
  const [loadingTherapists, setLoadingTherapists] = useState(true)
  // Removed booking modal state variables - now using separate booking page
  const [savedResult, setSavedResult] = useState<any>(null)
  const [loadingResult, setLoadingResult] = useState(false)
  const [testData, setTestData] = useState<any>(null)
  const [deleting, setDeleting] = useState(false)

  // Determine if we're viewing a saved result or new result
  const isViewingSaved = !!resultId
  const currentScore = savedResult ? savedResult.score : score
  const percentage = Math.round((currentScore / maxScore) * 100)

  const analysis = getResultAnalysis(currentScore, testData?.scoringLogic)
  const IconComponent = analysis.icon

  useEffect(() => {
    if (isViewingSaved && resultId) {
      const fetchSavedResult = async () => {
        setLoadingResult(true)
        try {
          const response = await fetch(`/api/test-results/${resultId}`)
          if (response.ok) {
            const data = await response.json()
            setSavedResult(data.result)
          } else {
            console.error("Failed to fetch saved result")
          }
        } catch (error) {
          console.error("Error fetching saved result:", error)
        } finally {
          setLoadingResult(false)
        }
      }
      fetchSavedResult()
    }
  }, [isViewingSaved, resultId])

  useEffect(() => {
    // Only save and send email for new results, not when viewing saved results
    if (!isViewingSaved) {
      const saveTestResult = async () => {
        try {
          // Save test result to database
          const saveResponse = await fetch(`/api/tests/${params.testId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              answers: {}, // We don't have individual answers in this simplified version
              score: score,
              resultText: analysis.description,
              recommendations: analysis.recommendations.join('\n'),
            }),
          })

          if (saveResponse.ok) {
            console.log("[v0] Test result saved successfully")
          } else {
            console.error("[v0] Failed to save test result:", await saveResponse.text())
          }
        } catch (error) {
          console.error("[v0] Error saving test result:", error)
        }
      }

      const sendResultsEmail = async () => {
        try {
          // Mock user data - replace with actual user data
          const userEmail = "user@example.com"
          const userName = "Пользователь"
          const testName = "Тест на депрессию и тревожность"
          const resultsUrl = `${window.location.origin}/tests/${params.testId}/results?score=${score}`

          await sendTestResults(userEmail, userName, testName, `${score}/${maxScore}`, analysis.description, resultsUrl)

          setEmailSent(true)
          console.log("[v0] Test results email sent successfully")
        } catch (error) {
          console.error("[v0] Failed to send test results email:", error)
        }
      }

      saveTestResult()
      sendResultsEmail()
    }
  }, [score, analysis.description, analysis.recommendations, params.testId, isViewingSaved])

  useEffect(() => {
    const fetchTestData = async () => {
      try {
        const response = await fetch(`/api/tests/${params.testId}`)
        if (response.ok) {
          const data = await response.json()
          setTestData(data.test)
        }
      } catch (error) {
        console.error('Error fetching test data:', error)
      }
    }

    fetchTestData()
  }, [params.testId])

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        console.log('Fetching therapists for results page...')
        const response = await fetch('/api/therapists')
        const data = await response.json()

        console.log('Therapists API response:', {
          ok: response.ok,
          status: response.status,
          therapistsCount: data.therapists?.length || 0,
          message: data.therapists?.length > 0 ? 'Real therapists found' : 'No real therapists found'
        })

        if (response.ok && data.therapists) {
          setTherapists(data.therapists) // Show all therapists
          console.log('Set real therapists in state:', data.therapists.length)
        } else {
          console.error('Therapists API error:', data)
        }
      } catch (error) {
        console.error('Error fetching therapists:', error)
      } finally {
        setLoadingTherapists(false)
      }
    }

    fetchTherapists()
  }, [])

  const handleDeleteResult = async () => {
    if (!resultId) return

    if (!confirm('Вы уверены, что хотите удалить этот результат теста? Это действие нельзя отменить.')) {
      return
    }

    setDeleting(true)
    try {
      const response = await fetch(`/api/test-results/${resultId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        alert('Результат теста успешно удален')
        router.push('/dashboard') // Redirect to dashboard
      } else {
        const error = await response.json()
        alert(`Ошибка при удалении: ${error.error}`)
      }
    } catch (error) {
      console.error('Error deleting test result:', error)
      alert('Произошла ошибка при удалении теста')
    } finally {
      setDeleting(false)
    }
  }

  // Removed handleBookAppointment function - now using separate booking page

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* ProfileHeader */}
      <ProfileHeader />

      <div className="container mx-auto px-4 py-8 mt-16 max-w-4xl">
        {/* Results Header */}
        <div className="text-center mb-8">
          {/* Avatar will be added here if therapist profile image exists */}
          {savedResult?.therapist_profile_image ? (
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <img
                src={savedResult.therapist_profile_image}
                alt="Therapist"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="h-8 w-8 text-blue-600" />
            </div>
          )}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Результаты теста {savedResult ? savedResult.psychological_tests?.title : "на депрессию и тревожность"}
          </h1>
          <p className="text-gray-600">
            {isViewingSaved ? "Сохраненные результаты теста" : "Ваш персональный анализ готов"}
          </p>

          {emailSent && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-4 max-w-md mx-auto">
              <p className="text-green-800 text-sm">✓ Результаты отправлены на ваш email</p>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Main Results */}
          <div className="lg:col-span-1 space-y-6 w-full">
            {/* Score Card */}
            <Card className="shadow-lg w-full">
              <CardHeader className="text-center pb-6">
                <div className="flex items-center justify-center mb-4">
                  <IconComponent className={`h-12 w-12 ${analysis.iconColor}`} />
                </div>
                <CardTitle className="text-2xl mb-2">Уровень: {analysis.level}</CardTitle>
                <CardDescription className="text-lg">{analysis.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    {score} / {maxScore}
                  </div>
                  <Progress value={percentage} className="h-3 mb-2 w-full" />
                  <p className="text-sm text-gray-600">{percentage}% от максимального значения</p>
                </div>

                <div className="flex items-center justify-center">
                  <Badge className={`${analysis.color} text-white px-4 py-2 text-lg`}>{analysis.level} уровень</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="shadow-lg w-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  Персональные рекомендации
                </CardTitle>
                <CardDescription>Основанные на ваших результатах советы для улучшения самочувствия</CardDescription>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {(savedResult?.recommendations ? savedResult.recommendations.split('\n') : analysis.recommendations).map((recommendation, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-semibold text-blue-600">{index + 1}</span>
                      </div>
                      <span className="text-gray-700 leading-relaxed">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Emergency Notice */}
            {score > 14 && (
              <Card className="shadow-lg border-red-200 bg-red-50 w-full">
                <CardHeader>
                  <CardTitle className="text-red-800 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Важное уведомление
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-red-700 mb-4">
                    Если у вас есть мысли о самоповреждении или суициде, немедленно обратитесь за помощью:
                  </p>
                  <div className="space-y-2 text-sm">
                    <div>
                      📞 <strong>Телефон доверия:</strong> 7333 (бесплатно с мобильных)
                    </div>
                    <div>
                      🚨 <strong>Экстренная помощь:</strong> 102
                    </div>
                    <div>
                      💬 <strong>Онлайн-чат:</strong> psyhelp.ua
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6 w-full lg:col-span-1">
            {/* Actions */}
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-lg">Действия</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Скачать PDF
                </Button>
                <Button className="w-full" variant="outline">
                  <Share2 className="mr-2 h-4 w-4" />
                  Поделиться
                </Button>
                {isViewingSaved && (
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={handleDeleteResult}
                    disabled={deleting}
                    style={{ color: '#dc2626', borderColor: '#dc2626' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#fef2f2'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent'
                    }}
                  >
                    {deleting ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600 mr-2"></div>
                    ) : (
                      <Trash2 className="mr-2 h-4 w-4" />
                    )}
                    Удалить результат
                  </Button>
                )}
                <Button asChild className="w-full" variant="outline">
                  <Link href="/therapists">
                    <Calendar className="mr-2 h-4 w-4" />
                    Записаться к специалисту
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-lg">Следующие шаги</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Найти терапевта</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Работа с профессионалом поможет разработать индивидуальный план лечения
                  </p>
                  <Button asChild size="sm" className="w-full">
                    <Link href="/therapists">Найти специалиста</Link>
                  </Button>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Пройти другие тесты</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Получите более полную картину своего ментального здоровья
                  </p>
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link href="/tests">Все тесты</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Therapist Booking Section */}
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Записаться к терапевту
                </CardTitle>
                <CardDescription>
                  На основе ваших результатов рекомендуем обратиться к специалисту для профессиональной помощи
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {loadingTherapists ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span className="ml-2">Загрузка терапевтов...</span>
                  </div>
                ) : therapists.length > 0 ? (
                  <div className="space-y-4 text-left">
                    {therapists.map((therapist) => (
                      <Card
                        key={therapist.id}
                        className="border border-gray-200 w-full"
                      >
                        <CardContent className="p-4 w-full">
                          <div className="flex items-start gap-4 w-full">
                            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                              {therapist.image ? (
                                <img
                                  src={therapist.image}
                                  alt={therapist.name}
                                  className="w-full h-full object-cover rounded-full"
                                />
                              ) : (
                                <User className="h-8 w-8 text-gray-600" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between w-full mb-2">
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-semibold text-gray-900">{therapist.name}</h4>
                                  <p className="text-sm text-gray-600">{therapist.title}</p>
                                </div>
                                <div className="text-right flex-shrink-0 ml-4">
                                  <div className="text-lg font-semibold text-gray-900">
                                    {therapist.hourly_rate ? `${therapist.hourly_rate}₴/час` : 'Цена не указана'}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span>{therapist.rating.toFixed(1)}</span>
                                  <span>({therapist.reviews_count} отзывов)</span>
                                </div>
                                <span className="text-gray-400">•</span>
                                <span className="whitespace-nowrap">{therapist.experience} лет опыта</span>
                              </div>

                              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />
                                  <span>{therapist.location}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  <span>{therapist.next_available}</span>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                                <Languages className="h-4 w-4" />
                                <span>{therapist.languages.join(', ')}</span>
                              </div>

                              <div className="flex flex-wrap gap-1 mb-4">
                                {therapist.specializations.slice(0, 3).map((spec, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {spec}
                                  </Badge>
                                ))}
                              </div>

                              <div className="flex gap-2 w-full">
                                <Button
                                  size="sm"
                                  className="flex-1"
                                  onClick={() => router.push(`/therapists/${therapist.id}`)}
                                >
                                  Записаться
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    <div className="text-center pt-4">
                      <Button variant="outline" asChild className="w-full">
                        <Link href="/therapists">
                          Посмотреть всех терапевтов
                          <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-600 mb-2">Пока нет зарегистрированных терапевтов</p>
                    <p className="text-sm text-gray-500">Станьте первым терапевтом на платформе!</p>
                    <div className="flex flex-col sm:flex-row gap-2 mt-4 justify-center">
                      <Button asChild className="flex-1 sm:flex-initial">
                        <Link href="/auth/register">Зарегистрироваться как терапевт</Link>
                      </Button>
                      <Button variant="outline" asChild className="flex-1 sm:flex-initial">
                        <Link href="/therapists">Посмотреть позже</Link>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Disclaimer */}
            <Card className="bg-gray-50 w-full">
              <CardContent className="pt-6">
                <p className="text-xs text-gray-600 leading-relaxed">
                  <strong>Важно:</strong> Результаты теста носят информационный характер и не являются медицинским
                  диагнозом. Для получения профессиональной помощи обратитесь к квалифицированному специалисту.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Removed booking modal - now using separate booking page */}

      {/* Footer */}
      <Footer />
    </div>
  )
}
