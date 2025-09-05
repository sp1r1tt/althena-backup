"use client";

import Link from 'next/link';
import NewHeroSlider from '@/components/NewHeroSlider';
import NewHeroSliderB from '@/components/NewHeroSliderB';
import Experts from '@/components/AlthénaExperts';
import ProfileHeader from '@/components/ProfileHeader';
import ConnectWithUs from '@/components/ConnectWithUs';
import IntroGridSection from '@/components/IntroGridSection';
import Footer from '@/components/Footer'; // Εισαγωγή του Footer

interface Slide {
  type: string;
  src: string;
  title: string;
  text?: string;
  link?: string;
}

export default function Home() {
  const slides: Slide[] = [
    {
      type: 'video',
      src: '/videos/hero-video-1.mp4',
      title: 'В Althena мы развиваем внутреннее равновесие и рост.',
      text: `Мы создали цифровое пространство для поддержки и самосовершенствования, где психологическая наука встречается с подлинным состраданием.\nСертифицированные специалисты, современные методы и инструменты бережно поддерживают вас на самом важном пути — пути к себе.`,
    },
    {
      type: 'image',
      src: '/images/section/hero 2.png',
      title: 'Межличностные отношения',
      text: `Научитесь слышать и не предавать себя в любых отношениях\nЗдесь мы разбираемся, почему повторяются болезненные сценарии, учимся говорить о своих чувствах и строить контакт — честно, спокойно и с уважением к себе.`,
      link: '/services/relationships',
    },
    {
      type: 'image',
      src: '/images/section/hero 3.png',
      title: 'Самооценка и уверенность в себе',
      text: `Строим уверенность, повыхаем самооценку — шаг за шагом\nЗдесь вы разберётесь, откуда берётся внутренний критик, научитесь замечать свои сильные стороны и поддерживать себя в трудные моменты.\nВы получите реальные инструменты, чтобы опираться на себя, а не на чужую оценку.`,
      link: '/services/self-confidence',
    },
    {
      type: 'image',
      src: '/images/section/hero 4.png',
      title: 'Адаптация',
      text: `Как не потерять себя в новой реальности\nРазберётесь, как сохранить психическое равновесие в условиях перемен.\nНаучитесь гибкости мышления, приёму «маленьких шагов» и эмоциональной устойчивости.`,
      link: '/services/adaptation',
    },
    {
      type: 'image',
      src: '/images/section/hero 5.png',
      title: 'Стресс и тревожность',
      text: `Когда всё внутри слишком долго было в напряжении\nЗдесь вы разберётесь, как стресс и тревожность накапливаются, влияют на тело и поведение.\nВы научитесь восстанавливаться, регулировать напряжение и возвращать себе энергию — шаг за шагом.`,
      link: '/services/stress-anxiety',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#f2f1f0' }}>
      <ProfileHeader />
      <main className="flex-grow">
        {/* Πρώτος HeroSlider (NewHeroSlider) */}
        <div className="relative">
          <NewHeroSlider
            contentType="video"
            src={slides[0].src}
            title={slides[0].title}
            text={slides[0].text}
          />
        </div>

        {/* Intro Grid Section */}
        <IntroGridSection />

        {/* HeroSliderB (slides 1 και 2) - Χρησιμοποιούμε NewHeroSliderB */}
        <div className="relative mt-[8px]">
          <NewHeroSliderB
            slide1={{
              src: slides[1].src,
              title: slides[1].title,
              text: slides[1].text,
              link: slides[1].link,
            }}
            slide2={{
              src: slides[2].src,
              title: slides[2].title,
              text: slides[2].text,
              link: slides[2].link,
            }}
          />
        </div>

        {/* HeroSliderC (slides 3 και 4) - Χρησιμοποιούμε NewHeroSliderB */}
        <div className="relative mt-[8px] mb-2">
          <NewHeroSliderB
            slide1={{
              src: slides[3].src,
              title: slides[3].title,
              text: slides[3].text,
              link: slides[3].link,
            }}
            slide2={{
              src: slides[4].src,
              title: slides[4].title,
              text: slides[4].text,
              link: slides[4].link,
            }}
          />
        </div>

        <Experts />

        <ConnectWithUs />
      </main>
      <Footer /> {/* Προσθήκη του Footer */}
    </div>
  );
}