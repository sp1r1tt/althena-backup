"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ProfileHeader from '@/components/ProfileHeader';

// Оρισμός interfaces για ερωτήσεις, επιλογές και αποτελέσματα
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

export default function BecksDepressionInventory() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [fadeIn, setFadeIn] = useState<boolean>(false);
  const [showShareOptions, setShowShareOptions] = useState<boolean>(false);
  const [answers, setAnswers] = useState<{ [key: string]: string | null }>({
    sadness: null,
    pessimism: null,
    pastFailure: null,
    lossOfPleasure: null,
    guiltyFeelings: null,
    punishmentFeelings: null,
    selfDislike: null,
    selfCriticalness: null,
    suicidalThoughts: null,
    crying: null,
    agitation: null,
    lossOfInterest: null,
    indecisiveness: null,
    worthlessness: null,
    lossOfEnergy: null,
    changesInSleeping: null,
    changesInAppetite: null,
    concentrationDifficulty: null,
    tiredness: null,
    lossOfInterestInSex: null,
    physicalSymptoms: null,
  });
  const [result, setResult] = useState<Result | null>(null);

  const questions: Question[] = [
    {
      id: 'sadness',
      text: 'Как ты себя чувствуешь в последнее время (грусть)?',
      options: [
        { value: '0', text: 'Не чувствую себя грустным.' },
        { value: '1', text: 'Иногда чувствую себя грустным.' },
        { value: '2', text: 'Часто чувствую себя грустным.' },
        { value: '3', text: 'Постоянно чувствую себя грустным и не могу это преодолеть.' },
      ],
    },
    {
      id: 'pessimism',
      text: 'Как ты оцениваешь своё будущее (пессимизм)?',
      options: [
        { value: '0', text: 'Не чувствую себя безнадёжным.' },
        { value: '1', text: 'Иногда чувствую себя безнадёжным.' },
        { value: '2', text: 'Часто чувствую себя безнадёжным.' },
        { value: '3', text: 'Чувствую себя совершенно безнадёжным.' },
      ],
    },
    {
      id: 'pastFailure',
      text: 'Как ты оцениваешь свои прошлые достижения (чувство неудачи)?',
      options: [
        { value: '0', text: 'Не чувствую себя неудачником.' },
        { value: '1', text: 'Иногда чувствую себя неудачником.' },
        { value: '2', text: 'Часто чувствую себя неудачником.' },
        { value: '3', text: 'Чувствую, что я полный неудачник.' },
      ],
    },
    {
      id: 'lossOfPleasure',
      text: 'Получаешь ли ты удовольствие от вещей, которые раньше любил (потеря удовольствия)?',
      options: [
        { value: '0', text: 'Получаю столько же удовольствия от вещей, как раньше.' },
        { value: '1', text: 'Получаю меньше удовольствия, чем раньше.' },
        { value: '2', text: 'Почти не получаю удовольствия от вещей.' },
        { value: '3', text: 'Совсем не получаю удовольствия от вещей.' },
      ],
    },
    {
      id: 'guiltyFeelings',
      text: 'Чувствуешь ли ты вину (чувство вины)?',
      options: [
        { value: '0', text: 'Не чувствую себя виноватым.' },
        { value: '1', text: 'Иногда чувствую себя виноватым.' },
        { value: '2', text: 'Часто чувствую себя виноватым.' },
        { value: '3', text: 'Постоянно чувствую себя виноватым.' },
      ],
    },
    {
      id: 'punishmentFeelings',
      text: 'Чувствуешь ли, что тебя наказывают (чувство наказания)?',
      options: [
        { value: '0', text: 'Не чувствую, что меня наказывают.' },
        { value: '1', text: 'Иногда чувствую, что меня наказывают.' },
        { value: '2', text: 'Ожидаю, что меня накажут.' },
        { value: '3', text: 'Чувствую, что меня наказывают.' },
      ],
    },
    {
      id: 'selfDislike',
      text: 'Как ты относишься к себе (неприязнь к себе)?',
      options: [
        { value: '0', text: 'Не испытываю неприязни к себе.' },
        { value: '1', text: 'Испытываю небольшую неприязнь к себе.' },
        { value: '2', text: 'Испытываю сильную неприязнь к себе.' },
        { value: '3', text: 'Ненавижу себя.' },
      ],
    },
    {
      id: 'selfCriticalness',
      text: 'Как часто ты критикуешь себя (самокритика)?',
      options: [
        { value: '0', text: 'Не критикую себя больше, чем обычно.' },
        { value: '1', text: 'Критикую себя больше, чем обычно.' },
        { value: '2', text: 'Постоянно критикую себя за свои ошибки.' },
        { value: '3', text: 'Вижу себя во всём виноватым.' },
      ],
    },
    {
      id: 'suicidalThoughts',
      text: 'Есть ли у тебя мысли о самоубийстве (суицидальные мысли)?',
      options: [
        { value: '0', text: 'У меня нет мыслей о самоубийстве.' },
        { value: '1', text: 'Иногда думаю о самоубийстве, но не собираюсь это делать.' },
        { value: '2', text: 'Часто думаю о самоубийстве.' },
        { value: '3', text: 'Хочу покончить с собой.' },
      ],
    },
    {
      id: 'crying',
      text: 'Как часто ты плачешь (плач)?',
      options: [
        { value: '0', text: 'Не плачу больше, чем обычно.' },
        { value: '1', text: 'Плачу чаще, чем обычно.' },
        { value: '2', text: 'Плачу почти каждый день.' },
        { value: '3', text: 'Хочу плакать, но не могу.' },
      ],
    },
    {
      id: 'agitation',
      text: 'Чувствуешь ли ты раздражительность (раздражительность)?',
      options: [
        { value: '0', text: 'Не чувствую себя раздражённым.' },
        { value: '1', text: 'Иногда чувствую себя раздражённым.' },
        { value: '2', text: 'Часто чувствую себя раздражённым.' },
        { value: '3', text: 'Постоянно чувствую себя раздражённым.' },
      ],
    },
    {
      id: 'lossOfInterest',
      text: 'Как обстоят дела с твоей социальной активностью (потеря интереса к общению)?',
      options: [
        { value: '0', text: 'Не потерял интерес к общению с людьми.' },
        { value: '1', text: 'Потерял небольшой интерес к общению.' },
        { value: '2', text: 'Потерял значительный интерес к общению.' },
        { value: '3', text: 'Совсем не хочу общаться с людьми.' },
      ],
    },
    {
      id: 'indecisiveness',
      text: 'Как ты принимаешь решения (нерешительность)?',
      options: [
        { value: '0', text: 'Принимаю решения так же, как раньше.' },
        { value: '1', text: 'Принимаю решения с большим трудом.' },
        { value: '2', text: 'Мне очень трудно принимать решения.' },
        { value: '3', text: 'Не могу принимать никакие решения.' },
      ],
    },
    {
      id: 'worthlessness',
      text: 'Чувствуешь ли ты себя бесполезным (чувство бесполезности)?',
      options: [
        { value: '0', text: 'Не чувствую себя бесполезным.' },
        { value: '1', text: 'Иногда чувствую себя бесполезным.' },
        { value: '2', text: 'Часто чувствую себя бесполезным.' },
        { value: '3', text: 'Чувствую себя совершенно бесполезным.' },
      ],
    },
    {
      id: 'lossOfEnergy',
      text: 'Каков твой уровень энергии (энергия)?',
      options: [
        { value: '0', text: 'У меня столько же энергии, как обычно.' },
        { value: '1', text: 'Чувствую себя более уставшим, чем обычно.' },
        { value: '2', text: 'Чувствую усталость почти весь день.' },
        { value: '3', text: 'Настолько устал, что ничего не могу делать.' },
      ],
    },
    {
      id: 'changesInSleeping',
      text: 'Как обстоят дела с твоим сном (изменения в сне)?',
      options: [
        { value: '0', text: 'Сплю нормально, как всегда.' },
        { value: '1', text: 'У меня небольшие проблемы со сном (трудно засыпать или просыпаюсь рано).' },
        { value: '2', text: 'У меня значительные проблемы со сном (сплю намного меньше или больше, чем обычно).' },
        { value: '3', text: 'Совсем не могу спать или сплю чрезмерно, не чувствуя отдыха.' },
      ],
    },
    {
      id: 'changesInAppetite',
      text: 'Как изменился твой аппетит (изменения в аппетите)?',
      options: [
        { value: '0', text: 'Мой аппетит не изменился.' },
        { value: '1', text: 'Мой аппетит немного изменился (ем больше или меньше, чем обычно).' },
        { value: '2', text: 'Мой аппетит значительно изменился.' },
        { value: '3', text: 'Совсем не хочу есть или ем намного больше, чем обычно.' },
      ],
    },
    {
      id: 'concentrationDifficulty',
      text: 'Как обстоят дела с твоей концентрацией (трудности с концентрацией)?',
      options: [
        { value: '0', text: 'Могу сосредотачиваться так же, как раньше.' },
        { value: '1', text: 'Мне немного труднее сосредотачиваться.' },
        { value: '2', text: 'Мне очень трудно сосредотачиваться.' },
        { value: '3', text: 'Не могу сосредотачиваться вообще.' },
      ],
    },
    {
      id: 'tiredness',
      text: 'Чувствуешь ли ты усталость (усталость)?',
      options: [
        { value: '0', text: 'Не чувствую себя более уставшим, чем обычно.' },
        { value: '1', text: 'Чувствую себя более уставшим, чем обычно.' },
        { value: '2', text: 'Чувствую усталость большую часть времени.' },
        { value: '3', text: 'Постоянно чувствую усталость.' },
      ],
    },
    {
      id: 'lossOfInterestInSex',
      text: 'Как обстоят дела с твоим интересом к сексу (потеря интереса к сексу)?',
      options: [
        { value: '0', text: 'Не потерял интерес к сексу.' },
        { value: '1', text: 'Потерял небольшой интерес к сексу.' },
        { value: '2', text: 'Потерял значительный интерес к сексу.' },
        { value: '3', text: 'Совсем не интересуюсь сексом.' },
      ],
    },
    {
      id: 'physicalSymptoms',
      text: 'Испытываешь ли ты физические симптомы (физические симптомы)?',
      options: [
        { value: '0', text: 'Не испытываю новых физических симптомов.' },
        { value: '1', text: 'Испытываю лёгкие физические симптомы (например, боли, дискомфорт).' },
        { value: '2', text: 'Испытываю умеренные физические симптомы, которые мешают.' },
        { value: '3', text: 'Испытываю серьёзные физические симптомы, которые сильно мешают.' },
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

    if (totalScore <= 13) {
      recommendation = {
        level: 'Минимальные признаки депрессии',
        package: 'Бесплатный Вводный Пакет',
        packageLink: '/free-package',
        description: 'Твоё эмоциональное состояние выглядит стабильным. Наш бесплатный вводный пакет поможет тебе укрепить внутреннее спокойствие и осознанность.',
      };
    } else if (totalScore <= 28) {
      recommendation = {
        level: 'Лёгкие или умеренные признаки депрессии',
        package: 'Базовый Пакет',
        packageLink: '/our-service',
        description: 'Ты можешь испытывать лёгкие или умеренные признаки депрессии. Наш базовый пакет поможет тебе справиться с этими чувствами и вернуть внутренний баланс.',
      };
    } else {
      recommendation = {
        level: 'Серьёзные признаки депрессии',
        package: 'Расширенный Пакет',
        packageLink: '/our-service',
        description: 'Ты можешь испытывать серьёзные признаки депрессии. Наш расширенный пакет предложит тебе более глубокую поддержку и сопровождение.',
      };
    }

    setResult({ score: totalScore, recommendation });
  };

  const closeTest = () => {
    setCurrentQuestionIndex(0);
    setAnswers({
      sadness: null,
      pessimism: null,
      pastFailure: null,
      lossOfPleasure: null,
      guiltyFeelings: null,
      punishmentFeelings: null,
      selfDislike: null,
      selfCriticalness: null,
      suicidalThoughts: null,
      crying: null,
      agitation: null,
      lossOfInterest: null,
      indecisiveness: null,
      worthlessness: null,
      lossOfEnergy: null,
      changesInSleeping: null,
      changesInAppetite: null,
      concentrationDifficulty: null,
      tiredness: null,
      lossOfInterestInSex: null,
      physicalSymptoms: null,
    });
    setResult(null);
    setShowShareOptions(false);
  };

  const toggleShareOptions = () => {
    setShowShareOptions(!showShareOptions);
  };

  const shareViaEmail = () => {
    if (!result) return;
    const subject = 'Мои результаты теста: Шкала депрессии Бека, BDI';
    const body = `Твой балл: ${result.score} из 63\nУровень: ${result.recommendation.level}\nРекомендация: ${result.recommendation.description}\nПредлагаемый пакет: ${result.recommendation.package}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const shareViaWhatsApp = () => {
    if (!result) return;
    const text = `Мои результаты теста: Шкала депрессии Бека, BDI\nТвой балл: ${result.score} из 63\nУровень: ${result.recommendation.level}\nРекомендация: ${result.recommendation.description}\nПредлагаемый пакет: ${result.recommendation.package}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const printResult = () => {
    if (!result) return;
    const printContent = `
      <h3 class="text-xl font-playfair text-[#143B64] mb-4">Результаты теста: Шкала депрессии Бека, BDI</h3>
      <p class="text-base text-[#2F4C66] mb-2"><strong>Твой балл:</strong> ${result.score} из 63</p>
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
              Шкала депрессии Бека, BDI
            </h3>
            <p className="text-sm text-gray-600 mb-4 font-playfair">
              онлайн-тест | 21 пункт | около 4 минут
            </p>
            <p className="text-base md:text-lg text-[#2F4C66] font-playfair leading-relaxed mb-4">
              Чувствуешь усталость, апатию или потерю интереса к жизни? Иногда нам просто нужно понять, что происходит внутри. Пройди короткий тест и узнай, нуждаешься ли ты в профессиональной поддержке или можешь самостоятельно начать мягкую работу над собой. Это первый шаг к ясности. Ты не один(а) — мы рядом, чтобы помочь.
            </p>
            <div className="bg-[#f2f1f0] p-6 rounded-lg min-h-[350px] overflow-auto">
              {result ? (
                <div>
                  <p className="text-lg font-playfair text-[#dbad9a] mb-2"><strong>Твой балл:</strong></p>
                  <div className="relative w-full h-6 bg-gray-200 rounded-full mb-2">
                    <div
                      className="absolute top-0 left-0 h-full rounded-full"
                      style={{
                        width: `${(result.score / 63) * 100}%`,
                        backgroundColor: result.score <= 13 ? '#558239' : result.score <= 28 ? '#e0be60' : '#9e4021',
                      }}
                    ></div>
                    <span
                      className="absolute top-1/2 transform -translate-y-1/2 text-sm font-playfair text-[#143B64]"
                      style={{ left: `${(result.score / 63) * 100}%`, transform: 'translateX(-50%)' }}
                    >
                      {result.score}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <span>0</span>
                    <span>63</span>
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
                <strong>Автор:</strong> Аарон Бек (1961, 1978)
              </p>
              <p className="text-sm mb-2">
                Тест предоставляется исключительно в образовательных и развлекательных целях. Он не предназначен для психологических консультаций любого рода и не гарантирует точности или достоверности. Оценка бесплатна и анонимна. Вы можете сохранить прямую ссылку на свои результаты.
              </p>
              <p className="text-sm mb-2">
                <strong>Ссылки:</strong><br />
                <Link
                  href="https://en.wikipedia.org/wiki/Beck_Depression_Inventory"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8EB5BA] hover:underline"
                >
                  А. Т. Бек, Р. А. Стир, М. Г. Карбин. Психометрические свойства Инвентаря депрессии Бека: двадцать пять лет оценки // Обзор клинической психологии, 1988. 8(1).
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