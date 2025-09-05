import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    })

    // Get current user and check admin role
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Check if user has admin role
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single()

    if (userError || userData?.role !== "admin") {
      return NextResponse.json({ error: "Access denied. Admin role required." }, { status: 403 })
    }

    // Get all analytics events from last 30 days
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const { data: events, error: eventsError } = await supabase
      .from("analytics_events")
      .select("*")
      .gte("created_at", thirtyDaysAgo.toISOString())
      .order("created_at", { ascending: false })

    if (eventsError) {
      console.error("Error fetching events:", eventsError)
      return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 })
    }

    // Calculate conversion metrics
    const testViews = events?.filter((e) => e.event_type === "test_view").length || 0
    const purchases = events?.filter((e) => e.event_type === "checkout_completed").length || 0
    const therapistViews = events?.filter((e) => e.event_type === "therapist_profile_view").length || 0
    const bookings = events?.filter((e) => e.event_type === "slot_selected").length || 0
    const howItWorksViews =
      events?.filter((e) => e.event_type === "page_view" && e.event_data?.path === "/how-it-works").length || 0
    const actionsFromHowItWorks =
      events?.filter((e) => e.event_type === "test_view" || e.event_type === "therapists_list_view").length || 0

    const conversions = {
      tests_to_purchase: testViews > 0 ? (purchases / testViews) * 100 : 0,
      therapists_to_booking: therapistViews > 0 ? (bookings / therapistViews) * 100 : 0,
      how_it_works_to_action: howItWorksViews > 0 ? (actionsFromHowItWorks / howItWorksViews) * 100 : 0,
    }

    // Get therapist metrics
    const { data: therapists, error: therapistsError } = await supabase
      .from("therapists")
      .select(`
        id,
        users!inner(first_name, last_name)
      `)

    const therapistMetrics =
      therapists
        ?.map((therapist) => {
          const views =
            events?.filter(
              (e) => e.event_type === "therapist_profile_view" && e.event_data?.therapist_id === therapist.id,
            ).length || 0

          const bookings =
            events?.filter((e) => e.event_type === "slot_selected" && e.event_data?.therapist_id === therapist.id)
              .length || 0

          const user = therapist.users?.[0]
          const name = user ? `${user.first_name} ${user.last_name}` : 'Неизвестный терапевт'

          return {
            therapist_id: therapist.id,
            name,
            views,
            bookings,
            conversion_rate: views > 0 ? (bookings / views) * 100 : 0,
          }
        })
        .sort((a, b) => b.views - a.views) || []

    return NextResponse.json({
      events: events || [],
      conversions,
      therapistMetrics,
    })
  } catch (error) {
    console.error("Analytics API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
