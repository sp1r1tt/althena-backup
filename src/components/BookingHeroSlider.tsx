"use client";

import React from 'react';
import Image from 'next/image';

interface BookingHeroSliderProps {
  src: string;
  title: string;
  text?: string;
  children?: React.ReactNode;
}

const BookingHeroSlider: React.FC<BookingHeroSliderProps> = ({ src, title, text, children }) => {
  return (
    <div className="relative !w-full h-[540px] sm:h-[360px] md:h-[481px] lg:h-[630px] box-border flex flex-col sm:flex-row gap-[8px] mx-0 px-0">
      <div className="relative w-full sm:w-[40%] h-[270px] sm:h-full rounded-tr-[8px] rounded-br-[8px]">
        <Image
          src={src}
          alt="Booking Hero Slider Image Left"
          fill
          className="object-cover rounded-tr-[8px] rounded-br-[8px]"
          style={{ objectFit: 'cover' }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-15 z-[5] rounded-tr-[8px] rounded-br-[8px]"></div>
        <div className="absolute top-1/2 -translate-y-1/2 w-full max-w-[90%] xs:max-w-[500px] md:max-w-[700px] lg:max-w-[920px] mx-auto left-0 right-0 !text-white text-center z-[6] px-2 xs:px-4 sm:px-8 flex flex-col items-center">
          <h2 className="text-[clamp(24px,5vw,48px)] leading-none mb-5 whitespace-pre-line max-w-[90%] xs:max-w-[500px] sm:max-w-[650px] mx-auto !text-white">
            {title}
          </h2>
          {text && (
            <p className="text-[clamp(14px,2vw,20px)] leading-[1.3] max-w-[90%] xs:max-w-[500px] sm:max-w-[650px] mx-auto whitespace-pre-line mb-5 !text-white">
              {text}
            </p>
          )}
        </div>
      </div>

      <div className="relative w-full sm:w-[60%] h-[270px] sm:h-full flex items-center justify-center bg-[rgba(64,78,112,1)] p-4 rounded-tl-[8px] rounded-bl-[8px]">
        {children ? children : <p className="text-black">Здесь должна быть форма</p>}
      </div>
    </div>
  );
};

export default BookingHeroSlider;