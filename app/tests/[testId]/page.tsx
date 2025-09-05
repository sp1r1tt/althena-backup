"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Badge } from "../../../components/ui/badge"
import { Progress } from "../../../components/ui/progress"
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group"
import { Label } from "../../../components/ui/label"
import { Brain, ArrowLeft, ArrowRight, Clock, AlertCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import ProfileHeader from '@/components/ProfileHeader'
import Footer from '@/components/Footer'

interface TestData {
  title: string
  description: string
  duration: string
  isFree: boolean
  questions: Array<{
    id: number
    text: string
    options: Array<{
      value: number
      text: string
    }>
  }>
}

interface TestPageProps {
  params: {
    testId: string
  }
}

const getResultAnalysis = (score: number) => {
  if (score <= 4) {
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
      icon: "CheckCircle",
      iconColor: "text-green-600",
    }
  } else if (score <= 9) {
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
      icon: "AlertTriangle",
      iconColor: "text-yellow-600",
    }
  } else if (score <= 14) {
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
      icon: "AlertTriangle",
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
      icon: "AlertTriangle",
      iconColor: "text-red-600",
    }
  }
}

export default function TestPage({ params }: TestPageProps) {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [isStarted, setIsStarted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(15 * 60) // 15 minutes in seconds
  const [test, setTest] = useState<TestData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await fetch(`/api/tests/${params.testId}`)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Test not found')
        }

        setTest(data.test)
      } catch (err) {
        console.error('Error fetching test:', err)
        setError(err instanceof Error ? err.message : 'Failed to load test')
      } finally {
        setLoading(false)
      }
    }

    fetchTest()
  }, [params.testId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          <span>Загрузка теста...</span>
        </div>
      </div>
    )
  }

  if (!test) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <CardTitle>Тест не найден</CardTitle>
            <CardDescription>Запрашиваемый тест не существует или временно недоступен</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/tests">Вернуться к тестам</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: Number.parseInt(value),
    }))
  }

  const handleNext = () => {
    if (currentQuestion < test.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      // Complete test and redirect to results
      const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0)
      router.push(`/tests/${params.testId}/results?score=${totalScore}`)
    }
  }

  const handleCompleteTest = () => {
    const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0)
    // Redirect to results - saving is handled in the results page
    router.push(`/tests/${params.testId}/results?score=${totalScore}`)
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const progress = ((currentQuestion + 1) / test.questions.length) * 100
  const currentQ = test.questions[currentQuestion]
  const isAnswered = answers[currentQ.id] !== undefined

  if (!isStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        {/* ProfileHeader */}
        <ProfileHeader />

        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
          <Card className="max-w-2xl w-full shadow-lg">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-blue-600" />
              </div>
              {test.isFree && <Badge className="bg-green-600 hover:bg-green-700 mb-4 mx-auto">Бесплатный тест</Badge>}
              <CardTitle className="text-2xl mb-2">{test.title}</CardTitle>
              <CardDescription className="text-lg">{test.description}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <Clock className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-sm text-gray-600">Время</div>
                  <div className="font-semibold">{test.duration}</div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <Brain className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <div className="text-sm text-gray-600">Вопросов</div>
                  <div className="font-semibold">{test.questions.length}</div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <AlertCircle className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                  <div className="text-sm text-gray-600">Точность</div>
                  <div className="font-semibold">Высокая</div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">Важная информация:</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Отвечайте честно и не думайте слишком долго над ответами</li>
                  <li>• Тест основан на научных методиках и дает точные результаты</li>
                  <li>• Ваши данные полностью конфиденциальны</li>
                  <li>• Результаты не являются медицинским диагнозом</li>
                </ul>
              </div>

              <Button onClick={() => setIsStarted(true)} className="w-full h-12 text-lg">
                Начать тест
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
  
        {/* Footer */}
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* ProfileHeader */}
      <ProfileHeader />

      {/* Progress section */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Link href="/tests" className="text-gray-600 hover:text-blue-600 transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="font-semibold text-gray-900">{test.title}</h1>
                <p className="text-sm text-gray-600">
                  Вопрос {currentQuestion + 1} из {test.questions.length}
                </p>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <Clock className="h-4 w-4 inline mr-1" />
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      <div className="flex items-center justify-center min-h-[calc(100vh-120px)] p-4">
        <Card className="max-w-2xl w-full shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl leading-relaxed">{currentQ.text}</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <RadioGroup
              value={answers[currentQ.id]?.toString() || ""}
              onValueChange={(value) => handleAnswerChange(currentQ.id, value)}
            >
              {currentQ.options.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <RadioGroupItem value={option.value.toString()} id={`option-${option.value}`} />
                  <Label htmlFor={`option-${option.value}`} className="flex-1 cursor-pointer leading-relaxed">
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex items-center justify-between pt-6">
              <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Назад
              </Button>

              <Button onClick={handleNext} disabled={!isAnswered} className="min-w-[120px]">
                {currentQuestion === test.questions.length - 1 ? "Завершить" : "Далее"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
