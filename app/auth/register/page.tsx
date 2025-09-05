"use client";

import React, { useRef, useEffect } from "react";
import ProfileHeader from "@/components/ProfileHeader";
import RegisterHeroSlider from "@/components/RegisterHeroSlider";
import RegistrationFormWithLogic from "@/components/RegistrationFormWithLogic"; // форма с логикой Supabase
import Footer from "@/components/Footer";

export default function RegisterPage() {
  const headerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current && contentRef.current) {
        const headerHeight = headerRef.current.offsetHeight;
        document.documentElement.style.setProperty("--header-height", `${headerHeight}px`);
        contentRef.current.style.paddingTop = `var(--header-height)`;
      }
    };

    const initialTimeout = setTimeout(updateHeaderHeight, 100);
    const resizeObserver = new ResizeObserver(updateHeaderHeight);
    if (headerRef.current) resizeObserver.observe(headerRef.current);
    window.addEventListener("resize", updateHeaderHeight);

    return () => {
      clearTimeout(initialTimeout);
      if (headerRef.current) resizeObserver.unobserve(headerRef.current);
      window.removeEventListener("resize", updateHeaderHeight);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#f2f1f0]">
      <ProfileHeader ref={headerRef} />

      <div ref={contentRef} className="flex flex-col flex-grow">
        <section className="w-full mb-10">
          <RegisterHeroSlider
            src="/images/section/registration4.jpg"
            title="Добро пожаловать на регистрацию"
            text="Создай свой аккаунт и начни путешествие сегодня."
          >
            <RegistrationFormWithLogic />
          </RegisterHeroSlider>
        </section>
      </div>

      <Footer />
    </div>
  );
}
