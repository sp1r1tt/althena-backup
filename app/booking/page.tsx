"use client";

import React, { useEffect, useRef } from 'react';
import ProfileHeader from '@/components/ProfileHeader';
import BookingHeroSlider from '@/components/BookingHeroSlider';
import BookingForm from '@/components/BookingForm';
import Footer from '@/components/Footer'; // Εισαγωγή του Footer

export default function BookingPage() {
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
    <div className="flex flex-col min-h-screen bg-[#f2f1f0]">
      {/* ProfileHeader вверху */}
      <ProfileHeader ref={headerRef} />

      {/* Основное содержимое */}
      <div
        ref={contentRef}
        className="flex flex-col justify-start bg-[#f2f1f0] flex-grow"
      >
        {/* Booking Hero Slider - Содержит форму в правой колонке */}
        <section className="w-full mb-10">
          <BookingHeroSlider
            src="/images/section/booking.jpg"
            title="Запишитесь на консультацию"
            text="Выберите удобное время и оставьте заявку на консультацию."
          >
            <BookingForm />
          </BookingHeroSlider>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}