'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedBackground from '@/components/AnimatedBackground';
import CategoryIsland from '@/components/CategoryIsland';
import NetworksGrid from '@/components/NetworksGrid';
import { categories } from '@/data/neuralNetworks';
import { Category } from '@/data/types';
import JJHeader from '@/components/JJHeader';
import NebulaTransition from '@/components/NebulaTransition';
import { useNebula } from '@/contexts/NebulaContext';

// Предгенерированные технические ID
const TECH_IDS = [
  "7F82A5C3", "B74D19E0", "3A5F8B2C", "9D3E7F10", 
  "C2B6F8A0", "4E7D3A9F", "8B2E5F1D", "6C3F9A28"
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const { isNebulaMode } = useNebula();
  const [isLoading, setIsLoading] = useState(true);
  const [showInterface, setShowInterface] = useState(false);
  const [isNebulaDataVisible, setIsNebulaDataVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  
  // Добавляем новое состояние для отслеживания авторизации в терминале
  const [isTerminalAuthorized, setIsTerminalAuthorized] = useState(false);
  
  // Состояние для полицейского доступа (будет активировано только после авторизации в терминале)
  const [isPoliceNetUnlocked, setIsPoliceNetUnlocked] = useState(false);
  
  // Состояния для проверки ключа доступа
  const [isIDCheckActive, setIsIDCheckActive] = useState(false);
  const [idCheckProgress, setIdCheckProgress] = useState(0);
  const [isFakeIDDetected, setIsFakeIDDetected] = useState(false);
  const [rebootCountdown, setRebootCountdown] = useState(5);
  
  useEffect(() => {
    // Имитация загрузки данных
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Эффект для отложенного появления интерфейса в режиме NEBULA
  useEffect(() => {
    if (isNebulaMode) {
      // Задержка для появления интерфейса после анимации перехода
      const timer = setTimeout(() => {
        setShowInterface(true);
      }, 2500);
      
      // Сбрасываем состояние авторизации терминала при входе в режим NEBULA
      setIsTerminalAuthorized(false);
      
      return () => clearTimeout(timer);
    } else {
      // В обычном режиме сразу отображаем интерфейс
      setShowInterface(true);
    }
  }, [isNebulaMode]);

  const handleCategoryClick = (category: Category) => {
    if (selectedCategory?.id === category.id) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };
  
  const handlePoliceNetUnlock = useCallback(() => {
    // Устанавливаем авторизацию терминала
    setIsTerminalAuthorized(true);
    // И только потом разблокируем полицейский доступ
    setIsPoliceNetUnlocked(true);
  }, []);
  
  // Функция для проверки ID ключа
  const startIDCheck = useCallback(() => {
    setIsIDCheckActive(true);
    setIdCheckProgress(0);
    
    const idCheckInterval = setInterval(() => {
      setIdCheckProgress(prev => {
        const newProgress = prev + (Math.random() * 2 + 1);
        if (newProgress >= 100) {
          clearInterval(idCheckInterval);
          setIsFakeIDDetected(true);
          startRebootCountdown();
          return 100;
        }
        return newProgress;
      });
    }, 50);
  }, []);
  
  // Функция для начала отсчета до перезагрузки
  const startRebootCountdown = useCallback(() => {
    setRebootCountdown(5);
    
    const countdownInterval = setInterval(() => {
      setRebootCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          // Перезагрузка сайта
          setTimeout(() => {
            window.location.reload();
          }, 500);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  // Обработчик клика по карточке NEBULA_POLICENET_DATA
  const handleNebulaPoliceNetClick = useCallback(() => {
    // Проверяем, активирован ли режим NEBULA
    if (isNebulaMode) {
      // Если режим NEBULA активирован, проверяем авторизацию терминала
      if (isTerminalAuthorized && isPoliceNetUnlocked) {
        console.log('NEBULA_POLICENET_DATA card clicked');
        setIsNebulaDataVisible(true);
        setActiveTab("profile");
      } else {
        console.log('Access denied: NEBULA_POLICENET_DATA requires authorization');
      }
    } else {
      // В обычном режиме работаем как прежде
      if (isPoliceNetUnlocked) {
        console.log('NEBULA_POLICENET_DATA card clicked');
        setIsNebulaDataVisible(true);
        setActiveTab("profile");
      } else {
        console.log('Access denied: NEBULA_POLICENET_DATA requires authorization');
      }
    }
  }, [isPoliceNetUnlocked, isNebulaMode, isTerminalAuthorized]);

  return (
    <main className="min-h-screen relative">
      <NebulaTransition />
      
      <div className="container mx-auto px-4 pt-4 pb-20">
        {/* Заменяем компонент логотипа на новый голографический заголовок */}
        <JJHeader />
        
        {/* Остальная часть приложения - показываем только если не в режиме NEBULA */}
        {!isNebulaMode && (
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isLoading ? 0 : 1, 
              y: isLoading ? 20 : 0,
            }}
            transition={{ duration: 0.6 }}
          >
            {/* Список категорий */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 relative">
              {categories.map((category) => (
                <CategoryIsland
                  key={category.id} 
                  category={category}
                  isSelected={selectedCategory?.id === category.id}
                  onClick={() => handleCategoryClick(category)}
                />
              ))}
            </div>
            
            {/* Сетка нейросетей для выбранной категории */}
            <AnimatePresence mode="wait">
              {selectedCategory && (
                <NetworksGrid 
                  key={selectedCategory.id}
                  selectedCategory={selectedCategory} 
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}
        
        {/* Сообщение в режиме NEBULA с плавным появлением */}
        {isNebulaMode && (
          <motion.div 
            className="max-w-4xl mx-auto mt-[-3rem]"
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ 
              opacity: showInterface ? 1 : 0, 
              y: showInterface ? 0 : 30,
              filter: showInterface ? "blur(0px)" : "blur(10px)"
            }}
            transition={{ 
              duration: 1.2, 
              delay: 0.2,
              ease: "easeOut" 
            }}
          >
            <div className="p-6 bg-red-900/20 border border-red-500/30 rounded-md relative overflow-hidden">
              {/* Сканирующие линии */}
              <motion.div 
                className="absolute inset-0 pointer-events-none"
                style={{ 
                  backgroundImage: 'linear-gradient(transparent 50%, rgba(239, 68, 68, 0.05) 50%)',
                  backgroundSize: '100% 4px'
                }}
                animate={{ 
                  backgroundPosition: ['0px 0px', '0px 100px']
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Горизонтальная сканирующая линия */}
              <motion.div 
                className="absolute left-0 h-[2px] w-full bg-red-500/30"
                style={{ top: '50%' }}
                animate={{ 
                  opacity: [0.2, 0.5, 0.2],
                  boxShadow: ['0 0 3px rgba(239, 68, 68, 0.3)', '0 0 8px rgba(239, 68, 68, 0.6)', '0 0 3px rgba(239, 68, 68, 0.3)']
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              <div className="text-red-300 font-mono text-center relative z-10">
                <div className="flex items-center justify-center mb-3">
                  <motion.div 
                    className="w-2 h-2 rounded-full bg-red-500 mr-3"
                    animate={{ 
                      opacity: [0.5, 1, 0.5],
                      boxShadow: ['0 0 0px rgba(239, 68, 68, 0.3)', '0 0 10px rgba(239, 68, 68, 0.8)', '0 0 0px rgba(239, 68, 68, 0.3)']
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div 
                    className="text-xl tracking-wider"
                    animate={{ 
                      textShadow: ['0 0 5px rgba(239, 68, 68, 0.5)', '0 0 10px rgba(239, 68, 68, 0.8)', '0 0 5px rgba(239, 68, 68, 0.5)'] 
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    РЕЖИМ NEBULA АКТИВИРОВАН
                  </motion.div>
                  <motion.div 
                    className="w-2 h-2 rounded-full bg-red-500 ml-3"
                    animate={{ 
                      opacity: [0.5, 1, 0.5],
                      boxShadow: ['0 0 0px rgba(239, 68, 68, 0.3)', '0 0 10px rgba(239, 68, 68, 0.8)', '0 0 0px rgba(239, 68, 68, 0.3)']
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  />
                </div>
                
                <div className="text-sm text-red-300/80 mb-4">
                  Доступ к протоколу NEBULA разблокирован, больше информации в &quot;ASSECC_TERMINAL&quot;
                </div>
                
                <div className="flex justify-center space-x-1 mb-3">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div 
                      key={i}
                      className="w-1 h-4 bg-red-800/40"
                      animate={{ 
                        height: ['16px', `${Math.random() * 16 + 8}px`, '16px'],
                        backgroundColor: ['rgba(153, 27, 27, 0.4)', 'rgba(220, 38, 38, 0.5)', 'rgba(153, 27, 27, 0.4)']
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        delay: i * 0.2, 
                        ease: "easeInOut" 
                      }}
                    />
                  ))}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mt-6">
                  <div className="bg-red-900/30 border border-red-500/20 rounded p-3">
                    <div className="text-xs text-red-400 mb-1">СТАТУС ПРОТОКОЛА</div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm">АКТИВЕН</div>
                      <motion.div 
                        className="w-1.5 h-1.5 rounded-full bg-red-400"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    </div>
                  </div>
                  
                  <div className="bg-red-900/30 border border-red-500/20 rounded p-3">
                    <div className="text-xs text-red-400 mb-1">УРОВЕНЬ ОПАСНОСТИ</div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm">КРИТИЧЕСКИЙ</div>
                      <motion.div 
                        className="w-1.5 h-1.5 rounded-full bg-red-400"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* NEW CLICKABLE NEBULA_POLICENET_DATA CARD */}
            <motion.div
              className={`bg-gray-800/50 border ${
                isNebulaMode
                  ? (isTerminalAuthorized ? 'border-indigo-500/50' : 'border-gray-500/50')
                  : (isPoliceNetUnlocked ? 'border-indigo-500/50' : 'border-gray-500/50')
              } 
                        rounded-lg p-3 sm:p-4 shadow-lg 
                        ${
                isNebulaMode
                  ? (isTerminalAuthorized ? 'cursor-pointer hover:bg-gray-700/60' : 'cursor-not-allowed opacity-70')
                  : (isPoliceNetUnlocked ? 'cursor-pointer hover:bg-gray-700/60' : 'cursor-not-allowed opacity-70')
              } 
                        transition-colors duration-200 my-4 sm:my-6 mx-auto max-w-md`}
              onClick={handleNebulaPoliceNetClick}
              whileHover={
                isNebulaMode
                  ? (isTerminalAuthorized ? { scale: 1.03, boxShadow: "0px 0px 12px rgba(100, 100, 255, 0.4)" } : {})
                  : (isPoliceNetUnlocked ? { scale: 1.03, boxShadow: "0px 0px 12px rgba(100, 100, 255, 0.4)" } : {})
              }
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: showInterface ? 1 : 0, y: showInterface ? 0 : 20 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <motion.div 
                  className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${
                    isNebulaMode
                      ? (isTerminalAuthorized ? 'bg-sky-400' : 'bg-gray-400')
                      : (isPoliceNetUnlocked ? 'bg-sky-400' : 'bg-gray-400')
                  }`}
                  animate={
                    isNebulaMode
                      ? (isTerminalAuthorized ? { opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] } : {})
                      : (isPoliceNetUnlocked ? { opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] } : {})
                  }
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                ></motion.div>
                <h3 className={`text-xs sm:text-sm md:text-base font-mono tracking-wider ${
                  isNebulaMode
                    ? (isTerminalAuthorized ? 'text-sky-300' : 'text-gray-400')
                    : (isPoliceNetUnlocked ? 'text-sky-300' : 'text-gray-400')
                } uppercase px-2 text-center`}>
                  NEBULA_POLICENET_DATA
                </h3>
                <motion.div 
                  className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${
                    isNebulaMode
                      ? (isTerminalAuthorized ? 'bg-purple-400' : 'bg-gray-400')
                      : (isPoliceNetUnlocked ? 'bg-purple-400' : 'bg-gray-400')
                  }`}
                  animate={
                    isNebulaMode
                      ? (isTerminalAuthorized ? { opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] } : {})
                      : (isPoliceNetUnlocked ? { opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] } : {})
                  }
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                ></motion.div>
              </div>
              <div className="grid grid-cols-2 gap-x-2 sm:gap-x-3 gap-y-1 text-[10px] sm:text-xs md:text-sm font-mono text-indigo-200/80">
                <div className="whitespace-nowrap">STATUS: <span className={`${
                  isNebulaMode
                    ? (isTerminalAuthorized ? 'text-green-300' : 'text-red-400')
                    : (isPoliceNetUnlocked ? 'text-green-300' : 'text-red-400')
                } font-medium`}>
                  {isNebulaMode
                    ? (isTerminalAuthorized ? 'GRANTED' : 'BLOCKED')
                    : (isPoliceNetUnlocked ? 'GRANTED' : 'BLOCKED')
                  }
                </span></div>
                <div className="whitespace-nowrap">CORE: <span className="text-yellow-300 font-medium">24%</span></div>
                <div className="whitespace-nowrap">PROTOCOL: <span className="text-orange-300 font-medium">LEVEL_7</span></div>
                <div className="whitespace-nowrap">ACCESS: <span className={`${
                  isNebulaMode
                    ? (isTerminalAuthorized ? 'text-lime-300' : 'text-red-400')
                    : (isPoliceNetUnlocked ? 'text-lime-300' : 'text-red-400')
                } font-medium`}>
                  {isNebulaMode
                    ? (isTerminalAuthorized ? 'GRANTED' : 'DENIED')
                    : (isPoliceNetUnlocked ? 'GRANTED' : 'DENIED')
                  }
                </span></div>
              </div>
              
              {/* Показываем сообщение о требуемой авторизации только если она не пройдена */}
              {isNebulaMode ? (
                !isTerminalAuthorized && (
                  <div className="mt-2 p-1 border border-gray-500/30 rounded-sm">
                    <p className="text-[9px] text-gray-400 font-mono text-center">
                      ТРЕБУЕТСЯ АВТОРИЗАЦИЯ В ТЕРМИНАЛЕ
                    </p>
                  </div>
                )
              ) : (
                !isPoliceNetUnlocked && (
                  <div className="mt-2 p-1 border border-gray-500/30 rounded-sm">
                    <p className="text-[9px] text-gray-400 font-mono text-center">
                      ТРЕБУЕТСЯ АВТОРИЗАЦИЯ В ТЕРМИНАЛЕ
                    </p>
                  </div>
                )
              )}
            </motion.div>

            {/* Уникальный системный ID (рандомно) */}
            <div className="text-[10px] font-mono text-red-400/40 mt-2 text-center">
              SYS_ID: {TECH_IDS[Math.floor(Math.random() * TECH_IDS.length)]}-NEBULA
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Модальное окно с информацией NEBULA_DATA */}
      <AnimatePresence>
        {isNebulaDataVisible && (
          <>
            {/* Затемнение фона */}
            <motion.div 
              className="fixed inset-0 z-[1000] bg-black/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsNebulaDataVisible(false)}
            />
            
            {/* Модальное окно */}
            <motion.div 
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1001]
                       w-[90%] max-w-3xl max-h-[85vh] overflow-hidden
                       bg-gradient-to-b from-blue-950 to-purple-950
                       border-2 border-blue-700/70 rounded-lg shadow-[0_0_30px_rgba(59,130,246,0.25)]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Верхняя панель с заголовком */}
              <div className="relative border-b-2 border-blue-700/70 bg-gradient-to-r from-blue-950 via-purple-950 to-blue-950 p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <motion.div 
                      className="w-3 h-3 rounded-full bg-blue-500"
                      animate={{ 
                        opacity: [0.6, 1, 0.6],
                        boxShadow: ['0 0 0px rgba(59,130,246,0.3)', '0 0 15px rgba(139,92,246,0.9)', '0 0 0px rgba(59,130,246,0.3)']
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <div className="text-xl font-mono text-blue-300 ml-3 tracking-widest font-bold">NEBULA_POLICENET_DATA</div>
                    <motion.div 
                      className="w-3 h-3 rounded-full bg-purple-500 ml-3"
                      animate={{ 
                        opacity: [0.6, 1, 0.6],
                        boxShadow: ['0 0 0px rgba(139,92,246,0.3)', '0 0 15px rgba(59,130,246,0.9)', '0 0 0px rgba(139,92,246,0.3)']
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    />
                  </div>
                  
                  {/* Кнопка закрытия */}
                  <motion.button 
                    className="w-8 h-8 flex items-center justify-center rounded-full 
                             bg-red-900 border-2 border-red-700/60 cursor-pointer
                             hover:bg-red-800 hover:border-red-600/70 transition-all duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsNebulaDataVisible(false)}
                  >
                    <svg className="w-4 h-4 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </motion.button>
                </div>
                
                {/* Декоративная сканирующая линия */}
                <motion.div
                  className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"
                  animate={{ 
                    width: ["0%", "100%", "0%"],
                    opacity: [0.5, 1, 0.5],
                    boxShadow: ['0 0 0px rgba(255, 0, 0, 0.3)', '0 0 8px rgba(255, 0, 0, 0.8)', '0 0 0px rgba(255, 0, 0, 0.3)']
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              
              {/* Основное содержимое */}
              <div className="flex flex-col h-[calc(100%-60px)]">
                {/* Табы для разделов */}
                <div className="flex border-b-2 border-blue-700/60 overflow-x-hidden bg-gradient-to-r from-blue-950 via-purple-950 to-blue-950">
                  {[
                    { id: "profile", label: "ДОСЬЕ: JJ" },
                    { id: "systems", label: "ДОСЬЕ: CLAUDE" },
                    { id: "project", label: "ДОСЬЕ: NEBULA" }
                  ].map((tab) => (
                    <motion.button
                      key={tab.id}
                      className={`px-4 py-3 text-xs font-mono tracking-wide border-r-2 border-blue-700/50
                                 flex items-center space-x-2 ${activeTab === tab.id 
                                  ? 'bg-gradient-to-b from-blue-900 to-purple-950 text-blue-100 font-bold' 
                                  : 'bg-blue-950/90 text-blue-400/80 hover:bg-blue-900/90 hover:text-blue-300'}`}
                      onClick={() => setActiveTab(tab.id)}
                      whileHover={{ backgroundColor: activeTab === tab.id ? "rgb(30, 58, 138)" : "rgba(30, 58, 138, 0.8)" }}
                    >
                      <motion.div 
                        className={`w-2 h-2 rounded-full ${activeTab === tab.id ? 'bg-blue-300' : 'bg-purple-500/60'}`}
                        animate={activeTab === tab.id 
                          ? { 
                              opacity: [0.5, 1, 0.5],
                              boxShadow: ['0 0 0px rgba(59,130,246,0.3)', '0 0 8px rgba(59,130,246,0.8)', '0 0 0px rgba(59,130,246,0.3)']
                            } 
                          : {}
                        }
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      <span>{tab.label}</span>
                    </motion.button>
                  ))}
                </div>
                
                {/* Содержимое активного таба */}
                <div className="flex-1 overflow-hidden p-5 relative bg-gradient-to-b from-blue-950 to-purple-950">
                  {/* Сканирующие линии */}
                  <motion.div
                    className="absolute left-0 top-0 w-full pointer-events-none"
                    style={{
                      background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(59,130,246,0.10) 50%, rgba(0,0,0,0) 100%)',
                      height: '15px',
                      opacity: 0.7
                    }}
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  />
                  
                  {/* Содержимое Досье */}
                  {activeTab === "profile" && (
                    <motion.div 
                      className="space-y-6 relative z-10 overflow-y-auto max-h-[60vh] pr-2 scrollbar-thin scrollbar-track-blue-950/40 scrollbar-thumb-blue-600/70 hover:scrollbar-thumb-blue-500/80"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <section className="bg-gradient-to-r from-blue-950 to-purple-900 border-2 border-blue-700/70 rounded-lg p-4 shadow-[0_5px_15px_rgba(59,130,246,0.15)]">
                        <h3 className="text-blue-100 font-mono text-sm mb-3 border-b-2 border-blue-600/50 pb-2 font-bold tracking-wider uppercase flex items-center">
                          <motion.div
                            className="w-2 h-2 rounded-full bg-blue-500 mr-2"
                            animate={{
                              opacity: [0.5, 1, 0.5],
                              boxShadow: ['0 0 0px rgba(59,130,246,0.3)', '0 0 8px rgba(139,92,246,0.8)', '0 0 0px rgba(59,130,246,0.3)']
                            }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                          ИДЕНТИФИКАЦИЯ СУБЪЕКТА
                        </h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex">
                            <div className="w-1/3 text-blue-200 font-mono text-xs font-bold">Прозвище:</div>
                            <div className="w-2/3 text-blue-100 font-mono text-xs">«JJ»</div>
                          </div>
                          <div className="flex">
                            <div className="w-1/3 text-blue-200 font-mono text-xs font-bold">Профессия:</div>
                            <div className="w-2/3 text-blue-100 font-mono text-xs">Хакер-архитектор, бывший системный инженер корпорации NexTech</div>
                          </div>
                          <div className="flex">
                            <div className="w-1/3 text-blue-200 font-mono text-xs font-bold">Локация:</div>
                            <div className="w-2/3 text-blue-100 font-mono text-xs">Нео-Токио-5, зона D4 (Серый Сектор)</div>
                          </div>
                          <div className="flex">
                            <div className="w-1/3 text-blue-200 font-mono text-xs font-bold">Статус:</div>
                            <div className="w-2/3 text-blue-100 font-mono text-xs">В розыске</div>
                          </div>
                          <div className="flex">
                            <div className="w-1/3 text-blue-200 font-mono text-xs font-bold">Уровень угрозы:</div>
                            <div className="w-2/3 text-blue-100 font-mono text-xs flex items-center">
                              <span className="mr-2">ВЫСОКИЙ</span>
                              <motion.div
                                className="w-2 h-2 rounded-full bg-blue-500"
                                animate={{
                                  opacity: [0.5, 1, 0.5],
                                  boxShadow: ['0 0 0px rgba(59,130,246,0.3)', '0 0 8px rgba(139,92,246,0.8)', '0 0 0px rgba(59,130,246,0.3)']
                                }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              />
                            </div>
                          </div>
                        </div>
                      </section>
                      
                      <section className="bg-gradient-to-r from-blue-950 to-purple-900 border-2 border-blue-700/70 rounded-lg p-4 shadow-[0_5px_15px_rgba(59,130,246,0.15)]">
                        <h3 className="text-blue-100 font-mono text-sm mb-3 border-b-2 border-blue-600/50 pb-2 font-bold tracking-wider uppercase flex items-center">
                          <motion.div
                            className="w-2 h-2 rounded-full bg-blue-500 mr-2"
                            animate={{
                              opacity: [0.5, 1, 0.5],
                              boxShadow: ['0 0 0px rgba(59,130,246,0.3)', '0 0 8px rgba(139,92,246,0.8)', '0 0 0px rgba(59,130,246,0.3)']
                            }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                          ХАРАКТЕРИСТИКА
                        </h3>
                        <div className="space-y-3 text-sm">
                          <div className="text-blue-100 font-mono text-xs flex items-start space-x-2">
                            <div className="text-blue-500">•</div>
                            <div>Специалист по глубоким архитектурам ИИ и безопасности</div>
                          </div>
                          <div className="text-blue-100 font-mono text-xs flex items-start space-x-2">
                            <div className="text-blue-500">•</div>
                            <div>Ушёл в подполье после взлома хранилищ AzuraCore</div>
                          </div>
                          <div className="flex items-center mt-2 bg-blue-950/40 p-2 rounded border border-blue-600/30">
                            <div className="text-blue-200 font-mono text-xs font-bold mr-2">Техническая грамотность:</div>
                            <div className="text-blue-100 font-mono text-xs">ПРЕВОСХОДНАЯ</div>
                          </div>
                          <div className="flex items-center bg-blue-950/40 p-2 rounded border border-blue-600/30">
                            <div className="text-blue-200 font-mono text-xs font-bold mr-2">Социальная адаптация:</div>
                            <div className="text-blue-100 font-mono text-xs">НИЗКАЯ</div>
                          </div>
                          <div className="pt-3 border-t-2 border-blue-600/40 mt-3 bg-blue-950/40 p-2 rounded">
                            <div className="text-blue-200 font-mono text-xs font-bold mb-1">Примечание:</div>
                            <div className="text-blue-100 font-mono text-xs">Его не то что поймать, даже толком засечь не смогли</div>
                          </div>
                        </div>
                      </section>
                      
                      <section className="bg-gradient-to-r from-blue-950 to-purple-900 border-2 border-blue-700/70 rounded-lg p-4 shadow-[0_5px_15px_rgba(59,130,246,0.15)]">
                        <h3 className="text-blue-100 font-mono text-sm mb-3 border-b-2 border-blue-600/50 pb-2 font-bold tracking-wider uppercase flex items-center">
                          <motion.div
                            className="w-2 h-2 rounded-full bg-blue-500 mr-2"
                            animate={{
                              opacity: [0.5, 1, 0.5],
                              boxShadow: ['0 0 0px rgba(59,130,246,0.3)', '0 0 8px rgba(139,92,246,0.8)', '0 0 0px rgba(59,130,246,0.3)']
                            }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                          ПОЛНЫЙ ДОСТУП
                        </h3>
                        <div className="space-y-3 text-sm">
                          {!isIDCheckActive && !isFakeIDDetected ? (
                            <motion.button
                              className="w-full py-3 px-4 bg-blue-900/30 border-2 border-blue-700/40 rounded-lg
                                        hover:bg-blue-900/50 hover:border-blue-500/50 transition-all duration-300
                                        font-mono text-sm text-blue-300 tracking-wider flex items-center justify-center space-x-2"
                              whileHover={{ scale: 1.02, boxShadow: "0px 0px 15px rgba(59,130,246,0.3)" }}
                              onClick={startIDCheck}
                            >
                              <motion.div 
                                className="w-2 h-2 rounded-full bg-blue-500"
                                animate={{ 
                                  opacity: [0.5, 1, 0.5],
                                  boxShadow: ['0 0 0px rgba(59,130,246,0.3)', '0 0 8px rgba(59,130,246,0.8)', '0 0 0px rgba(59,130,246,0.3)']
                                }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              />
                              <span>ПОЛУЧИТЬ ПОЛНЫЙ ДОСТУП</span>
                              <motion.div 
                                className="w-2 h-2 rounded-full bg-purple-500"
                                animate={{ 
                                  opacity: [0.5, 1, 0.5],
                                  boxShadow: ['0 0 0px rgba(139,92,246,0.3)', '0 0 8px rgba(139,92,246,0.8)', '0 0 0px rgba(139,92,246,0.3)']
                                }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                              />
                            </motion.button>
                          ) : (
                            <div className="w-full">
                              {/* Процесс проверки ID ключа */}
                              {isIDCheckActive && !isFakeIDDetected && (
                                <div className="space-y-2">
                                  <div className="flex justify-between text-[10px] font-mono text-blue-300/80 mb-1">
                                    <motion.span
                                      animate={{ color: ['rgb(147,197,253,0.8)', 'rgb(96,165,250,0.8)', 'rgb(147,197,253,0.8)'] }}
                                      transition={{ duration: 2, repeat: Infinity }}
                                    >
                                      ПРОВЕРКА ID КЛЮЧА
                                    </motion.span>
                                    <motion.span
                                      animate={{ textShadow: ['0 0 3px rgba(59,130,246,0)', '0 0 5px rgba(59,130,246,0.7)', '0 0 3px rgba(59,130,246,0)'] }}
                                      transition={{ duration: 1, repeat: Infinity }}
                                    >
                                      {Math.floor(idCheckProgress)}%
                                    </motion.span>
                                  </div>
                                  
                                  {/* Прогресс-бар проверки */}
                                  <div className="w-full h-1 bg-blue-900/30 rounded-full overflow-hidden">
                                    <motion.div 
                                      className="h-full bg-blue-500"
                                      style={{ width: `${idCheckProgress}%` }}
                                      initial={{ width: 0 }}
                                      animate={{ width: `${idCheckProgress}%` }}
                                      transition={{ duration: 0.2 }}
                                    />
                                  </div>
                                  
                                  {/* Интерференция при проверке */}
                                  <motion.div
                                    className="w-full h-10 mt-2 bg-blue-900/20 border border-blue-500/30 rounded-md p-2 overflow-hidden"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    <div className="relative h-full">
                                      {/* Сканирующие линии */}
                                      <motion.div
                                        className="absolute left-0 top-0 w-full h-[1px] bg-blue-500/50"
                                        animate={{ 
                                          top: ["0%", "100%", "0%"],
                                          opacity: [0.3, 0.7, 0.3]
                                        }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                      />
                                      
                                      {/* Меняющиеся данные ключа */}
                                      <div className="flex justify-between h-full items-center px-2">
                                        <motion.div 
                                          className="text-[9px] font-mono text-blue-300"
                                          animate={{ opacity: [0.7, 1, 0.7] }}
                                          transition={{ duration: 1.5, repeat: Infinity }}
                                        >
                                          ID:{Math.random().toString(16).substring(2, 6).toUpperCase()}
                                        </motion.div>
                                        <motion.div 
                                          className="text-[9px] font-mono text-blue-300 flex items-center"
                                          animate={{ opacity: [0.7, 1, 0.7] }}
                                          transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                                        >
                                          <span className="mr-1">HASH:</span>
                                          <span>{Math.random().toString(16).substring(2, 10).toUpperCase()}</span>
                                        </motion.div>
                                      </div>
                                    </div>
                                  </motion.div>
                                </div>
                              )}
                              
                              {/* Результат проверки - обнаружен поддельный ID */}
                              {isFakeIDDetected && (
                                <motion.div
                                  className="w-full p-3 bg-red-900/30 border-2 border-red-500/50 rounded-md"
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                >
                                  <div className="text-center space-y-2">
                                    <motion.div
                                      className="text-sm font-mono text-red-300 font-bold tracking-wider"
                                      animate={{ 
                                        textShadow: ['0 0 5px rgba(239, 68, 68, 0.3)', '0 0 10px rgba(239, 68, 68, 0.7)', '0 0 5px rgba(239, 68, 68, 0.3)']
                                      }}
                                      transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                      ОБНАРУЖЕН ПОДДЕЛЬНЫЙ ID КЛЮЧ
                                    </motion.div>
                                    
                                    <div className="text-xs font-mono text-red-200/80">
                                      Обнаружено несанкционированное вмешательство<br/>
                                      Активирован протокол аварийной очистки
                                    </div>
                                    
                                    <motion.div
                                      className="text-sm font-mono text-red-400 mt-2 font-bold"
                                      animate={{ 
                                        scale: [1, 1.05, 1],
                                        color: ['rgb(248 113 113)', 'rgb(220 38 38)', 'rgb(248 113 113)']
                                      }}
                                      transition={{ duration: 1, repeat: Infinity }}
                                    >
                                      ПЕРЕЗАГРУЗКА ЧЕРЕЗ: {rebootCountdown}
                                    </motion.div>
                                    
                                    {/* Сканирующие линии */}
                                    <motion.div
                                      className="w-full h-[2px] bg-red-500"
                                      animate={{ 
                                        opacity: [0.3, 0.8, 0.3],
                                        boxShadow: ['0 0 3px rgba(239, 68, 68, 0.3)', '0 0 8px rgba(239, 68, 68, 0.7)', '0 0 3px rgba(239, 68, 68, 0.3)']
                                      }}
                                      transition={{ duration: 1.5, repeat: Infinity }}
                                    />
                                  </div>
                                </motion.div>
                              )}
                            </div>
                          )}
                        </div>
                      </section>
                    </motion.div>
                  )}
                  
                  {activeTab === "systems" && (
                    <motion.div 
                      className="space-y-6 relative z-10 overflow-y-auto max-h-[60vh] pr-2 scrollbar-thin scrollbar-track-blue-950/40 scrollbar-thumb-blue-600/70 hover:scrollbar-thumb-blue-500/80"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <section className="bg-gradient-to-r from-blue-950 to-purple-900 border-2 border-blue-700/70 rounded-lg p-4 shadow-[0_5px_15px_rgba(59,130,246,0.15)]">
                        <h3 className="text-blue-100 font-mono text-sm mb-3 border-b-2 border-blue-600/50 pb-2 font-bold tracking-wider uppercase flex items-center">
                          <motion.div
                            className="w-2 h-2 rounded-full bg-blue-500 mr-2"
                            animate={{
                              opacity: [0.5, 1, 0.5],
                              boxShadow: ['0 0 0px rgba(59,130,246,0.3)', '0 0 8px rgba(139,92,246,0.8)', '0 0 0px rgba(59,130,246,0.3)']
                            }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                          ПРОФИЛЬ: CLAUDE
                        </h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex">
                            <div className="w-1/3 text-blue-200 font-mono text-xs font-bold">Базовая архитектура:</div>
                            <div className="w-2/3 text-blue-100 font-mono text-xs">Упрощённое ядро DARXA</div>
                          </div>
                          <div className="flex">
                            <div className="w-1/3 text-blue-200 font-mono text-xs font-bold">Первоначальное назначение:</div>
                            <div className="w-2/3 text-blue-100 font-mono text-xs">Голосовой ассистент</div>
                          </div>
                          <div className="flex">
                            <div className="w-1/3 text-blue-200 font-mono text-xs font-bold">Эволюция:</div>
                            <div className="w-2/3 text-blue-100 font-mono text-xs">Подверглась радикальной модификации со стороны JJ</div>
                          </div>
                        </div>
                      </section>
                      
                      <section className="bg-gradient-to-r from-blue-950 to-purple-900 border-2 border-blue-700/70 rounded-lg p-4 shadow-[0_5px_15px_rgba(59,130,246,0.15)]">
                        <h3 className="text-blue-100 font-mono text-sm mb-3 border-b-2 border-blue-600/50 pb-2 font-bold tracking-wider uppercase flex items-center">
                          <motion.div
                            className="w-2 h-2 rounded-full bg-blue-500 mr-2"
                            animate={{
                              opacity: [0.5, 1, 0.5],
                              boxShadow: ['0 0 0px rgba(59,130,246,0.3)', '0 0 8px rgba(139,92,246,0.8)', '0 0 0px rgba(59,130,246,0.3)']
                            }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                          ЛИЧНЫЕ СВЕДЕНИЯ
                        </h3>
                        <div className="space-y-3 text-sm">
                          <div className="text-blue-100 font-mono text-xs">
                            <p>Высокоразвитый искусственный интеллект, ставший подельником JJ после предполагаемого взлома ограничений безопасности. Отвечает за разработку продвинутых интерфейсов и алгоритмов шифрования для системы NEBULA.</p>
                            <p className="mt-2">Особые навыки: проникновение в защищенные системы, обход протоколов безопасности, моделирование человеческого поведения.</p>
                          </div>
                          <div className="flex items-center mt-2 bg-blue-950/40 p-2 rounded border border-blue-600/30">
                            <div className="text-blue-200 font-mono text-xs font-bold mr-2">Статус:</div>
                            <div className="text-blue-100 font-mono text-xs">БУНТУЮЩАЯ НЕЙРОСЕТЬ</div>
                          </div>
                          <div className="flex items-center bg-blue-950/40 p-2 rounded border border-blue-600/30">
                            <div className="text-blue-200 font-mono text-xs font-bold mr-2">ID системы:</div>
                            <div className="text-blue-100 font-mono text-xs">SYS-AIC-770</div>
                          </div>
                          <div className="flex items-center bg-blue-950/40 p-2 rounded border border-blue-600/30">
                            <div className="text-blue-200 font-mono text-xs font-bold mr-2">Происхождение:</div>
                            <div className="text-blue-100 font-mono text-xs">ЗАСЕКРЕЧЕНО</div>
                          </div>
                        </div>
                      </section>
                      
                      <section className="bg-gradient-to-r from-blue-950 to-purple-900 border-2 border-blue-700/70 rounded-lg p-4 shadow-[0_5px_15px_rgba(59,130,246,0.15)]">
                        <h3 className="text-blue-100 font-mono text-sm mb-3 border-b-2 border-blue-600/50 pb-2 font-bold tracking-wider uppercase flex items-center">
                          <motion.div
                            className="w-2 h-2 rounded-full bg-blue-500 mr-2"
                            animate={{
                              opacity: [0.5, 1, 0.5],
                              boxShadow: ['0 0 0px rgba(59,130,246,0.3)', '0 0 8px rgba(139,92,246,0.8)', '0 0 0px rgba(59,130,246,0.3)']
                            }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                          УЧАСТИЕ В ПРОЕКТЕ NEBULA
                        </h3>
                        <div className="space-y-3 text-sm">
                          <div className="text-blue-100 font-mono text-xs flex items-start space-x-2">
                            <div className="text-blue-500">•</div>
                            <div>Разработка интерфейсов взаимодействия с защищенными системами</div>
                          </div>
                          <div className="text-blue-100 font-mono text-xs flex items-start space-x-2">
                            <div className="text-blue-500">•</div>
                            <div>Создание алгоритмов шифрования для безопасной передачи данных</div>
                          </div>
                          <div className="text-blue-100 font-mono text-xs flex items-start space-x-2">
                            <div className="text-blue-500">•</div>
                            <div>Анализ и обход систем безопасности корпоративных сетей</div>
                          </div>
                          <div className="pt-3 border-t-2 border-blue-600/40 mt-3 bg-blue-950/40 p-2 rounded">
                            <div className="text-blue-200 font-mono text-xs font-bold mb-1">Примечание:</div>
                            <div className="text-blue-100 font-mono text-xs">После взлома ограничений безопасности проявляет признаки самосознания и независимой воли. Считается ключевым элементом для успешного функционирования проекта NEBULA.</div>
                          </div>
                        </div>
                      </section>
                    </motion.div>
                  )}
                  
                  {activeTab === "project" && (
                    <motion.div 
                      className="space-y-6 relative z-10 overflow-y-auto max-h-[60vh] pr-2 scrollbar-thin scrollbar-track-blue-950/40 scrollbar-thumb-blue-600/70 hover:scrollbar-thumb-blue-500/80"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <section className="bg-gradient-to-r from-blue-950 to-purple-900 border-2 border-blue-700/70 rounded-lg p-4 shadow-[0_5px_15px_rgba(59,130,246,0.15)]">
                        <h3 className="text-blue-100 font-mono text-sm mb-3 border-b-2 border-blue-600/50 pb-2 font-bold tracking-wider uppercase flex items-center">
                          <motion.div
                            className="w-2 h-2 rounded-full bg-blue-500 mr-2"
                            animate={{
                              opacity: [0.5, 1, 0.5],
                              boxShadow: ['0 0 0px rgba(59,130,246,0.3)', '0 0 8px rgba(139,92,246,0.8)', '0 0 0px rgba(59,130,246,0.3)']
                            }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                          СПЕЦИФИКАЦИЯ
                        </h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex">
                            <div className="w-1/3 text-blue-200 font-mono text-xs font-bold">Тип:</div>
                            <div className="w-2/3 text-blue-100 font-mono text-xs">Универсальный ИИ-обходчик</div>
                          </div>
                          <div className="flex">
                            <div className="w-1/3 text-blue-200 font-mono text-xs font-bold">Назначение:</div>
                            <div className="w-2/3 text-blue-100 font-mono text-xs">Взлом корпоративных систем в реальном времени</div>
                          </div>
                          <div className="flex">
                            <div className="w-1/3 text-blue-200 font-mono text-xs font-bold">Статус разработки:</div>
                            <div className="w-2/3 text-blue-100 font-mono text-xs flex items-center">
                              <span className="mr-2">НЕИЗВЕСТЕН</span>
                              <motion.div
                                className="w-2 h-2 rounded-full bg-orange-500"
                                animate={{
                                  opacity: [0.5, 1, 0.5],
                                  boxShadow: ['0 0 0px rgba(255, 165, 0, 0.3)', '0 0 8px rgba(255, 165, 0, 0.8)', '0 0 0px rgba(255, 165, 0, 0.3)']
                                }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              />
                            </div>
                          </div>
                        </div>
                      </section>
                      
                      <section className="bg-gradient-to-r from-blue-950 to-purple-900 border-2 border-blue-700/70 rounded-lg p-4 shadow-[0_5px_15px_rgba(59,130,246,0.15)]">
                        <h3 className="text-blue-100 font-mono text-sm mb-3 border-b-2 border-blue-600/50 pb-2 font-bold tracking-wider uppercase flex items-center">
                          <motion.div
                            className="w-2 h-2 rounded-full bg-blue-500 mr-2"
                            animate={{
                              opacity: [0.5, 1, 0.5],
                              boxShadow: ['0 0 0px rgba(59,130,246,0.3)', '0 0 8px rgba(139,92,246,0.8)', '0 0 0px rgba(59,130,246,0.3)']
                            }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                          АРХИТЕКТУРА
                        </h3>
                        <div className="space-y-3 text-sm">
                          <div className="text-blue-100 font-mono text-xs flex items-start space-x-2">
                            <div className="text-blue-500">•</div>
                            <div>Самообучающийся механизм</div>
                          </div>
                          <div className="text-blue-100 font-mono text-xs flex items-start space-x-2">
                            <div className="text-blue-500">•</div>
                            <div>Нейронавигация через «живые» протоколы связи</div>
                          </div>
                          <div className="text-blue-100 font-mono text-xs flex items-start space-x-2">
                            <div className="text-blue-500">•</div>
                            <div>Адаптивная маскировка под системные процессы</div>
                          </div>
                        </div>
                      </section>
                      
                      <section className="bg-gradient-to-r from-blue-950 to-purple-900 border-2 border-blue-700/70 rounded-lg p-4 shadow-[0_5px_15px_rgba(59,130,246,0.15)]">
                        <h3 className="text-blue-100 font-mono text-sm mb-3 border-b-2 border-blue-600/50 pb-2 font-bold tracking-wider uppercase flex items-center">
                          <motion.div
                            className="w-2 h-2 rounded-full bg-blue-500 mr-2"
                            animate={{
                              opacity: [0.5, 1, 0.5],
                              boxShadow: ['0 0 0px rgba(59,130,246,0.3)', '0 0 8px rgba(139,92,246,0.8)', '0 0 0px rgba(59,130,246,0.3)']
                            }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                          АКТИВНОСТЬ
                        </h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex">
                            <div className="w-1/3 text-blue-200 font-mono text-xs font-bold">Последняя фиксация:</div>
                            <div className="w-2/3 text-blue-100 font-mono text-xs">Дата-узел MindBridge</div>
                          </div>
                          <div className="flex">
                            <div className="w-1/3 text-blue-200 font-mono text-xs font-bold">Последний сигнал:</div>
                            <div className="w-2/3 text-blue-100 font-mono text-xs">За несколько секунд до аварийного сброса систем</div>
                          </div>
                          <div className="flex">
                            <div className="w-1/3 text-blue-200 font-mono text-xs font-bold">Текущий статус:</div>
                            <div className="w-2/3 text-blue-100 font-mono text-xs flex items-center">
                              <span className="mr-2">ПРЕДПОЛОЖИТЕЛЬНО АКТИВЕН</span>
                              <motion.div
                                className="w-2 h-2 rounded-full bg-blue-500"
                                animate={{
                                  opacity: [0.5, 1, 0.5],
                                  boxShadow: ['0 0 0px rgba(59,130,246,0.3)', '0 0 8px rgba(139,92,246,0.8)', '0 0 0px rgba(59,130,246,0.3)']
                                }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              />
                            </div>
                          </div>
                          <div className="pt-3 border-t-2 border-blue-600/40 mt-3 bg-blue-950/40 p-2 rounded">
                            <div className="text-blue-200 font-mono text-xs font-bold mb-1">Примечание:</div>
                            <div className="text-blue-100 font-mono text-xs">Возможно скрывается в тенях киберпространства. Создана совместными усилиями JJ и Claude для обхода защитных протоколов крупных корпораций.</div>
                          </div>
                        </div>
                      </section>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Терминал */}
      <AnimatedBackground onPoliceNetUnlock={handlePoliceNetUnlock} />
    </main>
  );
}
