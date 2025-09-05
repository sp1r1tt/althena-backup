"use client";

import Link from 'next/link';

export default function ConnectWithUs() {
  return (
    <div className="w-full py-10">
      <div className="max-w-[1120px] mx-auto px-4 xs:px-6 sm:px-8">
        <h2 className="text-[23px] sm:text-[40px] leading-[1.2] font-playfair font-bold mb-4 text-[#143B64] text-center">
          Связаться с нами
        </h2>
        <p className="text-base xs:text-base sm:text-lg leading-[1.3] mb-6 text-[#143B64] text-center">
          Мы здесь, чтобы поддержать вас на каждом шагу. Если у вас есть вопросы или вам нужна помощь, свяжитесь с нами.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/contact"
            className="inline-block px-6 py-3 bg-[#8EB5BA] text-white rounded-[30px] font-playfair transition-colors duration-300 hover:bg-[#edbfab] hover:text-[#143B64] shadow-md"
          >
            Контакты
          </Link>
          <Link
            href="/support"
            className="inline-block px-6 py-3 bg-[#8EB5BA] text-white rounded-[30px] font-playfair transition-colors duration-300 hover:bg-[#edbfab] hover:text-[#143B64] shadow-md"
          >
            Поддержка
          </Link>
        </div>
      </div>
    </div>
  );
}