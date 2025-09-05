// src/components/ViktoriiaContent3.tsx
"use client";

import React, { useRef, useState } from 'react';
import BookingForm from './BookingForm';
import { expertsData } from '@/data/expertsData';

const ViktoriiaContent3: React.FC = () => {
  const viktoriia = expertsData.find((expert) => expert.name === "Виктория Котенко") || {
    id: 1,
    name: "Виктория Котенко",
    availability: {
      "2025-05-28": ["09:00", "10:00", "11:00", "14:00", "15:00"],
      "2025-05-29": ["10:00", "12:00", "14:00", "16:00"],
      "2025-05-30": ["09:30", "11:30", "13:30"],
    },
  };

  const videoRef = useRef<HTMLIFrameElement>(null);
  const modalVideoRef = useRef<HTMLIFrameElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.src = isMuted
        ? "https://www.youtube.com/embed/U4o9jcUW5AM?controls=0&rel=0&autoplay=1&loop=1&playlist=U4o9jcUW5AM&mute=1"
        : "https://www.youtube.com/embed/U4o9jcUW5AM?controls=0&rel=0&autoplay=1&loop=1&playlist=U4o9jcUW5AM&mute=0";
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-full mx-auto pt-0 pb-0 mt-0">
      <div className="grid grid-cols-1 md:grid-cols-[50%_15%_35%] gap-4">
        {/* Πλαίσιο 1 (50% σε desktop, 100% σε mobile) - Στρογγύλεμα μόνο δεξιά */}
        <div className="bg-[rgba(142,181,186,0.4)] p-4 md:rounded-r-lg md:rounded-l-0 rounded-lg">
          <p className="text-gray-600 text-xs md:text-sm pt-3 pr-3 pb-3 pl-4 md:pl-[85px]">
            <strong className="text-lg md:text-xl">Почему мне можно доверять?</strong>
            <br /><br />
            У меня высшее психологическое образование и глубокая теоретическая база — за последние годы я прошла более 10 профессиональных обучений, в том числе по гештальт-подходу, КПТ, работе с психотравмой, тревожными и депрессивными состояниями, психосоматике, консультированию пар.
            <br /><br />
            До психологии я работала финансовым аналитиком и бухгалтером. Это научило меня видеть структуру там, где кажется — только хаос. Сейчас этот навык помогает мне работать с ментальными процессами: видеть неочевидное, выстраивать причинно-следственные связи, находить точки опоры.
            <br /><br />
            В терапии я не «учитель» и не «судья». Я — проводник, партнёр, внимательный собеседник. Иногда — зеркало. Иногда — поддержка. Но всегда — искренне заинтересованный человек рядом.
            <br /><br />
            Каждая история для меня уникальна. И если вы сейчас в поиске — возможно, именно с этой точки начинается ваш путь к себе.
          </p>
        </div>
        {/* Πλαίσιο 2 (15% σε desktop, 100% σε mobile) - Βίντεο, στρογγύλεμα σε όλες τις γωνίες */}
        <div className="bg-[#143B64] p-0 rounded-lg relative overflow-hidden aspect-[9/16] mx-auto w-full max-w-[300px] md:max-w-full">
          <iframe
            ref={videoRef}
            src="https://www.youtube.com/embed/U4o9jcUW5AM?controls=0&rel=0&autoplay=1&loop=1&playlist=U4o9jcUW5AM&mute=1"
            title="VK Intro Video"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
            className="w-full h-full object-contain"
          ></iframe>
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-2 bg-black bg-opacity-50">
            <button
              onClick={toggleMute}
              className="text-white hover:text-gray-300 focus:outline-none"
            >
              {isMuted ? (
                <svg className="w-6 h-6" fill="#ffffff" viewBox="0 0 24 24">
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="#ffffff" viewBox="0 0 24 24">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                </svg>
              )}
            </button>
            <button
              onClick={openModal}
              className="text-white hover:text-gray-300 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="#ffffff" viewBox="0 0 24 24">
                <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
              </svg>
            </button>
          </div>
        </div>
        {/* Πλαίσιο 3 (35% σε desktop, 100% σε mobile) - Booking Form, στρογγύλεμα μόνο αριστερά */}
        <div className="bg-[rgba(237,191,171,0.3)] p-4 md:rounded-l-lg md:rounded-r-0 rounded-lg">
          <BookingForm
            expertName={viktoriia.name}
            availability={viktoriia.availability}
            backgroundColor="transparent"
            expertId={viktoriia.id}
          />
        </div>
      </div>

      {/* Modal for the video */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative w-[90%] max-w-[560px] aspect-[9/16] bg-[#143B64] rounded-lg overflow-hidden">
            <iframe
              ref={modalVideoRef}
              src="https://www.youtube.com/embed/U4o9jcUW5AM?controls=0&rel=0&autoplay=1&loop=1&playlist=U4o9jcUW5AM"
              title="VK Intro Video"
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
              className="w-full h-full object-contain"
            ></iframe>
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white hover:text-gray-300 focus:outline-none"
            >
              <svg className="w-8 h-8" fill="#ffffff" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViktoriiaContent3;