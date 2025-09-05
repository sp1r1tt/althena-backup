"use client";

import React, { useState } from 'react';
import Image from 'next/image';

const VKSupportProgramsNew: React.FC = () => {
  const [isFirstBoxHovered, setIsFirstBoxHovered] = useState(false);
  const [isSecondBoxHovered, setIsSecondBoxHovered] = useState(false);
  const [isThirdBoxHovered, setIsThirdBoxHovered] = useState(false);

  return (
    <div className="vk-support-programs-new w-full bg-[rgba(242,241,240,1)] py-8">
      <div className="w-full max-w-[1180px] mx-auto px-4 xs:px-6 sm:px-8">
        <h2 className="text-xl sm:text-2xl font-playfair mb-6 text-[#143B64]">
          Программы поддержки с <span className="font-bold">Викторией Котенко</span>, экспертом по управлению стрессом и эмоциональной устойчивости
        </h2>
        <div className="grid grid-cols-[18fr_18fr_18fr_66fr] gap-[8px] items-end">
          {/* Box 1 */}
          <div
            className="bg-[rgba(142,181,186,1)] rounded-lg p-4 flex flex-col items-center justify-center text-center h-40"
            onMouseEnter={() => setIsFirstBoxHovered(true)}
            onMouseLeave={() => setIsFirstBoxHovered(false)}
          >
            <h3 className="text-base sm:text-2xl font-playfair text-white">
              Фундамент
            </h3>
          </div>
          {/* Box 2 */}
          <div
            className="bg-[rgba(91,125,140,1)] rounded-lg p-4 flex flex-col items-center justify-center text-center h-48"
            onMouseEnter={() => setIsSecondBoxHovered(true)}
            onMouseLeave={() => setIsSecondBoxHovered(false)}
          >
            <h3 className="text-base sm:text-2xl font-playfair text-white">
              Устойчивость
            </h3>
          </div>
          {/* Box 3 */}
          <div
            className="bg-[rgba(20,59,100,1)] rounded-lg p-4 flex flex-col items-center justify-center text-center h-80"
            onMouseEnter={() => setIsThirdBoxHovered(true)}
            onMouseLeave={() => setIsThirdBoxHovered(false)}
          >
            <h3 className="text-base sm:text-2xl font-playfair text-white">
              Процветание
            </h3>
          </div>
          {/* Box 4 (Wider, Image with Overlay on Box 1, 2, or 3 Hover) */}
          <div className="bg-white rounded-lg overflow-hidden h-80">
            <div className="relative w-full h-full">
              <Image
                src="/images/councillors/VK/Viktoriia Kotenko.jpg"
                alt="Виктория Котенко"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 66vw"
              />
              {/* Overlay for Box 1 Hover (Fundament) */}
              <div
                className={`absolute inset-0 !bg-[#f2f1f0] flex items-center justify-center p-4 transition-opacity duration-300 overflow-auto ${
                  isFirstBoxHovered && !isSecondBoxHovered && !isThirdBoxHovered ? 'opacity-90' : 'opacity-0'
                }`}
              >
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <h4 className="text-[12px] sm:text-[14px] font-playfair text-[#8EB5BA] font-bold">
                      Фундамент
                    </h4>
                    <span className="text-[12px] sm:text-[14px] font-playfair text-[#8EB5BA]">-</span>
                    <h5 className="text-[12px] sm:text-[14px] font-playfair text-[#8EB5BA] font-bold">
                      Доступ на 1 неделю
                    </h5>
                  </div>
                  <p className="text-[10px] sm:text-[12px] font-playfair text-[#143B64] mb-3 whitespace-pre-line">
                    Начни свое путешествие! Идеально для новичков, этот пакет предоставляет необходимые инструменты для создания прочной основы в твоем личностном развитии всего за 1 неделю. С аудиогидами, чек-листами и мини-курсами ты быстро освоишь нужные навыки!
                  </p>
                  <ul className="text-[10px] sm:text-[12px] font-playfair text-[#143B64] mb-3 list-disc list-inside">
                    <li>2 аудиогида</li>
                    <li>2 практических чек-листа</li>
                    <li>3 мини-курса (короткие видеоуроки)</li>
                    <li>Персональная панель с дополнительными инструментами (отслеживание, тестирование прогресса)</li>
                  </ul>
                  <p className="text-[12px] sm:text-[14px] font-playfair text-[#143B64] font-bold">
                    €15
                  </p>
                </div>
              </div>
              {/* Overlay for Box 2 Hover (Resilience) */}
              <div
                className={`absolute inset-0 !bg-[#f2f1f0] flex items-center justify-center p-4 transition-opacity duration-300 overflow-auto ${
                  isSecondBoxHovered && !isThirdBoxHovered ? 'opacity-90' : 'opacity-0'
                }`}
              >
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <h4 className="text-[12px] sm:text-[14px] font-playfair text-[#8EB5BA] font-bold">
                      Устойчивость
                    </h4>
                    <span className="text-[12px] sm:text-[14px] font-playfair text-[#8EB5BA]">-</span>
                    <h5 className="text-[12px] sm:text-[14px] font-playfair text-[#8EB5BA] font-bold">
                      Доступ на 1 месяц
                    </h5>
                  </div>
                  <p className="text-[10px] sm:text-[12px] font-playfair text-[#143B64] mb-3 whitespace-pre-line">
                    Поднимись на новый уровень! Этот пакет дает доступ к большему количеству инструментов и эксклюзивному сообществу в Telegram на целый месяц. С 5 мини-курсами и 3 аудиогидами ты научишься справляться со стрессом и развивать устойчивость!
                  </p>
                  <ul className="text-[10px] sm:text-[12px] font-playfair text-[#143B64] mb-3 list-disc list-inside">
                    <li>3 аудиогида</li>
                    <li>3 практических чек-листа</li>
                    <li>5 мини-курсов (короткие видеоуроки)</li>
                    <li>Персональная панель с дополнительными инструментами (отслеживание, тестирование прогресса)</li>
                    <li>Доступ к приватному сообществу в Telegram</li>
                  </ul>
                  <p className="text-[12px] sm:text-[14px] font-playfair text-[#143B64] font-bold">
                    €30
                  </p>
                </div>
              </div>
              {/* Overlay for Box 3 Hover (Thriving) */}
              <div
                className={`absolute inset-0 !bg-[rgba(242,241,240,1)] flex items-center justify-center p-4 duration-300 overflow-auto ${
                  isThirdBoxHovered ? 'opacity-90' : 'opacity-0'
                }`}
              >
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <h4 className="text-[12px] sm:text-[14px] font-playfair text-[#8EB5BA] font-bold">
                      Процветание
                    </h4>
                    <span className="text-[12px] sm:text-[14px] font-playfair text-[#8EB5BA]">-</span>
                    <h5 className="text-[12px] sm:text-[14px] font-playfair text-[#8EB5BA] font-bold">
                      Доступ на 1 месяц
                    </h5>
                  </div>
                  <p className="text-[10px] sm:text-[12px] font-playfair text-[#143B64] mb-3 whitespace-pre-line">
                    Достигни вершины! Этот премиум-пакет предлагает персональное руководство с еженедельными сессиями психологической консультации и индивидуальный план работы. Ускорь свой прогресс с эксклюзивными инструментами и поддержкой нашего сообщества!
                  </p>
                  <ul className="text-[10px] sm:text-[12px] font-playfair text-[#143B64] mb-3 list-disc list-inside">
                    <li>3 аудиогида</li>
                    <li>3 практических чек-листа</li>
                    <li>5 мини-курсов (короткие видеоуроки)</li>
                    <li>Персональная панель с дополнительными инструментами (отслеживание, тестирование прогресса)</li>
                    <li>Доступ к приватному сообществу в Telegram</li>
                    <li>Индивидуальная психологическая консультация (раз в неделю, бронирование доступно через платформу)</li>
                    <li>Персонализированный план работы по выбранной теме (разработан и предоставлен на второй консультации)</li>
                  </ul>
                  <p className="text-[12px] sm:text-[14px] font-playfair text-[#143B64] font-bold">
                    €200
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="mt-[40px] border-[#143B64] border-t border-solid w-full" />
      </div>
    </div>
  );
};

export default VKSupportProgramsNew;