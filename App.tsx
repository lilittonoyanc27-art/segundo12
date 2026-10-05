/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Lock,
  Upload,
  Trophy,
  Film,
  Award,
  X,
  AlertCircle,
  Image as ImageIcon,
} from 'lucide-react';

// ==========================================
// 1. TYPES
// ==========================================
export type OptionId = 'A' | 'B' | 'C' | 'D';

export interface QuizOption {
  id: OptionId;
  textEs: string;
  textRu: string;
}

export interface Question {
  id: number;
  questionEs: string;
  questionRu: string;
  options: QuizOption[];
  correctAnswer: OptionId;
}

// ==========================================
// 2. ALL 30 QUESTIONS DATA
// ==========================================
export const QUESTIONS: Question[] = [
  {
    id: 1,
    questionEs: '¿Qué día viene después del lunes?',
    questionRu: 'Какой день идёт после понедельника?',
    options: [
      { id: 'A', textEs: 'domingo', textRu: 'воскресенье' },
      { id: 'B', textEs: 'martes', textRu: 'вторник' },
      { id: 'C', textEs: 'viernes', textRu: 'пятница' },
      { id: 'D', textEs: 'sábado', textRu: 'суббота' },
    ],
    correctAnswer: 'B',
  },
  {
    id: 2,
    questionEs: '¿Qué día viene antes del viernes?',
    questionRu: 'Какой день идёт перед пятницей?',
    options: [
      { id: 'A', textEs: 'jueves', textRu: 'четверг' },
      { id: 'B', textEs: 'sábado', textRu: 'суббота' },
      { id: 'C', textEs: 'martes', textRu: 'вторник' },
      { id: 'D', textEs: 'domingo', textRu: 'воскресенье' },
    ],
    correctAnswer: 'A',
  },
  {
    id: 3,
    questionEs: 'Hoy es miércoles. ¿Qué día es mañana?',
    questionRu: 'Сегодня среда. Какой день завтра?',
    options: [
      { id: 'A', textEs: 'lunes', textRu: 'понедельник' },
      { id: 'B', textEs: 'martes', textRu: 'вторник' },
      { id: 'C', textEs: 'jueves', textRu: 'четверг' },
      { id: 'D', textEs: 'domingo', textRu: 'воскресенье' },
    ],
    correctAnswer: 'C',
  },
  {
    id: 4,
    questionEs: 'Hoy es domingo. ¿Qué día fue ayer?',
    questionRu: 'Сегодня воскресенье. Какой день был вчера?',
    options: [
      { id: 'A', textEs: 'viernes', textRu: 'пятница' },
      { id: 'B', textEs: 'sábado', textRu: 'суббота' },
      { id: 'C', textEs: 'lunes', textRu: 'понедельник' },
      { id: 'D', textEs: 'jueves', textRu: 'четверг' },
    ],
    correctAnswer: 'B',
  },
  {
    id: 5,
    questionEs: '¿Cuántos días tiene una semana?',
    questionRu: 'Сколько дней в неделе?',
    options: [
      { id: 'A', textEs: 'cinco', textRu: 'пять' },
      { id: 'B', textEs: 'seis', textRu: 'шесть' },
      { id: 'C', textEs: 'siete', textRu: 'семь' },
      { id: 'D', textEs: 'ocho', textRu: 'восемь' },
    ],
    correctAnswer: 'C',
  },
  {
    id: 6,
    questionEs: '¿Cuál es el primer día de la semana en muchos calendarios españoles?',
    questionRu: 'Какой день считается первым днём недели во многих испанских календарях?',
    options: [
      { id: 'A', textEs: 'lunes', textRu: 'понедельник' },
      { id: 'B', textEs: 'viernes', textRu: 'пятница' },
      { id: 'C', textEs: 'sábado', textRu: 'суббота' },
      { id: 'D', textEs: 'domingo', textRu: 'воскресенье' },
    ],
    correctAnswer: 'A',
  },
  {
    id: 7,
    questionEs: 'Si hoy es viernes, ¿qué día es pasado mañana?',
    questionRu: 'Если сегодня пятница, какой день будет послезавтра?',
    options: [
      { id: 'A', textEs: 'sábado', textRu: 'суббота' },
      { id: 'B', textEs: 'domingo', textRu: 'воскресенье' },
      { id: 'C', textEs: 'lunes', textRu: 'понедельник' },
      { id: 'D', textEs: 'jueves', textRu: 'четверг' },
    ],
    correctAnswer: 'B',
  },
  {
    id: 8,
    questionEs: '¿Cómo se dice 15 en español?',
    questionRu: 'Как сказать 15 по-испански?',
    options: [
      { id: 'A', textEs: 'cincuenta', textRu: 'пятьдесят' },
      { id: 'B', textEs: 'quince', textRu: 'пятнадцать' },
      { id: 'C', textEs: 'cinco', textRu: 'пять' },
      { id: 'D', textEs: 'veinticinco', textRu: 'двадцать пять' },
    ],
    correctAnswer: 'B',
  },
  {
    id: 9,
    questionEs: '¿Qué número es “veintidós”?',
    questionRu: 'Какое число означает “veintidós”?',
    options: [
      { id: 'A', textEs: '12', textRu: '12' },
      { id: 'B', textEs: '20', textRu: '20' },
      { id: 'C', textEs: '22', textRu: '22' },
      { id: 'D', textEs: '32', textRu: '32' },
    ],
    correctAnswer: 'C',
  },
  {
    id: 10,
    questionEs: '¿Cuánto es 20 + 5?',
    questionRu: 'Сколько будет 20 + 5?',
    options: [
      { id: 'A', textEs: 'quince', textRu: 'пятнадцать' },
      { id: 'B', textEs: 'veinticinco', textRu: 'двадцать пять' },
      { id: 'C', textEs: 'treinta', textRu: 'тридцать' },
      { id: 'D', textEs: 'cuarenta', textRu: 'сорок' },
    ],
    correctAnswer: 'B',
  },
  {
    id: 11,
    questionEs: '¿Cómo se dice 100 en español?',
    questionRu: 'Как сказать 100 по-испански?',
    options: [
      { id: 'A', textEs: 'cien', textRu: 'сто' },
      { id: 'B', textEs: 'diez', textRu: 'десять' },
      { id: 'C', textEs: 'mil', textRu: 'тысяча' },
      { id: 'D', textEs: 'ciento diez', textRu: 'сто десять' },
    ],
    correctAnswer: 'A',
  },
  {
    id: 12,
    questionEs: '¿Qué número es “treinta y ocho”?',
    questionRu: 'Какое число означает “treinta y ocho”?',
    options: [
      { id: 'A', textEs: '28', textRu: '28' },
      { id: 'B', textEs: '83', textRu: '83' },
      { id: 'C', textEs: '38', textRu: '38' },
      { id: 'D', textEs: '48', textRu: '48' },
    ],
    correctAnswer: 'C',
  },
  {
    id: 13,
    questionEs: '¿Cuánto es 50 - 20?',
    questionRu: 'Сколько будет 50 - 20?',
    options: [
      { id: 'A', textEs: 'veinte', textRu: 'двадцать' },
      { id: 'B', textEs: 'treinta', textRu: 'тридцать' },
      { id: 'C', textEs: 'cuarenta', textRu: 'сорок' },
      { id: 'D', textEs: 'diez', textRu: 'десять' },
    ],
    correctAnswer: 'B',
  },
  {
    id: 14,
    questionEs: '¿Cómo se dice 250 en español?',
    questionRu: 'Как сказать 250 по-испански?',
    options: [
      { id: 'A', textEs: 'doscientos cincuenta', textRu: 'двести пятьдесят' },
      { id: 'B', textEs: 'dos mil cincuenta', textRu: 'две тысячи пятьдесят' },
      { id: 'C', textEs: 'veinte cincuenta', textRu: 'двадцать пятьдесят' },
      { id: 'D', textEs: 'ciento cincuenta', textRu: 'сто пятьдесят' },
    ],
    correctAnswer: 'A',
  },
  {
    id: 15,
    questionEs: 'Tienes 30 euros y gastas 12. ¿Cuántos euros te quedan?',
    questionRu: 'У тебя 30 евро, и ты тратишь 12. Сколько остаётся?',
    options: [
      { id: 'A', textEs: 'dieciséis', textRu: 'шестнадцать' },
      { id: 'B', textEs: 'dieciocho', textRu: 'восемнадцать' },
      { id: 'C', textEs: 'veinte', textRu: 'двадцать' },
      { id: 'D', textEs: 'veintidós', textRu: 'двадцать два' },
    ],
    correctAnswer: 'B',
  },
  {
    id: 16,
    questionEs: '¿Quién enseña a los alumnos?',
    questionRu: 'Кто обучает учеников?',
    options: [
      { id: 'A', textEs: 'el profesor', textRu: 'учитель' },
      { id: 'B', textEs: 'el cocinero', textRu: 'повар' },
      { id: 'C', textEs: 'el conductor', textRu: 'водитель' },
      { id: 'D', textEs: 'el cantante', textRu: 'певец' },
    ],
    correctAnswer: 'A',
  },
  {
    id: 17,
    questionEs: '¿Quién prepara comida en un restaurante?',
    questionRu: 'Кто готовит еду в ресторане?',
    options: [
      { id: 'A', textEs: 'el policía', textRu: 'полицейский' },
      { id: 'B', textEs: 'el cocinero', textRu: 'повар' },
      { id: 'C', textEs: 'el profesor', textRu: 'учитель' },
      { id: 'D', textEs: 'el músico', textRu: 'музыкант' },
    ],
    correctAnswer: 'B',
  },
  {
    id: 18,
    questionEs: '¿Quién conduce un autobús?',
    questionRu: 'Кто водит автобус?',
    options: [
      { id: 'A', textEs: 'el camarero', textRu: 'официант' },
      { id: 'B', textEs: 'el peluquero', textRu: 'парикмахер' },
      { id: 'C', textEs: 'el conductor', textRu: 'водитель' },
      { id: 'D', textEs: 'el pintor', textRu: 'художник / маляр' },
    ],
    correctAnswer: 'C',
  },
  {
    id: 19,
    questionEs: '¿Quién trabaja en una peluquería?',
    questionRu: 'Кто работает в парикмахерской?',
    options: [
      { id: 'A', textEs: 'el peluquero', textRu: 'парикмахер' },
      { id: 'B', textEs: 'el panadero', textRu: 'пекарь' },
      { id: 'C', textEs: 'el vendedor', textRu: 'продавец' },
      { id: 'D', textEs: 'el profesor', textRu: 'учитель' },
    ],
    correctAnswer: 'A',
  },
  {
    id: 20,
    questionEs: '¿Quién sirve comida y bebidas en un restaurante?',
    questionRu: 'Кто подаёт еду и напитки в ресторане?',
    options: [
      { id: 'A', textEs: 'el mecánico', textRu: 'механик' },
      { id: 'B', textEs: 'el camarero', textRu: 'официант' },
      { id: 'C', textEs: 'el agricultor', textRu: 'фермер' },
      { id: 'D', textEs: 'el arquitecto', textRu: 'архитектор' },
    ],
    correctAnswer: 'B',
  },
  {
    id: 21,
    questionEs: '¿Quién repara coches?',
    questionRu: 'Кто ремонтирует машины?',
    options: [
      { id: 'A', textEs: 'el músico', textRu: 'музыкант' },
      { id: 'B', textEs: 'el mecánico', textRu: 'механик' },
      { id: 'C', textEs: 'el vendedor', textRu: 'продавец' },
      { id: 'D', textEs: 'el panadero', textRu: 'пекарь' },
    ],
    correctAnswer: 'B',
  },
  {
    id: 22,
    questionEs: '¿Quién vende productos en una tienda?',
    questionRu: 'Кто продаёт товары в магазине?',
    options: [
      { id: 'A', textEs: 'el vendedor', textRu: 'продавец' },
      { id: 'B', textEs: 'el cantante', textRu: 'певец' },
      { id: 'C', textEs: 'el profesor', textRu: 'учитель' },
      { id: 'D', textEs: 'el conductor', textRu: 'водитель' },
    ],
    correctAnswer: 'A',
  },
  {
    id: 23,
    questionEs: 'A Marta le gusta cantar en conciertos. ¿Cuál puede ser su profesión?',
    questionRu: 'Марте нравится петь на концертах. Какая у неё может быть профессия?',
    options: [
      { id: 'A', textEs: 'camarera', textRu: 'официантка' },
      { id: 'B', textEs: 'cantante', textRu: 'певица' },
      { id: 'C', textEs: 'conductora', textRu: 'водитель' },
      { id: 'D', textEs: 'peluquera', textRu: 'парикмахер' },
    ],
    correctAnswer: 'B',
  },
  {
    id: 24,
    questionEs: '¿Cuál de estas palabras es una fruta?',
    questionRu: 'Какое из этих слов обозначает фрукт?',
    options: [
      { id: 'A', textEs: 'zanahoria', textRu: 'морковь' },
      { id: 'B', textEs: 'manzana', textRu: 'яблоко' },
      { id: 'C', textEs: 'patata', textRu: 'картофель' },
      { id: 'D', textEs: 'cebolla', textRu: 'лук' },
    ],
    correctAnswer: 'B',
  },
  {
    id: 25,
    questionEs: '¿Qué fruta normalmente es amarilla?',
    questionRu: 'Какой фрукт обычно жёлтый?',
    options: [
      { id: 'A', textEs: 'plátano', textRu: 'банан' },
      { id: 'B', textEs: 'fresa', textRu: 'клубника' },
      { id: 'C', textEs: 'cereza', textRu: 'вишня / черешня' },
      { id: 'D', textEs: 'uva', textRu: 'виноград' },
    ],
    correctAnswer: 'A',
  },
  {
    id: 26,
    questionEs: '¿Qué fruta es pequeña, roja y tiene semillas por fuera?',
    questionRu: 'Какой фрукт маленький, красный и имеет семечки снаружи?',
    options: [
      { id: 'A', textEs: 'pera', textRu: 'груша' },
      { id: 'B', textEs: 'sandía', textRu: 'арбуз' },
      { id: 'C', textEs: 'fresa', textRu: 'клубника' },
      { id: 'D', textEs: 'melón', textRu: 'дыня' },
    ],
    correctAnswer: 'C',
  },
  {
    id: 27,
    questionEs: '¿Cuál de estas frutas puede ser verde o morada y crece en racimos?',
    questionRu: 'Какой фрукт бывает зелёным или фиолетовым и растёт гроздьями?',
    options: [
      { id: 'A', textEs: 'uva', textRu: 'виноград' },
      { id: 'B', textEs: 'naranja', textRu: 'апельсин' },
      { id: 'C', textEs: 'manzana', textRu: 'яблоко' },
      { id: 'D', textEs: 'melocotón', textRu: 'персик' },
    ],
    correctAnswer: 'A',
  },
  {
    id: 28,
    questionEs: '¿Qué fruta es grande, verde por fuera y roja por dentro?',
    questionRu: 'Какой фрукт большой, зелёный снаружи и красный внутри?',
    options: [
      { id: 'A', textEs: 'limón', textRu: 'лимон' },
      { id: 'B', textEs: 'sandía', textRu: 'арбуз' },
      { id: 'C', textEs: 'pera', textRu: 'груша' },
      { id: 'D', textEs: 'cereza', textRu: 'черешня' },
    ],
    correctAnswer: 'B',
  },
  {
    id: 29,
    questionEs: 'Quieres hacer zumo de naranja. ¿Qué necesitas?',
    questionRu: 'Ты хочешь приготовить апельсиновый сок. Что тебе нужно?',
    options: [
      { id: 'A', textEs: 'naranjas', textRu: 'апельсины' },
      { id: 'B', textEs: 'plátanos', textRu: 'бананы' },
      { id: 'C', textEs: 'uvas', textRu: 'виноград' },
      { id: 'D', textEs: 'peras', textRu: 'груши' },
    ],
    correctAnswer: 'A',
  },
  {
    id: 30,
    questionEs: 'En una cesta hay 5 manzanas y 3 peras. ¿Cuántas frutas hay en total?',
    questionRu: 'В корзине 5 яблок и 3 груши. Сколько всего фруктов?',
    options: [
      { id: 'A', textEs: 'seis', textRu: 'шесть' },
      { id: 'B', textEs: 'siete', textRu: 'семь' },
      { id: 'C', textEs: 'ocho', textRu: 'восемь' },
      { id: 'D', textEs: 'nueve', textRu: 'девять' },
    ],
    correctAnswer: 'C',
  },
];

