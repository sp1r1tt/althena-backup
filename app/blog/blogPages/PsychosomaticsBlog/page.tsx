"use client";

import React, { useState } from 'react';
import ProfileHeader from '@/components/ProfileHeader';
import BlogHeroSlider from '@/components/BlogHeroSlider';
import Link from 'next/link';
import Footer from '@/components/Footer'; // Εισαγωγή του Footer
import { expertsData } from '@/data/expertsData';

export default function PsychosomaticsBlog() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // Данные блога
  const blogData = {
    title: 'Психосоматика: как тело говорит о том, что не осознаёт разум',
    date: '20 ноября 2024',
    category: 'Стресс / Тревога',
    serviceCategories: 'Управление стрессом | Связь тела и разума',
    image: '/images/blog/blg005a.jpg',
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
            <h2 className="text-xl font-semibold mb-4">Мы привыкли воспринимать боль как следствие физической причины</h2>
            <p className="text-base leading-7 mb-4">
              Мы привыкли воспринимать боль как следствие физической причины — травмы, воспаления, заболевания. Но иногда за хроническими симптомами стоит не органическая патология, а подавленные эмоции, неосознанные конфликты или долгосрочный стресс. Это явление называют психосоматикой.
            </p>
            <p className="text-base leading-7">
              В этой статье мы разберём, что такое психосоматические расстройства, как они проявляются, какие исследования подтверждают их связь с психикой — и как можно с этим работать.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Что такое психосоматика?</h2>
            <p className="text-base leading-7 mb-4">
              Психосоматика — это направление в медицине и психологии, которое изучает, как психоэмоциональные процессы влияют на физическое состояние человека. В основе психосоматики лежит идея: «тело говорит то, что не может выразить сознание».
            </p>
            <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600">
              «Эмоциональная боль, если её не выразить, находит выход через тело» — Dr. Gabor Maté
            </blockquote>
            <p className="text-base leading-7 mt-4 mb-4">
              Психосоматические симптомы — это не «придуманные болезни», а реальные телесные реакции, связанные с внутренним напряжением. Они могут проявляться как:
            </p>
            <ul className="list-disc pl-6 text-base leading-7">
              <li>головные боли, мигрени</li>
              <li>боли в спине, шее</li>
              <li>хронические проблемы ЖКТ (синдром раздражённого кишечника, гастриты)</li>
              <li>кожные высыпания, зуд</li>
              <li>бессонница, усталость, учащённое сердцебиение</li>
            </ul>
          </section>

          <figure className="mb-6">
            <img src="/images/blog/blg005b.jpg" alt="Иллюстрация психосоматических симптомов" className="w-full h-auto object-cover rounded-lg" />
          </figure>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Как стресс влияет на тело?</h2>
            <p className="text-base leading-7 mb-4">
              Хронический стресс вызывает активацию гипоталамо-гипофизарно-адреналовой оси, что приводит к постоянному выбросу кортизола и адреналина. Это нарушает работу иммунной, пищеварительной, гормональной и сердечно-сосудистой систем.
            </p>
            <p className="text-base leading-7 mb-4">
              По данным Всемирной организации здравоохранения, до 70% обращений к врачам первичного звена связаны с жалобами, имеющими психосоматическую природу.
            </p>
            <p className="text-base leading-7">
              Сильные эмоции, такие как страх, гнев, вина, если они не осознаются и не проживаются, могут соматизироваться — то есть преобразовываться в телесные симптомы.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Исследования о психосоматике</h2>
            <ul className="list-disc pl-6 text-base leading-7">
              <li>В исследовании Kroenke & Mangelsdorff (1989) 80% из 1000 пациентов с соматическими жалобами не имели выявленной медицинской причины.</li>
              <li>Исследование Harvard Medical School подтвердило, что люди с высоким уровнем подавленных эмоций чаще сталкиваются с болевыми синдромами и функциональными нарушениями.</li>
              <li>Согласно публикации в <i>Journal of Psychosomatic Research</i>, тревожные расстройства и депрессия напрямую связаны с повышенной соматизацией.</li>
            </ul>
          </section>

          <figure className="mb-6">
            <img src="/images/blog/blg005c.jpg" alt="Иллюстрация связи стресса и тела" className="w-full h-auto object-cover rounded-lg" />
          </figure>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Как работать с психосоматикой?</h2>
            <ul className="list-disc pl-6 text-base leading-7">
              <li>
                <strong>Психотерапия.</strong> Разговор с профессионалом помогает осознать чувства, которые стоят за симптомами.
              </li>
              <li>
                <strong>Телесные практики.</strong> Дыхание, растяжка, йога, работа с телом помогают «достучаться» до вытесненных эмоций.
              </li>
              <li>
                <strong>Ведение дневника.</strong> Запись мыслей, ощущений и телесных симптомов помогает выявлять закономерности.
              </li>
              <li>
                <strong>Режим и отдых.</strong> Психосоматика часто возникает на фоне истощения — важно восстанавливаться.
              </li>
              <li>
                <strong>Нежность к себе.</strong> Поддерживающее отношение к своему телу и психике — важная часть исцеления.
              </li>
            </ul>
            <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 mt-4">
              «Тело — это не враг. Это союзник, который говорит с нами на своём языке»
            </blockquote>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Заключение</h2>
            <p className="text-base leading-7">
              Психосоматические симптомы — это не «надуманные» проблемы, а способ организма донести до нас важную информацию. Прислушиваясь к себе и работая с внутренним напряжением, мы можем восстановить не только тело, но и душевное равновесие.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Источники</h2>
            <ol className="list-decimal pl-6 text-base leading-7">
              <li>
                Maté, G. (2003). <i>When the Body Says No: The Cost of Hidden Stress</i>.{' '}
                <Link
                  href="https://drgabormate.com/book/when-the-body-says-no/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  https://drgabormate.com/book/when-the-body-says-no/
                </Link>
              </li>
              <li>
                World Health Organization. (2018). Mental health: strengthening our response.{' '}
                <Link
                  href="https://www.who.int/news-room/fact-sheets/detail/mental-health-strengthening-our-response"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  https://www.who.int/news-room/fact-sheets/detail/mental-health-strengthening-our-response
                </Link>
              </li>
              <li>
                Kroenke, K., & Mangelsdorff, A. D. (1989). Common symptoms in ambulatory care: Incidence, evaluation, therapy, and outcome. <i>The American Journal of Medicine</i>, 86(3), 262–266.{' '}
                <Link
                  href="https://doi.org/10.1016/0002-9343(89)90293-3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  https://doi.org/10.1016/0002-9343(89)90293-3
                </Link>
              </li>
              <li>
                Barsky, A. J., & Ahern, D. K. (2004). Cognitive behavior therapy for somatization and functional syndromes. <i>Harvard Review of Psychiatry</i>, 12(2), 60–71.{' '}
                <Link
                  href="https://pubmed.ncbi.nlm.nih.gov/15204804/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  PMID: 15204804
                </Link>
              </li>
              <li>
                Creed, F., & Barsky, A. (2004). A systematic review of the epidemiology of somatisation disorder and hypochondriasis. <i>Journal of Psychosomatic Research</i>, 56(4), 391–408.{' '}
                <Link
                  href="https://doi.org/10.1016/S0022-3999(03)00622-6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  https://doi.org/10.1016/S0022-3999(03)00622-6
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