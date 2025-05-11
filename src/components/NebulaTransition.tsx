'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNebula } from '@/contexts/NebulaContext';

const NebulaTransition = () => {
  const { showNebulaTransition, setShowNebulaTransition, setNebulaMode } = useNebula();
  const [isExiting, setIsExiting] = useState(false);
  
  useEffect(() => {
    if (showNebulaTransition) {
      // Сбрасываем состояние выхода при новом показе анимации
      setIsExiting(false);
      
      // Через 5 секунд завершим анимацию и активируем режим NEBULA
      const timer = setTimeout(() => {
        setNebulaMode(true);
        // Теперь вместо моментального скрытия, показываем анимацию выхода
        setIsExiting(true);
        
        // Сокращаем время скрытия анимации перехода до минимума
        setTimeout(() => {
          setShowNebulaTransition(false);
        }, 2000); // Увеличиваем время для более плавного исчезновения заголовков
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [showNebulaTransition, setNebulaMode, setShowNebulaTransition]);
  
  return (
    <AnimatePresence mode="wait">
      {showNebulaTransition && (
        <motion.div 
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            filter: "brightness(1.2)",
            backdropFilter: "blur(0px)",
            zIndex: 1,
          }}
          transition={{ 
            duration: isExiting ? 3 : 0.8,
            ease: "easeInOut"
          }}
        >
          {/* Черный фон для сохранения непрозрачности */}
          <motion.div
            className="absolute inset-0 bg-black pointer-events-none"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
          />

          {/* Вспышка при завершении анимации */}
          <motion.div
            className="absolute inset-0 bg-red-500 pointer-events-none mix-blend-overlay"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: isExiting ? [0, 0.3, 0.1, 0] : [0, 0, 0, 0.2, 0]
            }}
            transition={{ 
              times: isExiting ? [0, 0.2, 0.5, 1] : [0, 0.7, 0.8, 0.85, 1],
              duration: isExiting ? 2 : 5, 
              ease: "easeInOut" 
            }}
          />
          
          {/* Анимированный круг загрузки */}
          <div className="relative w-64 h-64">
            <motion.div 
              className="absolute inset-0 rounded-full border-4 border-red-500"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: isExiting ? [0.5, 0.2, 0] : [0, 0.8, 0.2],
                scale: isExiting ? [1, 1.2, 1.5] : [0.8, 1.1, 1],
                borderColor: isExiting ? 'rgba(185, 28, 28, 0)' : ['rgba(239, 68, 68, 0.7)', 'rgba(220, 38, 38, 0.9)', 'rgba(185, 28, 28, 0.7)']
              }}
              transition={{ 
                duration: isExiting ? 2.5 : 3, 
                times: isExiting ? [0, 0.7, 1] : undefined,
                repeat: isExiting ? 0 : Infinity,
                ease: isExiting ? "easeInOut" : "linear"
              }}
            />
            
            <motion.div 
              className="absolute inset-0 rounded-full border border-red-400"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: isExiting ? [0.5, 0.2, 0] : [0, 0.5, 0],
                scale: isExiting ? [1.2, 1.5, 1.8] : [0.9, 1.2, 1.5],
                borderColor: isExiting ? 'rgba(248, 113, 113, 0)' : ['rgba(248, 113, 113, 0.3)', 'rgba(239, 68, 68, 0.5)', 'rgba(248, 113, 113, 0.1)']
              }}
              transition={{ 
                duration: isExiting ? 2.5 : 2, 
                times: isExiting ? [0, 0.7, 1] : undefined,
                repeat: isExiting ? 0 : Infinity,
                ease: isExiting ? "easeInOut" : "linear"
              }}
            />
            
            {/* Внутренний индикатор загрузки */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                className="w-40 h-40 rounded-full flex items-center justify-center"
                initial={{ backgroundColor: 'rgba(127, 29, 29, 0.1)' }}
                animate={{ 
                  backgroundColor: isExiting 
                    ? ['rgba(127, 29, 29, 0.2)', 'rgba(127, 29, 29, 0.1)', 'rgba(127, 29, 29, 0)']
                    : ['rgba(127, 29, 29, 0.1)', 'rgba(127, 29, 29, 0.2)', 'rgba(127, 29, 29, 0.1)'],
                  boxShadow: isExiting
                    ? [
                      '0 0 20px rgba(220, 38, 38, 0.4), inset 0 0 30px rgba(220, 38, 38, 0.4)',
                      '0 0 10px rgba(220, 38, 38, 0.2), inset 0 0 15px rgba(220, 38, 38, 0.2)',
                      '0 0 0px rgba(220, 38, 38, 0), inset 0 0 0px rgba(220, 38, 38, 0)'
                    ]
                    : [
                      '0 0 10px rgba(220, 38, 38, 0.3), inset 0 0 15px rgba(220, 38, 38, 0.3)',
                      '0 0 20px rgba(220, 38, 38, 0.5), inset 0 0 30px rgba(220, 38, 38, 0.5)',
                      '0 0 10px rgba(220, 38, 38, 0.3), inset 0 0 15px rgba(220, 38, 38, 0.3)'
                    ]
                }}
                transition={{ 
                  duration: isExiting ? 2.5 : 2, 
                  times: isExiting ? [0, 0.7, 1] : undefined,
                  repeat: isExiting ? 0 : Infinity,
                  ease: isExiting ? "easeInOut" : "linear"
                }}
              >
                <motion.span 
                  className="text-red-500 font-mono text-xl"
                  animate={{ 
                    opacity: isExiting ? [1, 0.6, 0] : [0.7, 1, 0.7], 
                    textShadow: isExiting
                      ? [
                        '0 0 10px rgba(239, 68, 68, 0.8)', 
                        '0 0 5px rgba(239, 68, 68, 0.4)', 
                        '0 0 0px rgba(239, 68, 68, 0)'
                      ]
                      : [
                        '0 0 5px rgba(239, 68, 68, 0.5)', 
                        '0 0 10px rgba(239, 68, 68, 0.8)', 
                        '0 0 5px rgba(239, 68, 68, 0.5)'
                      ],
                    scale: isExiting ? [1, 0.9, 0.8] : 1
                  }}
                  transition={{ 
                    duration: isExiting ? 2.5 : 2, 
                    times: isExiting ? [0, 0.7, 1] : undefined,
                    repeat: isExiting ? 0 : Infinity,
                    ease: isExiting ? "easeInOut" : "linear"
                  }}
                >
                  NEBULA
                </motion.span>
              </motion.div>
            </div>
          </div>
          
          {/* Текст загрузки */}
          <motion.div 
            className="mt-8 text-red-500 font-mono text-center"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: isExiting ? 1 : 1,
              y: isExiting ? 0 : 0
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 1.2,
              delay: isExiting ? 0 : 1
            }}
          >
            <motion.div 
              className="text-2xl mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: isExiting ? [1, 0.7, 0] : 1,
                y: isExiting ? [0, 10] : 0,
                textShadow: isExiting
                  ? ['0 0 10px rgba(239, 68, 68, 0.8)', '0 0 20px rgba(239, 68, 68, 1)', '0 0 5px rgba(239, 68, 68, 0.5)']
                  : ['0 0 5px rgba(239, 68, 68, 0.5)', '0 0 10px rgba(239, 68, 68, 0.8)', '0 0 5px rgba(239, 68, 68, 0.5)']
              }}
              transition={{ 
                duration: isExiting ? 3 : 2, 
                times: isExiting ? [0, 0.7, 1] : undefined,
                repeat: isExiting ? 0 : Infinity,
                ease: isExiting ? "easeInOut" : "linear"
              }}
            >
              {isExiting ? "NEBULA_ACTIVATED" : "LOADING_NEBULA"}
            </motion.div>
            
            <motion.div 
              className="text-sm text-red-400"
              initial={{ opacity: 0, y: 5 }}
              animate={{ 
                opacity: isExiting ? [1, 0.6, 0] : [0.5, 0.8, 0.5],
                y: isExiting ? [0, 5] : 0
              }}
              transition={{ 
                delay: isExiting ? 0.3 : 1.5, 
                duration: isExiting ? 2.8 : 2, 
                times: isExiting ? [0, 0.7, 1] : undefined,
                repeat: isExiting ? 0 : Infinity,
                ease: isExiting ? "easeInOut" : "linear"
              }}
            >
              {isExiting ? "Система NEBULA активирована..." : "Инициализация протоколов безопасности..."}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NebulaTransition; 
