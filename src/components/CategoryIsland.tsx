import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Category } from '@/data/types';

interface CategoryIslandProps {
  category: Category;
  isSelected: boolean;
  onClick: () => void;
}

// Вспомогательная функция для создания технических значений - генерируем заранее
const generateTechValue = () => {
  return Math.floor(Math.random() * 1000).toString().padStart(3, '0');
};

// Предгенерируем набор технических ID
const TECH_IDS = Array.from({ length: 20 }, () => 
  Math.random().toString(16).substring(2, 8).toUpperCase()
);

// Предгенерируем технические значения
const TECH_VALUES = Array.from({ length: 20 }, () => generateTechValue());

// Предгенерируем сектора и координаты
const SECTORS = ["A", "B", "C", "D", "E", "F"];
const COORDINATES = Array.from({ length: 20 }, () => 
  `${Math.floor(Math.random() * 99)}.${Math.floor(Math.random() * 99)}`
);

// Предгенерируем статусы системы
const SYSTEM_STATUSES = [
  "ИНИЦИАЛИЗАЦИЯ", "СКАНИРОВАНИЕ", "ОПТИМИЗАЦИЯ", 
  "СИНХРОНИЗАЦИЯ", "НЕЙРОАНАЛИЗ", "КАЛИБРОВКА"
];

