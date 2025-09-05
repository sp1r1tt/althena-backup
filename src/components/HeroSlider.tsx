"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

const HeroSlider = ({ contentType, src, images = [], onSlideChange = () => {} }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [isVideoFinished, setIsVideoFinished] = useState(false);

  console.log('HeroSlider Props (inside component):', { contentType, src, images });

  const isValidContentType = ['video', 'slideshow', 'image', 'video-then-slideshow'].includes(contentType);
  const isValidSrc = typeof src === 'string' && src.trim() !== '';
  const isValidImages = Array.isArray(images) && images.length > 0 && images.every(item => typeof item === 'string' && item.trim() !== '');

  const slides = [];
  if (contentType === 'video' && isValidSrc) {
    slides.push({ type: 'video', src });
  } else if (contentType === 'image' && isValidSrc) {
    slides.push({ type: 'image', src });
  } else if (contentType === 'slideshow' && isValidImages) {
    slides.push(...images.map(item => ({ type: 'image', src: item })));
  } else if (contentType === 'video-then-slideshow' && isValidSrc && isValidImages) {
    if (!isVideoFinished) {
      slides.push({ type: 'video', src });
    } else {
      slides.push(...images.map(item => ({ type: 'image', src: item })));
    }
  }

  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % slides.length;
        if (nextIndex === 0 && contentType === 'video-then-slideshow' && isVideoFinished) {
          setIsVideoFinished(false);
          return 0;
        }
        return nextIndex;
      });

      if (contentType === 'video-then-slideshow' && !isVideoFinished) {
        setIsVideoFinished(true);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length, contentType, isVideoFinished]);

  useEffect(() => {
    if (typeof onSlideChange === 'function') {
      if (contentType === 'video-then-slideshow') {
        if (!isVideoFinished) {
          onSlideChange(0);
        } else {
          onSlideChange(currentSlideIndex + 1);
        }
      } else {
        onSlideChange(currentSlideIndex);
      }
    }
  }, [currentSlideIndex, isVideoFinished, contentType, onSlideChange]);

  const handleImageError = () => {
    console.error('Failed to load image:', src);
    setImageError(true);
  };

  const handleVideoEnded = () => {
    console.log('Video finished playing');
    setIsVideoFinished(true);
    setCurrentSlideIndex(0);
  };

  if (!isValidContentType || slides.length === 0) {
    console.log('Invalid content type or no slides:', contentType);
    return (
      <div className="relative w-full h-[800px] md:h-[534px] sm:h-[400px]">
        <p className="text-center text-red-500">Invalid HeroSlider content type or no slides available</p>
      </div>
    );
  }

  const currentSlide = slides[currentSlideIndex];

  return (
    <div className="relative w-full h-[800px] md:h-[534px] sm:h-[400px] group">
      {currentSlide.type === 'image' ? (
        <div className="relative w-full h-full">
          {imageError ? (
            <p className="text-center text-red-500">Failed to load image: {currentSlide.src}</p>
          ) : (
            <>
              <Image
                src={currentSlide.src}
                alt={`HeroSlider Image ${currentSlideIndex + 1}`}
                fill
                className="object-cover"
                style={{ objectFit: 'cover' }}
                onError={handleImageError}
              />
              <div className="absolute inset-0 bg-gray-500/15 group-hover:bg-black/50 group-hover:shadow-md transition-all duration-300 z-[5]"></div>
            </>
          )}
        </div>
      ) : (
        <>
          <video
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
            onEnded={handleVideoEnded}
          >
            <source src={currentSlide.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gray-500/15 group-hover:bg-black/50 group-hover:shadow-md transition-all duration-300 z-[5]"></div>
        </>
      )}
    </div>
  );
}

export default HeroSlider;