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
  subscale: string;
}

interface Result {
  score: number;
  recommendation: {
    level: string;
    package: string;
    packageLink: string;
    description: string;
  };
  scores: {
    SelfFocus: number;
    SymptomFocus: number;
    CausesConsequences: number;
  };
}

export default function RRS() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [fadeIn, setFadeIn] = useState<boolean>(false);
  const [showShareOptions, setShowShareOptions] = useState<boolean>(false);
  const [answers, setAnswers] = useState<{ [key: string]: string | null }>({
    q1: null, q2: null, q3: null, q4: null, q5: null,
    q6: null, q7: null, q8: null, q9: null, q10: null,
    q11: null, q12: null, q13: null, q14: null, q15: null,
    q16: null, q17: null, q18: null, q19: null, q20: null,
    q21: null, q22: null,
  });
  const [result, setResult] = useState<Result | null>(null);

  const questions: Question[] = [
    // Self-focused rumination (Αυτο-εστίαση)
    {
      id: 'q1',
      text: 'Я часто думаю о том, почему я чувствую себя так, как чувствую.',
      options: [
        { value: '1', text: 'Почти никогда' },
        { value: '2', text: 'Иногда' },
        { value: '3', text: 'Часто' },
        { value: '4', text: 'Почти всегда' },
      ],
      subscale: 'SelfFocus',
    },
    {
      id: 'q2',
      text: 'Я размышляю о том, почему я не могу справиться с ситуацией лучше.',
      options: [
        { value: '1', text: 'Почти никогда' },
        { value: '2', text: 'Иногда' },
        { value: '3', text: 'Часто' },
        { value: '4', text: 'Почти всегда' },
      ],
      subscale: 'SelfFocus',
    },
    {
      id: 'q3',
      text: 'Я думаю о том, что я мог бы сделать иначе в прошлом.',
      options: [
        { value: '1', text: 'Почти никогда' },
        { value: '2', text: 'Иногда' },
        { value: '3', text: 'Часто' },
        { value: '4', text: 'Почти всегда' },
      ],
      subscale: 'SelfFocus',
    },
    {
      id: 'q4',
      text: 'Я анализирую свои действия, чтобы понять, почему я сделал что-то не так.',
      options: [
        { value: '1', text: 'Почти никогда' },
        { value: '2', text: 'Иногда' },
        { value: '3', text: 'Часто' },
        { value: '4', text: 'Почти всегда' },
      ],
      subscale: 'SelfFocus',
    },
    // Symptom-focused rumination (Εστίαση στα συμπτώματα)
    {
      id: 'q5',
      text: 'Я думаю о том, насколько я чувствую себя грустно.',
      options: [
        { value: '1', text: 'Почти никогда' },
        { value: '2', text: 'Иногда' },
        { value: '3', text: 'Часто' },
        { value: '4', text: 'Почти всегда' },
      ],
      subscale: 'SymptomFocus',
    },
    {
      id: 'q6',
      text: 'Я сосредотачиваюсь на своих чувствах усталости или апатии.',
      options: [
        { value: '1', text: 'Почти никогда' },
        { value: '2', text: 'Иногда' },
        { value: '3', text: 'Часто' },
        { value: '4', text: 'Почти всегда' },
      ],
      subscale: 'SymptomFocus',
    },
    {
      id: 'q7',
      text: 'Я думаю о том, насколько мне не хватает энергии.',
      options: [
        { value: '1', text: 'Почти никогда' },
        { value: '2', text: 'Иногда' },
        { value: '3', text: 'Часто' },
        { value: '4', text: 'Почти всегда' },
      ],
      subscale: 'SymptomFocus',
    },
    {
      id: 'q8',
      text: 'Я размышляю о своей раздражительности или тревоге.',
      options: [
        { value: '1', text: 'Почти никогда' },
        { value: '2', text: 'Иногда' },
        { value: '3', text: 'Часто' },
        { value: '4', text: 'Почти всегда' },
      ],
      subscale: 'SymptomFocus',
    },
    // Causes/Consequences rumination (Εστίαση στις αιτίες/συνέπειες)
    {
      id: 'q9',
      text: 'Я думаю о том, почему у меня такие проблемы.',
      options: [
        { value: '1', text: 'Почти никогда' },
        { value: '2', text: 'Иногда' },
        { value: '3', text: 'Часто' },
        { value: '4', text: 'Почти всегда' },
      ],
      subscale: 'CausesConsequences',
    },
    {
      id: 'q10',
      text: 'Я размышляю о том, что могло бы случиться, если бы я поступил иначе.',
      options: [
        { value: '1', text: 'Почти никогда' },
        { value: '2', text: 'Иногда' },
        { value: '3', text: 'Часто' },
        { value: '4', text: 'Почти всегда' },
      ],
      subscale: 'CausesConsequences',
    },
    {
      id: 'q11',
      text: 'Я думаю о том, как мои действия привели к текущей ситуации.',
      options: [
        { value: '1', text: 'Почти никогда' },
        { value: '2', text: 'Иногда' },
        { value: '3', text: 'Часто' },
        { value: '4', text: 'Почти всегда' },
      ],
      subscale: 'CausesConsequences',
    },
    {
      id: 'q12',
      text: 'Я анализирую, что пошло не так в моей жизни.',
      options: [
        { value: '1', text: 'Почти никогда' },
        { value: '2', text: 'Иногда' },
        { value: '3', text: 'Часто' },
        { value: '4', text: 'Почти всегда' },
      ],
      subscale: 'CausesConsequences',
    },
    // Mixed Items (για καλύτερη κάλυψη)
    {
      id: 'q13',
      text: 'Я думаю о своих недостатках.',
      options: [
        { value: '1', text: 'Почти никогда' },
        { value: '2', text: 'Иногда' },
        { value: '3', text: 'Часто' },
        { value: '4', text: 'Почти всегда' },
      ],
      subscale: 'SelfFocus',
    },
    {
      id: 'q14',
      text: 'Я сосредотачиваюсь на том, что мне следовало бы сделать.',
      options: [
        { value: '1', text: 'Почти никогда' },
        { value: '2', text: 'Иногда' },
        { value: '3', text: 'Часто' },
        { value: '4', text: 'Почти всегда' },
      ],
      subscale: 'SelfFocus',
    },
    {
      id: 'q15',
      text: 'Я думаю о том, как мне одиноко.',
      options: [
        { value: '1', text: 'Почти никогда' },
        { value: '2', text: 'Иногда' },
        { value: '3', text: 'Часто' },
        { value: '4', text: 'Почти всегда' },
      ],
      subscale: 'SymptomFocus',
    },
    {
      id: 'q16',
      text: 'Я размышляю о своей неспособности сосредоточиться.',
      options: [
        { value: '1', text: 'Почти никогда' },
        { value: '2', text: 'Иногда' },
        { value: '3', text: 'Часто' },
        { value: '4', text: 'Почти всегда' },
      ],
      subscale: 'SymptomFocus',
    },
    {
      id: 'q17',
      text: 'Я думаю о том, почему я всегда реагирую таким образом.',
      options: [
        { value: '1', text: 'Почти никогда' },
        { value: '2', text: 'Иногда' },
        { value: '3', text: 'Часто' },
        { value: '4', text: 'Почти всегда' },
      ],
      subscale: 'CausesConsequences',
    },
    {
      id: 'q18',
      text: 'Я размышляю о том, как мои действия повлияли на других.',
      options: [
        { value: '1', text: 'Почти никогда' },
        { value: '2', text: 'Иногда' },
        { value: '3', text: 'Часто' },
        { value: '4', text: 'Почти всегда' },
      ],
      subscale: 'CausesConsequences',
    },
    {
      id: 'q19',
      text: 'Я часто возвращаюсь мыслями к прошлым ошибкам.',
      options: [
        { value: '1', text: 'Почти никогда' },
        { value: '2', text: 'Иногда' },
        { value: '3', text: 'Часто' },
        { value: '4', text: 'Почти всегда' },
      ],
      subscale: 'SelfFocus',
    },
    {
      id: 'q20',
      text: 'Я думаю о том, насколько я подавлен.',
      options: [
        { value: '1', text: 'Почти никогда' },
        { value: '2', text: 'Иногда' },
        { value: '3', text: 'Часто' },
        { value: '4', text: 'Почти всегда' },
      ],
      subscale: 'SymptomFocus',
    },
    {
      id: 'q21',
      text: 'Я размышляю о том, почему я не могу начать действовать.',
      options: [
        { value: '1', text: 'Почти никогда' },
        { value: '2', text: 'Иногда' },
        { value: '3', text: 'Часто' },
        { value: '4', text: 'Почти всегда' },
      ],
      subscale: 'CausesConsequences',
    },
    {
      id: 'q22',
      text: 'Я думаю о том, как мои чувства влияют на мою жизнь.',
      options: [
        { value: '1', text: 'Почти никогда' },
        { value: '2', text: 'Иногда' },
        { value: '3', text: 'Часто' },
        { value: '4', text: 'Почти всегда' },
      ],
      subscale: 'CausesConsequences',
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
    // Υπολογισμός σκορ για κάθε υπο-διάσταση
    const scores = {
      SelfFocus: 0,
      SymptomFocus: 0,
      CausesConsequences: 0,
    };

    // Συγκέντρωση σκορ ανά υπο-διάσταση
    questions.forEach(question => {
      const answerValue = answers[question.id];
      if (answerValue) {
        scores[question.subscale] += parseInt(answerValue);
      }
    });

    // Υπολογισμός συνολικού σκορ
    const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);

    // Καθορισμός συστάσεων με βάση το συνολικό σκορ
    let recommendation = {
      level: '',
      package: '',
      packageLink: '',
      description: '',
    };

    if (totalScore <= 44) { // 1-2 μέσος όρος (22 ερωτήσεις x 2)
      recommendation = {
        level: 'Низкий уровень руминации',
        package: 'Бесплатный Вводный Пакет',
        packageLink: '/free-package',
        description: 'У тебя низкий уровень руминации. Наш бесплатный вводный пакет поможет тебе поддерживать здоровые способы справляться с эмоциями.',
      };
    } else if (totalScore <= 66) { // 2-3 μέσος όρος (22 ερωτήσεις x 3)
      recommendation = {
        level: 'Средний уровень руминации',
        package: 'Базовый Пакет',
        packageLink: '/our-service',
        description: 'У тебя средний уровень руминации. Наш базовый пакет поможет тебе уменьшить повторяющиеся негативные мысли.',
      };
    } else { // 3-4 μέσος όρος (22 ερωτήσεις x 4 = 88)
      recommendation = {
        level: 'Высокий уровень руминации',
        package: 'Расширенный Пакет',
        packageLink: '/our-service',
        description: 'Твой уровень руминации высокий, что может влиять на твое эмоциональное состояние. Наш расширенный пакет поможет тебе справиться с этим.',
      };
    }

    setResult({
      score: totalScore,
      recommendation,
      scores: {
        SelfFocus: scores.SelfFocus,
        SymptomFocus: scores.SymptomFocus,
        CausesConsequences: scores.CausesConsequences,
      },
    });
  };

  const closeTest = () => {
    setCurrentQuestionIndex(0);
    setAnswers({
      q1: null, q2: null, q3: null, q4: null, q5: null,
      q6: null, q7: null, q8: null, q9: null, q10: null,
      q11: null, q12: null, q13: null, q14: null, q15: null,
      q16: null, q17: null, q18: null, q19: null, q20: null,
      q21: null, q22: null,
    });
    setResult(null);
    setShowShareOptions(false);
  };

  const toggleShareOptions = () => {
    setShowShareOptions(!showShareOptions);
  };

  const shareViaEmail = () => {
    if (!result) return;
    const subject = 'Мои результаты теста: Шкала руминативных реакций (RRS)';
    const body = `Твой балл: ${result.score} из 88\nУровень: ${result.recommendation.level}\nРекомендация: ${result.recommendation.description}\nПредлагаемый пакет: ${result.recommendation.package}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const shareViaWhatsApp = () => {
    if (!result) return;
    const text = `Мои результаты теста: Шкала руминативных реакций (RRS)\nТвой балл: ${result.score} из 88\nУровень: ${result.recommendation.level}\nРекомендация: ${result.recommendation.description}\nПредлагаемый пакет: ${result.recommendation.package}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const printResult = () => {
    if (!result) return;
    const printContent = `
      <h3 class="text-xl font-playfair text-[#143B64] mb-4">Результаты теста: Шкала руминативных реакций (RRS)</h3>
      <p class="text-base text-[#2F4C66] mb-2"><strong>Твой балл:</strong> ${result.score} из 88</p>
      <p class="text-base text-[#2F4C66] mb-2"><strong>Уровень:</strong> ${result.recommendation.level}</p>
      <p class="text-base text-[#2F4C66] mb-2"><strong>Само-фокусировка:</strong> ${result.scores.SelfFocus} из 28</p>
      <p class="text-base text-[#2F4C66] mb-2"><strong>Фокусировка на симптомах:</strong> ${result.scores.SymptomFocus} из 24</p>
      <p class="text-base text-[#2F4C66] mb-2"><strong>Фокусировка на причинах/последствиях:</strong> ${result.scores.CausesConsequences} из 36</p>
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
              Шкала руминативных реакций (RRS)
            </h3>
            <p className="text-sm text-gray-600 mb-4 font-playfair">
              онлайн-тест | 22 пункта | около 4 минут
            </p>
            <p className="text-base md:text-lg text-[#2F4C66] font-playfair leading-relaxed mb-4">
              Этот тест помогает выявить склонность к руминации — привычке застревать в негативных мыслях и переживаниях, которая усиливает стресс и повышает риск депрессии. Тест позволяет оценить, насколько часто ты возвращаешься к одним и тем же мыслям, пытаясь «пережёвывать» проблему, вместо того чтобы двигаться вперёд. Пройди тест — и получи рекомендации, которые помогут выйти из замкнутого круга мыслей и освободить ментальное пространство для жизни.
            </p>
            <div className="bg-[#f2f1f0] p-6 rounded-lg min-h-[350px] overflow-auto">
              {result ? (
                <div>
                  <p className="text-lg font-playfair text-[#dbad9a] mb-2"><strong>Твой балл:</strong></p>
                  <div className="relative w-full h-6 bg-gray-200 rounded-full mb-2">
                    <div
                      className="absolute top-0 left-0 h-full rounded-full"
                      style={{
                        width: `${((result.score - 22) / 66) * 100}%`,
                        backgroundColor: result.score <= 44 ? '#32cd32' : result.score <= 66 ? '#ffd700' : '#ff4d4d',
                      }}
                    ></div>
                    <span
                      className="absolute top-1/2 transform -translate-y-1/2 text-sm font-playfair text-[#143B64]"
                      style={{ left: `${((result.score - 22) / 66) * 100}%`, transform: 'translateX(-50%)' }}
                    >
                      {result.score}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <span>22</span>
                    <span>88</span>
                  </div>
                  <p className="text-lg font-playfair text-[#143B64] mb-2"><strong>Подшкалы:</strong></p>
                  <div className="space-y-4">
                    <div>
                      <span className="text-sm font-playfair text-[#2F4C66]">Само-фокусировка</span>
                      <div className="relative w-full h-4 bg-gray-200 rounded-full">
                        <div
                          className="absolute top-0 left-0 h-full rounded-full"
                          style={{
                            width: `${((result.scores.SelfFocus || 0) / 28) * 100}%`,
                            backgroundColor: '#21aabc',
                          }}
                        ></div>
                        <span className="absolute right-0 top-1/2 transform -translate-y-1/2 text-sm font-playfair text-[#2F4C66] pr-2">
                          {result.scores.SelfFocus || 0}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-playfair text-[#2F4C66]">Фокусировка на симптомах</span>
                      <div className="relative w-full h-4 bg-gray-200 rounded-full">
                        <div
                          className="absolute top-0 left-0 h-full rounded-full"
                          style={{
                            width: `${((result.scores.SymptomFocus || 0) / 24) * 100}%`,
                            backgroundColor: '#ff4d4d',
                          }}
                        ></div>
                        <span className="absolute right-0 top-1/2 transform -translate-y-1/2 text-sm font-playfair text-[#2F4C66] pr-2">
                          {result.scores.SymptomFocus || 0}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-playfair text-[#2F4C66]">Фокусировка на причинах/последствиях</span>
                      <div className="relative w-full h-4 bg-gray-200 rounded-full">
                        <div
                          className="absolute top-0 left-0 h-full rounded-full"
                          style={{
                            width: `${((result.scores.CausesConsequences || 0) / 36) * 100}%`,
                            backgroundColor: '#ffd700',
                          }}
                        ></div>
                        <span className="absolute right-0 top-1/2 transform -translate-y-1/2 text-sm font-playfair text-[#2F4C66] pr-2">
                          {result.scores.CausesConsequences || 0}
                        </span>
                      </div>
                    </div>
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
                <strong>Автор:</strong> S. Nolen-Hoeksema et al. (1999)
              </p>
              <p className="text-sm mb-2">
                Тест предоставляется исключительно в образовательных и развлекательных целях. Он не предназначен для психологических консультаций любого рода и не гарантирует точности или достоверности. Оценка бесплатна и анонимна. Вы можете сохранить прямую ссылку на свои результаты.
              </p>
              <p className="text-sm">
                <strong>Ссылки:</strong><br />
                <Link
                  href="https://link.springer.com/article/10.1023/A:1025321418310"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8EB5BA] hover:underline"
                >
                  W. Treynor, R. Gonzalez, S. Nolen-Hoeksema. Rumination Reconsidered: A Psychometric Analysis // Cognitive Therapy and Research, 2003. 27(3)
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