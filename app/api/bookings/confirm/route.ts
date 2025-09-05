import { createClient } from "../../../../lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { bookingId, paymentIntentId } = await request.json()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Необходима авторизация" }, { status: 401 })
    }

    const { data: booking, error } = await supabase
      .from("booking_sessions")
      .update({
        status: "confirmed",
        stripe_payment_intent_id: paymentIntentId,
        hold_expires_at: null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", bookingId)
      .eq("user_id", user.id)
      .eq("status", "held")
      .select(`
        *,
        therapist:therapists(full_name, email)
      `)
      .single()

    if (error || !booking) {
      return NextResponse.json({ error: "Бронирование не найдено или истекло" }, { status: 404 })
    }

    await supabase.from("email_notifications").insert({
      user_id: user.id,
      email_type: "booking_confirmation",
      recipient_email: user.email!,
      subject: "Подтверждение записи к терапевту",
      content: `Ваша запись к ${booking.therapist.full_name} на ${booking.session_date} в ${booking.session_time} подтверждена.`,
    })

    return NextResponse.json({ success: true, booking })
  } catch (error) {
    console.error("[v0] Confirm booking error:", error)
    return NextResponse.json({ error: "Внутренняя ошибка сервера" }, { status: 500 })
  }
}
