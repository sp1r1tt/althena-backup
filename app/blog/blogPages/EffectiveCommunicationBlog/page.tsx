"use client";

import React, { useState } from 'react';
import ProfileHeader from '@/components/ProfileHeader';
import BlogHeroSlider from '@/components/BlogHeroSlider';
import Link from 'next/link';
import Footer from '@/components/Footer'; // Εισαγωγή του Footer
import { expertsData } from '@/data/expertsData';

export default function EffectiveCommunicationBlog() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // Данные блога
  const blogData = {
    title: 'Эффективное общение: как говорить, чтобы быть услышанным',
    date: '15 декабря 2024',
    category: 'Отношения',
    serviceCategories: 'Отношения | Навыки общения',
    image: '/images/blog/blg008a.jpg',
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
            <h2 className="text-xl font-semibold mb-4">Говорить — не значит успешно коммуницировать: как построить настоящее общение</h2>
            <p className="text-base leading-7 mb-4">
              Все умеют говорить. Но не все умеют доносить. И уж тем более — слышать. Настоящее общение — это не просто подбор слов. Это процесс. Это контакт. Это про «быть с другим» и при этом — не терять себя.
            </p>
            <p className="text-base leading-7 mb-4">
              Мы учимся алфавиту, диктанту, интонациям. Но не учим, как говорить о границах. Как выражать боль. Как спорить, не уничтожая. Как говорить «нет» без вины. И как слышать — даже когда не согласны.
            </p>
            <p className="text-base leading-7">
              Хочу поговорить об этом. Без «правильных скриптов». Просто — как человек, который часто работает с тем, где диалог заканчивается и начинается стена.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Почему мы не слышим друг друга?</h2>
            <p className="text-base leading-7 mb-4">
              У каждого — свои фильтры. Опыт, травмы, уязвимости, тонкости темперамента. Слова могут быть одни, а слышатся — по-разному.
            </p>
            <ul className="list-disc pl-6 mb-4 text-base leading-7">
              <li>Когда ты говоришь «мне плохо», другой может слышать «ты виноват»</li>
              <li>Когда ты молчишь, другой может думать, что ты безразлична</li>
              <li>Когда ты стараешься быть вежливой, другой считывает это как отстранённость</li>
            </ul>
            <p className="text-base leading-7">
              Коммуникация — это не то, что мы говорим. Это то, как это принимается.
            </p>
          </section>

          <figure className="mb-6">
            <img src="/images/blog/blg008b.jpg" alt="Иллюстрация общения 1" className="w-full h-auto object-cover rounded-lg" />
          </figure>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Что делает общение настоящим?</h2>
            <ol className="list-decimal pl-6 mb-4 text-base leading-7">
              <li>
                <strong>Ясность.</strong> Когда ты говоришь прямо, без намёков и недосказанностей. Это не грубость — это забота о себе и другом.
              </li>
              <li>
                <strong>Ответственность.</strong> Я сообщаю о своих чувствах и потребностях — и не перекладываю их на собеседника. Например: <br />
                ✖️ «Ты меня игнорируешь» <br />
                ✔️ «Я чувствую себя невидимой, когда не получаю ответа»
              </li>
              <li>
                <strong>Эмпатия.</strong> Не соглашаться, но понимать. Видеть, что за реакцией стоит чувство.
              </li>
              <li>
                <strong>Внутреннее замедление.</strong> Иногда важно не ответить сразу. Остановиться. Осмыслить. Не бросать в лицо слова на эмоциях.
              </li>
              <li>
                <strong>Телесная включённость.</strong> Настоящий контакт — это не только речь. Это голос. Темп. Поза. Микропауза. Улыбка. Взгляд.
              </li>
            </ol>
            <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600">
              «Человеческое общение начинается не с ответа, а с присутствия»
            </blockquote>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Что говорит наука</h2>
            <ul className="list-disc pl-6 text-base leading-7">
              <li>
                По данным исследований Harvard Business Review, качество общения напрямую влияет на уровень удовлетворённости отношениями и снижает конфликты в парах и командах.
              </li>
              <li>
                Эмпатическое слушание снижает физиологические маркеры стресса у обоих участников диалога (Kross et al., 2014).
              </li>
              <li>
                Люди, умеющие выражать чувства словами, имеют более высокий уровень эмоциональной регуляции (Lieberman et al., 2007).
              </li>
            </ul>
          </section>

          <figure className="mb-6">
            <img src="/images/blog/blg008c.jpg" alt="Иллюстрация общения 2" className="w-full h-auto object-cover rounded-lg" />
          </figure>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Что можно начать делать уже сегодня</h2>
            <ul className="list-disc pl-6 text-base leading-7">
              <li>Замени реактивные фразы на описания своих чувств: вместо «ты всегда...» — «я замечаю, что...»</li>
              <li>Оцени не только смысл слов, но и тон, жесты, паузы. Что стоит за словами?</li>
              <li>Проверь: ты хочешь понять — или выиграть? Одно исключает другое.</li>
              <li>Не бойся тишины. В диалоге пауза — это не враг, а пространство.</li>
              <li>Задавай уточняющие вопросы. Иногда «расскажи больше» — это акт любви.</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Важное</h2>
            <p className="text-base leading-7">
              Общение — это не навык только для «говорящих профессий». Это основа связей. И когда ты учишься говорить ясно, мягко, с собой и другими — ты не просто «развиваешь навык». Ты строишь жизнь, в которой тебя слышат. И в которой ты не теряешь себя.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Источники</h2>
            <ol className="list-decimal pl-6 text-base leading-7">
              <li>
                Kross, E., et al. (2014). Self-talk as a regulatory mechanism. <i>Journal of Personality and Social Psychology</i>, 106(2), 304–324.{' '}
                <Link
                  href="https://doi.org/10.1037/a0035570"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  https://doi.org/10.1037/a0035570
                </Link>
              </li>
              <li>
                Lieberman, M. D., et al. (2007). Putting feelings into words: affect labeling disrupts amygdala activity. <i>Psychological Science</i>, 18(5), 421–428.{' '}
                <Link
                  href="https://doi.org/10.1111/j.1467-9280.2007.01916.x"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  https://doi.org/10.1111/j.1467-9280.2007.01916.x
                </Link>
              </li>
              <li>
                Groysberg, B., & Slind, M. (2012). <i>Talk Inc.: How Trusted Leaders Use Conversation to Power Their Organizations</i>. Harvard Business Review Press.{' '}
                <Link
                  href="https://hbr.org/product/talk-inc-how-trusted-leaders-use-conversation-to-power-their-organizations/11140"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  https://hbr.org/product/talk-inc-how-trusted-leaders-use-conversation-to-power-their-organizations/11140
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