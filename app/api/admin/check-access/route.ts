import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "../../../../lib/supabase/server"

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ isAdmin: false, error: "Not authenticated" }, { status: 401 })
    }

    // Check if user has admin role
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single()

    if (userError) {
      console.error("Error checking user role:", userError)
      return NextResponse.json({ isAdmin: false, error: "Failed to check role" }, { status: 500 })
    }

    const isAdmin = userData?.role === "admin"

    return NextResponse.json({
      isAdmin,
      userId: user.id,
      role: userData?.role
    })
  } catch (error) {
    console.error("Admin access check error:", error)
    return NextResponse.json({ isAdmin: false, error: "Internal server error" }, { status: 500 })
  }
}