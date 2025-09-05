"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ProfileHeader from '@/components/ProfileHeader';

// Ορισμός interfaces για ερωτήσεις, επιλογές και αποτελέσματα
interface Option {
  value: string;
  text: string;
}

interface Question {
  id: string;
  text: string;
  options: Option[];
}

interface Result {
  score: number;
  recommendation: {
    level: string;
    package: string;
    packageLink: string;
    description: string;
  };
}

export default function MaritalSatisfactionAssessment() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [fadeIn, setFadeIn] = useState<boolean>(false);
  const [showShareOptions, setShowShareOptions] = useState<boolean>(false);
  const [answers, setAnswers] = useState<{ [key: string]: string | null }>({
    q1: null, q2: null, q3: null, q4: null, q5: null,
    q6: null, q7: null, q8: null, q9: null, q10: null,
    q11: null, q12: null, q13: null, q14: null, q15: null,
  });
  const [result, setResult] = useState<Result | null>(null);

  const questions: Question[] = [
    {
      id: 'q1',
      text: 'Я чувствую, что мой партнер понимает мои эмоции и чувства.',
      options: [
        { value: '1', text: 'Никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Всегда' },
      ],
    },
    {
      id: 'q2',
      text: 'Мы с партнером открыто обсуждаем наши проблемы и разногласия.',
      options: [
        { value: '1', text: 'Никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Всегда' },
      ],
    },
    {
      id: 'q3',
      text: 'Я доволен тем, как мы делим домашние обязанности.',
      options: [
        { value: '1', text: 'Никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Всегда' },
      ],
    },
    {
      id: 'q4',
      text: 'Я чувствую эмоциональную близость с моим партнером.',
      options: [
        { value: '1', text: 'Никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Всегда' },
      ],
    },
    {
      id: 'q5',
      text: 'Мы с партнером проводим достаточно времени вместе.',
      options: [
        { value: '1', text: 'Никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Всегда' },
      ],
    },
    {
      id: 'q6',
      text: 'Я чувствую, что мой партнер поддерживает мои цели и мечты.',
      options: [
        { value: '1', text: 'Никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Всегда' },
      ],
    },
    {
      id: 'q7',
      text: 'Мы с партнером часто ссоримся из-за мелочей.',
      options: [
        { value: '5', text: 'Никогда' },
        { value: '4', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '2', text: 'Часто' },
        { value: '1', text: 'Всегда' },
      ],
    },
    {
      id: 'q8',
      text: 'Я чувствую, что мой партнер ценит меня как личность.',
      options: [
        { value: '1', text: 'Никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Всегда' },
      ],
    },
    {
      id: 'q9',
      text: 'Мы с партнером имеем общие интересы и хобби.',
      options: [
        { value: '1', text: 'Никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Всегда' },
      ],
    },
    {
      id: 'q10',
      text: 'Я часто чувствую раздражение по отношению к партнеру.',
      options: [
        { value: '5', text: 'Никогда' },
        { value: '4', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '2', text: 'Часто' },
        { value: '1', text: 'Всегда' },
      ],
    },
    {
      id: 'q11',
      text: 'Я доволен нашей сексуальной жизнью.',
      options: [
        { value: '1', text: 'Никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Всегда' },
      ],
    },
    {
      id: 'q12',
      text: 'Я чувствую, что мы с партнером доверяем друг другу.',
      options: [
        { value: '1', text: 'Никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Всегда' },
      ],
    },
    {
      id: 'q13',
      text: 'Я чувствую себя одиноким в нашем браке.',
      options: [
        { value: '5', text: 'Никогда' },
        { value: '4', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '2', text: 'Часто' },
        { value: '1', text: 'Всегда' },
      ],
    },
    {
      id: 'q14',
      text: 'Мы с партнером уважаем личное пространство друг друга.',
      options: [
        { value: '1', text: 'Никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Всегда' },
      ],
    },
    {
      id: 'q15',
      text: 'Я верю, что наш брак может преодолеть любые трудности.',
      options: [
        { value: '1', text: 'Никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Всегда' },
      ],
    },
  ];

  useEffect(() => {
    setFadeIn(false);
    setTimeout(() => setFadeIn(true), 0);
  }, [currentQuestionIndex]);

  const handleAnswerChange = (questionId: string, value: string) => {
    if (answers[questionId] !== value) {
      setAnswers(prev => ({
        ...prev,
        [questionId]: value,
      }));
    }
  };

  const handleNextQuestion = () => {
    if (answers[questions[currentQuestionIndex].id] !== null && currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const calculateResult = () => {
    const totalScore = Object.values(answers).reduce((sum, value) => sum + (parseInt(value || '0')), 0);
    let recommendation;

    if (totalScore <= 30) {
      recommendation = {
        level: 'Низкий уровень удовлетворенности браком',
        package: 'Расширенный Пакет',
        packageLink: '/our-service',
        description: 'Твой уровень удовлетворенности браком может быть низким. Наш расширенный пакет поможет вам с партнером укрепить отношения.',
      };
    } else if (totalScore <= 45) {
      recommendation = {
        level: 'Средний уровень удовлетворенности браком',
        package: 'Базовый Пакет',
        packageLink: '/our-service',
        description: 'Твой уровень удовлетворенности браком находится на среднем уровне. Наш базовый пакет поможет вам улучшить взаимопонимание.',
      };
    } else {
      recommendation = {
        level: 'Высокий уровень удовлетворенности браком',
        package: 'Бесплатный Вводный Пакет',
        packageLink: '/free-package',
        description: 'У тебя высокий уровень удовлетворенности браком! Наш бесплатный вводный пакет поможет вам поддерживать гармонию в отношениях.',
      };
    }

    setResult({ score: totalScore, recommendation });
  };

  const closeTest = () => {
    setCurrentQuestionIndex(0);
    setAnswers({
      q1: null, q2: null, q3: null, q4: null, q5: null,
      q6: null, q7: null, q8: null, q9: null, q10: null,
      q11: null, q12: null, q13: null, q14: null, q15: null,
    });
    setResult(null);
    setShowShareOptions(false);
  };

  const toggleShareOptions = () => {
    setShowShareOptions(!showShareOptions);
  };

  const shareViaEmail = () => {
    if (!result) return;
    const subject = 'Мои результаты теста: Оценка удовлетворенности браком, MSA';
    const body = `Твой балл: ${result.score} из 75\nУровень: ${result.recommendation.level}\nРекомендация: ${result.recommendation.description}\nПредлагаемый пакет: ${result.recommendation.package}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const shareViaWhatsApp = () => {
    if (!result) return;
    const text = `Мои результаты теста: Оценка удовлетворенности браком, MSA\nТвой балл: ${result.score} из 75\nУровень: ${result.recommendation.level}\nРекомендация: ${result.recommendation.description}\nПредлагаемый пакет: ${result.recommendation.package}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const printResult = () => {
    if (!result) return;
    const printContent = `
      <h3 class="text-xl font-playfair text-[#143B64] mb-4">Результаты теста: Оценка удовлетворенности браком, MSA</h3>
      <p class="text-base text-[#2F4C66] mb-2"><strong>Твой балл:</strong> ${result.score} из 75</p>
      <p class="text-base text-[#2F4C66] mb-2"><strong>Уровень:</strong> ${result.recommendation.level}</p>
      <p class="text-base text-[#2F4C66] mb-2"><strong>Рекомендация:</strong> ${result.recommendation.description}</p>
      <p class="text-base text-[#2F4C66] mb-2"><strong>Предлагаемый пакет:</strong> ${result.recommendation.package}</p>
    `;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Результаты теста</title>
          <style>
            body { font-family: 'Playfair Display', serif; text-align: left; padding: 20px; }
          </style>
        </head>
        <body>
          ${printContent}
          <script>window.print(); window.close();</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const allQuestionsAnswered = Object.values(answers).every(answer => answer !== null);

  return (
    <div className="w-full min-h-screen bg-[#f2f1f0]">
      {/* ProfileHeader */}
      <div className="fixed top-0 left-0 right-0 z-20">
        <ProfileHeader setMenuOpen={setIsMenuOpen} />
      </div>

      {/* Основной контент */}
      <div
        className="max-w-[1120px] mx-auto px-4 py-8"
        style={{ marginTop: isMenuOpen ? '288px' : '96px' }}
      >
        <div className="mb-6">
          <div>
            <h3 className="text-3xl md:text-4xl font-playfair text-[#143B64] mb-2">
              Оценка удовлетворенности браком, MSA
            </h3>
            <p className="text-sm text-gray-600 mb-4 font-playfair">
              онлайн-тест | 15 пунктов | около 3 минут
            </p>
            <p className="text-base md:text-lg text-[#2F4C66] font-playfair leading-relaxed mb-4">
              Онлайн-версия теста на удовлетворенность браком (MSA) помогает оценить уровень гармонии и взаимопонимания в отношениях. Пройди тест, чтобы понять, насколько ты удовлетворен своим браком, и получи рекомендации для укрепления ваших отношений.
            </p>
            <div className="bg-[#f2f1f0] p-6 rounded-lg min-h-[350px] overflow-auto">
              {result ? (
                <div>
                  <p className="text-lg font-playfair text-[#dbad9a] mb-2"><strong>Твой балл:</strong></p>
                  <div className="relative w-full h-6 bg-gray-200 rounded-full mb-2">
                    <div
                      className="absolute top-0 left-0 h-full rounded-full"
                      style={{
                        width: `${((result.score - 15) / 60) * 100}%`,
                        backgroundColor: result.score <= 30 ? '#9e4021' : result.score <= 45 ? '#e0be60' : '#558239',
                      }}
                    ></div>
                    <span
                      className="absolute top-1/2 transform -translate-y-1/2 text-sm font-playfair text-[#143B64]"
                      style={{ left: `${((result.score - 15) / 60) * 100}%`, transform: 'translateX(-50%)' }}
                    >
                      {result.score}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <span>15</span>
                    <span>75</span>
                  </div>
                  <p className="text-lg font-playfair text-[#143B64] mt-4"><strong>Уровень:</strong> {result.recommendation.level}</p>
                  <p className="text-base text-[#2F4C66] font-playfair mt-2"><strong>Рекомендация:</strong> {result.recommendation.description}</p>
                  <p className="text-base text-[#2F4C66] font-playfair">
                    <strong>Предлагаемый пакет:</strong>{' '}
                    <Link href={result.recommendation.packageLink} className="text-[#8EB5BA] hover:underline">
                      {result.recommendation.package}
                    </Link>
                  </p>
                  <div className="flex items-center justify-between mt-6">
                    <button
                      onClick={closeTest}
                      className="px-4 py-2 bg-[#8EB5BA] text-white rounded-[30px] font-playfair transition-colors duration-300 hover:bg-[#edbfab] hover:text-[#143B64]"
                    >
                      Закрыть тест
                    </button>
                    <div className="relative">
                      <button
                        onClick={toggleShareOptions}
                        className="text-[#143B64] font-playfair hover:text-[#8EB5BA] transition-colors duration-300"
                        title="Поделиться результатами"
                      >
                        Поделиться
                      </button>
                      {showShareOptions && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                          <button
                            onClick={shareViaEmail}
                            className="block w-full text-left px-4 py-2 text-sm text-[#2F4C66] font-playfair hover:bg-gray-100"
                          >
                            Email
                          </button>
                          <button
                            onClick={printResult}
                            className="block w-full text-left px-4 py-2 text-sm text-[#2F4C66] font-playfair hover:bg-gray-100"
                          >
                            Печать
                          </button>
                          <button
                            onClick={shareViaWhatsApp}
                            className="block w-full text-left px-4 py-2 text-sm text-[#2F4C66] font-playfair hover:bg-gray-100"
                          >
                            WhatsApp
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className={`transition-opacity duration-300 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
                  <h3 className="text-lg md:text-xl font-playfair font-bold text-[#143B64] mb-4">
                    {currentQuestionIndex + 1}. {questions[currentQuestionIndex].text}
                  </h3>
                  <div className="space-y-2">
                    {questions[currentQuestionIndex].options.map((option, optionIndex) => (
                      <label
                        key={optionIndex}
                        className="flex items-center cursor-pointer text-[#2F4C66] font-playfair text-base"
                      >
                        <input
                          type="radio"
                          name={questions[currentQuestionIndex].id}
                          value={option.value}
                          checked={answers[questions[currentQuestionIndex].id] === option.value}
                          onChange={() => handleAnswerChange(questions[currentQuestionIndex].id, option.value)}
                          className="mr-2 accent-[#8EB5BA]"
                        />
                        {option.text}
                      </label>
                    ))}
                  </div>
                  {currentQuestionIndex < questions.length - 1 ? (
                    <button
                      type="button"
                      onClick={handleNextQuestion}
                      disabled={answers[questions[currentQuestionIndex].id] === null}
                      className={`mt-4 px-4 py-2 rounded-[30px] font-playfair transition-colors duration-300 ${
                        answers[questions[currentQuestionIndex].id] === null
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-[#8EB5BA] text-white hover:bg-[#edbfab] hover:text-[#143B64]'
                      }`}
                    >
                      Следующий вопрос
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={calculateResult}
                      disabled={!allQuestionsAnswered}
                      className={`mt-4 px-4 py-2 rounded-[30px] font-playfair transition-colors duration-300 ${
                        !allQuestionsAnswered
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-[#8EB5BA] text-white hover:bg-[#edbfab] hover:text-[#143B64]'
                      }`}
                    >
                      Узнать результаты
                    </button>
                  )}
                </div>
              )}
            </div>
            <div className="mt-4 mb-6 relative w-full h-6 min-h-6 bg-gray-200 rounded">
              <div
                className="absolute top-0 left-0 h-full bg-[#8EB5BA] rounded transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
              <span
                className="absolute bottom-0 transform translateY(100%) mb-[-8px] text-sm font-playfair text-[#143B64] px-2 rounded"
                style={{ left: `${progress}%`, transform: 'translateX(-50%)' }}
              >
                {progress.toFixed(1)}%
              </span>
            </div>
            <div className="text-[#2F4C66] font-playfair">
              <p className="text-sm mb-2">
                <strong>Авторы:</strong> В. В. Сталин, Т. Л. Романова, Г. П. Бутенко
              </p>
              <p className="text-sm mb-2">
                Тест предоставляется исключительно в образовательных и развлекательных целях. Он не предназначен для психологических консультаций любого рода и не гарантирует точности или достоверности. Оценка бесплатна и анонимна. Вы можете сохранить прямую ссылку на свои результаты.
              </p>
              <p className="text-sm mb-2">
                <strong>Ссылки:</strong><br />
                <Link
                  href="https://stud.com.ua/46080/psihologiya/testopituvannik_zadovolenosti_shlyubom"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8EB5BA] hover:underline"
                >
                  Сталин В. В., Романова Т. Л., Бутенко Г. П. Тест-опросник удовлетворенности браком.
                </Link>
              </p>
              <p className="text-sm" style={{ marginTop: '25px' }}>
                <Link
                  href="/self-knowledge-space"
                  className="return-link text-[#cc9a85] hover:underline"
                  style={{ color: '#cc9a85 !important' }}
                >
                  Возвращение в Пространство самопознания и внутреннего развития
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}