import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import Link from "next/link"
import { Clock, RefreshCw, AlertCircle, Calendar } from "lucide-react"
import ProfileHeader from '@/components/ProfileHeader'
import Footer from '@/components/Footer'

export default function CancellationPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* ProfileHeader */}
      <ProfileHeader />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-6 text-balance">Политика отмены и переноса</h1>
            <p className="text-xl text-gray-600 text-pretty">
              Мы ценим время клиентов и специалистов. Ознакомьтесь с условиями отмены и переноса консультаций.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-4 mx-auto">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-green-700">За 48+ часов</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
                <p className="text-gray-600">полный возврат средств</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full mb-4 mx-auto">
                  <AlertCircle className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-orange-700">За 24-48 часов</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">50%</div>
                <p className="text-gray-600">возврат стоимости</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full mb-4 mx-auto">
                  <RefreshCw className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-red-700">В день консультации</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">0%</div>
                <p className="text-gray-600">отмена без возврата</p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Calendar className="w-6 h-6 text-blue-500" />
                Варианты переноса сессии
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-600 text-pretty">
                Мы понимаем, что планы могут измениться. Если вам нужно отменить консультацию, рассмотрите следующие
                варианты:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Перенести на другой день/время</h3>
                  <p className="text-gray-600 mb-4">
                    Выберите новое время в календаре вашего специалиста без дополнительной оплаты
                  </p>
                  <Button asChild variant="outline" className="w-full bg-transparent">
                    <Link href="/dashboard">Управление бронированиями</Link>
                  </Button>
                </div>

                <div className="bg-green-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Выбрать другого специалиста</h3>
                  <p className="text-gray-600 mb-4">Найдите другого подходящего психолога на нашей платформе</p>
                  <Button asChild variant="outline" className="w-full bg-transparent">
                    <Link href="/therapists">Каталог специалистов</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Важная информация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">Экстренные ситуации</h4>
                <p className="text-yellow-700 text-sm">
                  В случае экстренных ситуаций (болезнь, форс-мажор) мы рассматриваем каждый случай индивидуально.
                  Обратитесь в службу поддержки.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Отмена со стороны специалиста</h4>
                <p className="text-blue-700 text-sm">
                  Если специалист отменяет сессию, вы получаете полный возврат средств или можете перенести консультацию
                  на другое время.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Как отменить бронирование</h4>
                <p className="text-gray-700 text-sm">
                  Войдите в личный кабинет, найдите нужное бронирование и нажмите "Отменить". Возврат средств происходит
                  автоматически в течение 3-5 рабочих дней.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">Остались вопросы? Мы готовы помочь!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline" size="lg">
                <Link href="/dashboard">Личный кабинет</Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
              >
                <Link href="mailto:support@therapy-platform.com">Связаться с поддержкой</Link>
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
