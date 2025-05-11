import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Category } from '@/data/types';
import NetworkCard from './NetworkCard';

interface NetworksGridProps {
  selectedCategory: Category | null;
}

// Предгенерированные системные ID для оптимизации
const SYS_IDS = Array.from({ length: 10 }, () => 
  Math.random().toString(16).substring(2, 10).toUpperCase()
);

// Предгенерированные значения для технических метрик
const TECH_METRICS = Array.from({ length: 10 }, () => ({
  integrity: Math.floor(Math.random() * 30 + 70), // 70-99%
  bandwidth: Math.floor(Math.random() * 50 + 150), // 150-199 Mbps
  latency: Math.floor(Math.random() * 20 + 5), // 5-24ms
}));

const NetworksGrid: React.FC<NetworksGridProps> = ({ selectedCategory }) => {
  if (!selectedCategory) return null;

  // Создаем анимацию для контейнера сетки
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.05 // уменьшили задержку между элементами
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.03, // уменьшили задержку
        staggerDirection: -1
      }
    }
  };
  
  // Определяем, мобильное ли устройство
  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  }, []);
  
  // Генерация случайного ID для системы - оптимизировано
  const systemId = useMemo(() => {
    return SYS_IDS[selectedCategory.id.length % SYS_IDS.length];
  }, [selectedCategory.id]);
  
  // Технические метрики - оптимизировано
  const techMetrics = useMemo(() => {
    const index = selectedCategory.id.length % TECH_METRICS.length;
    return TECH_METRICS[index];
  }, [selectedCategory.id]);

  return (
    <motion.div
      className="w-full mt-8 relative overflow-hidden rounded-md p-6 backdrop-blur-sm bg-blue-900/10 border border-blue-500/30"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
      layoutId="networksContainer"
    >
      {/* Навигационная панель в стиле голографического интерфейса */}
      <div className="flex justify-between items-center mb-6 pb-1 border-b border-blue-500/30">
        <div className="flex items-center">
          <motion.div
            className="w-2 h-2 rounded-full bg-blue-400 mr-2"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <h2 className="text-blue-100 font-medium text-lg">
            {selectedCategory.name}
          </h2>
          <div className="text-[10px] font-mono text-blue-400/80 ml-3 bg-blue-500/10 px-2 py-0.5 rounded-sm">
            AI.DIR/{selectedCategory.id.toUpperCase()}
          </div>
        </div>
        
        <div className="text-[10px] font-mono text-blue-400/80 flex items-center">
          <span className="mr-2">SYS/{systemId}</span>
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-blue-400"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </div>
      
      {/* Технические метрики системы - не отображаем на мобильных */}
      {!isMobile && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-500/10 p-2 rounded-sm border border-blue-500/20">
            <div className="text-[10px] font-mono text-blue-400/80 mb-1">SYSTEM INTEGRITY</div>
            <div className="flex items-center">
              <div className="w-full h-1 bg-blue-900/50 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-blue-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${techMetrics.integrity}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
              <span className="text-blue-100 text-xs ml-2 min-w-[32px]">{techMetrics.integrity}%</span>
            </div>
          </div>
          
          <div className="bg-blue-500/10 p-2 rounded-sm border border-blue-500/20">
            <div className="text-[10px] font-mono text-blue-400/80 mb-1">BANDWIDTH</div>
            <div className="flex items-center">
              <div className="w-full h-1 bg-blue-900/50 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-blue-400"
                  style={{ width: `${(techMetrics.bandwidth / 200) * 100}%` }}
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <span className="text-blue-100 text-xs ml-2 min-w-[48px]">{techMetrics.bandwidth} Mbps</span>
            </div>
          </div>
          
          <div className="bg-blue-500/10 p-2 rounded-sm border border-blue-500/20">
            <div className="text-[10px] font-mono text-blue-400/80 mb-1">RESPONSE LATENCY</div>
            <div className="flex items-center">
              <div className="w-full h-1 bg-blue-900/50 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-blue-400"
                  style={{ width: `${100 - (techMetrics.latency / 25) * 100}%` }}
                  animate={{ 
                    width: [
                      `${100 - (techMetrics.latency / 25) * 100}%`, 
                      `${100 - ((techMetrics.latency + 5) / 25) * 100}%`,
                      `${100 - (techMetrics.latency / 25) * 100}%`
                    ] 
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
              <span className="text-blue-100 text-xs ml-2 min-w-[32px]">{techMetrics.latency}ms</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Описание категории в стиле технической документации */}
      <div className="mb-6 relative overflow-hidden bg-blue-500/5 p-3 rounded-sm border-l-2 border-blue-500/30">
        <div className="text-[10px] font-mono text-blue-400/80 mb-1">SYSTEM DESCRIPTION</div>
        <p className="text-sm text-blue-200/80">{selectedCategory.description}</p>
        
        {/* Сканирующая линия - только на не-мобильных устройствах */}
        {!isMobile && (
          <motion.div
            className="absolute left-0 right-0 h-px bg-blue-400/30"
            style={{ top: '50%' }}
            animate={{ 
              opacity: [0, 1, 0],
              scaleX: [0, 1],
              x: ['-100%', '100%'],
            }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 8 }} // увеличили задержку
          />
        )}
      </div>
      
      {/* Заголовок секции нейросетей */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-1 h-4 bg-blue-500 mr-2" />
          <h3 className="text-blue-100 font-medium">Доступные нейросети</h3>
        </div>
        <div className="text-[10px] font-mono text-blue-400/80 px-2 py-0.5 rounded-sm border border-blue-500/20">
          COUNT: {selectedCategory.networks.length}
        </div>
      </div>
      
      {/* Сетка нейросетей - адаптивные колонки в зависимости от устройства */}
      <motion.div 
        className={`grid grid-cols-1 sm:grid-cols-2 ${isMobile ? '' : 'md:grid-cols-3 lg:grid-cols-4'} gap-4`}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <AnimatePresence>
          {/* На мобильных показываем меньше карточек сразу */}
          {(isMobile 
            ? selectedCategory.networks.slice(0, 6) 
            : selectedCategory.networks
          ).map((network, index) => (
            <NetworkCard 
              key={network.id} 
              network={network} 
              index={index}
              categoryColor={selectedCategory.color}
            />
          ))}
          
          {/* Визуальный элемент "Скоро" в конце сетки */}
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className={`relative overflow-hidden rounded-md border bg-gradient-to-br ${selectedCategory.color.replace('from-', 'from-').replace('to-', 'to-')}/5 border-${selectedCategory.color.split('-')[1]}/20 p-4 h-full flex flex-col justify-center items-center`}
            >
              <div className="absolute inset-0 backdrop-blur-sm z-0"></div>
              <motion.div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-2 z-10 relative"
                style={{ 
                  background: `linear-gradient(120deg, ${selectedCategory.color.includes('blue') ? '#3b82f6' : selectedCategory.color.includes('purple') ? '#8b5cf6' : selectedCategory.color.includes('green') ? '#10b981' : selectedCategory.color.includes('red') ? '#ef4444' : '#f59e0b'}/10, transparent)`,
                  border: `1px dashed ${selectedCategory.color.includes('blue') ? '#3b82f6' : selectedCategory.color.includes('purple') ? '#8b5cf6' : selectedCategory.color.includes('green') ? '#10b981' : selectedCategory.color.includes('red') ? '#ef4444' : '#f59e0b'}/50`
                }}
                animate={{ 
                  rotate: [0, 360],
                  boxShadow: [
                    `0 0 0px ${selectedCategory.color.includes('blue') ? '#3b82f6' : selectedCategory.color.includes('purple') ? '#8b5cf6' : selectedCategory.color.includes('green') ? '#10b981' : selectedCategory.color.includes('red') ? '#ef4444' : '#f59e0b'}/0`, 
                    `0 0 15px ${selectedCategory.color.includes('blue') ? '#3b82f6' : selectedCategory.color.includes('purple') ? '#8b5cf6' : selectedCategory.color.includes('green') ? '#10b981' : selectedCategory.color.includes('red') ? '#ef4444' : '#f59e0b'}/30`, 
                    `0 0 0px ${selectedCategory.color.includes('blue') ? '#3b82f6' : selectedCategory.color.includes('purple') ? '#8b5cf6' : selectedCategory.color.includes('green') ? '#10b981' : selectedCategory.color.includes('red') ? '#ef4444' : '#f59e0b'}/0`
                  ]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <span className={`text-2xl text-${selectedCategory.color.split('-')[1]}-400/70`}>+</span>
              </motion.div>
              <h3 className={`font-medium text-${selectedCategory.color.split('-')[1]}-100 text-center z-10 relative`}>
                Скоро
              </h3>
              <p className={`text-${selectedCategory.color.split('-')[1]}-200/60 text-sm text-center mt-1 z-10 relative`}>
                Новые нейросети скоро появятся в каталоге
              </p>
              <motion.div 
                className="absolute inset-0 z-0 opacity-10"
                style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, ${selectedCategory.color.includes('blue') ? '#3b82f6' : selectedCategory.color.includes('purple') ? '#8b5cf6' : selectedCategory.color.includes('green') ? '#10b981' : selectedCategory.color.includes('red') ? '#ef4444' : '#f59e0b'}/50, transparent 70%)`
                }}
                animate={{ 
                  scale: [1, 1.2, 1] 
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <div className={`text-[10px] mt-3 font-mono text-${selectedCategory.color.split('-')[1]}-400/50 z-10 relative`}>
                SYSTEM.UPDATE.PENDING
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Кнопка "Показать еще" для мобильных устройств */}
      {isMobile && selectedCategory.networks.length > 6 && (
        <motion.button
          className="mt-4 w-full py-2 text-center bg-blue-500/20 hover:bg-blue-500/30 
                   text-blue-100 text-sm rounded-sm border border-blue-500/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Показать еще {selectedCategory.networks.length - 6} нейросетей
        </motion.button>
      )}
      
      {/* Технические линии и элементы - только на не-мобильных */}
      {!isMobile && (
        <>
          <div className="absolute -bottom-4 -right-4 w-24 h-24 border-t border-l border-blue-500/20 rounded-tl-full" />
          
          <motion.div
            className="absolute bottom-6 right-6 w-3 h-3 rounded-full bg-blue-400/30 flex items-center justify-center"
            animate={{ 
              boxShadow: ['0 0 0px rgba(59, 130, 246, 0)', '0 0 10px rgba(59, 130, 246, 0.5)', '0 0 0px rgba(59, 130, 246, 0)'],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-blue-400"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </>
      )}
      
      {/* Декоративные технические данные - уменьшили количество и отображаем только на не-мобильных */}
      {!isMobile && (
        <div className="absolute bottom-3 left-3 text-[8px] text-blue-400/50 font-mono">
          {Array.from({length: 2}).map((_, i) => (
            <div key={i} className="leading-tight">
              NET.{i+1}://{selectedCategory.id}{i}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default NetworksGrid; 