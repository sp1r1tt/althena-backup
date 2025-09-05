"use client";

import React, { useState } from 'react';
import ProfileHeader from '@/components/ProfileHeader';
import BlogHeroSlider from '@/components/BlogHeroSlider';
import Link from 'next/link';
import Footer from '@/components/Footer'; // Εισαγωγή του Footer
import { expertsData } from '@/data/expertsData';

export default function SympathyEmpathyBlog() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // Данные блога
  const blogData = {
    title: 'Сочувствие и эмпатия: в чём разница и почему это важно понимать',
    date: '22 ноября 2024',
    category: 'Отношения',
    serviceCategories: 'Отношения | Эмоциональный интеллект',
    image: '/images/blog/blg006a.jpg',
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
            <p className="text-base leading-7">
              Мы часто используем слова «сочувствие» и «эмпатия» как синонимы. Оба связаны с откликом на чувства другого человека, с желанием поддержать. Но в реальности эти понятия не только разные, но и по-разному влияют на отношения, эмоциональное выгорание и даже психологическую устойчивость. В этой статье мы разберём, в чём суть различий, какие процессы стоят за этими реакциями и почему понимание этой разницы важно для эмоционального здоровья.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Что такое сочувствие?</h2>
            <p className="text-base leading-7 mb-4">
              Сочувствие — это способность откликнуться на боль другого, разделить его страдание, почувствовать жалость, тревогу, желание помочь. Оно чаще всего сопровождается эмоциональной вовлечённостью и, как правило, порождает дистанцированную поддержку: «Мне жаль тебя», «Я переживаю, что ты страдаешь».
            </p>
            <p className="text-base leading-7 mb-4">Сочувствие:</p>
            <ul className="list-disc pl-6 mb-4 text-base leading-7">
              <li>активирует личный эмоциональный дискомфорт</li>
              <li>может привести к «перегоранию», особенно в помогающих профессиях</li>
              <li>нередко сопровождается чувством вины и тревоги</li>
            </ul>
            <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600">
              «Сочувствие легко переходит в жалость, а жалость редко становится основой подлинной близости»
            </blockquote>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Ключевые различия</h2>
            <figure className="mb-6">
              <img src="/images/blog/blg006b.jpg" alt="Иллюстрация сочувствия" className="w-full h-auto object-cover rounded-lg" />
            </figure>

            <table
              className="w-full"
              style={{ maxWidth: '920px', borderCollapse: 'collapse', margin: '20px auto' }}
            >
              <thead>
                <tr>
                  <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}></th>
                  <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                    Сочувствие
                  </th>
                  <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                    Эмпатия
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                    <strong>Фокус</strong>
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                    На страдании другого и своём ответе
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                    На состоянии другого человека
                  </td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                    <strong>Отклик</strong>
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                    «Мне жаль тебя»
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                    «Я понимаю, что ты чувствуешь»
                  </td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                    <strong>Дистанция</strong>
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                    Часто создаёт дистанцию
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                    Создаёт ощущение принятия и связи
                  </td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                    <strong>Результат</strong>
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                    Может вызывать усталость
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                    Поддерживает контакт и устойчивость
                  </td>
                </tr>
              </tbody>
            </table>
            <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600">
              «Эмпатия — это способность быть с болью другого, не пытаясь её немедленно устранить» — Brené Brown, Atlas of the Heart
            </blockquote>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Что такое эмпатия?</h2>
            <p className="text-base leading-7 mb-4">
              Эмпатия — это способность понимать чувства другого человека изнутри его опыта, не обязательно проживая их на себе. Это про осознанное присутствие рядом, когда мы способны быть с другим, не теряя себя.
            </p>
            <p className="text-base leading-7 mb-4">Эмпатия включает:</p>
            <ul className="list-disc pl-6 mb-4 text-base leading-7">
              <li>когнитивный компонент (понимание, что чувствует другой)</li>
              <li>эмоциональный отклик (но не полное слияние)</li>
              <li>регуляцию собственного состояния, чтобы не «утонуть» в чужих чувствах</li>
            </ul>
            <p className="text-base leading-7">
              Исследования показывают, что именно эмпатия, а не сочувствие, связана с более высокой устойчивостью к выгоранию (Decety & Lamm, 2006).
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Почему это важно в повседневной жизни?</h2>
            <ul className="list-disc pl-6 text-base leading-7">
              <li>
                <strong>В личных отношениях:</strong> эмпатия укрепляет связь, а сочувствие может вызывать ощущение жалости или снисходительности.
              </li>
              <li>
                <strong>В работе с людьми:</strong> избыток сочувствия приводит к эмоциональному истощению, тогда как эмпатия помогает оставаться включённым, сохраняя границы.
              </li>
              <li>
                <strong>В воспитании:</strong> эмпатия учит детей распознавать и называть свои эмоции, а не избегать их.
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Как развивать эмпатию?</h2>
            <ul className="list-disc pl-6 text-base leading-7">
              <li>Учитесь слушать не перебивая. Искреннее внимание — основа эмпатии.</li>
              <li>Замечайте чувства, а не только факты. Что стоит за словами?</li>
              <li>Регулярно практикуйте саморефлексию. Это помогает не срываться в автоматические реакции.</li>
              <li>Развивайте эмоциональный словарь. Чем точнее вы определяете чувства, тем глубже понимаете других.</li>
              <li>Работайте с внутренними ограничениями. Например, с убеждениями вроде «чувства — это слабость».</li>
            </ul>
          </section>

          <figure className="mb-6">
            <img src="/images/blog/blg006c.jpg" alt="Иллюстрация эмпатии" className="w-full h-auto object-cover rounded-lg" />
          </figure>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Заключение</h2>
            <p className="text-base leading-7">
              Понимание разницы между сочувствием и эмпатией — важный шаг к зрелым, глубоким и устойчивым отношениям. Эмпатия не требует спасать другого — она требует быть рядом и понимать. Это навык, который можно развивать — и который делает нас по-настоящему ближе к другим и к себе.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Источники</h2>
            <ol className="list-decimal pl-6 text-base leading-7">
              <li>
                Brown, B. (2021). <i>Atlas of the Heart: Mapping Meaningful Connection and the Language of Human Experience</i>.{' '}
                <Link
                  href="https://brenebrown.com/book/atlas-of-the-heart/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  https://brenebrown.com/book/atlas-of-the-heart/
                </Link>
              </li>
              <li>
                Decety, J., & Lamm, C. (2006). Human empathy through the lens of social neuroscience. <i>Trends in Cognitive Sciences</i>, 10(10), 435–441.{' '}
                <Link
                  href="https://doi.org/10.1016/j.tics.2006.01.001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  https://doi.org/10.1016/j.tics.2006.01.001
                </Link>
              </li>
              <li>
                Riess, H., Bailey, R. W., Dunn, E. J., & Phillips, M. (2012). Empathy training for resident physicians: a randomized controlled trial of a neuroscience-informed curriculum. <i>Journal of General Internal Medicine</i>, 27(10), 1280–1286.{' '}
                <Link
                  href="https://doi.org/10.1007/s11606-012-2063-z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  https://doi.org/10.1007/s11606-012-2063-z
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