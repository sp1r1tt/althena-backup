"use client";

import React from 'react';
import RecommendedArticles from './RecommendedArticles';

export default function SupportProgramsNew() {
  return (
    <div className="w-full h-[265px] mb-0">
      <div className="max-w-[1120px] mx-auto px-4 xs:px-6 sm:px-8 py-4">
        <div className="grid sm:grid-cols-[70%_30%] gap-[8px] h-full">
          <div className="w-full bg-[rgba(242,241,240,1)] rounded-[8px] shadow-none pr-6 pt-6 pb-6 pl-0 -ml-4 xs:-ml-6 sm:-ml-8 self-start overflow-auto">
            <h3 className="text-[23px] sm:text-[40px] leading-[1.2] font-playfair font-bold mb-4 !text-[#367a7a]">
              Модель поддержки, которую мы тебе предлагаем
            </h3>
            <p className="text-sm sm:text-base leading-[1.3] !text-[#367a7a] mb-6">
              Создана с уважением, заботой и полной конфиденциальностью — чтобы по-настоящему откликаться на твои потребности в этот момент. Если ты ищешь поддержку для укрепления самооценки, снижения тревожности или восстановления баланса в отношениях — здесь ты найдёшь пространство, время и сопровождение, чтобы вернуться к себе. Доверься процессу. Выбери то, что подходит именно тебе.{' '}
              <span className="support-packages-text">Посмотреть пакеты поддержки</span>
            </p>
          </div>
          <div className="w-full flex flex-col gap-4 h-full">
            {/* Πλαίσιο Рекомендуемые статьи */}
            <div className="w-full bg-[rgba(255,255,255,0.7)] rounded-[8px] shadow-none p-4 self-start overflow-auto">
              <h3 className="text-[16px] sm:text-[20px] font-playfair font-bold mb-4 !text-[#143B64]">
                Рекомендуемые статьи
              </h3>
              <RecommendedArticles />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}