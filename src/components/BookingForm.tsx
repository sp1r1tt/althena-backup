"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Σχήμα επικύρωσης για τη φόρμα κράτησης
const bookingSchema = z.object({
  bookingDate: z.string().min(1, 'Пожалуйста, выберите дату бронирования'),
  time: z.string().min(1, 'Пожалуйста, выберите время бронирования'),
  comments: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  expertName?: string; // Προαιρετικό
  availability?: string[]; // Προαιρετικό
  expertId?: string | number; // Προαιρετικό
  backgroundColor?: string;
}

const BookingForm: React.FC<BookingFormProps> = ({ expertName, availability, backgroundColor = "rgba(237,191,171,0.2)", expertId }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      bookingDate: '',
      time: '',
      comments: '',
    },
  });

  // Παρακολούθηση των τιμών της φόρμας
  const formValues = watch();

  // Παρακολούθηση της επιλεγμένης ημερομηνίας
  const bookingDate = watch('bookingDate');
  const availableTimes = bookingDate && availability[bookingDate] ? availability[bookingDate] : [];

  const onSubmit = (data: BookingFormData) => {
    console.log('Данные бронирования:', { ...data, expertId, expertName });
    // Εδώ μπορείς να προσθέσεις API κλήση για αποστολή της κράτησης
  };

  return (
    <div className="w-full max-w-[450px] mx-auto p-3 sm:p-4 rounded-lg" style={{ backgroundColor }}>
      <h2 className="text-[clamp(18px,3.5vw,28px)] font-playfair font-bold mb-3 text-[#143B64] text-center">
        Запись на консультацию
      </h2>
      <p className="text-[#143B64] font-playfair text-base mb-3 text-center">
        Добро пожаловать, {expertName}!
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        {/* Дата бронирования */}
        <div className="flex flex-col gap-1">
          <label htmlFor="bookingDate" className="text-[#143B64] font-playfair text-base">
            Дата бронирования
          </label>
          <input
            id="bookingDate"
            type="date"
            {...register('bookingDate')}
            className={`w-full p-1 rounded-[8px] text-[#143B64] text-base focus:outline-none focus:ring-2 focus:ring-[#edbfab] ${
              formValues.bookingDate ? 'bg-[#c9c3bd]' : 'bg-[#f2f1f0]'
            }`}
          />
          {errors.bookingDate && (
            <p className="text-red-500 text-xs mt-1">{errors.bookingDate.message}</p>
          )}
        </div>

        {/* Выбор времени */}
        <div className="flex flex-col gap-1">
          <label className="text-[#143B64] font-playfair text-base">
            Время
          </label>
          <div className="grid grid-cols-2 gap-2">
            {availableTimes && availableTimes.length > 0 ? (
              availableTimes.map((time) => (
                <label key={time} className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={time}
                    {...register('time')}
                    onChange={() => {
                      setValue('time', time);
                    }}
                    className="h-4 w-4 text-[#edbfab] focus:ring-[#edbfab] border-[#b0a9a2]"
                  />
                  <span className="text-[#143B64] font-playfair text-base">{time}</span>
                </label>
              ))
            ) : (
              <p className="text-gray-500 text-sm col-span-2">
                {bookingDate ? 'Нет доступных часов на эту дату' : 'Выберите дату'}
              </p>
            )}
            {errors.time && (
              <p className="text-red-500 text-xs mt-1 col-span-2">{errors.time.message}</p>
            )}
          </div>
        </div>

        {/* Комментарии */}
        <div className="flex flex-col gap-1">
          <label htmlFor="comments" className="text-[#143B64] font-playfair text-base">
            Комментарии
          </label>
          <textarea
            id="comments"
            {...register('comments')}
            className={`w-full p-1 rounded-[8px] text-[#143B64] text-base focus:outline-none focus:ring-2 focus:ring-[#edbfab] ${
              formValues.comments ? 'bg-[#c9c3bd]' : 'bg-[#f2f1f0]'
            }`}
            placeholder="Введите ваши комментарии (необязательно)"
            rows={3}
          />
          {errors.comments && (
            <p className="text-red-500 text-xs mt-1">{errors.comments.message}</p>
          )}
        </div>

        {/* Кнопка отправки */}
        <button
          type="submit"
          className="mt-3 px-4 py-2 bg-[#8EB5BA] text-white rounded-[20px] font-playfair text-base transition-colors duration-300 hover:bg-[#edbfab] hover:text-[#143B64]"
        >
          Забронировать
        </button>
      </form>
    </div>
  );
};

export default BookingForm;