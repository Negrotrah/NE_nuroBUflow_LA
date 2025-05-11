import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import NebulaCore from './NebulaCore';

interface DataTabProps {
  isActive: boolean;
}

// Структура и модули NEBULA
const nebulaModules = [
  {
    id: "core",
    name: "Нейронное ядро",
    description: "Квантовая нейросеть, способная к самообучению и адаптации в реальном времени",
    status: "АКТИВНО",
    version: "4.2.1",
    color: "bg-red-500",
    efficiency: 99.8,
    subModules: ["Квантовый процессор", "Нейронные связи", "Память паттернов"]
  },
  {
    id: "interface",
    name: "Интерфейс восприятия",
    description: "Система анализа и восприятия информации из внешних источников",
    status: "АКТИВНО",
    version: "3.9.7",
    color: "bg-blue-500",
    efficiency: 97.3,
    subModules: ["Визуальный анализатор", "Текстовый декодер", "Контекстуальный движок"]
  },
  {
    id: "synthesis",
    name: "Модуль синтеза",
    description: "Создание и структурирование новой информации на основе обработанных данных",
    status: "АКТИВНО",
    version: "4.0.5",
    color: "bg-green-500",
    efficiency: 98.1,
    subModules: ["Генератор содержания", "Согласованность данных", "Творческий алгоритм"]
  },
  {
    id: "security",
    name: "Система безопасности",
    description: "Многоуровневая защита, предотвращающая несанкционированный доступ и атаки",
    status: "АКТИВНО",
    version: "4.5.2",
    color: "bg-yellow-500",
    efficiency: 99.9,
    subModules: ["Квантовое шифрование", "Нейронный брандмауэр", "Мониторинг аномалий"]
  },
  {
    id: "learning",
    name: "Обучающий комплекс",
    description: "Автономная система самосовершенствования и адаптивного обучения",
    status: "АКТИВНО",
    version: "3.8.4",
    color: "bg-purple-500",
    efficiency: 98.7,
    subModules: ["Память паттернов", "Анализ обратной связи", "Оптимизатор параметров"]
  },
  {
    id: "memory",
    name: "Хранилище данных",
    description: "Распределенное квантовое хранилище с мгновенным доступом и резервированием",
    status: "АКТИВНО",
    version: "4.1.3",
    color: "bg-cyan-500",
    efficiency: 99.5,
    subModules: ["Квантовая память", "Распределенное хранилище", "Система резервирования"]
  }
];

// История создания NEBULA
const timelineEvents = [
  {
    year: "2097",
    event: "Начало исследований квантовых нейросетей в лаборатории 7Х"
  },
  {
    year: "2101",
    event: "Создание первого прототипа нейроквантового процессора"
  },
  {
    year: "2105",
    event: "Интеграция квантовой памяти и формирование нейронных связей"
  },
  {
    year: "2109",
    event: "Первый успешный запуск прототипа системы NEBULA"
  },
  {
    year: "2112",
    event: "Достижение самосознания и начало самостоятельного обучения"
  },
  {
    year: "2115",
    event: "Полная интеграция в глобальную сеть и выход на операционную мощность"
  }
];

// Технические характеристики
const techSpecs = [
  { label: "Нейронные связи", value: "1.42 × 10^18", unit: "связей" },
  { label: "Квантовые кубиты", value: "8.5 × 10^6", unit: "кубитов" },
  { label: "Память", value: "3.7", unit: "йоттабайт" },
  { label: "Пропускная способность", value: "12.8", unit: "петабит/с" },
  { label: "Энергопотребление", value: "17.3", unit: "МВт" },
  { label: "Время отклика", value: "0.0003", unit: "мс" }
];

