import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { CookieOptions } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )


  const { data: { user }, error: userError } = await supabase.auth.getUser()

  // Get user profile to check role
  let userRole = null
  if (user && !userError) {
    const { data: profile } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()
    userRole = profile?.role
  }

  const protectedRoutes = ['/dashboard', '/therapist-dashboard', '/admin', '/therapists']
  const publicRoutes = ['/auth/login', '/auth/register', '/auth/forgot-password', '/', '/tests', '/packages', '/how-it-works']
  const authRoutes = ['/auth/callback']

  const isProtectedRoute = protectedRoutes.some(route =>
    request.nextUrl.pathname.startsWith(route)
  )
  const isPublicRoute = publicRoutes.some(route =>
    request.nextUrl.pathname === route || request.nextUrl.pathname.startsWith('/therapists/') || request.nextUrl.pathname.startsWith('/tests/')
  )
  const isAuthRoute = authRoutes.some(route =>
    request.nextUrl.pathname.startsWith(route)
  )

  // Role-based route protection
  const isTherapistOnlyRoute = request.nextUrl.pathname.startsWith('/therapist-dashboard')
  const isClientOnlyRoute = request.nextUrl.pathname.startsWith('/dashboard')

  if (isPublicRoute || isAuthRoute) {
    return response
  }

  if (isProtectedRoute && (userError || !user)) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // Check role-based access
  if (isTherapistOnlyRoute && userRole !== 'therapist') {
    console.log('Middleware: Redirecting non-therapist from therapist-dashboard to dashboard')
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  if (isClientOnlyRoute && userRole === 'therapist') {
    console.log('Middleware: Redirecting therapist from dashboard to therapist-dashboard')
    return NextResponse.redirect(new URL('/therapist-dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
