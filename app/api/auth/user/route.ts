import { NextResponse, NextRequest } from "next/server"
import { createClient } from "../../../../lib/supabase/server"

export async function GET() {
  try {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Get user data from users table
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single()

    if (userError) {
      console.error('Error fetching user data:', userError)
      return NextResponse.json({ error: "User data not found" }, { status: 404 })
    }

    return NextResponse.json({
      id: userData.id,
      email: userData.email,
      first_name: userData.first_name,
      last_name: userData.last_name,
      phone: userData.phone,
      role: userData.role,
      is_verified: userData.is_verified,
      created_at: userData.created_at
    })
  } catch (error) {
    console.error('User API error:', error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const userData = await request.json()

    console.log('[USER API] Creating user with data:', userData)

    // Create user record (bypassing RLS for registration)
    const { data, error } = await supabase
      .from('users')
      .insert({
        id: userData.id,
        email: userData.email,
        first_name: userData.first_name,
        last_name: userData.last_name,
        phone: userData.phone,
        role: userData.role,
        is_verified: userData.is_verified || true
      })
      .select()
      .single()

    if (error) {
      console.error('[USER API] Error creating user:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log('[USER API] User created successfully:', data)
    return NextResponse.json(data)
  } catch (error) {
    console.error('[USER API] Error:', error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
