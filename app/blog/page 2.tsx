"use client";

import React, { useState } from 'react';
import ProfileHeader from '@/components/ProfileHeader';
import BlogHeroSlider from '@/components/BlogHeroSlider';
import Filters from '@/components/Filters';
import Footer from '@/components/Footer'; // Εισαγωγή του Footer
import { expertsData } from '@/data/expertsData';

// Δεδομένα των blog posts (από το BlogGrid.tsx)
interface BlogPost {
  image: string;
  title: string;
  date: string;
  category: string;
  serviceCategories: string;
  author: string;
  slug: string;
}

// Δεδομένα για το πρώτο πλαίσιο από το CodependencyBlog
const author = expertsData.find(expert => expert.id === 1); // authorId: 1
const codependencyPost: BlogPost = {
  image: '/images/blog/blg001a.jpg',
  title: 'Созависимость: как распознать и выйти из нездоровых отношений',
  date: '5 ноября 2024',
  category: 'Отношения',
  serviceCategories: 'Отношения | Семейные отношения',
  author: author ? author.name : 'Άгνωсτος Συгγραφэас',
  slug: '/blog/blogPages/CodependencyBlog',
};

// Δεδομένα για το δεύτερο πλαίσιο από το SympathyEmpathyBlog
const sympathyEmpathyPost: BlogPost = {
  image: '/images/blog/blg006a.jpg',
  title: 'Сочувствие и эмпатия: в чём разница и почему это важно понимать',
  date: '22 ноября 2024',
  category: 'Отношения',
  serviceCategories: 'Отношения | Эмоциональный интеллект',
  author: author ? author.name : 'Άгνωсτος Συгγραφэас',
  slug: '/blog/blogPages/SympathyEmpathyBlog',
};

// Δεδομένα για το τρίτο πλαίσιο από το EffectiveCommunicationBlog
const effectiveCommunicationPost: BlogPost = {
  image: '/images/blog/blg008a.jpg',
  title: 'Эффективное общение: как говорить, чтобы быть услышанным',
  date: '15 декабря 2024',
  category: 'Отношения',
  serviceCategories: 'Отношения | Навыки общения',
  author: author ? author.name : 'Άгνωсτος Συгγραφэас',
  slug: '/blog/blogPages/EffectiveCommunicationBlog',
};

// Δεδομένα για το τέταρτο πλαίσιο από το MindfulnessBlog
const mindfulnessPost: BlogPost = {
  image: '/images/blog/blg003a.jpg',
  title: 'Майндфулнесс: внимание, которое лечит',
  date: '15 ноября 2024',
  category: 'Стресс / Тревога',
  serviceCategories: 'Управление стрессом | Психическое благополучие',
  author: author ? author.name : 'Άгνωсτος Συгγραφэас',
  slug: '/blog/blogPages/MindfulnessBlog',
};

// Δεδομένα για το πέμπτο πλαίσιο από το RuminationBlog
const ruminationPost: BlogPost = {
  image: '/images/blog/blg004a.jpg',
  title: 'Руминация: почему мы застреваем в мыслях и как это остановить',
  date: '18 ноября 2024',
  category: 'Стресс / Тревога',
  serviceCategories: 'Управление стрессом | Снятие тревоги',
  author: author ? author.name : 'Άгνωστος Συгγραφэас',
  slug: '/blog/blogPages/RuminationBlog',
};

// Δεδομένα για το έκτο πλαίσιο από το PsychosomaticsBlog
const psychosomaticsPost: BlogPost = {
  image: '/images/blog/blg005a.jpg',
  title: 'Психосоматика: как тело говорит о том, что не осознаёт разум',
  date: '20 ноября 2024',
  category: 'Стресс / Тревога',
  serviceCategories: 'Управление стрессом | Связь тела и разума',
  author: author ? author.name : 'Άгνωсτος Συгγραφэас',
  slug: '/blog/blogPages/PsychosomaticsBlog',
};

// Δεδομένα για το έβδομο πλαίσιο από το StressBlog
const stressPost: BlogPost = {
  image: '/images/blog/blg007a.jpg',
  title: 'Стресс: когда он помогает, а когда разрушает',
  date: '25 ноября 2024',
  category: 'Стресс / Тревога',
  serviceCategories: 'Управление стрессом | Снятие тревоги',
  author: author ? author.name : 'Άгνωсτος Συгγραφэас',
  slug: '/blog/blogPages/StressBlog',
};

// Δεδομένα για το όγδοо πλαίσιο από το SleepMentalHealthBlog
const sleepMentalHealthPost: BlogPost = {
  image: '/images/blog/blg009a.jpg',
  title: 'Как нарушение сна влияет на психическое здоровье: научный взгляд',
  date: '30 ноября 2024',
  category: 'Стресс / Тревога',
  serviceCategories: 'Психическое благополучие | Здоровье сна',
  author: author ? author.name : 'Άгνωсτος Συгγραφэас',
  slug: '/blog/blogPages/SleepMentalHealthBlog',
};

// Δεδομένα για το ένατο πλαίσιο από το EmotionalIntelligenceBlog
const emotionalIntelligencePost: BlogPost = {
  image: '/images/blog/blg002a.jpg',
  title: 'Эмоциональный интеллект: как понимать свои чувства и управлять ими',
  date: '7 ноября 2024',
  category: 'Уверенность в себе / Самооценка',
  serviceCategories: 'Эмоциональный интеллект | Самосознание',
  author: author ? author.name : 'Άгνωсτος Συгγραφэас',
  slug: '/blog/blogPages/EmotionalIntelligenceBlog',
};

// Placeholder δεδομένα για τα υπόλοιπα 3 πλαίσια
const placeholderPosts: BlogPost[] = Array(3).fill({
  image: '/images/placeholder.jpg',
  title: 'Τίτλος Άρθρου',
  date: '10 Июня 2023',
  category: 'Placeholder Category',
  serviceCategories: 'Плейсхолдер услуги',
  author: 'Όνομα Συγγραφέα',
  slug: '#',
});

// Συνδυασμός των δεδομένων
const blogPosts: BlogPost[] = [
  codependencyPost,
  sympathyEmpathyPost,
  effectiveCommunicationPost,
  mindfulnessPost,
  ruminationPost,
  psychosomaticsPost,
  stressPost,
  sleepMentalHealthPost,
  emotionalIntelligencePost,
  ...placeholderPosts,
];

export default function BlogPage() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#f2f1f0]">
      {/* Custom CSS για να εξασφαλίσουμε το μέγιστο πλάτος και το z-index */}
      <style jsx>{`
        .custom-max-width {
          max-width: 1120px !important;
          width: 100% !important;
        }
        .custom-header-z-index {
          z-index: 100 !important;
        }
        .custom-slider-z-index {
          z-index: 10 !important;
        }
        .filters-z-index {
          z-index: 20 !important;
        }
      `}</style>

      {/* ProfileHeader */}
      <div className="fixed top-0 left-0 right-0 custom-header-z-index">
        <ProfileHeader setMenuOpen={setIsMenuOpen} />
      </div>

      {/* Main Content */}
      <main className="flex-grow">
        {/* BlogHeroSlider */}
        <div
          className="w-full custom-slider-z-index"
          style={{ marginTop: isMenuOpen ? '288px' : '96px' }}
        >
          <BlogHeroSlider imageSrc="/images/blog/blog-hero.jpg" />
        </div>

        {/* Filters */}
        <div className="w-full filters-z-index">
          <Filters blogs={blogPosts} />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}