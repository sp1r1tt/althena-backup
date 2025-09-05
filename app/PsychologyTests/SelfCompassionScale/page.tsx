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

export default function SelfCompassionScale() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [fadeIn, setFadeIn] = useState<boolean>(false);
  const [showShareOptions, setShowShareOptions] = useState<boolean>(false);
  const [answers, setAnswers] = useState<{ [key: string]: string | null }>({
    q1: null, q2: null, q3: null, q4: null, q5: null,
    q6: null, q7: null, q8: null, q9: null, q10: null,
    q11: null, q12: null, q13: null, q14: null, q15: null,
    q16: null, q17: null, q18: null, q19: null, q20: null,
    q21: null, q22: null, q23: null, q24: null, q25: null,
    q26: null,
  });
  const [result, setResult] = useState<Result | null>(null);

  const questions: Question[] = [
    {
      id: 'q1',
      text: 'Я стараюсь быть понимающим и терпеливым к тем аспектам моей личности, которые мне не нравятся.',
      options: [
        { value: '1', text: 'Почти никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Почти всегда' },
      ],
    },
    {
      id: 'q2',
      text: 'Когда со мной случается что-то болезненное, я пытаюсь взглянуть на ситуацию сбалансированно.',
      options: [
        { value: '1', text: 'Почти никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Почти всегда' },
      ],
    },
    {
      id: 'q3',
      text: 'Когда я терплю неудачу, я склонен переоценивать ее масштаб (делаю из мухи слона).',
      options: [
        { value: '1', text: 'Почти никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Почти всегда' },
      ],
    },
    {
      id: 'q4',
      text: 'Я стараюсь относиться к себе с добротой, когда переживаю эмоциональную боль.',
      options: [
        { value: '1', text: 'Почти никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Почти всегда' },
      ],
    },
    {
      id: 'q5',
      text: 'Когда я переживаю трудный период, я даю себе заботу и поддержку, в которой нуждаюсь.',
      options: [
        { value: '1', text: 'Почти никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Почти всегда' },
      ],
    },
    {
      id: 'q6',
      text: 'Когда я чувствую себя неадекватно, я напоминаю себе, что большинство людей иногда чувствуют то же самое.',
      options: [
        { value: '1', text: 'Почти никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Почти всегда' },
      ],
    },
    {
      id: 'q7',
      text: 'Я очень нетерпим к своим недостаткам.',
      options: [
        { value: '1', text: 'Почти никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Почти всегда' },
      ],
    },
    {
      id: 'q8',
      text: 'Когда я чувствую себя подавленным, я склонен зацикливаться на всем, что идет не так.',
      options: [
        { value: '1', text: 'Почти никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Почти всегда' },
      ],
    },
    {
      id: 'q9',
      text: 'Когда я терплю неудачу, я чувствую, что я единственный, кто сталкивается с такими проблемами.',
      options: [
        { value: '1', text: 'Почти никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Почти всегда' },
      ],
    },
    {
      id: 'q10',
      text: 'Я стараюсь осознавать свои эмоции, не позволяя им захлестнуть меня.',
      options: [
        { value: '1', text: 'Почти никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Почти всегда' },
      ],
    },
    {
      id: 'q11',
      text: 'Когда я чувствую себя грустно, я часто изолируюсь от других.',
      options: [
        { value: '1', text: 'Почти никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Почти всегда' },
      ],
    },
    {
      id: 'q12',
      text: 'Я считаю, что трудности – это часть жизни, с которой сталкиваются все.',
      options: [
        { value: '1', text: 'Почти никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Почти всегда' },
      ],
    },
    {
      id: 'q13',
      text: 'Когда я расстроен, я часто виню себя за свои ошибки.',
      options: [
        { value: '1', text: 'Почти никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Почти всегда' },
      ],
    },
    {
      id: 'q14',
      text: 'Я стараюсь относиться к своим трудностям с пониманием, как если бы это были трудности друга.',
      options: [
        { value: '1', text: 'Почти никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Почти всегда' },
      ],
    },
    {
      id: 'q15',
      text: 'Когда я переживаю трудный период, я склонен преувеличивать его влияние на мою жизнь.',
      options: [
        { value: '1', text: 'Почти никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Почти всегда' },
      ],
    },
    {
      id: 'q16',
      text: 'Я стараюсь сохранять баланс между своими эмоциями, даже когда мне тяжело.',
      options: [
        { value: '1', text: 'Почти никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Почти всегда' },
      ],
    },
    {
      id: 'q17',
      text: 'Когда я чувствую себя подавленным, я склонен думать, что это никогда не пройдет.',
      options: [
        { value: '1', text: 'Почти никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Почти всегда' },
      ],
    },
    {
      id: 'q18',
      text: 'Я часто чувствую себя оторванным от других, когда переживаю трудности.',
      options: [
        { value: '1', text: 'Почти никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Почти всегда' },
      ],
    },
    {
      id: 'q19',
      text: 'Я стараюсь относиться к своим проблемам с добротой и пониманием.',
      options: [
        { value: '1', text: 'Почти никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Почти всегда' },
      ],
    },
    {
      id: 'q20',
      text: 'Когда я расстроен, я часто сравниваю себя с другими.',
      options: [
        { value: '1', text: 'Почти никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Почти всегда' },
      ],
    },
    {
      id: 'q21',
      text: 'Я принимаю свои недостатки как часть человеческого опыта.',
      options: [
        { value: '1', text: 'Почти никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Почти всегда' },
      ],
    },
    {
      id: 'q22',
      text: 'Когда я чувствую себя плохо, я часто думаю, что другие справляются лучше меня.',
      options: [
        { value: '1', text: 'Почти никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Почти всегда' },
      ],
    },
    {
      id: 'q23',
      text: 'Я стараюсь замечать свои эмоции, не вовлекаясь в них чрезмерно.',
      options: [
        { value: '1', text: 'Почти никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Почти всегда' },
      ],
    },
    {
      id: 'q24',
      text: 'Когда я переживаю трудный период, я чувствую, что это моя вина.',
      options: [
        { value: '1', text: 'Почти никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Почти всегда' },
      ],
    },
    {
      id: 'q25',
      text: 'Я часто думаю, что мои проблемы уникальны и никто не может меня понять.',
      options: [
        { value: '1', text: 'Почти никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Почти всегда' },
      ],
    },
    {
      id: 'q26',
      text: 'Я стараюсь относиться к себе с той же добротой, с которой отношусь к другим.',
      options: [
        { value: '1', text: 'Почти никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Почти всегда' },
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
    const totalScore = Object.values(answers).reduce((sum, value) => sum + (parseInt(value) || 0), 0);
    let recommendation = {
      level: '',
      package: '',
      packageLink: '',
      description: '',
    };

    if (totalScore <= 65) {
      recommendation = {
        level: 'Низкий уровень самосострадания',
        package: 'Расширенный Пакет',
        packageLink: '/our-service',
        description: 'Твой уровень самосострадания может быть низким. Наш расширенный пакет предложит тебе более глубокую поддержку для развития доброты к себе.',
      };
    } else if (totalScore <= 91) {
      recommendation = {
        level: 'Средний уровень самосострадания',
        package: 'Базовый Пакет',
        packageLink: '/our-service',
        description: 'Твой уровень самосострадания находится на среднем уровне. Наш базовый пакет поможет тебе укрепить заботу о себе.',
      };
    } else {
      recommendation = {
        level: 'Высокий уровень самосострадания',
        package: 'Бесплатный Вводный Пакет',
        packageLink: '/free-package',
        description: 'У тебя высокий уровень самосострадания! Наш бесплатный вводный пакет поможет тебе поддерживать заботу о себе и достигать новых целей.',
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
      q16: null, q17: null, q18: null, q19: null, q20: null,
      q21: null, q22: null, q23: null, q24: null, q25: null,
      q26: null,
    });
    setResult(null);
    setShowShareOptions(false);
  };

  const toggleShareOptions = () => {
    setShowShareOptions(!showShareOptions);
  };

  const shareViaEmail = () => {
    if (!result) return;
    const subject = 'Мои результаты теста: Шкала Самосострадания, SCS';
    const body = `Твой балл: ${result.score} из 130\nУровень: ${result.recommendation.level}\nРекомендация: ${result.recommendation.description}\nПредлагаемый пакет: ${result.recommendation.package}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const shareViaWhatsApp = () => {
    if (!result) return;
    const text = `Мои результаты теста: Шкала Самосострадания, SCS\nТвой балл: ${result.score} из 130\nУровень: ${result.recommendation.level}\nРекомендация: ${result.recommendation.description}\nПредлагаемый пакет: ${result.recommendation.package}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const printResult = () => {
    if (!result) return;
    const printContent = `
      <h3 class="text-xl font-playfair text-[#143B64] mb-4">Результаты теста: Шкала Самосострадания, SCS</h3>
      <p class="text-base text-[#2F4C66] mb-2"><strong>Твой балл:</strong> ${result.score} из 130</p>
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
              Шкала Самосострадания, SCS
            </h3>
            <p className="text-sm text-gray-600 mb-4 font-playfair">
              онлайн-тест | 26 пунктов | около 5 минут
            </p>
            <p className="text-base md:text-lg text-[#2F4C66] font-playfair leading-relaxed mb-4">
              Шкала самосострадания — валидированная методика, разработанная психологом Кристин Нефф, которая оценивает, как ты относишься к себе в трудные моменты. Исследования показывают, что высокий уровень самосострадания связан с улучшением психоэмоционального состояния, снижением тревожности и депрессии, а также повышением устойчивости к стрессу. Пройди тест — и получи рекомендации, которые помогут укрепить твою внутреннюю опору и благополучие.
            </p>
            <div className="bg-[#f2f1f0] p-6 rounded-lg min-h-[350px] overflow-auto">
              {result ? (
                <div>
                  <p className="text-lg font-playfair text-[#dbad9a] mb-2"><strong>Твой балл:</strong></p>
                  <div className="relative w-full h-6 bg-gray-200 rounded-full mb-2">
                    <div
                      className="absolute top-0 left-0 h-full rounded-full"
                      style={{
                        width: `${((result.score - 26) / 104) * 100}%`,
                        backgroundColor: result.score <= 65 ? '#ff4d4d' : result.score <= 91 ? '#ffd700' : '#32cd32',
                      }}
                    ></div>
                    <span
                      className="absolute top-1/2 transform -translate-y-1/2 text-sm font-playfair text-[#143B64]"
                      style={{ left: `${((result.score - 26) / 104) * 100}%`, transform: 'translateX(-50%)' }}
                    >
                      {result.score}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <span>26</span>
                    <span>130</span>
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
                <strong>Автор:</strong> Kristin Neff (2003)
              </p>
              <p className="text-sm mb-2">
                Тест предоставляется исключительно в образовательных и развлекательных целях. Он не предназначен для психологических консультаций любого рода и не гарантирует точности или достоверности. Оценка бесплатна и анонимна. Вы можете сохранить прямую ссылку на свои результаты.
              </p>
              <p className="text-sm">
                <strong>Ссылки:</strong><br />
                <Link
                  href="https://self-compassion.org/the-self-compassion-scale/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8EB5BA] hover:underline"
                >
                  Neff, K. D. (2003). The Development and Validation of a Scale to Measure Self-Compassion. Self and Identity, 2(3), 223-250.
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