"use client";

import React, { useState } from 'react';
import ProfileHeader from '@/components/ProfileHeader';
import BlogHeroSlider from '@/components/BlogHeroSlider';
import Link from 'next/link';
import Footer from '@/components/Footer'; // Εισαγωγή του Footer
import { expertsData } from '@/data/expertsData';

export default function EmotionalIntelligenceBlog() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // Данные блога
  const blogData = {
    title: 'Эмоциональный интеллект: как понимать свои чувства и управлять ими',
    date: '7 ноября 2024',
    category: 'Уверенность в себе / Самооценка',
    serviceCategories: 'Эмоциональный интеллект | Самосознание',
    image: '/images/blog/blg002a.jpg',
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
            <h2 className="text-xl font-semibold mb-4">Введение</h2>
            <p className="text-base leading-7 mb-4">
              В мире, где информационная перегрузка стала нормой, а стресс — частью повседневности, умение распознавать и управлять своими эмоциями становится не просто полезным, а жизненно важным навыком. Эмоциональный интеллект (ЭИ) — это способность осознавать, понимать и регулировать не только собственные чувства, но и эмоции других людей. Он влияет на всё: от качества отношений до профессиональной реализации и психологического благополучия.
            </p>
            <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600">
              «Люди с высоким уровнем эмоционального интеллекта лучше справляются с жизненными трудностями и реже оказываются в тупике» — Daniel Goleman, <i>Emotional Intelligence: Why It Can Matter More Than IQ</i>
            </blockquote>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Что такое эмоциональный интеллект?</h2>
            <p className="text-base leading-7 mb-4">
              Термин "эмоциональный интеллект" стал широко известен благодаря Даниэлу Гоулману, который выделил пять его ключевых компонентов:
            </p>
            <ol className="list-decimal pl-6 mb-4 text-base leading-7">
              <li><strong>Самоосознание</strong> — способность распознавать свои эмоции и понимать их влияние на мысли и поведение.</li>
              <li><strong>Саморегуляция</strong> — умение управлять импульсами, справляться с тревогой и агрессией.</li>
              <li><strong>Мотивация</strong> — внутренняя мотивация и стремление к развитию, несмотря на трудности.</li>
              <li><strong>Эмпатия</strong> — способность понимать чувства других и сопереживать.</li>
              <li><strong>Социальные навыки</strong> — умение выстраивать здоровые отношения, общаться, разрешать конфликты.</li>
            </ol>
            <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600">
              «Эмоциональный интеллект — это не просто черта личности, а набор навыков, которые можно развивать» — Salovey & Mayer, <i>Emotional Intelligence</i>
            </blockquote>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Почему эмоциональный интеллект важен?</h2>
            <p className="text-base leading-7 mb-4">
              Исследования показывают, что высокий уровень ЭИ коррелирует с:
            </p>
            <ul className="list-disc pl-6 mb-4 text-base leading-7">
              <li>меньшим уровнем тревожности и депрессии;</li>
              <li>лучшими результатами на работе;</li>
              <li>более устойчивыми и гармоничными отношениями;</li>
              <li>повышенной стрессоустойчивостью.</li>
            </ul>
            <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600">
              «Эмоции — это данные. Они дают нам информацию о том, что важно» — Marc Brackett, <i>Permission to Feel</i>
            </blockquote>
          </section>

          <figure className="mb-6">
            <img src="/images/blog/blg002b.jpg" alt="Компоненты эмоционального интеллекта" className="w-full h-auto object-cover rounded-lg" />
          </figure>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Эмоции как сигналы</h2>
            <p className="text-base leading-7 mb-4">
              Один из частых запросов, с которым ко мне приходят клиенты — «я не понимаю, что чувствую». Это может быть связано с тем, что в детстве эмоции ребёнка неправильно идентифицировались взрослыми. Например, грусть называли капризом, злость — непослушанием, а страх — трусостью. Когда чувства систематически обесцениваются или переименовываются, человек взрослеет с искажённой внутренней картой эмоций.
            </p>
            <p className="text-base leading-7 mb-4">
              Здесь на помощь может прийти <strong>Колесо эмоций Плутчика</strong>. Это визуальный инструмент, который помогает:
            </p>
            <ul className="list-disc pl-6 mb-4 text-base leading-7">
              <li>различать похожие эмоции (например, раздражение и гнев);</li>
              <li>расширять эмоциональный словарь (чем точнее мы называем, тем лучше понимаем);</li>
              <li>замечать нюансы — ведь между тревогой и паникой лежит целый спектр состояний.</li>
            </ul>
            <p className="text-base leading-7 mb-4">
              В практике я неоднократно использовала это колесо с клиентами — и вижу, как оно помогает вернуть чувствам названия, а через это — и право на существование. Когда мы начинаем распознавать, что чувствуем — появляется возможность управлять этими состояниями, а не быть ими захваченными.
            </p>
            <p className="text-base leading-7 mb-4">
              Эмоциональный словарь — это не просто слова. Это ключ к самопониманию и внутренней стабильности.
            </p>
            <p className="text-base leading-7">
              Один из важных аспектов эмоционального интеллекта — это понимание, что эмоции не «плохие» и не «хорошие». Они — сигналы. Злость может говорить о нарушении границ, грусть — о потере, тревога — о неопределённости. Умение расшифровывать эти сигналы помогает быстрее находить решения и снижать внутреннее напряжение.
            </p>
          </section>

          <figure className="mb-6">
            <img src="/images/blog/blg002c.jpg" alt="Колесо эмоций Плутчика" className="w-full h-auto object-cover rounded-lg" />
          </figure>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Как развивать эмоциональный интеллект?</h2>
            <ol className="list-decimal pl-6 mb-4 text-base leading-7">
              <li><strong>Практика осознанности.</strong> Ведение дневника эмоций, медитации, телесные практики помогают лучше понимать, что происходит внутри.</li>
              <li><strong>Рефлексия.</strong> После значимых событий — задавайте себе вопросы: «Что я чувствую? Почему? Что мне это говорит?»</li>
              <li><strong>Работа с внутренним критиком.</strong> Замечайте моменты, когда вы осуждаете себя, и пробуйте заменить их на поддержку.</li>
              <li><strong>Обратная связь.</strong> Учитесь слушать других без защиты и интерпретировать их эмоции не как атаку, а как проявление их внутреннего состояния.</li>
              <li><strong>Психотерапия.</strong> Работа с психологом помогает безопасно исследовать эмоции и развивать навыки саморегуляции.</li>
            </ol>
            <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600">
              «Мы не можем контролировать всё, что с нами происходит, но мы можем научиться контролировать, как мы это воспринимаем» — Gross J. J., <i>The Emerging Field of Emotion Regulation</i>
            </blockquote>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Как использовать ЭИ в повседневной жизни?</h2>
            <ul className="list-disc pl-6 text-base leading-7">
              <li><strong>На работе:</strong> конструктивное общение, управление конфликтами, обратная связь без обесценивания.</li>
              <li><strong>В отношениях:</strong> открытость, умение говорить о своих чувствах без упрёков, эмпатия к партнёру.</li>
              <li><strong>С детьми:</strong> обучать их распознавать эмоции, давать им право на чувства.</li>
              <li><strong>В кризисах:</strong> принятие эмоций как части процесса, а не как препятствия.</li>
            </ul>
          </section>

          <figure className="mb-6">
            <img src="/images/blog/blg002d.jpg" alt="Практика эмоционального интеллекта" className="w-full h-auto object-cover rounded-lg" />
          </figure>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Заключение</h2>
            <p className="text-base leading-7">
              Эмоциональный интеллект — это не врождённый талант, а навык, который развивается через внимание к себе, честность и практику. Он помогает лучше понимать себя и других, строить более тёплые и здоровые связи и справляться с жизненными вызовами. Если вы хотите изменить свою жизнь, начните с признания своих эмоций — они ваш ориентир, а не враг.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Источники</h2>
            <ol className="list-decimal pl-6 text-base leading-7">
              <li>
                Goleman, D. (1995). <i>Emotional Intelligence: Why It Can Matter More Than IQ</i>.{' '}
                <Link
                  href="https://danielgoleman.info/topics/emotional-intelligence/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  https://danielgoleman.info/topics/emotional-intelligence/
                </Link>
              </li>
              <li>
                Salovey, P., & Mayer, J. D. (1990). Emotional Intelligence. <i>Imagination, Cognition and Personality</i>.{' '}
                <Link
                  href="https://journals.sagepub.com/doi/abs/10.2190/DUGG-P24E-52WK-6CDG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  https://journals.sagepub.com/doi/abs/10.2190/DUGG-P24E-52WK-6CDG
                </Link>
              </li>
              <li>
                Mayer, J. D., Salovey, P., & Caruso, D. R. (2004). Emotional Intelligence: Theory, Findings, and Implications.{' '}
                <Link
                  href="https://psycnet.apa.org/record/2004-11678-002"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  https://psycnet.apa.org/record/2004-11678-002
                </Link>
              </li>
              <li>
                Brackett, M. A. (2019). <i>Permission to Feel</i>.{' '}
                <Link
                  href="https://www.marcbrackett.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  https://www.marcbrackett.com/
                </Link>
              </li>
              <li>
                Gross, J. J. (1998). The Emerging Field of Emotion Regulation: An Integrative Review.{' '}
                <Link
                  href="https://doi.org/10.1037/1089-2680.2.3.271"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  https://doi.org/10.1037/1089-2680.2.3.271
                </Link>
              </li>
              <li>
                Goleman, D. (2004). What Makes a Leader? <i>Harvard Business Review</i>.{' '}
                <Link
                  href="https://hbr.org/2004/01/what-makes-a-leader"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  https://hbr.org/2004/01/what-makes-a-leader
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