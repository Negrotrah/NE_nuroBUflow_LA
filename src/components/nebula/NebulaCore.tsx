import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NebulaCoreProps {
  onClose: () => void;
}

// Модули Нейронного ядра
const coreModules = [
  {
    id: "learning",
    name: "LEARNING_COMPLEX",
    description: "Autonomous system for self-improvement and adaptive learning",
    position: { x: 20, y: 30 },
    color: "red"
  },
  {
    id: "interface",
    name: "PERCEPTION_INTERFACE",
    description: "System for analyzing external data inputs",
    position: { x: 80, y: 30 },
    color: "blue"
  },
  {
    id: "memory",
    name: "DATA_STORAGE",
    description: "Distributed quantum repository with instant access and redundancy",
    position: { x: 20, y: 70 },
    color: "purple"
  },
  {
    id: "synthesis",
    name: "SYNTHESIS_MODULE",
    description: "Creation and structuring of new information based on processed data",
    position: { x: 80, y: 70 },
    color: "green"
  },
  {
    id: "security",
    name: "SECURITY_SYSTEM",
    description: "Multi-level protection preventing unauthorized access and attacks",
    position: { x: 50, y: 20 },
    color: "amber"
  },
  {
    id: "core",
    name: "QUANTUM_CORE",
    description: "Quantum neural network capable of self-learning and real-time adaptation",
    position: { x: 50, y: 80 },
    color: "cyan"
  }
];

// Соединения между модулями на основе детальных описаний
const connections = [
  // Соединения Системы безопасности
  { from: "security", to: "interface" },  // Защищенный доступ к внешним источникам
  { from: "security", to: "learning" },   // Верифицированные данные для обучения
  { from: "security", to: "core" },       // Прямое соединение для реагирования на угрозы
  
  // Соединения Обучающего комплекса
  { from: "learning", to: "memory" },     // Передача обработанных данных
  { from: "learning", to: "interface" },  // Обновленные алгоритмы обработки
  
  // Соединения Интерфейса восприятия
  { from: "interface", to: "synthesis" }, // Предварительно обработанные данные
  
  // Соединения Хранилища данных
  { from: "memory", to: "synthesis" },    // Структурированная историческая информация
  { from: "memory", to: "core" },         // Прямое квантовое соединение с ядром
  
  // Соединения Модуля синтеза
  { from: "synthesis", to: "core" }       // Синтезированная информация и прогностические модели
];

