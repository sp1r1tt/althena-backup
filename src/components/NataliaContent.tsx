"use client";

import React from 'react';

interface NataliaContentProps {
  name: string;
  category: string;
}

const NataliaContent: React.FC<NataliaContentProps> = ({ name, category }) => {
  return (
    <div className="flex flex-col items-start text-[#143B64] w-full">
      <h2 className="text-[26px] xs:text-[33px] sm:text-[40px] md:text-[46px] lg:text-[48px] leading-none mb-5 font-playfair">
        {name}
      </h2>
      <p className="text-sm xs:text-sm sm:text-base leading-[1.3] mb-5">{category}</p>
      <p className="text-base xs:text-base sm:text-lg leading-[1.3] mb-5 font-bold italic !text-[#8EB5BA]">
        Помогаю справиться с вопросами, которые трудно обсуждать даже с близкими.
      </p>
      <p className="text-sm xs:text-sm sm:text-base leading-[1.3] mb-5">
        Я помогаю взрослым женщинам и мужчинам справиться с вопросами, которые трудно обсуждать даже с близкими.
      </p>
      <p className="text-sm xs:text-sm sm:text-base leading-[1.3] mb-5 font-bold">
        Вы можете прийти ко мне с запросами на темы:
      </p>
      <ul className="list-disc pl-6 mb-5 text-sm xs:text-sm sm:text-base leading-[1.3] text-gray-700">
        <li>трудные и запутанные отношения;</li>
        <li>финансовые ограничения и ощущение «потолка»;</li>
        <li>конфликты с детьми и родителями;</li>
        <li>проблемы веса и соматических проявлений;</li>
        <li>измены, предательство, «третий лишний»;</li>
        <li>сексуальные сложности: от симулирования до запретных фантазий.</li>
      </ul>
      <p className="text-sm xs:text-sm sm:text-base leading-[1.3] mb-5">
        Мой подход — не навязать «правильное», а помочь вам найти решения, которые подходят именно вам.
        Я не оцениваю, не стыжу, не веду за руку — я иду рядом, шаг за шагом, помогая вам менять мышление, чувства и действия.
      </p>
      <p className="text-sm xs:text-sm sm:text-base leading-[1.3] mb-5">
        Когда меняется внутреннее — меняется и внешнее. А значит, меняется и жизнь.
      </p>
      <p className="text-sm xs:text-sm sm:text-base leading-[1.3] mb-5">
        Путь к себе — может быть легче, чем вы думаете.
      </p>
    </div>
  );
};

export default NataliaContent;