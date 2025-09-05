import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "../../../../lib/supabase/server"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
})

export async function POST(request: NextRequest) {
  try {
    const { bookingId, amount } = await request.json()

    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Необходима авторизация" }, { status: 401 })
    }

    const { data: booking } = await supabase
      .from("booking_sessions")
      .select("*, therapist:therapists(full_name)")
      .eq("id", bookingId)
      .eq("user_id", user.id)
      .eq("status", "held")
      .single()

    if (!booking) {
      return NextResponse.json({ error: "Бронирование не найдено" }, { status: 404 })
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to kopecks
      currency: "uah",
      metadata: {
        bookingId: bookingId,
        userId: user.id,
        therapistName: booking.therapist.full_name,
      },
      description: `Сессия с ${booking.therapist.full_name}`,
    })

    await supabase.from("booking_sessions").update({ stripe_payment_intent_id: paymentIntent.id }).eq("id", bookingId)

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    })
  } catch (error) {
    console.error("[v0] Stripe payment intent error:", error)
    return NextResponse.json({ error: "Ошибка создания платежа" }, { status: 500 })
  }
}
