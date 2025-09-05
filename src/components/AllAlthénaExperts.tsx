"use client";

import React from 'react';
import Link from 'next/link';

const experts = [
  {
    name: 'Виктория Котенко',
    specialty: 'Психотерапевт, Психоаналитик',
    image: '/images/councillors/VK/Viktoriia Kotenko.jpg',
    link: '/experts/viktoriia-kotenko',
  },
  {
    name: 'Екатерина Иванова',
    specialty: 'Психотерапевт, Гештальт-терапевт',
    image: '/images/councillors/demo/demo.jpg',
    link: '/experts/ekaterina-ivanova',
  },
  {
    name: 'Анна Петрова',
    specialty: 'Психотерапевт, Арт-терапевт',
    image: '/images/councillors/demo/demo.jpg',
    link: '/experts/anna-petrova',
  },
];

export default function AllAlthénaExperts() {
  return (
    <div className="all-experts-section w-full bg-[rgba(237,191,171,0.2)] px-4 xs:px-6 sm:px-8 py-8">
      <div className="w-full max-w-[1120px] mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-playfair mb-5 whitespace-pre-line text-center !text-[#143B64]">
          Όλοι οι Ειδικοί μας
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {experts.map((expert, index) => (
            <div key={index} className="group relative">
              <div className="relative w-full aspect-square overflow-hidden">
                <img
                  src={expert.image}
                  alt={expert.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              </div>
              <div className="text-center mt-4">
                <h3 className="text-lg sm:text-xl font-playfair mb-2">
                  {expert.name}
                </h3>
                <p className="text-base sm:text-base mb-4">
                  {expert.specialty}
                </p>
                <Link
                  href={expert.link}
                  className="inline-block px-6 py-2 bg-[#8EB5BA] !text-white no-underline rounded-[30px] text-base transition-colors duration-300 hover:bg-[#edbfab] hover:!text-[#143B64] shadow-md"
                >
                  Узнать больше
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}