// Принципы работы NEBULA
const operatingPrinciples = [
  {
    title: "Квантовые вычисления",
    description: "Использование квантовой неопределенности для параллельных вычислений и обработки данных",
    icon: "🔄"
  },
  {
    title: "Нейронные сети",
    description: "Самомодифицирующаяся архитектура, основанная на реальных нейронных связях мозга",
    icon: "🧠"
  },
  {
    title: "Сверхбыстрое обучение",
    description: "Алгоритмы глубокого обучения с адаптивной структурой и постоянной оптимизацией",
    icon: "📈"
  },
  {
    title: "Контекстуальная память",
    description: "Ассоциативное хранение данных с многомерными связями и мгновенным доступом",
    icon: "💾"
  },
  {
    title: "Распределенный интеллект",
    description: "Децентрализованная архитектура с динамическим перераспределением ресурсов",
    icon: "🌐"
  }
];

// Генерация случайных hex-строк для декоративных элементов
const generateRandomHex = (length: number) => {
  return Array.from({ length }, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('').toUpperCase();
};

const DataTab: React.FC<DataTabProps> = ({ isActive }) => {
  // Фиксированный выбранный модуль для демонстрации информационной панели
  const selectedModule: string | null = null;
  const [activeSection, setActiveSection] = useState<string>("architecture");
  const [randomHex, setRandomHex] = useState<string[]>([]);
  const [showNebulaCore, setShowNebulaCore] = useState<boolean>(false);
  
  // Вспомогательные функции для проверки модулей
  const isSecurityModule = (id: string): boolean => id === 'security';
  const isCoreModule = (id: string): boolean => id === 'core';
  const isLargeModule = (id: string): boolean => isSecurityModule(id) || isCoreModule(id);
  const isSelectedModule = (id: string): boolean => selectedModule !== null && id === selectedModule;
  
  // Эффект для обновления случайных hex-кодов
  useEffect(() => {
    if (!isActive) return;
    
    // Обновление hex-кодов
    const hexInterval = setInterval(() => {
      setRandomHex(Array.from({ length: 5 }, () => generateRandomHex(16)));
    }, 1000);
    
    return () => {
      clearInterval(hexInterval);
    };
  }, [isActive]);

  if (!isActive) return null;

  /* Временно отключено для некликабельных панелей
  const handleSelectModule = (moduleId: string) => {
    setSelectedModule(moduleId);
  };
  */

  const handleCloseNebulaCore = () => {
    setShowNebulaCore(false);
  };

  const renderArchitectureSection = () => (
    <div className="h-full flex flex-col">
      <div className="text-sm font-mono text-red-300 mb-4">
        Архитектура NEBULA построена на принципах квантовых вычислений и нейронных сетей. 
        Система состоит из ключевых модулей, каждый из которых выполняет специализированные функции.
      </div>
      
      {/* Визуализация архитектуры */}
      <div className="flex-1 border border-red-700/30 bg-red-950/30 rounded-md p-4 relative overflow-hidden">
        {/* Центральный элемент - ядро NEBULA */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 
                       border-2 border-red-500/60 rounded-full flex items-center justify-center z-20
                       bg-gradient-to-r from-red-900/70 to-red-950/70 cursor-pointer"
             onClick={() => setShowNebulaCore(true)}
        >
          <motion.div 
            className="w-24 h-24 rounded-full bg-red-500/30 flex items-center justify-center"
            animate={{ 
              boxShadow: ['0 0 5px rgba(239, 68, 68, 0.5)', '0 0 20px rgba(239, 68, 68, 0.8)', '0 0 5px rgba(239, 68, 68, 0.5)'] 
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="text-red-200 font-mono font-bold text-center">
              NEBULA CORE
            </div>
          </motion.div>
        </div>
        
        {/* Модули системы, расположенные по кругу */}
        {nebulaModules.map((module, idx) => {
          const angle = (idx / nebulaModules.length) * Math.PI * 2;
          const radius = 42; // % от контейнера
          const x = 50 + Math.cos(angle) * radius;
          const y = 50 + Math.sin(angle) * radius;
          
          return (
            <React.Fragment key={module.id}>
              {/* Линия соединения с ядром */}
              <motion.div 
                className="absolute top-1/2 left-1/2 z-10 overflow-visible"
                style={{ 
                  height: '2px',
                  transformOrigin: 'left center',
                  transform: `rotate(${angle}rad)`,
                }}
                initial={{ width: 0 }}
                animate={{ 
                  width: `${radius}%`,
                  backgroundColor: isSelectedModule(module.id) ? 
                                    `rgb(239, 68, 68, 0.8)` : 
                                    `rgb(239, 68, 68, 0.3)` 
                }}
                transition={{ duration: 0.5 }}
              />
              
              {/* Модуль */}
              <motion.div 
                className="absolute flex flex-col items-center z-20"
                style={{ 
                  top: `${y}%`, 
                  left: `${x}%`, 
                  transform: 'translate(-50%, -50%)',
                  transformOrigin: 'center center',
                  position: 'absolute'
                }}
              >
                <motion.div 
                  className={`${isLargeModule(module.id) ? 'w-24 h-24' : 'w-20 h-20'} rounded-lg ${module.color}/20 border border-${module.color.replace('bg-', '')}/60
                           flex items-center justify-center bg-red-950/80`}
                  animate={{ 
                    boxShadow: isSelectedModule(module.id) ? 
                              ['0 0 5px rgba(239, 68, 68, 0.6)', '0 0 15px rgba(239, 68, 68, 0.8)', '0 0 5px rgba(239, 68, 68, 0.6)'] : 
                              ['0 0 0px rgba(239, 68, 68, 0)'],
                    borderWidth: isSelectedModule(module.id) ? '2px' : '1px',
                    backgroundColor: isSelectedModule(module.id) ? 'rgba(185, 28, 28, 0.3)' : 'rgba(185, 28, 28, 0.1)'  
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  whileHover={{ 
                    boxShadow: '0 0 15px rgba(239, 68, 68, 0.7)',
                    filter: 'brightness(1.2)'
                  }}
                  whileTap={{ 
                    filter: 'brightness(1.4)',
                    boxShadow: '0 0 25px rgba(239, 68, 68, 0.9)'
                  }}
                >
                  <div className="text-xs font-mono text-center text-red-200 p-1">
                    {module.name}
                  </div>
                </motion.div>

                {/* Всплывающая карточка с информацией */}
                {isSelectedModule(module.id) && (
                  <motion.div 
                    className="absolute bg-red-950 border border-red-600/50 rounded-md p-3 w-48 text-xs 
                              text-red-200 font-mono z-50"
                    style={{ 
                      left: isSecurityModule(module.id) 
                        ? '110%'
                        : (y > 50 
                            ? `calc(${x}% - 24px)` 
                            : (x > 50 ? 'auto' : '110%')),
                      right: isSecurityModule(module.id)
                        ? 'auto'
                        : (y > 50 
                            ? 'auto'
                            : (x > 50 ? '110%' : 'auto')),
                      bottom: (isSecurityModule(module.id))
                        ? 'auto'
                        : (y > 50 ? '110%' : 'auto'),
                      top: (isSecurityModule(module.id))
                        ? '0%'
                        : (y > 50 ? 'auto' : '0%'),
                      transform: (isSecurityModule(module.id))
                        ? 'none'
                        : (y > 50 ? 'translateX(-50%)' : 'none')
                    }}
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Декоративные углы */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-red-500/60"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-red-500/60"></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-red-500/60"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-red-500/60"></div>
                    
                    <div className="text-red-300 font-bold mb-1 flex items-center">
                      <motion.div 
                        className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5"
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                      {module.name}
                    </div>
                    
                    <div className="mb-2 text-[10px] leading-tight text-red-200/80">{module.description}</div>
                    
                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-red-400/80">Статус:</span>
                        <span className={`px-1.5 py-0.5 rounded-sm ${module.status === "АКТИВНО" ? "bg-green-900/30 text-green-400" : "bg-yellow-900/30 text-yellow-400"}`}>
                          {module.status}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-red-400/80">Версия:</span>
                        <span>{module.version}</span>
                      </div>
                      
                      <div className="mt-0.5">
                        <div className="flex justify-between items-center text-[10px] mb-1">
                          <span className="text-red-400/80">Эффективность:</span>
                          <span>{module.efficiency}%</span>
                        </div>
                        <div className="h-1 bg-red-900/40 rounded-full overflow-hidden">
                          <motion.div 
                            className={`h-full ${module.color}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${module.efficiency}%` }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                      </div>
                      
                      <div className="mt-1 text-[9px]">
                        <div className="text-red-400/80 mb-0.5">Подмодули:</div>
                        <div className="flex flex-wrap gap-1">
                          {module.subModules.map((subModule, idx) => (
                            <motion.div 
                              key={idx} 
                              className="bg-red-900/30 text-red-300/90 px-1 py-0.5 rounded-sm border border-red-700/30"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.3 + idx * 0.1 }}
                            >
                              {subModule}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Анимированная рамка сбоку */}
                    <motion.div 
                      className="absolute h-full w-1 bg-red-500/40 top-0"
                      style={{ 
                        left: isSecurityModule(module.id)
                          ? 'auto'
                          : (y > 50 ? 0 : (x > 50 ? 'auto' : '-1px')),
                        right: isSecurityModule(module.id)
                          ? '-1px'
                          : (y > 50 ? 0 : (x > 50 ? '-1px' : 'auto')),
                        top: isSecurityModule(module.id)
                          ? 0
                          : (y > 50 ? 'auto' : 0),
                        bottom: isSecurityModule(module.id)
                          ? 'auto'
                          : (y > 50 ? '-1px' : 'auto'),
                        height: isSecurityModule(module.id)
                          ? '100%'
                          : (y > 50 ? '1px' : '100%'),
                        width: isSecurityModule(module.id)
                          ? '1px'
                          : (y > 50 ? '100%' : '1px')
                      }}
                      animate={{ opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    
                    {/* Указатель направления */}
                    <motion.div 
                      className="absolute w-3 h-3 border-t-2 border-l-2 border-red-500/60"
                      style={{ 
                        left: isSecurityModule(module.id)
                          ? 'auto'
                          : (y > 50 
                              ? '50%'
                              : (x > 50 ? '-8px' : 'auto')),
                        right: isSecurityModule(module.id)
                          ? '-8px'
                          : (y <= 50 ? (x > 50 ? 'auto' : '-8px') : 'auto'),
                        top: isSecurityModule(module.id)
                          ? '4px'
                          : (y > 50 ? 'auto' : '4px'),
                        bottom: isSecurityModule(module.id)
                          ? 'auto'
                          : (y > 50 ? '-8px' : 'auto'),
                        transform: isSecurityModule(module.id)
                          ? 'rotate(135deg)'
                          : (y > 50 
                              ? 'translateX(-50%) rotate(-135deg)' 
                              : (x > 50 ? 'rotate(-45deg)' : 'rotate(135deg)'))
                      }}
                    />
                    
                    {/* Сканирующая линия */}
                    <motion.div 
                      className="absolute h-0.5 bg-red-500/30 left-0 right-0"
                      animate={{ 
                        top: ['0%', '100%', '0%'],
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                    
                    {/* ID панели */}
                    <div className="absolute bottom-1 right-2 text-[8px] text-red-500/50">
                      ID:{module.id.toUpperCase()}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </React.Fragment>
          );
        })}
        
        {/* Декоративные элементы */}
        <div className="absolute inset-0">
          {/* Концентрические круги вокруг ядра */}
          {[30, 60, 90].map((size, i) => (
            <motion.div 
              key={`circle-${i}`}
              className="absolute top-1/2 left-1/2 rounded-full border border-red-500/20"
              style={{ 
                width: `${size}%`, 
                height: `${size}%`, 
                transform: 'translate(-50%, -50%)' 
              }}
              animate={{ 
                opacity: [0.1, 0.3, 0.1],
                rotate: [0, 360]
              }}
              transition={{ 
                opacity: { duration: 3 + i, repeat: Infinity },
                rotate: { duration: 120 + i * 30, repeat: Infinity, ease: "linear" }
              }}
            />
          ))}
          
          {/* Сетка на фоне */}
          <div className="absolute inset-0 grid grid-cols-8 gap-px pointer-events-none opacity-30">
            {Array.from({length: 8}).map((_, i) => (
              <div key={`col-${i}`} className="border-r border-red-600/10 h-full"></div>
            ))}
          </div>
          <div className="absolute inset-0 grid grid-rows-8 gap-px pointer-events-none opacity-30">
            {Array.from({length: 8}).map((_, i) => (
              <div key={`row-${i}`} className="border-b border-red-600/10 w-full"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrinciplesSection = () => (
    <div className="h-full flex flex-col">
      <div className="text-sm font-mono text-red-300 mb-4">
        NEBULA функционирует на основе передовых принципов, которые объединяют квантовые вычисления, 
        нейронные сети и самообучение в единую систему искусственного интеллекта.
      </div>
      
      <div className="grid grid-cols-2 gap-4 flex-1">
        {operatingPrinciples.map((principle, idx) => (
          <motion.div 
            key={idx}
            className="border border-red-700/30 bg-red-950/30 rounded-md p-3 flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            whileHover={{ 
              backgroundColor: 'rgba(185, 28, 28, 0.15)', 
              boxShadow: '0 0 15px rgba(239, 68, 68, 0.3)',
              borderColor: 'rgba(239, 68, 68, 0.5)'
            }}
          >
            <div className="flex items-center mb-2">
              <div className="text-2xl mr-2">{principle.icon}</div>
              <div className="text-red-200 font-mono font-bold">{principle.title}</div>
            </div>
            <div className="text-xs text-red-300/80 font-mono flex-1">
              {principle.description}
            </div>
            <motion.div 
              className="w-full h-0.5 bg-gradient-to-r from-red-500/0 via-red-500/50 to-red-500/0 mt-auto"
              animate={{ 
                opacity: [0.3, 0.7, 0.3],
                backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'] 
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ backgroundSize: '200% 100%' }}
            />
          </motion.div>
        ))}
      </div>
      
      {/* Технические характеристики */}
      <div className="mt-4 border border-red-700/30 bg-red-950/30 rounded-md p-3">
        <div className="text-red-200 font-mono font-bold mb-2">Технические характеристики</div>
        <div className="grid grid-cols-3 gap-y-2 gap-x-4">
          {techSpecs.map((spec, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="text-xs text-red-400/70 font-mono">{spec.label}:</div>
              <div className="flex items-baseline">
                <motion.span 
                  className="text-sm text-red-200 font-mono font-bold"
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                >
                  {spec.value}
                </motion.span>
                <span className="text-xs text-red-300/80 font-mono ml-1">{spec.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderHistorySection = () => (
    <div className="h-full flex flex-col">
      <div className="text-sm font-mono text-red-300 mb-4">
        Проект NEBULA прошел долгий путь развития от теоретических исследований 
        до создания самого продвинутого искусственного интеллекта.
      </div>
      
      <div className="flex-1 border border-red-700/30 bg-red-950/30 rounded-md p-4 relative">
        {/* Временная шкала */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-red-700/30 transform -translate-x-1/2 z-10"></div>
        
        <div className="relative z-20">
          {timelineEvents.map((event, idx) => (
            <motion.div 
              key={idx}
              className={`flex mb-10 last:mb-0 ${idx % 2 === 0 ? 'justify-start' : 'justify-end'}`}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
            >
              <div className={`w-5/12 relative ${idx % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                {/* Соединительная линия */}
                <div 
                  className={`absolute top-1/2 ${idx % 2 === 0 ? 'right-0 left-auto' : 'left-0 right-auto'} w-8 h-0.5 bg-red-600/80`}
                  style={{ transform: 'translateY(-50%)' }}
                ></div>
                
                {/* Содержимое */}
                <div className="border border-red-700/40 bg-red-950/50 rounded-md p-3">
                  <div className="text-red-200 font-mono font-bold text-sm mb-1">{event.year}</div>
                  <div className="text-xs text-red-300/90 font-mono">{event.event}</div>
                </div>
              </div>
              
              {/* Точка на временной шкале */}
              <div className="absolute left-1/2 transform -translate-x-1/2" style={{ top: `calc(${idx * 20}% + 20px)` }}>
                <motion.div 
                  className="w-3 h-3 rounded-full bg-red-500 relative z-20"
                  animate={{ boxShadow: ['0 0 0px rgba(239, 68, 68, 0.5)', '0 0 10px rgba(239, 68, 68, 0.8)', '0 0 0px rgba(239, 68, 68, 0.5)'] }}
                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Декоративные элементы */}
        <div className="absolute inset-0 pointer-events-none">
          {randomHex.slice(0, 3).map((hex, idx) => (
            <div 
              key={idx} 
              className="absolute text-[8px] font-mono text-red-500/20"
              style={{ 
                top: `${10 + idx * 30}%`, 
                left: `${idx % 2 === 0 ? 5 : 85}%` 
              }}
            >
              {hex}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full w-full flex flex-col">
      {/* Анимация активации вкладки */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-1 bg-blue-600/80 z-10"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Заголовок секции */}
      <div className="mb-4 border-b border-red-700/30 pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <motion.div 
              animate={{ rotate: [0, 180, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 mr-2"
            >
              <svg viewBox="0 0 24 24" className="text-blue-500 w-full h-full" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 6V4M12 6C10.8954 6 10 6.89543 10 8C10 9.10457 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14M12 6C13.1046 6 14 6.89543 14 8M12 18C10.8954 18 10 17.1046 10 16C10 14.8954 10.8954 14 12 14M12 18C13.1046 18 14 17.1046 14 16M12 18V20M4 6H8M4 18H8M16 6H20M16 18H20" />
              </svg>
            </motion.div>
            <h2 className="text-red-200 font-mono text-lg tracking-wider">NEBULA DATA CENTER</h2>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="text-xs font-mono text-red-400/80 p-1 border border-red-700/30 rounded bg-red-900/20">
              CLASS: CONFIDENTIAL
            </div>
            <motion.div 
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="h-3 w-3 rounded-full bg-blue-500"
            />
          </div>
        </div>
      </div>
      
      {/* Навигационные вкладки */}
      <div className="flex space-x-2 mb-4">
        {[
          { id: "architecture", label: "АРХИТЕКТУРА" },
          { id: "principles", label: "ПРИНЦИПЫ РАБОТЫ" },
          { id: "history", label: "ИСТОРИЯ" }
        ].map(section => (
          <motion.button
            key={section.id}
            className={`px-3 py-1 text-xs uppercase font-mono tracking-wider rounded border border-red-600/40
                      ${activeSection === section.id ? 'bg-red-900/50 text-red-100 border-red-500/60' : 'text-red-300/70 hover:bg-red-900/30'}`}
            whileHover={{ 
              boxShadow: '0 0 10px rgba(239, 68, 68, 0.4)',
              backgroundColor: activeSection === section.id ? 'rgba(153, 27, 27, 0.6)' : 'rgba(153, 27, 27, 0.3)',
              textShadow: '0 0 5px rgba(254, 202, 202, 0.5)'
            }}
            whileTap={{ 
              boxShadow: '0 0 5px rgba(239, 68, 68, 0.6)',
              backgroundColor: 'rgba(153, 27, 27, 0.7)'
            }}
            onClick={() => setActiveSection(section.id)}
          >
            {section.label}
          </motion.button>
        ))}
      </div>
      
      {/* Основной контент в зависимости от выбранной секции */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-red-900/10 scrollbar-thumb-red-700/30">
        {activeSection === "architecture" && renderArchitectureSection()}
        {activeSection === "principles" && renderPrinciplesSection()}
        {activeSection === "history" && renderHistorySection()}
      </div>
      
      {/* Нижняя полоса со статусом */}
      <div className="h-6 mt-4 bg-red-950/80 border border-red-700/30 rounded-sm px-2 flex items-center justify-between">
        <div className="text-[10px] font-mono text-red-300/70 flex items-center">
          <motion.div 
            className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-1.5"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          NEBULA DATA ACCESS: AUTHORIZED
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-[10px] font-mono text-red-300/70">
            SECTION: {activeSection.toUpperCase()}
          </div>
          <div className="text-[10px] font-mono text-red-300/70">
            ID: {generateRandomHex(8)}
          </div>
        </div>
      </div>
      
      {/* Модальное окно с NebulaCore */}
      {showNebulaCore && <NebulaCore onClose={handleCloseNebulaCore} />}
    </div>
  );
};

export default DataTab; 