import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "../../../../lib/supabase/server"

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName } = await request.json()

    if (!email || !firstName || !lastName) {
      return NextResponse.json(
        { error: "Missing required fields: email, firstName, lastName. Password is optional." },
        { status: 400 }
      )
    }

    // If password provided: create full user with auth
    // If no password: create only profile (user registers separately)
    const createAuthUser = !!password

    const supabase = await createClient()

    if (createAuthUser) {
      // Create user in Supabase Auth with password
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            full_name: `${firstName} ${lastName}`,
          },
        },
      })

      if (authError) {
        console.error("Auth error:", authError)
        return NextResponse.json({ error: "Failed to create user in auth" }, { status: 500 })
      }

      if (!authData.user) {
        return NextResponse.json({ error: "User creation failed" }, { status: 500 })
      }

      // Create user profile with admin role
      const { error: profileError } = await supabase
        .from("users")
        .insert({
          id: authData.user.id,
          email,
          first_name: firstName,
          last_name: lastName,
          role: "admin",
          is_verified: true,
        })

      if (profileError) {
        console.error("Profile creation error:", profileError)
        return NextResponse.json({ error: "Failed to create user profile" }, { status: 500 })
      }

      return NextResponse.json({
        success: true,
        message: "Admin user created with authentication",
        user: {
          id: authData.user.id,
          email,
          firstName,
          lastName,
          role: "admin",
        },
        note: "User can now login with the provided password"
      })
    } else {
      // Only create user profile (for use with seed data)
      // Generate a temporary ID for the profile
      const tempId = `admin-${Date.now()}`

      const { error: profileError } = await supabase
        .from("users")
        .insert({
          id: tempId,
          email,
          first_name: firstName,
          last_name: lastName,
          role: "admin",
          is_verified: true,
        })

      if (profileError) {
        console.error("Profile creation error:", profileError)
        return NextResponse.json({ error: "Failed to create user profile" }, { status: 500 })
      }

      return NextResponse.json({
        success: true,
        message: "Admin profile created (no authentication)",
        user: {
          id: tempId,
          email,
          firstName,
          lastName,
          role: "admin",
        },
        note: "User needs to register separately with this email to create authentication account"
      })
    }
  } catch (error) {
    console.error("Create admin error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}