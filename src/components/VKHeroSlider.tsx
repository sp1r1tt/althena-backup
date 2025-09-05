
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Slide {
  src?: string;
  title?: string;
  text?: string;
  link?: string;
  content?: React.ReactNode;
  alt?: string;
}

interface VKHeroSliderProps {
  slide1?: Slide;
  slide2?: Slide;
}

const VKHeroSlider: React.FC<VKHeroSliderProps> = ({ slide1, slide2 }) => {
  return (
    <div className="relative flex flex-col md:flex-row bg-[#f2f1f0] md:items-stretch gap-8 md:gap-4 lg:gap-[14px] xl:gap-4 2xl:gap-[16px] justify-center">
      {/* Πλαίσιο 1 (Αριστερό, 40% σε tablet/desktop, 100% σε mobile) */}
      <div className="w-full md:w-[40%] rounded-lg overflow-hidden relative group min-h-[300px] md:min-h-0 mx-0">
        {slide1?.src ? (
          <>
            <Image
              src={slide1.src}
              alt={slide1.alt || "Slide 1"}
              fill
              className="w-full h-full object-cover object-center"
              style={{
                transform: typeof window !== 'undefined' && window.innerWidth < 768 ? 'scale(3.0)' : 'scale(calc(1.7 + (1200 - 100vw) * 0.0011574))',
                transformOrigin: 'center',
              }}
              sizes="(max-width: 768px) 100vw, 40vw"
            />
            <div className="absolute top-1/2 -translate-y-1/2 w-full max-w-[520px] mx-auto left-0 right-0 !text-[#143B64] text-center z-[6] px-4 xs:px-6 md:px-8 flex flex-col items-center justify-center opacity-100">
              {slide1.title && (
                <h2 className="text-[20px] xs:text-[26px] md:text-[40px] lg:text-[48px] leading-none mb-5 whitespace-pre-line max-w-[520px] mx-auto !text-[#143B64] font-playfair">
                  {slide1.title}
                </h2>
              )}
              {slide1.text && (
                <div
                  className="text-sm xs:text-base md:text-lg leading-[1.3] max-w-[520px] mx-auto mb-5 !text-[#143B64]"
                  dangerouslySetInnerHTML={{ __html: slide1.text }}
                />
              )}
              {slide1.link && (
                <Link
                  href={slide1.link}
                  className="inline-block px-4 py-2 md:px-6 md:py-3 bg-[#8EB5BA] !text-white no-underline rounded-[30px] text-sm md:text-base mt-4 transition-colors duration-300 hover:bg-[#edbfab] hover:!text-[#143B64] shadow-md"
                >
                  Узнать больше
                </Link>
              )}
            </div>
          </>
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500">No media provided</p>
          </div>
        )}
      </div>
      {/* Πλαίσιο 2 (Δεξί, 60% σε tablet/desktop, 100% σε mobile) */}
      <div className="w-full md:w-[60%] rounded-tr-[8px] rounded-br-[8px] rounded-tl-lg rounded-bl-lg bg-[#f2f1f0] flex flex-col overflow-visible">
        {slide2?.src ? (
          <Image
            src={slide2.src}
            alt="Slide 2"
            fill
            className="w-full h-full object-cover"
            sizes="(max-width: 768px) 100vw, 60vw"
          />
        ) : slide2?.content ? (
          <div className="relative w-full max-w-full !text-[#143B64] text-left z-[6] pl-8 xs:pl-8 md:pl-4 pr-12 xs:pr-12 md:pr-12 pt-4 md:pt-40 pb-8 flex flex-col items-start justify-start !important">
            {slide2.content}
          </div>
        ) : (
          <div className="relative w-full max-w-full !text-[#143B64] text-left z-[6] pl-8 xs:pl-8 md:pl-4 pr-12 xs:pr-12 md:pr-12 pt-4 md:pt-40 pb-8 flex flex-col items-start justify-start !important">
            {slide2?.title && (
              <h2 className="text-[16px] xs:text-[20px] md:text-[40px] lg:text-[48px] leading-none mb-5 whitespace-pre-line max-w-[1000px] !text-[#143B64] font-playfair">
                {slide2.title}
              </h2>
            )}
            {slide2?.text && (
              <div
                className="text-xs xs:text-sm md:text-lg leading-[1.3] mb-5 max-w-[1000px] !text-[#143B64] w-full"
                dangerouslySetInnerHTML={{ __html: slide2.text }}
              />
            )}
            {slide2?.link && (
              <Link
                href={slide2.link}
                className="inline-block px-4 py-2 md:px-6 md:py-3 bg-[#8EB5BA] !text-white no-underline rounded-[30px] text-xs md:text-base mt-4 transition-colors duration-300 hover:bg-[#edbfab] hover:!text-[#143B64] shadow-md"
              >
                Узнать больше
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VKHeroSlider;