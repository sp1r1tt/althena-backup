// src/components/NewHeroSliderC.tsx
"use client";

import React from 'react';
import Link from 'next/link';

interface Slide {
  src: string;
  title: string;
  text?: string;
  link?: string;
}

interface NewHeroSliderCProps {
  slide1: Slide;
  slide2: Slide;
  slide3: Slide;
}

const NewHeroSliderC: React.FC<NewHeroSliderCProps> = ({ slide1, slide2, slide3 }) => {
  return (
    <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-[8px]">
      {/* Πλαίσιο 1 */}
      <div className="w-full relative group rounded-lg overflow-hidden h-[534px] sm:h-[400px]">
        <img
          src={slide1.src}
          alt="Hero Slider Image 1"
          className="w-full h-full object-cover"
        />
        {/* Overlay που εμφανίζεται μόνο στο hover */}
        <div className="absolute inset-0 bg-[rgba(242,241,240,0.9)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[5]"></div>
        {/* Τίτλος, Κείμενο και Διακόπτης */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full max-w-[500px] mx-auto left-0 right-0 !text-[#143B64] text-center z-[6] px-4 xs:px-6 sm:px-8 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h2 className="text-[26px] xs:text-[33px] sm:text-[40px] md:text-[46px] lg:text-[48px] leading-none mb-5 whitespace-pre-line max-w-[500px] mx-auto !text-[#143B64]">
            {slide1.title}
          </h2>
          {slide1.text && (
            <p className="text-base xs:text-base sm:text-lg leading-[1.3] max-w-[500px] mx-auto whitespace-pre-line mb-5 !text-[#143B64]">
              {slide1.text}
            </p>
          )}
          {slide1.link && (
            <Link
              href={slide1.link}
              className="inline-block px-6 py-3 bg-[#8EB5BA] !text-white no-underline rounded-[30px] text-base mt-4 transition-colors duration-300 hover:bg-[#edbfab] hover:!text-[#143B64] shadow-md"
            >
              Узнать больше
            </Link>
          )}
        </div>
      </div>
      {/* Πλαίσιο 2 */}
      <div className="w-full relative group rounded-lg overflow-hidden h-[534px] sm:h-[400px]">
        <img
          src={slide2.src}
          alt="Hero Slider Image 2"
          className="w-full h-full object-cover"
        />
        {/* Overlay που εμφανίζεται μόνο στο hover */}
        <div className="absolute inset-0 bg-[rgba(242,241,240,0.9)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[5]"></div>
        {/* Τίτλος, Κείμενο και Διακόπτης */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full max-w-[500px] mx-auto left-0 right-0 !text-[#143B64] text-center z-[6] px-4 xs:px-6 sm:px-8 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h2 className="text-[26px] xs:text-[33px] sm:text-[40px] md:text-[46px] lg:text-[48px] leading-none mb-5 whitespace-pre-line max-w-[500px] mx-auto !text-[#143B64]">
            {slide2.title}
          </h2>
          {slide2.text && (
            <p className="text-base xs:text-base sm:text-lg leading-[1.3] max-w-[500px] mx-auto whitespace-pre-line mb-5 !text-[#143B64]">
              {slide2.text}
            </p>
          )}
          {slide2.link && (
            <Link
              href={slide2.link}
              className="inline-block px-6 py-3 bg-[#8EB5BA] !text-white no-underline rounded-[30px] text-base mt-4 transition-colors duration-300 hover:bg-[#edbfab] hover:!text-[#143B64] shadow-md"
            >
              Узнать больше
            </Link>
          )}
        </div>
      </div>
      {/* Πλαίσιο 3 */}
      <div className="w-full relative group rounded-lg overflow-hidden h-[534px] sm:h-[400px]">
        <img
          src={slide3.src}
          alt="Hero Slider Image 3"
          className="w-full h-full object-cover"
        />
        {/* Overlay που εμφανίζεται μόνο στο hover */}
        <div className="absolute inset-0 bg-[rgba(242,241,240,0.9)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[5]"></div>
        {/* Τίτλος, Κείμενο και Διακόπτης */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full max-w-[500px] mx-auto left-0 right-0 !text-[#143B64] text-center z-[6] px-4 xs:px-6 sm:px-8 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h2 className="text-[26px] xs:text-[33px] sm:text-[40px] md:text-[46px] lg:text-[48px] leading-none mb-5 whitespace-pre-line max-w-[500px] mx-auto !text-[#143B64]">
            {slide3.title}
          </h2>
          {slide3.text && (
            <p className="text-base xs:text-base sm:text-lg leading-[1.3] max-w-[500px] mx-auto whitespace-pre-line mb-5 !text-[#143B64]">
              {slide3.text}
            </p>
          )}
          {slide3.link && (
            <Link
              href={slide3.link}
              className="inline-block px-6 py-3 bg-[#8EB5BA] !text-white no-underline rounded-[30px] text-base mt-4 transition-colors duration-300 hover:bg-[#edbfab] hover:!text-[#143B64] shadow-md"
            >
              Узнать больше
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewHeroSliderC;