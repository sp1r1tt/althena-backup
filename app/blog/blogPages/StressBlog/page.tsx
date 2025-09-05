"use client";

import React, { useState } from 'react';
import ProfileHeader from '@/components/ProfileHeader';
import BlogHeroSlider from '@/components/BlogHeroSlider';
import Link from 'next/link';
import Footer from '@/components/Footer'; // Εισαγωγή του Footer
import { expertsData } from '@/data/expertsData';

export default function StressBlog() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // Данные блога
  const blogData = {
    title: 'Стресс: когда он помогает, а когда разрушает',
    date: '25 ноября 2024',
    category: 'Стресс / Тревога',
    serviceCategories: 'Управление стрессом | Снятие тревоги',
    image: '/images/blog/blg007a.jpg',
    authorId: 1, // Αντιστοιχεί στη Виктория Котенко
  };

  // Εύρεση του συγγραφέα από το expertsData
  const author = expertsData.find(expert => expert.id === blogData.authorId);

  return (
    <div className="flex flex-col min-h-screen bg-[#f2f1f0]">
      {/* Custom CSS για να εξασφαλίσουμε το μέγιστο πλάτος και το z-index */}
      <style jsx>{`
        .custom-max-width {
          max-width: 1120px !important;
          width: 100% !important;
        }
        .custom-header-z-index {
          z-index: 100 !important;
        }
        .custom-slider-z-index {
          z-index: 10 !important;
        }
      `}</style>

      {/* ProfileHeader */}
      <div
        className="fixed top-0 left-0 right-0 custom-header-z-index"
      >
        <ProfileHeader setMenuOpen={setIsMenuOpen} />
      </div>

      {/* Main Content */}
      <main className="flex-grow">
        {/* BlogHeroSlider */}
        <div
          className="w-full custom-slider-z-index"
          style={{ marginTop: isMenuOpen ? '288px' : '96px' }}
        >
          <BlogHeroSlider imageSrc={blogData.image} />
        </div>

        {/* Основной контент с максимальной шириной 1120px */}
        <div className="custom-max-width mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{blogData.title}</h1>
            <p className="text-gray-500 text-sm">
              {blogData.date} | {blogData.category} | {blogData.serviceCategories} |{' '}
              <Link href={author?.profileLink || '#'} className="text-[#8eb5ba] hover:underline">
                {author ? author.name : 'Άгνωсτος Συгγραφэас'}
              </Link>
            </p>
          </div>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Ты когда-нибудь задумывалась, что стресс — это не всегда плохо?</h2>
            <p className="text-base leading-7 mb-4">
              Он может быть как топливом, так и ядром истощения. Всё зависит от того, сколько его, сколько времени он с нами — и как мы умеем с ним обращаться.
            </p>
            <p className="text-base leading-7">
              Мы боимся стресса, злимся на него, стараемся «отпустить» или «не париться». А он между тем остаётся — как фон, как тело, как внутренний двигатель. И в этом тексте я хочу поговорить с тобой не как со специалист — клиентом, а как с человеком к человеку. Про то, как это бывает. И что с этим делать.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Да, есть полезный стресс. Правда.</h2>
            <p className="text-base leading-7 mb-4">
              Это, наверное, любимая часть моей работы — рассказывать, что не весь стресс нужно гнать поганой метлой. Существует эустресс — состояние мобилизации и подъёма, когда ты, возможно, нервничаешь, но при этом собрана, бодра, чётко фокусируешься. Это как накануне выступления или перед важной встречей. Тело работает на тебя.
            </p>
            <p className="text-base leading-7 mb-4">
              Исследования показывают, что краткосрочный стресс даже может усиливать иммунитет и укреплять нервные связи. В одном метаанализе (Dhabhar, 2014) описывается, как «умеренный стресс» стимулирует защитные механизмы организма.
            </p>
            <p className="text-base leading-7">
              Проблема — в длительности.
            </p>
          </section>

          <figure className="mb-6">
            <img src="/images/blog/blg007b.jpg" alt="Иллюстрация полезного стресса" className="w-full h-auto object-cover rounded-lg" />
          </figure>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Когда стресс становится разрушительным</h2>
            <p className="text-base leading-7 mb-4">
              Если в эустрессе мы живём как на волне, то в хроническом — как в зыбучем болоте. Он незаметен сначала. Просто «немного устала», «всё время думаю», «не могу заснуть», «мне никто не звонит — и слава богу». А потом — раз, и ты уже не в ресурсе. Не радует. Не включаешься. Всё раздражает. Всё хочется отложить.
            </p>
            <p className="text-base leading-7 mb-4">
              Тело начинает говорить за тебя: головные боли, бессонница, зажимы, скачки давления, сбои в гормональном фоне.
            </p>
            <p className="text-base leading-7 mb-4">
              И это не «нервы». Это та самая система «бей или беги», которая застряла на позиции «всегда готова», даже если никакой опасности больше нет.
            </p>
            <p className="text-base leading-7">
              По данным APA, более 75 Patients report physical symptoms related to chronic stress (APA, 2023).
            </p>
          </section>

          <figure className="mb-6">
            <img src="/images/blog/blg007c.jpg" alt="Иллюстрация хронического стресса" className="w-full h-auto object-cover rounded-lg" />
          </figure>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Как понять, что стресс уже вышел из-под контроля?</h2>
            <p className="text-base leading-7 mb-4">
              Вот здесь немного наблюдений из практики и жизни:
            </p>
            <ul className="list-disc pl-6 mb-4 text-base leading-7">
              <li>Ты спишь, но не высыпаешься</li>
              <li>Хочется тишины, но в голове — шум</li>
              <li>Даже маленькие задачи кажутся непреодолимыми</li>
              <li>Тело болит, а анализы — идеальные</li>
              <li>Реакции на других — либо агрессия, либо отстранённость</li>
              <li>Ты не можешь остановиться, но и двигаться не хочется</li>
            </ul>
            <p className="text-base leading-7">
              Если тебе знакомо хоть что-то из этого — давай дальше разбираться, как можно себе помочь.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Что помогает, и как мягко себя поддержать</h2>
            <p className="text-base leading-7 mb-4">
              Я не буду писать «отпусти ситуацию» или «думай о хорошем». Это не работает. Ни для меня, ни для большинства моих клиентов.
            </p>
            <p className="text-base leading-7 mb-4">
              Работает другое:
            </p>
            <ul className="list-disc pl-6 text-base leading-7">
              <li>
                <strong>Дыхание. Простое. Медленное.</strong> 4–6 секунд на вдох, пауза, столько же — выдох. И снова. Пару минут. Это уже меняет химию мозга.
              </li>
              <li>
                <strong>Маленькие паузы.</strong> Не «сбежать на Бали», а просто 3 минуты закрыть глаза. Или посмотреть в окно. Или послушать, как ты дышишь.
              </li>
              <li>
                <strong>Тело.</strong> Оно знает. Иногда просто лечь на пол, обнять колени и подышать — это уже поддержка.
              </li>
              <li>
                <strong>Границы.</strong> Где ты делаешь то, чего не хочешь? Где соглашаешься, хотя всё внутри — против? Стресс накапливается именно там.
              </li>
              <li>
                <strong>Поддержка.</strong> Это может быть разговор с близким. Или с терапевтом. Или даже с собой — в дневнике. Главное — не оставаться одной наедине с шумом.
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Важное</h2>
            <p className="text-base leading-7 mb-4">
              Стресс не враг. Он сигнал. Напоминание. Иногда — будильник, который срабатывает, когда мы слишком долго живём «вопреки».
            </p>
            <p className="text-base leading-7">
              Прислушиваться к нему — это не слабость. Это зрелость. И именно она становится началом нового качества жизни.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Источники</h2>
            <ol className="list-decimal pl-6 text-base leading-7">
              <li>
                Dhabhar, F. S. (2014). Effects of stress on immune function. <i>Brain, Behavior, and Immunity</i>, 39, 1–12.{' '}
                <Link
                  href="https://doi.org/10.1016/j.bbi.2013.12.008"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  https://doi.org/10.1016/j.bbi.2013.12.008
                </Link>
              </li>
              <li>
                American Psychological Association (2023). Stress in America™ Survey.{' '}
                <Link
                  href="https://www.apa.org/news/press/releases/stress"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  https://www.apa.org/news/press/releases/stress
                </Link>
              </li>
              <li>
                McEwen, B. S. (2007). Physiology and neurobiology of stress and adaptation. <i>Physiological Reviews</i>, 87(3), 873–904.{' '}
                <Link
                  href="https://doi.org/10.1152/physrev.00041.2006"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  https://doi.org/10.1152/physrev.00041.2006
                </Link>
              </li>
            </ol>
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}