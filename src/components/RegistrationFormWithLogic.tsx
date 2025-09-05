"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client";

const RegistrationFormWithLogic: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [userRole, setUserRole] = useState<"client" | "therapist">("client");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    console.log('[REGISTRATION] Starting registration process...')

    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      setIsSubmitting(false);
      return;
    }

    if (password.length < 8) {
      setError("Пароль должен содержать минимум 8 символов");
      setIsSubmitting(false);
      return;
    }

    const supabase = createClient();
    console.log('[REGISTRATION] Created Supabase client')

    try {
      console.log('[REGISTRATION] Calling supabase.auth.signUp...')
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            first_name: firstName,
            last_name: lastName,
            full_name: `${firstName} ${lastName}`,
            phone: phone,
            user_role: userRole,
          },
        },
      });

      console.log('[REGISTRATION] SignUp response:', { data: !!data, error })
      if (error) throw error;


      if (data.user && !data.user.email_confirmed_at) {
        console.log('[REGISTRATION] Email confirmation required')
        setError("Пожалуйста, подтвердите ваш email адрес. Проверьте почту и перейдите по ссылке в письме.");
        return;
      }

   
      if (data.user) {
        console.log('[REGISTRATION] User created, proceeding with user record creation for:', data.user.id);


        console.log('[REGISTRATION] Inserting user record...')
        let userInsertData, userInsertError;

        try {
 
          const apiResponse = await fetch('/api/auth/user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: data.user.id,
              email: email,
              first_name: firstName,
              last_name: lastName,
              phone: phone,
              role: userRole,
              is_verified: true
            }),
          });

          if (apiResponse.ok) {
            userInsertData = await apiResponse.json();
            userInsertError = null;
            console.log('[REGISTRATION] User created via API successfully')
          } else {
            throw new Error('API failed');
          }
        } catch (apiError) {
          console.log('[REGISTRATION] API failed, trying direct Supabase...')
   
          const result = await supabase
            .from('users')
            .insert({
              id: data.user.id,
              email: email,
              first_name: firstName,
              last_name: lastName,
              phone: phone,
              role: userRole,
              is_verified: true
            })
            .select()
            .single();

          userInsertData = result.data;
          userInsertError = result.error;
        }

        console.log('[REGISTRATION] User insert result:', { data: userInsertData, error: userInsertError })
        if (userInsertError) {
          console.error('[REGISTRATION] Error creating user record:', userInsertError);
          console.error('[REGISTRATION] Error details:', {
            message: userInsertError.message,
            details: userInsertError.details,
            hint: userInsertError.hint,
            code: userInsertError.code
          });
          setError(`Ошибка при создании профиля: ${userInsertError.message}`);
          return;
        }

        console.log('[REGISTRATION] User record created successfully')

   
        if (userRole === "therapist") {
          console.log('[REGISTRATION] Creating therapist profile for user:', data.user.id)
          const response = await fetch("/api/auth/register-therapist", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: data.user.id,
              userData: {
                email: email,
                first_name: firstName,
                last_name: lastName,
                phone: phone,
                user_role: userRole
              }
            }),
          });

          console.log('[REGISTRATION] Therapist creation response status:', response.status)
          const therapistData = await response.json()
          console.log('[REGISTRATION] Therapist creation response:', therapistData)

          if (!response.ok) {
            const errorData = await response.json();
            console.error('Therapist creation error:', errorData);
            setError("Аккаунт создан, но произошла ошибка при создании профиля терапевта.");
            return;
          }
        }


        console.log('[REGISTRATION] Registration completed successfully, redirecting...')


        console.log('[REGISTRATION] Registration successful, redirecting to login')
        setTimeout(() => {
          router.push("/auth/login");
        }, 1000)
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Произошла ошибка при регистрации");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
      <h3 className="text-2xl font-bold text-[#143B64] mb-6 text-center">Регистрация</h3>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Имя"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="h-11 px-3 border border-[#143B64]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#143B64]"
            required
          />
          <input
            type="text"
            placeholder="Фамилия"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="h-11 px-3 border border-[#143B64]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#143B64]"
            required
          />
        </div>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-11 w-full px-3 border border-[#143B64]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#143B64]"
          required
        />

        <input
          type="tel"
          placeholder="Телефон"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="h-11 w-full px-3 border border-[#143B64]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#143B64]"
          required
        />

        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-11 w-full px-3 border border-[#143B64]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#143B64]"
          required
        />
        <input
          type="password"
          placeholder="Подтвердите пароль"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="h-11 w-full px-3 border border-[#143B64]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#143B64]"
          required
        />

        <div className="flex flex-col space-y-2">
          <label className="text-[#143B64] font-medium">Выберите тип аккаунта:</label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="userRole"
                checked={userRole === "client"}
                onChange={() => setUserRole("client")}
                className="h-4 w-4 text-[#143B64] focus:ring-[#143B64]"
              />
              <span className="text-[#143B64]">Клиент</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="userRole"
                checked={userRole === "therapist"}
                onChange={() => setUserRole("therapist")}
                className="h-4 w-4 text-[#143B64] focus:ring-[#143B64]"
              />
              <span className="text-[#143B64]">Терапевт</span>
            </label>
          </div>
        </div>

        {error && <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</div>}

        <button
          type="submit"
          className="w-full h-11 bg-[#143B64] text-white rounded-md hover:bg-[#143B64]/90 transition-colors"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Создание аккаунта..." : "Создать аккаунт"}
        </button>
      </form>
    </div>
  );
};

export default RegistrationFormWithLogic;
