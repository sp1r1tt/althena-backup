"use client";

import React, { useState } from 'react';
import ProfileHeader from '@/components/ProfileHeader';
import BlogHeroSlider from '@/components/BlogHeroSlider';
import Link from 'next/link';
import Footer from '@/components/Footer'; // Εισαγωγή του Footer
import { expertsData } from '@/data/expertsData';

export default function RuminationBlog() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // Данные блога
  const blogData = {
    title: 'Руминация: почему мы застреваем в мыслях и как это остановить',
    date: '18 ноября 2024',
    category: 'Стресс / Тревога',
    serviceCategories: 'Управление стрессом | Снятие тревоги',
    image: '/images/blog/blg004a.jpg',
    authorId: 1, // Αντιστοιχεί στη Виктория Котенко
  };

  // Εύρεση του συγγραφέа από το expertsData
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
            <h2 className="text-xl font-semibold mb-4">Навязчивые мысли, прокручивание одних и тех же ситуаций, бесконечный анализ</h2>
            <p className="text-base leading-7 mb-4">
              Навязчивые мысли, прокручивание одних и тех же ситуаций, бесконечный анализ — всё это проявления руминации. Мы можем часами мысленно возвращаться к одной и той же фразе, сцене, разговору, не находя выхода. Руминация истощает, усиливает тревожность и мешает двигаться вперёд.
            </p>
            <p className="text-base leading-7">
              В этой статье мы разберём, что такое руминация, почему она возникает, как влияет на психику и, главное — как её остановить.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Что такое руминация?</h2>
            <p className="text-base leading-7 mb-4">
              Руминация — это повторяющееся зацикливание на одних и тех же мыслях, часто негативного характера. Это может быть:
            </p>
            <ul className="list-disc pl-6 mb-4 text-base leading-7">
              <li>самокритика («Почему я так сказал/сделал?»)</li>
              <li>тревожные сценарии будущего</li>
              <li>возвращение к прошедшим конфликтам</li>
              <li>внутренний диалог, в котором человек бесконечно объясняется, оправдывается, доказывает</li>
            </ul>
            <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600">
              «Руминация похожа на бег по кругу: ты устаёшь, но не приближаешься к решению»
            </blockquote>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Почему мы застреваем в мыслях?</h2>
            <p className="text-base leading-7 mb-4">
              Руминация может быть формой психологической защиты. Мы как будто пытаемся "переиграть" ситуацию, чтобы не испытывать боль, стыд или тревогу. Также это может быть попыткой сохранить контроль над непредсказуемостью.
            </p>
            <p className="text-base leading-7 mb-4">
              Факторы, способствующие руминации:
            </p>
            <ul className="list-disc pl-6 mb-4 text-base leading-7">
              <li>повышенный уровень тревожности</li>
              <li>перфекционизм</li>
              <li>привычка к самокритике</li>
              <li>пережитая травма или несправедливость</li>
              <li>эмоциональная изоляция</li>
            </ul>
            <p className="text-base leading-7">
              Исследования показывают, что руминация тесно связана с депрессией и повышает риск её хронизации (Nolen-Hoeksema, 2000).
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Чем руминация отличается от размышления?</h2>
            <p className="text-base leading-7 mb-4">
              Важно различать:
            </p>
            <ul className="list-disc pl-6 mb-4 text-base leading-7">
              <li>Размышление — это конструктивный процесс, направленный на понимание и выводы</li>
              <li>Руминация — циклична, тревожна и не даёт результата</li>
            </ul>
            <p className="text-base leading-7">
              Простой ориентир: размышление приводит к действию или осознанию, а руминация — к утомлению.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Последствия руминации</h2>
            <ul className="list-disc pl-6 mb-4 text-base leading-7">
              <li>Усиление тревоги и стресса</li>
              <li>Повышение утомляемости и раздражительности</li>
              <li>Нарушения сна</li>
              <li>Снижение концентрации</li>
              <li>Проблемы в отношениях</li>
              <li>Усиление чувства вины и беспомощности</li>
            </ul>
            <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600">
              «Когда ум перегружен мыслями, тело начинает болеть» — из практики. У одной из клиенток хронические головные боли ушли, когда она научилась замечать и останавливать руминации.
            </blockquote>
          </section>

          <figure className="mb-6">
            <img src="/images/blog/blg004b.jpg" alt="Иллюстрация различия между руминацией и размышлением" className="w-full h-auto object-cover rounded-lg" />
          </figure>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Как остановить руминацию?</h2>
            <ol className="list-decimal pl-6 mb-4 text-base leading-7">
              <li>Замечайте момент зацикливания. Просто назвать: «Я сейчас застрял в мыслях» — уже половина дела.</li>
              <li>Смените фокус внимания. Прогулка, дыхание, задание телу — всё, что возвращает в момент «здесь и сейчас».</li>
              <li>Задайте себе вопрос: «Эти мысли помогают мне или просто истощают?»</li>
              <li>Выразите чувства. Проговорите с кем-то или запишите в дневник.</li>
              <li>Ограничьте «время для переживаний». Можно даже установить таймер: 10 минут — и всё, достаточно.</li>
              <li>Ищите смысл. Иногда руминация указывает на важные неудовлетворённые потребности.</li>
              <li>Работайте с терапевтом. Это помогает увидеть корни повторяющихся сценариев и заменить их более конструктивными стратегиями.</li>
            </ol>
            <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600">
              «Осознанность — это якорь, который возвращает нас в реальность, когда мысли уносят в шторм»
            </blockquote>
          </section>

          <figure className="mb-6">
            <img src="/images/blog/blg004c.jpg" alt="Иллюстрация последствий руминации" className="w-full h-auto object-cover rounded-lg" />
          </figure>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Заключение</h2>
            <p className="text-base leading-7">
              Руминация — это не лень и не слабость. Это сигнал о перегруженности, тревоге и эмоциональном голоде. И с этим можно работать. Начните с наблюдения, разрешите себе чувствовать, и постепенно вы вернёте себе право на внутреннюю тишину.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Источники</h2>
            <ol className="list-decimal pl-6 text-base leading-7">
              <li>
                Nolen-Hoeksema, S. (2000). The role of rumination in depressive disorders and mixed anxiety/depressive symptoms. <i>Journal of Abnormal Psychology</i>, 109(3), 504–511.{' '}
                <Link
                  href="https://doi.org/10.1037/0021-843X.109.3.504"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  https://doi.org/10.1037/0021-843X.109.3.504
                </Link>
              </li>
              <li>
                Watkins, E. R. (2008). Constructive and unconstructive repetitive thought. <i>Psychological Bulletin</i>, 134(2), 163–206.{' '}
                <Link
                  href="https://doi.org/10.1037/0033-2909.134.2.163"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  https://doi.org/10.1037/0033-2909.134.2.163
                </Link>
              </li>
              <li>
                Ehring, T., & Watkins, E. R. (2008). Repetitive negative thinking as a transdiagnostic process. <i>International Journal of Cognitive Therapy</i>, 1(3), 192–205.{' '}
                <Link
                  href="https://doi.org/10.1521/ijct.2008.1.3.192"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  https://doi.org/10.1521/ijct.2008.1.3.192
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