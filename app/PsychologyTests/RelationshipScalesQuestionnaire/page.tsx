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

export default function RelationshipScalesQuestionnaire() {
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
    q26: null, q27: null, q28: null, q29: null, q30: null,
    q31: null, q32: null,
  });
  const [result, setResult] = useState<Result | null>(null);

  const questions: Question[] = [
    {
      id: 'q1',
      text: 'Я чувствую себя комфортно, когда нахожусь в одиночестве.',
      options: [
        { value: '1', text: 'Совершенно не похоже на меня' },
        { value: '2', text: 'Не похоже на меня' },
        { value: '3', text: 'Нейтрально' },
        { value: '4', text: 'Похоже на меня' },
        { value: '5', text: 'Совершенно похоже на меня' },
      ],
    },
    {
      id: 'q2',
      text: 'Я часто беспокоюсь о том, что другие люди подумают обо мне.',
      options: [
        { value: '1', text: 'Совершенно не похоже на меня' },
        { value: '2', text: 'Не похоже на меня' },
        { value: '3', text: 'Нейтрально' },
        { value: '4', text: 'Похоже на меня' },
        { value: '5', text: 'Совершенно похоже на меня' },
      ],
    },
    {
      id: 'q3',
      text: 'Я предпочитаю, чтобы другие принимали решения за меня.',
      options: [
        { value: '1', text: 'Совершенно не похоже на меня' },
        { value: '2', text: 'Не похоже на меня' },
        { value: '3', text: 'Нейтрально' },
        { value: '4', text: 'Похоже на меня' },
        { value: '5', text: 'Совершенно похоже на меня' },
      ],
    },
    {
      id: 'q4',
      text: 'Мне трудно доверять другим людям.',
      options: [
        { value: '1', text: 'Совершенно не похоже на меня' },
        { value: '2', text: 'Не похоже на меня' },
        { value: '3', text: 'Нейтрально' },
        { value: '4', text: 'Похоже на меня' },
        { value: '5', text: 'Совершенно похоже на меня' },
      ],
    },
    {
      id: 'q5',
      text: 'Я чувствую себя некомфортно, если кто-то становится слишком близким ко мне.',
      options: [
        { value: '1', text: 'Совершенно не похоже на меня' },
        { value: '2', text: 'Не похоже на меня' },
        { value: '3', text: 'Нейтрально' },
        { value: '4', text: 'Похоже на меня' },
        { value: '5', text: 'Совершенно похоже на меня' },
      ],
    },
    {
      id: 'q6',
      text: 'Я часто чувствую, что мне нужно больше внимания от других.',
      options: [
        { value: '1', text: 'Совершенно не похоже на меня' },
        { value: '2', text: 'Не похоже на меня' },
        { value: '3', text: 'Нейтрально' },
        { value: '4', text: 'Похоже на меня' },
        { value: '5', text: 'Совершенно похоже на меня' },
      ],
    },
    {
      id: 'q7',
      text: 'Я чувствую себя уверенно в своих отношениях с другими.',
      options: [
        { value: '1', text: 'Совершенно не похоже на меня' },
        { value: '2', text: 'Не похоже на меня' },
        { value: '3', text: 'Нейтрально' },
        { value: '4', text: 'Похоже на меня' },
        { value: '5', text: 'Совершенно похоже на меня' },
      ],
    },
    {
      id: 'q8',
      text: 'Я боюсь, что меня покинут близкие люди.',
      options: [
        { value: '1', text: 'Совершенно не похоже на меня' },
        { value: '2', text: 'Не похоже на меня' },
        { value: '3', text: 'Нейтрально' },
        { value: '4', text: 'Похоже на меня' },
        { value: '5', text: 'Совершенно похоже на меня' },
      ],
    },
    {
      id: 'q9',
      text: 'Я чувствую себя комфортно, когда полагаюсь на других.',
      options: [
        { value: '1', text: 'Совершенно не похоже на меня' },
        { value: '2', text: 'Не похоже на меня' },
        { value: '3', text: 'Нейтрально' },
        { value: '4', text: 'Похоже на меня' },
        { value: '5', text: 'Совершенно похоже на меня' },
      ],
    },
    {
      id: 'q10',
      text: 'Я часто чувствую, что другие не заботятся обо мне так, как я забочусь о них.',
      options: [
        { value: '1', text: 'Совершенно не похоже на меня' },
        { value: '2', text: 'Не похоже на меня' },
        { value: '3', text: 'Нейтрально' },
        { value: '4', text: 'Похоже на меня' },
        { value: '5', text: 'Совершенно похоже на меня' },
      ],
    },
    {
      id: 'q11',
      text: 'Я предпочитаю держать свои чувства при себе.',
      options: [
        { value: '1', text: 'Совершенно не похоже на меня' },
        { value: '2', text: 'Не похоже на меня' },
        { value: '3', text: 'Нейтрально' },
        { value: '4', text: 'Похоже на меня' },
        { value: '5', text: 'Совершенно похоже на меня' },
      ],
    },
    {
      id: 'q12',
      text: 'Я часто чувствую себя уязвимым в близких отношениях.',
      options: [
        { value: '1', text: 'Совершенно не похоже на меня' },
        { value: '2', text: 'Не похоже на меня' },
        { value: '3', text: 'Нейтрально' },
        { value: '4', text: 'Похоже на меня' },
        { value: '5', text: 'Совершенно похоже на меня' },
      ],
    },
    {
      id: 'q13',
      text: 'Я чувствую себя комфортно, когда другие полагаются на меня.',
      options: [
        { value: '1', text: 'Совершенно не похоже на меня' },
        { value: '2', text: 'Не похоже на меня' },
        { value: '3', text: 'Нейтрально' },
        { value: '4', text: 'Похоже на меня' },
        { value: '5', text: 'Совершенно похоже на меня' },
      ],
    },
    {
      id: 'q14',
      text: 'Я часто беспокоюсь о том, что потеряю близких людей.',
      options: [
        { value: '1', text: 'Совершенно не похоже на меня' },
        { value: '2', text: 'Не похоже на меня' },
        { value: '3', text: 'Нейтрально' },
        { value: '4', text: 'Похоже на меня' },
        { value: '5', text: 'Совершенно похоже на меня' },
      ],
    },
    {
      id: 'q15',
      text: 'Мне трудно быть открытым с другими.',
      options: [
        { value: '1', text: 'Совершенно не похоже на меня' },
        { value: '2', text: 'Не похоже на меня' },
        { value: '3', text: 'Нейтрально' },
        { value: '4', text: 'Похоже на меня' },
        { value: '5', text: 'Совершенно похоже на меня' },
      ],
    },
    {
      id: 'q16',
      text: 'Я часто чувствую, что мне нужно больше близости в отношениях.',
      options: [
        { value: '1', text: 'Совершенно не похоже на меня' },
        { value: '2', text: 'Не похоже на меня' },
        { value: '3', text: 'Нейтрально' },
        { value: '4', text: 'Похоже на меня' },
        { value: '5', text: 'Совершенно похоже на меня' },
      ],
    },
    {
      id: 'q17',
      text: 'Я чувствую себя комфортно, когда другие знают мои глубочайшие мысли и чувства.',
      options: [
        { value: '1', text: 'Совершенно не похоже на меня' },
        { value: '2', text: 'Не похоже на меня' },
        { value: '3', text: 'Нейтрально' },
        { value: '4', text: 'Похоже на меня' },
        { value: '5', text: 'Совершенно похоже на меня' },
      ],
    },
    {
      id: 'q18',
      text: 'Я часто чувствую, что другие не понимают меня.',
      options: [
        { value: '1', text: 'Совершенно не похоже на меня' },
        { value: '2', text: 'Не похоже на меня' },
        { value: '3', text: 'Нейтрально' },
        { value: '4', text: 'Похоже на меня' },
        { value: '5', text: 'Совершенно похоже на меня' },
      ],
    },
    {
      id: 'q19',
      text: 'Мне трудно сказать "нет" другим.',
      options: [
        { value: '1', text: 'Совершенно не похоже на меня' },
        { value: '2', text: 'Не похоже на меня' },
        { value: '3', text: 'Нейтрально' },
        { value: '4', text: 'Похоже на меня' },
        { value: '5', text: 'Совершенно похоже на меня' },
      ],
    },
    {
      id: 'q20',
      text: 'Я часто чувствую, что должен быть идеальным, чтобы меня приняли другие.',
      options: [
        { value: '1', text: 'Совершенно не похоже на меня' },
        { value: '2', text: 'Не похоже на меня' },
        { value: '3', text: 'Нейтрально' },
        { value: '4', text: 'Похоже на меня' },
        { value: '5', text: 'Совершенно похоже на меня' },
      ],
    },
    {
      id: 'q21',
      text: 'Я чувствую себя комфортно, будучи независимым.',
      options: [
        { value: '1', text: 'Совершенно не похоже на меня' },
        { value: '2', text: 'Не похоже на меня' },
        { value: '3', text: 'Нейтрально' },
        { value: '4', text: 'Похоже на меня' },
        { value: '5', text: 'Совершенно похоже на меня' },
      ],
    },
    {
      id: 'q22',
      text: 'Я часто чувствую, что другие ненадежны.',
      options: [
        { value: '1', text: 'Совершенно не похоже на меня' },
        { value: '2', text: 'Не похоже на меня' },
        { value: '3', text: 'Нейтрально' },
        { value: '4', text: 'Похоже на меня' },
        { value: '5', text: 'Совершенно похоже на меня' },
      ],
    },
    {
      id: 'q23',
      text: 'Я чувствую себя комфортно, делясь своими чувствами с другими.',
      options: [
        { value: '1', text: 'Совершенно не похоже на меня' },
        { value: '2', text: 'Не похоже на меня' },
        { value: '3', text: 'Нейтрально' },
        { value: '4', text: 'Похоже на меня' },
        { value: '5', text: 'Совершенно похоже на меня' },
      ],
    },
    {
      id: 'q24',
      text: 'Я часто чувствую, что мне нужно быть рядом с другими, чтобы чувствовать себя в безопасности.',
      options: [
        { value: '1', text: 'Совершенно не похоже на меня' },
        { value: '2', text: 'Не похоже на меня' },
        { value: '3', text: 'Нейтрально' },
        { value: '4', text: 'Похоже на меня' },
        { value: '5', text: 'Совершенно похоже на меня' },
      ],
    },
    {
      id: 'q25',
      text: 'Я чувствую себя комфортно, будучи самим собой в отношениях.',
      options: [
        { value: '1', text: 'Совершенно не похоже на меня' },
        { value: '2', text: 'Не похоже на меня' },
        { value: '3', text: 'Нейтрально' },
        { value: '4', text: 'Похоже на меня' },
        { value: '5', text: 'Совершенно похоже на меня' },
      ],
    },
    {
      id: 'q26',
      text: 'Я часто чувствую, что другие не ценят меня.',
      options: [
        { value: '1', text: 'Совершенно не похоже на меня' },
        { value: '2', text: 'Не похоже на меня' },
        { value: '3', text: 'Нейтрально' },
        { value: '4', text: 'Похоже на меня' },
        { value: '5', text: 'Совершенно похоже на меня' },
      ],
    },
    {
      id: 'q27',
      text: 'Я чувствую себя комфортно, устанавливая границы в отношениях.',
      options: [
        { value: '1', text: 'Совершенно не похоже на меня' },
        { value: '2', text: 'Не похоже на меня' },
        { value: '3', text: 'Нейтрально' },
        { value: '4', text: 'Похоже на меня' },
        { value: '5', text: 'Совершенно похоже на меня' },
      ],
    },
    {
      id: 'q28',
      text: 'Я часто чувствую, что должен угождать другим, чтобы меня приняли.',
      options: [
        { value: '1', text: 'Совершенно не похоже на меня' },
        { value: '2', text: 'Не похоже на меня' },
        { value: '3', text: 'Нейтрально' },
        { value: '4', text: 'Похоже на меня' },
        { value: '5', text: 'Совершенно похоже на меня' },
      ],
    },
    {
      id: 'q29',
      text: 'Я чувствую себя комфортно, будучи уязвимым с другими.',
      options: [
        { value: '1', text: 'Совершенно не похоже на меня' },
        { value: '2', text: 'Не похоже на меня' },
        { value: '3', text: 'Нейтрально' },
        { value: '4', text: 'Похоже на меня' },
        { value: '5', text: 'Совершенно похоже на меня' },
      ],
    },
    {
      id: 'q30',
      text: 'Я часто чувствую, что другие недоступны, когда мне нужны.',
      options: [
        { value: '1', text: 'Совершенно не похоже на меня' },
        { value: '2', text: 'Не похоже на меня' },
        { value: '3', text: 'Нейтрально' },
        { value: '4', text: 'Похоже на меня' },
        { value: '5', text: 'Совершенно похоже на меня' },
      ],
    },
    {
      id: 'q31',
      text: 'Я чувствую себя комфортно, прося о помощи, когда мне это нужно.',
      options: [
        { value: '1', text: 'Совершенно не похоже на меня' },
        { value: '2', text: 'Не похоже на меня' },
        { value: '3', text: 'Нейтрально' },
        { value: '4', text: 'Похоже на меня' },
        { value: '5', text: 'Совершенно похоже на меня' },
      ],
    },
    {
      id: 'q32',
      text: 'Я часто чувствую, что должен доказывать свою ценность другим.',
      options: [
        { value: '1', text: 'Совершенно не похоже на меня' },
        { value: '2', text: 'Не похоже на меня' },
        { value: '3', text: 'Нейтрально' },
        { value: '4', text: 'Похоже на меня' },
        { value: '5', text: 'Совершенно похоже на меня' },
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

    if (totalScore <= 64) {
      recommendation = {
        level: 'Высокий уровень тревожности в отношениях',
        package: 'Расширенный Пакет',
        packageLink: '/our-service',
        description: 'Твой уровень тревожности в отношениях может быть высоким. Наш расширенный пакет поможет тебе работать над этим.',
      };
    } else if (totalScore <= 96) {
      recommendation = {
        level: 'Средний уровень тревожности в отношениях',
        package: 'Базовый Пакет',
        packageLink: '/our-service',
        description: 'Твой уровень тревожности в отношениях находится на среднем уровне. Наш базовый пакет поможет тебе укрепить уверенность в отношениях.',
      };
    } else {
      recommendation = {
        level: 'Низкий уровень тревожности в отношениях',
        package: 'Бесплатный Вводный Пакет',
        packageLink: '/free-package',
        description: 'У тебя низкий уровень тревожности в отношениях! Наш бесплатный вводный пакет поможет тебе поддерживать здоровые отношения.',
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
      q26: null, q27: null, q28: null, q29: null, q30: null,
      q31: null, q32: null,
    });
    setResult(null);
    setShowShareOptions(false);
  };

  const toggleShareOptions = () => {
    setShowShareOptions(!showShareOptions);
  };

  const shareViaEmail = () => {
    if (!result) return;
    const subject = 'Мои результаты теста: Опросник шкал привязанности (RSQ)';
    const body = `Твой балл: ${result.score} из 160\nУровень: ${result.recommendation.level}\nРекомендация: ${result.recommendation.description}\nПредлагаемый пакет: ${result.recommendation.package}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const shareViaWhatsApp = () => {
    if (!result) return;
    const text = `Мои результаты теста: Опросник шкал привязанности (RSQ)\nТвой балл: ${result.score} из 160\nУровень: ${result.recommendation.level}\nРекомендация: ${result.recommendation.description}\nПредлагаемый пакет: ${result.recommendation.package}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const printResult = () => {
    if (!result) return;
    const printContent = `
      <h3 class="text-xl font-playfair text-[#143B64] mb-4">Результаты теста: Опросник шкал привязанности (RSQ)</h3>
      <p class="text-base text-[#2F4C66] mb-2"><strong>Твой балл:</strong> ${result.score} из 160</p>
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
              Опросник шкал привязанности (RSQ)
            </h3>
            <p className="text-sm text-gray-600 mb-4 font-playfair">
              онлайн-тест | 32 пункта | около 5 минут
            </p>
            <p className="text-base md:text-lg text-[#2F4C66] font-playfair leading-relaxed mb-4">
              Опросник шкал привязанности (RSQ) — валидированный психодиагностический инструмент, разработанный на основе теории привязанности взрослых (Bartholomew & Horowitz). Он предназначен для оценки индивидуальных различий в стилях привязанности, включая степень комфорта с эмоциональной близостью, склонность к избеганию и тревожности в отношениях. RSQ позволяет определить преобладающий стиль привязанности (безопасный, озабоченный, отвергающий или боязливо-избегающий), что даёт основу для более глубокого понимания паттернов межличностного взаимодействия. Пройди тест — и получи интерпретацию результатов с профессиональными рекомендациями по развитию устойчивых и осознанных форм привязанности.
            </p>
            <div className="bg-[#f2f1f0] p-6 rounded-lg min-h-[350px] overflow-auto">
              {result ? (
                <div>
                  <p className="text-lg font-playfair text-[#dbad9a] mb-2"><strong>Твой балл:</strong></p>
                  <div className="relative w-full h-6 bg-gray-200 rounded-full mb-2">
                    <div
                      className="absolute top-0 left-0 h-full rounded-full"
                      style={{
                        width: `${((result.score - 32) / 128) * 100}%`,
                        backgroundColor: result.score <= 64 ? '#ff4d4d' : result.score <= 96 ? '#ffd700' : '#32cd32',
                      }}
                    ></div>
                    <span
                      className="absolute top-1/2 transform -translate-y-1/2 text-sm font-playfair text-[#143B64]"
                      style={{ left: `${((result.score - 32) / 128) * 100}%`, transform: 'translateX(-50%)' }}
                    >
                      {result.score}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <span>32</span>
                    <span>160</span>
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
                <strong>Автор:</strong> John Bowlby (1988)
              </p>
              <p className="text-sm mb-2">
                Тест предоставляется исключительно в образовательных и развлекательных целях. Он не предназначен для психологических консультаций любого рода и не гарантирует точности или достоверности. Оценка бесплатна и анонимна. Вы можете сохранить прямую ссылку на свои результаты.
              </p>
              <p className="text-sm">
                <strong>Ссылки:</strong><br />
                <Link
                  href="https://www.psychology.sunysb.edu/attachment/measures/content/rsq.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8EB5BA] hover:underline"
                >
                  Fraley, R. C., Waller, N. G., & Brennan, K. A. (2000). An item response theory analysis of self-report measures of adult attachment. Journal of Personality and Social Psychology, 78(2), 350-365.
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