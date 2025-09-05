import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "../../../../lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const { userId, userData } = await request.json()
    console.log('[THERAPIST REGISTRATION] Called with userId:', userId, 'userData:', userData)

    if (!userId) {
      return NextResponse.json({ error: "Отсутствует ID пользователя" }, { status: 400 })
    }

    // Используем service role для создания пользователей (обход RLS)
    const supabase = await createClient()

    // Создаем отдельный клиент с service role для операций, требующих повышенных прав
    const { createClient: createServiceClient } = await import("@supabase/supabase-js")
    const serviceSupabase = createServiceClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // Всегда используем serviceSupabase для работы с пользователями
    console.log('Checking if user exists with service role...')

    // Проверяем, существует ли пользователь
    const { data: existingUsers, error: lookupError } = await serviceSupabase
      .from("users")
      .select("id, email, first_name, last_name, role")
      .eq("id", userId)

    if (lookupError) {
      console.error("User lookup error:", lookupError)
      return NextResponse.json({
        error: "Ошибка при поиске пользователя в базе данных.",
        details: lookupError.message
      }, { status: 500 })
    }

    let user = existingUsers?.[0]

    // Если пользователь найден, используем его данные
    if (user) {
      console.log('User already exists:', user)

      // Обновляем роль пользователя на therapist если она отличается
      if (user.role !== 'therapist') {
        console.log('Updating user role to therapist...')
        const { error: roleUpdateError } = await serviceSupabase
          .from("users")
          .update({ role: 'therapist' })
          .eq("id", userId)

        if (roleUpdateError) {
          console.error('Error updating user role:', roleUpdateError)
        } else {
          console.log('User role updated to therapist successfully')
        }
      }
    } else {
      // Если пользователь не найден, создаем его запись
      console.log('User not found in database, creating user record...')

      // Используем переданные данные пользователя
      if (!userData) {
        return NextResponse.json({
          error: "Не удалось получить данные пользователя. Пожалуйста, попробуйте войти и выйти из системы."
        }, { status: 401 })
      }

      // Создаем запись пользователя с service role
      console.log('Creating user record with data:', {
        id: userId,
        email: userData.email,
        first_name: userData.first_name || '',
        last_name: userData.last_name || '',
        phone: userData.phone || '',
        role: userData.user_role || 'client',
        is_verified: true
      })

      const { data: newUser, error: createError } = await serviceSupabase
        .from("users")
        .insert({
          id: userId,
          email: userData.email,
          first_name: userData.first_name || '',
          last_name: userData.last_name || '',
          phone: userData.phone || '',
          role: 'therapist', // Always set to therapist for therapist registration
          is_verified: true
        })
        .select("id, email, first_name, last_name, role")
        .single()

      if (createError) {
        console.error("Error creating user record:", createError)
        console.error("Error details:", {
          message: createError.message,
          details: createError.details,
          hint: createError.hint,
          code: createError.code
        })

        // Если ошибка уникальности, получаем существующего пользователя
        if (createError.code === '23505') {
          console.log('User already exists, fetching existing user...')
          const { data: existingUser } = await serviceSupabase
            .from("users")
            .select("id, email, first_name, last_name, role")
            .eq("id", userId)
            .single()

          if (existingUser) {
            user = existingUser
            console.log('Found existing user:', user)
          } else {
            return NextResponse.json({
              error: "Пользователь существует но не может быть найден.",
              details: createError.message
            }, { status: 500 })
          }
        } else {
          return NextResponse.json({
            error: "Ошибка при создании записи пользователя.",
            details: createError.message
          }, { status: 500 })
        }
      } else {
        user = newUser
        console.log('User record created successfully:', user)
      }
    }

    // Проверяем, существует ли уже запись терапевта для этого пользователя
    const { data: existingTherapist } = await serviceSupabase
      .from("therapists")
      .select("*")
      .eq("user_id", userId)
      .single()

    let therapist = existingTherapist

    if (existingTherapist) {
      console.log('Therapist profile already exists for user:', userId)

      // Если профиль существует но не верифицирован, обновляем статус и добавляем новые поля
      if (!existingTherapist.is_verified) {
        console.log('Updating therapist verification status and adding new fields...')
        const { data: updatedTherapist, error: updateError } = await serviceSupabase
          .from("therapists")
          .update({
            is_verified: true,
            profile_image_url: existingTherapist.profile_image_url || null,
            therapy_approach: existingTherapist.therapy_approach || '',
            category: existingTherapist.category || '',
            location: existingTherapist.location || 'Киев',
            languages: existingTherapist.languages || ['Украинский', 'Русский']
          })
          .eq("user_id", userId)
          .select()
          .single()

        if (updateError) {
          console.error('Error updating therapist verification:', updateError)
        } else {
          therapist = updatedTherapist
          console.log('Therapist verification and fields updated successfully')
        }
      }

      // Возвращаем существующий профиль как успех
      return NextResponse.json({
        success: true,
        message: "Профиль терапевта уже существует",
        therapist: therapist
      })
    }

    // Создаем запись терапевта с service role
    console.log('Creating therapist profile for user:', userId)

    // First check if a therapist record already exists with this ID
    const { data: existingById } = await serviceSupabase
      .from("therapists")
      .select("id, user_id")
      .eq("id", userId)
      .single()

    let therapistInsertData: any = {
      user_id: userId,
      bio: "",
      experience_years: 0,
      education: "",
      certifications: [],
      hourly_rate_uah: 0,
      available_times: {
        monday: "9:00-18:00",
        tuesday: "9:00-18:00",
        wednesday: "9:00-18:00",
        thursday: "9:00-18:00",
        friday: "9:00-18:00",
        saturday: "closed",
        sunday: "closed"
      },
      is_verified: true,
      rating: 0,
      total_sessions: 0,
      profile_image_url: null,
      therapy_approach: '',
      category: '',
      location: 'Киев',
      languages: ['Украинский', 'Русский']
    }

    // If therapist record exists with this ID but different user_id, create with auto-generated ID
    if (existingById && existingById.user_id !== userId) {
      console.log('Therapist record exists with this ID but different user_id, creating with new ID')
      // Don't set id, let it auto-generate
    } else {
      // Set the ID to match user ID
      therapistInsertData.id = userId
    }

    const { data: newTherapist, error: therapistError } = await serviceSupabase
      .from("therapists")
      .insert(therapistInsertData)
      .select()
      .single()

    if (therapistError) {
      console.error("[v0] Error creating therapist profile:", therapistError)
      console.error("Error code:", therapistError.code)
      console.error("Error message:", therapistError.message)

      // Если ошибка уникальности, получаем существующий профиль
      if (therapistError.code === '23505') {
        console.log('Therapist profile already exists, fetching existing...')
        const { data: existingTherapistProfile } = await serviceSupabase
          .from("therapists")
          .select("*")
          .eq("user_id", userId)
          .single()

        if (existingTherapistProfile) {
          therapist = existingTherapistProfile
          console.log('Found existing therapist profile:', therapist)
        } else {
          return NextResponse.json({
            error: "Профиль терапевта существует но не может быть найден",
            details: therapistError.message
          }, { status: 500 })
        }
      } else {
        return NextResponse.json({
          error: "Ошибка при создании профиля терапевта",
          details: `${therapistError.message} (code: ${therapistError.code})`
        }, { status: 500 })
      }
    } else {
      therapist = newTherapist
      console.log('[THERAPIST REGISTRATION] Therapist profile created successfully for user:', userId)
      console.log('[THERAPIST REGISTRATION] Created therapist data:', therapist)
    }

    console.log('[THERAPIST REGISTRATION] Final result - therapist:', therapist)
    console.log('[THERAPIST REGISTRATION] is_verified status:', therapist?.is_verified)

    return NextResponse.json({
      success: true,
      message: therapist === existingTherapist ? "Профиль терапевта уже существует" : "Профиль терапевта успешно создан",
      therapist
    })
  } catch (error) {
    console.error("[v0] Register therapist error:", error)
    return NextResponse.json({ error: "Внутренняя ошибка сервера" }, { status: 500 })
  }
}