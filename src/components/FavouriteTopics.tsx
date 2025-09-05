"use client";

import React from 'react';
import Image from 'next/image';

const FavouriteTopics = () => {
  return (
    <div className="experts-section w-full bg-[rgba(237,191,171,0.2)] px-4 xs:px-6 sm:px-8 py-8">
      <div className="w-full max-w-[1120px] mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-playfair mb-5 whitespace-pre-line text-center">
          Наши эксперты
        </h2>
        <div className="experts-container">
          <div className="group">
            <div className="expert-image-wrapper">
              <Image
                src="/images/councillors/VK/viktoria.png"
                alt="Виктория Котенко"
                fill
                className="expert-image"
                style={{ objectFit: 'cover' }}
              />
              <div className="expert-image-overlay"></div>
            </div>
            <div className="expert-content">
              <h3 className="text-lg sm:text-xl font-playfair mb-2">
                Виктория Котенко
              </h3>
              <p className="text-base sm:text-base">
                Психотерапевт, Психоаналитик
              </p>
            </div>
          </div>
          <div className="group">
            <div className="expert-image-wrapper">
              <Image
                src="/images/councillors/demo/EkaterinaIvanova.png"
                alt="Екатерина Иванова"
                fill
                className="expert-image"
                style={{ objectFit: 'cover' }}
              />
              <div className="expert-image-overlay"></div>
            </div>
            <div className="expert-content">
              <h3 className="text-lg sm:text-xl font-playfair mb-2">
                Екатерина Иванова
              </h3>
              <p className="text-base sm:text-base">
                Психотерапевт, Гештальт-терапевт
              </p>
            </div>
          </div>
          <div className="group">
            <div className="expert-image-wrapper">
              <Image
                src="/images/councillors/demo/AnnaPetrova.png"
                alt="Анна Петрова"
                fill
                className="expert-image"
                style={{ objectFit: 'cover' }}
              />
              <div className="expert-image-overlay"></div>
            </div>
            <div className="expert-content">
              <h3 className="text-lg sm:text-xl font-playfair mb-2">
                Анна Петрова
              </h3>
              <p className="text-base sm:text-base">
                Психотерапевт, Арт-терапевт
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavouriteTopics;