"use client";

import React, { useState } from 'react';
import ProfileHeader from '@/components/ProfileHeader';
import BlogHeroSlider from '@/components/BlogHeroSlider';
import Link from 'next/link';
import Footer from '@/components/Footer'; // Εισαγωγή του Footer
import { expertsData } from '@/data/expertsData';

export default function SleepMentalHealthBlog() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // Данные блога
  const blogData = {
    title: 'Как нарушение сна влияет на психическое здоровье: научный взгляд',
    date: '30 ноября 2024',
    category: 'Стресс / Тревога',
    serviceCategories: 'Психическое благополучие | Здоровье сна',
    image: '/images/blog/blg009a.jpg',
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
                {author ? author.name : 'Άгνωστος Συгγραφэас'}
              </Link>
            </p>
          </div>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Введение</h2>
            <p className="text-base leading-7 mb-4">
              Хронический недосып, бессонница, трудности с засыпанием — мы часто воспринимаем эти явления как норму в условиях современной жизни. Но регулярные нарушения сна оказывают системное влияние на психическое здоровье. Стресс, тревожность, депрессия, снижение когнитивных функций — всё это может быть не причиной, а следствием плохого сна.
            </p>
            <p className="text-base leading-7">
              В этой статье мы рассмотрим научно обоснованную информацию о том, как работает связь между сном и психикой, и предложим практические шаги для восстановления баланса.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Что происходит в мозге при недосыпе?</h2>
            <p className="text-base leading-7 mb-4">
              Недостаток сна оказывает глубокое воздействие на работу мозга, влияя на эмоциональное и когнитивное состояние. Согласно данным Национального центра биотехнологической информации (NCBI), недостаток сна влияет на метаболизм глюкозы, иммунную систему, кровяное давление, а также работу сердечно-сосудистой и гормональной систем. Однако наибольшие последствия касаются когнитивных и эмоциональных функций: нарушается способность к концентрации, повышается утомляемость, снижается стрессоустойчивость. Эти изменения закладывают почву для развития тревожных расстройств и депрессии (NCBI, 2019).
            </p>
            <p className="text-base leading-7 mb-4">
              Сон играет ключевую роль в регуляции эмоций, восстановлении нервной системы и формировании памяти.
            </p>

            <figure className="mb-6">
              <img src="/images/blog/blg009b.jpg" alt="Иллюстрация нарушений сна 1" className="w-full h-auto object-cover rounded-lg" />
            </figure>

            <p className="text-base leading-7 mb-4">
              При недостатке сна:
            </p>
            <ul className="list-disc pl-6 mb-4 text-base leading-7">
              <li>снижается активность префронтальной коры (отвечает за самоконтроль и принятие решений);</li>
              <li>усиливается реакция амигдалы (центр тревоги и страха);</li>
              <li>нарушается баланс нейротрансмиттеров (серотонин, дофамин, норадреналин).</li>
            </ul>
            <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600">
              «Один из наиболее мощных предикторов депрессии у взрослых — качество сна» — Matthew Walker, профессор нейронауки и автор книги <i>Why We Sleep</i>
            </blockquote>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Связь между сном и тревожностью/депрессией</h2>
            <p className="text-base leading-7 mb-4">
              Нарушение сна напрямую связано с ухудшением психического здоровья. Многочисленные исследования подтверждают, что плохой сон может стать катализатором для тревожных расстройств и депрессии:
            </p>
            <ul className="list-disc pl-6 text-base leading-7">
              <li>Люди с хронической бессонницей в 10 раз чаще сталкиваются с депрессией (Baglioni et al., 2011);</li>
              <li>Нарушения сна увеличивают риск генерализованного тревожного расстройства (Alfano et al., 2010);</li>
              <li>Недостаток REM-сна нарушает переработку эмоциональных переживаний (NCBI, 2019).</li>
            </ul>
          </section>

          <figure className="mb-6">
            <img src="/images/blog/blg009c.jpg" alt="Иллюстрация нарушений сна 2" className="w-full h-auto object-cover rounded-lg" />
          </figure>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Когнитивные и поведенческие последствия</h2>
            <p className="text-base leading-7 mb-4">
              Недостаток сна влияет не только на эмоциональное состояние, но и на когнитивные способности и поведение человека:
            </p>
            <ul className="list-disc pl-6 mb-4 text-base leading-7">
              <li>Замедленная реакция и снижение внимательности;</li>
              <li>Повышенная раздражительность и импульсивность;</li>
              <li>Снижение способности к эмпатии;</li>
              <li>Ухудшение способности к принятию решений.</li>
            </ul>
            <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600">
              «Даже незначительное сокращение сна ухудшает способность человека адекватно воспринимать эмоции других людей» — NCBI (2019)
            </blockquote>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Сон и психотерапия</h2>
            <p className="text-base leading-7 mb-4">
              Важно учитывать, что работа с психикой невозможна без базовой регуляции сна. Во многих современных протоколах когнитивно-поведенческой терапии первым шагом становится нормализация сна (CBT-I).
            </p>
            <p className="text-base leading-7 mb-4">
              Сон влияет на эффективность терапии:
            </p>
            <ul className="list-disc pl-6 text-base leading-7">
              <li>снижает уровень сопротивления и повышает включённость клиента;</li>
              <li>помогает усваивать и интегрировать эмоционально значимые события.</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Что можно сделать уже сейчас?</h2>
            <p className="text-base leading-7 mb-4">
              Существует несколько практических шагов, которые помогут улучшить качество сна и, как следствие, поддержать психическое здоровье:
            </p>
            <ol className="list-decimal pl-6 text-base leading-7">
              <li><strong>Строгий режим сна.</strong> Ложитесь и вставайте в одно и то же время, даже в выходные.</li>
              <li><strong>Свет.</strong> Минимизируйте синий свет перед сном, особенно от экрана.</li>
              <li><strong>Движение.</strong> Умеренные физические нагрузки в течение дня — плюс к засыпанию.</li>
              <li><strong>Отключение.</strong> Минимум информационной нагрузки за 1–2 часа до сна.</li>
              <li><strong>Поддержка.</strong> Если бессонница хроническая — обратитесь за помощью, это может быть сомнолог, невролог, психиатр, когнитивный психотерапевт.</li>
            </ol>
          </section>

          <figure className="mb-6">
            <img src="/images/blog/blg009d.jpg" alt="Связь сна и психического здоровья" className="w-full h-auto object-cover rounded-lg" />
          </figure>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Заключение</h2>
            <p className="text-base leading-7">
              Сон — это фундамент. Нарушение сна может не только подрывать психическое здоровье, но и мешать восстановлению в терапии. Внимание ко сну — это первый шаг к ментальному благополучию.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Источники</h2>
            <ol className="list-decimal pl-6 text-base leading-7">
              <li>
                Walker, M. (2017). <i>Why We Sleep: Unlocking the Power of Sleep and Dreams</i>.{' '}
                <Link
                  href="https://www.simonandschuster.com/books/Why-We-Sleep/Matthew-Walker/9781501144325"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  https://www.simonandschuster.com/books/Why-We-Sleep/Matthew-Walker/9781501144325
                </Link>
              </li>
              <li>
                Baglioni, C., et al. (2011). Insomnia as a predictor of depression: A meta-analytic evaluation. <i>Journal of Affective Disorders</i>, 135(1–3), 10–19.{' '}
                <Link
                  href="https://doi.org/10.1016/j.sleep.2010.12.003"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  https://doi.org/10.1016/j.sleep.2010.12.003
                </Link>
              </li>
              <li>
                National Center for Biotechnology Information (2019). Sleep Deprivation and Deficiency. In: <i>StatPearls [Internet]</i>.{' '}
                <Link
                  href="https://www.ncbi.nlm.nih.gov/books/NBK513300/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  https://www.ncbi.nlm.nih.gov/books/NBK513300/
                </Link>
              </li>
              <li>
                Alfano, C. A., et al. (2010). Sleep-related problems among children and adolescents with anxiety disorders. <i>Clinical Psychology Review</i>, 30(2), 141–152.{' '}
                <Link
                  href="https://doi.org/10.1016/j.cpr.2009.10.006"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  https://doi.org/10.1016/j.cpr.2009.10.006
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