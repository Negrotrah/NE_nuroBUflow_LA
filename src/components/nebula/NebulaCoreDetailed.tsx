import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

interface NebulaCoreDetailedProps {
  onClose: () => void;
}

const NebulaCoreDetailed: React.FC<NebulaCoreDetailedProps> = ({ onClose }) => {
  // Состояние для анимации
  const [hexCodes, setHexCodes] = useState<string[]>([]);
  const [quantumNodes, setQuantumNodes] = useState<any[]>([]);
  const [synapses, setSynapses] = useState<any[]>([]);
  const [showBetaHint, setShowBetaHint] = useState(false);
  
  // Блокировка прокрутки страницы при открытии модального окна
  useEffect(() => {
    // Запрещаем прокрутку основной страницы
    document.body.style.overflow = 'hidden';
    
    return () => {
      // Возвращаем прокрутку при закрытии модального окна
      document.body.style.overflow = 'auto';
    };
  }, []);
  
  // Генерация случайных HEX кодов для эффекта цифровой обработки
  useEffect(() => {
    const generateHexCodes = () => {
      const codes = [];
      for (let i = 0; i < 12; i++) {
        const code = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
        codes.push(code);
      }
      setHexCodes(codes);
    };
    
    generateHexCodes();
    const interval = setInterval(generateHexCodes, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Генерация квантовых узлов и связей
  useEffect(() => {
    // Создаем узлы квантовой сети
    const nodes = [];
    for (let i = 0; i < 80; i++) {
      nodes.push({
        id: i,
        x: 20 + Math.random() * 60,
        y: 20 + Math.random() * 60,
        size: 0.2 + Math.random() * 0.5,
        speed: 0.01 + Math.random() * 0.05,
        angle: Math.random() * Math.PI * 2,
        color: `rgba(${180 + Math.random() * 75}, ${20 + Math.random() * 40}, ${20 + Math.random() * 40}, ${0.4 + Math.random() * 0.6})`
      });
    }
    setQuantumNodes(nodes);
    
    // Создаем синаптические связи
    const links = [];
    const numLinks = 120;
    for (let i = 0; i < numLinks; i++) {
      const source = Math.floor(Math.random() * nodes.length);
      let target = Math.floor(Math.random() * nodes.length);
      // Чтобы узел не соединялся сам с собой
      while (target === source) {
        target = Math.floor(Math.random() * nodes.length);
      }
      
      links.push({
        id: i,
        source,
        target,
        strength: 0.2 + Math.random() * 0.8
      });
    }
    setSynapses(links);
  }, []);
  
  // Обновление позиций квантовых узлов
  useEffect(() => {
    const updateNodes = () => {
      setQuantumNodes(prev => 
        prev.map(node => {
          // Двигаем узлы по круговой орбите вокруг центра
          let newX = node.x + Math.cos(node.angle) * node.speed;
          let newY = node.y + Math.sin(node.angle) * node.speed;
          
          // Отражение от границ с небольшим отступом
          if (newX < 15 || newX > 85) {
            newX = Math.max(15, Math.min(newX, 85));
            node.angle = Math.PI - node.angle;
          }
          if (newY < 15 || newY > 85) {
            newY = Math.max(15, Math.min(newY, 85));
            node.angle = -node.angle;
          }
          
          // Небольшое случайное изменение угла для более естественного движения
          node.angle += (Math.random() - 0.5) * 0.1;
          
          return { ...node, x: newX, y: newY };
        })
      );
    };
    
    const interval = setInterval(updateNodes, 200);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="fixed inset-0 w-full h-full bg-black z-[9999] flex items-center justify-center" style={{ minHeight: '100vh' }}>
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black border border-red-900/30">
        {/* Кнопка закрытия */}
        <button 
          className="absolute top-4 right-4 text-red-500 hover:text-red-300 z-50"
          onClick={onClose}
          aria-label="Close quantum core view"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* Заголовок */}
        <div className="absolute top-4 left-4 text-red-400 font-mono text-xl">
          NEBULA :: SYSTEM_ARCHITECTURE :: QUANTUM_CORE
        </div>
        
        {/* Контейнер для визуализации */}
        <div className="absolute inset-0 w-full h-full">
          {/* SVG визуализация квантового ядра */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            {/* Фильтр для свечения */}
            <defs>
              <filter id="quantumGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="1" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              
              <radialGradient id="coreGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#ff4a2f" stopOpacity="0.9" />
                <stop offset="30%" stopColor="#ff2a1f" stopOpacity="0.8" />
                <stop offset="60%" stopColor="#c41a1f" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#640a0f" stopOpacity="0" />
              </radialGradient>
              
              <radialGradient id="ringGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="80%" stopColor="#ff2a1f" stopOpacity="0" />
                <stop offset="90%" stopColor="#ff2a1f" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#ff2a1f" stopOpacity="0" />
              </radialGradient>

              {/* Новые градиенты для усовершенствованного ядра */}
              <radialGradient id="enhancedCoreGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#ff5a3f" stopOpacity="1" />
                <stop offset="20%" stopColor="#ff3a2f" stopOpacity="0.9" />
                <stop offset="40%" stopColor="#e52a1f" stopOpacity="0.8" />
                <stop offset="70%" stopColor="#c41a1f" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#9c0a0f" stopOpacity="0.1" />
              </radialGradient>

              <radialGradient id="pulseGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#ff3a1f" stopOpacity="0.8" />
                <stop offset="70%" stopColor="#ff2a1f" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#ff0000" stopOpacity="0" />
              </radialGradient>

              <linearGradient id="energyLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ff5a3f" stopOpacity="0" />
                <stop offset="50%" stopColor="#ffaa50" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#ff5a3f" stopOpacity="0" />
              </linearGradient>
            </defs>
            
            {/* Фоновое кольцо внешней границы квантовой зоны */}
            <circle cx="50" cy="50" r="36" fill="none" stroke="url(#ringGradient)" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="url(#ringGradient)" strokeWidth="0.3" />
            <circle cx="50" cy="50" r="25" fill="none" stroke="url(#ringGradient)" strokeWidth="0.2" />
            
            {/* Синаптические связи между квантовыми узлами - без подсветки */}
            {synapses.map(link => {
              const source = quantumNodes[link.source];
              const target = quantumNodes[link.target];
              if (!source || !target) return null;
              
              return (
                <motion.line
                  key={`synapse-${link.id}`}
                  x1={source.x}
                  y1={source.y}
                  x2={target.x}
                  y2={target.y}
                  stroke={`rgba(255, 30, 30, ${link.strength * 0.3})`}
                  strokeWidth={link.strength * 0.15}
                  strokeOpacity="0.5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 2 + Math.random() * 2 }}
                />
              );
            })}
            
            {/* Квантовые узлы - без эффекта свечения */}
            {quantumNodes.map(node => (
              <motion.circle
                key={`node-${node.id}`}
                cx={node.x}
                cy={node.y}
                r={node.size}
                fill={`rgba(120, 20, 20, ${0.3 + Math.random() * 0.3})`}
                strokeWidth="0"
                initial={{ opacity: 0.5, scale: 0.9 }}
                animate={{ opacity: 0.7, scale: 1 }}
                transition={{ 
                  duration: 8 + Math.random() * 7,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  repeatDelay: 5 + Math.random() * 10
                }}
              />
            ))}
            
            {/* Энергетические импульсы от центра к квантовым узлам - уменьшена частота */}
            {quantumNodes.slice(0, 3).map((node, idx) => (
              <motion.circle
                key={`pulse-${idx}`}
                cx="50"
                cy="50"
                r="0"
                fill="none"
                stroke="#ff0000"
                strokeWidth="0.1"
                animate={{
                  r: [0, 35],
                  strokeOpacity: [0.7, 0],
                  strokeWidth: [0.4, 0.1]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  delay: idx * 10,
                  repeatDelay: 10
                }}
              />
            ))}
            
            {/* Улучшенное центральное ядро - в стиле из основного представления, но с большей детализацией */}
            <g>
              {/* Внешние защитные элементы */}
              <circle cx="50" cy="50" r="15" fill="none" stroke="rgba(255,50,50,0.15)" strokeWidth="0.15" style={{ filter: 'url(#quantumGlow)' }} />
              <circle cx="50" cy="50" r="14" fill="none" stroke="rgba(255,50,50,0.2)" strokeWidth="0.2" style={{ filter: 'url(#quantumGlow)' }} />
              
              {/* Основное ядро с улучшенным градиентом */}
              <motion.circle 
                cx="50" 
                cy="50" 
                r="12" 
                fill="url(#enhancedCoreGradient)" 
                style={{ filter: 'url(#quantumGlow)', cursor: 'pointer' }}
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                onClick={() => setShowBetaHint(v => !v)}
              />
              
              {/* Медленно вращающееся внешнее энергетическое кольцо (по часовой стрелке) */}
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "center" }}
              >
                <circle cx="50" cy="50" r="10" fill="none" stroke="#ff3a1f" strokeWidth="0.3" strokeDasharray="0.8 2.5" />
                
                {/* Энергетические точки на внешнем кольце */}
                {Array.from({ length: 8 }).map((_, idx) => {
                  const angle = (idx * 45) * Math.PI / 180;
                  const x = 50 + Math.cos(angle) * 10;
                  const y = 50 + Math.sin(angle) * 10;
                  return (
                    <motion.circle 
                      key={`outer-energy-${idx}`}
                      cx={x} 
                      cy={y} 
                      r="0.6" 
                      fill="#cc3333" 
                      animate={{ opacity: [0.6, 0.9, 0.6] }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        delay: idx * 0.4 
                      }}
                    />
                  );
                })}
              </motion.g>
              
              {/* Более быстро вращающееся внутреннее энергетическое кольцо (против часовой стрелки) */}
              <motion.g
                animate={{ rotate: -360 }}
                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "center" }}
              >
                <circle cx="50" cy="50" r="8" fill="none" stroke="#ff5a1f" strokeWidth="0.25" strokeDasharray="0.6 1.8" />
                
                {/* Энергетические точки на внутреннем кольце */}
                {Array.from({ length: 6 }).map((_, idx) => {
                  const angle = (idx * 60) * Math.PI / 180;
                  const x = 50 + Math.cos(angle) * 8;
                  const y = 50 + Math.sin(angle) * 8;
                  return (
                    <motion.circle 
                      key={`inner-energy-${idx}`}
                      cx={x} 
                      cy={y} 
                      r="0.5" 
                      fill="#bb3333" 
                      animate={{ opacity: [0.6, 0.9, 0.6] }}
                      transition={{ 
                        duration: 2.5, 
                        repeat: Infinity, 
                        delay: idx * 0.3 
                      }}
                    />
                  );
                })}
              </motion.g>
              
              {/* Центральное пульсирующее ядро */}
              <motion.circle 
                cx="50" 
                cy="50" 
                r="6" 
                fill="url(#pulseGradient)"
                style={{ filter: 'url(#quantumGlow)' }}
                animate={{ 
                  scale: [1, 1.08, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
              
              {/* Внутренняя энергетическая решетка */}
              <motion.g
                animate={{ rotate: 180 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "center" }}
              >
                {Array.from({ length: 4 }).map((_, idx) => {
                  const angle = (idx * 45) * Math.PI / 180;
                  const x1 = 50 + Math.cos(angle) * 5;
                  const y1 = 50 + Math.sin(angle) * 5;
                  const x2 = 50 + Math.cos(angle + Math.PI) * 5;
                  const y2 = 50 + Math.sin(angle + Math.PI) * 5;
                  return (
                    <motion.line 
                      key={`energy-line-${idx}`}
                      x1={x1} 
                      y1={y1} 
                      x2={x2} 
                      y2={y2} 
                      stroke="url(#energyLineGradient)" 
                      strokeWidth="0.4"
                      animate={{ opacity: [0.6, 0.9, 0.6] }}
                      transition={{ 
                        duration: 8, 
                        repeat: Infinity, 
                        delay: idx * 1.5 
                      }}
                    />
                  );
                })}
              </motion.g>
              
              {/* Центральная квантовая точка - основа ядра */}
              <motion.circle 
                cx="50" 
                cy="50" 
                r="2" 
                fill="#ffffff"
                style={{ filter: 'url(#quantumGlow)' }}
                animate={{ 
                  opacity: [0.8, 1, 0.8],
                  scale: [0.9, 1.1, 0.9]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity 
                }}
              />
              
              {/* Квантовые частицы, вращающиеся вокруг центра */}
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "center" }}
              >
                {Array.from({ length: 4 }).map((_, idx) => {
                  const angle = (idx * 90) * Math.PI / 180;
                  const x = 50 + Math.cos(angle) * 4;
                  const y = 50 + Math.sin(angle) * 4;
                  return (
                    <motion.circle 
                      key={`quantum-particle-${idx}`}
                      cx={x} 
                      cy={y} 
                      r="0.6" 
                      fill="#dd3333" 
                      animate={{ 
                        opacity: [0.7, 0.9, 0.7],
                        scale: [0.8, 1.2, 0.8]
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity, 
                        delay: idx * 0.5 
                      }}
                    />
                  );
                })}
              </motion.g>
            </g>
          </svg>
          
          {/* HEX-коды и информация */}
          <div className="absolute bottom-6 left-6 text-xs text-red-500/70 font-mono">
            <div className="text-red-400 mb-2">QUANTUM_PROCESS_ACTIVITY:</div>
            <div className="grid grid-cols-3 gap-2">
              {hexCodes.map((code, idx) => (
                <div key={idx} className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 mr-2" 
                       style={{
                         animation: `pulse 10s ease-in-out ${idx}s infinite`,
                       }}></div>
                  <span>0x{code.toUpperCase()}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Справа - техническая информация */}
          <div className="absolute top-16 right-6 text-xs text-red-500/70 font-mono max-w-xs overflow-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
            <div className="text-red-400 mb-2">CORE_PARAMETERS:</div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>QUANTUM_NODES:</span>
                <span className="text-red-300">{quantumNodes.length}</span>
              </div>
              <div className="flex justify-between">
                <span>SYNAPTIC_CONNECTIONS:</span>
                <span className="text-red-300">{synapses.length}</span>
              </div>
              <div className="flex justify-between">
                <span>QUANTUM_COHERENCE:</span>
                <span className="text-red-300">98.7%</span>
              </div>
              <div className="flex justify-between">
                <span>SYSTEM_ENTROPY:</span>
                <span className="text-red-300">0.31</span>
              </div>
              <div className="flex justify-between">
                <span>CORE_POWER:</span>
                <span className="text-red-300">9.42 × 10^18 QFLOPS</span>
              </div>
              <div className="flex justify-between">
                <span>TEMPERATURE:</span>
                <span className="text-red-300">0.002 K</span>
              </div>
              <div className="flex justify-between">
                <span>QUANTUM_STATES:</span>
                <span className="text-red-300">10^24</span>
              </div>
              <div className="flex justify-between">
                <span>STABILITY:</span>
                <span className="text-red-300">99.9999%</span>
              </div>
            </div>
            
            <div className="mt-6 text-red-400 mb-2">ACTIVE_PROCESSES:</div>
            <div className="space-y-1">
              <div>► QUANTUM_DECOHERENCE</div>
              <div>► NEURAL_SIMULATION</div>
              <div>► PARALLEL_PROCESSING</div>
              <div>► ENERGY_STABILIZATION</div>
              <div>► QUANTUM_DATA_TELEPORTATION</div>
              <div>► ARCHITECTURE_SELF_MODIFICATION</div>
            </div>
          </div>
          
          {/* Кнопка возврата (в нижней части экрана) */}
          <div className="fixed bottom-6 right-6 z-[10000]">
            <motion.button
              onClick={onClose}
              className="bg-red-900/30 text-red-300 px-4 py-2 rounded-md border border-red-600/40 font-mono text-sm"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(185, 28, 28, 0.4)' }}
              whileTap={{ scale: 0.98 }}
            >
              RETURN_TO_ARCHITECTURE
            </motion.button>
          </div>
          
          {/* Подсказка поверх ядра */}
          {showBetaHint && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 0 }}
              animate={{ opacity: 1, scale: 1, y: -60 }}
              exit={{ opacity: 0, scale: 0.8, y: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute left-1/2 top-1/2 z-[10001] flex flex-col items-center"
              style={{ transform: 'translate(-50%, -50%)' }}
            >
              <div className="relative">
                <div className="px-6 py-3 rounded-lg bg-gradient-to-b from-red-900/90 via-red-950/95 to-black border-2 border-red-700/60 shadow-lg font-mono text-lg text-red-200 tracking-widest flex items-center animate-pulse">
                  <span className="mr-2">Beta Access Fragment:</span>
                  <span className="text-red-400 font-bold">-BETA-CORE42</span>
                </div>
                <button
                  className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center rounded-full bg-red-900/80 border border-red-700/60 text-red-400 hover:text-red-200 hover:bg-red-800/90 transition-all duration-200"
                  onClick={() => setShowBetaHint(false)}
                  aria-label="Close beta hint"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NebulaCoreDetailed; 