"use client";

import React, { useState } from 'react';
import ProfileHeader from '@/components/ProfileHeader';
import BlogHeroSlider from '@/components/BlogHeroSlider';
import Link from 'next/link';
import Footer from '@/components/Footer'; // Εισαγωγή του Footer
import { expertsData } from '@/data/expertsData';

export default function CodependencyBlog() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // Данные блога
  const blogData = {
    title: 'Созависимость: как распознать и выйти из нездоровых отношений',
    date: '5 ноября 2024',
    category: 'Отношения',
    serviceCategories: 'Отношения | Семейные отношения',
    image: '/images/blog/blg001a.jpg',
    authorId: 1, // Антистоиχεί στη Виктория Котенко
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
      <div className="fixed top-0 left-0 right-0 custom-header-z-index">
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
              Созависимость — это не просто «слишком сильная привязанность» к другому человеку. Это глубокий психологический паттерн, при котором собственные потребности подменяются потребностями другого. Такие отношения могут выглядеть как самоотверженная забота, но внутри часто скрываются страх одиночества, низкая самооценка и стремление к контролю через спасение другого.<br />
              В этой статье мы разберём, что такое созависимость, как она формируется, по каким признакам её можно распознать и что делать, если вы узнали себя в этих описаниях.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Что такое созависимость?</h2>
            <p className="text-base leading-7 mb-4">
              Созависимость — это модель отношений, в которой один человек жертвует собой ради другого, теряя при этом связь со своими чувствами, желаниями и границами. Это не любовь, а скорее симбиоз, в котором один «даёт» до изнеможения, а другой — «берёт» без меры.<br />
              Созависимые отношения часто формируются в парах, где:
            </p>
            <ul className="list-disc pl-6 mb-4 text-base leading-7">
              <li>один партнёр испытывает зависимость (например, от веществ, работы, эмоциональных всплесков)</li>
              <li>другой — старается спасти, помочь, контролировать, забывая о себе</li>
            </ul>
            <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600">
              «Созависимость — это способ справляться с внутренней пустотой за счёт контроля над другим» — Melody Beattie, Codependent No More
            </blockquote>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Как формируется созависимость?</h2>
            <p className="text-base leading-7 mb-4">
              Истоки часто уходут в детство:
            </p>
            <ul className="list-disc pl-6 mb-4 text-base leading-7">
              <li>Родители, которым нужно было «удобное» или «нужное» поведение ребёнка</li>
              <li>Отсутствие эмоциональной безопасности или непоследовательность в реакции на чувства</li>
              <li>Повышенная ответственность с раннего возраста («Ты должен заботиться о маме»)</li>
            </ul>
            <p className="text-base leading-7">
              В результате у человека формируется убеждение: «Я нужен, только если полезен другим», «Любовь — это когда я жертвую собой».
            </p>
            <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 mt-4">
              «Созависимость начинается там, где заканчиваются личные границы» — Pia Mellody, Facing Codependence
            </blockquote>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Признаки созависимости</h2>
            <ul className="list-disc pl-6 mb-4 text-base leading-7">
              <li>Постоянное чувство вины, если не помогаешь</li>
              <li>Зависимость самооценки от оценки партнёра</li>
              <li>Трудности с выражением гнева и несогласия</li>
              <li>Страх быть покинутым</li>
              <li>Желание контролировать эмоции и поступки другого</li>
              <li>Игнорирование собственных потребностей</li>
            </ul>
            <p className="text-base leading-7">
              Созависимость может проявляться не только в романтических отношениях, но и в дружбе, отношениях с родителями, детьми, коллегами.<br />
              Клиентка на одной из сессий сказала: «Я не понимаю, чего хочу. Я всегда жила чужими желаниями — сначала мамиными, потом мужа». Это типичная иллюстрация созависимого паттерна.
            </p>
          </section>

          <figure className="mb-6">
            <img src="/images/blog/blg001c.jpg" alt="Codependency Illustration 1" className="w-full h-auto object-cover rounded-lg" />
          </figure>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Чем опасна созависимость?</h2>
            <ul className="list-disc pl-6 mb-4 text-base leading-7">
              <li>Постоянное эмоциональное истощение</li>
              <li>Потеря идентичности</li>
              <li>Высокий уровень тревожности и депрессии</li>
              <li>Развитие психосоматических симптомов</li>
              <li>Уход в крайности — от гиперконтроля до полной саможертвы</li>
            </ul>
            <p className="text-base leading-7">
              Созависимость — это не просто неудобный стиль отношений, это психоэмоциональное состояние, которое подрывает базу личности.
            </p>
            <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 mt-4">
              «Созависимость — это эмоциональное рабство, где ты больше не принадлежишь себе» — Ross Rosenberg, The Human Magnet Syndrome
            </blockquote>
          </section>

          <figure className="mb-6">
            <img src="/images/blog/blg001b.jpg" alt="Codependency Illustration 2" className="w-full h-auto object-cover rounded-lg" />
          </figure>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Как выйти из созависимости?</h2>
            <ol className="list-decimal pl-6 mb-4 text-base leading-7">
              <li>Осознай проблему. Признание — это первый и самый важный шаг.</li>
              <li>Восстанавливай контакт с собой. Начни с простых вопросов: «Что я сейчас чувствую?», «Чего я хочу?»</li>
              <li>Учись отстаивать границы. Это не про агрессию, а про честность и уважение к себе.</li>
              <li>Развивай самоценность. Твоя ценность не в том, чтобы быть нужным, а в том, что ты есть.</li>
              <li>Обратиться за помощь. Психотерапия помогает разорвать старые сценарии и научиться строить зрелые, поддерживающие отношения.</li>
            </ol>
            <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600">
              «Отпустить контроль — это не значит стать безразличным. Это значит позволить другому быть отдельной личностью» — Pia Mellody
            </blockquote>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Заключение</h2>
            <p className="text-base leading-7">
              Созависимость — это не приговор. Это стратегия выживания, которую можно пересмотреть. Пройдя путь к себе, к своим чувствам и потребностям, вы сможете построить отношения, в которых будет место не только другому, но и себе. И это — настоящая близость.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Источники</h2>
            <ol className="list-decimal pl-6 text-base leading-7">
              <li>
                Beattie, M. (1987). <i>Codependent No More: How to Stop Controlling Others and Start Caring for Yourself</i>.{' '}
                <Link
                  href="https://www.melodybeattie.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  https://www.melodybeattie.com/
                </Link>
              </li>
              <li>
                Mellody, P., Miller, A. W., & Miller, K. (1989). <i>Facing Codependence: What It Is, Where It Comes from, How It Sabotages Our Lives</i>.{' '}
                <Link
                  href="https://www.goodreads.com/book/show/60989.Facing_Codependence"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  https://www.goodreads.com/book/show/60989.Facing_Codependence
                </Link>
              </li>
              <li>
                Rosenberg, R. (2013). <i>The Human Magnet Syndrome: Why We Love People Who Hurt Us</i>.{' '}
                <Link
                  href="https://humanmagnetsyndrome.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  https://humanmagnetsyndrome.com/
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