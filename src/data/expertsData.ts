
export interface Expert {
  id: number;
  name: string;
  title: string;
  category: string;
  image: string;
  alt: string;
  profileLink: string;
  availability: { [date: string]: string[] };
  certifications?: { title: string; institution: string; year: number; pdf?: string; image?: string }[];
  experience?: { position: string; company: string; years: string; description?: string }[];
  skills?: string[];
  publications?: { title: string; year: number; link?: string }[];
}

export const expertsData: Expert[] = [
  {
    id: 1,
    name: "Виктория Котенко",
    title: "Психолог-консультант",
    category: "Сертифицированный психотерапевт, эксперт по управлению стрессом и эмоциональной устойчивости",
    image: "/images/councillors/VK/Viktoriia Kotenko.jpg",
    alt: "Виктория Котенко",
    profileLink: "/experts/viktoriia-kotenko",
    availability: {
      "2025-05-28": ["09:00", "10:00", "11:00", "14:00", "15:00"],
      "2025-05-29": ["10:00", "12:00", "14:00", "16:00"],
      "2025-05-30": ["09:30", "11:30", "13:30"],
    },
    certifications: [
      {
        title: "Магистерский диплом по социальным и поведенческим наукам / Психология",
        institution: "Сумской государственный педагогический университет",
        year: 2014,
        image: "/images/councillors/VK/magisterskiy_diplom_psikhologiya.jpg",
      },
      {
        title: "Основы гештальт-терапии",
        institution: "Международный институт психологии",
        year: 2023,
        image: "/images/councillors/VK/Основы гештальт-терапии.jpg",
      },
      {
        title: "Теория и практика психологического консультирования",
        institution: "Сумской государственный педагогический университет",
        year: 2024,
        image: "/images/councillors/VK/teoriya_i_praktika_psikhologicheskogo.jpg",
      },
      {
        title: "Миф об 'идеальной паре': Психоаналитическая работа с парами",
        institution: "Международный институт психологии",
        year: 2025,
        image: "/images/councillors/VK/mif_ob_idealnoy_pare.jpg",
      },
      {
        title: "Основы когнитивно-поведенческой терапии: ОКР, ГТР, перфекционизм",
        institution: "Международный институт психологии",
        year: 2024,
        image: "/images/councillors/VK/kognitivno-povedencheskoy.jpg",
      },
      {
        title: "Основы психоанализа",
        institution: "Международный институт психологии",
        year: 2023,
        image: "/images/councillors/VK/Основы психоанализа.jpg",
      },
      {
        title: "Личность в кризисных и критических состояниях",
        institution: "Сумской государственный педагогический университет",
        year: 2024,
        image: "/images/councillors/VK/lichnost_v_krizisnykh.jpg",
      },
      {
        title: "Помощь при депрессивных и тревожных состояниях",
        institution: "Международный институт психологии",
        year: 2024,
        image: "/images/councillors/VK/pomoshch_pri_depressivnykh.jpg",
      },
      {
        title: "Психология эффективной коммуникации",
        institution: "Международный институт психологии",
        year: 2023,
        image: "/images/councillors/VK/psikhologiya_effektivnoy_kommunikatsii.jpg",
      },
      {
        title: "Основы современной психосоматики",
        institution: "Международный институт психологии",
        year: 2023,
        image: "/images/councillors/VK/osnovy_sovremennoy_psikhosomatiki.jpg",
      },
      {
        title: "Работа с психотравмой: Травма, ПТСР, экстренная помощь",
        institution: "Международный институт психологии",
        year: 2024,
        image: "/images/councillors/VK/rabota_s_psikhotravmoy_travma.jpg",
      },
      {
        title: "Сертификат по типам привязанности",
        institution: "Неизвестное учреждение",
        year: 2023,
        pdf: "/images/councillors/VK/Attachment types.pdf",
        image: "/images/councillors/VK/sertifikat_po_tipam_privyazannosti.jpg",
      },
    ],
    experience: [
      {
        position: "Психолог",
        company: "Частный кабинет",
        years: "2020 - Настоящее время",
        description: "Оказание консультационных услуг для индивидуумов и пар, с акцентом на управление стрессом и психотравмой.",
      },
      {
        position: "Финансовый аналитик",
        company: "Компания ABC",
        years: "2015 - 2019",
        description: "Анализ данных и создание финансовых отчетов.",
      },
    ],
    skills: [
      "Когнитивно-поведенческая терапия",
      "Психотравма",
      "Консультирование пар",
      "Психосоматика",
    ],
    publications: [
      {
        title: "Влияние психотравмы на отношения пар",
        year: 2022,
        link: "https://example.com/publication1",
      },
    ],
  },
  {
    id: 2,
    name: "Тамара Кушина",
    title: "Интегративный психолог",
    category: "Гипнолог, RPT-терапевт",
    image: "/images/councillors/Tamara Kushina/Tamara Kushina1.jpg",
    alt: "Тамара Кушина",
    profileLink: "/experts/tamara-kushina",
    availability: {
      "2025-05-28": ["10:00", "11:00", "13:00", "16:00"],
      "2025-05-29": ["09:00", "11:00", "14:00"],
      "2025-05-30": ["10:30", "12:30", "15:30"],
    },
    certifications: [
      {
        title: "Гипнотерапия",
        institution: "Международный институт гипнотерапии",
        year: 2019,
      },
      {
        title: "RPT-терапия",
        institution: "RPT International",
        year: 2021,
      },
    ],
    experience: [
      {
        position: "Психолог",
        company: "Центр холистической терапии",
        years: "2018 - Настоящее время",
        description: "Применение гипнотерапии и RPT для решения эмоциональных проблем.",
      },
    ],
    skills: ["Гипнотерапия", "RPT-терапия", "Холистический подход"],
    publications: [],
  },
  {
    id: 3,
    name: "Наталия Ахтырко",
    title: "Психолог, сексолог",
    category: "Педагог, интегративный подход",
    image: "/images/councillors/natalia-ahtyrko/natalia-ahtyrko.jpg",
    alt: "Наталия Ахтырко",
    profileLink: "/experts/natalia-ahtyrko",
    availability: {
      "2025-05-28": ["09:30", "12:00", "14:30", "17:00"],
      "2025-05-29": ["10:00", "12:00", "15:00"],
      "2025-05-30": ["11:00", "13:00", "16:00"],
    },
    certifications: [
      {
        title: "Психология",
        institution: "Афинский университет",
        year: 2018,
      },
      {
        title: "Терапия пар",
        institution: "Греческий институт психотерапии",
        year: 2020,
      },
    ],
    experience: [
      {
        position: "Психолог",
        company: "Центр психического здоровья",
        years: "2019 - Настоящее время",
        description: "Поддержка людей с тревожными расстройствами и депрессией.",
      },
    ],
    skills: ["Психология", "Терапия пар", "Управление стрессом"],
    publications: [],
  },
];