"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../../lib/supabase/client";

export default function AuthCallback() {
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const supabase = createClient();

        // Даем время Supabase обработать callback
        await new Promise(resolve => setTimeout(resolve, 1000));

        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          console.error('Callback error:', error);

          // Check if it's an expired link error
          if (error.message?.includes('expired') || error.message?.includes('invalid')) {
            console.log('Email link expired, redirecting to login with message');
            setStatus('error');
            setTimeout(() => {
              alert('Ссылка для подтверждения email истекла. Пожалуйста, зарегистрируйтесь заново.');
              router.push('/auth/register');
            }, 2000);
            return;
          }

          setStatus('error');
          setTimeout(() => router.push('/auth/login'), 2000);
          return;
        }

        if (session?.user) {
          console.log('Callback successful, user:', session.user.email);
          console.log('User metadata:', session.user.user_metadata);
          setStatus('success');

          // Создаем запись пользователя в БД
          const userRole = session.user.user_metadata?.user_role || 'client';
          console.log('User role from metadata:', userRole);

          const { error: insertError } = await supabase
            .from('users')
            .upsert({
              id: session.user.id,
              email: session.user.email,
              first_name: session.user.user_metadata?.first_name || '',
              last_name: session.user.user_metadata?.last_name || '',
              phone: session.user.user_metadata?.phone || '',
              role: userRole,
              is_verified: true
            });

          if (insertError) {
            console.error('User insert error:', insertError);
          }

          setTimeout(() => {
            console.log('Redirecting to:', userRole === 'therapist' ? '/therapist-dashboard' : '/dashboard');
            router.push(userRole === 'therapist' ? '/therapist-dashboard' : '/dashboard');
          }, 1000);
        } else {
          console.log('No session after callback');
          setStatus('error');
          setTimeout(() => router.push('/auth/login'), 2000);
        }
      } catch (err) {
        console.error('Callback processing error:', err);
        setStatus('error');
        setTimeout(() => router.push('/auth/login'), 2000);
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center">
        {status === 'loading' && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Обработка подтверждения...</h2>
            <p className="text-gray-600">Пожалуйста, подождите...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-8">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Успешно!</h2>
            <p className="text-gray-600">Перенаправление в личный кабинет...</p>
          </div>
        )}

        {status === 'error' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-8">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Ошибка</h2>
            <p className="text-gray-600">Перенаправление...</p>
          </div>
        )}
      </div>
    </div>
  );
}
