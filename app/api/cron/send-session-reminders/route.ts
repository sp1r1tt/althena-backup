import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { queueSessionReminder } from "../../../../lib/email-queque"

export async function POST(request: NextRequest) {
  try {
    // Verify cron secret
    const authHeader = request.headers.get("authorization")
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const cookieStore = cookies()
    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    })

    // Get bookings for tomorrow
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const tomorrowStart = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate())
    const tomorrowEnd = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate() + 1)

    const { data: bookings, error } = await supabase
      .from("bookings")
      .select(
        `
        *,
        users!bookings_user_id_fkey(name, email),
        therapists!bookings_therapist_id_fkey(name)
      `,
      )
      .eq("status", "confirmed")
      .gte("starts_at", tomorrowStart.toISOString())
      .lt("starts_at", tomorrowEnd.toISOString())

    if (error) {
      console.error("Error fetching bookings:", error)
      return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 })
    }

    let remindersQueued = 0

    // Queue reminder emails for each booking
    for (const booking of bookings || []) {
      try {
        const startTime = new Date(booking.starts_at)
        const formattedTime = startTime.toLocaleString("ru-RU", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Europe/Kiev",
        })

        await queueSessionReminder(
          booking.users.email,
          booking.users.name,
          booking.therapists.name,
          formattedTime,
          new Date().toISOString(), // Send immediately
        )

        remindersQueued++
      } catch (error) {
        console.error(`Failed to queue reminder for booking ${booking.id}:`, error)
      }
    }

    return NextResponse.json({
      message: `Queued ${remindersQueued} session reminders`,
      remindersQueued,
    })
  } catch (error) {
    console.error("Session reminders cron error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
