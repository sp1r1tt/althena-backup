"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ProfileHeader from '@/components/ProfileHeader';

// Define interfaces for question and result
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

export default function RosenbergSelfEsteemScale() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [fadeIn, setFadeIn] = useState<boolean>(false);
  const [showShareOptions, setShowShareOptions] = useState<boolean>(false);
  const [answers, setAnswers] = useState<{ [key: string]: string | null }>({
    q1: null,
    q2: null,
    q3: null,
    q4: null,
    q5: null,
    q6: null,
    q7: null,
    q8: null,
    q9: null,
    q10: null,
  });
  const [result, setResult] = useState<Result | null>(null);

  const questions: Question[] = [
    {
      id: 'q1',
      text: 'Я чувствую, что я человек, достойный уважения, по крайней мере, не меньше, чем другие.',
      options: [
        { value: '3', text: 'Совершенно согласен' },
        { value: '2', text: 'Согласен' },
        { value: '1', text: 'Несогласен' },
        { value: '0', text: 'Совершенно не согласен' },
      ],
    },
    {
      id: 'q2',
      text: 'Я чувствую, что у меня есть ряд хороших качеств.',
      options: [
        { value: '3', text: 'Совершенно согласен' },
        { value: '2', text: 'Согласен' },
        { value: '1', text: 'Несогласен' },
        { value: '0', text: 'Совершенно не согласен' },
      ],
    },
    {
      id: 'q3',
      text: 'В целом, я склонен думать, что я неудачник.',
      options: [
        { value: '0', text: 'Совершенно согласен' },
        { value: '1', text: 'Согласен' },
        { value: '2', text: 'Несогласен' },
        { value: '3', text: 'Совершенно не согласен' },
      ],
    },
    {
      id: 'q4',
      text: 'Я способен делать вещи так же хорошо, как и большинство других людей.',
      options: [
        { value: '3', text: 'Совершенно согласен' },
        { value: '2', text: 'Согласен' },
        { value: '1', text: 'Несогласен' },
        { value: '0', text: 'Совершенно не согласен' },
      ],
    },
    {
      id: 'q5',
      text: 'Я чувствую, что у меня не так много поводов для гордости.',
      options: [
        { value: '0', text: 'Совершенно согласен' },
        { value: '1', text: 'Согласен' },
        { value: '2', text: 'Несогласен' },
        { value: '3', text: 'Совершенно не согласен' },
      ],
    },
    {
      id: 'q6',
      text: 'У меня позитивное отношение к себе.',
      options: [
        { value: '3', text: 'Совершенно согласен' },
        { value: '2', text: 'Согласен' },
        { value: '1', text: 'Несогласен' },
        { value: '0', text: 'Совершенно не согласен' },
      ],
    },
    {
      id: 'q7',
      text: 'В целом, я доволен собой.',
      options: [
        { value: '3', text: 'Совершенно согласен' },
        { value: '2', text: 'Согласен' },
        { value: '1', text: 'Несогласен' },
        { value: '0', text: 'Совершенно не согласен' },
      ],
    },
    {
      id: 'q8',
      text: 'Я хотел бы больше уважать себя.',
      options: [
        { value: '0', text: 'Совершенно согласен' },
        { value: '1', text: 'Согласен' },
        { value: '2', text: 'Несогласен' },
        { value: '3', text: 'Совершенно не согласен' },
      ],
    },
    {
      id: 'q9',
      text: 'Иногда я чувствую себя бесполезным.',
      options: [
        { value: '0', text: 'Совершенно согласен' },
        { value: '1', text: 'Согласен' },
        { value: '2', text: 'Несогласен' },
        { value: '3', text: 'Совершенно не согласен' },
      ],
    },
    {
      id: 'q10',
      text: 'Иногда я думаю, что я ни на что не годен.',
      options: [
        { value: '0', text: 'Совершенно согласен' },
        { value: '1', text: 'Согласен' },
        { value: '2', text: 'Несогласен' },
        { value: '3', text: 'Совершенно не согласен' },
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
    let recommendation = {
      level: '',
      package: '',
      packageLink: '',
      description: '',
    };

    if (totalScore <= 14) {
      recommendation = {
        level: 'Низкая самооценка',
        package: 'Расширенный Пакет',
        packageLink: '/our-service',
        description: 'Твоя самооценка может быть низкой. Наш расширенный пакет предложит тебе более глубокую поддержку для повышения уверенности в себе.',
      };
    } else if (totalScore <= 24) {
      recommendation = {
        level: 'Средняя самооценка',
        package: 'Базовый Пакет',
        packageLink: '/our-service',
        description: 'Твоя самооценка находится на среднем уровне. Наш базовый пакет поможет тебе укрепить чувство собственного достоинства.',
      };
    } else {
      recommendation = {
        level: 'Высокая самооценка',
        package: 'Бесплатный Вводный Пакет',
        packageLink: '/free-package',
        description: 'У тебя высокая самооценка! Наш бесплатный вводный пакет поможет тебе поддерживать уверенность в себе и достигать новых целей.',
      };
    }

    setResult({ score: totalScore, recommendation });
  };

  const closeTest = () => {
    setCurrentQuestionIndex(0);
    setAnswers({
      q1: null,
      q2: null,
      q3: null,
      q4: null,
      q5: null,
      q6: null,
      q7: null,
      q8: null,
      q9: null,
      q10: null,
    });
    setResult(null);
    setShowShareOptions(false);
  };

  const toggleShareOptions = () => {
    setShowShareOptions(!showShareOptions);
  };

  const shareViaEmail = () => {
    if (!result) return;
    const subject = 'Мои результаты теста: Шкала самооценки Розенберга, RSES';
    const body = `Твой балл: ${result.score} из 30\nУровень: ${result.recommendation.level}\nРекомендация: ${result.recommendation.description}\nПредлагаемый пакет: ${result.recommendation.package}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const shareViaWhatsApp = () => {
    if (!result) return;
    const text = `Мои результаты теста: Шкала самооценки Розенберга, RSES\nТвой балл: ${result.score} из 30\nУровень: ${result.recommendation.level}\nРекомендация: ${result.recommendation.description}\nПредлагаемый пакет: ${result.recommendation.package}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const printResult = () => {
    if (!result) return;
    const printContent = `
      <h3 class="text-xl font-playfair text-[#143B64] mb-4">Результаты теста: Шкала самооценки Розенберга, RSES</h3>
      <p class="text-base text-[#2F4C66] mb-2"><strong>Твой балл:</strong> ${result.score} из 30</p>
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

      {/* Main content */}
      <div
        className="max-w-[1120px] mx-auto px-4 py-8"
        style={{ marginTop: isMenuOpen ? '288px' : '96px' }}
      >
        <div className="mb-6">
          <div>
            <h3 className="text-3xl md:text-4xl font-playfair text-[#143B64] mb-2">
              Шкала самооценки Розенберга, RSES
            </h3>
            <p className="text-sm text-gray-600 mb-4 font-playfair">
              онлайн-тест | 10 пунктов | около 3 минут
            </p>
            <p className="text-base md:text-lg text-[#2F4C66] font-playfair leading-relaxed mb-4">
              Насколько ты уверен(а) в себе — и как это влияет на твои решения, отношения и эмоциональное состояние? Шкала самооценки Розенберга — один из самых широко используемых и валидированных психологических тестов в мире. Она оценивает общее чувство собственного достоинства и отношение человека к самому себе. Самооценка влияет на всё: от выбора партнёра и карьерных шагов до способности справляться с критикой и стрессом. Пройди тест — и получи релевантные рекомендации, с чего начать укрепление своей самооценки и внутренней опоры.
            </p>
            <div className="bg-[#f2f1f0] p-6 rounded-lg min-h-[350px] overflow-auto">
              {result ? (
                <div>
                  <p className="text-lg font-playfair text-[#dbad9a] mb-2"><strong>Твой балл:</strong></p>
                  <div className="relative w-full h-6 bg-gray-200 rounded-full mb-2">
                    <div
                      className="absolute top-0 left-0 h-full rounded-full"
                      style={{
                        width: `${(result.score / 30) * 100}%`,
                        backgroundColor: result.score <= 14 ? '#ff4d4d' : result.score <= 24 ? '#ffd700' : '#32cd32',
                      }}
                    ></div>
                    <span
                      className="absolute top-1/2 transform -translate-y-1/2 text-sm font-playfair text-[#143B64]"
                      style={{ left: `${(result.score / 30) * 100}%`, transform: 'translateX(-50%)' }}
                    >
                      {result.score}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <span>0</span>
                    <span>30</span>
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
                <strong>Автор:</strong> M. Rosenberg (1965)
              </p>
              <p className="text-sm mb-2">
                Тест предоставляется исключительно в образовательных и развлекательных целях. Он не предназначен для психологических консультаций любого рода и не гарантирует точности или достоверности. Оценка бесплатна и анонимна. Вы можете сохранить прямую ссылку на свои результаты.
              </p>
              <p className="text-sm">
                <strong>Ссылки:</strong><br />
                <Link
                  href="https://en.wikipedia.org/wiki/Rosenberg_self-esteem_scale"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8EB5BA] hover:underline"
                >
                  Rosenberg Self-Esteem Scale // University of Maryland<br />
                  Morris Rosenberg. Society and the adolescent self-image. NJ: Princeton University Press, 1965.
                </Link>
              </p>
            </div>
          </div>
          <footer className="mt-6">
            <Link
              href="/self-knowledge-space"
              className="text-[#cc9a85] font-playfair hover:underline"
            >
              Возвращение в Пространство самопознания и внутреннего развития
            </Link>
          </footer>
        </div>
      </div>
    </div>
  );
}