const CategoryIsland: React.FC<CategoryIslandProps> = ({ 
  category, 
  isSelected, 
  onClick 
}) => {
  // Получаем индекс из id категории для получения псевдослучайных данных
  const index = useMemo(() => category.id.length + category.name.length, [category]);
  
  // Используем useMemo для фиксации значения duration и технических данных
  const duration = useMemo(() => 5 + (index % 3), [index]);
  const techData = useMemo(() => {
    return {
      sysId: TECH_IDS[index % TECH_IDS.length],
      values: [
        TECH_VALUES[index % TECH_VALUES.length],
        TECH_VALUES[(index + 1) % TECH_VALUES.length]
      ],
      sector: SECTORS[index % SECTORS.length],
      coordinate: COORDINATES[index % COORDINATES.length],
      status: SYSTEM_STATUSES[index % SYSTEM_STATUSES.length]
    };
  }, [index]);
  
  // Определяем, мобильное ли устройство
  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  }, []);
  
  // Оптимизация: уменьшаем количество частиц на мобильных устройствах
  const particleCount = isMobile ? 3 : 4;
  
  // Определяем, является ли название категории длинным
  const isLongCategoryName = useMemo(() => {
    return category.name.length > 15;
  }, [category.name]);
  
  // Вычисляем цвет категории для различных элементов
  const getCategoryColorClasses = () => {
    if (category.color.includes('purple')) return {
      glow: 'from-purple-500/30',
      border: 'border-purple-500/40',
      text: 'text-purple-300',
      indicator: 'bg-purple-400',
      shadowStart: 'rgba(168, 85, 247, 0.2)',
      shadowEnd: 'rgba(168, 85, 247, 0.4)'
    };
    if (category.color.includes('blue')) return {
      glow: 'from-blue-500/30',
      border: 'border-blue-500/40',
      text: 'text-blue-300',
      indicator: 'bg-blue-400',
      shadowStart: 'rgba(59, 130, 246, 0.2)',
      shadowEnd: 'rgba(59, 130, 246, 0.4)'
    };
    if (category.color.includes('green')) return {
      glow: 'from-green-500/30',
      border: 'border-green-500/40',
      text: 'text-green-300',
      indicator: 'bg-green-400',
      shadowStart: 'rgba(16, 185, 129, 0.2)',
      shadowEnd: 'rgba(16, 185, 129, 0.4)'
    };
    if (category.color.includes('yellow')) return {
      glow: 'from-yellow-500/30',
      border: 'border-yellow-500/40',
      text: 'text-yellow-300',
      indicator: 'bg-yellow-400',
      shadowStart: 'rgba(234, 179, 8, 0.2)',
      shadowEnd: 'rgba(234, 179, 8, 0.4)'
    };
    // По умолчанию - синий
    return {
      glow: 'from-blue-500/30',
      border: 'border-blue-500/40',
      text: 'text-blue-300',
      indicator: 'bg-blue-400',
      shadowStart: 'rgba(59, 130, 246, 0.2)',
      shadowEnd: 'rgba(59, 130, 246, 0.4)'
    };
  };
  
  const colorClasses = getCategoryColorClasses();
  
  return (
    <motion.div
      className={`relative cursor-pointer ${isSelected ? 'z-20' : 'z-10'}`}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
      onClick={onClick}
      initial={{ opacity: 0, y: 50 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        scale: isSelected ? 1.05 : 1,
      }}
      transition={{
        duration: 0.5,
        layout: { duration: 0.6, type: "spring" },
      }}
    >
      {/* Голографическая проекция под картой */}
      <motion.div
        className={`absolute w-full h-full -bottom-3 -right-3
                  ${colorClasses.glow} to-transparent blur-md rounded-lg`}
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Основная голографическая карта */}
      <motion.div
        className={`relative w-64 h-[180px] overflow-hidden rounded-lg
                  bg-gradient-to-br from-blue-900/10 to-blue-950/20 backdrop-blur-sm 
                  ${colorClasses.border} border
                  ${isSelected ? `shadow-lg shadow-${colorClasses.shadowStart}` : ''}`}
        animate={{
          y: [0, -5, 0],
          boxShadow: isSelected 
            ? [`0 0 10px ${colorClasses.shadowStart}`, `0 0 20px ${colorClasses.shadowEnd}`, `0 0 10px ${colorClasses.shadowStart}`]
            : ['none', 'none', 'none'],
        }}
        transition={{
          y: { duration, repeat: Infinity, ease: "easeInOut" },
          boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        {/* Фоновая голографическая сетка */}
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzYwQTVGQSIgb3BhY2l0eT0iMC4yIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiIC8+PC9zdmc+')]"></div>
        
        {/* Верхняя панель с техническими данными */}
        <div className="absolute top-0 left-0 right-0 h-7 px-2 flex justify-between items-center border-b border-blue-500/20 bg-blue-900/30 backdrop-blur-sm">
          <div className="flex items-center">
            <motion.div 
              className={`w-1.5 h-1.5 rounded-full ${colorClasses.indicator} mr-1`}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <div className="text-[9px] font-mono text-blue-400/90 truncate">
              {techData.sector}/{techData.sysId}
            </div>
          </div>
          <div className="text-[9px] font-mono text-blue-400/80 flex items-center">
            <span className="mr-1">{techData.values[0]}</span>
            <motion.div 
              className="w-1 h-px bg-blue-400/60 mx-0.5"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span>{techData.values[1]}</span>
          </div>
        </div>
        
        {/* Декоративные угловые элементы */}
        <svg className="absolute top-2 right-2 w-5 h-5 text-blue-500/40" viewBox="0 0 24 24" fill="none">
          <path d="M2 2L22 2L22 22" stroke="currentColor" strokeWidth="1" />
        </svg>
        <svg className="absolute bottom-2 left-2 w-5 h-5 text-blue-500/40" viewBox="0 0 24 24" fill="none">
          <path d="M22 22L2 22L2 2" stroke="currentColor" strokeWidth="1" />
        </svg>
        
        {/* Сканирующие линии */}
        {!isMobile && (
          <motion.div
            className="absolute left-0 right-0 top-7 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent"
            animate={{ 
              opacity: [0, 0.8, 0],
              scaleX: [0, 1],
              x: ['-100%', '100%'],
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 5, // увеличили задержку для оптимизации
            }}
          />
        )}
        
        {/* Основное содержимое */}
        <div className="flex flex-col justify-between h-full p-4 pt-9 relative z-10">
          <div>
            <motion.div
              className="flex items-center mb-2"
              animate={{ opacity: [0.9, 1, 0.9] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className={`w-2.5 h-2.5 rounded-full ${colorClasses.indicator} mr-2`} />
              <motion.h3 
                className={`font-bold ${isLongCategoryName ? 'text-base' : 'text-lg'} ${colorClasses.text} leading-tight`}
                animate={{ 
                  textShadow: [
                    `0 0 5px ${colorClasses.shadowStart}`, 
                    `0 0 10px ${colorClasses.shadowEnd}`, 
                    `0 0 5px ${colorClasses.shadowStart}`
                  ] 
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {category.name}
              </motion.h3>
            </motion.div>
            
            {/* Статус системы */}
            <div className="flex items-center my-1.5">
              <div className="text-[9px] font-mono text-blue-400/80">СТАТУС:</div>
              <div className={`text-[9px] font-mono ${colorClasses.text} ml-1.5 flex items-center`}>
                {techData.status}
                <motion.div 
                  className={`ml-1 w-1 h-1 rounded-full ${colorClasses.indicator}`}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
            </div>
            
            {/* Описание с ограничением длины */}
            <p className="text-xs text-blue-100/70 line-clamp-2 mt-1.5">{category.description}</p>
          </div>
          
          {/* Голографические частицы */}
          {Array.from({length: particleCount}).map((_, i) => (
            <motion.div 
              key={i}
              className={`absolute w-1 h-1 rounded-full ${colorClasses.indicator}`}
              style={{
                left: `${15 + (i * 20)}%`,
                top: `${40 + (i * 10)}%`,
              }}
              animate={{
                y: [0, -5, 0],
                opacity: [0.3, 0.7, 0.3],
                boxShadow: [
                  `0 0 0px ${colorClasses.shadowStart}`,
                  `0 0 5px ${colorClasses.shadowEnd}`,
                  `0 0 0px ${colorClasses.shadowStart}`
                ],
              }}
              transition={{
                duration: 2 + i * 0.7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          ))}
          
          {/* Геометрический элемент в углу (стиль JJ) */}
          <motion.div 
            className="absolute right-3 top-12 w-16 h-16 opacity-10"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 10L90 50L50 90L10 50L50 10Z" stroke="currentColor" strokeWidth="1" className={colorClasses.text} />
              <path d="M50 30L70 50L50 70L30 50L50 30Z" stroke="currentColor" strokeWidth="1" className={colorClasses.text} />
              <path d="M50 10L50 30M90 50L70 50M50 90L50 70M10 50L30 50" stroke="currentColor" strokeWidth="1" className={colorClasses.text} />
            </svg>
          </motion.div>
          
          {/* Футер с информацией */}
          <div className="mt-auto pt-2">
            {/* Индикатор тренировки в стиле загрузки */}
            <div className="w-full h-px bg-blue-500/20 mb-2 relative overflow-hidden">
              <motion.div
                className={`absolute top-0 left-0 h-full ${colorClasses.indicator}`}
                initial={{ width: '0%' }}
                animate={{ width: `${70 + (index % 20)}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-mono text-blue-300/70 flex items-center">
                <span className="text-blue-400/90">{techData.coordinate}</span>
                <span className="mx-1 opacity-50">|</span>
                {category.id.toUpperCase()}
              </div>
              
              <motion.div 
                className="flex items-center"
                animate={{ opacity: [0.9, 1, 0.9] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.span 
                  className={`text-[9px] font-mono rounded-sm backdrop-blur-sm 
                            ${colorClasses.text} flex items-center`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="mr-1 px-1.5 py-0.5 bg-blue-500/20 border border-blue-500/30 rounded-sm">
                    {category.networks.length}
                  </span>
                  <span className={isLongCategoryName ? 'tracking-tighter' : ''}>НЕЙРОСЕТЕЙ</span>
                  <svg className="w-3 h-3 text-blue-400 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.span>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Неоновое свечение при выборе */}
      {isSelected && (
        <>
          <motion.div
            className={`absolute -z-10 inset-0 rounded-lg ${colorClasses.glow} opacity-0 blur-lg`}
            animate={{ 
              opacity: [0, 0.3, 0],
              scale: [0.95, 1.05, 0.95],
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
            }}
          />
          {/* Дополнительные световые эффекты при выборе */}
          <motion.div
            className="absolute -z-20 inset-0 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              transition: { duration: 0.3 }
            }}
          >
            {Array.from({length: 3}).map((_, i) => (
              <motion.div
                key={i}
                className={`absolute inset-0 rounded-lg ${colorClasses.border} border opacity-0`}
                animate={{ 
                  opacity: [0, 0.4, 0],
                  scale: [1, 1.1 + (i * 0.05), 1],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.7,
                }}
              />
            ))}
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default CategoryIsland; 