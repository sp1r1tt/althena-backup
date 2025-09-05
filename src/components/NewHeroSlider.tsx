"use client";

import React from 'react';

interface NewHeroSliderProps {
  contentType: 'video' | 'image';
  src: string;
  title: string;
  text?: string;
}

const NewHeroSlider: React.FC<NewHeroSliderProps> = ({ contentType, src, title, text }) => {
  return (
    <div className="relative w-full h-[600px] sm:h-[400px] md:h-[534px] lg:h-[700px] aspect-[16/9] box-border">
      {contentType === 'video' ? (
        <iframe
          src="https://drive.google.com/file/d/1a_FIuv9ZVCEeYTdd9mIdfUJUZ37RQhUy/preview"
          title="Hero Video"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
          className="w-full h-full object-cover"
        ></iframe>
      ) : (
        <img
          src={src}
          alt="Hero Slider Image"
          className="w-full h-full object-cover"
        />
      )}
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-15 z-[5]"></div>
      {/* Τίτλος και Κείμενο */}
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
  );
};

export default NewHeroSlider;