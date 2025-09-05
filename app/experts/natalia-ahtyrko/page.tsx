"use client";

import React, { useEffect, useRef } from 'react';
import ProfileHeader from '@/components/ProfileHeader';
import NataliaHeroSlider from '@/components/NataliaHeroSlider';
import NataliaContent from '@/components/NataliaContent';
import Footer from '@/components/Footer'; // Εισαγωγή του Footer

export default function NataliaAhtyrkoPage() {
  const headerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current && contentRef.current) {
        const headerHeight = headerRef.current.offsetHeight;
        document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
        contentRef.current.style.paddingTop = `var(--header-height)`;
      }
    };

    const initialTimeout = setTimeout(updateHeaderHeight, 100);
    const resizeObserver = new ResizeObserver(updateHeaderHeight);
    if (headerRef.current) {
      resizeObserver.observe(headerRef.current);
    }
    window.addEventListener('resize', updateHeaderHeight);

    return () => {
      clearTimeout(initialTimeout);
      if (headerRef.current) {
        resizeObserver.unobserve(headerRef.current);
      }
      window.removeEventListener('resize', updateHeaderHeight);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen natalia-ahtyrko-page bg-[rgba(237,191,171,0.2)]">
      <ProfileHeader ref={headerRef} />
      
      {/* Основное содержимое */}
      <div
        ref={contentRef}
        className="flex flex-col justify-start bg-[#f2f1f0] flex-grow"
      >
        <NataliaHeroSlider
          slide1={{
            src: "/images/councillors/natalia-ahtyrko/natalia-ahtyrko.jpg",
            alt: "Наталия Ахтырко",
          }}
          slide2={{
            title: "Наталия Ахтырко",
            category: "Психолог, сексолог, педагог, интегративный подход",
            link: "/booking",
          }}
        />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}