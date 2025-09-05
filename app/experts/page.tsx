"use client";

import React from 'react';
import ProfileHeader from '@/components/ProfileHeader';
import NewHeroSlider from '@/components/NewHeroSlider';
import Link from 'next/link';
import { expertsData } from '@/data/expertsData';

export default function ExpertsPage() {
  return (
    <div className="experts-page bg-[rgba(237,191,171,0.2)] min-h-screen">
      <ProfileHeader />
      
      {/* NewHeroSlider για εισαγωγή */}
      <NewHeroSlider
        contentType="image"
        src="/images/councillors/VK/experts.jpg"
        title="Наши Специалисты"
      />

      {/* Grid όλων των ειδικών */}
      <div className="w-full py-2 px-0 mx-0 !h-[480px] box-border">
        <div
          className="grid !grid-cols-3 gap-2 !h-full"
          style={{
            gridTemplateColumns: 'repeat(3, 1fr)',
            boxSizing: 'border-box',
            overflowX: 'auto',
            width: '100%',
            margin: 0,
            padding: 0,
          }}
        >
          {expertsData.map((expert, index) => (
            <Link href={expert.profileLink} key={expert.id}>
              <div
                className={`bg-white shadow-md overflow-hidden hover:shadow-lg transition-shadow min-w-[150px] !h-full flex flex-col box-border ${
                  index === 0
                    ? 'rounded-lg rounded-l-none'
                    : index === 2
                    ? 'rounded-lg rounded-r-none'
                    : 'rounded-lg'
                }`}
                style={{ minHeight: '100% !important', maxHeight: '100% !important' }}
              >
                <img
                  src={expert.image}
                  alt={expert.alt}
                  className="w-full !h-72 object-cover flex-shrink-0 box-border"
                  style={{ aspectRatio: '16/9', width: '100% !important', minHeight: '288px !important', maxHeight: '288px !important' }}
                />
                <div className="p-4 flex-grow-0 overflow-hidden box-border">
                  <h3 className="text-xl font-bold mb-2 truncate pl-6">{expert.name}</h3>
                  <p className="text-gray-600 text-sm mb-2 truncate pl-6">{expert.title}</p>
                  <p className="text-gray-500 text-sm line-clamp-2 pl-6">{expert.category}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}