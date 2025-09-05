import React from 'react';
import Link from 'next/link';

export default function IntroGridSection() {
  return (
    <div className="max-w-full mt-[8px]">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-[8px]">
        {/* Πλαίσιο 1 */}
        <div
          className="w-full min-h-[300px] xs:min-h-[320px] sm:min-h-[280px] md:min-h-[374px] lg:min-h-[450px] bg-[rgba(237,191,171,0.2)] rounded-lg rounded-l-none flex flex-col items-center justify-center text-center text-[#143B64] font-playfair px-4 xs:px-6 sm:px-8"
        >
          <h2 className="text-[clamp(16px,4vw,36px)] leading-tight mb-3 whitespace-pre-line max-w-[90%] xs:max-w-[300px] sm:max-w-[400px] mx-auto">
            Всё, чем ты делишься — остаётся только твоим.
          </h2>
          <p className="text-[clamp(12px,2vw,16px)] leading-[1.3] max-w-[90%] xs:max-w-[300px] sm:max-w-[400px] mx-auto whitespace-pre-line mb-3">
            Современные стандарты шифрования, которые мы используем для защиты твоих личных данных, гарантируют, что каждое слово, каждый вдох остаётся под полной защитой.
            И всё же твой опыт остаётся лёгким:
            методы и инструменты Althéna не давят — они мягко направляют и сопровождают тебя с уважением на твоём собственном пути.
          </p>
        </div>
        {/* Πλαίσιο 2 */}
        <div
          className="w-full min-h-[300px] xs:min-h-[320px] sm:min-h-[280px] md:min-h-[374px] lg:min-h-[450px] bg-[rgba(237,191,171,0.2)] rounded-lg flex flex-col items-center justify-center text-center text-[#143B64] font-playfair px-4 xs:px-6 sm:px-8"
        >
          <h2 className="text-[clamp(16px,4vw,36px)] leading-tight mb-3 whitespace-pre-line max-w-[90%] xs:max-w-[300px] sm:max-w-[400px] mx-auto">
            Как работает Альтена?
          </h2>
          <p className="text-[clamp(12px,2vw,16px)] leading-[1.3] max-w-[90%] xs:max-w-[300px] sm:max-w-[400px] mx-auto whitespace-pre-line mb-3">
            Простой и понятный маршрут — с учетом вашего темпа:
            Регистрация — быстро, легко и безопасно
            Получите мгновенный доступ к инструментам самопомощи
            Начните с быстрых бесплатных тестов и опросов
            Вы сами решаете, нужен ли вам специалист и когда именно, и... тогда Альтена будет рядом, чтобы оказать вам поддержку.
            Как вы того заслуживаете
          </p>
        </div>
        {/* Πλαίσιο 3 */}
        <div
          className="w-full min-h-[300px] xs:min-h-[320px] sm:min-h-[280px] md:min-h-[374px] lg:min-h-[450px] bg-[rgba(237,191,171,0.2)] rounded-lg rounded-r-none flex flex-col items-center justify-center text-center text-[#143B64] font-playfair px-4 xs:px-6 sm:px-8"
        >
          <h2 className="text-[clamp(16px,4vw,36px)] leading-tight mb-3 whitespace-pre-line max-w-[90%] xs:max-w-[300px] sm:max-w-[400px] mx-auto">
            Кошачий шепот
          </h2>
          <p className="text-[clamp(12px,2vw,16px)] leading-[1.3] max-w-[90%] xs:max-w-[300px] sm:max-w-[400px] mx-auto whitespace-pre-line mb-3">
            "Мяу…
            Тебе не нужно много.
            Лишь тихое место.
            Мягкий свет. Вдох без тяжести.
            Пространство, где ничего не нужно объяснять…
            — и этого достаточно, чтобы начать.

            Мурр…"
          </p>
          <Link
            href="/self-knowledge-space"
            className="inline-block px-6 py-3 bg-[#8EB5BA] text-white no-underline rounded-[30px] text-[clamp(14px,2vw,18px)] font-playfair mt-3 transition-colors duration-300 hover:bg-[#edbfab] hover:text-[#143B64] shadow-md"
          >
            начать сейчас
          </Link>
        </div>
      </div>
    </div>
  );
}