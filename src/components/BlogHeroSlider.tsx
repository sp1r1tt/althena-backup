"use client";

import React from 'react';
import Image from 'next/image';

interface BlogHeroSliderProps {
  imageSrc: string;
}

const BlogHeroSlider: React.FC<BlogHeroSliderProps> = ({ imageSrc }) => {
  const [imageError, setImageError] = React.useState<boolean>(false);

  const handleImageError = () => {
    console.error('Failed to load image:', imageSrc);
    setImageError(true);
  };

  return (
    <div className="relative w-full h-[800px] md:h-[534px] sm:h-[400px]">
      {imageError ? (
        <p className="text-center text-red-500 absolute inset-0 flex items-center justify-center">
          Failed to load image: {imageSrc}
        </p>
      ) : (
        <>
          <Image
            src={imageSrc}
            alt="Hero Image"
            fill
            className="object-cover"
            style={{ objectFit: 'cover' }}
            onError={handleImageError}
          />
          <div className="absolute inset-0 bg-gray-500/15 group-hover:bg-black/50 transition-all duration-300 z-[5]" />
        </>
      )}
    </div>
  );
};

export default BlogHeroSlider;