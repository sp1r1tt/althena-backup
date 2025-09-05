"use client";

import ProfileHeader from '@/components/ProfileHeader';
import Link from 'next/link';
import HeroSlider from '@/components/HeroSlider';
import NewHeroSlider from '@/components/NewHeroSlider';
import SelfImprovementPrompt from '@/components/SelfImprovementPrompt';
import SupportProgramsNew from '@/components/SupportProgramsNew';
import VKSupportProgramsNew from '@/components/VKSupportProgramsNew';
import Footer from '@/components/Footer'; // Εισαγωγή του Footer

export default function StressAnxietyPage() {
  return (
    <div className="flex flex-col min-h-screen stress-anxiety-page">
      <ProfileHeader />
      {/* Πρώτος NewHeroSlider */}
      <div className="relative">
        <NewHeroSlider
          contentType="image"
          src="/images/section/stress-anxiety.jpg"
          title="Стресс / Тревога"
          text="Тревога и стресс могут быть как тихими спутниками, так и громкими сигналами, которые влияют на твою жизнь. Мы поможем тебе разобраться в их причинах, научиться справляться с этими состояниями и вернуть внутреннее спокойствие."
        />
      </div>
      {/* HeroSliderB (πρώτα τρία πλαίσια) */}
      <div className="relative flex flex-col sm:flex-row mt-[8px] gap-[8px]">
        {/* Πλαίσιο 1 */}
        <div className="w-full sm:w-1/3 relative group rounded-tr-lg rounded-br-lg overflow-hidden h-[765px] md:h-[534px] sm:h-[400px]">
          <HeroSlider
            contentType="image"
            src="/images/section/Relationship.jpg"
          />
          <div
            className="absolute top-0 left-0 w-full h-full text-[#143B64] text-center z-[6] font-playfair px-4 xs:px-6 sm:px-8 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#e8e4e2]"
            style={{ backgroundColor: '#e8e4e2' }}
          >
            <h2 className="text-[18px] xs:text-[23px] sm:text-[28px] md:text-[32px] lg:text-[34px] leading-none mb-5 whitespace-pre-line max-w-[400px] mx-auto">
              Привязанность
            </h2>
            <p className="text-[14px] xs:text-[14px] sm:text-[15px] leading-[1.3] max-w-[400px] mx-auto whitespace-pre-line mb-5">
              Согласно теории Боулби и Эйнсворт, то, как мы были эмоционально связаны с нашими родителями или другими значимыми фигурами в детстве, влияет на все последующие отношения:\n- Безопасная привязанность (Уют в близости, стабильность, доверие)\n- Тревожная / небезопасная привязанность (Страх быть покинутым, эмоциональное напряжение)\n- Избегающая привязанность (Дистанция, страх близости)\n- Дезорганизованная привязанность (Нестабильность, противоречивое поведение)
            </p>
            <Link
              href="/services/relationships"
              className="inline-block px-6 py-3 bg-[#8EB5BA] text-white no-underline rounded-[30px] text-base font-playfair mt-4 transition-colors duration-300 hover:bg-[#edbfab] hover:text-[#143B64] shadow-md"
            >
              Узнать больше
            </Link>
          </div>
        </div>
        {/* Πλαίσιο 2 - Μεσαίο */}
        <div className="w-full sm:w-1/3 relative group rounded-lg overflow-hidden h-[765px] md:h-[534px] sm:h-[400px]">
          <HeroSlider
            contentType="image"
            src="/images/section/relationship-a.jpg"
          />
          <div
            className="absolute top-0 left-0 w-full h-full text-[#143B64] text-center z-[6] font-playfair px-4 xs:px-6 sm:px-8 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#e8e4e2]"
            style={{ backgroundColor: '#e8e4e2' }}
          >
            <h2 className="text-[18px] xs:text-[23px] sm:text-[28px] md:text-[32px] lg:text-[34px] leading-none mb-5 whitespace-pre-line max-w-[400px] mx-auto">
              Зависимые и созависимые отношения
            </h2>
            <p className="text-[14px] xs:text-[14px] sm:text-[15px] leading-[1.3] max-w-[400px] mx-auto whitespace-pre-line mb-5">
              - Здоровая взаимозависимость (Автономия + связь с личными границами)\n- Созависимость (Один 'живет через' другого, без границ или самостоятельности)
            </p>
            <Link
              href="/services/self-confidence"
              className="inline-block px-6 py-3 bg-[#8EB5BA] text-white no-underline rounded-[30px] text-base font-playfair mt-4 transition-colors duration-300 hover:bg-[#edbfab] hover:text-[#143B64] shadow-md"
            >
              Узнать больше
            </Link>
          </div>
        </div>
        {/* Πλαίσιο 3 */}
        <div className="w-full sm:w-1/3 relative group rounded-tl-lg rounded-bl-lg overflow-hidden h-[765px] md:h-[534px] sm:h-[400px]">
          <HeroSlider
            contentType="image"
            src="/images/section/Narcissistic Mirroring.png"
          />
          <div
            className="absolute top-0 left-0 w-full h-full text-[#143B64] text-center z-[6] font-playfair px-4 xs:px-6 sm:px-8 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#e8e4e2]"
            style={{ backgroundColor: '#e8e4e2' }}
          >
            <h2 className="text-[18px] xs:text-[23px] sm:text-[28px] md:text-[32px] lg:text-[34px] leading-none mb-5 whitespace-pre-line max-w-[400px] mx-auto">
              Отношения-зеркала
            </h2>
            <p className="text-[14px] xs:text-[14px] sm:text-[15px] leading-[1.3] max-w-[400px] mx-auto whitespace-pre-line mb-5">
              Когда мы используем другого человека, чтобы подтвердить свою ценность или личность — характерно для нарциссических или зависимых моделей отношений.
            </p>
            <Link
              href="/services/adaptation"
              className="inline-block px-6 py-3 bg-[#8EB5BA] text-white no-underline rounded-[30px] text-base font-playfair mt-4 transition-colors duration-300 hover:bg-[#edbfab] hover:text-[#143B64] shadow-md"
            >
              Узнать больше
            </Link>
          </div>
        </div>
      </div>
      {/* Εισαγωγή του SelfImprovementPrompt Component - Ανάμεσα σε HeroSliderB και HeroSliderC */}
      <SelfImprovementPrompt />
      {/* HeroSliderC (επόμενα τρία πλαίσια) */}
      <div className="relative flex flex-col sm:flex-row mt-[8px] gap-[8px]">
        {/* Πλαίσιο 1 */}
        <div className="w-full sm:w-1/3 relative group rounded-tr-lg rounded-br-lg overflow-hidden h-[765px] md:h-[534px] sm:h-[400px]">
          <HeroSlider
            contentType="image"
            src="/images/section/Transactional Analysis.jpg"
          />
          <div
            className="absolute top-0 left-0 w-full h-full text-[#143B64] text-center z-[6] font-playfair px-4 xs:px-6 sm:px-8 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#e8e4e2]"
            style={{ backgroundColor: '#e8e4e2' }}
          >
            <h2 className="text-[18px] xs:text-[23px] sm:text-[28px] md:text-[32px] lg:text-[34px] leading-none mb-5 whitespace-pre-line max-w-[400px] mx-auto">
              Модели общения
            </h2>
            <p className="text-[14px] xs:text-[14px] sm:text-[15px] leading-[1.3] max-w-[400px] mx-auto whitespace-pre-line mb-5">
              Согласно транзактному анализу (Эрик Берн), все отношения строятся на взаимодействии 'Я-состояний':\n- Родитель — Ребёнок (контроль / подчинение)\n- Ребёнок — Ребёнок (импульсивность, фантазия)\n- Взрослый — Взрослый (рациональное, зрелое общение — идеальный формат)
            </p>
            <Link
              href="/services/adaptation"
              className="inline-block px-6 py-3 bg-[#8EB5BA] text-white no-underline rounded-[30px] text-base font-playfair mt-4 transition-colors duration-300 hover:bg-[#edbfab] hover:text-[#143B64] shadow-md"
            >
              Узнать больше
            </Link>
          </div>
        </div>
        {/* Πλαίσιο 2 - Μεσαίο */}
        <div className="w-full sm:w-1/3 relative group rounded-lg overflow-hidden h-[765px] md:h-[534px] sm:h-[400px]">
          <HeroSlider
            contentType="image"
            src="/images/section/Personality Structure.png"
          />
          <div
            className="absolute top-0 left-0 w-full h-full text-[#143B64] text-center z-[6] font-playfair px-4 xs:px-6 sm:px-8 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#e8e4e2]"
            style={{ backgroundColor: '#e8e4e2' }}
          >
            <h2 className="text-[18px] xs:text-[23px] sm:text-[28px] md:text-[32px] lg:text-[34px] leading-none mb-5 whitespace-pre-line max-w-[400px] mx-auto">
              Отношения через призму личности (Психодинамический / психотерапевтический подход)
            </h2>
            <p className="text-[14px] xs:text-[14px] sm:text-[15px] leading-[1.3] max-w-[400px] mx-auto whitespace-pre-line mb-5">
              - Перенос / Контрперенос (Проецируем роли или травмы прошлого на других)\n- Фантазийные vs Реалистичные отношения (Живём ли мы в идеализированной истории или в реальности другого)
            </p>
            <Link
              href="/services/stress-anxiety"
              className="inline-block px-6 py-3 bg-[#8EB5BA] text-white no-underline rounded-[30px] text-base font-playfair mt-4 transition-colors duration-300 hover:bg-[#edbfab] hover:text-[#143B64] shadow-md"
            >
              Узнать больше
            </Link>
          </div>
        </div>
        {/* Πλαίσιο 3 */}
        <div className="w-full sm:w-1/3 relative group rounded-tl-lg rounded-bl-lg overflow-hidden h-[765px] md:h-[534px] sm:h-[400px]">
          <HeroSlider
            contentType="image"
            src="/images/section/Developmental Relationships.jpg"
          />
          <div
            className="absolute top-0 left-0 w-full h-full text-[#143B64] text-center z-[6] font-playfair px-4 xs:px-6 sm:px-8 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#e8e4e2]"
            style={{ backgroundColor: '#e8e4e2' }}
          >
            <h2 className="text-[18px] xs:text-[23px] sm:text-[28px] md:text-[32px] lg:text-[34px] leading-none mb-5 whitespace-pre-line max-w-[400px] mx-auto">
              Терапевтические и развивающие отношения
            </h2>
            <p className="text-[14px] xs:text-[14px] sm:text-[15px] leading-[1.3] max-w-[400px] mx-auto whitespace-pre-line mb-5">
              Отношения, способствующие личному росту, изменению и самопознанию — как в психотерапии, так и с поддерживающими людьми.
            </p>
            <Link
              href="/services/mental-health"
              className="inline-block px-6 py-3 bg-[#8EB5BA] text-white no-underline rounded-[30px] text-base font-playfair mt-4 transition-colors duration-300 hover:bg-[#edbfab] hover:text-[#143B64] shadow-md"
            >
              Узнать больше
            </Link>
          </div>
        </div>
      </div>
      {/* Section με Κείμενο - Κάτω από τον HeroSliderC, με margin-top 8px */}
      <div className="flex-grow w-full bg-[rgba(237,191,171,0.2)] px-4 xs:px-6 sm:px-8 py-8 mt-[8px]">
        <div className="w-full max-w-[1120px] mx-auto">
          <p className="text-base xs:text-base sm:text-lg leading-[1.3] mb-4 whitespace-pre-line">
            Тревога и стресс могут быть как тихими спутниками, так и громкими сигналами, которые влияют на твою жизнь. Мы поможем тебе разобраться в их причинах, научиться справляться с этими состояниями и вернуть внутреннее спокойствие.
          </p>
          <p className="text-base xs:text-base sm:text-lg leading-[1.3] mb-4 whitespace-pre-line">
            В этом разделе ты найдешь инструменты и практики, которые помогут:
          </p>
          <ul className="text-base xs:text-base sm:text-lg leading-[1.3] list-disc pl-5 mb-4">
            <li>Осознать, что вызывает стресс и тревогу в твоей жизни.</li>
            <li>Научиться техникам релаксации и дыхательным практикам для снижения напряжения.</li>
            <li>Развить навыки управления эмоциями в сложных ситуациях.</li>
            <li>Создать устойчивые привычки, которые поддержат твоё эмоциональное здоровье.</li>
          </ul>
          <p className="text-base xs:text-base sm:text-lg leading-[1.3] mb-4 whitespace-pre-line">
            Мы предлагаем безопасное пространство, где ты можешь исследовать свои переживания, получить поддержку и найти эффективные способы справляться с тревогой и стрессом. Ты не один — мы здесь, чтобы помочь.
          </p>
          <h2 className="text-xl sm:text-2xl font-playfair mb-4">
            Почему это важно?
          </h2>
          <p className="text-base xs:text-base sm:text-lg leading-[1.3] whitespace-pre-line">
            Постоянный стресс и тревога могут влиять на твоё физическое здоровье, отношения и общее самочувствие. Наша цель — помочь тебе вернуть баланс и уверенность, чтобы ты мог жить более спокойно и осознанно.
          </p>
          {/* Νέο τμήμα κειμένου - Μεταφορά από την παλιά StressAnxietyPage */}
          <div className="support-model-section">
            <h3 className="text-lg sm:text-xl font-playfair mb-2">
              Модель поддержки, которую мы тебе предлагаем
            </h3>
            <p className="text-base xs:text-base sm:text-lg leading-[1.3] mb-4 whitespace-pre-line">
              Создана с уважением, заботой и полной конфиденциальностью — чтобы по-настоящему откликаться на твои потребности в этот момент. Если ты ищешь поддержку для укрепления самооценки, снижения тревожности или восстановления баланса в отношениях — здесь ты найдёшь пространство, время и сопровождение, чтобы вернуться к себе. Доверься процессу. Выбери то, что подходит именно тебе.
            </p>
            <Link
              href="/our-packages"
              className="text-base xs:text-base sm:text-lg leading-[1.3] text-[#8EB5BA] hover:text-[#edbfab] transition-colors"
            >
              Посмотреть пакеты поддержки
            </Link>
          </div>
        </div>
      </div>
      {/* SupportProgramsNew Component */}
      <SupportProgramsNew />
      {/* VKSupportProgramsNew Component */}
      <VKSupportProgramsNew />

      {/* Footer */}
      <Footer />
    </div>
  );
}
