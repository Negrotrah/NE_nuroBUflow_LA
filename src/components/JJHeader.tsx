'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useNebula } from '@/contexts/NebulaContext';

// Предгенерированные технические ID
const TECH_IDS = [
  "7F82A5C3", "B74D19E0", "3A5F8B2C", "9D3E7F10", 
  "C2B6F8A0", "4E7D3A9F", "8B2E5F1D", "6C3F9A28"
];

const JJHeader = () => {
  // Получаем информацию о режиме NEBULA
  const { isNebulaMode } = useNebula();
  
  // Определяем цвета в зависимости от режима
  const primaryColor = isNebulaMode ? 'red' : 'blue';
  const secondaryColor = isNebulaMode ? 'red' : 'purple';
  const tertiaryColor = isNebulaMode ? 'red' : 'blue';
  
  // Генерация случайного системного ID
  const systemId = TECH_IDS[Math.floor(Math.random() * TECH_IDS.length)];
  
  // Статусы системы
  const systemStatuses = [
    { 
      name: isNebulaMode ? "NEBULA" : "НЕЙРОСЕТЬ", 
      status: isNebulaMode ? "ЗАПУЩЕНА" : "АКТИВНА", 
      color: isNebulaMode ? "red-400" : "green-400" 
    },
    { 
      name: "ИНТЕРФЕЙС", 
      status: "ЗАГРУЖЕН", 
      color: isNebulaMode ? "red-400" : "blue-400" 
    },
    { 
      name: isNebulaMode ? "ЗАЩИТА" : "СКАНИРОВАНИЕ", 
      status: isNebulaMode ? "ОТКЛЮЧЕНА" : "ЗАПУЩЕНО", 
      color: isNebulaMode ? "red-400" : "yellow-400" 
    },
  ];
  
  return (
    <motion.div 
      className="relative w-full overflow-hidden pt-2 pb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Верхняя панель с техническими данными */}
      <motion.div
        className={`w-full h-10 flex justify-between px-4 py-1 text-[10px] font-mono text-${primaryColor}-400/90 mb-3
                  bg-${primaryColor}-900/10 border-b border-${primaryColor}-500/20`}
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center">
          <motion.div 
            className={`w-1.5 h-1.5 rounded-full bg-${primaryColor}-400 mr-2`}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span>{isNebulaMode ? "NEBULA INTERFACE" : "JJ NEURAL INTERFACE"}</span>
          <span className={`ml-4 bg-${primaryColor}-500/10 px-1.5 py-0.5 rounded-sm`}>
            v{isNebulaMode ? "4.0.0" : "3.2.1"}
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          {systemStatuses.map((item, i) => (
            <div key={i} className="flex items-center">
              <span className="mr-1.5">{item.name}:</span>
              <span className={`text-${item.color} flex items-center`}>
                {item.status}
                <motion.div 
                  className={`ml-1 w-1 h-1 rounded-full bg-${item.color}`}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}
                />
              </span>
            </div>
          ))}
        </div>
        
        <div className="flex items-center">
          <span className="mr-2">SYS ID:</span>
          <span className={`bg-${primaryColor}-500/10 px-1.5 rounded-sm`}>{systemId}</span>
        </div>
      </motion.div>
      
      {/* Основная область заголовка с голографическим эффектом */}
      <motion.div className="relative flex flex-col items-center justify-center mb-10 h-48">
        {/* Голографическая сфера */}
        <motion.div
          className={`absolute w-40 h-40 rounded-full border border-${primaryColor}-400/20`}
          animate={{ 
            rotate: [0, 360],
            borderColor: isNebulaMode 
              ? ['rgba(239, 68, 68, 0.2)', 'rgba(220, 38, 38, 0.2)', 'rgba(239, 68, 68, 0.2)']
              : ['rgba(59, 130, 246, 0.2)', 'rgba(168, 85, 247, 0.2)', 'rgba(59, 130, 246, 0.2)'],
          }}
          transition={{ 
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            borderColor: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        
        {/* Внутренняя концентрическая сфера */}
        <motion.div
          className={`absolute w-32 h-32 rounded-full border-2 border-${primaryColor}-500/20`}
          animate={{ 
            rotate: [360, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
        />
      
        {/* Буквы логотипа с техническим оформлением */}
        <motion.div
          className={`relative z-10 px-6 py-4 bg-${primaryColor}-900/10 rounded-md border border-${primaryColor}-500/30`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="flex items-center justify-center relative">
            {/* Технические индикаторы вокруг логотипа */}
            <motion.div 
              className={`absolute -top-2 -left-2 w-2 h-2 rounded-full bg-${primaryColor}-400/50`}
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div 
              className={`absolute -bottom-2 -right-2 w-2 h-2 rounded-full bg-${primaryColor}-400/50`}
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
            
            <h1 className="text-5xl md:text-6xl font-bold relative">
              <motion.span 
                className={`relative text-${primaryColor}-400`}
                animate={{ 
                  textShadow: isNebulaMode
                    ? [
                      '0 0 8px rgba(239, 68, 68, 0.3)', 
                      '0 0 15px rgba(239, 68, 68, 0.5)', 
                      '0 0 8px rgba(239, 68, 68, 0.3)'
                    ]
                    : [
                      '0 0 8px rgba(59, 130, 246, 0.3)', 
                      '0 0 15px rgba(59, 130, 246, 0.5)', 
                      '0 0 8px rgba(59, 130, 246, 0.3)'
                    ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {isNebulaMode ? 'Nebula' : 'Neuro'}
                {/* Сканирующая линия */}
                <motion.div
                  className={`absolute left-0 right-0 h-px bg-${primaryColor}-400/70`}
                  animate={{
                    top: ["0%", "100%"],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 5,
                  }}
                />
              </motion.span>
              <motion.span 
                className={`text-${isNebulaMode ? 'red-500' : 'purple-600'}`}
                animate={{ 
                  textShadow: isNebulaMode
                    ? [
                      '0 0 8px rgba(220, 38, 38, 0.3)', 
                      '0 0 15px rgba(220, 38, 38, 0.5)', 
                      '0 0 8px rgba(220, 38, 38, 0.3)'
                    ]
                    : [
                      '0 0 8px rgba(168, 85, 247, 0.3)', 
                      '0 0 15px rgba(168, 85, 247, 0.5)', 
                      '0 0 8px rgba(168, 85, 247, 0.3)'
                    ]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              >
                {isNebulaMode ? 'Core' : 'Flow'}
              </motion.span>
            </h1>
          </div>
          
          {/* Технический текст под логотипом */}
          <div className={`mt-1 text-[10px] text-center font-mono text-${primaryColor}-300/70`}>
            {isNebulaMode 
              ? 'СИСТЕМА NEBULA [VER.4.0.0] // РЕЖИМ ЧАСТИЧНОГО ДОСТУПА'
              : 'НЕЙРОННЫЙ КАТАЛОГ [VER.3.2.1] // ИНТЕРФЕЙС АКТИВИРОВАН'
            }
          </div>
          
          {/* Техническая рамка */}
          <motion.div 
            className={`absolute top-0 left-0 right-0 bottom-0 border border-${primaryColor}-500/20 rounded-md pointer-events-none`}
            animate={{ 
              boxShadow: isNebulaMode
                ? [
                  'inset 0 0 2px rgba(239, 68, 68, 0.2)', 
                  'inset 0 0 8px rgba(239, 68, 68, 0.4)', 
                  'inset 0 0 2px rgba(239, 68, 68, 0.2)'
                ]
                : [
                  'inset 0 0 2px rgba(59, 130, 246, 0.2)', 
                  'inset 0 0 8px rgba(59, 130, 246, 0.4)', 
                  'inset 0 0 2px rgba(59, 130, 246, 0.2)'
                ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>
        
        {/* Технические индикаторы */}
        <motion.div 
          className={`absolute top-1 right-5 md:right-10 lg:right-20 
                    text-[8px] text-${primaryColor}-400/80 font-mono px-2 py-1.5 
                    bg-${primaryColor}-900/10 border border-${primaryColor}-500/20 rounded-sm`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="flex flex-col">
            <div className="flex justify-between mb-1.5">
              <span>{isNebulaMode ? "СТАТУС СИСТЕМЫ:" : "АКТИВНОСТЬ ПОЛЬЗОВАТЕЛЯ:"}</span>
              <span className={`text-${isNebulaMode ? 'red' : 'green'}-400 ml-2 flex items-center`}>
                {isNebulaMode ? "КРИТИЧЕСКИЙ" : "ОБНАРУЖЕНА"}
                <motion.div 
                  className={`ml-1 w-1 h-1 rounded-full bg-${isNebulaMode ? 'red' : 'green'}-400`}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </span>
            </div>
            <div className="flex justify-between">
              <span>РЕЖИМ РАБОТЫ:</span>
              <span className={`text-${primaryColor}-400 ml-2`}>
                {isNebulaMode ? "NEBULA_SYSTEM" : "NEURAL_CATALOG"}
              </span>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className={`absolute top-1 left-5 md:left-10 lg:left-20 
                   text-[8px] text-${primaryColor}-400/80 font-mono px-2 py-1.5
                   bg-${primaryColor}-900/10 border border-${primaryColor}-500/20 rounded-sm`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <div className="flex flex-col">
            <div className="flex justify-between mb-1.5">
              <span>{isNebulaMode ? "КОНТРОЛЬ ДОСТУПА:" : "ВРЕМЯ ЗАГРУЗКИ:"}</span>
              <span className={`text-${isNebulaMode ? 'red' : 'yellow'}-400 ml-2`}>
                {isNebulaMode ? "ЧАСТИЧНЫЙ" : (Math.random() * 2 + 0.5).toFixed(2) + "s"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>{isNebulaMode ? "БЕЗОПАСНОСТЬ:" : "ТОЧНОСТЬ ДАННЫХ:"}</span>
              <span className={`text-${isNebulaMode ? 'red' : 'green'}-400 ml-2`}>
                {isNebulaMode ? "НАРУШЕНА" : Math.floor(Math.random() * 3 + 97) + "%"}
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Голографическая навигационная панель */}
      <motion.div 
        className={`relative mx-auto max-w-4xl px-4 mb-8 border-b border-${primaryColor}-500/30 pb-2`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        {!isNebulaMode && (
          <div className="text-center text-sm text-blue-200/80 mb-2">
            Выберите категорию нейросетей для исследования
          </div>
        )}
        
        {/* Сканирующая линия */}
        <motion.div
          className={`absolute left-0 right-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-${primaryColor}-400/70 to-transparent`}
          animate={{
            opacity: [0.3, 0.7, 0.3],
            left: ["0%", "100%", "0%"],
          }}
          transition={{
            opacity: { duration: 2, repeat: Infinity },
            left: { duration: 10, repeat: Infinity, ease: "linear" }
          }}
          style={{ width: "30%" }}
        />
      </motion.div>
    </motion.div>
  );
};

export default JJHeader; 