"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import SelfImprovementPromptVariant from '@/components/SelfImprovementPromptVariant';
import ProfileHeader from '@/components/ProfileHeader';
import Footer from '@/components/Footer';

// Define interface for material data with url
interface Material {
  id: number;
  title: string;
  category: string;
  subcategory: string;
  author: string;
  price: string;
  description: string;
  url: string;
}

// Truncate function to limit the length of author names
const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Data for materials
const materialsData: Material[] = [
  {
    id: 1,
    title: "Breathing Exercises for Calmness",
    category: "Mindfulness",
    subcategory: "Breathing",
    author: "Dr. John Smith",
    price: "Бесплатно",
    description: "Simple breathing exercises to reduce stress.",
    url: "/self-knowledge-space",
  },
  {
    id: 2,
    title: "Emotional Intelligence Mastery",
    category: "Self-Reflection",
    subcategory: "Emotional Intelligence",
    author: "Dr. Emily White",
    price: "Платно",
    description: "Master your emotional intelligence for better relationships.",
    url: "/self-knowledge-space",
  },
  {
    id: 3,
    title: "Опросник стиля привязанности. ASQ",
    category: "Self-Assessment",
    subcategory: "Attachment Style",
    author: "J. Feeney et al. (1994)",
    price: "Бесплатно",
    description: "Как ты выстраиваешь отношения — и что за этим стоит? Опросник стиля привязанности поможет лучше понять, как ты взаимодействуешь с окружающими и какие психологические механизмы лежат в основе твоего поведения. Это инструмент самодиагностики, основанный на теории привязанности, который даст ценные инсайты о твоих привычных моделях в отношениях. Пройди тест — и начни менять свою жизнь к лучшему.",
    url: "/PsychologyTests/AttachmentStyleQuestionnaire",
  },
  {
    id: 4,
    title: "Шкала депрессии Бека, BDI",
    category: "Self-Assessment",
    subcategory: "Depression",
    author: "Аарон Бек (1961, 1978)",
    price: "Бесплатно",
    description: "Чувствуешь усталость, апатию или потерю интереса к жизни? Пройди короткий тест и узнай, нуждаешься ли ты в профессиональной поддержке или можешь самостоятельно начать мягкую работу над собой.",
    url: "/PsychologyTests/BecksDepressionInventory",
  },
  {
    id: 5,
    title: "ACT-тест: оценка психологической гибкости и ориентации на ценности, CompACT",
    category: "Self-Assessment",
    subcategory: "Psychological Flexibility",
    author: "A. Francis, D. Dawson, N. Golijani-Moghaddam (2016)",
    price: "Бесплатно",
    description: "Оцени свой уровень психологической гибкости с помощью теста, основанного на Acceptance and Commitment Therapy (ACT). Узнай, как ты справляешься с трудностями и следуешь своим ценностям.",
    url: "/PsychologyTests/CompACT",
  },
  {
    id: 6,
    title: "Шкала общей самоэффективности, GSE",
    category: "Self-Assessment",
    subcategory: "Self-Efficacy",
    author: "Ральф Шварцер и Маттиас Иерусалем (1995)",
    price: "Бесплатно",
    description: "Оцени свою уверенность в способности справляться с различными жизненными ситуациями. Узнай, насколько ты веришь в свои силы, и получи рекомендации для их укрепления.",
    url: "/PsychologyTests/GeneralSelfEfficacyScale",
  },
  {
    id: 7,
    title: "Оценка удовлетворенности браком, MSA",
    category: "Self-Assessment",
    subcategory: "Marital Satisfaction",
    author: "В. В. Сталин, Т. Л. Романова, Г. П. Бутенко",
    price: "Бесплатно",
    description: "Оцени уровень гармонии и взаимопонимания в твоем браке. Пройди тест, чтобы понять, насколько ты удовлетворен отношениями, и получи рекомендации для их укрепления.",
    url: "/PsychologyTests/MaritalSatisfactionAssessment",
  },
  {
    id: 8,
    title: "Опросник шкал привязанности (RSQ)",
    category: "Self-Assessment",
    subcategory: "Attachment Style",
    author: "John Bowlby (1988)",
    price: "Бесплатно",
    description: "Опросник шкал привязанности (RSQ) — валидированный психодиагностический инструмент, разработанный на основе теории привязанности взрослых (Bartholomew & Horowitz). Он предназначен для оценки индивидуальных различий в стилях привязанности, включая степень комфорта с эмоциональной близостью, склонность к избеганию и тревожности в отношениях. RSQ позволяет определить преобладающий стиль привязанности (безопасный, озабоченный, отвергающий или боязливо-избегающий), что даёт основу для более глубокого понимания паттернов межличностного взаимодействия. Пройди тест — и получи интерпретацию результатов с профессиональными рекомендациями по развитию устойчивых и осознанных форм привязанности.",
    url: "/PsychologyTests/RelationshipScalesQuestionnaire",
  },
  {
    id: 9,
    title: "Шкала самооценки Робсона, RSCQ",
    category: "Self-Assessment",
    subcategory: "Self-Esteem",
    author: "P. Robson (1989)",
    price: "Бесплатно",
    description: "Как ты воспринимаешь себя — и как это влияет на твою жизнь? Шкала самооценки Робсона поможет выявить уровень уверенности в себе и степень удовлетворённости собой в разных сферах. Это валидный психологический инструмент, который отражает, насколько твой внутренний образ себя поддерживает тебя — или наоборот, ограничивает. Пройди тест — и начни путь к устойчивой, здоровой самооценке и внутренней опоре.",
    url: "/PsychologyTests/RobsonSelfConceptQuestionnaire",
  },
  {
    id: 10,
    title: "Шкала самооценки Розенберга, RSES",
    category: "Self-Assessment",
    subcategory: "Self-Esteem",
    author: "M. Rosenberg (1965)",
    price: "Бесплатно",
    description: "Насколько ты уверен(а) в себе — и как это влияет на твои решения, отношения и эмоциональное состояние? Шкала самооценки Розенберга — один из самых широко используемых и валидированных психологических тестов в мире. Она оценивает общее чувство собственного достоинства и отношение человека к самому себе. Самооценка влияет на всё: от выбора партнёра и карьерных шагов до способности справляться с критикой и стрессом. Пройди тест — и получи релевантные рекомендации, с чего начать укрепление своей самооценки и внутренней опоры.",
    url: "/PsychologyTests/RosenbergSelfEsteemScale",
  },
  {
    id: 11,
    title: "Шкала руминативных реакций (RRS)",
    category: "Self-Assessment",
    subcategory: "Rumination",
    author: "S. Nolen-Hoeksema et al. (1999)",
    price: "Бесплатно",
    description: "Этот тест помогает выявить склонность к руминации — привычке застревать в негативных мыслях и переживаниях, которая усиливает стресс и повышает риск депрессии. Тест позволяет оценить, насколько часто ты возвращаешься к одним и тем же мыслям, пытаясь «пережёвывать» проблему, вместо того чтобы двигаться вперёд. Пройди тест — и получи рекомендации, которые помогут выйти из замкнутого круга мыслей и освободить ментальное пространство для жизни.",
    url: "/PsychologyTests/RRS",
  },
  {
    id: 12,
    title: "Шкала Самосострадания, SCS",
    category: "Self-Assessment",
    subcategory: "Self-Compassion",
    author: "Kristin Neff (2003)",
    price: "Бесплатно",
    description: "Шкала самосострадания — валидированная методика, разработанная психологом Кристин Нефф, которая оценивает, как ты относишься к себе в трудные моменты. Исследования показывают, что высокий уровень самосострадания связан с улучшением психоэмоционального состояния, снижением тревожности и депрессии, а также повышением устойчивости к стрессу. Пройди тест — и получи рекомендации, которые помогут укрепить твою внутреннюю опору и благополучие.",
    url: "/PsychologyTests/SelfCompassionScale",
  },
  {
    id: 13,
    title: "Цветовой тест Люшера",
    category: "Self-Assessment",
    subcategory: "Emotional State",
    author: "Max Luscher (1948, 1969)",
    price: "Бесплатно",
    description: "Диагностика стресса и эмоционального состояния по реакции на цвет. Цветовой тест Люшера — проективная методика, которая помогает выявить уровень стресса, скрытые эмоциональные напряжения и внутренние конфликты. Он основан на подсознательной реакции на цвет, минуя рациональные фильтры. Пройди тест — и получи объективный взгляд на своё психоэмоциональное состояние с рекомендациями, как восстановить внутренний баланс.",
    url: "/PsychologyTests/LuscherColorTest",
  }
];

