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
    Acceptance: number;
    Avoidance: number;
    Defusion: number;
    PresentMoment: number;
    SelfAsContext: number;
    Values: number;
    CommittedAction: number;
  };
}

export default function CompACT() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [fadeIn, setFadeIn] = useState<boolean>(false);
  const [showShareOptions, setShowShareOptions] = useState<boolean>(false);
  const [answers, setAnswers] = useState<{ [key: string]: string | null }>({
    q1: null, q2: null, q3: null, q4: null, q5: null,
    q6: null, q7: null, q8: null, q9: null, q10: null,
    q11: null, q12: null, q13: null, q14: null, q15: null,
    q16: null, q17: null, q18: null, q19: null, q20: null,
    q21: null, q22: null, q23: null,
  });
  const [result, setResult] = useState<Result | null>(null);

  const questions: Question[] = [
    // Acceptance (Αποδοχή)
    {
      id: 'q1',
      text: 'Я принимаю свои негативные эмоции, не пытаясь их подавить.',
      options: [
        { value: '1', text: 'Никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Всегда' },
      ],
      subscale: 'Acceptance',
    },
    {
      id: 'q2',
      text: 'Я позволяю себе чувствовать грусть или тревогу, не борясь с этими эмоциями.',
      options: [
        { value: '1', text: 'Никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Всегда' },
      ],
      subscale: 'Acceptance',
    },
    {
      id: 'q3',
      text: 'Я принимаю свои мысли, даже если они неприятные.',
      options: [
        { value: '1', text: 'Никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Всегда' },
      ],
      subscale: 'Acceptance',
    },
    // Experiential Avoidance (Αποφυγή Εμπειριών)
    {
      id: 'q4',
      text: 'Я стараюсь избегать ситуаций, которые вызывают у меня дискомфорт.',
      options: [
        { value: '1', text: 'Никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Всегда' },
      ],
      subscale: 'Avoidance',
    },
    {
      id: 'q5',
      text: 'Я отвлекаюсь, чтобы не думать о своих проблемах.',
      options: [
        { value: '1', text: 'Никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Всегда' },
      ],
      subscale: 'Avoidance',
    },
    {
      id: 'q6',
      text: 'Я избегаю разговоров о своих чувствах.',
      options: [
        { value: '1', text: 'Никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Всегда' },
      ],
      subscale: 'Avoidance',
    },
    // Cognitive Defusion (Γνωστική Αποσύνδεση)
    {
      id: 'q7',
      text: 'Я замечаю свои мысли, не позволяя им управлять мной.',
      options: [
        { value: '1', text: 'Никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Всегда' },
      ],
      subscale: 'Defusion',
    },
    {
      id: 'q8',
      text: 'Я могу отделять свои мысли от реальности.',
      options: [
        { value: '1', text: 'Никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Всегда' },
      ],
      subscale: 'Defusion',
    },
    {
      id: 'q9',
      text: 'Я вижу свои мысли как временные, а не как абсолютную правду.',
      options: [
        { value: '1', text: 'Никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Всегда' },
      ],
      subscale: 'Defusion',
    },
    // Present Moment Awareness (Παρούσα Στιγμή)
    {
      id: 'q10',
      text: 'Я полностью сосредотачиваюсь на текущем моменте.',
      options: [
        { value: '1', text: 'Никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Всегда' },
      ],
      subscale: 'PresentMoment',
    },
    {
      id: 'q11',
      text: 'Я замечаю, что происходит вокруг меня, даже в стрессовых ситуациях.',
      options: [
        { value: '1', text: 'Никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Всегда' },
      ],
      subscale: 'PresentMoment',
    },
    {
      id: 'q12',
      text: 'Я осознаю свои действия в настоящий момент.',
      options: [
        { value: '1', text: 'Никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Всегда' },
      ],
      subscale: 'PresentMoment',
    },
    // Self-as-Context (Εαυτός ως Πλαίσιο)
    {
      id: 'q13',
      text: 'Я могу смотреть на свои мысли и чувства со стороны.',
      options: [
        { value: '1', text: 'Никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Всегда' },
      ],
      subscale: 'SelfAsContext',
    },
    {
      id: 'q14',
      text: 'Я осознаю, что мои мысли и чувства не определяют меня полностью.',
      options: [
        { value: '1', text: 'Никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Всегда' },
      ],
      subscale: 'SelfAsContext',
    },
    {
      id: 'q15',
      text: 'Я чувствую себя наблюдателем своих мыслей, а не их жертвой.',
      options: [
        { value: '1', text: 'Никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Всегда' },
      ],
      subscale: 'SelfAsContext',
    },
    // Values (Αξίες)
    {
      id: 'q16',
      text: 'Я знаю, что для меня важно в жизни.',
      options: [
        { value: '1', text: 'Никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Всегда' },
      ],
      subscale: 'Values',
    },
    {
      id: 'q17',
      text: 'Я действую в соответствии со своими ценностями.',
      options: [
        { value: '1', text: 'Никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Всегда' },
      ],
      subscale: 'Values',
    },
    {
      id: 'q18',
      text: 'Мои действия отражают мои глубинные убеждения.',
      options: [
        { value: '1', text: 'Никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Всегда' },
      ],
      subscale: 'Values',
    },
    // Committed Action (Δεσμευμένη Δράση)
    {
      id: 'q19',
      text: 'Я продолжаю двигаться к своим целям, даже если сталкиваюсь с трудностями.',
      options: [
        { value: '1', text: 'Никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Всегда' },
      ],
      subscale: 'CommittedAction',
    },
    {
      id: 'q20',
      text: 'Я предпринимаю действия, которые приближают меня к моим целям.',
      options: [
        { value: '1', text: 'Никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Всегда' },
      ],
      subscale: 'CommittedAction',
    },
    {
      id: 'q21',
      text: 'Я не сдаюсь, даже если сталкиваюсь с неудачами.',
      options: [
        { value: '1', text: 'Никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Всегда' },
      ],
      subscale: 'CommittedAction',
    },
    // Mixed Subscales
    {
      id: 'q22',
      text: 'Я позволяю себе испытывать трудные эмоции, чтобы двигаться вперед.',
      options: [
        { value: '1', text: 'Никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Всегда' },
      ],
      subscale: 'Acceptance',
    },
    {
      id: 'q23',
      text: 'Я следую своим ценностям, даже если это вызывает у меня дискомфорт.',
      options: [
        { value: '1', text: 'Никогда' },
        { value: '2', text: 'Редко' },
        { value: '3', text: 'Иногда' },
        { value: '4', text: 'Часто' },
        { value: '5', text: 'Всегда' },
      ],
      subscale: 'Values',
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
    const scores = {
      Acceptance: 0,
      Avoidance: 0,
      Defusion: 0,
      PresentMoment: 0,
      SelfAsContext: 0,
      Values: 0,
      CommittedAction: 0,
    };

    questions.forEach(question => {
      const answerValue = answers[question.id];
      if (answerValue) {
        if (question.subscale === 'Avoidance') {
          scores[question.subscale] += (6 - parseInt(answerValue));
        } else {
          scores[question.subscale] += parseInt(answerValue);
        }
      }
    });

    const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);

    let recommendation;
    if (totalScore <= 46) {
      recommendation = {
        level: 'Низкий уровень психологической гибкости',
        package: 'Расширенный Пакет',
        packageLink: '/our-service',
        description: 'Твой уровень психологической гибкости может быть низким. Наш расширенный пакет поможет тебе развить навыки принятия и осознанности.',
      };
    } else if (totalScore <= 69) {
      recommendation = {
        level: 'Средний уровень психологической гибкости',
        package: 'Базовый Пакет',
        packageLink: '/our-service',
        description: 'У тебя средний уровень психологической гибкости. Наш базовый пакет поможет тебе улучшить эти навыки.',
      };
    } else {
      recommendation = {
        level: 'Высокий уровень психологической гибкости',
        package: 'Бесплатный Вводный Пакет',
        packageLink: '/free-package',
        description: 'У тебя высокий уровень психологической гибкости! Наш бесплатный вводный пакет поможет тебе поддерживать и развивать эти навыки.',
      };
    }

    setResult({
      score: totalScore,
      recommendation,
      scores: {
        Acceptance: scores.Acceptance,
        Avoidance: scores.Avoidance,
        Defusion: scores.Defusion,
        PresentMoment: scores.PresentMoment,
        SelfAsContext: scores.SelfAsContext,
        Values: scores.Values,
        CommittedAction: scores.CommittedAction,
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
      q21: null, q22: null, q23: null,
    });
    setResult(null);
    setShowShareOptions(false);
  };

  const toggleShareOptions = () => {
    setShowShareOptions(!showShareOptions);
  };

  const shareViaEmail = () => {
    if (!result) return;
    const subject = 'Мои результаты теста: ACT-тест: оценка психологической гибкости и ориентации на ценности, CompACT';
    const body = `Твой балл: ${result.score} из 115\nУровень: ${result.recommendation.level}\nРекомендация: ${result.recommendation.description}\nПредлагаемый пакет: ${result.recommendation.package}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const shareViaWhatsApp = () => {
    if (!result) return;
    const text = `Мои результаты теста: ACT-тест: оценка психологической гибкости и ориентации на ценности, CompACT\nТвой балл: ${result.score} из 115\nУровень: ${result.recommendation.level}\nРекомендация: ${result.recommendation.description}\nПредлагаемый пакет: ${result.recommendation.package}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const printResult = () => {
    if (!result) return;
    const printContent = `
      <h3 class="text-xl font-playfair text-[#143B64] mb-4">Результаты теста: ACT-тест: оценка психологической гибкости и ориентации на ценности, CompACT</h3>
      <p class="text-base text-[#2F4C66] mb-2"><strong>Твой балл:</strong> ${result.score} из 115</p>
      <p class="text-base text-[#2F4C66] mb-2"><strong>Уровень:</strong> ${result.recommendation.level}</p>
      <p class="text-base text-[#2F4C66] mb-2"><strong>Принятие:</strong> ${result.scores.Acceptance} из 20</p>
      <p class="text-base text-[#2F4C66] mb-2"><strong>Избежание:</strong> ${result.scores.Avoidance} из 15</p>
      <p class="text-base text-[#2F4C66] mb-2"><strong>Когнитивная дефузия:</strong> ${result.scores.Defusion} из 15</p>
      <p class="text-base text-[#2F4C66] mb-2"><strong>Осознанность настоящего момента:</strong> ${result.scores.PresentMoment} из 15</p>
      <p class="text-base text-[#2F4C66] mb-2"><strong>Я как контекст:</strong> ${result.scores.SelfAsContext} из 15</p>
      <p class="text-base text-[#2F4C66] mb-2"><strong>Ценности:</strong> ${result.scores.Values} из 20</p>
      <p class="text-base text-[#2F4C66] mb-2"><strong>Приверженное действие:</strong> ${result.scores.CommittedAction} из 15</p>
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
              ACT-тест: оценка психологической гибкости и ориентации на ценности, CompACT
            </h3>
            <p className="text-sm text-gray-600 mb-4 font-playfair">
              онлайн-тест | 23 пункта | около 4 минут
            </p>
            <p className="text-base md:text-lg text-[#2F4C66] font-playfair leading-relaxed mb-4">
              Этот тест оценивает уровень твоей психологической гибкости — ключевого фактора психического здоровья и устойчивости. Он основан на подходе Acceptance and Commitment Therapy (ACT), эффективность которого подтверждена десятками клинических исследований. Тест помогает понять, насколько ты умеешь справляться с трудными переживаниями, действовать в соответствии со своими ценностями и оставаться в контакте с настоящим, даже когда непросто.
            </p>
            <div className="bg-[#f2f1f0] p-6 rounded-lg min-h-[350px] overflow-auto">
              {result ? (
                <div>
                  <p className="text-lg font-playfair text-[#dbad9a] mb-2"><strong>Твой балл:</strong></p>
                  <div className="relative w-full h-6 bg-gray-200 rounded-full mb-2">
                    <div
                      className="absolute top-0 left-0 h-full rounded-full"
                      style={{
                        width: `${(result.score / 115) * 100}%`,
                        backgroundColor: result.score <= 46 ? '#9e4021' : result.score <= 69 ? '#e0be60' : '#558239',
                      }}
                    ></div>
                    <span
                      className="absolute top-1/2 transform -translate-y-1/2 text-sm font-playfair text-[#143B64]"
                      style={{ left: `${(result.score / 115) * 100}%`, transform: 'translateX(-50%)' }}
                    >
                      {result.score}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <span>0</span>
                    <span>115</span>
                  </div>
                  <p className="text-lg font-playfair text-[#143B64] mb-2"><strong>Подшкалы:</strong></p>
                  <div className="space-y-4">
                    <div>
                      <span className="text-sm font-playfair text-[#2F4C66]">Принятие</span>
                      <div className="relative w-full h-4 bg-gray-200 rounded-full">
                        <div
                          className="absolute top-0 left-0 h-full rounded-full"
                          style={{
                            width: `${((result.scores.Acceptance || 0) / 20) * 100}%`,
                            backgroundColor: '#21aabc',
                          }}
                        ></div>
                        <span className="absolute right-0 top-1/2 transform -translate-y-1/2 text-sm font-playfair text-[#2F4C66] pr-2">
                          {result.scores.Acceptance || 0}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-playfair text-[#2F4C66]">Избежание</span>
                      <div className="relative w-full h-4 bg-gray-200 rounded-full">
                        <div
                          className="absolute top-0 left-0 h-full rounded-full"
                          style={{
                            width: `${((result.scores.Avoidance || 0) / 15) * 100}%`,
                            backgroundColor: '#ff4d4d',
                          }}
                        ></div>
                        <span className="absolute right-0 top-1/2 transform -translate-y-1/2 text-sm font-playfair text-[#2F4C66] pr-2">
                          {result.scores.Avoidance || 0}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-playfair text-[#2F4C66]">Когнитивная дефузия</span>
                      <div className="relative w-full h-4 bg-gray-200 rounded-full">
                        <div
                          className="absolute top-0 left-0 h-full rounded-full"
                          style={{
                            width: `${((result.scores.Defusion || 0) / 15) * 100}%`,
                            backgroundColor: '#ffd700',
                          }}
                        ></div>
                        <span className="absolute right-0 top-1/2 transform -translate-y-1/2 text-sm font-playfair text-[#2F4C66] pr-2">
                          {result.scores.Defusion || 0}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-playfair text-[#2F4C66]">Осознанность настоящего момента</span>
                      <div className="relative w-full h-4 bg-gray-200 rounded-full">
                        <div
                          className="absolute top-0 left-0 h-full rounded-full"
                          style={{
                            width: `${((result.scores.PresentMoment || 0) / 15) * 100}%`,
                            backgroundColor: '#32cd32',
                          }}
                        ></div>
                        <span className="absolute right-0 top-1/2 transform -translate-y-1/2 text-sm font-playfair text-[#2F4C66] pr-2">
                          {result.scores.PresentMoment || 0}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-playfair text-[#2F4C66]">Я как контекст</span>
                      <div className="relative w-full h-4 bg-gray-200 rounded-full">
                        <div
                          className="absolute top-0 left-0 h-full rounded-full"
                          style={{
                            width: `${((result.scores.SelfAsContext || 0) / 15) * 100}%`,
                            backgroundColor: '#ff8c00',
                          }}
                        ></div>
                        <span className="absolute right-0 top-1/2 transform -translate-y-1/2 text-sm font-playfair text-[#2F4C66] pr-2">
                          {result.scores.SelfAsContext || 0}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-playfair text-[#2F4C66]">Ценности</span>
                      <div className="relative w-full h-4 bg-gray-200 rounded-full">
                        <div
                          className="absolute top-0 left-0 h-full rounded-full"
                          style={{
                            width: `${((result.scores.Values || 0) / 20) * 100}%`,
                            backgroundColor: '#6a5acd',
                          }}
                        ></div>
                        <span className="absolute right-0 top-1/2 transform -translate-y-1/2 text-sm font-playfair text-[#2F4C66] pr-2">
                          {result.scores.Values || 0}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-playfair text-[#2F4C66]">Приверженное действие</span>
                      <div className="relative w-full h-4 bg-gray-200 rounded-full">
                        <div
                          className="absolute top-0 left-0 h-full rounded-full"
                          style={{
                            width: `${((result.scores.CommittedAction || 0) / 15) * 100}%`,
                            backgroundColor: '#ff69b4',
                          }}
                        ></div>
                        <span className="absolute right-0 top-1/2 transform -translate-y-1/2 text-sm font-playfair text-[#2F4C66] pr-2">
                          {result.scores.CommittedAction || 0}
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
                <strong>Авторы:</strong> A. Francis, D. Dawson, N. Golijani-Moghaddam (2016)
              </p>
              <p className="text-sm mb-2">
                Тест предоставляется исключительно в образовательных и развлекательных целях. Он не предназначен для психологических консультаций любого рода и не гарантирует точности или достоверности. Оценка бесплатна и анонимна. Вы можете сохранить прямую ссылку на свои результаты.
              </p>
              <p className="text-sm mb-2">
                <strong>Ссылки:</strong><br />
                <Link
                  href="https://www.sciencedirect.com/science/article/abs/pii/S2212144716300152"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8EB5BA] hover:underline"
                >
                  A. Francis, D. Dawson, N. Golijani-Moghaddam. The Development and Validation of the Comprehensive Assessment of Acceptance and Commitment Therapy Processes (CompACT) // Journal of Contextual Behavioral Science, May 2016
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
