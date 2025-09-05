import Link from "next/link"
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import { ArrowRight, Brain, Users, Package } from "lucide-react"
import ProfileHeader from '../../src/components/ProfileHeader'
import Footer from '../../src/components/Footer'

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* ProfileHeader */}
      <ProfileHeader />

      <div className="container mx-auto px-4 py-11">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-14 mb-6 text-balance">
            Как это работает
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
            Три простых пути к улучшению вашего ментального здоровья. Выберите тот, который подходит именно вам.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Path 1: Tests */}
          <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-blue-500 to-blue-600 opacity-5 group-hover:opacity-10 transition-opacity" />
            <CardContent className="relative z-10 p-8">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mb-6 mx-auto">
                <Brain className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Пройти тест</h3>

              <div className="space-y-4 mb-8">
                {[
                  "Пройдите краткий психологический тест",
                  "Получите персональные рекомендации",
                  "Выберите материалы или специалиста",
                  "Оформите покупку или бронирование",
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-600 text-sm font-semibold">{i + 1}</span>
                    </div>
                    <p className="text-gray-600">{text}</p>
                  </div>
                ))}
              </div>

              <Button asChild className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 flex items-center justify-center gap-2">
                <Link href="/tests">
                  Перейти к тестам
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Path 2: Therapists */}
          <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-green-500 to-green-600 opacity-5 group-hover:opacity-10 transition-opacity" />
            <CardContent className="relative z-10 p-8">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-6 mx-auto">
                <Users className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Найти специалиста</h3>

              <div className="space-y-4 mb-8">
                {[
                  "Найдите подходящего специалиста",
                  "Просмотрите профиль и видеопрезентацию",
                  "Выберите удобный слот в календаре",
                  "Оформите бронирование и оплату",
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-600 text-sm font-semibold">{i + 1}</span>
                    </div>
                    <p className="text-gray-600">{text}</p>
                  </div>
                ))}
              </div>

              <Button asChild className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 flex items-center justify-center gap-2">
                <Link href="/therapists">
                  Наши специалисты
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Path 3: Packages */}
          <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-purple-500 to-purple-600 opacity-5 group-hover:opacity-10 transition-opacity" />
            <CardContent className="relative z-10 p-8">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full mb-6 mx-auto">
                <Package className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Выбрать пакет</h3>

              <div className="space-y-4 mb-8">
                {[
                  "Выберите подходящий пакет услуг",
                  "Получите доступ к материалам",
                  "При необходимости - консультации",
                  "Управляйте всем в личном кабинете",
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-purple-600 text-sm font-semibold">{i + 1}</span>
                    </div>
                    <p className="text-gray-600">{text}</p>
                  </div>
                ))}
              </div>

              <Button asChild className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 flex items-center justify-center gap-2">
                <Link href="/packages">
                  Пакеты услуг
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Не знаете, с чего начать?</h2>
            <p className="text-gray-600 mb-6 text-pretty">
              Рекомендуем начать с бесплатного теста - это поможет лучше понять ваши потребности и получить персональные рекомендации по дальнейшим шагам.
            </p>
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
              <Link href="/tests">Пройти бесплатный тест</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}