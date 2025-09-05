import { createClient } from "../../../../lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { therapistId, sessionDate, sessionTime, duration = 60 } = await request.json()

    // Check if slot is available (using full datetime format like original API)
    const sessionDateTime = new Date(`${sessionDate}T${sessionTime}:00.000Z`)
    const { data: existingBookings, error: checkError } = await supabase
      .from("booking_sessions")
      .select("id")
      .eq("therapist_id", therapistId)
      .eq("session_date", sessionDateTime.toISOString())
      .in("status", ["held", "confirmed"])

    if (checkError) {
      console.error("Error checking slot availability:", checkError)
      return NextResponse.json({ error: "Failed to check slot availability" }, { status: 500 })
    }

    if (existingBookings && existingBookings.length > 0) {
      return NextResponse.json({ error: "Слот уже занят" }, { status: 400 })
    }

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Необходима авторизация" }, { status: 401 })
    }

    const { data: therapist } = await supabase
      .from("therapists")
      .select("hourly_rate_uah")
      .eq("id", therapistId)
      .single()

    if (!therapist) {
      return NextResponse.json({ error: "Терапевт не найден" }, { status: 404 })
    }

    const totalAmount = Math.round((therapist.hourly_rate_uah * duration) / 60)
    const holdExpiresAt = new Date(Date.now() + 15 * 60 * 1000) // 15 minutes

    const { data: booking, error } = await supabase
      .from("booking_sessions")
      .insert({
        user_id: user.id,
        therapist_id: therapistId,
        session_date: sessionDateTime.toISOString(),
        duration_minutes: duration,
        status: "held",
        payment_status: "pending",
        hold_expires_at: holdExpiresAt.toISOString(),
        notes: `Бронь на ${sessionDate} в ${sessionTime}`
      })
      .select()
      .single()

    if (error) {
      console.error("[v0] Slot hold error:", error)
      return NextResponse.json({ error: "Ошибка создания брони" }, { status: 500 })
    }

    return NextResponse.json({
      bookingId: booking.id,
      holdExpiresAt: holdExpiresAt.toISOString(),
      totalAmount,
    })
  } catch (error) {
    console.error("[v0] Hold slot error:", error)
    return NextResponse.json({ error: "Внутренняя ошибка сервера" }, { status: 500 })
  }
}
