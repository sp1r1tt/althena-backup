import { NextResponse } from "next/server"
import { createClient } from "../../../../../lib/supabase/server"

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const supabase = await createClient()

    // Get current user from auth
    const {
      data: { user: authUser },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !authUser) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Get user profile
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', authUser.id)
      .single()

    // Get therapist profile if user is a therapist
    let therapistProfile = null
    if (user.role === 'therapist') {
      const { data: therapist, error: therapistError } = await supabase
        .from('therapists')
        .select('*')
        .eq('user_id', authUser.id)
        .single()

      if (!therapistError && therapist) {
        therapistProfile = therapist
      }
    }

    if (userError) {
      console.error("Error fetching user profile:", userError)
      return NextResponse.json({ error: "Failed to fetch user profile" }, { status: 500 })
    }

    console.log('Fetched user profile:', {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      profile_image_url: user.profile_image_url ? user.profile_image_url.substring(0, 100) + '...' : null
    })

    // Merge therapist profile data if it exists
    if (therapistProfile) {
      console.log('Fetched therapist profile:', {
        id: therapistProfile.id,
        user_id: therapistProfile.user_id,
        profile_image_url: therapistProfile.profile_image_url ? therapistProfile.profile_image_url.substring(0, 100) + '...' : null
      })
    }

    return NextResponse.json({
      user: {
        ...user,
        ...therapistProfile,
        available_times: therapistProfile?.available_times || {}
      }
    })
  } catch (error) {
    console.error("Error fetching profile:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    console.log('Profile update request body:', body)

    // Get current user from auth
    const {
      data: { user: authUser },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !authUser) {
      console.log('Authentication error:', authError)
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    console.log('Authenticated user:', authUser.id)

    // Update user profile
    console.log('Updating user profile with data:', {
      first_name: body.first_name,
      last_name: body.last_name,
      phone: body.phone,
      bio: body.bio,
      profile_image_url: body.profile_image_url ? body.profile_image_url.substring(0, 100) + '...' : null,
    })

    const { data: updatedUser, error: userError } = await supabase
      .from('users')
      .update({
        first_name: body.first_name,
        last_name: body.last_name,
        phone: body.phone,
        bio: body.bio,
        profile_image_url: body.profile_image_url,
        updated_at: new Date().toISOString()
      })
      .eq('id', authUser.id)
      .select()
      .single()

    if (userError) {
      console.error("Error updating user profile:", userError)
      return NextResponse.json({ error: "Failed to update user profile" }, { status: 500 })
    }

    console.log('User profile updated successfully:', updatedUser)

    // If user is a therapist, update therapist profile too
    if (updatedUser.role === 'therapist') {
      console.log('Updating therapist profile with data:', {
        specializations: body.specializations,
        experience_years: body.experience_years,
        hourly_rate_uah: body.hourly_rate_uah,
        therapy_approach: body.therapy_approach,
        category: body.category,
        location: body.location,
        available_times: body.available_times,
        profile_image_url: body.profile_image_url ? body.profile_image_url.substring(0, 100) + '...' : null,
      })

      // First, check if therapist profile exists
      const { data: existingTherapist, error: checkError } = await supabase
        .from('therapists')
        .select('id')
        .eq('user_id', authUser.id)
        .single()

      if (checkError && checkError.code !== 'PGRST116') { // PGRST116 = no rows returned
        console.error("Error checking therapist profile:", checkError)
        return NextResponse.json({ error: "Failed to check therapist profile" }, { status: 500 })
      }

      let therapistResult
      if (existingTherapist) {
        // Update existing therapist profile
        therapistResult = await supabase
          .from('therapists')
          .update({
            specializations: body.specializations,
            experience_years: body.experience_years,
            hourly_rate_uah: body.hourly_rate_uah,
            therapy_approach: body.therapy_approach,
            category: body.category,
            location: body.location,
            education: body.education,
            certifications: body.certifications,
            available_times: body.available_times,
            profile_image_url: body.profile_image_url,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', authUser.id)
      } else {
        // Create new therapist profile
        console.log('Creating new therapist profile for user:', authUser.id)
        therapistResult = await supabase
          .from('therapists')
          .insert({
            user_id: authUser.id,
            specializations: body.specializations,
            experience_years: body.experience_years,
            hourly_rate_uah: body.hourly_rate_uah,
            therapy_approach: body.therapy_approach,
            category: body.category,
            location: body.location,
            education: body.education,
            certifications: body.certifications,
            available_times: body.available_times,
            profile_image_url: body.profile_image_url,
          })
      }

      if (therapistResult.error) {
        console.error("Error with therapist profile:", therapistResult.error)
        return NextResponse.json({ error: "Failed to update therapist profile" }, { status: 500 })
      }

      console.log('Therapist profile operation completed successfully')
      console.log('Final therapist data:', therapistResult.data)
    }

    return NextResponse.json({
      user: updatedUser,
      message: "Profile updated successfully"
    })
  } catch (error) {
    console.error("Error updating profile:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}