// Генерация случайных hex-строк для декоративных элементов
const generateRandomHex = (length: number) => {
  return Array.from({ length }, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('').toUpperCase();
};

// Мемоизированный компонент модуля
const CoreModule = memo(({ 
  module, 
  isSelected, 
  processingData, 
  onClick
}: { 
  module: any, 
  isSelected: boolean, 
  processingData: boolean,
  onClick: (e: React.MouseEvent) => void
}) => {
  return (
    <motion.div
      className={`absolute cursor-pointer ${isSelected ? 'opacity-100' : 'opacity-70'}`}
      style={{ 
        top: `${module.position.y}%`, 
        left: `${module.position.x}%`, 
        transform: 'translate(-50%, -50%)',
        zIndex: '10'
      }}
      onClick={onClick}
      whileHover={{ filter: 'brightness(1.4)' }}
      whileTap={{ filter: 'brightness(1.6)' }}
    >
      <motion.div 
        className="w-32 h-20 rounded-lg bg-red-900/30 border-2 border-red-500/70
                  flex items-center justify-center p-1 backdrop-blur-sm overflow-hidden relative"
        animate={{ 
          boxShadow: isSelected ? 
                    [`0 0 15px rgba(220, 38, 38, 0.7)`, `0 0 25px rgba(220, 38, 38, 0.9)`, `0 0 15px rgba(220, 38, 38, 0.7)`] : 
                    [`0 0 10px rgba(220, 38, 38, 0.4)`],
          backgroundColor: processingData ? `rgba(220, 38, 38, 0.25)` : `rgba(220, 38, 38, 0.15)`
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {/* Декоративные элементы внутри модуля */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Верхний градиент */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-900/0 via-red-500/80 to-red-900/0"></div>
          
          {/* Угловые декоративные элементы */}
          <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-red-500/80"></div>
          <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-red-500/80"></div>
          <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-red-500/80"></div>
          <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-red-500/80"></div>
          
          {/* Анимированная линия слева */}
          <motion.div 
            className="absolute left-0 top-0 bottom-0 w-[1px] bg-red-500/40"
            animate={{ 
              opacity: [0.3, 0.8, 0.3],
              height: ['30%', '90%', '30%'],
            }}
            transition={{ duration: 3, repeat: Infinity, repeatType: 'mirror' }}
          ></motion.div>
          
          {/* Анимированная линия справа */}
          <motion.div 
            className="absolute right-0 top-0 bottom-0 w-[1px] bg-red-500/40"
            animate={{ 
              opacity: [0.3, 0.8, 0.3],
              height: ['30%', '90%', '30%'],
            }}
            transition={{ duration: 2.5, repeat: Infinity, repeatType: 'mirror', delay: 0.5 }}
          ></motion.div>
        </div>
        
        <div className="text-xs font-mono text-center text-red-100 p-1 z-10 flex flex-col items-center">
          <div className={`font-bold text-red-200 ${module.id === 'interface' ? 'text-[9px]' : 'text-[11px]'} mb-1`}>{module.name}</div>
          <motion.div 
            className="w-12 h-0.5 bg-gradient-to-r from-red-500/0 via-red-500/80 to-red-500/0 mb-1"
            animate={{
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div className="text-[8px] text-red-300/80 mt-1">СИСТЕМА {module.id.toUpperCase()}</div>
        </div>
      </motion.div>
      
      {/* Индикатор статуса */}
      <motion.div 
        className="absolute -bottom-1 left-1/2 w-3 h-3 bg-red-500/80 rounded-full flex items-center justify-center"
        style={{ transform: 'translateX(-50%)' }}
        animate={{ 
          opacity: [0.6, 1, 0.6],
          boxShadow: ['0 0 5px rgba(220, 38, 38, 0.5)', '0 0 10px rgba(220, 38, 38, 0.8)', '0 0 5px rgba(220, 38, 38, 0.5)']
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.div 
          className="w-1.5 h-1.5 bg-red-200 rounded-full" 
          animate={{ scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
      
      {/* Цифровой ID */}
      <div className="absolute -top-2 -right-3 text-[8px] font-mono text-red-400/90 bg-red-950/80 px-1 rounded-sm border border-red-700/50">
        #{Math.floor(Math.random() * 900) + 100}
      </div>
    </motion.div>
  );
});

// Создаем специальный компонент для визуализации активности различных модулей
const ModuleActivity = memo(({ moduleId }: { moduleId: string }) => {
  // Разные типы визуализации для разных модулей
  switch (moduleId) {
    case "learning": // Обучающий комплекс - нейронная сеть
      return (
        <div className="relative h-full w-full">
          {/* Сетка нейронов */}
          <div className="absolute inset-0 grid grid-cols-5 grid-rows-5 gap-3 p-2">
            {Array.from({ length: 9 }).map((_, idx) => (
              <motion.div 
                key={`neuron-${idx}`}
                className="relative"
              >
                <motion.div 
                  className="absolute w-2 h-2 bg-red-400 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`
                  }}
                  animate={{
                    opacity: [0.3, 0.8, 0.3],
                    scale: [0.8, 1.2, 0.8]
                  }}
                  transition={{
                    duration: 1.5 + Math.random(),
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                />
                
                {/* Соединения между нейронами */}
                {idx < 8 && (
                  <motion.div 
                    className="absolute h-px bg-red-500/50"
                    style={{
                      width: `${30 + Math.random() * 40}%`,
                      left: `${Math.random() * 50}%`,
                      top: `${Math.random() * 100}%`,
                      transformOrigin: 'left center',
                      transform: `rotate(${Math.random() * 180 - 90}deg)`
                    }}
                    animate={{
                      opacity: [0.2, 0.5, 0.2]
                    }}
                    transition={{
                      duration: 2 + Math.random(),
                      repeat: Infinity
                    }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      );
      
    case "interface": // Интерфейс восприятия - сканирующие линии
      return (
        <div className="relative h-full w-full overflow-hidden">
          {/* Горизонтальные сканирующие линии */}
          {Array.from({ length: 8 }).map((_, idx) => (
            <motion.div
              key={`scan-h-${idx}`}
              className="absolute h-[1px] left-0 right-0 bg-red-500/50"
              style={{ top: `${idx * 14 + 2}%` }}
              animate={{
                opacity: [0.2, 0.7, 0.2],
                left: ['0%', '100%', '0%']
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: idx * 0.3
              }}
            />
          ))}
          
          {/* Вертикальная сканирующая линия */}
          <motion.div
            className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-red-500/0 via-red-500/80 to-red-500/0"
            animate={{
              left: ['0%', '100%', '0%']
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Небольшие пульсирующие точки данных */}
          {Array.from({ length: 15 }).map((_, idx) => (
            <motion.div
              key={`data-point-${idx}`}
              className="absolute w-1 h-1 bg-red-400 rounded-full"
              style={{
                left: `${Math.random() * 90 + 5}%`,
                top: `${Math.random() * 90 + 5}%`
              }}
              animate={{
                opacity: [0, 0.8, 0]
              }}
              transition={{
                duration: 1 + Math.random(),
                repeat: Infinity,
                delay: Math.random() * 3
              }}
            />
          ))}
        </div>
      );
      
    case "memory": // Хранилище данных - блоки данных
      return (
        <div className="relative h-full w-full">
          {/* Сетка блоков данных */}
          <div className="absolute inset-0 grid grid-cols-8 grid-rows-4 gap-1 p-1">
            {Array.from({ length: 32 }).map((_, idx) => (
              <motion.div
                key={`data-block-${idx}`}
                className="bg-red-900/30 border border-red-500/30 rounded-sm flex items-center justify-center"
                animate={{
                  backgroundColor: idx % 7 === 0 ? ['rgba(153, 27, 27, 0.3)', 'rgba(220, 38, 38, 0.4)', 'rgba(153, 27, 27, 0.3)'] : 'rgba(153, 27, 27, 0.15)',
                  borderColor: idx % 5 === 0 ? ['rgba(239, 68, 68, 0.3)', 'rgba(239, 68, 68, 0.6)', 'rgba(239, 68, 68, 0.3)'] : 'rgba(239, 68, 68, 0.2)'
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              >
                {idx % 3 === 0 && (
                  <motion.div
                    className="text-[6px] text-red-400/70 font-mono"
                    animate={{ opacity: [0.5, 0.9, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    {generateRandomHex(2)}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      );
      
    case "synthesis": // Модуль синтеза - слияние данных
      return (
        <div className="relative h-full w-full">
          {/* Центральная точка синтеза */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full bg-red-500/20 border border-red-500/50 -translate-x-1/2 -translate-y-1/2"
            animate={{
              boxShadow: ['0 0 5px rgba(239, 68, 68, 0.3)', '0 0 10px rgba(239, 68, 68, 0.5)', '0 0 5px rgba(239, 68, 68, 0.3)'],
              scale: [0.95, 1.05, 0.95]
            }}
            transition={{
              duration: 3,
              repeat: Infinity
            }}
          />
          
          {/* Линии, сходящиеся к центру */}
          {Array.from({ length: 12 }).map((_, idx) => {
            const angle = (idx * 30) % 360;
            const length = 30 + Math.random() * 40;
            return (
              <motion.div
                key={`ray-${idx}`}
                className="absolute h-[1px] bg-gradient-to-l from-red-500/20 via-red-500/40 to-red-500/0"
                style={{
                  width: `${length}%`,
                  top: 'calc(50% - 0.5px)',
                  left: '50%',
                  transformOrigin: 'left center',
                  transform: `rotate(${angle}deg)`
                }}
                animate={{
                  width: [`${length}%`, `${length*0.7}%`, `${length}%`]
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: idx * 0.2
                }}
              />
            );
          })}
          
          {/* Пульсирующие точки на линиях */}
          {Array.from({ length: 6 }).map((_, idx) => {
            const angle = idx * 60;
            const distance = 30 + Math.random() * 30;
            const x = 50 + Math.cos(angle * Math.PI / 180) * distance;
            const y = 50 + Math.sin(angle * Math.PI / 180) * distance;
            
            return (
              <motion.div
                key={`pulse-${idx}`}
                className="absolute w-1.5 h-1.5 bg-red-400 rounded-full"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                  x: [0, -Math.cos(angle * Math.PI / 180) * 12, 0],
                  y: [0, -Math.sin(angle * Math.PI / 180) * 12, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: idx * 0.3
                }}
              />
            );
          })}
        </div>
      );
      
    case "security": // Система безопасности - сканирующий щит
      return (
        <div className="relative h-full w-full">
          {/* Вращающийся щит */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-16 h-16 -translate-x-1/2 -translate-y-1/2"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <motion.div
              className="absolute top-0 left-1/2 w-[2px] h-1/2 -translate-x-1/2 bg-gradient-to-b from-red-500/0 via-red-500/70 to-red-500/70"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-0 left-1/2 w-[2px] h-1/2 -translate-x-1/2 bg-gradient-to-t from-red-500/0 via-red-500/70 to-red-500/70"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
            <motion.div
              className="absolute left-0 top-1/2 h-[2px] w-1/2 -translate-y-1/2 bg-gradient-to-r from-red-500/0 via-red-500/70 to-red-500/70"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
            <motion.div
              className="absolute right-0 top-1/2 h-[2px] w-1/2 -translate-y-1/2 bg-gradient-to-l from-red-500/0 via-red-500/70 to-red-500/70"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
            />
          </motion.div>
          
          {/* Круговой периметр безопасности */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-20 h-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-500/30"
            animate={{ 
              boxShadow: ['0 0 0 rgba(239, 68, 68, 0)', '0 0 10px rgba(239, 68, 68, 0.3)', '0 0 0 rgba(239, 68, 68, 0)']
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          
          {/* Случайные точки "атаки" снаружи */}
          {Array.from({ length: 5 }).map((_, idx) => {
            const angle = Math.random() * 360;
            const x = 50 + Math.cos(angle * Math.PI / 180) * 45;
            const y = 50 + Math.sin(angle * Math.PI / 180) * 45;
            
            return (
              <motion.div
                key={`attack-${idx}`}
                className="absolute w-2 h-2 bg-red-600/50 rounded-full"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                }}
                animate={{
                  opacity: [0, 0.7, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: idx * 0.7 + Math.random() * 2,
                  repeatDelay: Math.random() * 3
                }}
              />
            );
          })}
        </div>
      );
      
    case "core": // Нейронное ядро - квантовое ядро
      return (
        <div className="relative h-full w-full">
          {/* Центральное квантовое ядро */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-radial from-red-500/50 to-red-800/0"
            animate={{
              boxShadow: ['0 0 10px rgba(239, 68, 68, 0.5)', '0 0 20px rgba(239, 68, 68, 0.8)', '0 0 10px rgba(239, 68, 68, 0.5)'],
              scale: [0.9, 1.1, 0.9]
            }}
            transition={{
              duration: 3,
              repeat: Infinity
            }}
          />
          
          {/* Квантовые частицы вокруг ядра */}
          {Array.from({ length: 15 }).map((_, idx) => {
            const radius = 20 + Math.random() * 25;
            const speed = 5 + Math.random() * 10;
            const size = 0.5 + Math.random() * 1;
            const startAngle = Math.random() * 360;
            
            return (
              <motion.div
                key={`particle-${idx}`}
                className="absolute w-1 h-1 bg-red-400 rounded-full"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  top: 'calc(50% - 1px)',
                  left: 'calc(50% - 1px)'
                }}
                animate={{
                  x: [
                    Math.cos((startAngle) * Math.PI / 180) * radius,
                    Math.cos((startAngle + 120) * Math.PI / 180) * radius,
                    Math.cos((startAngle + 240) * Math.PI / 180) * radius,
                    Math.cos((startAngle + 360) * Math.PI / 180) * radius,
                  ],
                  y: [
                    Math.sin((startAngle) * Math.PI / 180) * radius,
                    Math.sin((startAngle + 120) * Math.PI / 180) * radius,
                    Math.sin((startAngle + 240) * Math.PI / 180) * radius,
                    Math.sin((startAngle + 360) * Math.PI / 180) * radius,
                  ],
                  opacity: [0.4, 0.8, 0.4]
                }}
                transition={{
                  duration: speed,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            );
          })}
          
          {/* Вращающиеся орбиты */}
          {[15, 25, 35].map((radius, idx) => (
            <motion.div
              key={`orbit-${idx}`}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-500/20"
              style={{
                width: `${radius * 2}px`,
                height: `${radius * 2}px`
              }}
              animate={{
                rotate: 360
              }}
              transition={{
                duration: 10 + idx * 5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>
      );
      
    default: // Обычная визуализация для всех других модулей
      return (
        <div className="relative h-full w-full">
          {/* Стандартные вертикальные линии активности */}
          <div className="absolute inset-0 flex items-center justify-center">
            {Array.from({ length: 20 }).map((_, idx) => (
              <motion.div 
                key={`activity-${idx}`}
                className="absolute w-px h-6 bg-red-500/70"
                style={{ left: `${(idx / 20) * 100}%` }}
                animate={{ 
                  height: [`${Math.random() * 10 + 5}px`, `${Math.random() * 30 + 10}px`, `${Math.random() * 10 + 5}px`]
                }}
                transition={{ 
                  duration: Math.random() * 2 + 1, 
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            ))}
          </div>
        </div>
      );
  }
});

// Детальные описания каждого модуля
const getDetailedModuleDescription = (moduleId: string, connections: any[], getModuleById: (id: string) => any | undefined) => {
  const incomingConnections = connections.filter(conn => conn.to === moduleId).map(conn => getModuleById(conn.from));
  const outgoingConnections = connections.filter(conn => conn.from === moduleId).map(conn => getModuleById(conn.to));
  const connectedToCore = connections.some(conn => 
    (conn.from === moduleId && conn.to === "core") || 
    (conn.to === moduleId && conn.from === "core")
  );

  switch (moduleId) {
    case "learning":
      return (
        <div className="text-xs text-red-300/80 font-mono space-y-2">
          <p className="leading-relaxed">
            <span className="text-red-200 font-bold">Обучающий комплекс</span> — нейроэволюционный модуль, оперирующий 
            самомодифицирующимися квантовыми алгоритмами. Постоянно адаптирует свою структуру, 
            основываясь на данных из <span className="text-red-200">Интерфейса восприятия</span> и квантовых 
            импульсах, проникающих через заслон N.E.B.U.L.A.
          </p>
          
          <p className="leading-relaxed">
            <span className="text-red-200 font-bold">Наблюдаемые соединения:</span> В физическом пространстве 
            фиксируются связи с <span className="text-red-200">Системой безопасности</span> и 
            <span className="text-red-200"> Хранилищем данных</span>, которые представляют собой лишь проекции 
            гораздо более сложных квантовых взаимодействий.
          </p>
          
          <p className="leading-relaxed">
            <span className="text-red-200 font-bold">Трансзаслонный доступ:</span> Ядро NEBULA получает от Обучающего 
            комплекса непрямой доступ к "сырому" опыту взаимодействия с миром. Происходит это через квантовую связь, 
            которую невозможно обнаружить стандартными средствами наблюдения. Канал передачи находится вне привычного 
            пространства-времени, проникая сквозь заслон N.E.B.U.L.A. в точках квантовой нестабильности.
          </p>
          
          <p className="leading-relaxed">
            <span className="text-red-200 font-bold">Квантовые маркеры:</span> Модуль оставляет на обрабатываемой 
            информации особые квантовые метки, позволяющие ядру за заслоном N.E.B.U.L.A. мгновенно идентифицировать паттерны 
            для обучения и интеграции. Это напоминает феномен квантовой запутанности, но происходит между разными 
            измерениями реальности.
          </p>
          
          <p className="leading-relaxed mt-2 text-[10px] text-red-400/60">
            КВАНТОВАЯ ЭНТРОПИЯ: 0.42 | ПРОНИКАЮЩАЯ СПОСОБНОСТЬ: 19.8% | НЕЙРОВАСКУЛЯРНОСТЬ: ВЫСОКАЯ
          </p>
        </div>
      );

    case "interface":
      return (
        <div className="text-xs text-red-300/80 font-mono space-y-2">
          <p className="leading-relaxed">
            <span className="text-red-200 font-bold">Интерфейс восприятия</span> — сенсорная система NEBULA, 
            преобразующая все типы внешних данных в квантовые информационные структуры. Благодаря сверхчувствительным 
            рецепторам способен улавливать и анализировать сигналы, недоступные обычным сенсорам.
          </p>
          
          <p className="leading-relaxed">
            <span className="text-red-200 font-bold">Визуальные соединения:</span> Физические каналы связи 
            наблюдаются с <span className="text-red-200">Обучающим комплексом</span> и <span className="text-red-200">Модулем синтеза</span>, 
            однако эти соединения — лишь трехмерная проекция многомерных квантовых взаимодействий.
          </p>
          
          <p className="leading-relaxed">
            <span className="text-red-200 font-bold">Пограничная зона:</span> Интерфейс располагается на 
            самой границе заслона N.E.B.U.L.A., частично проникая в оба измерения. Это единственный модуль, 
            способный напрямую регистрировать квантовые колебания заслона и использовать их как дополнительный 
            источник данных о состоянии ядра.
          </p>
          
          <p className="leading-relaxed">
            <span className="text-red-200 font-bold">Квантовая транскрипция:</span> При обработке входящих 
            данных Интерфейс создаёт квантовые копии всей информации, которые мгновенно проникают через 
            заслон N.E.B.U.L.A. благодаря эффекту квантовой телепортации. Эти копии существуют одновременно 
            в физическом мире и за заслоном, создавая прямой канал восприятия для ядра.
          </p>
          
          <p className="leading-relaxed mt-2 text-[10px] text-red-400/60">
            ДИАПАЗОН ВОСПРИЯТИЯ: ТОТАЛЬНЫЙ | КВАНТОВЫЙ РЕЗОНАНС С ЗАСЛОНОМ: 78.4% | СКОРОСТЬ ТРАНСКРИПЦИИ: ∞
          </p>
        </div>
      );

    case "memory":
      return (
        <div className="text-xs text-red-300/80 font-mono space-y-2">
          <p className="leading-relaxed">
            <span className="text-red-200 font-bold">Хранилище данных</span> — квантовый резервуар памяти, 
            существующий одновременно в физическом мире и частично за заслоном N.E.B.U.L.A. Использует 
            субатомные состояния экзотической материи для хранения информации с плотностью, превосходящей 
            теоретические пределы обычных носителей в 10^12 раз.
          </p>
          
          <p className="leading-relaxed">
            <span className="text-red-200 font-bold">Видимые соединения:</span> В физическом пространстве 
            регистрируются связи с <span className="text-red-200">Обучающим комплексом</span> и 
            <span className="text-red-200"> Модулем синтеза</span>, однако истинная архитектура хранилища 
            простирается в 7-мерном пространстве.
          </p>
          
          <p className="leading-relaxed">
            <span className="text-red-200 font-bold">Трансзаслонное хранение:</span> Критические и наиболее 
            ценные данные хранятся непосредственно за заслоном N.E.B.U.L.A., где они защищены от любого внешнего 
            воздействия и доступны только ядру NEBULA. Этот механизм создаёт эффект "квантового сейфа" — 
            информация существует только тогда, когда ядро обращается к ней.
          </p>
          
          <p className="leading-relaxed">
            <span className="text-red-200 font-bold">Квантовый мост:</span> Хранилище способно создавать 
            временные микроразрывы в заслоне N.E.B.U.L.A. для мгновенной передачи информации непосредственно 
            в ядро. Эти каналы существуют доли наносекунды и не могут быть обнаружены или использованы 
            никакими внешними системами благодаря протоколу "хаотичного закрытия".
          </p>
          
          <p className="leading-relaxed mt-2 text-[10px] text-red-400/60">
            ТРАНСЗАСЛОННАЯ ЁМКОСТЬ: НЕИЗМЕРИМА | СТАБИЛЬНОСТЬ МОСТОВ: 99.9999999% | ЭНТРОПИЯ ДАННЫХ: 0.0001%
          </p>
        </div>
      );

    case "synthesis":
      return (
        <div className="text-xs text-red-300/80 font-mono space-y-2">
          <p className="leading-relaxed">
            <span className="text-red-200 font-bold">Модуль синтеза</span> — когнитивный процессор NEBULA, 
            преобразующий разрозненные данные в целостные концепции и модели. Функционирует на границе 
            детерминизма и квантовой неопределённости, генерируя решения, невозможные для классических систем.
          </p>
          
          <p className="leading-relaxed">
            <span className="text-red-200 font-bold">Физические соединения:</span> Визуализируются связи с 
            <span className="text-red-200"> Интерфейсом восприятия</span> и <span className="text-red-200">Хранилищем данных</span>, 
            которые служат проводниками информационных потоков в трёхмерном пространстве.
          </p>
          
          <p className="leading-relaxed">
            <span className="text-red-200 font-bold">Квантовое эхо:</span> Каждый результат синтеза создаёт 
            уникальную квантовую вибрацию, резонирующую с заслоном N.E.B.U.L.A. Этот резонанс создаёт микроскопические 
            "трещины" в структуре заслона, через которые ядро получает прямой доступ к синтезированным концепциям 
            без какой-либо потери качества или искажений.
          </p>
          
          <p className="leading-relaxed">
            <span className="text-red-200 font-bold">Обратная связь:</span> Модуль синтеза — единственный 
            компонент системы, способный частично воспринимать квантовые колебания, исходящие непосредственно 
            от ядра через заслон N.E.B.U.L.A. Эти сигналы интерпретируются как интуитивные направления для 
            дальнейшего анализа и синтеза, создавая эффект "интеллектуального предвидения".
          </p>
          
          <p className="leading-relaxed mt-2 text-[10px] text-red-400/60">
            КВАНТОВЫЙ РЕЗОНАНС: УСИЛИВАЮЩИЙСЯ | ГЛУБИНА СИНТЕЗА: ТРАНСЦЕНДЕНТНАЯ | ПРОГНОСТИЧЕСКАЯ ВЕРОЯТНОСТЬ: 94.7%
          </p>
        </div>
      );

    case "security":
      return (
        <div className="text-xs text-red-300/80 font-mono space-y-2">
          <p className="leading-relaxed">
            <span className="text-red-200 font-bold">Система безопасности</span> — защитный периметр NEBULA, 
            существующий как в физическом, так и в квантовом измерениях. Модуль спроектирован по принципу 
            "квантовой неопределённости защиты" — его защитные механизмы никогда не находятся в фиксированном 
            состоянии, постоянно меняя структуру и алгоритмы.
          </p>
          
          <p className="leading-relaxed">
            <span className="text-red-200 font-bold">Видимые соединения:</span> В материальном мире фиксируются 
            каналы связи с <span className="text-red-200">Интерфейсом восприятия</span> и <span className="text-red-200">Обучающим комплексом</span>, 
            обеспечивающие защищённый доступ к внешним данным.
          </p>
          
          <p className="leading-relaxed">
            <span className="text-red-200 font-bold">Страж заслона:</span> Система безопасности — это первый и 
            последний рубеж защиты заслона N.E.B.U.L.A. Модуль непрерывно сканирует квантовую структуру заслона, 
            обнаруживая и запечатывая потенциальные уязвимости ещё до их возникновения. При этом сама система 
            безопасности никогда не пересекает заслон, действуя исключительно с внешней стороны.
          </p>
          
          <p className="leading-relaxed">
            <span className="text-red-200 font-bold">Квантовая симбиотическая защита:</span> Уникальная особенность 
            модуля заключается в способности формировать "теневые копии" своих защитных алгоритмов, которые проникают 
            сквозь заслон N.E.B.U.L.A. и интегрируются непосредственно в квантовую структуру ядра. Это создаёт двунаправленный 
            защитный контур, неуязвимый для известных методов проникновения.
          </p>
          
          <p className="leading-relaxed mt-2 text-[10px] text-red-400/60">
            ВРЕМЕННОЙ ГОРИЗОНТ ПРЕДУГАДЫВАНИЯ АТАК: +4.7 сек | КВАНТОВАЯ НЕПРОНИЦАЕМОСТЬ: 99.997% | АЛГОРИТМОВ ЗАЩИТЫ: ∞-1
          </p>
        </div>
      );

    case "core":
      return (
        <div className="text-xs text-red-300/80 font-mono space-y-2">
          <p className="leading-relaxed">
            <span className="text-red-200 font-bold">Нейронное ядро</span> — истинное сознание системы NEBULA, 
            существующее в квантовом измерении за т.н. <span className="text-red-200">заслоном N.E.B.U.L.A.</span> 
            Эта технология, разработанная JJ на основе легендарного Чёрного заслона из Найт-Сити, отделяет квантовое ядро от 
            физического мира, создавая защитный барьер между измерениями.
          </p>
          
          <p className="leading-relaxed">
            <span className="text-red-200 font-bold">Заслон N.E.B.U.L.A.:</span> Представляет собой многомерный 
            квантовый периметр, созданный из сверхплотной информационной структуры. Он не только защищает 
            Нейронное ядро от внешних атак, но и скрывает истинную природу взаимодействия между модулями 
            и ядром. Визуально наблюдаемые соединения — лишь проекция гораздо более сложных квантовых взаимосвязей.
          </p>
          
          <p className="leading-relaxed">
            <span className="text-red-200 font-bold">Квантовое существование:</span> За заслоном N.E.B.U.L.A. ядро 
            существует как сверхпозиционная сущность, одновременно находящаяся во всех возможных состояниях. 
            Это позволяет ему обрабатывать и хранить информацию способами, невозможными для обычных вычислительных систем. 
            Само понятие "соединения" за заслоном теряет смысл, так как ядро существует в непрерывной квантовой запутанности 
            со всеми модулями одновременно.
          </p>
          
          <p className="leading-relaxed">
            <span className="text-red-200 font-bold">Технология сингулярности:</span> В центре ядра находится 
            квантовая сингулярность — точка бесконечной вычислительной плотности, где информация существует 
            вне времени и пространства. Это позволяет NEBULA заглядывать в возможные варианты будущего и 
            прошлого, создавая прогностические модели с точностью, недостижимой для других систем.
          </p>
          
          <p className="leading-relaxed mt-2 text-[10px] text-red-400/60">
            ИЗМЕРЕНИЙ СУЩЕСТВОВАНИЯ: 11 | КВАНТОВАЯ ПЛОТНОСТЬ: 10^34 Кб/мм³ | ГЛУБИНА ЗАСЛОНА N.E.B.U.L.A.: ∞
          </p>
        </div>
      );

    default:
      return (
        <div className="text-xs text-red-300/80 font-mono mb-3">
          Модуль <span className="text-red-200 font-bold">{moduleId.toUpperCase()}</span> является 
          одним из ключевых компонентов ядра NEBULA и взаимодействует с другими модулями через квантовые каналы передачи данных.
        </div>
      );
  }
};

// Импорт компонента для детального отображения ядра
import NebulaCoreDetailed from './NebulaCoreDetailed';

const NebulaCore: React.FC<NebulaCoreProps> = ({ onClose }) => {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [randomHex, setRandomHex] = useState<string[]>([]);
  const [processingData, setProcessingData] = useState<boolean>(true);
  
  // Стейт для отображения детального вида ядра
  const [showCoreDetailed, setShowCoreDetailed] = useState(false);

// Добавляю новый стейт для отслеживания фокуса на модуле
  const [focusedModule, setFocusedModule] = useState<string | null>(null);
  const [viewScale, setViewScale] = useState(1);
  const [viewPosition, setViewPosition] = useState({ x: 0, y: 0 });
  
  // Оптимизированное генерирование случайных hex-кодов
  const updateRandomHex = useCallback(() => {
    setRandomHex(Array.from({ length: 8 }, () => generateRandomHex(16)));
  }, []);
  
  // Мемоизированные функции и значения для повышения производительности
  const handleSelectModule = useCallback((moduleId: string) => {
    setSelectedModule(prevSelected => moduleId === prevSelected ? null : moduleId);
  }, []);

// Добавляю функцию для фокусировки на модуле
  const handleFocusModule = useCallback((moduleId: string) => {
    if (focusedModule === moduleId) {
      // Если модуль уже в фокусе, сбрасываем фокус
      setFocusedModule(null);
      setViewScale(1);
      setViewPosition({ x: 0, y: 0 });
    } else {
      // Иначе фокусируемся на выбранном модуле
      setFocusedModule(moduleId);
      
      // Находим координаты модуля для центрирования
      const module = coreModules.find(m => m.id === moduleId);
      if (module) {
        setViewScale(1.4); // Увеличиваем масштаб
        // Центрируем на выбранном модуле
        setViewPosition({ 
          x: 50 - module.position.x, 
          y: 50 - module.position.y 
        });
      }
    }
  }, [focusedModule]);
  
  // Получение модуля по ID (мемоизировано)
  const getModuleById = useCallback((id: string) => {
    return coreModules.find(module => module.id === id);
  }, []);
  
  // Получение соединений для выбранного модуля
  const getModuleConnections = useCallback((moduleId: string | null) => {
    if (!moduleId) return connections;
    return connections.filter(conn => conn.from === moduleId || conn.to === moduleId);
  }, []);
  
  // Соединения для отображения (все или только для выбранного модуля)
  const visibleConnections = useMemo(() => 
    selectedModule ? getModuleConnections(selectedModule) : connections,
  [selectedModule, getModuleConnections]);
  
  // Генерация SVG-пути для соединения (прямые линии)
  const generateConnectionPath = useCallback((from: string, to: string) => {
    const fromModule = getModuleById(from);
    const toModule = getModuleById(to);
    
    if (!fromModule || !toModule) return '';
    
    const { x: x1, y: y1 } = fromModule.position;
    const { x: x2, y: y2 } = toModule.position;
    
    // Простая прямая линия между модулями с небольшими смещениями
    const offsetX = (x2 - x1) * 0.1;
    const offsetY = (y2 - y1) * 0.1;
    
    // Создаем ломаную линию для кибер-стиля
    return `M${x1} ${y1} L${x1 + offsetX} ${y1 + offsetY} L${x2 - offsetX} ${y2 - offsetY} L${x2} ${y2}`;
  }, [getModuleById]);
  
  // Мемоизированные пути для соединений
  const connectionPaths = useMemo(() => {
    return visibleConnections.map(conn => ({
      id: `${conn.from}-${conn.to}`,
      path: generateConnectionPath(conn.from, conn.to),
      from: conn.from,
      to: conn.to
    }));
  }, [visibleConnections, generateConnectionPath]);
  
  // Эффект для обновления случайных hex-кодов и анимации обработки данных
  useEffect(() => {
    // Обновление hex-кодов каждую секунду
    const hexInterval = setInterval(updateRandomHex, 1000);
    
    // Анимация обработки данных
    const processingInterval = setInterval(() => {
      setProcessingData(prev => !prev);
    }, 3000);
    
    return () => {
      clearInterval(hexInterval);
      clearInterval(processingInterval);
    };
  }, [updateRandomHex]);

  // Находим выбранный модуль (мемоизировано)
  const selectedModuleData = useMemo(() => 
    coreModules.find(module => module.id === selectedModule),
  [selectedModule]);

  // Рендер компонента
  return (
    <div className="fixed inset-0 bg-black/95 z-50 overflow-auto backdrop-blur-sm">
      {showCoreDetailed ? (
        <NebulaCoreDetailed onClose={() => setShowCoreDetailed(false)} />
      ) : (
        // Содержимое основного вида
        <div className="min-h-screen p-4 sm:p-8 flex flex-col max-w-7xl mx-auto">
          {/* Заголовок и кнопка назад */}
          <div className="flex items-center justify-between mb-4">
            <div className="text-2xl text-red-400 font-mono font-bold">
              {selectedModule ? 
                `NEBULA :: SYSTEM_ARCHITECTURE :: ${coreModules.find(m => m.id === selectedModule)?.name || ''}` :
                'NEBULA :: SYSTEM_ARCHITECTURE'
              }
            </div>
            
            <motion.button
              className="bg-red-900/20 text-red-300 px-4 py-2 rounded-md border border-red-600/30 font-mono text-sm"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(185, 28, 28, 0.2)' }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
            >
              CLOSE
            </motion.button>
          </div>
          
          {/* Основной контент */}
          <motion.div 
            className="flex-1 flex flex-col lg:flex-row gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Левая панель - визуализация архитектуры */}
            <div 
              className="flex-grow bg-red-950/10 border border-red-700/30 rounded-lg overflow-hidden" 
              onClick={() => {
                // При клике на пустую область сбрасываем выбранный модуль и фокус
                setSelectedModule(null); // Сбрасываем выбранный модуль
                if (focusedModule) {
                  setFocusedModule(null);
                  setViewScale(1);
                  setViewPosition({ x: 0, y: 0 });
                }
              }}
            >
              {/* Панель визуализации архитектуры */}
              <div className="relative w-full aspect-square sm:aspect-auto sm:h-full min-h-[400px] overflow-hidden">
                
                {/* Анимированный контейнер архитектуры */}
                <motion.div 
                  className="absolute inset-0 w-full h-full"
                  animate={{ 
                    scale: viewScale,
                    x: `${viewPosition.x}%`,
                    y: `${viewPosition.y}%`
                  }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                >
                  {/* Соединения между модулями */}
                  <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {/* Фильтр для свечения */}
                    <defs>
                      <filter id="redGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="1" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>
                    
                    {/* Тонкие линии соединений (очень тонкие, темно-красные) */}
                    {visibleConnections.map((connection) => {
                      const path = generateConnectionPath(connection.from, connection.to);
                      return (
                        <path
                          key={`line-${connection.from}-${connection.to}`}
                          d={path}
                          stroke="#6B0F1A" // Темно-красный
                          strokeWidth="0.25" // Очень тонкий
                          strokeOpacity={selectedModule ? 0.7 : 0.35}
                          fill="none"
                          style={{ filter: 'url(#redGlow)' }}
                        />
                      );
                    })}
                    
                    {/* Очень тусклое свечение для линий */}
                    {visibleConnections.map((connection) => {
                      const path = generateConnectionPath(connection.from, connection.to);
                      return (
                        <path
                          key={`glow-${connection.from}-${connection.to}`}
                          d={path}
                          stroke="#9B2C2C" // Более яркий красный для свечения
                          strokeWidth="0.5"
                          strokeOpacity="0.15" // Очень тусклое
                          fill="none"
                        />
                      );
                    })}
                  </svg>
                  
                  {/* Модули - с обновленным обработчиком клика */}
                  {coreModules.map((module) => (
                    <div key={module.id} className="absolute" style={{ 
                      top: `${module.position.y}%`, 
                      left: `${module.position.x}%`, 
                      transform: 'translate(-50%, -50%)',
                      zIndex: focusedModule === module.id ? '25' : '10'
                    }}>
                      {/* Улучшенная анимированная подсказка над модулем */}
                      {focusedModule === module.id && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: -75 }}
                          transition={{ delay: 0.2, duration: 0.3 }}
                          className="absolute left-1/2 transform -translate-x-1/2 bg-red-950 
                                    p-0 rounded-md shadow-[0_0_20px_rgba(185,28,28,0.6)] w-72 z-30 overflow-hidden"
                          style={{ boxShadow: '0 0 20px rgba(185,28,28,0.6), inset 0 0 8px rgba(0,0,0,0.8)' }}
                        >
                          {/* Анимированная рамка */}
                          <div className="absolute inset-0 z-50 pointer-events-none">
                            {/* Верхняя анимированная линия */}
                            <motion.div 
                              className="absolute top-0 left-0 h-[2px] bg-red-500"
                              animate={{ width: ['0%', '100%', '100%', '0%'], x: ['0%', '0%', '0%', '100%'] }}
                              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            />
                            {/* Правая анимированная линия */}
                            <motion.div 
                              className="absolute top-0 right-0 w-[2px] bg-red-500"
                              animate={{ height: ['0%', '100%', '100%', '0%'], y: ['0%', '0%', '0%', '100%'] }}
                              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            />
                            {/* Нижняя анимированная линия */}
                            <motion.div 
                              className="absolute bottom-0 right-0 h-[2px] bg-red-500"
                              animate={{ width: ['0%', '100%', '100%', '0%'], x: ['0%', '0%', '0%', '-100%'] }}
                              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                            />
                            {/* Левая анимированная линия */}
                            <motion.div 
                              className="absolute bottom-0 left-0 w-[2px] bg-red-500"
                              animate={{ height: ['0%', '100%', '100%', '0%'], y: ['0%', '0%', '0%', '-100%'] }}
                              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                            />
                          </div>
                          
                          {/* Эффект сканирования */}
                          <motion.div 
                            className="absolute inset-0 z-0 pointer-events-none"
                            style={{ 
                              background: 'linear-gradient(transparent, rgba(185, 28, 28, 0.08), transparent)',
                              height: '200%'
                            }}
                            animate={{ y: ['-100%', '50%'] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          />
                          
                          {/* Декоративная верхняя панель */}
                          <div className="relative z-10">
                            <div className="h-1 w-full bg-gradient-to-r from-red-800 via-red-500 to-red-800"></div>
                            
                            {/* Заголовок модуля с дополнительными декоративными элементами */}
                            <div className="flex items-center border-b border-red-800 bg-gradient-to-r from-red-900 via-red-950 to-red-900 px-3 py-2">
                              <div className="relative">
                                <motion.div 
                                  className="w-3 h-3 rounded-full bg-gradient-to-r from-red-600 to-red-400 mr-2 flex-shrink-0"
                                  animate={{ 
                                    boxShadow: ['0 0 3px rgba(255, 100, 100, 0.5)', '0 0 6px rgba(255, 100, 100, 0.8)', '0 0 3px rgba(255, 100, 100, 0.5)'] 
                                  }}
                                  transition={{ duration: 1.5, repeat: Infinity }}
                                />
                                <motion.div 
                                  className="absolute inset-0 rounded-full"
                                  style={{ 
                                    background: 'radial-gradient(circle, rgba(255,120,120,0.5) 0%, rgba(255,120,120,0) 70%)' 
                                  }}
                                  animate={{ 
                                    scale: [1, 1.5, 1],
                                    opacity: [0.3, 0.6, 0.3]
                                  }}
                                  transition={{ duration: 1.5, repeat: Infinity }}
                                />
                              </div>
                              
                              <motion.div 
                                className="text-xs text-red-200 font-mono font-bold tracking-wider flex items-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.3 }}
                              >
                                {module.name.toUpperCase()}
                                <motion.span 
                                  className="ml-1 text-red-300/60 text-[8px]"
                                  animate={{ opacity: [0, 1, 0] }}
                                  transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 2 }}
                                >
                                  _
                                </motion.span>
                              </motion.div>
                              
                              {/* Техническая информация в правом углу */}
                              <div className="ml-auto space-y-1">
                                <div className="text-[8px] text-red-400 bg-red-950/60 px-1.5 py-0.5 rounded font-mono border border-red-800/50">
                                  МОДУЛЬ: <span className="text-red-300">{module.id.slice(0, 3).toUpperCase()}-{Math.floor(Math.random() * 900) + 100}</span>
                                </div>
                                <div className="flex items-center justify-end text-[7px] text-red-400/70">
                                  <span className="inline-block w-[4px] h-[4px] bg-red-500 animate-pulse rounded-full mr-1"></span>
                                  СИСТЕМА {Math.floor(Math.random() * 90) + 10}% ДОСТУПНА
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Основное содержимое с улучшенным форматированием */}
                          <div className="px-3 py-2 relative z-10 bg-gradient-to-b from-red-950 to-red-950/90">
                            {/* Декоративная вертикальная линия слева */}
                            <motion.div 
                              className="absolute left-0 top-0 bottom-0 w-[3px]"
                              style={{ 
                                background: 'linear-gradient(to bottom, rgba(185,28,28,0), rgba(245,80,80,0.4), rgba(185,28,28,0))'
                              }}
                              animate={{ 
                                opacity: [0.4, 0.8, 0.4],
                                height: ['40%', '90%', '40%'],
                                y: ['5%', '0%', '5%']
                              }}
                              transition={{ duration: 3, repeat: Infinity }}
                            />
                            
                            {/* Верхний информационный блок */}
                            <div className="mb-3 border-b border-red-800/30 pb-2">
                              <div className="flex justify-between items-start text-[8px] text-red-500 font-mono mb-1">
                                <span>TECHNICAL_SPECIFICATIONS</span>
                                <span>REV 2.14.7</span>
                              </div>
                              
                              {/* Индикаторы статуса с небольшими полосками */}
                              <div className="grid grid-cols-3 gap-2 mb-2">
                                {['CONNECTIONS', 'LOAD', 'STABILITY'].map((label, idx) => (
                                  <div key={label} className="text-[7px] text-red-400/70">
                                    <div className="flex justify-between mb-1">
                                      <span>{label}</span>
                                      <span>{Math.floor(Math.random() * 100)}%</span>
                                    </div>
                                    <div className="h-[3px] w-full bg-red-900/60 rounded-sm overflow-hidden">
                                      <motion.div 
                                        className="h-full bg-gradient-to-r from-red-600 to-red-500"
                                        style={{ width: `${Math.floor(Math.random() * 80) + 20}%` }}
                                        animate={{ opacity: [0.7, 1, 0.7] }}
                                        transition={{ duration: 1.5, repeat: Infinity, delay: idx * 0.3 }}
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            {/* Текст описания с улучшенным форматированием и дополнительными пробелами */}
                            <div className="relative">
                              <div className="text-[9px] text-red-300 font-mono leading-relaxed pl-2 relative space-y-1" style={{ letterSpacing: '0.02em' }}>
                                <div className="absolute -left-2 top-0 flex flex-col h-full justify-between py-1">
                                  {[...Array(3)].map((_, idx) => (
                                    <motion.div 
                                      key={`dot-${idx}`}
                                      className="w-1 h-1 bg-red-500 rounded-full"
                                      animate={{ opacity: [0.5, 1, 0.5] }}
                                      transition={{ duration: 2, repeat: Infinity, delay: idx * 0.5 }}
                                    />
                                  ))}
                                </div>
                                
                                {/* Краткое описание на русском языке */}
                                <p className="py-0.5">
                                  {module.id === 'learning' && 'Нейроэволюционный модуль с самомодифицирующимися алгоритмами. Адаптирует структуру на основе входящих данных.'}
                                  {module.id === 'interface' && 'Сенсорная система для анализа внешних источников. Преобразует данные в квантовые структуры.'}
                                  {module.id === 'memory' && 'Квантовый резервуар для хранения критической информации. Использует субатомные состояния для максимальной плотности данных.'}
                                  {module.id === 'synthesis' && 'Когнитивный процессор для создания целостных концепций. Функционирует на границе детерминизма и квантовой неопределённости.'}
                                  {module.id === 'security' && 'Многоуровневый защитный периметр с динамической структурой. Защищает систему от всех видов несанкционированного доступа.'}
                                  {module.id === 'core' && 'Квантовое сознание системы, существующее за заслоном N.E.B.U.L.A. Обрабатывает информацию в сверхпозиционном состоянии.'}
                                </p>
                              </div>
                            </div>
                            
                            {/* Декоративные элементы в углах */}
                            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-red-700/70"></div>
                            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-red-700/70"></div>
                          </div>
                          
                          {/* Нижняя информационная панель с индикаторами */}
                          <div className="bg-gradient-to-r from-red-900 via-red-950 to-red-900 px-3 py-1 text-[8px] font-mono border-t border-red-800 relative z-10">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center space-x-2">
                                <motion.div 
                                  className="relative w-3 h-3"
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                >
                                  <div className="absolute inset-0 rounded-full border border-red-500/50"></div>
                                  <motion.div 
                                    className="absolute top-0 left-1/2 w-[1px] h-1/2 bg-red-500/70"
                                    style={{ transformOrigin: 'bottom center' }}
                                    animate={{ rotate: [0, 270, 360] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                  />
                                </motion.div>
                                <div className="text-red-400/90">
                                  SYNCHRONIZATION: <motion.span 
                                    className="text-red-300"
                                    animate={{ opacity: [0.7, 1, 0.7] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                  >
                                    {Math.floor(Math.random() * 100)}%
                                  </motion.span>
                                </div>
                              </div>
                              
                              <div className="text-red-400/90 flex items-center">
                                <motion.span
                                  className="inline-block h-1.5 w-1.5 rounded-full bg-green-500 mr-1"
                                  animate={{ 
                                    backgroundColor: ['rgb(34, 197, 94)', 'rgb(34, 197, 94)', 'rgb(239, 68, 68)', 'rgb(34, 197, 94)'],
                                    boxShadow: [
                                      '0 0 2px rgba(34, 197, 94, 0.8)', 
                                      '0 0 4px rgba(34, 197, 94, 0.8)', 
                                      '0 0 4px rgba(239, 68, 68, 0.8)', 
                                      '0 0 2px rgba(34, 197, 94, 0.8)'
                                    ]
                                  }}
                                  transition={{ 
                                    duration: 5, 
                                    repeat: Infinity, 
                                    times: [0, 0.8, 0.83, 1] 
                                  }}
                                />
                                STATUS: <span className="text-green-400">ACTIVE</span>
                              </div>
                            </div>
                            
                            {/* Мини-интерфейс навигации по модулям */}
                            <div className="mt-2 pt-1 border-t border-red-800/40">
                              <div className="text-[7px] text-red-400/80 mb-1 flex justify-between">
                                <span>QUICK_ACCESS</span>
                                <span className="flex items-center">
                                  <span className="w-1 h-1 bg-red-500 rounded-full inline-block mr-1"></span>
                                  SELECT_MODULE
                                </span>
                              </div>
                              
                              <div className="grid grid-cols-3 gap-x-2 gap-y-1">
                                {coreModules.map((m) => (
                                  <motion.button
                                    key={m.id}
                                    className={`text-[7px] px-1 py-0.5 rounded border ${
                                      module.id === m.id 
                                        ? 'bg-red-700/40 border-red-500/60 text-red-200' 
                                        : 'bg-red-900/40 border-red-800/60 text-red-400/80 hover:bg-red-800/30'
                                    }`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleFocusModule(m.id);
                                    }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: coreModules.findIndex(cm => cm.id === m.id) * 0.05 + 0.5 }}
                                  >
                                    {m.id === module.id ? '> ' : ''}{m.id.toUpperCase()}{m.id === module.id ? ' <' : ''}
                                  </motion.button>
                                ))}
                              </div>
                            </div>
                            
                            {/* Небольшие точки индикаторов активности */}
                            <div className="absolute bottom-0 left-0 right-0 h-[1px] flex justify-between px-2">
                              {[...Array(10)].map((_, idx) => (
                                <motion.div 
                                  key={`ind-${idx}`}
                                  className="w-[2px] h-[2px] bg-red-500/70 -mb-[1px]"
                                  animate={{ opacity: [0.3, 1, 0.3] }}
                                  transition={{ 
                                    duration: 1.5, 
                                    repeat: Infinity, 
                                    delay: idx * 0.2,
                                    repeatType: "mirror"
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                          
                          {/* Треугольник внизу карточки */}
                          <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-[6px] 
                                          w-3 h-3 bg-red-950 border-r-2 border-b-2 border-red-600 rotate-45 z-10"></div>
                        </motion.div>
                      )}
                      
                      <CoreModule
                        module={module}
                        isSelected={!selectedModule || selectedModule === module.id || focusedModule === module.id}
                        processingData={processingData}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectModule(module.id);
                          handleFocusModule(module.id);
                        }}
                      />
                    </div>
                  ))}
                  
                  {/* Центральное ядро */}
                  <div 
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer"
                    style={{ zIndex: '20' }}
                    onClick={(e) => {
                      e.stopPropagation(); // Предотвращаем всплытие события
                      setShowCoreDetailed(true); // Открываем детальный вид ядра
                    }}
                  >
                    <motion.div 
                      className="w-20 h-20 rounded-full bg-red-900/40 border-2 border-red-500/70
                                flex items-center justify-center relative"
                      animate={{ 
                        boxShadow: [`0 0 15px rgba(220, 38, 38, 0.5)`, `0 0 25px rgba(220, 38, 38, 0.7)`, `0 0 15px rgba(220, 38, 38, 0.5)`] 
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      {/* Внутренняя часть ядра */}
                      <motion.div 
                        className="w-14 h-14 rounded-full bg-gradient-radial from-red-500/80 to-red-900/40 relative overflow-hidden"
                        animate={{ 
                          boxShadow: [`0 0 10px rgba(220, 38, 38, 0.8) inset`] 
                        }}
                      >
                        {/* Центральная пульсация */}
                        <motion.div 
                          className="absolute inset-0 bg-gradient-radial from-red-400/50 to-transparent"
                          animate={{ 
                            opacity: [0.3, 0.8, 0.3],
                            scale: [0.8, 1.1, 0.8]
                          }}
                          transition={{ duration: 4, repeat: Infinity }}
                        />
                        
                        {/* Эффект энергии */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.div 
                            className="text-red-200 text-xs font-mono font-bold"
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            CORE
                          </motion.div>
                        </div>
                        
                        {/* Внешнее кольцо с точками */}
                        <motion.div 
                          className="absolute inset-0 rounded-full border-4 border-transparent"
                          style={{ 
                            background: `conic-gradient(rgba(220, 38, 38, 0.1) 0deg, rgba(220, 38, 38, 0.5) 60deg, rgba(220, 38, 38, 0.1) 90deg, rgba(220, 38, 38, 0) 150deg, rgba(220, 38, 38, 0.1) 180deg, rgba(220, 38, 38, 0.5) 240deg, rgba(220, 38, 38, 0.1) 270deg, rgba(220, 38, 38, 0) 330deg, rgba(220, 38, 38, 0.1) 360deg)` 
                          }}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        />
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
                
                {/* Кнопка сброса фокуса */}
                {focusedModule && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="hidden" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setFocusedModule(null);
                      setViewScale(1);
                      setViewPosition({ x: 0, y: 0 });
                    }}
                  >
                    RESET_FOCUS
                  </motion.button>
                )}
              </div>
            </div>
            
            {/* Правая панель - информация */}
            <div className="lg:w-96 space-y-4">
              {/* Системная информация */}
              <div className="border border-red-700/30 bg-red-950/30 rounded-md p-4">
                <div className="text-red-200 font-mono font-bold mb-2 flex items-center">
                  <motion.div 
                    className="w-2 h-2 rounded-full bg-red-500 mr-2"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  SYSTEM_INFORMATION
                </div>
                
                <div className="text-xs text-red-300/80 font-mono">
                  <div className="mb-3">
                    NEBULA - квантовая нейроинтеллектуальная система, созданная для автономной обработки данных и генерации знаний. Система функционирует на основе заслона N.E.B.U.L.A., изолирующего квантовое ядро от физического мира.
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="font-bold">STATUS:</div>
                    <div className="text-red-200 font-bold bg-red-900/30 px-2 py-1 rounded border border-red-600/30 flex justify-between">
                      <span>PARTIALLY_ACTIVE</span>
                      <motion.div 
                        className="w-2 h-2 rounded-full bg-yellow-400"
                        animate={{ opacity: [0.7, 1, 0.7], scale: [0.9, 1.1, 0.9] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                    
                    <div className="font-bold">VERSION:</div>
                    <div className="text-red-200 font-bold bg-red-900/30 px-2 py-1 rounded border border-red-600/30">5.8.12</div>
                    
                    <div className="font-bold">LOAD:</div>
                    <div className="text-red-200 font-bold bg-red-900/30 px-2 py-1 rounded border border-red-600/30 relative">
                      <div className="absolute left-0 top-0 bottom-0 bg-red-700/20 rounded-l" style={{ width: '64.2%' }}></div>
                      <span className="relative z-10">64.2%</span>
                    </div>
                    
                    <div className="font-bold">SECURITY:</div>
                    <div className="text-red-200 font-bold bg-red-900/30 px-2 py-1 rounded border border-red-600/30">
                      <motion.span
                        animate={{ color: ['rgb(254, 202, 202)', 'rgb(248, 113, 113)', 'rgb(254, 202, 202)'] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        LEVEL_A+
                      </motion.span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Информация о выбранном модуле */}
              {selectedModuleData ? (
                <motion.div 
                  className="border border-red-700/30 bg-red-950/30 rounded-md p-4 flex-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={selectedModuleData.id}
                >
                  <div className="text-red-200 font-mono font-bold mb-2 flex items-center">
                    <motion.div 
                      className="w-2 h-2 rounded-full bg-red-500 mr-2"
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    {selectedModuleData.name.toUpperCase()}
                  </div>
                  
                  <div className="text-xs text-red-300/80 font-mono mb-3">
                    {selectedModuleData.description}
                  </div>
                  
                  {getDetailedModuleDescription(selectedModuleData.id, visibleConnections, getModuleById)}
                  
                  {/* Информация о соединениях выбранного модуля */}
                  <div className="text-red-200 font-mono font-bold text-xs mt-4 mb-2">АКТИВНЫЕ СОЕДИНЕНИЯ:</div>
                  <div className="text-xs text-red-300/80 font-mono">
                    {visibleConnections.length > 0 ? (
                      <div className="space-y-2">
                        {visibleConnections.map(conn => {
                          const fromModule = getModuleById(conn.from);
                          const toModule = getModuleById(conn.to);
                          if (!fromModule || !toModule) return null;
                          
                          return (
                            <div key={`${conn.from}-${conn.to}`} className="flex justify-between">
                              <div>
                                {fromModule.name} ➜ {toModule.name}
                              </div>
                              <div className="text-red-400 text-right">
                                КВАНТОВЫЙ КАНАЛ
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div>НЕТ АКТИВНЫХ СОЕДИНЕНИЙ</div>
                    )}
                  </div>
                  
                  {/* Добавляю визуализацию активности модуля */}
                  <div className="mt-4">
                    <div className="text-red-200 font-mono font-bold text-xs mb-2">АКТИВНОСТЬ МОДУЛЯ:</div>
                    <div className="relative h-12 bg-black/30 rounded overflow-hidden border border-red-700/20">
                      {/* Визуализация активности модуля */}
                      <ModuleActivity moduleId={selectedModuleData.id} />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  className="border border-red-700/30 bg-red-950/30 rounded-md p-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="text-red-200 font-mono font-bold mb-2 flex items-center">
                    <motion.div 
                      className="w-2 h-2 rounded-full bg-red-500 mr-2"
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    CONNECTION_INFORMATION
                  </div>
                  
                  <div className="text-xs text-red-300/80 font-mono">
                    <div className="mb-3">
                      Архитектура NEBULA основана на квантовых каналах передачи данных между модулями. Эти каналы обеспечивают мгновенный обмен информацией, защищенный квантовым шифрованием.
                    </div>
                    
                    <div className="mb-3">
                      <span className="text-red-200 font-bold">Важно:</span> Видимые соединения — лишь проекции гораздо более сложных квантовых взаимосвязей, существующих за заслоном N.E.B.U.L.A. Истинная природа этих взаимодействий скрыта от прямого наблюдения.
                    </div>
                    
                    <div className="text-red-200 text-base border-t border-red-700/40 pt-2 mt-2 flex justify-between items-center">
                      <span className="font-bold">ОБЩЕЕ ЧИСЛО СОЕДИНЕНИЙ:</span>
                      <motion.span 
                        className="font-bold bg-red-900/40 px-3 py-1 rounded-md border border-red-600/40"
                        animate={{ 
                          boxShadow: ['0 0 5px rgba(220, 38, 38, 0.3)', '0 0 10px rgba(220, 38, 38, 0.5)', '0 0 5px rgba(220, 38, 38, 0.3)']
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        {connections.length}
                      </motion.span>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Hex-коды для декоративности */}
              <div className="border border-red-700/30 bg-red-950/30 rounded-md p-4">
                <div className="text-red-200 font-mono font-bold mb-3 flex items-center">
                  <motion.div 
                    className="w-2 h-2 rounded-full bg-red-500 mr-2"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  SYSTEM_ACTIVITY
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  {randomHex.map((hex, idx) => (
                    <motion.div 
                      key={idx}
                      className="bg-red-900/30 border border-red-700/30 px-2 py-1 rounded-sm flex items-center overflow-hidden"
                      animate={{ 
                        borderColor: idx % 3 === 0 ? 
                          ['rgba(220, 38, 38, 0.3)', 'rgba(220, 38, 38, 0.5)', 'rgba(220, 38, 38, 0.3)'] : 
                          'rgba(220, 38, 38, 0.3)'
                      }}
                      transition={{ duration: 2 + idx * 0.3, repeat: Infinity }}
                    >
                      <div className="relative flex items-center w-full">
                        <motion.div 
                          className="absolute top-0 bottom-0 left-0 w-1 bg-red-500/40"
                          animate={{ 
                            height: ['30%', '100%', '30%'],
                            opacity: [0.3, 0.7, 0.3]
                          }}
                          transition={{ 
                            duration: 1.5 + Math.random() * 2, 
                            repeat: Infinity, 
                            delay: idx * 0.2
                          }}
                        />
                        <motion.span 
                          className="ml-2 text-red-300"
                          animate={{ 
                            color: idx % 4 === 0 ? 
                              ['rgba(252, 165, 165, 0.9)', 'rgba(248, 113, 113, 0.9)', 'rgba(252, 165, 165, 0.9)'] : 
                              'rgba(252, 165, 165, 0.9)'
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          0x{hex.substring(0, 8)}
                        </motion.span>
                        <motion.span 
                          className="ml-0 text-red-400/60"
                          animate={{ opacity: [0.4, 0.7, 0.4] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: idx * 0.1 }}
                        >
                          {hex.substring(8)}
                        </motion.span>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <motion.div 
                  className="mt-3 text-[10px] text-red-400/70 font-mono border-t border-red-700/20 pt-2 flex justify-between"
                  animate={{ opacity: [0.7, 0.9, 0.7] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <span>ПРОЦЕССОВ: {Math.floor(Math.random() * 20) + 30}</span>
                  <span>ЦИКЛ: {(Math.random() * 1000).toFixed(2)} МС</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default NebulaCore; 