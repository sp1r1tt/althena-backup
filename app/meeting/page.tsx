"use client";

import ProfileHeader from '../../src/components/ProfileHeader';
import Link from 'next/link';
import HeroSlider from '../../src/components/HeroSlider';
import NewHeroSlider from '../../src/components/NewHeroSlider';
import Footer from '../../src/components/Footer';

export default function RelationshipsPage() {
  return (
    <div className="flex flex-col min-h-screen relationships-page">
      <ProfileHeader />

      {/* Первый NewHeroSlider */}
      <div className="relative">
        <NewHeroSlider
          contentType="image"
          src="/images/section/pexels-ekaterina-bolovtsova-6192324.jpg"
          title="Три пути к психологическому благополучию"
          text="Выберите свой путь: пройти тест, найти специалиста или узнать, как работает наша платформа."
        />
      </div>

{/* HeroSliderB (три карточки) */}
<div className="relative flex flex-col sm:flex-row mt-[8px] gap-[8px] pt-[8px] pb-[8px]">
  {/* Карточка 1 */}
  <div className="w-full sm:w-1/3 relative rounded-tr-lg rounded-br-lg overflow-hidden h-[765px] md:h-[534px] sm:h-[400px]">
    <HeroSlider contentType="image" src="/images/section/klara-kulikova-9e2pIL5Ea20-unsplash.jpg" />
    <div className="absolute top-0 left-0 w-full h-full hero-slider-content text-white text-center z-[6] font-playfair px-4 xs:px-6 sm:px-8 flex flex-col items-center justify-center opacity-100">
      <p className="text-[20px] xs:text-[18px] sm:text-[18px] leading-[1.3] max-w-[400px] mx-auto whitespace-pre-line mb-5">
        Пройдите короткий психологический тест и получите персональные рекомендации и подборку материалов.
      </p>
      <Link href="/tests" className="inline-block px-6 py-3 bg-[#8EB5BA] text-white rounded-[30px] mt-4 transition-colors duration-300 hover:bg-[#edbfab] hover:text-[#143B64] shadow-md">
        К тестам →
      </Link>
    </div>
  </div>

  {/* Карточка 2 */}
  <div className="w-full sm:w-1/3 relative rounded-lg overflow-hidden h-[765px] md:h-[534px] sm:h-[400px]">
    <HeroSlider contentType="image" src="/images/section/pexels-tima-miroshnichenko-5711017.jpg" />
    <div className="absolute top-0 left-0 w-full h-full hero-slider-content text-white text-center z-[6] font-playfair px-4 xs:px-6 sm:px-8 flex flex-col items-center justify-center opacity-100">
             <h2 className="text-[22px] xs:text-[28px] sm:text-[34px] md:text-[40px] lg:text-[44px] leading-none mb-5 whitespace-pre-line max-w-[500px] mx-auto font-semibold">
  Найти специалиста
</h2>

      <p className="text-[20px] xs:text-[18px] sm:text-[18px] leading-[1.3] max-w-[400px] mx-auto whitespace-pre-line mb-5">
        - Выберите сертифицированного терапевта, посмотрите видео-презентацию, цены и свободные слоты для записи.
      </p>
      <Link href="/therapists" className="inline-block px-6 py-3 bg-[#8EB5BA] text-white rounded-[30px] mt-4 transition-colors duration-300 hover:bg-[#edbfab] hover:text-[#143B64] shadow-md">
        К специалистам →
      </Link>
    </div>
  </div>

  {/* Карточка 3 */}
  <div className="w-full sm:w-1/3 relative rounded-tl-lg rounded-bl-lg overflow-hidden h-[765px] md:h-[534px] sm:h-[400px]">
    <HeroSlider contentType="image" src="/images/section/pexels-cottonbro-6568110.jpg" />
    <div className="absolute top-0 left-0 w-full h-full hero-slider-content text-white text-center z-[6] font-playfair px-4 xs:px-6 sm:px-8 flex flex-col items-center justify-center opacity-100">
      <h2 className="text-[22px] xs:text-[28px] sm:text-[34px] md:text-[40px] lg:text-[44px] leading-none mb-5 whitespace-pre-line max-w-[500px] mx-auto font-semibold">
        Как это работает
      </h2>
      <p className="text-[20px] xs:text-[18px] sm:text-[18px] leading-[1.3] max-w-[400px] mx-auto whitespace-pre-line mb-5">
        Узнайте, как устроена платформа, какие есть возможности и как выбрать свой путь к психологическому благополучию.
      </p>
      <Link href="/how-it-works" className="inline-block px-6 py-3 bg-[#8EB5BA] text-white rounded-[30px] mt-4 transition-colors duration-300 hover:bg-[#edbfab] hover:text-[#143B64] shadow-md">
        Подробнее →
      </Link>
    </div>
  </div>
</div>



      {/* Footer */}
      <div className="mt-[8px]">
        <Footer />
      </div>
    </div>
  );
}
