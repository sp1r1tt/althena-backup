import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "../../../../lib/supabase/server"

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const { userId, newRole } = await request.json()

    if (!userId || !newRole) {
      return NextResponse.json(
        { error: "Missing required fields: userId, newRole" },
        { status: 400 }
      )
    }

    // Validate role
    const validRoles = ["user", "therapist", "admin"]
    if (!validRoles.includes(newRole)) {
      return NextResponse.json(
        { error: `Invalid role. Must be one of: ${validRoles.join(", ")}` },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Check if current user is admin
    const {
      data: { user: currentUser },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !currentUser) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const { data: currentUserData, error: roleCheckError } = await supabase
      .from("users")
      .select("role")
      .eq("id", currentUser.id)
      .single()

    if (roleCheckError || currentUserData?.role !== "admin") {
      return NextResponse.json({ error: "Access denied. Admin role required." }, { status: 403 })
    }

    // Update user role
    const { data, error: updateError } = await supabase
      .from("users")
      .update({ role: newRole })
      .eq("id", userId)
      .select("id, email, first_name, last_name, role")
      .single()

    if (updateError) {
      console.error("Role update error:", updateError)
      return NextResponse.json({ error: "Failed to update user role" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: `User role updated to ${newRole}`,
      user: data,
    })
  } catch (error) {
    console.error("Update role error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}