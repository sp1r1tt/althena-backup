"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ProfileHeader from '@/components/ProfileHeader';

// Define interfaces for question, option, scores, and result
interface Option {
  value: string;
  text: string;
}

interface Question {
  id: string;
  text: string;
  options: Option[];
  dimension: string;
  reverse?: boolean;
}

interface Scores {
  Confidence: number[];
  Discomfort: number[];
  NeedForApproval: number[];
  Preoccupation: number[];
  RelationshipsSecondary: number[];
}

interface Result {
  score: number;
  averageScore: number;
  attachmentStyle: string;
  recommendation: {
    level: string;
    package: string;
    packageLink: string;
    description: string;
  };
  scores: { [key: string]: number };
}

export default function AttachmentStyleQuestionnaire() {
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
    q31: null, q32: null, q33: null, q34: null, q35: null,
    q36: null, q37: null, q38: null, q39: null, q40: null,
  });
  const [result, setResult] = useState<Result | null>(null);

  const questions: Question[] = [
    {
      id: 'q1',
      text: 'Я чувствую себя уверенно в близких отношениях.',
      options: [
        { value: '1', text: 'Совершенно не согласен' },
        { value: '2', text: 'Скорее не согласен' },
        { value: '3', text: 'Чуть не согласен' },
        { value: '4', text: 'Нейтрально' },
        { value: '5', text: 'Чуть согласен' },
        { value: '6', text: 'Скорее согласен' },
        { value: '7', text: 'Совершенно согласен' },
      ],
      dimension: 'Confidence',
    },
    {
      id: 'q2',
      text: 'Мне легко доверять своему партнеру.',
      options: [
        { value: '1', text: 'Совершенно не согласен' },
        { value: '2', text: 'Скорее не согласен' },
        { value: '3', text: 'Чуть не согласен' },
        { value: '4', text: 'Нейтрально' },
        { value: '5', text: 'Чуть согласен' },
        { value: '6', text: 'Скорее согласен' },
        { value: '7', text: 'Совершенно согласен' },
      ],
      dimension: 'NeedForApproval',
    },
    {
      id: 'q3',
      text: 'Я чувствую себя комфортно, полагаясь на других.',
      options: [
        { value: '1', text: 'Совершенно не согласен' },
        { value: '2', text: 'Скорее не согласен' },
        { value: '3', text: 'Чуть не согласен' },
        { value: '4', text: 'Нейтрально' },
        { value: '5', text: 'Чуть согласен' },
        { value: '6', text: 'Скорее согласен' },
        { value: '7', text: 'Совершенно согласен' },
      ],
      dimension: 'Discomfort',
      reverse: true,
    },
    {
      id: 'q4',
      text: 'Я верю, что мои близкие отношения будут длительными.',
      options: [
        { value: '1', text: 'Совершенно не согласен' },
        { value: '2', text: 'Скорее не согласен' },
        { value: '3', text: 'Чуть не согласен' },
        { value: '4', text: 'Нейтрально' },
        { value: '5', text: 'Чуть согласен' },
        { value: '6', text: 'Скорее согласен' },
        { value: '7', text: 'Совершенно согласен' },
      ],
      dimension: 'Confidence',
    },
    {
      id: 'q5',
      text: 'Я чувствую себя в безопасности в своих отношениях.',
      options: [
        { value: '1', text: 'Совершенно не согласен' },
        { value: '2', text: 'Скорее не согласен' },
        { value: '3', text: 'Чуть не согласен' },
        { value: '4', text: 'Нейтрально' },
        { value: '5', text: 'Чуть согласен' },
        { value: '6', text: 'Скорее согласен' },
        { value: '7', text: 'Совершенно согласен' },
      ],
      dimension: 'Preoccupation',
    },
    {
      id: 'q6',
      text: 'Мне некомфортно, когда кто-то становится слишком близким ко мне.',
      options: [
        { value: '1', text: 'Совершенно не согласен' },
        { value: '2', text: 'Скорее не согласен' },
        { value: '3', text: 'Чуть не согласен' },
        { value: '4', text: 'Нейтрально' },
        { value: '5', text: 'Чуть согласен' },
        { value: '6', text: 'Скорее согласен' },
        { value: '7', text: 'Совершенно согласен' },
      ],
      dimension: 'Confidence',
    },
    {
      id: 'q7',
      text: 'Я предпочитаю держать дистанцию в отношениях.',
      options: [
        { value: '1', text: 'Совершенно не согласен' },
        { value: '2', text: 'Скорее не согласен' },
        { value: '3', text: 'Чуть не согласен' },
        { value: '4', text: 'Нейтрально' },
        { value: '5', text: 'Чуть согласен' },
        { value: '6', text: 'Скорее согласен' },
        { value: '7', text: 'Совершенно согласен' },
      ],
      dimension: 'Discomfort',
      reverse: true,
    },
    {
      id: 'q8',
      text: 'Я чувствую себя некомфортно, когда мне нужно делиться своими чувствами.',
      options: [
        { value: '1', text: 'Совершенно не согласен' },
        { value: '2', text: 'Скорее не согласен' },
        { value: '3', text: 'Чуть не согласен' },
        { value: '4', text: 'Нейтрально' },
        { value: '5', text: 'Чуть согласен' },
        { value: '6', text: 'Скорее согласен' },
        { value: '7', text: 'Совершенно согласен' },
      ],
      dimension: 'Preoccupation',
    },
    {
      id: 'q9',
      text: 'Близкие отношения заставляют меня чувствовать себя уязвимым.',
      options: [
        { value: '1', text: 'Совершенно не согласен' },
        { value: '2', text: 'Скорее не согласен' },
        { value: '3', text: 'Чуть не согласен' },
        { value: '4', text: 'Нейтрально' },
        { value: '5', text: 'Чуть согласен' },
        { value: '6', text: 'Скорее согласен' },
        { value: '7', text: 'Совершенно согласен' },
      ],
      dimension: 'NeedForApproval',
    },
    {
      id: 'q10',
      text: 'Мне трудно быть открытым с другими людьми.',
      options: [
        { value: '1', text: 'Совершенно не согласен' },
        { value: '2', text: 'Скорее не согласен' },
        { value: '3', text: 'Чуть не согласен' },
        { value: '4', text: 'Нейтрально' },
        { value: '5', text: 'Чуть согласен' },
        { value: '6', text: 'Скорее согласен' },
        { value: '7', text: 'Совершенно согласен' },
      ],
      dimension: 'RelationshipsSecondary',
    },
    {
      id: 'q11',
      text: 'Мне важно, чтобы другие одобряли мои отношения.',
      options: [
        { value: '1', text: 'Совершенно не согласен' },
        { value: '2', text: 'Скорее не согласен' },
        { value: '3', text: 'Чуть не согласен' },
        { value: '4', text: 'Нейтрально' },
        { value: '5', text: 'Чуть согласен' },
        { value: '6', text: 'Скорее согласен' },
        { value: '7', text: 'Совершенно согласен' },
      ],
      dimension: 'Preoccupation',
    },
    {
      id: 'q12',
      text: 'Я часто беспокоюсь о том, что подумают другие о моем партнере.',
      options: [
        { value: '1', text: 'Совершенно не согласен' },
        { value: '2', text: 'Скорее не согласен' },
        { value: '3', text: 'Чуть не согласен' },
        { value: '4', text: 'Нейтрально' },
        { value: '5', text: 'Чуть согласен' },
        { value: '6', text: 'Скорее согласен' },
        { value: '7', text: 'Совершенно согласен' },
      ],
      dimension: 'NeedForApproval',
    },
    {
      id: 'q13',
      text: 'Мое чувство собственного достоинства зависит от того, как другие видят мои отношения.',
      options: [
        { value: '1', text: 'Совершенно не согласен' },
        { value: '2', text: 'Скорее не согласен' },
        { value: '3', text: 'Чуть не согласен' },
        { value: '4', text: 'Нейтрально' },
        { value: '5', text: 'Чуть согласен' },
        { value: '6', text: 'Скорее согласен' },
        { value: '7', text: 'Совершенно согласен' },
      ],
      dimension: 'Confidence',
    },
    {
      id: 'q14',
      text: 'Я часто чувствую, что мне нужно одобрение от других, чтобы чувствовать себя хорошо в отношениях.',
      options: [
        { value: '1', text: 'Совершенно не согласен' },
        { value: '2', text: 'Скорее не согласен' },
        { value: '3', text: 'Чуть не согласен' },
        { value: '4', text: 'Нейтрально' },
        { value: '5', text: 'Чуть согласен' },
        { value: '6', text: 'Скорее согласен' },
        { value: '7', text: 'Совершенно согласен' },
      ],
      dimension: 'Discomfort',
      reverse: true,
    },
    {
      id: 'q15',
      text: 'Я чувствую себя неуверенно, если мои отношения не одобряются другими.',
      options: [
        { value: '1', text: 'Совершенно не согласен' },
        { value: '2', text: 'Скорее не согласен' },
        { value: '3', text: 'Чуть не согласен' },
        { value: '4', text: 'Нейтрально' },
        { value: '5', text: 'Чуть согласен' },
        { value: '6', text: 'Скорее согласен' },
        { value: '7', text: 'Совершенно согласен' },
      ],
      dimension: 'NeedForApproval',
    },
    {
      id: 'q16',
      text: 'Я часто беспокоюсь о том, что мои отношения могут закончиться.',
      options: [
        { value: '1', text: 'Совершенно не согласен' },
        { value: '2', text: 'Скорее не согласен' },
        { value: '3', text: 'Чуть не согласен' },
        { value: '4', text: 'Нейтрально' },
        { value: '5', text: 'Чуть согласен' },
        { value: '6', text: 'Скорее согласен' },
        { value: '7', text: 'Совершенно согласен' },
      ],
      dimension: 'RelationshipsSecondary',
    },
    {
      id: 'q17',
      text: 'Я часто думаю о том, как улучшить свои отношения.',
      options: [
        { value: '1', text: 'Совершенно не согласен' },
        { value: '2', text: 'Скорее не согласен' },
        { value: '3', text: 'Чуть не согласен' },
        { value: '4', text: 'Нейтрально' },
        { value: '5', text: 'Чуть согласен' },
        { value: '6', text: 'Скорее согласен' },
        { value: '7', text: 'Совершенно согласен' },
      ],
      dimension: 'Preoccupation',
    },
    {
      id: 'q18',
      text: 'Я чувствую тревогу, когда мой партнер не рядом.',
      options: [
        { value: '1', text: 'Совершенно не согласен' },
        { value: '2', text: 'Скорее не согласен' },
        { value: '3', text: 'Чуть не согласен' },
        { value: '4', text: 'Нейтрально' },
        { value: '5', text: 'Чуть согласен' },
        { value: '6', text: 'Скорее согласен' },
        { value: '7', text: 'Совершенно согласен' },
      ],
      dimension: 'Confidence',
    },
    {
      id: 'q19',
      text: 'Мои мысли часто заняты моими отношениями.',
      options: [
        { value: '1', text: 'Совершенно не согласен' },
        { value: '2', text: 'Скорее не согласен' },
        { value: '3', text: 'Чуть не согласен' },
        { value: '4', text: 'Нейтрально' },
        { value: '5', text: 'Чуть согласен' },
        { value: '6', text: 'Скорее согласен' },
        { value: '7', text: 'Совершенно согласен' },
      ],
      dimension: 'RelationshipsSecondary',
      reverse: true,
    },
    {
      id: 'q20',
      text: 'Я боюсь, что мой партнер может меня бросить.',
      options: [
        { value: '1', text: 'Совершенно не согласен' },
        { value: '2', text: 'Скорее не согласен' },
        { value: '3', text: 'Чуть не согласен' },
        { value: '4', text: 'Нейтрально' },
        { value: '5', text: 'Чуть согласен' },
        { value: '6', text: 'Скорее согласен' },
        { value: '7', text: 'Совершенно согласен' },
      ],
      dimension: 'NeedForApproval',
    },
    {
      id: 'q21',
      text: 'Для меня важнее личные достижения, чем близкие отношения.',
      options: [
        { value: '1', text: 'Совершенно не согласен' },
        { value: '2', text: 'Скорее не согласен' },
        { value: '3', text: 'Чуть не согласен' },
        { value: '4', text: 'Нейтрально' },
        { value: '5', text: 'Чуть согласен' },
        { value: '6', text: 'Скорее согласен' },
        { value: '7', text: 'Совершенно согласен' },
      ],
      dimension: 'Confidence',
    },
    {
      id: 'q22',
      text: 'Я считаю, что отношения не должны мешать моим личным целям.',
      options: [
        { value: '1', text: 'Совершенно не согласен' },
        { value: '2', text: 'Скорее не согласен' },
        { value: '3', text: 'Чуть не согласен' },
        { value: '4', text: 'Нейтрально' },
        { value: '5', text: 'Чуть согласен' },
        { value: '6', text: 'Скорее согласен' },
        { value: '7', text: 'Совершенно согласен' },
      ],
      dimension: 'Discomfort',
      reverse: true,
    },
    {
      id: 'q23',
      text: 'Я предпочитаю независимость, а не зависимость от партнера.',
      options: [
        { value: '1', text: 'Совершенно не согласен' },
        { value: '2', text: 'Скорее не согласен' },
        { value: '3', text: 'Чуть не согласен' },
        { value: '4', text: 'Нейтрально' },
        { value: '5', text: 'Чуть согласен' },
        { value: '6', text: 'Скорее согласен' },
        { value: '7', text: 'Совершенно согласен' },
      ],
      dimension: 'Preoccupation',
    },
    {
      id: 'q24',
      text: 'Я не хочу, чтобы отношения занимали центральное место в моей жизни.',
      options: [
        { value: '1', text: 'Совершенно не согласен' },
        { value: '2', text: 'Скорее не согласен' },
        { value: '3', text: 'Чуть не согласен' },
        { value: '4', text: 'Нейтрально' },
        { value: '5', text: 'Чуть согласен' },
        { value: '6', text: 'Скорее согласен' },
        { value: '7', text: 'Совершенно согласен' },
      ],
      dimension: 'Confidence',
    },
    {
      id: 'q25',
      text: 'Я могу легко обходиться без близких отношений.',
      options: [
        { value: '1', text: 'Совершенно не согласен' },
        { value: '2', text: 'Скорее не согласен' },
        { value: '3', text: 'Чуть не согласен' },
        { value: '4', text: 'Нейтрально' },
        { value: '5', text: 'Чуть согласен' },
        { value: '6', text: 'Скорее согласен' },
        { value: '7', text: 'Совершенно согласен' },
      ],
      dimension: 'RelationshipsSecondary',
    },
    {
      id: 'q26',
      text: 'Я избегаю близости в отношениях, чтобы защитить себя.',
      options: [
        { value: '1', text: 'Совершенно не согласен' },
        { value: '2', text: 'Скорее не согласен' },
        { value: '3', text: 'Чуть не согласен' },
        { value: '4', text: 'Нейтрально' },
        { value: '5', text: 'Чуть согласен' },
        { value: '6', text: 'Скорее согласен' },
        { value: '7', text: 'Совершенно согласен' },
      ],
      dimension: 'Discomfort',
      reverse: true,
    },
    {
      id: 'q27',
      text: 'Мне трудно доверять другим людям.',
      options: [
        { value: '1', text: 'Совершенно не согласен' },
        { value: '2', text: 'Скорее не согласен' },
        { value: '3', text: 'Чуть не согласен' },
        { value: '4', text: 'Нейтрально' },
        { value: '5', text: 'Чуть согласен' },
        { value: '6', text: 'Скорее согласен' },
        { value: '7', text: 'Совершенно согласен' },
      ],
      dimension: 'Discomfort',
      reverse: true,
    },
    {
      id: 'q28',
      text: 'Я предпочитаю не зависеть от других.',
      options: [
        { value: '1', text: 'Совершенно не согласен' },
        { value: '2', text: 'Скорее не согласен' },
        { value: '3', text: 'Чуть не согласен' },
        { value: '4', text: 'Нейтрально' },
        { value: '5', text: 'Чуть согласен' },
        { value: '6', text: 'Скорее согласен' },
        { value: '7', text: 'Совершенно согласен' },
      ],
      dimension: 'Preoccupation',
    },
    {
      id: 'q29',
      text: 'Я избегаю ситуаций, которые могут привести к конфликту в отношениях.',
      options: [
        { value: '1', text: 'Совершенно не согласен' },
        { value: '2', text: 'Скорее не согласен' },
        { value: '3', text: 'Чуть не согласен' },
        { value: '4', text: 'Нейтрально' },
        { value: '5', text: 'Чуть согласен' },
        { value: '6', text: 'Скорее согласен' },
        { value: '7', text: 'Совершенно согласен' },
      ],
      dimension: 'RelationshipsSecondary',
    },
    {
      id: 'q30',
      text: 'Я стараюсь не быть слишком эмоционально вовлеченным в отношения.',
      options: [
        { value: '1', text: 'Совершенно не согласен' },
        { value: '2', text: 'Скорее не согласен' },
        { value: '3', text: 'Чуть не согласен' },
        { value: '4', text: 'Нейтрально' },
        { value: '5', text: 'Чуть согласен' },
        { value: '6', text: 'Скорее согласен' },
        { value: '7', text: 'Совершенно согласен' },
      ],
      dimension: 'NeedForApproval',
    },
    {
      id: 'q31',
      text: 'Я часто чувствую тревогу по поводу своих отношений.',
      options: [
        { value: '1', text: 'Совершенно не согласен' },
        { value: '2', text: 'Скорее не согласен' },
        { value: '3', text: 'Чуть не согласен' },
        { value: '4', text: 'Нейтрально' },
        { value: '5', text: 'Чуть согласен' },
        { value: '6', text: 'Скорее согласен' },
        { value: '7', text: 'Совершенно согласен' },
      ],
      dimension: 'Confidence',
    },
    {
      id: 'q32',
      text: 'Я боюсь, что мой партнер не любит меня так сильно, как я его.',
      options: [
        { value: '1', text: 'Совершенно не согласен' },
        { value: '2', text: 'Скорее не согласен' },
        { value: '3', text: 'Чуть не согласен' },
        { value: '4', text: 'Нейтрально' },
        { value: '5', text: 'Чуть согласен' },
        { value: '6', text: 'Скорее согласен' },
        { value: '7', text: 'Совершенно согласен' },
      ],
      dimension: 'RelationshipsSecondary',
      reverse: true,
    },
    {
      id: 'q33',
      text: 'Я чувствую себя неуверенно, если мой партнер не уделяет мне достаточно внимания.',
      options: [
        { value: '1', text: 'Совершенно не согласен' },
        { value: '2', text: 'Скорее не согласен' },
        { value: '3', text: 'Чуть не согласен' },
        { value: '4', text: 'Нейтрально' },
        { value: '5', text: 'Чуть согласен' },
        { value: '6', text: 'Скорее согласен' },
        { value: '7', text: 'Совершенно согласен' },
      ],
      dimension: 'Preoccupation',
    },
    {
      id: 'q34',
      text: 'Я часто нуждаюсь в заверениях, что мой партнер заботится обо мне.',
      options: [
        { value: '1', text: 'Совершенно не согласен' },
        { value: '2', text: 'Скорее не согласен' },
        { value: '3', text: 'Чуть не согласен' },
        { value: '4', text: 'Нейтрально' },
        { value: '5', text: 'Чуть согласен' },
        { value: '6', text: 'Скорее согласен' },
        { value: '7', text: 'Совершенно согласен' },
      ],
      dimension: 'NeedForApproval',
    },
    {
      id: 'q35',
      text: 'Я часто чувствую, что мой партнер может меня отвергнуть.',
      options: [
        { value: '1', text: 'Совершенно не согласен' },
        { value: '2', text: 'Скорее не согласен' },
        { value: '3', text: 'Чуть не согласен' },
        { value: '4', text: 'Нейтрально' },
        { value: '5', text: 'Чуть согласен' },
        { value: '6', text: 'Скорее согласен' },
        { value: '7', text: 'Совершенно согласен' },
      ],
      dimension: 'Confidence',
    },
    {
      id: 'q36',
      text: 'Я чувствую себя комфортно, когда другие полагаются на меня.',
      options: [
        { value: '1', text: 'Совершенно не согласен' },
        { value: '2', text: 'Скорее не согласен' },
        { value: '3', text: 'Чуть не согласен' },
        { value: '4', text: 'Нейтрально' },
        { value: '5', text: 'Чуть согласен' },
        { value: '6', text: 'Скорее согласен' },
        { value: '7', text: 'Совершенно согласен' },
      ],
      dimension: 'Discomfort',
      reverse: true,
    },
    {
      id: 'q37',
      text: 'Я часто чувствую, что мне нужно больше близости в отношениях.',
      options: [
        { value: '1', text: 'Совершенно не согласен' },
        { value: '2', text: 'Скорее не согласен' },
        { value: '3', text: 'Чуть не согласен' },
        { value: '4', text: 'Нейтрально' },
        { value: '5', text: 'Чуть согласен' },
        { value: '6', text: 'Скорее согласен' },
        { value: '7', text: 'Совершенно согласен' },
      ],
      dimension: 'RelationshipsSecondary',
    },
    {
      id: 'q38',
      text: 'Я избегаю эмоциональной близости, чтобы не чувствовать себя уязвимым.',
      options: [
        { value: '1', text: 'Совершенно не согласен' },
        { value: '2', text: 'Скорее не согласен' },
        { value: '3', text: 'Чуть не согласен' },
        { value: '4', text: 'Нейтрально' },
        { value: '5', text: 'Чуть согласен' },
        { value: '6', text: 'Скорее согласен' },
        { value: '7', text: 'Совершенно согласен' },
      ],
      dimension: 'RelationshipsSecondary',
    },
    {
      id: 'q39',
      text: 'Я чувствую себя некомфортно, когда мои отношения не одобряются другими.',
      options: [
        { value: '1', text: 'Совершенно не согласен' },
        { value: '2', text: 'Скорее не согласен' },
        { value: '3', text: 'Чуть не согласен' },
        { value: '4', text: 'Нейтрально' },
        { value: '5', text: 'Чуть согласен' },
        { value: '6', text: 'Скорее согласен' },
        { value: '7', text: 'Совершенно согласен' },
      ],
      dimension: 'RelationshipsSecondary',
    },
    {
      id: 'q40',
      text: 'Я считаю, что отношения не так важны, как моя независимость.',
      options: [
        { value: '1', text: 'Совершенно не согласен' },
        { value: '2', text: 'Скорее не согласен' },
        { value: '3', text: 'Чуть не согласен' },
        { value: '4', text: 'Нейтрально' },
        { value: '5', text: 'Чуть согласен' },
        { value: '6', text: 'Скорее согласен' },
        { value: '7', text: 'Совершенно согласен' },
      ],
      dimension: 'RelationshipsSecondary',
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
    const scores: Scores = {
      Confidence: [],
      Discomfort: [],
      NeedForApproval: [],
      Preoccupation: [],
      RelationshipsSecondary: [],
    };

    questions.forEach(question => {
      const answerValue = answers[question.id];
      if (answerValue) {
        let value = parseInt(answerValue);
        if (question.reverse) {
          value = 8 - value;
        }
        scores[question.dimension].push(value);
      }
    });

    const meanScores: { [key: string]: number } = {};
    for (const [scale, values] of Object.entries(scores)) {
      if (values.length > 0) {
        meanScores[scale] = values.reduce((sum, val) => sum + val, 0) / values.length;
      } else {
        meanScores[scale] = 0;
      }
    }

    const totalScore = Object.values(answers).reduce((sum, value) => sum + (parseInt(value || '0')), 0);
    const averageScore = totalScore / questions.length;

    const { Confidence, Discomfort, NeedForApproval, Preoccupation, RelationshipsSecondary } = meanScores;

    const weights = {
      Secure: {
        Confidence: 1.5,
        Discomfort: -1.0,
        NeedForApproval: -0.8,
        Preoccupation: -1.2,
        RelationshipsSecondary: -0.5,
        bias: -2.0,
      },
      Avoidant: {
        Confidence: -0.5,
        Discomfort: 1.2,
        NeedForApproval: -0.3,
        Preoccupation: -0.8,
        RelationshipsSecondary: 1.0,
        bias: 0.0,
      },
      Anxious: {
        Confidence: -0.3,
        Discomfort: -0.2,
        NeedForApproval: 1.0,
        Preoccupation: 1.2,
        RelationshipsSecondary: -0.4,
        bias: -1.0,
      },
      FearfulAvoidant: {
        Confidence: -1.0,
        Discomfort: 1.0,
        NeedForApproval: 0.8,
        Preoccupation: 1.0,
        RelationshipsSecondary: 0.5,
        bias: -0.5,
      },
    };

    const logits = {
      Secure:
        weights.Secure.bias +
        weights.Secure.Confidence * Confidence +
        weights.Secure.Discomfort * Discomfort +
        weights.Secure.NeedForApproval * NeedForApproval +
        weights.Secure.Preoccupation * Preoccupation +
        weights.Secure.RelationshipsSecondary * RelationshipsSecondary,
      Avoidant:
        weights.Avoidant.bias +
        weights.Avoidant.Confidence * Confidence +
        weights.Avoidant.Discomfort * Discomfort +
        weights.Avoidant.NeedForApproval * NeedForApproval +
        weights.Avoidant.Preoccupation * Preoccupation +
        weights.Avoidant.RelationshipsSecondary * RelationshipsSecondary,
      Anxious:
        weights.Anxious.bias +
        weights.Anxious.Confidence * Confidence +
        weights.Anxious.Discomfort * Discomfort +
        weights.Anxious.NeedForApproval * NeedForApproval +
        weights.Anxious.Preoccupation * Preoccupation +
        weights.Anxious.RelationshipsSecondary * RelationshipsSecondary,
      FearfulAvoidant:
        weights.FearfulAvoidant.bias +
        weights.FearfulAvoidant.Confidence * Confidence +
        weights.FearfulAvoidant.Discomfort * Discomfort +
        weights.FearfulAvoidant.NeedForApproval * NeedForApproval +
        weights.FearfulAvoidant.Preoccupation * Preoccupation +
        weights.FearfulAvoidant.RelationshipsSecondary * RelationshipsSecondary,
    };

    const expLogits = {
      Secure: Math.exp(logits.Secure),
      Avoidant: Math.exp(logits.Avoidant),
      Anxious: Math.exp(logits.Anxious),
      FearfulAvoidant: Math.exp(logits.FearfulAvoidant),
    };
    const sumExpLogits = expLogits.Secure + expLogits.Avoidant + expLogits.Anxious + expLogits.FearfulAvoidant;

    const probabilities = {
      Secure: expLogits.Secure / sumExpLogits,
      Avoidant: expLogits.Avoidant / sumExpLogits,
      Anxious: expLogits.Anxious / sumExpLogits,
      FearfulAvoidant: expLogits.FearfulAvoidant / sumExpLogits,
    };

    const attachmentStyles = [
      { style: 'Безопасный стиль привязанности (Secure)', prob: probabilities.Secure },
      { style: 'Избегающий стиль привязанности (Avoidant)', prob: probabilities.Avoidant },
      { style: 'Тревожный стиль привязанности (Anxious)', prob: probabilities.Anxious },
      { style: 'Тревожно-избегающий стиль привязанности (Fearful-Avoidant)', prob: probabilities.FearfulAvoidant },
    ];

    const attachmentStyle = attachmentStyles.reduce((max, current) => (current.prob > max.prob ? current : max), attachmentStyles[0]).style;

    let recommendation = {
      level: '',
      package: '',
      packageLink: '',
      description: '',
    };
    if (totalScore <= 80) {
      recommendation = {
        level: 'Высокий уровень проблем с привязанностью',
        package: 'Расширенный Пакет',
        packageLink: '/our-service',
        description: 'Твой стиль привязанности может создавать проблемы в отношениях. Наш расширенный пакет поможет тебе работать над этим.',
      };
    } else if (totalScore <= 120) {
      recommendation = {
        level: 'Средний уровень проблем с привязанностью',
        package: 'Базовый Пакет',
        packageLink: '/our-service',
        description: 'У тебя есть некоторые сложности с привязанностью. Наш базовый пакет поможет тебе улучшить отношения.',
      };
    } else {
      recommendation = {
        level: 'Низкий уровень проблем с привязанностью',
        package: 'Бесплатный Вводный Пакет',
        packageLink: '/free-package',
        description: 'У тебя здоровый стиль привязанности! Наш бесплатный вводный пакет поможет тебе поддерживать гармоничные отношения.',
      };
    }

    setResult({
      score: totalScore,
      averageScore: averageScore,
      attachmentStyle,
      recommendation,
      scores: meanScores,
    });
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
      q31: null, q32: null, q33: null, q34: null, q35: null,
      q36: null, q37: null, q38: null, q39: null, q40: null,
    });
    setResult(null);
    setShowShareOptions(false);
  };

  const toggleShareOptions = () => {
    setShowShareOptions(!showShareOptions);
  };

  const shareViaEmail = () => {
    if (!result) return;
    const subject = 'Мои результаты теста: Опросник стиля привязанности. ASQ';
    const body = `Средний балл: ${result.averageScore?.toFixed(2) || '0.00'} из 7\nСтиль привязанности: ${result.attachmentStyle}\nРекомендация: ${result.recommendation?.description || ''}\nПредлагаемый пакет: ${result.recommendation?.package || ''}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const shareViaWhatsApp = () => {
    if (!result) return;
    const text = `Мои результаты теста: Опросник стиля привязанности. ASQ\nСредний балл: ${result.averageScore?.toFixed(2) || '0.00'} из 7\nСтиль привязанности: ${result.attachmentStyle}\nРекомендация: ${result.recommendation?.description || ''}\nПредлагаемый пакет: ${result.recommendation?.package || ''}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const printResult = () => {
    if (!result) return;
    const printContent = `
      <h3 class="text-xl font-playfair text-[#143B64] mb-4">Результаты теста: Опросник стиля привязанности. ASQ</h3>
      <p class="text-base text-[#2F4C66] mb-2"><strong>Средний балл:</strong> ${result.averageScore?.toFixed(2) || '0.00'} из 7</p>
      <p class="text-base text-[#2F4C66] mb-2"><strong>Стиль привязанности:</strong> ${result.attachmentStyle}</p>
      <p class="text-base text-[#2F4C66] mb-2"><strong>Уверенность (Confidence):</strong> ${result.scores?.Confidence?.toFixed(2) || '0.00'} из 7</p>
      <p class="text-base text-[#2F4C66] mb-2"><strong>Дисфория с близостью (Discomfort with Closeness):</strong> ${result.scores?.Discomfort?.toFixed(2) || '0.00'} из 7</p>
      <p class="text-base text-[#2F4C66] mb-2"><strong>Потребность в одобрении (Need for Approval):</strong> ${result.scores?.NeedForApproval?.toFixed(2) || '0.00'} из 7</p>
      <p class="text-base text-[#2F4C66] mb-2"><strong>Озабоченность отношениями (Preoccupation with Relationships):</strong> ${result.scores?.Preoccupation?.toFixed(2) || '0.00'} из 7</p>
      <p class="text-base text-[#2F4C66] mb-2"><strong>Отношения как второстепенные (Relationships as Secondary):</strong> ${result.scores?.RelationshipsSecondary?.toFixed(2) || '0.00'} из 7</p>
      <p class="text-base text-[#2F4C66] mb-2"><strong>Рекомендация:</strong> ${result.recommendation?.description || ''}</p>
      <p class="text-base text-[#2F4C66] mb-2"><strong>Предлагаемый пакет:</strong> ${result.recommendation?.package || ''}</p>
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
            <h3
              className="text-3xl md:text-4xl font-playfair text-[#143B64] mb-2"
            >
              Опросник стиля привязанности. ASQ
            </h3>
            <p className="text-sm text-gray-600 mb-4 font-playfair">
              онлайн-тест | 40 пунктов | около 7 минут
            </p>
            <p className="text-base md:text-lg text-[#2F4C66] font-playfair leading-relaxed mb-4">
              Как ты выстраиваешь отношения — и что за этим стоит? Опросник стиля привязанности поможет лучше понять, как ты взаимодействуешь с окружающими и какие психологические механизмы лежат в основе твоего поведения. Это инструмент самодиагностики, основанный на теории привязанности, который даст ценные инсайты о твоих привычных моделях в отношениях. Пройди тест — и начни менять свою жизнь к лучшему.
            </p>
            <div className="bg-#f2f1f0 p-6 rounded-lg min-h-[350px] overflow-auto">
              {result ? (
                <div>
                  <p className="text-lg font-playfair text-[#dbad9a] mb-2"><strong>Средний балл:</strong></p>
                  <div className="relative w-full h-6 bg-gray-200 rounded-full mb-2">
                    <div
                      className="absolute top-0 left-0 h-full rounded-full"
                      style={{
                        width: `${(result.averageScore / 7) * 100}%`,
                        backgroundColor: result.averageScore <= 2 ? '#ff4d4d' : result.averageScore <= 4 ? '#ffd700' : '#32cd32',
                      }}
                    ></div>
                    <span
                      className="absolute top-1/2 transform -translate-y-1/2 text-sm font-playfair text-[#143B64]"
                      style={{ left: `${(result.averageScore / 7) * 100}%`, transform: 'translateX(-50%)' }}
                    >
                      {result.averageScore?.toFixed(2) || '0.00'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <span>0</span>
                    <span>7</span>
                  </div>

                  {/* Bar Chart for Subscale Scores */}
                  <p className="text-lg font-playfair text-[#143B64] mb-2"><strong>Подшкалы:</strong></p>
                  <div className="space-y-4">
                    <div>
                      <span className="text-sm font-playfair text-[#2F4C66]">Уверенность (Confidence)</span>
                      <div className="relative w-full h-4 bg-gray-200 rounded-full">
                        <div
                          className="absolute top-0 left-0 h-full rounded-full"
                          style={{
                            width: `${((result.scores?.Confidence || 0) / 7) * 100}%`,
                            backgroundColor: '#21aabc',
                          }}
                        ></div>
                        <span className="absolute right-0 top-1/2 transform -translate-y-1/2 text-sm font-playfair text-[#2F4C66] pr-2">
                          {result.scores?.Confidence?.toFixed(2) || '0.00'}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-playfair text-[#2F4C66]">Дисфория с близостью (Discomfort with Closeness)</span>
                      <div className="relative w-full h-4 bg-gray-200 rounded-full">
                        <div
                          className="absolute top-0 left-0 h-full rounded-full"
                          style={{
                            width: `${((result.scores?.Discomfort || 0) / 7) * 100}%`,
                            backgroundColor: '#ff4d4d',
                          }}
                        ></div>
                        <span className="absolute right-0 top-1/2 transform -translate-y-1/2 text-sm font-playfair text-[#2F4C66] pr-2">
                          {result.scores?.Discomfort?.toFixed(2) || '0.00'}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-playfair text-[#2F4C66]">Потребность в одобрении (Need for Approval)</span>
                      <div className="relative w-full h-4 bg-gray-200 rounded-full">
                        <div
                          className="absolute top-0 left-0 h-full rounded-full"
                          style={{
                            width: `${((result.scores?.NeedForApproval || 0) / 7) * 100}%`,
                            backgroundColor: '#ffd700',
                          }}
                        ></div>
                        <span className="absolute right-0 top-1/2 transform -translate-y-1/2 text-sm font-playfair text-[#2F4C66] pr-2">
                          {result.scores?.NeedForApproval?.toFixed(2) || '0.00'}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-playfair text-[#2F4C66]">Озабоченность отношениями (Preoccupation with Relationships)</span>
                      <div className="relative w-full h-4 bg-gray-200 rounded-full">
                        <div
                          className="absolute top-0 left-0 h-full rounded-full"
                          style={{
                            width: `${((result.scores?.Preoccupation || 0) / 7) * 100}%`,
                            backgroundColor: '#32cd32',
                          }}
                        ></div>
                        <span className="absolute right-0 top-1/2 transform -translate-y-1/2 text-sm font-playfair text-[#2F4C66] pr-2">
                          {result.scores?.Preoccupation?.toFixed(2) || '0.00'}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-playfair text-[#2F4C66]">Отношения как второстепенные (Relationships as Secondary)</span>
                      <div className="relative w-full h-4 bg-gray-200 rounded-full">
                        <div
                          className="absolute top-0 left-0 h-full rounded-full"
                          style={{
                            width: `${((result.scores?.RelationshipsSecondary || 0) / 7) * 100}%`,
                            backgroundColor: '#ff8c00',
                          }}
                        ></div>
                        <span className="absolute right-0 top-1/2 transform -translate-y-1/2 text-sm font-playfair text-[#2F4C66] pr-2">
                          {result.scores?.RelationshipsSecondary?.toFixed(2) || '0.00'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-lg font-playfair text-[#143B64] mt-4"><strong>Стиль привязанности:</strong> {result.attachmentStyle || ''}</p>
                  <p className="text-base text-[#2F4C66] font-playfair mt-2"><strong>Уверенность (Confidence):</strong> {result.scores?.Confidence?.toFixed(2) || '0.00'} из 7</p>
                  <p className="text-base text-[#2F4C66] font-playfair"><strong>Дисфория с близостью (Discomfort with Closeness):</strong> {result.scores?.Discomfort?.toFixed(2) || '0.00'} из 7</p>
                  <p className="text-base text-[#2F4C66] font-playfair"><strong>Потребность в одобрении (Need for Approval):</strong> {result.scores?.NeedForApproval?.toFixed(2) || '0.00'} из 7</p>
                  <p className="text-base text-[#2F4C66] font-playfair"><strong>Озабоченность отношениями (Preoccupation with Relationships):</strong> {result.scores?.Preoccupation?.toFixed(2) || '0.00'} из 7</p>
                  <p className="text-base text-[#2F4C66] font-playfair"><strong>Отношения как второстепенные (Relationships as Secondary):</strong> {result.scores?.RelationshipsSecondary?.toFixed(2) || '0.00'} из 7</p>
                  <p className="text-base text-[#2F4C66] font-playfair mt-2"><strong>Рекомендация:</strong> {result.recommendation?.description || ''}</p>
                  <p className="text-base text-[#2F4C66] font-playfair">
                    <strong>Предлагаемый пакет:</strong>{' '}
                    <Link href={result.recommendation?.packageLink || '#'} className="text-[#8EB5BA] hover:underline">
                      {result.recommendation?.package || ''}
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
                <strong>Автор:</strong> J. Feeney et al. (1994)
              </p>
              <p className="text-sm mb-2">
                Тест предоставляется исключительно в образовательных и развлекательных целях. Он не предназначен для психологических консультаций любого рода и не гарантирует точности или достоверности. Оценка бесплатна и анонимна. Вы можете сохранить прямую ссылку на свои результаты.
              </p>
              <p className="text-sm">
                <strong>Ссылки:</strong><br />
                <Link
                  href="https://www.guilford.com/books/Attachment-in-Adults/Mark-Baldwin/9781593854577"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8EB5BA] hover:underline"
                >
                  Дж. А. Фини, П. Ноллер, М. Ханрахан. Оценка взрослой привязанности // Привязанность у взрослых: клинические и развивающие перспективы. Нью-Йорк: Guilford Press, 1994.
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