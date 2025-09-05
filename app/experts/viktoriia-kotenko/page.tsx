// app/experts/viktoriia-kotenko/page.tsx
"use client";

import React from 'react';
import ProfileHeader from '@/components/ProfileHeader';
import VKHeroSlider from '@/components/VKHeroSlider';
import ViktoriiaContent from '@/components/ViktoriiaContent';
import ViktoriiaContent3 from '@/components/ViktoriiaContent3';
import ViktoriiaContent4 from '@/components/ViktoriiaContent4';
import Footer from '@/components/Footer';
import { expertsData } from '@/data/expertsData';

export default function ViktoriiaKotenkoProfilePage() {
  const viktoriia = expertsData.find((expert) => expert.name === "Виктория Котенко") || {
    id: 1,
    name: "Виктория Котенко",
    category: "Сертифицированный психотерапевт, специалист по управлению стрессом и эмоциональной устойчивости.",
    availableTimes: ["09:00", "10:00", "11:00", "14:00", "15:00"],
  };

  return (
    <div className="viktoriia-kotenko-page bg-[rgba(242,241,240,1)] min-h-screen flex flex-col">
      <ProfileHeader />
      <div
        className="relative overflow-visible min-h-fit"
        style={{ marginTop: '100px', marginBottom: '8px' }} // Προσθήκη marginTop
      >
        <VKHeroSlider
          slide1={{
            src: "/images/councillors/VK/vkIntro.jpg",
          }}
          slide2={{
            content: <ViktoriiaContent name={viktoriia.name} category={viktoriia.category} />,
          }}
        />
      </div>
      <ViktoriiaContent3 />
      <div style={{ height: '8px' }} />
      <ViktoriiaContent4 />
      <Footer />
    </div>
  );
}