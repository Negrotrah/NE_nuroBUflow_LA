import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface NetworkTabProps {
  isActive: boolean;
}

// Глобальные узлы сети NEBULA
const networkNodes = [
  { id: 'node1', name: 'TOKYO-N1', status: 'active', lat: 35.6895, lon: 139.6917, dataRate: 3.4, ping: 0.42 },
  { id: 'node2', name: 'NYC-QUANTUM', status: 'active', lat: 40.7128, lon: -74.0060, dataRate: 4.1, ping: 0.38 },
  { id: 'node3', name: 'BERLIN-NEXUS', status: 'partial', lat: 52.5200, lon: 13.4050, dataRate: 2.8, ping: 0.55 },
  { id: 'node4', name: 'SYDNEY-RELAY', status: 'active', lat: -33.8688, lon: 151.2093, dataRate: 3.7, ping: 0.47 },
  { id: 'node5', name: 'CAIRO-SEC', status: 'inactive', lat: 30.0444, lon: 31.2357, dataRate: 0, ping: 0 },
  { id: 'node6', name: 'MOSCOW-GATE', status: 'active', lat: 55.7558, lon: 37.6173, dataRate: 3.9, ping: 0.43 },
  { id: 'node7', name: 'LIMA-SENTINEL', status: 'partial', lat: -12.0464, lon: -77.0428, dataRate: 1.7, ping: 0.89 },
  { id: 'node8', name: 'NEBULA-CORE', status: 'active', lat: 0, lon: 0, dataRate: 12.8, ping: 0.0003 },
  // Дополнительные узлы в стиле киберпанк
  { id: 'node9', name: 'SEOUL-CYBER', status: 'active', lat: 37.5665, lon: 126.9780, dataRate: 4.2, ping: 0.36 },
  { id: 'node10', name: 'RIO-DARKNET', status: 'active', lat: -22.9068, lon: -43.1729, dataRate: 3.1, ping: 0.61 },
  { id: 'node11', name: 'DUBAI-NEXUS', status: 'active', lat: 25.2048, lon: 55.2708, dataRate: 3.8, ping: 0.45 },
  { id: 'node12', name: 'LONDON-PROXY', status: 'active', lat: 51.5074, lon: -0.1278, dataRate: 4.0, ping: 0.40 },
  { id: 'node13', name: 'MONTREAL-ICE', status: 'partial', lat: 45.5017, lon: -73.5673, dataRate: 2.9, ping: 0.59 },
  { id: 'node14', name: 'MUMBAI-GHOST', status: 'partial', lat: 19.0760, lon: 72.8777, dataRate: 2.5, ping: 0.72 },
  { id: 'node15', name: 'LA-BLACKOUT', status: 'active', lat: 34.0522, lon: -118.2437, dataRate: 3.9, ping: 0.41 },
  { id: 'node16', name: 'MEXICO-SHADOW', status: 'partial', lat: 19.4326, lon: -99.1332, dataRate: 2.6, ping: 0.68 },
  { id: 'node17', name: 'SHANGHAI-TITAN', status: 'active', lat: 31.2304, lon: 121.4737, dataRate: 4.3, ping: 0.35 },
  { id: 'node18', name: 'STOCKHOLM-FROST', status: 'active', lat: 59.3293, lon: 18.0686, dataRate: 3.5, ping: 0.49 },
  { id: 'node19', name: 'CAPETOWN-VOID', status: 'partial', lat: -33.9249, lon: 18.4241, dataRate: 2.2, ping: 0.83 },
  { id: 'node20', name: 'SINGAPORE-BLADE', status: 'active', lat: 1.3521, lon: 103.8198, dataRate: 4.4, ping: 0.33 },
];

// Связи между узлами сети
const networkConnections = [
  // Основные квантовые каналы к ядру
  { from: 'node1', to: 'node8', strength: 0.9, type: 'quantum' },
  { from: 'node2', to: 'node8', strength: 0.95, type: 'quantum' },
  { from: 'node3', to: 'node8', strength: 0.7, type: 'quantum' },
  { from: 'node4', to: 'node8', strength: 0.85, type: 'quantum' },
  { from: 'node6', to: 'node8', strength: 0.9, type: 'quantum' },
  { from: 'node7', to: 'node8', strength: 0.6, type: 'quantum' },
  { from: 'node9', to: 'node8', strength: 0.92, type: 'quantum' },
  { from: 'node12', to: 'node8', strength: 0.88, type: 'quantum' },
  { from: 'node15', to: 'node8', strength: 0.87, type: 'quantum' },
  { from: 'node17', to: 'node8', strength: 0.93, type: 'quantum' },
  { from: 'node20', to: 'node8', strength: 0.94, type: 'quantum' },
  
  // Стандартные соединения между узлами
  { from: 'node1', to: 'node2', strength: 0.5, type: 'standard' },
  { from: 'node2', to: 'node3', strength: 0.6, type: 'standard' },
  { from: 'node3', to: 'node6', strength: 0.7, type: 'standard' },
  { from: 'node4', to: 'node7', strength: 0.4, type: 'standard' },
  { from: 'node6', to: 'node1', strength: 0.5, type: 'standard' },
  { from: 'node9', to: 'node1', strength: 0.65, type: 'standard' },
  { from: 'node9', to: 'node17', strength: 0.7, type: 'standard' },
  { from: 'node10', to: 'node7', strength: 0.55, type: 'standard' },
  { from: 'node11', to: 'node6', strength: 0.6, type: 'standard' },
  { from: 'node12', to: 'node3', strength: 0.75, type: 'standard' },
  { from: 'node12', to: 'node18', strength: 0.7, type: 'standard' },
  { from: 'node13', to: 'node2', strength: 0.65, type: 'standard' },
  { from: 'node13', to: 'node15', strength: 0.6, type: 'standard' },
  { from: 'node14', to: 'node11', strength: 0.5, type: 'standard' },
  { from: 'node15', to: 'node16', strength: 0.65, type: 'standard' },
  { from: 'node16', to: 'node10', strength: 0.6, type: 'standard' },
  { from: 'node17', to: 'node20', strength: 0.7, type: 'standard' },
  { from: 'node18', to: 'node3', strength: 0.65, type: 'standard' },
  { from: 'node19', to: 'node4', strength: 0.5, type: 'standard' },
  { from: 'node20', to: 'node14', strength: 0.65, type: 'standard' },
  
  // Секретные каналы (стилизованные как киберпанк-подключения)
  { from: 'node10', to: 'node8', strength: 0.4, type: 'backdoor' },
  { from: 'node13', to: 'node8', strength: 0.45, type: 'backdoor' },
  { from: 'node16', to: 'node8', strength: 0.3, type: 'backdoor' },
  { from: 'node19', to: 'node8', strength: 0.35, type: 'backdoor' },
];

