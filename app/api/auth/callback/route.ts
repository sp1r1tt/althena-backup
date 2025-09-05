import { createClient } from "../../../../lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: "URL is required" },
        { status: 400 }
      );
    }

   
    const supabase = await createClient();


    const urlObj = new URL(url);
    const code = urlObj.searchParams.get('code');
    const token_hash = urlObj.searchParams.get('token_hash');
    const type = urlObj.searchParams.get('type');

    console.log('Callback URL parameters:', {
      hasCode: !!code,
      hasTokenHash: !!token_hash,
      type: type,
      fullUrl: url.substring(0, 100) + '...' // Показываем начало URL для отладки
    });


    if (code) {
      console.log('Processing authorization code:', code.substring(0, 10) + '...');

      try {
        const { data, error } = await supabase.auth.exchangeCodeForSession(code);

        if (error) {
          console.error('Code exchange error details:', {
            message: error.message,
            status: error.status,
            name: error.name
          });

       
          if (error.message?.includes('Code has expired') ||
              error.message?.includes('Invalid code') ||
              error.message?.includes('invalid flow state')) {
            console.log('PKCE flow state issue, this is normal - proceeding with user authentication...');
          } else {
            console.error('Unexpected code exchange error:', error.message);
            return NextResponse.json(
              { error: `Ошибка при обмене кода на сессию: ${error.message}` },
              { status: 400 }
            );
          }
        } else {
          console.log('Session established from code successfully');
        }
      } catch (exchangeError) {
        console.error('Exception during code exchange:', exchangeError);
   
        console.log('Continuing despite code exchange exception...');
      }
    }

    else if (token_hash && type) {
      const { error } = await supabase.auth.verifyOtp({
        token_hash,
        type: type as any,
      });

      if (error) {
        console.error('Token verification error:', error);

    

        return NextResponse.json(
          { error: "Ошибка при подтверждении email" },
          { status: 400 }
        );
      }
    }

    
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) {
      console.error('Get user error:', userError);
      return NextResponse.json(
        { error: "Ошибка при получении данных пользователя" },
        { status: 401 }
      );
    }

    if (!user) {
      console.error('No user found after authentication');
      return NextResponse.json(
        { error: "Пользователь не найден после аутентификации" },
        { status: 401 }
      );
    }


    const userRole = user.user_metadata?.user_role || 'client';
    const firstName = user.user_metadata?.first_name || '';
    const lastName = user.user_metadata?.last_name || '';
    const phone = user.user_metadata?.phone || '';

  
    console.log('User authenticated, proceeding to role-specific logic...');

   
    if (userRole === "therapist") {
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/auth/register-therapist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          userData: {
            email: user.email,
            first_name: firstName,
            last_name: lastName,
            phone: phone,
            user_role: userRole
          }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Therapist creation error:', errorData);
        return NextResponse.json(
          { error: `Ошибка при создании профиля терапевта: ${errorData.error || 'Неизвестная ошибка'}` },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: userRole === 'therapist'
        ? 'Профиль терапевта успешно создан!'
        : 'Email успешно подтвержден!',
      role: userRole
    });

  } catch (error) {
    console.error('Callback API error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : undefined
    });

 
    console.error('Full error object:', error);

    return NextResponse.json(
      { error: 'Произошла ошибка при обработке подтверждения' },
      { status: 500 }
    );
  }
}