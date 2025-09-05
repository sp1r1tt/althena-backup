import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "../../../../lib/supabase/server"

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("analytics_events")
      .insert({
        user_id: body.userId || null,
        event_type: body.eventName,
        event_data: body.eventData || {},
        utm_source: body.utm_source || null,
        utm_medium: body.utm_medium || null,
        utm_campaign: body.utm_campaign || null,
        referrer: body.referrer || null,
        user_agent: body.userAgent || null,
        ip_address: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown",
      })
      .select()

    if (error) {
      console.error("[v0] Analytics database error:", error)
      return NextResponse.json({ error: "Failed to save event" }, { status: 500 })
    }

    console.log("[v0] Analytics event saved:", {
      eventName: body.eventName,
      userId: body.userId,
      sessionId: body.sessionId,
    })

    const eventId = data && Array.isArray(data) && data.length > 0 ? data[0].id : null
    return NextResponse.json({ success: true, eventId })
  } catch (error) {
    console.error("[v0] Analytics tracking error:", error)
    return NextResponse.json({ error: "Failed to track event" }, { status: 500 })
  }
}