// ==========================================
// 3. SOUND SYNTHESIS (NO EXTERNAL AUDIO FILES)
// ==========================================
let audioCtx: AudioContext | null = null;
let soundEnabled = true;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playCorrectSound() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'triangle';

    osc1.frequency.setValueAtTime(523.25, now);
    osc1.frequency.exponentialRampToValueAtTime(659.25, now + 0.1);
    osc1.frequency.exponentialRampToValueAtTime(1046.50, now + 0.22);

    osc2.frequency.setValueAtTime(329.63, now);
    osc2.frequency.exponentialRampToValueAtTime(392.00, now + 0.1);
    osc2.frequency.exponentialRampToValueAtTime(523.25, now + 0.22);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.45);
    osc2.stop(now + 0.45);
  } catch {
    // Ignore audio failures
  }
}

function playIncorrectSound() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(164.81, now + 0.18);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
  } catch {
    // Ignore
  }
}

function playTileSound() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.18);
  } catch {
    // Ignore
  }
}

function playWinSound() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
    const startTime = ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.value = freq;

      const noteTime = startTime + idx * 0.1;
      gain.gain.setValueAtTime(0.2, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.01, noteTime + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + 0.5);
    });
  } catch {
    // Ignore
  }
}

// ==========================================
// 4. HEADER COMPONENT
// ==========================================
interface HeaderProps {
  soundOn: boolean;
  onToggleSound: () => void;
  onReset: () => void;
  onUploadImage: (file: File) => void;
  hasCustomImage: boolean;
  onResetImage: () => void;
}

