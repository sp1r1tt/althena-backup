import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const { type, to_email, payload, scheduled_at } = await request.json()

    if (!type || !to_email || !payload) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const cookieStore = cookies()
    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    })

    const { data, error } = await supabase
      .from("email_queue")
      .insert({
        type,
        to_email,
        payload,
        scheduled_at: scheduled_at || new Date().toISOString(),
        status: "pending",
      })
      .select()
      .single()

    if (error) {
      console.error("Error adding email to queue:", error)
      return NextResponse.json({ error: "Failed to add email to queue" }, { status: 500 })
    }

    return NextResponse.json({ success: true, emailId: data.id })
  } catch (error) {
    console.error("Email queue add error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
