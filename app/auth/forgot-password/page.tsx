import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { ArrowLeft, Mail } from "lucide-react"
import Link from "next/link"

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to login */}
        <Link
          href="/auth/login"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Вернуться к входу
        </Link>

        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-semibold text-gray-900">Восстановление пароля</CardTitle>
            <CardDescription className="text-gray-600">
              Введите ваш email для получения ссылки восстановления
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </Label>
                <Input id="email" type="email" placeholder="your@email.com" className="h-11" required />
              </div>

              <Button type="submit" className="w-full h-11 bg-blue-600 hover:bg-blue-700">
                Отправить ссылку восстановления
              </Button>
            </form>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Вспомнили пароль?{" "}
                <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                  Войти
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Не получили письмо?</strong> Проверьте папку "Спам" или свяжитесь с нашей поддержкой.
          </p>
        </div>
      </div>
    </div>
  )
}
