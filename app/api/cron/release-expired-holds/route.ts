import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "../../../../lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const supabase = await createClient()
    const now = new Date().toISOString()

    const { data: expiredHolds, error: selectError } = await supabase
      .from("booking_sessions")
      .select("id, user_id, therapist_id, session_date, session_time")
      .eq("status", "held")
      .lt("hold_expires_at", now)

    if (selectError) {
      console.error("[v0] Error finding expired holds:", selectError)
      return NextResponse.json({ error: "Database error" }, { status: 500 })
    }

    if (!expiredHolds || expiredHolds.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No expired holds found",
        releasedCount: 0,
      })
    }

    const { error: deleteError } = await supabase
      .from("booking_sessions")
      .delete()
      .eq("status", "held")
      .lt("hold_expires_at", now)

    if (deleteError) {
      console.error("[v0] Error releasing expired holds:", deleteError)
      return NextResponse.json({ error: "Failed to release holds" }, { status: 500 })
    }

    console.log(`[v0] Released ${expiredHolds.length} expired slot holds`)

    return NextResponse.json({
      success: true,
      releasedCount: expiredHolds.length,
      releasedHolds: expiredHolds.map((h) => ({
        id: h.id,
        date: h.session_date,
        time: h.session_time,
      })),
    })
  } catch (error) {
    console.error("[v0] Cron job error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