const Header: React.FC<HeaderProps> = ({
  soundOn,
  onToggleSound,
  onReset,
  onUploadImage,
  hasCustomImage,
  onResetImage,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUploadImage(e.target.files[0]);
    }
  };

  return (
    <header className="w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 p-[2px] shadow-lg shadow-amber-500/10">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg md:text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                <span>Adivina a la actriz</span>
                <span className="text-slate-500 text-sm font-normal hidden sm:inline">|</span>
                <span className="text-slate-400 text-sm font-medium hidden sm:inline">Угадай актрису</span>
              </h1>
            </div>
            <p className="text-xs text-amber-400/90 font-medium">
              Juego educativo de español • Викторина по испанскому
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            title={hasCustomImage ? "Сменить фото" : "Загрузить фото"}
            className="p-2 text-slate-400 hover:text-amber-400 hover:bg-slate-800/80 rounded-lg transition-colors border border-slate-800 flex items-center gap-1.5 text-xs font-medium cursor-pointer"
          >
            <ImageIcon className="w-4 h-4 text-amber-400" />
            <span className="hidden md:inline">
              {hasCustomImage ? 'Своё фото' : 'Фото'}
            </span>
          </button>

          {hasCustomImage && (
            <button
              onClick={onResetImage}
              title="Вернуть исходное фото"
              className="text-xs text-slate-400 hover:text-rose-400 px-2 py-1 transition-colors cursor-pointer"
            >
              Reset
            </button>
          )}

          <button
            onClick={onToggleSound}
            title={soundOn ? 'Silenciar sonidos / Выключить звук' : 'Activar sonidos / Включить звук'}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors border border-slate-800 cursor-pointer"
            aria-label="Toggle sound"
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          <button
            onClick={onReset}
            title="Reiniciar juego / Начать заново"
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors border border-slate-800 flex items-center gap-1 text-xs cursor-pointer"
            aria-label="Restart game"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Reiniciar</span>
          </button>
        </div>
      </div>
    </header>
  );
};

// ==========================================
// 5. RIDDLE BANNER COMPONENT
// ==========================================
interface RiddleBannerProps {
  showTranslation: boolean;
  onToggleTranslation: () => void;
}

const RiddleBanner: React.FC<RiddleBannerProps> = ({
  showTranslation,
  onToggleTranslation,
}) => {
  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-5 shadow-xl relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 relative z-10">
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-amber-500/10 text-amber-400">
              <HelpCircle className="w-4 h-4" />
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold text-amber-400 tracking-tight font-serif">
              ¿Quién es esta famosa actriz?
            </h2>
          </div>

          <p className="text-sm md:text-base text-slate-200 leading-relaxed font-sans">
            Es una famosa actriz estadounidense. Se convirtió en una de las estrellas más conocidas de Hollywood y ha participado en películas de diferentes géneros, especialmente dramas y suspensos.
          </p>

          {showTranslation && (
            <div className="mt-3 pt-3 border-t border-slate-800 text-slate-300 text-sm space-y-1.5 animate-fadeIn">
              <p className="font-semibold text-sky-300">
                Кто эта известная актриса?
              </p>
              <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                Это известная американская актриса. Она стала одной из самых узнаваемых звёзд Голливуда и снималась в фильмах разных жанров, особенно в драмах и триллерах.
              </p>
            </div>
          )}
        </div>

        <button
          onClick={onToggleTranslation}
          className={`shrink-0 self-start px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 border cursor-pointer ${
            showTranslation
              ? 'bg-sky-950/80 text-sky-300 border-sky-700/60 shadow-sm'
              : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border-slate-700'
          }`}
          title="Mostrar / ocultar traducción al ruso"
        >
          <span>🇷🇺</span>
          <span>Перевод</span>
        </button>
      </div>
    </div>
  );
};

// ==========================================
// 6. PHOTO GRID (100% OPAQUE, ZERO GAP, NO FLASHING)
// ==========================================
interface PhotoGridProps {
  imageSrc: string;
  openedCells: number[];
  pendingCellPick: boolean;
  isGameWon: boolean;
  onCellClick: (cellIndex: number) => void;
  onOpenGuessModal: () => void;
  onUploadImage: (file: File) => void;
}

const PhotoGrid: React.FC<PhotoGridProps> = ({
  imageSrc,
  openedCells,
  pendingCellPick,
  isGameWon,
  onCellClick,
  onOpenGuessModal,
  onUploadImage,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const TOTAL_CELLS = 30;
  const cells = Array.from({ length: TOTAL_CELLS }, (_, i) => i);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onUploadImage(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUploadImage(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {pendingCellPick && (
        <div className="mb-2.5 px-3.5 py-1.5 rounded-lg bg-slate-900 border border-emerald-500/70 text-emerald-300 text-xs font-semibold flex items-center gap-2 shadow-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
          <span>Выбери любую закрытую клетку • Elige una casilla para abrir</span>
        </div>
      )}

      {/* 
        Main Photo Container:
        - 100% opaque solid tiles with gap-0.
        - The photo NEVER peeks through until tiles are opened.
        - NO blinking or pulsing animations.
      */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative w-full aspect-[5/6] max-w-[360px] sm:max-w-[400px] rounded-2xl overflow-hidden shadow-2xl border-2 transition-colors select-none ${
          isDragOver
            ? 'border-amber-400 bg-slate-950'
            : 'border-slate-700 bg-slate-950'
        }`}
      >
        {/* Underlying Photo */}
        <img
          src={imageSrc}
          alt="Actriz oculta / Скрытая актриса"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-top select-none pointer-events-none"
        />

        {/* 
          Overlay Grid: 5 columns x 6 rows, gap-0, 0 padding 
          Each cell is flush against its neighbors to form a 100% solid, impenetrable wall.
        */}
        <div className="absolute inset-0 grid grid-cols-5 grid-rows-6">
          {cells.map((index) => {
            const isOpened = openedCells.includes(index) || isGameWon;
            const canClick = pendingCellPick && !isOpened;

            return (
              <div
                key={index}
                className="relative w-full h-full overflow-hidden"
              >
                <AnimatePresence mode="wait">
                  {!isOpened && (
                    <motion.button
                      type="button"
                      initial={{ opacity: 1 }}
                      exit={{
                        opacity: 0,
                        transition: { duration: 0.28, ease: 'easeOut' },
                      }}
                      onClick={() => {
                        if (canClick) {
                          onCellClick(index);
                        }
                      }}
                      disabled={!canClick}
                      className={`w-full h-full flex flex-col items-center justify-center font-mono text-xs font-semibold select-none border border-[#2d3a4f] ${
                        canClick
                          ? 'bg-[#b45309] hover:bg-[#d97706] text-amber-50 cursor-pointer shadow-sm border-[#f59e0b]'
                          : 'bg-[#18202f] text-slate-300 cursor-not-allowed'
                      }`}
                      title={
                        canClick
                          ? `Нажмите, чтобы открыть клетку #${index + 1}`
                          : `Клетка #${index + 1}`
                      }
                    >
                      <span className="text-[12px] sm:text-xs font-bold drop-shadow-sm">
                        {index + 1}
                      </span>
                      <div className="text-[9px] mt-0.5 opacity-80">
                        {canClick ? (
                          <Sparkles className="w-2.5 h-2.5 text-amber-200" />
                        ) : (
                          <Lock className="w-2.5 h-2.5 text-slate-400" />
                        )}
                      </div>
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {isDragOver && (
          <div className="absolute inset-0 bg-slate-950/95 flex flex-col items-center justify-center p-4 text-center z-30">
            <Upload className="w-10 h-10 text-amber-400 mb-2" />
            <p className="text-sm font-bold text-white">Отпустите фото здесь</p>
          </div>
        )}
      </div>

      <div className="w-full mt-3.5 flex flex-col items-center gap-2">
        <button
          onClick={onOpenGuessModal}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm tracking-wide text-white bg-slate-800 hover:bg-slate-700 active:scale-[0.99] transition-colors cursor-pointer border border-slate-700 shadow-md"
        >
          <HelpCircle className="w-4 h-4 text-amber-400" />
          <span>¿Ya sabes quién es?</span>
        </button>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="text-xs text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1.5 py-1 px-2.5 rounded-md hover:bg-slate-900 border border-transparent hover:border-slate-800 cursor-pointer"
          title="Сменить фото"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Сменить фото при желании</span>
        </button>
      </div>
    </div>
  );
};

// ==========================================
// 7. QUIZ CARD COMPONENT
// ==========================================
interface QuizCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  correctAnswersCount: number;
  openedCellsCount: number;
  selectedOption: OptionId | null;
  isAnswerCorrect: boolean | null;
  pendingCellPick: boolean;
  showTranslation: boolean;
  onToggleTranslation: () => void;
  onSelectOption: (optionId: OptionId) => void;
}

const QuizCard: React.FC<QuizCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  correctAnswersCount,
  openedCellsCount,
  selectedOption,
  isAnswerCorrect,
  pendingCellPick,
  showTranslation,
  onToggleTranslation,
  onSelectOption,
}) => {
  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6 shadow-xl flex flex-col justify-between">
      {/* Top Stats Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-800 text-xs sm:text-sm font-medium">
        <div className="px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-semibold">
          Pregunta {questionNumber}/{totalQuestions}
        </div>
        <div className="flex items-center gap-3">
          <div className="text-slate-300">
            <span className="text-slate-500">Respuestas correctas: </span>
            <span className="font-bold text-emerald-400">{correctAnswersCount}</span>
          </div>
          <div className="text-slate-300">
            <span className="text-slate-500">Casillas abiertas: </span>
            <span className="font-bold text-amber-400">{openedCellsCount}/{totalQuestions}</span>
          </div>
        </div>
      </div>

      {/* Question & Translation Button */}
      <div className="space-y-2 mb-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg md:text-xl font-bold text-white tracking-tight leading-snug">
            {question.questionEs}
          </h3>

          <button
            onClick={onToggleTranslation}
            className={`shrink-0 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 border cursor-pointer ${
              showTranslation
                ? 'bg-sky-950/80 text-sky-300 border-sky-700/60 shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border-slate-700'
            }`}
            title="Mostrar / ocultar traducción"
          >
            <span>🇷🇺</span>
            <span>Перевод</span>
          </button>
        </div>

        {showTranslation && (
          <p className="text-sky-300/90 text-sm md:text-base font-normal pt-1 border-t border-slate-800/60 animate-fadeIn">
            {question.questionRu}
          </p>
        )}
      </div>

      {/* Options Grid (No green checkmarks shown) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {question.options.map((option) => {
          const isSelected = selectedOption === option.id;
          const isSelectedCorrect = isSelected && isAnswerCorrect === true;
          const isSelectedIncorrect = isSelected && isAnswerCorrect === false;

          let btnStyle = 'bg-slate-800/80 hover:bg-slate-800 border-slate-700/80 text-slate-200 hover:border-slate-600';

          if (isSelectedCorrect) {
            btnStyle = 'bg-emerald-950 border-emerald-500 text-emerald-100 ring-2 ring-emerald-500/40';
          } else if (isSelectedIncorrect) {
            btnStyle = 'bg-rose-950 border-rose-500 text-rose-100 ring-2 ring-rose-500/30';
          } else if (pendingCellPick) {
            btnStyle = 'bg-slate-900 border-slate-800 text-slate-500 cursor-not-allowed';
          }

          return (
            <button
              key={option.id}
              onClick={() => {
                if (!pendingCellPick) {
                  onSelectOption(option.id);
                }
              }}
              disabled={pendingCellPick}
              className={`p-3.5 rounded-xl border text-left transition-colors flex flex-col justify-center relative overflow-hidden group cursor-pointer ${btnStyle}`}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2.5">
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                    isSelectedCorrect
                      ? 'bg-emerald-500 text-slate-950'
                      : isSelectedIncorrect
                      ? 'bg-rose-500 text-white'
                      : 'bg-slate-700 text-slate-300 group-hover:text-white'
                  }`}>
                    {option.id}
                  </span>
                  <span className="font-semibold text-sm sm:text-base">
                    {option.textEs}
                  </span>
                </div>

                {isSelectedCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                )}
                {isSelectedIncorrect && (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                )}
              </div>

              {showTranslation && (
                <div className="mt-1.5 ml-9 text-xs sm:text-sm text-sky-300/80 font-normal">
                  {option.textRu}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Answer Feedback Banner (Calm, static) */}
      <div className="min-h-[56px] flex items-center justify-center">
        {isAnswerCorrect === true && (
          <div className="w-full p-3 rounded-xl bg-emerald-950 border border-emerald-500/50 text-emerald-200 text-sm flex flex-col sm:flex-row items-center justify-between gap-2 shadow-lg">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <p className="font-bold">
                  ✅ ¡Correcto! Ahora puedes abrir una casilla.
                </p>
                {showTranslation && (
                  <p className="text-xs text-emerald-300 font-medium">
                    ✅ Правильно! Теперь можно открыть одну клетку.
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1 text-xs font-semibold text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/30">
              <span>Toca una casilla</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        )}

        {isAnswerCorrect === false && (
          <div className="w-full p-3 rounded-xl bg-rose-950 border border-rose-500/50 text-rose-200 text-sm flex items-center gap-2 shadow-lg">
            <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
            <div>
              <p className="font-bold">
                ❌ Inténtalo otra vez.
              </p>
              {showTranslation && (
                <p className="text-xs text-rose-300 font-medium">
                  ❌ Попробуй ещё раз.
                </p>
              )}
            </div>
          </div>
        )}

        {isAnswerCorrect === null && (
          <p className="text-xs text-slate-500 italic text-center">
            Selecciona la opción correcta • Выберите правильный вариант
          </p>
        )}
      </div>
    </div>
  );
};

// ==========================================
// 8. GUESS MODAL COMPONENT
// ==========================================
interface GuessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCorrectGuess: () => void;
  onIncorrectGuess: () => void;
}

const GuessModal: React.FC<GuessModalProps> = ({
  isOpen,
  onClose,
  onCorrectGuess,
  onIncorrectGuess,
}) => {
  const [guessInput, setGuessInput] = useState('');
  const [errorMessage, setErrorMessage] = useState<{ es: string; ru: string } | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  if (!isOpen) return null;

  const checkIsSharonStone = (raw: string): boolean => {
    const cleaned = raw
      .toLowerCase()
      .trim()
      .replace(/[\s\-_.,/\\!?'"`]+/g, ' ');

    const validVariants = [
      'sharon stone',
      'sharon',
      'stone',
      'шэрон стоун',
      'шерон стоун',
      'шарон стоун',
      'шэрон',
      'шерон',
      'шарон',
      'стоун',
    ];

    if (validVariants.includes(cleaned)) return true;

    if (cleaned.includes('sharon') || cleaned.includes('шэрон') || cleaned.includes('шерон')) {
      return true;
    }
    if (cleaned.includes('stone') || cleaned.includes('стоун')) {
      return true;
    }

    return false;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guessInput.trim()) return;

    setIsChecking(true);

    if (checkIsSharonStone(guessInput)) {
      setErrorMessage(null);
      onCorrectGuess();
    } else {
      setErrorMessage({
        es: 'Todavía no. Abre más casillas y vuelve a intentarlo.',
        ru: 'Пока нет. Открой ещё клетки и попробуй снова.',
      });
      onIncorrectGuess();
    }

    setIsChecking(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
          title="Cerrar y continuar la trivia / Закрыть и продолжить"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              ¿Ya sabes quién es?
            </h3>
            <p className="text-xs text-slate-400">
              Adivina la actriz oculta • Угадай скрытую актрису
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="actress-name" className="text-sm font-semibold text-slate-200">
                Escribe el nombre de la actriz:
              </label>
              <button
                type="button"
                onClick={() => setShowTranslation(!showTranslation)}
                className="text-[11px] text-sky-400 hover:text-sky-300 font-medium cursor-pointer"
              >
                🇷🇺 {showTranslation ? 'Ocultar traducción' : 'Перевод'}
              </button>
            </div>

            {showTranslation && (
              <p className="text-xs text-sky-300/80 mb-2 font-normal">
                Напиши имя актрисы (например: Sharon Stone):
              </p>
            )}

            <input
              id="actress-name"
              type="text"
              autoFocus
              value={guessInput}
              onChange={(e) => {
                setGuessInput(e.target.value);
                if (errorMessage) setErrorMessage(null);
              }}
              placeholder="Ejemplo: Sharon Stone..."
              className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all text-base"
            />
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-950 border border-rose-500/50 text-rose-200 text-sm flex items-start gap-2.5 animate-shake">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">{errorMessage.es}</p>
                <p className="text-xs text-rose-300 mt-0.5">{errorMessage.ru}</p>
              </div>
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            >
              Continuar jugando
            </button>

            <button
              type="submit"
              disabled={isChecking || !guessInput.trim()}
              className="px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 active:scale-98 transition-all shadow-lg shadow-rose-900/30 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>Comprobar</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ==========================================
// 9. VICTORY MODAL COMPONENT
// ==========================================
interface VictoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRestart: () => void;
  correctAnswersCount: number;
  openedCellsCount: number;
  imageSrc: string;
}

const VictoryModal: React.FC<VictoryModalProps> = ({
  isOpen,
  onClose,
  onRestart,
  correctAnswersCount,
  openedCellsCount,
  imageSrc,
}) => {
  useEffect(() => {
    if (isOpen) {
      const count = 200;
      const defaults = {
        origin: { y: 0.7 },
        zIndex: 9999,
      };

      function fire(particleRatio: number, opts: confetti.Options) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
        });
      }

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
      });
      fire(0.2, {
        spread: 60,
      });
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border-2 border-amber-500/50 rounded-3xl p-6 md:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
          title="Ver foto completa / Закрыть и посмотреть фото"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 via-yellow-400 to-rose-500 p-[2px] shadow-lg shadow-amber-500/30">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Trophy className="w-8 h-8 text-amber-400" />
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>¡Victoria! • Победа!</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              ¡Es Sharon Stone!
            </h3>
            <p className="text-slate-400 text-sm font-medium mt-0.5">
              Шэрон Стоун (Sharon Stone)
            </p>
          </div>

          <div className="w-36 h-44 rounded-2xl overflow-hidden shadow-xl border-2 border-amber-400/60 ring-4 ring-amber-500/20 my-2">
            <img
              src={imageSrc}
              alt="Sharon Stone"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top"
            />
          </div>

          <div className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-left space-y-2 text-xs md:text-sm leading-relaxed text-slate-300">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs uppercase tracking-wider">
              <Film className="w-3.5 h-3.5" />
              <span>Sobre la actriz • Об актрисе</span>
            </div>
            <p>
              <strong>Sharon Stone</strong> es una de las figuras más icónicas de Hollywood. Alcanzó fama mundial por su inolvidable papel en <em>Instinto básico (Basic Instinct, 1992)</em>, su aclamada actuación en <em>Casino (1995)</em> —por la que ganó el Globo de Oro y fue nominada al Óscar—, así como películas como <em>Desafío total (Total Recall)</em> y <em>El especialista</em>.
            </p>
            <p className="text-slate-400 text-xs border-t border-slate-800 pt-2">
              Шэрон Стоун — всемирно известная американская актриса, звезда 90-х и лауреат премии «Золотой глобус».
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs text-slate-400 block">Aciertos</span>
              <span className="text-xl font-bold text-emerald-400">{correctAnswersCount}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs text-slate-400 block">Casillas descubiertas</span>
              <span className="text-xl font-bold text-amber-400">{openedCellsCount}/30</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full pt-2">
            <button
              onClick={onClose}
              className="w-full sm:w-1/2 py-3 px-4 rounded-xl text-sm font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>Ver foto completa</span>
            </button>
            <button
              onClick={onRestart}
              className="w-full sm:w-1/2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 transition-all shadow-lg shadow-amber-900/30 cursor-pointer flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Jugar de nuevo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 10. MAIN APP COMPONENT
// ==========================================
export default function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [openedCells, setOpenedCells] = useState<number[]>([]);
  const [pendingCellPick, setPendingCellPick] = useState(false);
  const [selectedOption, setSelectedOption] = useState<OptionId | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [isGameWon, setIsGameWon] = useState(false);

  // Translations toggles
  const [showRiddleTranslation, setShowRiddleTranslation] = useState(false);
  const [showQuestionTranslation, setShowQuestionTranslation] = useState(false);

  // Modals
  const [showGuessModal, setShowGuessModal] = useState(false);
  const [showVictoryModal, setShowVictoryModal] = useState(false);

  // Sound
  const [soundOn, setSoundOn] = useState(true);

  // Exact image from Supabase (served locally via /images.jpeg or /20_26_17.jpg)
  const [imageSrc, setImageSrc] = useState<string>('/images.jpeg');
  const [hasCustomImage, setHasCustomImage] = useState(false);

  // Clear legacy localStorage cache and load user-saved image if any
  useEffect(() => {
    localStorage.removeItem('actress_quiz_custom_img');
    const savedCustomImg = localStorage.getItem('actress_quiz_custom_img_v2');
    if (savedCustomImg) {
      setImageSrc(savedCustomImg);
      setHasCustomImage(true);
    }
  }, []);

  const handleUploadImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImageSrc(reader.result);
        setHasCustomImage(true);
        localStorage.setItem('actress_quiz_custom_img_v2', reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetImage = () => {
    localStorage.removeItem('actress_quiz_custom_img_v2');
    localStorage.removeItem('actress_quiz_custom_img');
    setImageSrc('/images.jpeg');
    setHasCustomImage(false);
  };

  const handleToggleSound = () => {
    const nextVal = !soundOn;
    setSoundOn(nextVal);
    soundEnabled = nextVal;
  };

  const currentQuestion = QUESTIONS[currentQuestionIndex];

  // Option selection logic
  const handleSelectOption = (optionId: OptionId) => {
    if (pendingCellPick) return;

    setSelectedOption(optionId);
    const isCorrect = optionId === currentQuestion.correctAnswer;

    if (isCorrect) {
      setIsAnswerCorrect(true);
      setCorrectAnswersCount((prev) => prev + 1);
      setPendingCellPick(true);
      playCorrectSound();
    } else {
      setIsAnswerCorrect(false);
      playIncorrectSound();
    }
  };

  // Cell opening logic
  const handleCellClick = (cellIndex: number) => {
    if (!pendingCellPick || openedCells.includes(cellIndex)) return;

    playTileSound();

    const updatedOpened = [...openedCells, cellIndex];
    setOpenedCells(updatedOpened);
    setPendingCellPick(false);

    if (updatedOpened.length >= 30) {
      setIsGameWon(true);
      setShowVictoryModal(true);
      playWinSound();
      return;
    }

    setTimeout(() => {
      setSelectedOption(null);
      setIsAnswerCorrect(null);
      setCurrentQuestionIndex((prev) => (prev + 1) % QUESTIONS.length);
    }, 400);
  };

  const handleCorrectGuess = () => {
    setShowGuessModal(false);
    setIsGameWon(true);
    setOpenedCells(Array.from({ length: 30 }, (_, i) => i));
    setPendingCellPick(false);
    playWinSound();
    setShowVictoryModal(true);
  };

  const handleIncorrectGuess = () => {
    playIncorrectSound();
  };

  const handleResetGame = useCallback(() => {
    setCurrentQuestionIndex(0);
    setCorrectAnswersCount(0);
    setOpenedCells([]);
    setPendingCellPick(false);
    setSelectedOption(null);
    setIsAnswerCorrect(null);
    setIsGameWon(false);
    setShowGuessModal(false);
    setShowVictoryModal(false);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      <Header
        soundOn={soundOn}
        onToggleSound={handleToggleSound}
        onReset={handleResetGame}
        onUploadImage={handleUploadImage}
        hasCustomImage={hasCustomImage}
        onResetImage={handleResetImage}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 md:py-8 flex flex-col gap-6">
        <RiddleBanner
          showTranslation={showRiddleTranslation}
          onToggleTranslation={() => setShowRiddleTranslation(!showRiddleTranslation)}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 flex flex-col items-center">
            <PhotoGrid
              imageSrc={imageSrc}
              openedCells={openedCells}
              pendingCellPick={pendingCellPick}
              isGameWon={isGameWon}
              onCellClick={handleCellClick}
              onOpenGuessModal={() => setShowGuessModal(true)}
              onUploadImage={handleUploadImage}
            />
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center">
            <QuizCard
              question={currentQuestion}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={QUESTIONS.length}
              correctAnswersCount={correctAnswersCount}
              openedCellsCount={openedCells.length}
              selectedOption={selectedOption}
              isAnswerCorrect={isAnswerCorrect}
              pendingCellPick={pendingCellPick}
              showTranslation={showQuestionTranslation}
              onToggleTranslation={() => setShowQuestionTranslation(!showQuestionTranslation)}
              onSelectOption={handleSelectOption}
            />

            <div className="mt-4 px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
              <span>
                💡 1 respuesta correcta = 1 casilla a tu elección.
              </span>
              <span className="text-slate-500 text-[11px]">
                1 правильный ответ = 1 выбранная клетка.
              </span>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full border-t border-slate-800/80 py-4 text-center text-xs text-slate-500">
        <p>Adivina a la actriz • Juego de español con traducción interactiva</p>
      </footer>

      <GuessModal
        isOpen={showGuessModal}
        onClose={() => setShowGuessModal(false)}
        onCorrectGuess={handleCorrectGuess}
        onIncorrectGuess={handleIncorrectGuess}
      />

      <VictoryModal
        isOpen={showVictoryModal}
        onClose={() => setShowVictoryModal(false)}
        onRestart={handleResetGame}
        correctAnswersCount={correctAnswersCount}
        openedCellsCount={openedCells.length}
        imageSrc={imageSrc}
      />
    </div>
  );
}