export default function SelfKnowledgeSpace() {
  // Αρχικοποίηση με προεπιλεγμένη τιμή, χωρίς να χρησιμοποιούμε localStorage άμεσα
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");
  const [selectedAuthor, setSelectedAuthor] = useState<string>("");
  const [selectedPriceType, setSelectedPriceType] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // Χρησιμοποίηση useEffect για ανάγνωση από το localStorage μόνο στο client-side
  useEffect(() => {
    const storedLoginState = localStorage.getItem("isLoggedIn");
    if (storedLoginState === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  // Extract unique categories, subcategories, authors, and price types for filters
  const categories = useMemo(() => [...new Set(materialsData.map(item => item.category))], []);
  const subcategories = useMemo(() => [...new Set(materialsData.map(item => item.subcategory))], []);
  const authors = useMemo(() => [...new Set(materialsData.map(item => item.author))], []);
  const priceTypes = useMemo(() => [...new Set(materialsData.map(item => item.price))], []);

  // Filter materials based on search criteria using useMemo for optimization
  const filteredMaterials = useMemo(() => {
    let filtered = materialsData;

    if (searchQuery) {
      const query = searchQuery.trim().toLowerCase();
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (selectedSubcategory) {
      filtered = filtered.filter(item => item.subcategory === selectedSubcategory);
    }

    if (selectedAuthor) {
      filtered = filtered.filter(item => item.author === selectedAuthor);
    }

    if (selectedPriceType) {
      filtered = filtered.filter(item => item.price === selectedPriceType);
    }

    console.log('Filtered Materials:', filtered); // Debugging log
    return filtered;
  }, [searchQuery, selectedCategory, selectedSubcategory, selectedAuthor, selectedPriceType]);

  // Split materials into columns (3 columns for lg, 2 for sm, 1 for mobile)
  const columns = useMemo(() => {
    const col1: Material[] = [];
    const col2: Material[] = [];
    const col3: Material[] = [];

    filteredMaterials.forEach((material, index) => {
      if (index % 3 === 0) col1.push(material);
      else if (index % 3 === 1) col2.push(material);
      else col3.push(material);
    });

    console.log('Columns:', { col1, col2, col3 }); // Debugging log
    return [col1, col2, col3];
  }, [filteredMaterials]);

  // Email validation
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle login with validation
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;

    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (isValid) {
      setIsLoggedIn(true);
      setShowRegisterModal(false);
      // Χρησιμοποίηση localStorage μόνο στο client-side
      if (typeof window !== 'undefined') {
        localStorage.setItem("isLoggedIn", "true");
      }
    }
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
    setEmailError("");
    setPasswordError("");
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedSubcategory("");
    setSelectedAuthor("");
    setSelectedPriceType("");
    // Χρησιμοποίηση localStorage μόνο στο client-side
    if (typeof window !== 'undefined') {
      localStorage.removeItem("isLoggedIn");
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#f2f1f0]">
      {/* ProfileHeader */}
      <div className="fixed top-0 left-0 right-0 z-20">
        <ProfileHeader setMenuOpen={setIsMenuOpen} />
      </div>

      {/* Modal for registration/login (kept for future use but not rendered) */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[rgba(237,191,171,0.2)] p-8 rounded-lg shadow-lg w-full max-w-md transform transition-all duration-300 scale-95 hover:scale-100">
            <h2 className="text-2xl font-playfair font-bold mb-6 text-center text-[#143B64]">
              Register / Login
            </h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-[#143B64] font-playfair mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError("");
                  }}
                  className="w-full p-2 border border-gray-300 rounded-[8px] focus:outline-none focus:border-[#8EB5BA]"
                  required
                />
                {emailError && (
                  <p className="text-red-500 text-sm mt-1">{emailError}</p>
                )}
              </div>
              <div className="mb-6">
                <label className="block text-[#143B64] font-playfair mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError("");
                  }}
                  className="w-full p-2 border border-gray-300 rounded-[8px] focus:outline-none focus:border-[#8EB5BA]"
                  required
                />
                {passwordError && (
                  <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-[#8EB5BA] text-white rounded-[30px] font-playfair transition-colors duration-300 hover:bg-[#edbfab] hover:text-[#143B64] shadow-md"
              >
                Register / Login
              </button>
            </form>
            <button
              type="button"
              onClick={() => setShowRegisterModal(false)}
              className="w-full mt-3 text-[#143B64] font-playfair hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Main content */}
      <div
        className="flex-grow max-w-[1120px] mx-auto px-4 py-8"
        style={{ marginTop: isMenuOpen ? '288px' : '96px' }}
      >
        {/* Temporarily bypass login requirement for development */}
        <>
          {/* Show SelfImprovementPromptVariant for all users */}
          <div className="text-center mb-4">
            <SelfImprovementPromptVariant />
          </div>

          {/* Show content regardless of login status */}
          <>
            {/* Logout button (optional during development) */}
            <div className="text-right mb-4">
              <button
                onClick={handleLogout}
                className="text-[#143B64] font-playfair hover:underline"
              >
                Выход (Режим разработки)
              </button>
            </div>

            {/* Search filters */}
            <div className="mb-2 flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Поиск материалов..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-[8px] focus:outline-none focus:border-[#8EB5BA]"
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-40 p-2 border border-gray-300 rounded-[8px] focus:outline-none focus:border-[#8EB5BA]"
              >
                <option value="">Все категории</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
              <select
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
                className="w-40 p-2 border border-gray-300 rounded-[8px] focus:outline-none focus:border-[#8EB5BA]"
              >
                <option value="">Все подкатегории</option>
                {subcategories.map((subcategory, index) => (
                  <option key={index} value={subcategory}>{subcategory}</option>
                ))}
              </select>
              <select
                value={selectedAuthor}
                onChange={(e) => setSelectedAuthor(e.target.value)}
                className="w-40 p-2 border border-gray-300 rounded-[8px] focus:outline-none focus:border-[#8EB5BA]"
              >
                <option value="">Все авторы</option>
                {authors.map((author, index) => (
                  <option key={index} value={author}>{truncateText(author, 25)}</option>
                ))}
              </select>
              <select
                value={selectedPriceType}
                onChange={(e) => setSelectedPriceType(e.target.value)}
                className="w-40 p-2 border border-gray-300 rounded-[8px] focus:outline-none focus:border-[#8EB5BA]"
              >
                <option value="">Все типы цен</option>
                {priceTypes.map((price, index) => (
                  <option key={index} value={price}>{price}</option>
                ))}
              </select>
            </div>

            {/* Display materials in separate columns */}
            <div className="flex flex-col sm:flex-row gap-2">
              {columns.map((column, colIndex) => (
                <div key={colIndex} className="flex-1 flex flex-col gap-2">
                  {column.map((material) => (
                    <Link href={material.url} key={material.id} className="block">
                      <div className="bg-white p-4 rounded-lg transition-shadow relative hover:bg-gray-50 min-h-[200px]">
                        <h3 className="text-xl font-bold mb-2">{material.title}</h3>
                        <p className="text-sm text-gray-600 mb-2 leading-tight line-clamp-3">{material.description}</p>
                        <p className="text-xs text-gray-500 mb-1 leading-tight">
                          Категория: {material.category} | Подкатегория: {material.subcategory}
                        </p>
                        <p className="text-xs text-gray-500 mb-1 leading-tight">Автор: {material.author}</p>
                        <p className="text-sm font-bold mb-2 leading-tight">
                          {material.price ? (
                            <span
                              className="inline-block px-2 py-2 rounded-lg font-playfair"
                              style={{
                                backgroundColor: material.price.trim().toLowerCase() === "бесплатно" ? '#edbfab' : 'transparent',
                                color: material.price.trim().toLowerCase() === "бесплатно" ? '#FFFFFF' : '#8EB5BA',
                                display: 'inline-block',
                                opacity: 1,
                                visibility: 'visible',
                              }}
                            >
                              {material.price}
                            </span>
                          ) : (
                            <span
                              className="inline-block px-2 py-2 rounded-lg font-playfair italic"
                              style={{ color: '#8EB5BA', display: 'inline-block', opacity: 1, visibility: 'visible' }}
                            >
                              Цена не указана
                            </span>
                          )}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ))}
            </div>
            {filteredMaterials.length === 0 && (
              <p className="col-span-full text-center text-gray-500 font-playfair">
                Материалы, соответствующие вашим критериям, не найдены.
              </p>
            )}
          </>
        </>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}