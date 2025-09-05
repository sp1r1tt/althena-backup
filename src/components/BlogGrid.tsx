"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { expertsData } from '@/data/expertsData';

interface BlogPost {
  image: string;
  title: string;
  date: string;
  category: string;
  serviceCategories: string;
  author: string;
  slug: string;
}

const BlogGrid: React.FC = () => {
  const author = expertsData.find(expert => expert.id === 1);
  const codependencyPost: BlogPost = {
    image: '/images/blog/blg001a.jpg',
    title: 'Созависимость: как распознать и выйти из нездоровых отношений',
    date: '5 ноября 2024',
    category: 'Отношения',
    serviceCategories: 'Отношения | Семейные отношения',
    author: author ? author.name : 'Άгνωсτος Συгγραφэας',
    slug: '/blog/blogPages/CodependencyBlog',
  };

  const sympathyEmpathyPost: BlogPost = {
    image: '/images/blog/blg006a.jpg',
    title: 'Сочувствие и эмпатия: в чём разница и почему это важно понимать',
    date: '22 ноября 2024',
    category: 'Отношения',
    serviceCategories: 'Отношения | Эмоциональный интеллект',
    author: author ? author.name : 'Άгνωсτος Συгγραφэας',
    slug: '/blog/blogPages/SympathyEmpathyBlog',
  };

  const effectiveCommunicationPost: BlogPost = {
    image: '/images/blog/blg008a.jpg',
    title: 'Эффективное общение: как говорить, чтобы быть услышанным',
    date: '15 декабря 2024',
    category: 'Отношения',
    serviceCategories: 'Отношения | Навыки общения',
    author: author ? author.name : 'Άгνωсτος Συгγραφэας',
    slug: '/blog/blogPages/EffectiveCommunicationBlog',
  };

  const mindfulnessPost: BlogPost = {
    image: '/images/blog/blg003a.jpg',
    title: 'Майндфулнесс: внимание, которое лечит',
    date: '15 ноября 2024',
    category: 'Стресс / Тревога',
    serviceCategories: 'Управление стрессом | Психическое благополучие',
    author: author ? author.name : 'Άгνωсτος Συгγραφэας',
    slug: '/blog/blogPages/MindfulnessBlog',
  };

  const ruminationPost: BlogPost = {
    image: '/images/blog/blg004a.jpg',
    title: 'Руминация: почему мы застреваем в мыслях и как это остановить',
    date: '18 ноября 2024',
    category: 'Стресс / Тревога',
    serviceCategories: 'Управление стрессом | Снятие тревоги',
    author: author ? author.name : 'Άгνωсτος Συгγραφэας',
    slug: '/blog/blogPages/RuminationBlog',
  };

  const psychosomaticsPost: BlogPost = {
    image: '/images/blog/blg005a.jpg',
    title: 'Психосоматика: как тело говорит о том, что не осознаёт разум',
    date: '20 ноября 2024',
    category: 'Стресс / Тревога',
    serviceCategories: 'Управление стрессом | Связь тела и разума',
    author: author ? author.name : 'Άгνωсτος Συгγραφэας',
    slug: '/blog/blogPages/PsychosomaticsBlog',
  };

  const stressPost: BlogPost = {
    image: '/images/blog/blg007a.jpg',
    title: 'Стресс: когда он помогает, а когда разрушает',
    date: '25 ноября 2024',
    category: 'Стресс / Тревога',
    serviceCategories: 'Управление стрессом | Снятие тревоги',
    author: author ? author.name : 'Άгνωсτος Συгγραφэας',
    slug: '/blog/blogPages/StressBlog',
  };

  const sleepMentalHealthPost: BlogPost = {
    image: '/images/blog/blg009a.jpg',
    title: 'Как нарушение сна влияет на психическое здоровье: научный взгляд',
    date: '30 ноября 2024',
    category: 'Стресс / Тревога',
    serviceCategories: 'Психическое благополучие | Здоровье сна',
    author: author ? author.name : 'Άгνωсτος Συгγραφэας',
    slug: '/blog/blogPages/SleepMentalHealthBlog',
  };

  const emotionalIntelligencePost: BlogPost = {
    image: '/images/blog/blg002a.jpg',
    title: 'Эмоциональный интеллект: как понимать свои чувства и управлять ими',
    date: '7 ноября 2024',
    category: 'Уверенность в себе / Самооценка',
    serviceCategories: 'Эмоциональный интеллект | Самосознание',
    author: author ? author.name : 'Άгνωсτος Συгγραφэας',
    slug: '/blog/blogPages/EmotionalIntelligenceBlog',
  };

  const placeholderPosts: BlogPost[] = Array(3).fill({
    image: '/images/placeholder.jpg',
    title: 'Τίτλος Άρθρου',
    date: '10 Ιουνίου 2023',
    category: 'Placeholder Category',
    serviceCategories: 'Плейсхолдер услуги',
    author: 'Όνομα Συγγραφέα',
    slug: '#',
  });

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

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {blogPosts.map((post, index) => {
          let roundedClass = 'rounded-lg';
          if (index % 4 === 0) {
            roundedClass = 'rounded-r-lg rounded-l-none';
          } else if (index % 4 === 3) {
            roundedClass = 'rounded-l-lg rounded-r-none';
          } else if (index % 3 === 0 && index % 4 !== 0) {
            roundedClass = 'md:rounded-r-lg md:rounded-l-none';
          } else if (index % 3 === 2) {
            roundedClass = 'md:rounded-l-lg md:rounded-r-none';
          } else if (index % 2 === 0 && index % 4 !== 0) {
            roundedClass = 'sm:rounded-r-lg sm:rounded-l-none';
          } else if (index % 2 === 1) {
            roundedClass = 'sm:rounded-l-lg sm:rounded-r-none';
          }

          return (
            <Link href={post.slug} key={index}>
              <div
                className={`overflow-hidden ${roundedClass}`}
                style={{ aspectRatio: '1 / 1', backgroundColor: 'rgba(217, 210, 204, 0.5)' }}
              >
                <div className="relative w-full h-1/2">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 leading-tight line-clamp-2">{post.title}</h3>
                  <p className="text-gray-500 text-sm mb-1">
                    {post.date} | {post.category} | {post.serviceCategories}
                  </p>
                  <p className="text-[#8eb5ba] font-medium text-sm">{post.author}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BlogGrid;