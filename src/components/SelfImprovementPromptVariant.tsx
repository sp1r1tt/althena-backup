"use client";

import React from 'react';

export default function SelfImprovementPromptVariant() {
  return (
    <div className="w-full flex flex-col sm:flex-row gap-[8px] mt-[8px]">
      {/* Left Panel */}
      <div className="flex-1 h-[300px] bg-[rgba(237,191,171,0.3)] rounded-r-lg rounded-l-0 flex flex-col items-center justify-center text-center p-4">
        <h3 className="text-[17px] xs:text-[18px] sm:text-[20px] md:text-[22px] lg:text-[23px] font-playfair leading-none mb-4 max-w-[288px]">
          Свободный доступ в пространство самопознания и внутреннего роста
        </h3>
        <p className="text-[14px] xs:text-[14px] sm:text-[16px] leading-[1.3] max-w-[360px]">
          Начни без давления, без затрат — в своём ритме.
          Исследуй инструменты и бесплатные тесты, созданные для твоей самоподдержки.
          И когда почувствуешь, что готов(а) обратиться за поддержкой специалиста —
          мы будем рядом, чтобы пройти этот путь вместе.
        </p>
      </div>
      {/* Middle Panel (Square 300px x 300px) */}
      <div className="w-full sm:w-[300px] h-[300px] bg-[rgba(237,191,171,1)] rounded-lg flex flex-col items-center justify-center text-center p-4">
        <h3 className="text-[28px] xs:text-[30px] sm:text-[32px] md:text-[34px] lg:text-[36px] font-playfair leading-none mb-4">
          Пространство самопознания и внутреннего роста
        </h3>
      </div>
      {/* Right Panel */}
      <div className="flex-1 h-[300px] bg-[rgba(237,191,171,0.3)] rounded-l-lg rounded-r-0 flex flex-col items-center justify-center text-center p-4">
        <h3 className="text-[17px] xs:text-[18px] sm:text-[20px] md:text-[22px] lg:text-[23px] font-playfair leading-none mb-4 max-w-[288px]">
          Прислушайтесь к себе — нежно и с любовью.
        </h3>
        <p className="text-[14px] xs:text-[14px] sm:text-[16px] leading-[1.3] max-w-[360px]">
          Выберите подходящий вам тест и получите теплую рекомендацию о том, какая поддержка подойдет вам лучше всего. Вы заслуживаете того, чтобы чувствовать себя лучше. Все начинается с мягкого понимания.
        </p>
      </div>
    </div>
  );
}