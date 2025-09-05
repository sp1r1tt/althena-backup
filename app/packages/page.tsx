import Link from "next/link"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Check, Star, Users, BookOpen, Video, MessageCircle } from "lucide-react"
import ProfileHeader from '@/components/ProfileHeader'
import Footer from '@/components/Footer'

export default function PackagesPage() {
  const packages = [
    {
      id: "basic",
      name: "Базовый",
      price: 1200,
      period: "месяц",
      description: "Идеально для начала работы с собой",
      popular: false,
      features: [
        "Доступ ко всем психологическим тестам",
        "Персональные рекомендации",
        "Библиотека материалов (50+ статей)",
        "Трекер настроения",
        "Email поддержка",
      ],
      icon: BookOpen,
      gradient: "from-blue-500 to-blue-600",
    },
    {
      id: "premium",
      name: "Премиум",
      price: 2400,
      period: "месяц",
      description: "Комплексная поддержка вашего развития",
      popular: true,
      features: [
        "Все возможности Базового пакета",
        "2 консультации с психологом в месяц",
        "Видеокурсы и медитации",
        "Персональный план развития",
        "Приоритетная поддержка",
        "Групповые сессии (онлайн)",
      ],
      icon: Users,
      gradient: "from-green-500 to-green-600",
    },
    {
      id: "vip",
      name: "VIP",
      price: 5200,
      period: "месяц",
      description: "Максимальная поддержка и индивидуальный подход",
      popular: false,
      features: [
        "Все возможности Премиум пакета",
        "4 консультации с психологом в месяц",
        "Персональный куратор",
        "Экстренная поддержка 24/7",
        "Индивидуальные программы",
        "Семейные консультации",
        "Доступ к эксклюзивным материалам",
      ],
      icon: Star,
      gradient: "from-purple-500 to-purple-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* ProfileHeader */}
      <ProfileHeader />

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-14 mb-6 text-balance">Пакеты услуг</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
            Выберите пакет, который лучше всего подходит для ваших целей. Все пакеты включают доступ к нашей платформе и
            персональную поддержку.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {packages.map((pkg) => {
            const IconComponent = pkg.icon
            return (
              <Card
                key={pkg.id}
                className={`relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${pkg.popular ? "ring-2 ring-green-500 scale-105" : ""}`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Badge className="bg-green-500 text-white px-4 mt-5 py-1">Популярный</Badge>
                  </div>
                )}

                <div className={`absolute inset-0 bg-gradient-to-br ${pkg.gradient} opacity-5`} />

                <CardHeader className="text-center pb-4">
                  <div
                    className={`flex items-center justify-center w-16 h-16 bg-gradient-to-br ${pkg.gradient} rounded-full mb-4 mx-auto`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">{pkg.name}</CardTitle>
                  <p className="text-gray-600 text-sm">{pkg.description}</p>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="text-center mb-6">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-gray-900">{pkg.price.toLocaleString()}</span>
                      <span className="text-gray-600">₴</span>
                    </div>
                    <p className="text-gray-500 text-sm">за {pkg.period}</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full bg-gradient-to-r ${pkg.gradient} hover:opacity-90 transition-opacity`}
                    size="lg"
                  >
                    Выбрать пакет
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Additional Information */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <Video className="w-6 h-6 text-blue-500" />
                <h3 className="text-xl font-bold text-gray-900">Гибкие условия</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>• Отмена подписки в любое время</li>
                <li>• Первые 7 дней - бесплатно</li>
                <li>• Возможность смены пакета</li>
                <li>• Заморозка подписки до 30 дней</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <MessageCircle className="w-6 h-6 text-green-500" />
                <h3 className="text-xl font-bold text-gray-900">Поддержка 24/7</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>• Техническая поддержка</li>
                <li>• Консультации по выбору</li>
                <li>• Помощь в настройке</li>
                <li>• Экстренная психологическая помощь</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Не уверены в выборе?</h2>
            <p className="text-gray-600 mb-6 text-pretty">
              Начните с бесплатного теста, чтобы получить персональные рекомендации по выбору подходящего пакета услуг.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="outline">
                <Link href="/tests">Пройти бесплатный тест</Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
              >
                <Link href="/therapists">Консультация специалиста</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

