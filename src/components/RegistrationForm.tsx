"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

// Схема валидации с Zod
const registrationSchema = z
  .object({
    firstName: z.string().min(2, 'Имя должно содержать не менее 2 символов'),
    lastName: z.string().min(2, 'Фамилия должна содержать не менее 2 символов'),
    email: z.string().email('Пожалуйста, введите действительный email'),
    password: z.string().min(6, 'Пароль должен содержать не менее 6 символов'),
    confirmPassword: z.string().min(6, 'Подтверждение пароля должно содержать не менее 6 символов'),
    countryCode: z.string().optional(),
    phoneNumber: z.string().optional(),
    termsAccepted: z.literal(true, {
      errorMap: () => ({ message: 'Вы должны принять условия использования' }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

type RegistrationFormData = z.infer<typeof registrationSchema>;

const RegistrationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      countryCode: '+30', // По умолчанию Греция
      phoneNumber: '',
      termsAccepted: false,
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  // Отслеживание значений полей для изменения цвета при заполнении
  const formValues = watch();

  const onSubmit = (data: RegistrationFormData) => {
    console.log('Данные регистрации:', data);
    // Здесь можно добавить вызов API для регистрации
  };

  return (
    <div className="w-full max-w-[515px] mx-auto p-3 sm:p-4 bg-[rgba(237,191,171,0.2)] rounded-lg">
      <h2 className="text-[clamp(18px,3.5vw,28px)] font-playfair font-bold mb-3 text-[#143B64] text-center">
        Регистрация пользователя
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        {/* Имя */}
        <div className="flex flex-row items-center gap-2">
          <label htmlFor="firstName" className="text-[#143B64] font-playfair text-base w-24">
            Имя
          </label>
          <div className="flex-1">
            <input
              id="firstName"
              type="text"
              {...register('firstName')}
              className={`w-full p-1 rounded-[8px] text-[#143B64] text-base focus:outline-none focus:ring-2 focus:ring-[#edbfab] ${
                formValues.firstName ? 'bg-[#c9c3bd]' : 'bg-[#f2f1f0]'
              }`}
              placeholder="Введите ваше имя"
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
            )}
          </div>
        </div>

        {/* Фамилия */}
        <div className="flex flex-row items-center gap-2">
          <label htmlFor="lastName" className="text-[#143B64] font-playfair text-base w-24">
            Фамилия
          </label>
          <div className="flex-1">
            <input
              id="lastName"
              type="text"
              {...register('lastName')}
              className={`w-full p-1 rounded-[8px] text-[#143B64] text-base focus:outline-none focus:ring-2 focus:ring-[#edbfab] ${
                formValues.lastName ? 'bg-[#c9c3bd]' : 'bg-white'
              }`}
              placeholder="Введите вашу фамилию"
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-row items-center gap-2">
          <label htmlFor="email" className="text-[#143B64] font-playfair text-base w-24">
            Email
          </label>
          <div className="flex-1">
            <input
              id="email"
              type="email"
              {...register('email')}
              className={`w-full p-1 rounded-[8px] text-[#143B64] text-base focus:outline-none focus:ring-2 focus:ring-[#c9c3bd] ${
                formValues.email ? 'bg-[#c9c3bd]' : 'bg-[#f2f1f0]'
              }`}
              placeholder="Введите ваш email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>
        </div>

        {/* Пароль */}
        <div className="flex flex-row items-center gap-2">
          <label htmlFor="password" className="text-[#143B64] font-playfair text-base w-24">
            Пароль
          </label>
          <div className="flex-1 relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              className={`w-full p-1 pr-8 rounded-[8px] text-[#143B64] text-base focus:outline-none focus:ring-2 focus:ring-[#edbfab] ${
                formValues.password ? 'bg-[#c9c3bd]' : 'bg-[#f2f1f0]'
              }`}
              placeholder="Введите ваш пароль"
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#143B64] text-base"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>
        </div>

        {/* Подтверждение пароля */}
        <div className="flex flex-row items-center gap-2">
          <label htmlFor="confirmPassword" className="text-[#143B64] font-playfair text-base w-24">
            Подтверждение пароля
          </label>
          <div className="flex-1 relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              {...register('confirmPassword')}
              className={`w-full p-1 pr-8 rounded-[8px] text-[#143B64] text-base focus:outline-none focus:ring-2 focus:ring-[#edbfab] ${
                formValues.confirmPassword ? 'bg-[#c9c3bd]' : 'bg-[#f2f1f0]'
              }`}
              placeholder="Подтвердите ваш пароль"
            />
            <button
              type="button"
              onClick={toggleShowConfirmPassword}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#143B64] text-base"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>
        </div>

        {/* Телефон - Разделение кода страны и номера */}
        <div className="flex flex-row items-center gap-2">
          <label htmlFor="countryCode" className="text-[#143B64] font-playfair text-base w-24">
            Телефон
          </label>
          <div className="flex-1 flex items-center gap-2">
            <select
              id="countryCode"
              {...register('countryCode')}
              className="w-24 p-1 rounded-[8px] text-[#143B64] text-base focus:outline-none focus:ring-2 focus:ring-[#edbfab] bg-[#f2f1f0]"
            >
              <option value="+30">+30 (Греция)</option>
              <option value="+357">+357 (Кипр)</option>
              <option value="+7">+7 (Россия)</option>
              <option value="+380">+380 (Украина)</option>
              <option value="+375">+375 (Беларусь)</option>
              <option value="+374">+374 (Армения)</option>
              <option value="+995">+995 (Грузия)</option>
            </select>
            <div className="flex-1">
              <input
                id="phoneNumber"
                type="tel"
                {...register('phoneNumber')}
                className={`w-full p-1 rounded-[8px] text-[#143B64] text-base focus:outline-none focus:ring-2 focus:ring-[#edbfab] ${
                  formValues.phoneNumber ? 'bg-[#c9c3bd]' : 'bg-[#f2f1f0]'
                }`}
                placeholder="Введите ваш номер"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Условия использования */}
        <div className="flex items-center gap-2">
          <input
            id="termsAccepted"
            type="checkbox"
            {...register('termsAccepted')}
            className="h-4 w-4 text-[#edbfab] focus:ring-[#edbfab] border-[#b0a9a2] rounded"
          />
          <label htmlFor="termsAccepted" className="text-[#143B64] font-playfair text-sm">
            Я принимаю{' '}
            <a href="/terms" className="text-[#edbfab] hover:underline">
              Условия использования
            </a>
          </label>
        </div>
        {errors.termsAccepted && (
          <p className="text-red-500 text-xs mt-1">{errors.termsAccepted.message}</p>
        )}

        {/* Кнопка отправки */}
        <button
          type="submit"
          className="mt-3 px-4 py-2 bg-[#8EB5BA] text-white rounded-[20px] font-playfair transition-colors duration-300 hover:bg-[#edbfab] hover:text-[#143B64]"
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;