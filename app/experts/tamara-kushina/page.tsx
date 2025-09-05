"use client";

import React, { useEffect, useRef } from 'react';
import ProfileHeader from '@/components/ProfileHeader';
import TamaraHeroSlider from '@/components/TamaraHeroSlider';
import Footer from '@/components/Footer'; // Εισαγωγή του Footer

export default function TamaraKushinaPage() {
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
    <div className="flex flex-col min-h-screen tamara-kushina-page bg-[rgba(237,191,171,0.2)]">
      <ProfileHeader ref={headerRef} />
      
      {/* Основное содержимое */}
      <div
        ref={contentRef}
        className="flex flex-col justify-start bg-[#f2f1f0] flex-grow"
      >
        <TamaraHeroSlider
          slide1={{
            src: "/images/councillors/Tamara Kushina/Tamara Kushina1.jpg",
            title: "Тамара Кушина",
          }}
          slide2={{
            title: "Тамара Кушина",
            category: "Интегративный психолог, гипнолог, RPT-терапевт",
            link: "/booking",
          }}
        />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}