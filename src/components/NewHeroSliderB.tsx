"use client";

import React from 'react';
import Link from 'next/link';

interface Slide {
  src: string;
  title: string;
  text?: string;
  link?: string;
}

interface NewHeroSliderBProps {
  slide1: Slide;
  slide2: Slide;
}

const NewHeroSliderB: React.FC<NewHeroSliderBProps> = ({ slide1, slide2 }) => {
  return (
    <div className="relative flex flex-col sm:flex-row gap-[8px]">
      {/* Πλαίσιο 1 (Αριστερό) */}
      <div className="w-full sm:w-1/2 relative group rounded-tr-lg rounded-br-lg overflow-hidden h-[600px] sm:h-[400px] md:h-[534px] lg:h-[700px] aspect-[16/9] box-border">
        <img
          src={slide1.src}
          alt="Hero Slider Image 1"
          className="w-full h-full object-cover"
        />
        {/* Overlay που εμφανίζεται στο hover ή tap */}
        <div className="absolute inset-0 bg-[rgba(242,241,240,0.9)] opacity-0 group-hover:opacity-100 touch:opacity-100 transition-opacity duration-300 z-[5]"></div>
        {/* Τίτλος, Κείμενο και Διακόπτης */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full max-w-[90%] xs:max-w-[400px] sm:max-w-[500px] lg:max-w-[600px] mx-auto left-0 right-0 !text-[#143B64] text-center z-[6] px-3 xs:px-4 sm:px-6 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 touch:opacity-100 transition-opacity duration-300">
          <h2 className="text-[clamp(20px,4.5vw,40px)] leading-tight mb-3 whitespace-pre-line mx-auto !text-[#143B64]">
            {slide1.title}
          </h2>
          {slide1.text && (
            <p className="text-[clamp(12px,2vw,16px)] leading-[1.3] max-w-[90%] xs:max-w-[400px] sm:max-w-[500px] lg:max-w-[600px] mx-auto whitespace-pre-line mb-3 !text-[#143B64]">
              {slide1.text}
            </p>
          )}
          {slide1.link && (
            <Link
              href={slide1.link}
              className="inline-block px-5 py-2 bg-[#8EB5BA] !text-white no-underline rounded-[30px] text-[clamp(12px,2vw,16px)] mt-3 transition-colors duration-300 hover:bg-[#edbfab] hover:!text-[#143B64] shadow-md"
            >
              Узнать больше
            </Link>
          )}
        </div>
      </div>
      {/* Πλαίσιο 2 (Δεξί) */}
      <div className="w-full sm:w-1/2 relative group rounded-tl-lg rounded-bl-lg overflow-hidden h-[600px] sm:h-[400px] md:h-[534px] lg:h-[700px] aspect-[16/9] box-border">
        <img
          src={slide2.src}
          alt="Hero Slider Image 2"
          className="w-full h-full object-cover"
        />
        {/* Overlay που εμφανίζεται στο hover ή tap */}
        <div className="absolute inset-0 bg-[rgba(242,241,240,0.9)] opacity-0 group-hover:opacity-100 touch:opacity-100 transition-opacity duration-300 z-[5]"></div>
        {/* Τίτλος, Κείμενο και Διακόπτης */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full max-w-[90%] xs:max-w-[400px] sm:max-w-[500px] lg:max-w-[600px] mx-auto left-0 right-0 !text-[#143B64] text-center z-[6] px-3 xs:px-4 sm:px-6 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 touch:opacity-100 transition-opacity duration-300">
          <h2 className="text-[clamp(20px,4.5vw,40px)] leading-tight mb-3 whitespace-pre-line mx-auto !text-[#143B64]">
            {slide2.title}
          </h2>
          {slide2.text && (
            <p className="text-[clamp(12px,2vw,16px)] leading-[1.3] max-w-[90%] xs:max-w-[400px] sm:max-w-[500px] lg:max-w-[600px] mx-auto whitespace-pre-line mb-3 !text-[#143B64]">
              {slide2.text}
            </p>
          )}
          {slide2.link && (
            <Link
              href={slide2.link}
              className="inline-block px-5 py-2 bg-[#8EB5BA] !text-white no-underline rounded-[30px] text-[clamp(12px,2vw,16px)] mt-3 transition-colors duration-300 hover:bg-[#edbfab] hover:!text-[#143B64] shadow-md"
            >
              Узнать больше
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewHeroSliderB;