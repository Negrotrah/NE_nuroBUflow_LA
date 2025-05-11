import React, { useMemo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { NeuralNetwork } from '@/data/types';

// Компонент для анимации хакерского эффекта текста с глитчем
interface GlitchedTextProps {
  text: string;
  interval?: number; // интервал между глитчами в миллисекундах
  glitchDuration?: number; // длительность глитча в миллисекундах
  enabled?: boolean; // включен ли эффект глитча
}

// Карта замен для "хакерского алфавита"
const hackAlphabet: Record<string, string[]> = {
  'a': ['4', '@', 'α', 'Δ'],
  'b': ['8', 'ß', '฿'],
  'c': ['¢', '©', 'Ç'],
  'd': ['Ð', 'đ', '∂'],
  'e': ['3', '€', 'ë', 'Σ'],
  'f': ['ƒ', 'Ⓕ'],
  'g': ['9', 'ğ', 'Ğ'],
  'h': ['#', 'ħ', 'Ħ'],
  'i': ['1', '!', 'ï', '|'],
  'j': ['Ĵ', 'ĵ'],
  'k': ['ķ', 'Ķ'],
  'l': ['1', '£', '|', 'Ł'],
  'm': ['Μ', 'μ', 'ʍ'],
  'n': ['И', 'ñ', 'Ñ'],
  'o': ['0', 'Ø', 'ø', 'Ω'],
  'p': ['Þ', 'þ', 'р'],
  'q': ['q̃', 'Q̃'],
  'r': ['®', 'ř', 'Ř'],
  's': ['5', '$', '§'],
  't': ['7', '†', '┼'],
  'u': ['μ', 'Ü', 'ü'],
  'v': ['√', 'Ѵ', 'ѵ'],
  'w': ['ω', 'Ŵ', 'ŵ'],
  'x': ['×', 'Ж', 'ж'],
  'y': ['¥', 'ÿ', 'Ÿ'],
  'z': ['2', 'ž', 'Ž']
};

const GlitchedText: React.FC<GlitchedTextProps> = ({ 
  text, 
  interval = 3000, 
  glitchDuration = 200,
  enabled = true 
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [glitchedChars, setGlitchedChars] = useState<number[]>([]); // индексы глитчевых символов

  useEffect(() => {
    if (!enabled) {
      setDisplayText(text);
      setGlitchedChars([]);
      return;
    }

    // Функция для глитча текста
    const glitchText = () => {
      // Выбираем случайные символы для глитча (1-2 символа)
      const numCharsToGlitch = Math.floor(Math.random() * 2) + 1;
      const indices: number[] = [];
      
      // Выбираем случайные индексы
      for (let i = 0; i < numCharsToGlitch; i++) {
        const index = Math.floor(Math.random() * text.length);
        if (!indices.includes(index)) {
          indices.push(index);
        }
      }
      
      // Создаем новый текст с глитчем
      const newText = text.split('').map((char, idx) => {
        if (indices.includes(idx)) {
          const lowerChar = char.toLowerCase();
          if (hackAlphabet[lowerChar]) {
            const replacements = hackAlphabet[lowerChar];
            return replacements[Math.floor(Math.random() * replacements.length)];
          }
        }
        return char;
      }).join('');
      
      setDisplayText(newText);
      setGlitchedChars(indices);
      
      // Возвращаем обратно после указанной длительности
      const timeout = setTimeout(() => {
        setDisplayText(text);
        setGlitchedChars([]);
      }, glitchDuration);
      
      return timeout;
    };
    
    // Инициируем глитч периодически
    const interval1 = setInterval(glitchText, interval);
    
    return () => {
      clearInterval(interval1);
    };
  }, [text, interval, glitchDuration, enabled]);
  
  return (
    <span className="relative">
      {displayText.split('').map((char, index) => (
        <span 
          key={index} 
          className={`transition-colors duration-100 ${glitchedChars.includes(index) ? 'text-red-500' : ''}`}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

interface NetworkCardProps {
  network: NeuralNetwork;
  index: number;
  categoryColor: string;
}

// Вспомогательная функция для создания кода идентификатора
const generateNetId = () => {
  const hexChars = '0123456789ABCDEF';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += hexChars.charAt(Math.floor(Math.random() * 16));
  }
  return result;
};

// Предгенерированные ID для оптимизации
const NET_IDS = Array.from({ length: 50 }, () => generateNetId());
const VERSION_NUMBERS = Array.from({ length: 20 }, () => 
  `v${Math.floor(Math.random() * 5) + 1}.${Math.floor(Math.random() * 10)}`
);

// Предгенерированные технические теги для интерфейса
const TECH_TAGS = [
  ["QUANTUM", "STABLE", "VERIFIED"],
  ["STABLE", "BETA", "AI"],
  ["VERIFIED", "NEURAL", "V3"],
  ["NEURAL", "SECURE", "QUANTUM"],
  ["SECURE", "ADVANCED", "STABLE"],
  ["ADVANCED", "QUANTUM", "NEURAL"],
];

const NetworkCard: React.FC<NetworkCardProps> = ({ network, index, categoryColor }) => {
  // Технические данные для голографического интерфейса
  const netId = useMemo(() => NET_IDS[index % NET_IDS.length], [index]);
  const versionNumber = useMemo(() => VERSION_NUMBERS[index % VERSION_NUMBERS.length], [index]);
  const techTags = useMemo(() => TECH_TAGS[index % TECH_TAGS.length], [index]);
  
  // Определяем, мобильное ли устройство
  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  }, []);
  
  // Оптимизируем анимации на мобильных устройствах
  const animationDelay = isMobile ? index * 0.03 : index * 0.05;
  
  // Преобразуем строку categoryColor в цвет tailwind
  const hexToTailwindBg = (hex: string) => {
    if (hex.includes('purple')) return 'from-purple-500/20';
    if (hex.includes('blue')) return 'from-blue-500/20';
    if (hex.includes('green')) return 'from-green-500/20';
    if (hex.includes('yellow')) return 'from-yellow-500/20';
    if (hex.includes('red')) return 'from-red-500/20';
    if (hex.includes('pink')) return 'from-pink-500/20';
    return 'from-blue-500/20';
  };
  
  const gradientColor = hexToTailwindBg(categoryColor);
  
  return (
    <motion.div
      className="group relative flex flex-col rounded-md overflow-hidden h-52"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: animationDelay,
        duration: 0.5,
      }}
      whileHover={{ 
        y: -5, 
        boxShadow: '0 4px 15px rgba(59, 130, 246, 0.2)',
        transition: { duration: 0.2 } 
      }}
    >
      {/* Голографический фон с градиентом от категории */}
      <div 
        className={`absolute inset-0 backdrop-blur-sm bg-gradient-to-br ${gradientColor} to-blue-900/10 
                 border border-blue-500/30 group-hover:border-blue-400/60 
                 transition-all duration-300 -z-10`}
      />
      
      {/* Доп. эффект фона - голографическая сетка */}
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzYwQTVGQSIgb3BhY2l0eT0iMC4yIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiIC8+PC9zdmc+')]"></div>
      
      {/* Сканирующая линия (вертикальная) - только для не-мобильных */}
      {!isMobile && (
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-px bg-blue-400/50"
          animate={{
            scaleY: [0, 1, 0],
            y: [0, 0, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 5, // увеличили задержку для оптимизации
          }}
        />
      )}
      
      {/* Сканирующая линия (горизонтальная) */}
      <motion.div
        className="absolute left-0 right-0 top-8 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"
        animate={{
          scaleX: [0, 1],
          opacity: [0, 0.5, 0],
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 6, // увеличили задержку для оптимизации
        }}
      />
      
      {/* Заголовок с техническими данными */}
      <div className="p-3 pb-1 border-b border-blue-500/20 flex justify-between items-center">
        <div className="flex items-center">
          <motion.div 
            className="w-2 h-2 rounded-full bg-blue-500/70 mr-2"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <h3 className="font-medium text-blue-100 text-sm truncate">
            {network.id === 'claude' ? (
              <GlitchedText text={network.name} interval={3000} glitchDuration={300} />
            ) : (
              network.name
            )}
          </h3>
        </div>
        <div className="flex items-center text-[9px] font-mono text-blue-400/70">
          <motion.div 
            className="w-1.5 h-1.5 mr-1 bg-blue-400/50"
            animate={{ 
              opacity: [0.5, 1, 0.5],
              boxShadow: [
                '0 0 0px rgba(59, 130, 246, 0.3)',
                '0 0 5px rgba(59, 130, 246, 0.6)',
                '0 0 0px rgba(59, 130, 246, 0.3)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          {netId}
        </div>
      </div>
      
      {/* Основное содержимое */}
      <div className="flex flex-col flex-grow justify-between p-3 relative">
        {/* Описание */}
        <p className="text-xs text-blue-200/80 mb-1 line-clamp-2">
          {network.description}
        </p>
        
        {/* Техническая информация - теги */}
        <div className="flex flex-wrap gap-1 mb-1">
          {techTags.map((tag, i) => (
            <motion.div 
              key={i}
              className="text-[7px] font-mono bg-blue-500/10 px-1 py-0.5 
                       rounded-sm text-blue-300/90 border border-blue-500/20"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: animationDelay + 0.2 + (i * 0.1) }}
            >
              {tag}
            </motion.div>
          ))}
        </div>
        
        {/* Индикатор статуса */}
        <div className="flex items-center mb-3">
          <div className="flex-1 h-px bg-blue-500/20 relative mr-2">
            <motion.div 
              className="absolute inset-y-0 left-0 bg-blue-400"
              initial={{ width: '0%' }}
              animate={{ width: '70%' }}
              transition={{ duration: 1, delay: animationDelay + 0.5 }}
            />
          </div>
          <div className="text-[8px] font-mono text-blue-300/90 flex items-center">
            <span>{versionNumber}</span>
            <motion.div 
              className="ml-1 w-1 h-1 rounded-full bg-green-400"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </div>
        
        {/* Ссылка на нейросеть */}
        <div className="flex items-center justify-between">
          {/* Декоративный элемент - только на не-мобильных */}
          {!isMobile && (
            <svg className="w-10 h-5 text-blue-400/20" viewBox="0 0 40 20">
              <path d="M0,10 L8,10 M32,10 L40,10" stroke="currentColor" strokeWidth="1" />
              <rect x="14" y="7" width="12" height="6" stroke="currentColor" strokeWidth="1" fill="none" />
            </svg>
          )}
          
          <a 
            href={network.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center px-3 py-1.5 rounded-sm
                     group-hover:bg-blue-500/30 bg-blue-500/20 transition-all
                     text-blue-100 text-xs border border-blue-500/30 
                     hover:border-blue-400/70 relative overflow-hidden"
          >
            <motion.span 
              className="relative z-10 flex items-center font-medium"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <span>ЗАПУСТИТЬ</span>
              <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </motion.span>
            
            {/* Анимированное свечение кнопки - только на не-мобильных */}
            {!isMobile && (
              <motion.div 
                className="absolute inset-0 bg-blue-400/10"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 7, // увеличили задержку
                }}
              />
            )}
          </a>
        </div>
      </div>
      
      {/* Угловые декоративные элементы */}
      <svg className="absolute top-0 right-0 w-5 h-5 text-blue-500/40" viewBox="0 0 24 24" fill="none">
        <path d="M0 0L24 0L24 24" stroke="currentColor" strokeWidth="1" />
      </svg>
      <svg className="absolute bottom-0 left-0 w-5 h-5 text-blue-500/40" viewBox="0 0 24 24" fill="none">
        <path d="M24 24L0 24L0 0" stroke="currentColor" strokeWidth="1" />
      </svg>
      
      {/* Голографические точки данных - только на не-мобильных */}
      {!isMobile && (
        <>
          <motion.div 
            className="absolute bottom-3 right-3 w-1 h-1 rounded-full bg-blue-400/70"
            animate={{
              opacity: [0.3, 0.7, 0.3],
              boxShadow: [
                '0 0 0px rgba(59, 130, 246, 0.3)',
                '0 0 4px rgba(59, 130, 246, 0.7)',
                '0 0 0px rgba(59, 130, 246, 0.3)'
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.1,
            }}
          />
          <motion.div 
            className="absolute top-9 left-2 w-1 h-1 rounded-full bg-blue-400/70"
            animate={{
              opacity: [0.3, 0.7, 0.3],
              boxShadow: [
                '0 0 0px rgba(59, 130, 246, 0.3)',
                '0 0 4px rgba(59, 130, 246, 0.7)',
                '0 0 0px rgba(59, 130, 246, 0.3)'
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.1 + 1,
            }}
          />
        </>
      )}
    </motion.div>
  );
};

export default NetworkCard; 