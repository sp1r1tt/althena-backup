"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NataliaContent from './NataliaContent';

interface Slide {
  src?: string;
  title?: string;
  text?: string;
  link?: string;
  content?: React.ReactNode;
  alt?: string;
  category?: string;
}

interface NataliaHeroSliderProps {
  slide1?: Slide;
  slide2?: Slide;
}

const NataliaHeroSlider: React.FC<NataliaHeroSliderProps> = ({ slide1, slide2 }) => {
  return (
    <div className="relative flex flex-col sm:flex-row gap-[8px] bg-[#f2f1f0]">
      <div className="w-full sm:w-[35%] rounded-tr-lg rounded-br-lg overflow-hidden min-h-[200px] relative">
        {slide1?.src ? (
          <Image
            src={slide1.src}
            alt={slide1.alt || "Expert Image"}
            fill
            className="object-cover rounded-tr-lg rounded-br-lg"
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500">No media provided</p>
          </div>
        )}
      </div>
      <div className="w-full sm:w-[65%] rounded-tr-[8px] rounded-br-[8px] rounded-tl-lg rounded-bl-lg h-auto bg-[#f2f1f0] flex flex-col overflow-visible">
        {slide2?.src ? (
          <Image
            src={slide2.src}
            alt="Slide 2"
            fill
            className="object-cover"
            style={{ objectFit: 'cover' }}
          />
        ) : slide2?.content ? (
          <div className="relative w-full max-w-full !text-[#143B64] text-left z-[6] pl-4 xs:pl-6 sm:pl-8 pr-12 xs:pr-14 sm:pr-16 pt-8 pb-8 flex flex-col items-start justify-start">
            {slide2.content}
          </div>
        ) : (
          <div className="relative w-full max-w-full !text-[#143B64] text-left z-[6] pl-4 xs:pl-6 sm:pl-8 pr-12 xs:pr-14 sm:pr-16 pt-8 pb-8 flex flex-col items-start justify-start">
            {slide2?.title && slide2?.category && (
              <NataliaContent name={slide2.title} category={slide2.category} />
            )}
            {slide2?.link && (
              <Link
                href={slide2.link}
                className="inline-block px-6 py-3 bg-[#8EB5BA] !text-white no-underline rounded-[30px] text-base mt-4 transition-colors duration-300 hover:bg-[#edbfab] hover:!text-[#143B64] shadow-md"
              >
                Забронировать
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NataliaHeroSlider;