// Статистика сетевых атак
const securityEvents = [
  { time: '08:42:15', type: 'BRUTEFORCE', source: '192.168.17.43', severity: 'medium', status: 'blocked' },
  { time: '10:17:32', type: 'QUANTUM_BREACH', source: 'UNKNOWN', severity: 'critical', status: 'mitigated' },
  { time: '12:05:01', type: 'DDOS', source: '45.89.130.22', severity: 'high', status: 'active' },
  { time: '13:37:44', type: 'BACKDOOR', source: '10.50.122.5', severity: 'critical', status: 'mitigated' },
  { time: '16:22:08', type: 'QUANTUM_NOISE', source: 'ANOMALY-QX7', severity: 'medium', status: 'monitoring' },
];

// Протоколы связи
const communicationProtocols = [
  { id: 'qte', name: 'Quantum Teleportation', status: 'active', reliability: 99.999, speed: 'instant' },
  { id: 'qes', name: 'Quantum Encryption', status: 'active', reliability: 100, speed: 'N/A' },
  { id: 'qtc', name: 'Quantum Tunneling', status: 'active', reliability: 87.4, speed: 'sub-planck' },
  { id: 'ncs', name: 'Neural Comms', status: 'active', reliability: 95.8, speed: 'variable' },
  { id: 'ptn', name: 'Photonic Network', status: 'active', reliability: 99.7, speed: 'c' },
  { id: 'tbs', name: 'Tachyonic Burst', status: 'experimental', reliability: 43.2, speed: 'superluminal' },
];

