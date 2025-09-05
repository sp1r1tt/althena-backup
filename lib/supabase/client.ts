import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase environment variables. Please check your Project Settings and ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.",
    )
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return document.cookie
          .split("; ")
          .filter(Boolean)
          .map((cookie) => {
            const [name, value] = cookie.split("=")
            return { name, value: decodeURIComponent(value) }
          })
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          const cookieOptions = []
          if (options?.maxAge) cookieOptions.push(`max-age=${options.maxAge}`)
          if (options?.path) cookieOptions.push(`path=${options.path}`)
          if (options?.domain) cookieOptions.push(`domain=${options.domain}`)
          if (options?.secure) cookieOptions.push("secure")
          if (options?.httpOnly) cookieOptions.push("httponly")
          if (options?.sameSite) cookieOptions.push(`samesite=${options.sameSite}`)

          const cookieString = `${name}=${encodeURIComponent(value)}${cookieOptions.length ? "; " + cookieOptions.join("; ") : ""}`
          document.cookie = cookieString
        })
      },
    },
  })
}
