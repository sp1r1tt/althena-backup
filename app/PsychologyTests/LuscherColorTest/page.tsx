"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import ProfileHeader from '@/components/ProfileHeader';

// Define interface for color and result
interface Color {
  name: string;
  color: string;
  meaning: string;
}

interface Result {
  firstSelections: string[];
  secondSelections: string[];
  description: string;
  recommendation: {
    level: string;
    package: string;
    packageLink: string;
    description: string;
  };
}

export default function LuscherColorTest() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [phase, setPhase] = useState<number>(1); // 1 for first selection, 2 for second selection
  const [firstSelections, setFirstSelections] = useState<string[]>([]);
  const [secondSelections, setSecondSelections] = useState<string[]>([]);
  const [result, setResult] = useState<Result | null>(null);
  const [showShareOptions, setShowShareOptions] = useState<boolean>(false);

  // Τα 8 χρώματα του Luscher Color Test
  const colors: Color[] = [
    { name: 'Синий', color: '#0000FF', meaning: 'Спокойствие, гармония' },
    { name: 'Зеленый', color: '#008000', meaning: 'Уверенность, настойчивость' },
    { name: 'Красный', color: '#FF0000', meaning: 'Энергия, страсть' },
    { name: 'Желтый', color: '#FFFF00', meaning: 'Оптимизм, радость' },
    { name: 'Фиолетовый', color: '#800080', meaning: 'Интроспекция, творчество' },
    { name: 'Коричневый', color: '#8B4513', meaning: 'Стабильность, комфорт' },
    { name: 'Черный', color: '#000000', meaning: 'Сила, протест' },
    { name: 'Серый', color: '#808080', meaning: 'Нейтральность, отстраненность' },
  ];

  // Debugging log για τα χρώματα
  console.log('All Colors:', colors);

  // Τα χρώματα που απομένουν για επιλογή
  const remainingColors = phase === 1
    ? colors.filter(color => !firstSelections.includes(color.name))
    : colors.filter(color => !secondSelections.includes(color.name));
  console.log('Phase:', phase);
  console.log('First Selections:', firstSelections);
  console.log('Second Selections:', secondSelections);
  console.log('Remaining Colors:', remainingColors);

  const handleColorSelect = (colorName: string) => {
    if (phase === 1) {
      const newFirstSelections = [...firstSelections, colorName];
      console.log('New First Selections after click:', newFirstSelections);
      setFirstSelections(newFirstSelections);

      if (newFirstSelections.length === colors.length) {
        console.log('Phase 1 completed, moving to Phase 2');
        setPhase(2);
        setSecondSelections([]); // Ensure secondSelections is reset
      }
    } else {
      const newSecondSelections = [...secondSelections, colorName];
      console.log('New Second Selections after click:', newSecondSelections);
      setSecondSelections(newSecondSelections);

      if (newSecondSelections.length === colors.length) {
        console.log('Phase 2 completed, calculating result');
        calculateResult(firstSelections, newSecondSelections);
      }
    }
  };

  const calculateResult = (first: string[], second: string[]) => {
    const primaryFirst = first[0]; // Πρώτο χρώμα στην πρώτη φάση
    const secondaryFirst = first[1]; // Δεύτερο χρώμα στην πρώτη φάση
    const leastFirst = first[first.length - 1]; // Τελευταίο χρώμα στην πρώτη φάση
    const primarySecond = second[0]; // Πρώτο χρώμα στη δεύτερη φάση
    const leastSecond = second[second.length - 1]; // Τελευταίο χρώμα στη δεύτερη φάση

    const primaryFirstMeaning = colors.find(c => c.name === primaryFirst)?.meaning || '';
    const secondaryFirstMeaning = colors.find(c => c.name === secondaryFirst)?.meaning || '';
    const leastFirstMeaning = colors.find(c => c.name === leastFirst)?.meaning || '';
    const primarySecondMeaning = colors.find(c => c.name === primarySecond)?.meaning || '';
    const leastSecondMeaning = colors.find(c => c.name === leastSecond)?.meaning || '';

    let description = '';
    let recommendation = {
      level: '',
      package: '',
      packageLink: '',
      description: '',
    };

    // Ελέγχουμε αν οι επιλογές είναι ίδιες ή πολύ παρόμοιες (συναισθηματική ακαμψία)
    const areSelectionsSimilar = first.every((color, index) => color === second[index]);

    if (areSelectionsSimilar) {
      description = `Твои выборы в обеих фазах теста очень похожи, что может указывать на эмоциональную негибкость и ригидное отношение к жизни. Ты склонен к последовательности и стабильности, но это может ограничивать твою способность адаптироваться к изменениям. В первой фазе ты выбрал ${primaryFirst} и ${secondaryFirst}, что отражает стремление к ${primaryFirstMeaning.toLowerCase()} и ${secondaryFirstMeaning.toLowerCase()}. Ты избегаешь ${leastFirstMeaning.toLowerCase()}.`;
      recommendation = {
        level: 'Эмоциональная негибкость',
        package: 'Расширенный Пакет',
        packageLink: '/our-service',
        description: 'Твоя ригидность может создавать внутреннее напряжение. Наш расширенный пакет поможет тебе развить эмоциональную гибкость и адаптивность.',
      };
    } else {
      // Ερμηνεία με βάση τις πρώτες και τελευταίες επιλογές
      if (['Синий', 'Зеленый'].includes(primaryFirst) && ['Синий', 'Зеленый'].includes(primarySecond)) {
        description = `Ты склонен к спокойствию и стабильности. Твоя личность отражает стремление к гармонии и уверенности. В первой фазе ты выбрал ${primaryFirst} и ${secondaryFirst}, что отражает стремление к ${primaryFirstMeaning.toLowerCase()} и ${secondaryFirstMeaning.toLowerCase()}. Во второй фазе ты выбрал ${primarySecond}, подтверждая твою склонность к ${primarySecondMeaning.toLowerCase()}. Ты избегаешь ${leastSecondMeaning.toLowerCase()}.`;
        recommendation = {
          level: 'Сбалансированное эмоциональное состояние',
          package: 'Бесплатный Вводный Пакет',
          packageLink: '/free-package',
          description: 'У тебя сбалансированное эмоциональное состояние! Наш бесплатный вводный пакет поможет тебе поддерживать внутреннюю гармонию.',
        };
      } else if (['Красный', 'Желтый'].includes(primaryFirst) || ['Красный', 'Желтый'].includes(primarySecond)) {
        description = `Ты энергичен и полон жизни. Твоя личность отражает страсть и оптимизм. В первой фазе ты выбрал ${primaryFirst} и ${secondaryFirst}, что отражает стремление к ${primaryFirstMeaning.toLowerCase()} и ${secondaryFirstMeaning.toLowerCase()}. Во второй фазе ты выбрал ${primarySecond}, показывая склонность к ${primarySecondMeaning.toLowerCase()}. Ты избегаешь ${leastSecondMeaning.toLowerCase()}.`;
        recommendation = {
          level: 'Высокая энергия и оптимизм',
          package: 'Базовый Пакет',
          packageLink: '/our-service',
          description: 'У тебя высокий уровень энергии и оптимизм. Наш базовый пакет поможет тебе направить эту энергию на достижение целей.',
        };
      } else if (['Фиолетовый', 'Коричневый'].includes(primaryFirst) || ['Фиолетовый', 'Коричневый'].includes(primarySecond)) {
        description = `Ты склонен к интроспекции и поиску комфорта. Твоя личность отражает творчество и стабильность. В первой фазе ты выбрал ${primaryFirst} и ${secondaryFirst}, что отражает стремление к ${primaryFirstMeaning.toLowerCase()} и ${secondaryFirstMeaning.toLowerCase()}. Во второй фазе ты выбрал ${primarySecond}, показывая склонность к ${primarySecondMeaning.toLowerCase()}. Ты избегаешь ${leastSecondMeaning.toLowerCase()}.`;
        recommendation = {
          level: 'Интроспективное состояние',
          package: 'Расширенный Пакет',
          packageLink: '/our-service',
          description: 'Ты склонен к глубоким размышлениям. Наш расширенный пакет поможет тебе лучше понять свои эмоции и найти внутренний баланс.',
        };
      } else {
        description = `Ты находишься в состоянии, где преобладает нейтральность или протест. В первой фазе ты выбрал ${primaryFirst} и ${secondaryFirst}, что отражает стремление к ${primaryFirstMeaning.toLowerCase()} и ${secondaryFirstMeaning.toLowerCase()}. Во второй фазе ты выбрал ${primarySecond}, показывая склонность к ${primarySecondMeaning.toLowerCase()}. Ты избегаешь ${leastSecondMeaning.toLowerCase()}.`;
        recommendation = {
          level: 'Нейтральное или протестное состояние',
          package: 'Расширенный Пакет',
          packageLink: '/our-service',
          description: 'Ты можешь испытывать внутреннее напряжение. Наш расширенный пакет поможет тебе справиться с этим состоянием.',
        };
      }
    }

    setResult({
      firstSelections: first,
      secondSelections: second,
      description,
      recommendation,
    });
  };

  const closeTest = () => {
    setPhase(1);
    setFirstSelections([]);
    setSecondSelections([]);
    setResult(null);
    setShowShareOptions(false);
  };

  const toggleShareOptions = () => {
    setShowShareOptions(!showShareOptions);
  };

  const shareViaEmail = () => {
    if (!result) return;
    const subject = 'Мои результаты теста: Цветовой тест Люшера';
    const body = `Мой результат: ${result.description}\nРекомендация: ${result.recommendation.description}\nПредлагаемый пакет: ${result.recommendation.package}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const shareViaWhatsApp = () => {
    if (!result) return;
    const text = `Мои результаты теста: Цветовой тест Люшера\nМой результат: ${result.description}\nРекомендация: ${result.recommendation.description}\nПредлагаемый пакет: ${result.recommendation.package}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const printResult = () => {
    if (!result) return;
    const printContent = `
      <h3 class="text-xl font-playfair text-[#143B64] mb-4">Результаты теста: Цветовой тест Люшера</h3>
      <p class="text-base text-[#2F4C66] mb-2"><strong>Первая фаза выбора:</strong> ${result.firstSelections.join(', ')}</p>
      <p class="text-base text-[#2F4C66] mb-2"><strong>Вторая фаза выбора:</strong> ${result.secondSelections.join(', ')}</p>
      <p class="text-base text-[#2F4C66] mb-2"><strong>Описание:</strong> ${result.description}</p>
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
              Цветовой тест Люшера
            </h3>
            <p className="text-sm text-gray-600 mb-4 font-playfair">
              онлайн-тест | 8 выборов | около 2 минут
            </p>
            <p className="text-base md:text-lg text-[#2F4C66] font-playfair leading-relaxed mb-4">
              Диагностика стресса и эмоционального состояния по реакции на цвет. Цветовой тест Люшера — проективная методика, которая помогает выявить уровень стресса, скрытые эмоциональные напряжения и внутренние конфликты. Он основан на подсознательной реакции на цвет, минуя рациональные фильтры. Пройди тест — и получи объективный взгляд на своё психоэмоциональное состояние с рекомендациями, как восстановить внутренний баланс.
            </p>
            <div className="p-5 md:p-4 bg-[#f2f1f0] rounded-lg mt-2.5 min-h-[350px] overflow-auto">
              {result ? (
                <div className="text-center">
                  <h3 className="text-lg md:text-xl font-semibold text-[#143B64] mb-3 font-playfair">
                    Результаты теста
                  </h3>
                  <p className="text-base text-[#2F4C66] font-playfair mb-2">
                    <strong>Первая фаза выбора:</strong> {result.firstSelections.join(', ')}
                  </p>
                  <p className="text-base text-[#2F4C66] font-playfair mb-2">
                    <strong>Вторая фаза выбора:</strong> {result.secondSelections.join(', ')}
                  </p>
                  <p className="text-base text-[#2F4C66] font-playfair mb-2">
                    <strong>Описание:</strong> {result.description}
                  </p>
                  <p className="text-base text-[#2F4C66] font-playfair mb-2">
                    <strong>Рекомендация:</strong> {result.recommendation.description}
                  </p>
                  <p className="text-base text-[#2F4C66] font-playfair">
                    <strong>Предлагаемый пакет:</strong>{' '}
                    <Link href={result.recommendation.packageLink} className="text-[#8EB5BA] hover:underline">
                      {result.recommendation.package}
                    </Link>
                  </p>
                  <div className="flex items-center justify-center gap-5 mt-5">
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
                <div className="mb-5">
                  <h3 className="text-lg md:text-base sm:text-base font-semibold text-[#143B64] mb-3 md:mb-2.5 font-playfair">
                    Выбери цвет, который тебе больше всего нравится сейчас ({phase === 1 ? firstSelections.length + 1 : secondSelections.length + 1}/{colors.length}) - Фаза {phase}
                  </h3>
                  <p className="text-base md:text-sm sm:text-[13px] text-[#2F4C66] font-playfair mb-3 md:mb-2.5">
                    Не ассоциируй цвет с чем-либо, например с одеждой, мебелью или автомобилями. Просто выбери цвет, к которому ты чувствуешь наибольшую симпатию.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 mt-5">
                    {remainingColors.length > 0 ? (
                      remainingColors.map((color, index) => (
                        <div
                          key={index}
                          style={{
                            backgroundColor: color.color,
                            width: '128px',
                            height: '228px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          className="md:w-[109px] md:h-[109px] sm:w-[85px] sm:h-[85px] transition-transform duration-200 hover:scale-110"
                          onClick={() => handleColorSelect(color.name)}
                        />
                      ))
                    ) : (
                      <p className="text-red-500 font-playfair">
                        Ошибка: Нет доступных цветов для выбора. Пожалуйста, перезапусти тест.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="text-[#2F4C66] font-playfair">
              <p className="text-sm mb-2">
                <strong>Автор:</strong> Max Luscher (1948, 1969)
              </p>
              <p className="text-sm mb-2">
                Тест предоставляется исключительно в образовательных и развлекательных целях. Он не предназначен для психологических консультаций любого рода и не гарантирует точности или достоверности. Оценка бесплатна и анонимна. Вы можете сохранить прямую ссылку на свои результаты.
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