// Генерация случайных hex-строк для декоративных элементов
const generateRandomHex = (length: number) => {
  return Array.from({ length }, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('').toUpperCase();
};

const NetworkTab: React.FC<NetworkTabProps> = ({ isActive }) => {
  const [activeSection, setActiveSection] = useState<string>("map");
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [randomHex, setRandomHex] = useState<string[]>([]);
  const [trafficData, setTrafficData] = useState<number[]>([]);
  const [securityScanProgress, setSecurityScanProgress] = useState<number>(0);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [isTeleporting, setIsTeleporting] = useState(false);
  const [showGammaHint, setShowGammaHint] = useState(false);
  const [teleportPath, setTeleportPath] = useState({ dx: 0, dy: 0 });
  const [analysisStep, setAnalysisStep] = useState(0);
  const sourceRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  // Генерация массива для анимации телепортации
  const teleportParticles = Array.from({ length: 12 });
  
  // Координаты SOURCE и TARGET (относительно контейнера h-56 relative)
  const sourcePos = { left: 40, top: 40 };
  const targetPos = { left: 320, top: 160 };

  // Генерация массива "частиц" для анимации
  const particles = Array.from({ length: 12 });
  
  // Эффекты для обновления случайных данных
  useEffect(() => {
    if (!isActive) return;
    
    // Генерация случайных hex-строк
    const hexInterval = setInterval(() => {
      setRandomHex(Array.from({ length: 8 }, () => generateRandomHex(16)));
    }, 1000);
    
    // Генерация данных о трафике
    const trafficInterval = setInterval(() => {
      setTrafficData(prev => {
        const newData = [...prev, Math.random() * 10 + 2];
        if (newData.length > 20) newData.shift();
        return newData;
      });
    }, 1000);
    
    // Запуск сканирования безопасности
    setIsScanning(true);
    const scanInterval = setInterval(() => {
      setSecurityScanProgress(prev => {
        if (prev >= 100) {
          setIsScanning(false);
          clearInterval(scanInterval);
          return 100;
        }
        return prev + Math.random() * 5;
      });
    }, 500);
    
    return () => {
      clearInterval(hexInterval);
      clearInterval(trafficInterval);
      clearInterval(scanInterval);
    };
  }, [isActive]);
  
  // Получение данных выбранного узла
  const getSelectedNodeData = () => {
    if (!selectedNode) return null;
    return networkNodes.find(node => node.id === selectedNode);
  };
  
  // Получение соединений для узла
  const getNodeConnections = (nodeId: string) => {
    return networkConnections.filter(conn => 
      conn.from === nodeId || conn.to === nodeId
    );
  };
  
  const handleTeleport = () => {
    if (!isTeleporting && !showGammaHint && sourceRef.current && targetRef.current) {
      const sourceRect = sourceRef.current.getBoundingClientRect();
      const targetRect = targetRef.current.getBoundingClientRect();
      const dx = (targetRect.left + targetRect.width / 2) - (sourceRect.left + sourceRect.width / 2);
      const dy = (targetRect.top + targetRect.height / 2) - (sourceRect.top + sourceRect.height / 2);
      setTeleportPath({ dx, dy });
      setIsTeleporting(true);
      setAnalysisStep(0);
      let step = 0;
      const interval = setInterval(() => {
        step++;
        setAnalysisStep(step);
        if (step >= analysisModules.length - 1) {
          clearInterval(interval);
        }
      }, 2000); // 2 секунды на каждый модуль
      setTimeout(() => {
        setIsTeleporting(false);
        setShowGammaHint(true);
      }, 2000 * analysisModules.length + 400);
    }
  };
  
  if (!isActive) return null;

  // Отрисовка секции с картой сети
  const renderNetworkMapSection = () => (
    <div className="h-full flex flex-col">
      <div className="text-sm font-mono text-red-300 mb-4">
        Глобальная квантовая сеть NEBULA соединяет ключевые узлы по всему миру. 
        Мгновенная квантовая телепортация данных происходит независимо от физического расстояния.
      </div>
      
      {/* Визуализация карты сети */}
      <div className="flex-1 border border-red-700/30 bg-gradient-to-br from-red-950/60 via-black to-red-950/40 rounded-md p-4 relative overflow-hidden">
        {/* Анимированный фон в стиле киберпанк */}
        <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none bg-black">
          {/* Сетка координат */}
          <div className="absolute inset-0 grid grid-cols-24 grid-rows-12">
            {Array.from({ length: 24 * 12 }).map((_, idx) => (
              <div key={`grid-${idx}`} className="border border-red-500/10" />
            ))}
          </div>
          
          {/* Киберпанк фоновые элементы */}
          <div className="absolute inset-0">
            {/* Горизонтальные линии */}
            {Array.from({ length: 10 }).map((_, idx) => (
              <motion.div 
                key={`h-line-${idx}`}
                className="absolute h-[1px] left-0 right-0 bg-gradient-to-r from-red-500/0 via-red-500/20 to-red-500/0"
                style={{ top: `${10 + idx * 8}%` }}
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                  width: ['0%', '100%', '0%'],
                  left: ['0%', '0%', '100%'],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  repeatType: 'loop',
                  delay: idx * 1.5,
                  ease: "easeInOut"
                }}
              />
            ))}
            
            {/* Вертикальные линии */}
            {Array.from({ length: 10 }).map((_, idx) => (
              <motion.div 
                key={`v-line-${idx}`}
                className="absolute w-[1px] top-0 bottom-0 bg-gradient-to-b from-red-500/0 via-red-500/20 to-red-500/0"
                style={{ left: `${15 + idx * 8}%` }}
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                  height: ['0%', '100%', '0%'],
                  top: ['0%', '0%', '100%'],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  repeatType: 'loop',
                  delay: idx * 1.5 + 0.5,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
          
          {/* Цифровой дождь в стиле матрицы */}
          <div className="absolute inset-0">
            {Array.from({ length: 20 }).map((_, idx) => (
              <motion.div 
                key={`digits-${idx}`}
                className="absolute text-[8px] text-red-500/30 font-mono leading-none"
                style={{
                  left: `${5 + idx * 5}%`,
                }}
                initial={{ top: "-5%" }}
                animate={{ top: "105%" }}
                transition={{
                  duration: 8 + Math.random() * 15,
                  repeat: Infinity,
                  delay: idx * 0.3
                }}
              >
                {Array.from({ length: 20 }).map((_, digitIdx) => (
                  <div key={`digit-char-${digitIdx}`}>
                    {Math.round(Math.random())}
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Карта с континентами (упрощенная схема) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 1000 500" className="opacity-20">
            <motion.g 
              stroke="#ef4444" 
              strokeWidth="1"
              fill="none"
              animate={{ 
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              {/* Северная Америка */}
              <path d="M150,120 C210,110 250,120 280,150 S320,200 310,230 S280,270 250,280 S190,270 170,250 S140,200 130,160 S140,120 150,120 Z" />
              
              {/* Южная Америка */}
              <path d="M220,290 C240,280 260,280 270,300 S290,350 280,380 S260,410 230,420 S190,410 180,390 S170,350 180,320 S200,290 220,290 Z" />
              
              {/* Европа */}
              <path d="M400,130 C430,120 460,120 480,140 S500,170 490,190 S450,210 420,200 S380,180 380,160 S390,130 400,130 Z" />
              
              {/* Африка */}
              <path d="M410,220 C440,210 470,220 490,240 S510,290 500,330 S470,360 430,370 S390,350 370,320 S360,270 370,240 S390,220 410,220 Z" />
              
              {/* Азия */}
              <path d="M500,140 C550,120 600,110 650,120 S720,150 750,190 S770,240 760,270 S730,310 690,330 S590,340 540,320 S480,280 470,230 S460,170 500,140 Z" />
              
              {/* Австралия */}
              <path d="M700,300 C730,290 760,300 780,320 S790,350 780,380 S750,400 710,400 S670,380 660,350 S670,310 700,300 Z" />
            </motion.g>
          </svg>
        </div>
        
        {/* Пульсирующие круги - представляющие активность сети */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 3 }).map((_, idx) => (
            <motion.div
              key={`pulse-circle-${idx}`}
              className="absolute rounded-full border border-red-500/20"
              style={{ 
                top: '50%', 
                left: '50%', 
                width: '10%', 
                height: '10%',
                translateX: '-50%',
                translateY: '-50%',
              }}
              animate={{
                width: ['10%', '150%'],
                height: ['10%', '150%'],
                opacity: [0.4, 0],
                borderWidth: ['3px', '1px']
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: idx * 2.5,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
        
        {/* Центральный узел NEBULA CORE */}
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30"
          onClick={() => setSelectedNode('node8')}
        >
          <div className="relative">
            {/* Внешние декоративные кольца */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-28 h-28 rounded-full border-2 border-red-500/40 -translate-x-1/2 -translate-y-1/2"
              animate={{ 
                rotate: 360,
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
            />
            
            <motion.div
              className="absolute top-1/2 left-1/2 w-24 h-24 rounded-full border border-red-400/60 -translate-x-1/2 -translate-y-1/2"
              animate={{ 
                rotate: -360
              }}
              transition={{ 
                duration: 25, repeat: Infinity, ease: "linear"
              }}
            />
            
            {/* Внутренние декоративные элементы */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-14 h-14 -translate-x-1/2 -translate-y-1/2"
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
              <svg width="100%" height="100%" viewBox="0 0 100 100">
                <line x1="0" y1="50" x2="100" y2="50" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 2" />
                <line x1="50" y1="0" x2="50" y2="100" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 2" />
              </svg>
            </motion.div>
            
            {/* Основной круг */}
            <motion.div
              className="w-20 h-20 rounded-full bg-gradient-to-br from-red-900/90 to-red-800/70 border-2 border-red-500/80 flex items-center justify-center cursor-pointer relative overflow-hidden"
              animate={{ 
                boxShadow: ['0 0 15px rgba(239, 68, 68, 0.4)', '0 0 25px rgba(239, 68, 68, 0.7)', '0 0 15px rgba(239, 68, 68, 0.4)'] 
              }}
              transition={{ duration: 3, repeat: Infinity }}
              whileHover={{ scale: 1.05 }}
            >
              {/* Бегущие линии внутри круга */}
              <motion.div 
                className="absolute h-px w-full bg-red-400/40 left-0"
                style={{ top: '30%' }}
                animate={{ 
                  top: ['0%', '100%']
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  repeatType: 'loop',
                  ease: "linear" 
                }}
              />
              
              <motion.div 
                className="absolute h-px w-full bg-red-400/40 left-0"
                style={{ top: '70%' }}
                animate={{ 
                  top: ['0%', '100%']
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  repeatType: 'loop',
                  ease: "linear",
                  delay: 0.5
                }}
              />
              
              <div className="text-xs font-mono font-bold text-red-200 text-center leading-tight z-10">
                NEBULA<br/>CORE
              </div>
              
              {/* Пульсирующая точка */}
              <motion.div 
                className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-red-500"
                animate={{ 
                  opacity: [0.5, 1, 0.5],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </div>
        </div>
        
        {/* Узлы сети по координатам */}
        {networkNodes.filter(node => node.id !== 'node8').map(node => {
          // Преобразуем географические координаты в позицию на экране
          const xPos = ((node.lon + 180) / 360) * 100; // от 0 до 100%
          const yPos = ((90 - node.lat) / 180) * 100; // от 0 до 100%
          
          // Определяем цвет в зависимости от статуса
          const nodeColor = node.status === 'active' ? 'green' : 
                           node.status === 'partial' ? 'yellow' : 'red';
          
          // Определяем размер узла в зависимости от dataRate
          const nodeSize = 30 + (node.dataRate * 3);
          
          return (
            <div 
              key={node.id}
              className="absolute z-20 cursor-pointer"
              style={{ 
                left: `${xPos}%`, 
                top: `${yPos}%` 
              }}
              onClick={() => setSelectedNode(node.id)}
            >
              <motion.div 
                className={`relative flex items-center justify-center
                           ${node.status === 'active' ? 'text-green-400' : 
                             node.status === 'partial' ? 'text-yellow-400' : 
                             'text-red-400'}`}
                style={{ 
                  width: `${nodeSize}px`,
                  height: `${nodeSize}px`
                }}
                whileHover={{ scale: 1.2 }}
              >
                {/* Шестиугольная форма узла */}
                <svg 
                  width="100%" 
                  height="100%" 
                  viewBox="0 0 100 100" 
                  className={`absolute top-0 left-0 ${
                    node.status === 'active' ? 'text-green-400' : 
                    node.status === 'partial' ? 'text-yellow-400' : 
                    'text-red-400'
                  }`}
                >
                  <motion.polygon 
                    points="50 0, 93.3 25, 93.3 75, 50 100, 6.7 75, 6.7 25" 
                    fill={`${
                      node.status === 'active' ? 'rgba(22, 101, 52, 0.2)' : 
                      node.status === 'partial' ? 'rgba(161, 98, 7, 0.2)' : 
                      'rgba(153, 27, 27, 0.2)'
                    }`}
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeDasharray={node.status === 'partial' ? "5 2" : undefined}
                    animate={{ 
                      opacity: [0.7, 1, 0.7],
                      strokeWidth: node.status === 'inactive' ? [1, 0.5, 1] : undefined
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </svg>
                
                {/* Внутренний круг */}
                <motion.div 
                  className={`w-3/5 h-3/5 rounded-full flex items-center justify-center text-center
                             ${node.status === 'active' ? 'bg-green-900/40 border-green-400/50' : 
                               node.status === 'partial' ? 'bg-yellow-900/40 border-yellow-400/50' : 
                               'bg-red-900/40 border-red-400/50'}`}
                  style={{ 
                    border: '1px solid'
                  }}
                  animate={{ 
                    opacity: node.status === 'inactive' ? [0.3, 0.6, 0.3] : [0.8, 1, 0.8]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="text-[6px] font-mono font-bold text-white">
                    {node.name}
                  </div>
                </motion.div>
                
                {/* Индикатор активности */}
                {node.status === 'active' && (
                  <motion.div 
                    className="absolute right-0 bottom-0 w-1.5 h-1.5 rounded-full bg-green-400"
                    animate={{ 
                      opacity: [0.5, 1, 0.5],
                      scale: [0.8, 1.2, 0.8]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </motion.div>
            </div>
          );
        })}
        
        {/* Соединения между узлами */}
        <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none">
          {networkConnections.map((conn, idx) => {
            const fromNode = networkNodes.find(n => n.id === conn.from);
            const toNode = networkNodes.find(n => n.id === conn.to);
            
            if (!fromNode || !toNode) return null;
            
            // Преобразуем географические координаты в позицию на экране
            const x1 = ((fromNode.lon + 180) / 360) * 100;
            const y1 = ((90 - fromNode.lat) / 180) * 100;
            const x2 = ((toNode.lon + 180) / 360) * 100; 
            const y2 = ((90 - toNode.lat) / 180) * 100;
            
            // Определяем стиль соединения в зависимости от типа
            let strokeColor = "#3b82f6"; // стандартный синий
            let strokeWidth = conn.strength * 2;
            let strokeDasharray = undefined;
            let strokeOpacity = 0.6;
            
            if (conn.type === 'quantum') {
              strokeColor = "#ef4444"; // красный для квантовых
              strokeOpacity = 0.7;
            } else if (conn.type === 'backdoor') {
              strokeColor = "#10b981"; // зеленый для секретных
              strokeDasharray = "1 2";
              strokeOpacity = 0.5;
            } else {
              strokeDasharray = "4 2"; // пунктир для стандартных
            }
            
            return (
              <motion.line 
                key={`conn-${idx}`}
                x1={`${x1}%`} 
                y1={`${y1}%`} 
                x2={`${x2}%`} 
                y2={`${y2}%`}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeOpacity={strokeOpacity}
                initial={{ pathLength: 0 }}
                animate={{ 
                  pathLength: 1,
                  strokeOpacity: [strokeOpacity - 0.2, strokeOpacity + 0.1, strokeOpacity - 0.2]
                }}
                transition={{ 
                  pathLength: { duration: 1.5, delay: idx * 0.05 },
                  strokeOpacity: { duration: 3, repeat: Infinity }
                }}
              />
            );
          })}
          
          {/* Пульсирующие точки на линиях для эффекта передачи данных */}
          {networkConnections
            .filter(conn => conn.type === 'quantum' || conn.strength > 0.7)
            .map((conn, idx) => {
              const fromNode = networkNodes.find(n => n.id === conn.from);
              const toNode = networkNodes.find(n => n.id === conn.to);
              
              if (!fromNode || !toNode) return null;
              
              const x1 = ((fromNode.lon + 180) / 360) * 100;
              const y1 = ((90 - fromNode.lat) / 180) * 100;
              const x2 = ((toNode.lon + 180) / 360) * 100; 
              const y2 = ((90 - toNode.lat) / 180) * 100;
              
              // Определяем цвет в зависимости от типа соединения
              const dotColor = conn.type === 'quantum' ? "#ef4444" : 
                             conn.type === 'backdoor' ? "#10b981" : "#3b82f6";
              
              return (
                <motion.circle 
                  key={`pulse-${idx}`}
                  r="2"
                  fill={dotColor}
                  filter="url(#glow)"
                  initial={{ 
                    cx: `${x1}%`, 
                    cy: `${y1}%`,
                    opacity: 0
                  }}
                  animate={{ 
                    cx: [`${x1}%`, `${x2}%`],
                    cy: [`${y1}%`, `${y2}%`],
                    opacity: [0, 0.8, 0]
                  }}
                  transition={{ 
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    repeatDelay: Math.random() * 5,
                    ease: "linear",
                    times: [0, 0.5, 1]
                  }}
                />
              );
            })}
          
          {/* Фильтр свечения */}
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
        </svg>
        
        {/* Информация о выбранном узле */}
        {selectedNode && (
          <motion.div 
            className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm border border-red-700/60 rounded-md overflow-hidden z-40 max-w-[250px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Декоративная верхняя полоса */}
            <div className="h-1 w-full bg-gradient-to-r from-red-900 via-red-500 to-red-900"></div>
            
            {/* Заголовок */}
            <div className="text-red-300 font-bold py-2 px-3 border-b border-red-700/40 flex items-center">
              <motion.div 
                className="w-2 h-2 rounded-full bg-red-500 mr-2"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-xs font-mono tracking-wider uppercase">NODE: {getSelectedNodeData()?.name}</span>
            </div>
            
            <div className="p-3">
              {/* Основная информация */}
              <div className="grid grid-cols-2 gap-y-2 gap-x-3 mb-3">
                <div className="font-bold text-red-400/90 text-[10px] font-mono flex items-center">
                  <span className="inline-block w-1 h-1 bg-red-500 mr-1.5"></span>
                  STATUS:
                </div>
                <div className={`text-[10px] font-mono font-bold
                  ${getSelectedNodeData()?.status === 'active' ? 'text-green-400' : 
                    getSelectedNodeData()?.status === 'partial' ? 'text-yellow-400' : 'text-red-400'}
                `}>
                  {getSelectedNodeData()?.status.toUpperCase()}
                </div>
                
                <div className="font-bold text-red-400/90 text-[10px] font-mono flex items-center">
                  <span className="inline-block w-1 h-1 bg-red-500 mr-1.5"></span>
                  DATA RATE:
                </div>
                <div className="text-[10px] font-mono text-red-300">
                  {getSelectedNodeData()?.dataRate.toFixed(1)} Pb/s
                </div>
                
                <div className="font-bold text-red-400/90 text-[10px] font-mono flex items-center">
                  <span className="inline-block w-1 h-1 bg-red-500 mr-1.5"></span>
                  PING:
                </div>
                <div className="text-[10px] font-mono text-red-300">
                  {getSelectedNodeData()?.ping} ms
                </div>
                
                <div className="font-bold text-red-400/90 text-[10px] font-mono flex items-center">
                  <span className="inline-block w-1 h-1 bg-red-500 mr-1.5"></span>
                  CONNECTIONS:
                </div>
                <div className="text-[10px] font-mono text-red-300">
                  {getNodeConnections(selectedNode).length}
                </div>
              </div>
              
              {/* Визуализация связей */}
              <div className="h-1 w-full bg-red-800/50 my-2"></div>
              
              <div className="text-[10px] font-mono text-red-400/90 mb-2">СОЕДИНЕНИЯ:</div>
              
              <div className="grid grid-cols-3 gap-1 mb-3">
                {['quantum', 'standard', 'backdoor'].map(connType => {
                  const connsOfType = getNodeConnections(selectedNode).filter(c => c.type === connType);
                  return (
                    <div key={connType} className="bg-red-950/40 border border-red-800/40 rounded px-1.5 py-1 text-center">
                      <div className={`text-[8px] font-mono mb-1 font-bold 
                        ${connType === 'quantum' ? 'text-red-400' : 
                          connType === 'backdoor' ? 'text-green-400' : 'text-blue-400'}`}>
                        {connType.toUpperCase()}
                      </div>
                      <div className="text-[12px] font-mono text-red-300 font-bold">
                        {connsOfType.length}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Кнопка закрытия */}
            <button
              className="w-full bg-red-900/40 hover:bg-red-800/40 border-t border-red-700/40 px-3 py-1.5 text-center text-red-300 flex items-center justify-center text-[10px] font-mono transition-colors"
              onClick={() => setSelectedNode(null)}
            >
              <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              CLOSE
            </button>
          </motion.div>
        )}
        
        {/* Легенда карты */}
        <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm border border-red-700/60 rounded-md overflow-hidden z-40">
          {/* Декоративная верхняя полоса */}
          <div className="h-1 w-full bg-gradient-to-r from-red-900 via-red-500 to-red-900"></div>
          
          <div className="p-2">
            <div className="text-[9px] uppercase font-mono text-red-400 mb-2 tracking-wider">NETWORK LEGEND</div>
            
            <div className="space-y-1.5">
              <div className="flex items-center">
                <div className="w-3 h-[1px] bg-red-500 mr-2"></div>
                <span className="text-[8px] font-mono text-red-300">QUANTUM LINK</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-[1px] bg-blue-500 mr-2" style={{ borderTop: '1px dashed' }}></div>
                <span className="text-[8px] font-mono text-red-300">STANDARD LINK</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-[1px] bg-green-500 mr-2" style={{ borderTop: '1px dotted' }}></div>
                <span className="text-[8px] font-mono text-red-300">BACKDOOR CHANNEL</span>
              </div>
              <div className="h-1 w-full bg-red-800/30 my-1"></div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1.5 text-green-400">
                  <polygon points="50 0, 93.3 25, 93.3 75, 50 100, 6.7 75, 6.7 25" fill="rgba(22, 101, 52, 0.2)" stroke="currentColor" strokeWidth="1" />
                </svg>
                <span className="text-[8px] font-mono text-red-300">ACTIVE NODE</span>
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1.5 text-yellow-400">
                  <polygon points="50 0, 93.3 25, 93.3 75, 50 100, 6.7 75, 6.7 25" fill="rgba(161, 98, 7, 0.2)" stroke="currentColor" strokeWidth="1" strokeDasharray="5 2" />
                </svg>
                <span className="text-[8px] font-mono text-red-300">PARTIAL NODE</span>
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1.5 text-red-400">
                  <polygon points="50 0, 93.3 25, 93.3 75, 50 100, 6.7 75, 6.7 25" fill="rgba(153, 27, 27, 0.2)" stroke="currentColor" strokeWidth="1" />
                </svg>
                <span className="text-[8px] font-mono text-red-300">INACTIVE NODE</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Счетчик узлов и подключений */}
        <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm border border-red-700/60 rounded-md overflow-hidden z-40">
          {/* Декоративная верхняя полоса */}
          <div className="h-1 w-full bg-gradient-to-r from-red-900 via-red-500 to-red-900"></div>
          
          <div className="px-3 py-2">
            <div className="flex items-center mb-1.5">
              <motion.div 
                className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <div className="text-[10px] font-mono text-red-300/90 tracking-wider">NODES: <span className="text-red-300">{networkNodes.length}</span></div>
            </div>
            <div className="flex items-center">
              <motion.div 
                className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
              />
              <div className="text-[10px] font-mono text-red-300/90 tracking-wider">LINKS: <span className="text-red-300">{networkConnections.length}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  // Отрисовка секции мониторинга трафика
  const renderTrafficMonitoringSection = () => (
    <div className="h-full flex flex-col">
      <div className="text-sm font-mono text-red-300 mb-4">
        Мониторинг квантового сетевого трафика в режиме реального времени. 
        Система обеспечивает сверхбыструю передачу данных через квантовые каналы.
      </div>
      
      <div className="flex-1 grid grid-cols-3 gap-4">
        {/* Диаграмма трафика в режиме реального времени */}
        <div className="col-span-2 border border-red-700/30 bg-red-950/30 rounded-md p-4 relative">
          <div className="text-xs font-mono text-red-400 uppercase mb-3 flex items-center">
            <motion.div 
              className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            QUANTUM TRAFFIC FLOW
          </div>
          
          {/* График трафика */}
          <div className="h-40 mt-2 flex items-end justify-between relative">
            <div className="absolute inset-0 grid grid-rows-4 grid-cols-1 pointer-events-none">
              {[...Array(5)].map((_, idx) => (
                <div key={`grid-y-${idx}`} className="border-t border-red-700/20 relative">
                  <div className="absolute -top-2 -left-4 text-[8px] font-mono text-red-400/60">
                    {(10 - idx * 2.5).toFixed(1)}
                  </div>
                </div>
              ))}
            </div>
            
            {trafficData.map((value, idx) => (
              <motion.div
                key={`bar-${idx}`}
                className="w-3 bg-gradient-to-t from-red-900/40 to-red-500/80 rounded-sm mx-0.5"
                style={{ height: `${value * 8}%` }}
                initial={{ height: 0 }}
                animate={{ height: `${value * 8}%` }}
                transition={{ duration: 0.5 }}
              >
                <motion.div 
                  className="w-full h-1 bg-red-400/80 rounded-t-sm"
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </motion.div>
            ))}
          </div>
          
          <div className="mt-4 text-[8px] font-mono text-red-400/60 flex justify-between">
            <span>REFRESH RATE: 1 SEC</span>
            <span>AVG: {(trafficData.reduce((a, b) => a + b, 0) / (trafficData.length || 1)).toFixed(2)} Pb/s</span>
            <span>MAX: {Math.max(...trafficData, 0).toFixed(2)} Pb/s</span>
          </div>
        </div>
        
        {/* Активные протоколы и статус */}
        <div className="border border-red-700/30 bg-red-950/30 rounded-md p-4 relative">
          <div className="text-xs font-mono text-red-400 uppercase mb-3 flex items-center">
            <motion.div 
              className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            ACTIVE PROTOCOLS
          </div>
          
          <div className="space-y-2">
            {communicationProtocols.map(protocol => (
              <div 
                key={protocol.id}
                className="flex justify-between items-center bg-red-900/20 border border-red-700/30 rounded-sm px-2 py-1.5"
              >
                <div className="flex items-center">
                  <motion.div 
                    className={`w-1.5 h-1.5 rounded-full mr-2 ${
                      protocol.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <div className="text-[9px] font-mono text-red-300">{protocol.name}</div>
                </div>
                <div className="text-[9px] font-mono text-red-400/80">{protocol.reliability.toFixed(1)}%</div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-center">
            <div className="text-[9px] font-mono text-red-300/80 mb-1">SYSTEM EFFICIENCY</div>
            <div className="h-2 bg-red-900/50 rounded-full overflow-hidden mb-1">
              <motion.div 
                className="h-full bg-gradient-to-r from-red-500/80 to-red-400"
                style={{ width: '94.7%' }}
              />
            </div>
            <div className="flex justify-between text-[8px] font-mono text-red-400/60">
              <span>0%</span>
              <span className="text-red-300">94.7%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Отрисовка секции квантовой телепортации
  const renderQuantumTeleportationSection = () => (
    <div className="h-full flex flex-col">
      <div className="text-sm font-mono text-red-300 mb-4">
        Квантовая телепортация данных обеспечивает мгновенную передачу информации через заслон N.E.B.U.L.A. 
        Процесс полностью независим от расстояния и защищен от перехвата.
      </div>
      
      <div className="flex-1 grid grid-cols-2 gap-4">
        {/* Визуализация процесса телепортации */}
        <div className="border border-red-700/30 bg-red-950/30 rounded-md p-4 relative">
          <div className="text-xs font-mono text-red-400 uppercase mb-3 flex items-center">
            <motion.div 
              className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            QUANTUM TELEPORTATION PROCESS
          </div>
          <div className="h-56 relative">
            {/* SOURCE */}
            <motion.div 
              ref={sourceRef}
              className="absolute left-10 top-10 w-12 h-12 rounded-full bg-red-900/60 border-2 border-red-400/80 flex items-center justify-center z-20 cursor-pointer"
              animate={{ 
                boxShadow: ['0 0 5px rgba(239, 68, 68, 0.3)', '0 0 10px rgba(239, 68, 68, 0.6)', '0 0 5px rgba(239, 68, 68, 0.3)'] 
              }}
              transition={{ duration: 2, repeat: Infinity }}
              onClick={handleTeleport}
            >
              <div className="text-[8px] font-mono text-red-200 text-center select-none">
                SOURCE
              </div>
            </motion.div>
            {/* TARGET */}
            <motion.div 
              ref={targetRef}
              className="absolute right-10 bottom-10 w-12 h-12 rounded-full bg-blue-900/60 border-2 border-blue-400/80 flex items-center justify-center z-20"
              animate={{ 
                boxShadow: ['0 0 5px rgba(59, 130, 246, 0.3)', '0 0 10px rgba(59, 130, 246, 0.6)', '0 0 5px rgba(59, 130, 246, 0.3)'] 
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              <div className="text-[8px] font-mono text-blue-200 text-center select-none">
                TARGET
              </div>
            </motion.div>
            {/* Анимация передачи данных */}
            {isTeleporting && teleportParticles.map((_, idx) => (
              <motion.div
                key={idx}
                className="absolute w-2 h-2 rounded-full bg-red-500 shadow-lg"
                style={{ left: 64, top: 64 }}
                animate={{
                  x: teleportPath.dx,
                  y: teleportPath.dy,
                  opacity: [1, 1, 0],
                  scale: [1, 1.2, 0.8]
                }}
                transition={{ 
                  duration: 1.2 + idx * 0.05,
                  delay: idx * 0.07,
                  ease: 'easeInOut'
                }}
              />
            ))}
            {/* Анимация анализа под TARGET */}
            {isTeleporting && (
            <motion.div 
                className="absolute right-10 bottom-2 flex flex-col items-center z-30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
              >
                {/* Сканирующие круги */}
            <motion.div 
                  className="relative flex items-center justify-center"
                  style={{ width: 60, height: 60 }}
                >
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full border border-red-400"
                      style={{ width: 40 + i * 20, height: 40 + i * 20, left: 10 - i * 10, top: 10 - i * 10 }}
                      animate={{ opacity: [0.5, 0, 0.5], scale: [1, 1.3, 1] }}
                      transition={{ duration: 1.2 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                  {/* Иконка анализа */}
                  <div className="w-8 h-8 rounded-full bg-red-900/60 border-2 border-red-400 flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
                      <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </motion.div>
                {/* Этап анализа */}
                <motion.div
                  className="mt-2 text-xs font-mono text-red-400 bg-red-950/80 px-3 py-1 rounded shadow text-center"
                  key={analysisStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="font-bold text-red-300 tracking-wider">{analysisModules[analysisStep]?.name}</div>
                  <div>{analysisModules[analysisStep]?.status}</div>
                </motion.div>
              </motion.div>
            )}
            {/* Заслон N.E.B.U.L.A. */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/80 to-transparent"></div>
              <div className="absolute text-[8px] font-mono text-red-400/80">
                N.E.B.U.L.A. BARRIER
              </div>
            </div>
            {/* Подсказка после телепортации */}
            {showGammaHint && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 0 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute right-0 bottom-20 z-30"
              >
                <div className="px-6 py-3 rounded-lg bg-gradient-to-b from-blue-900/90 via-blue-950/95 to-black border-2 border-blue-700/60 shadow-lg font-mono text-base text-blue-200 tracking-widest flex items-center animate-pulse">
                  <span className="mr-2">Gamma Transfer Key:</span>
                  <span className="text-blue-400 font-bold">-GAMMA-QN98</span>
                  <button
                    className="ml-4 w-6 h-6 flex items-center justify-center rounded-full bg-blue-900/80 border border-blue-700/60 text-blue-400 hover:text-blue-200 hover:bg-blue-800/90 transition-all duration-200"
                    onClick={() => setShowGammaHint(false)}
                    aria-label="Close gamma hint"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              </motion.div>
            )}
          </div>
          
          <div className="mt-4 text-[8px] font-mono text-red-400/60 space-y-2">
            <div className="flex justify-between">
              <span>ENTANGLEMENT LEVEL:</span>
              <span className="text-red-300">99.999%</span>
            </div>
            <div className="flex justify-between">
              <span>QUANTUM COHERENCE:</span>
              <span className="text-red-300">STABLE</span>
            </div>
            <div className="flex justify-between">
              <span>TELEPORTATION RATE:</span>
              <span className="text-red-300">{Math.floor(Math.random() * 100 + 900)} Qb/s</span>
            </div>
          </div>
        </div>
        
        {/* Статистика и эффективность телепортации */}
        <div className="border border-red-700/30 bg-red-950/30 rounded-md p-4 relative">
          <div className="text-xs font-mono text-red-400 uppercase mb-3 flex items-center">
            <motion.div 
              className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            TELEPORTATION METRICS
          </div>
          
          {/* Диаграмма эффективности */}
          <div className="bg-red-900/20 border border-red-700/30 rounded-md p-3 mb-4">
            <div className="text-[10px] font-mono text-red-300 mb-2">
              QUANTUM EFFICIENCY
            </div>
            
            <div className="flex items-center space-x-1">
              {[99.92, 99.97, 100, 99.95, 99.99, 100].map((value, idx) => (
                <div key={`eff-${idx}`} className="flex-1">
                  <div className="h-20 bg-red-900/30 border border-red-800/30 rounded-t-sm overflow-hidden">
                    <motion.div 
                      className="w-full bg-gradient-to-t from-red-600/50 to-red-400/80 rounded-t-sm"
                      style={{ height: `${value}%` }}
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                    />
                  </div>
                  <div className="text-center text-[7px] font-mono text-red-400/80 mt-1">
                    NODE {idx+1}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-[8px] font-mono text-red-300/70 mt-3 text-center">
              AVG. EFFICIENCY: 99.97%
            </div>
          </div>
          
          {/* Бегущие логи телепортации */}
          <div className="bg-red-900/20 border border-red-700/30 rounded-md p-3 h-40 overflow-hidden relative">
            <div className="text-[10px] font-mono text-red-300 mb-2">
              ACTIVITY LOG
            </div>
            
            <div className="space-y-1.5 text-[8px] font-mono">
              {randomHex.slice(0, 6).map((hex, idx) => (
                <motion.div 
                  key={`log-${idx}`}
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                >
                  <span className="text-red-400 mr-2">[{new Date(Date.now() - idx * 1000 * 10).toLocaleTimeString()}]</span>
                  <span className="text-red-300">
                    {idx === 0 ? "Quantum teleportation successful." :
                     idx === 1 ? "Entanglement verified on node NYC-QUANTUM." :
                     idx === 2 ? "Transferring 8192 qubits to TOKYO-N1." :
                     idx === 3 ? "Recalibrating quantum harmonics." :
                     idx === 4 ? "Barrier penetration: stable." :
                     "Optimizing entanglement vectors."}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  // Отрисовка секции безопасности сети
  const renderSecuritySection = () => (
    <div className="h-full flex flex-col">
      <div className="text-sm font-mono text-red-300 mb-4">
        Система сетевой безопасности NEBULA отслеживает и блокирует все попытки несанкционированного доступа.
        Квантовое шифрование гарантирует полную защиту данных при передаче.
      </div>
      
      <div className="flex-1 grid grid-cols-2 gap-4">
        {/* Сканер безопасности сети */}
        <div className="border border-red-700/30 bg-red-950/30 rounded-md p-4 relative">
          <div className="text-xs font-mono text-red-400 uppercase mb-3 flex items-center">
            <motion.div 
              className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            NETWORK SECURITY SCAN
          </div>
          
          {/* Статус сканирования */}
          <div className="bg-red-900/20 border border-red-700/30 rounded-md p-3 mb-4">
            <div className="flex justify-between items-center mb-2">
              <div className="text-[10px] font-mono text-red-300">Quantum Security Scan</div>
              <div className="text-[8px] font-mono text-red-400/80">
                {securityScanProgress >= 100 ? 'COMPLETE' : 'IN PROGRESS'}
              </div>
            </div>
            
            <div className="h-2 bg-red-900/50 rounded-full overflow-hidden mb-1">
              <motion.div 
                className="h-full bg-gradient-to-r from-red-600/80 to-red-400"
                style={{ width: `${securityScanProgress}%` }}
              />
            </div>
            
            <div className="flex justify-between text-[8px] font-mono">
              <div className="text-red-400/80">{Math.min(100, Math.floor(securityScanProgress))}%</div>
              <div className="text-red-300">
                {securityScanProgress >= 100 ? 'NO VULNERABILITIES DETECTED' : 'SCANNING...'}
              </div>
            </div>
          </div>
          
          {/* Тепловая карта атак */}
          <div className="bg-red-900/20 border border-red-700/30 rounded-md p-3 h-56 relative overflow-hidden">
            <div className="text-[10px] font-mono text-red-300 mb-2">
              ATTACK ORIGIN HEATMAP
            </div>
            
            <div className="absolute inset-4 top-8 border border-red-700/30 rounded-sm opacity-30">
              {/* Упрощенная карта мира */}
              <svg viewBox="0 0 1000 500" className="w-full h-full">
                {/* Континенты */}
                <path d="M300,250 Q400,200 500,250 T700,250" fill="none" stroke="#ef4444" strokeWidth="0.5" />
                <path d="M200,150 Q250,100 300,150 T400,150" fill="none" stroke="#ef4444" strokeWidth="0.5" />
                <path d="M600,350 Q650,300 700,350 T800,350" fill="none" stroke="#ef4444" strokeWidth="0.5" />
                <path d="M700,150 Q750,100 800,150 T900,150" fill="none" stroke="#ef4444" strokeWidth="0.5" />
              </svg>
            </div>
            
            {/* Точки атак */}
            {[
              { x: 25, y: 35, size: 20, intensity: 0.8 },
              { x: 68, y: 28, size: 15, intensity: 0.6 },
              { x: 42, y: 60, size: 25, intensity: 0.9 },
              { x: 80, y: 70, size: 12, intensity: 0.5 },
              { x: 15, y: 45, size: 18, intensity: 0.7 }
            ].map((attack, idx) => (
              <motion.div
                key={`attack-${idx}`}
                className="absolute rounded-full bg-red-500/80 pointer-events-none"
                style={{
                  left: `${attack.x}%`,
                  top: `${attack.y}%`,
                  width: `${attack.size}px`,
                  height: `${attack.size}px`,
                  opacity: attack.intensity * 0.6
                }}
                animate={{ 
                  opacity: [attack.intensity * 0.3, attack.intensity * 0.7, attack.intensity * 0.3],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: idx * 0.5 }}
              />
            ))}
            
            <div className="absolute bottom-2 right-2 text-[7px] font-mono text-red-400/60">
              LAST 24h | 347 ATTEMPTS
            </div>
          </div>
        </div>
        
        {/* Журнал событий безопасности */}
        <div className="border border-red-700/30 bg-red-950/30 rounded-md p-4 relative">
          <div className="text-xs font-mono text-red-400 uppercase mb-3 flex items-center">
            <motion.div 
              className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            SECURITY EVENT LOG
          </div>
          
          <div className="space-y-2">
            {securityEvents.map((event, idx) => (
              <div 
                key={`event-${idx}`}
                className={`bg-red-900/20 border border-red-700/30 rounded-sm p-2 
                           ${event.severity === 'critical' ? 'border-l-2 border-l-red-500' : 
                             event.severity === 'high' ? 'border-l-2 border-l-orange-500' : 
                             'border-l-2 border-l-yellow-500'}`}
              >
                <div className="flex justify-between items-center">
                  <div className="text-[9px] font-mono text-red-300 font-bold">
                    {event.type}
                  </div>
                  <div className="text-[8px] font-mono text-red-400/70">
                    {event.time}
                  </div>
                </div>
                
                <div className="mt-1 grid grid-cols-3 gap-1 text-[8px] font-mono">
                  <div>
                    <span className="text-red-400/70">SOURCE:</span>
                    <span className="ml-1 text-red-300">{event.source}</span>
                  </div>
                  <div>
                    <span className="text-red-400/70">SEVERITY:</span>
                    <span className={`ml-1 ${
                      event.severity === 'critical' ? 'text-red-400' :
                      event.severity === 'high' ? 'text-orange-400' :
                      'text-yellow-400'
                    }`}>
                      {event.severity.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <span className="text-red-400/70">STATUS:</span>
                    <span className={`ml-1 ${
                      event.status === 'blocked' ? 'text-green-400' :
                      event.status === 'mitigated' ? 'text-blue-400' :
                      event.status === 'active' ? 'text-red-400' :
                      'text-yellow-400'
                    }`}>
                      {event.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Диаграмма успешности защиты */}
          <div className="mt-4 p-3 bg-red-900/20 border border-red-700/30 rounded-md">
            <div className="text-[9px] font-mono text-red-300 mb-2 flex justify-between">
              <span>QUANTUM BARRIER EFFICIENCY</span>
              <span className="text-red-200 font-bold">99.999%</span>
            </div>
            
            <div className="flex items-center justify-center space-x-2 mt-3">
              <motion.div 
                className="w-3 h-3 rounded-full bg-green-500"
                animate={{ opacity: [0.6, 1, 0.6], scale: [0.9, 1.1, 0.9] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="text-[8px] font-mono text-green-400">SECURE</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Этапы анализа
  const analysisModules = [
    { name: 'PERCEPTION_INTERFACE', status: 'SCANNING DATA...' },
    { name: 'SECURITY_SYSTEM', status: 'ENCRYPTING STREAM...' },
    { name: 'SYNTHESIS_MODULE', status: 'SYNTHESIZING PATTERNS...' },
    { name: 'DATA_STORAGE', status: 'ARCHIVING...' },
  ];

  return (
    <div className="h-full w-full flex flex-col">
      {/* Анимация активации вкладки */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-1 bg-red-600/80 z-10"
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
              <svg viewBox="0 0 24 24" className="text-red-500 w-full h-full" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 2H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 2v6m0-6V1m0 7v4m0-4h6m-6 0H3m0 4v10a2 2 0 0 0 2 2h4m-6-12h6m6-6v6m0-6h1m-1 6h-4m10-6v6m0-6h-1m1 6h-6m6 4v4a2 2 0 0 1-2 2h-4m6-6h-6m0 0v6m0-6H9m0 6v1m0-7v-4m0 10v-1" />
              </svg>
            </motion.div>
            <h2 className="text-red-200 font-mono text-lg tracking-wider">NEBULA NETWORK INTERFACE</h2>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="text-xs font-mono text-red-400/80 p-1 border border-red-700/30 rounded bg-red-900/20">
              CLASS: SECURED
            </div>
            <motion.div 
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="h-3 w-3 rounded-full bg-red-500"
            />
          </div>
        </div>
      </div>
      
      {/* Навигационные вкладки */}
      <div className="flex space-x-2 mb-4">
        {[
          { id: "map", label: "КАРТА СЕТИ" },
          { id: "traffic", label: "МОНИТОРИНГ" },
          { id: "teleport", label: "КВАНТОВАЯ ТЕЛЕПОРТАЦИЯ" },
          { id: "security", label: "БЕЗОПАСНОСТЬ" }
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
        {activeSection === "map" && renderNetworkMapSection()}
        {activeSection === "traffic" && renderTrafficMonitoringSection()}
        {activeSection === "teleport" && renderQuantumTeleportationSection()}
        {activeSection === "security" && renderSecuritySection()}
      </div>
      
      {/* Нижняя полоса со статусом */}
      <div className="h-6 mt-4 bg-red-950/80 border border-red-700/30 rounded-sm px-2 flex items-center justify-between">
        <div className="text-[10px] font-mono text-red-300/70 flex items-center">
          <motion.div 
            className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          QUANTUM NETWORK: OPERATIONAL
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-[10px] font-mono text-red-300/70">
            SECTION: {activeSection.toUpperCase()}
          </div>
          <div className="text-[10px] font-mono text-red-300/70">
            UPTIME: {Math.floor(Math.random() * 900) + 9100}h
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkTab; 