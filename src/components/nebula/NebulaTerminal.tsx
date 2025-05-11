import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SecurityTab from './SecurityTab';
import DataTab from './DataTab';
import NetworkTab from './NetworkTab';

interface NebulaTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onPoliceNetUnlock?: () => void;
}

// Статические данные для визуала
const securityStats = [
  { label: "FIREWALL", value: 98.2, color: "bg-red-500" },
  { label: "ENCRYPTION", value: 99.7, color: "bg-yellow-500" },
  { label: "NEURAL_SHIELD", value: 94.3, color: "bg-green-500" },
  { label: "PROXY_MASK", value: 88.9, color: "bg-blue-500" },
];

const systemNodes = [
  "CORE://neural.nebula.sys",
  "NET://quantum.entangler",
  "MEM://volatile.buffer",
  "IO://neural.interface",
  "PROC://thought.analyzer",
  "SEC://defense.matrix"
];

const commandHistory: { command: string, output: React.ReactNode }[] = [
  { command: "./run_analyzer.sh", output: "Neural patterns analyzed. Status: SECURE" },
  { command: "cat /etc/nebula/status", output: "System operational at 99.7% efficiency" },
  { command: "sudo ./breach_check", output: "No unauthorized access attempts detected" }
];

// Генерация случайных hex-строк для декоративных элементов
const generateRandomHex = (length: number) => {
  return Array.from({ length }, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('').toUpperCase();
};

const NebulaTerminal: React.FC<NebulaTerminalProps> = ({ isOpen, onClose, onPoliceNetUnlock }) => {
  const [randomHexStrings, setRandomHexStrings] = useState<string[]>([]);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [activeTab, setActiveTab] = useState("main");
  const [statusMessages, setStatusMessages] = useState<string[]>([
    "INITIALIZING NEURAL NETWORK...",
    "CONNECTING TO NEBULA CORE..."
  ]);
  const [inputValue, setInputValue] = useState("");
  const [history, setHistory] = useState<{ command: string, output: React.ReactNode }[]>(commandHistory.map(item => ({ command: item.command, output: item.output as React.ReactNode })));
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Эффект для обновления случайных hex-строк
  useEffect(() => {
    if (!isOpen) return;
    
    const interval = setInterval(() => {
      setRandomHexStrings(
        Array.from({ length: 6 }, () => generateRandomHex(16))
      );
    }, 800);
    
    // Добавление новых статусных сообщений с задержкой
    const messageInterval = setInterval(() => {
      setStatusMessages(prev => {
        if (prev.length < 8) {
          const newMessages = [
            "QUANTUM ENCRYPTION ACTIVE",
            "NEURAL PATHWAYS ESTABLISHED",
            "SCANNING FOR INTRUSIONS...",
            "MEMORY BUFFERS OPTIMIZED",
            "THOUGHT PATTERN ANALYSIS RUNNING",
            "DEFENSIVE SYSTEMS ONLINE"
          ];
          const randomIndex = Math.floor(Math.random() * newMessages.length);
          return [...prev, newMessages[randomIndex]];
        }
        return prev;
      });
    }, 1200);
    
    // Анимация курсора
    const cursorInterval = setInterval(() => {
      setCursorPosition(prev => prev < 15 ? prev + 1 : 0);
    }, 300);
    
    return () => {
      clearInterval(interval);
      clearInterval(messageInterval);
      clearInterval(cursorInterval);
    };
  }, [isOpen]);
  
  // Фокус на input при открытии терминала
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Обработка ввода команды
  const SECRET_COMMAND = "ALPHA-7F1C-BETA-CORE42-GAMMA-QN98"; // пример секретной команды
  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      let output = "Unknown command";
      if (inputValue.trim() === SECRET_COMMAND) {
        output = (
          <div className="space-y-2">
            <div className="text-green-400 font-mono font-bold animate-pulse">[ACCESS GRANTED]</div>
            <div className="text-red-300 font-mono">[SYSTEM] <span className='text-blue-400 font-bold'>NEBULA_POLICENET_DATA</span> now available.</div>
            <div className="text-yellow-400 font-mono">[ALERT] PoliceNet Database breached!</div>
            <div className="text-blue-300 font-mono">[INFO] Extracted intelligence on project NEBULA <span className='text-yellow-300'>(status: 59.8% complete)</span>:</div>
            <ul className="list-disc ml-6 text-xs text-red-200 font-mono">
              <li>Project NEBULA is classified as a quantum neural AI initiative.</li>
              <li>Current phase: Adaptive self-modification and city-wide data integration.</li>
              <li>Known leads: Core architecture, security modules, partial neural map.</li>
              <li>Surveillance: Ongoing, but full structure remains undiscovered.</li>
            </ul>
          </div>
        );
        onPoliceNetUnlock?.();
      }
      setHistory(prev => [
        ...prev,
        { command: inputValue, output }
      ]);
      setInputValue("");
    }
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Затемнение фона */}
          <motion.div
            className="fixed inset-0 z-[1050] bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Развернутый терминал */}
          <motion.div
            className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1051]
                   w-[95%] max-w-6xl h-[85vh] overflow-hidden
                   bg-gradient-to-b from-red-950/95 via-red-950/95 to-red-950/95
                   border-2 border-red-700/70 rounded-lg shadow-[0_0_40px_rgba(180,0,0,0.45)]`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Угловые декоративные элементы в стиле киберпанк */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-red-500/60"></div>
            <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-red-500/60"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-red-500/60"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-red-500/60"></div>
            
            {/* Верхние декоративные полосы */}
            <motion.div 
              className="absolute top-0 left-0 h-0.5 bg-red-600"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.5, delay: 0.2 }}
            />
            <motion.div 
              className="absolute top-1 left-[5%] h-0.5 bg-red-700/60"
              initial={{ width: 0 }}
              animate={{ width: '90%' }}
              transition={{ duration: 1.2, delay: 0.4 }}
            />
            
            {/* Случайные сканирующие линии */}
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={`scan-line-${i}`}
                className="absolute left-0 w-full pointer-events-none"
                style={{
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(255,0,0,0.15) 50%, rgba(0,0,0,0) 100%)',
                  height: '3px',
                  opacity: 0.6,
                  top: `${20 + i * 30}%`,
                  zIndex: 10
                }}
                animate={{ 
                  top: [`${20 + i * 30}%`, '100%', `${20 + i * 30}%`],
                  opacity: [0.6, 0.8, 0.6]
                }}
                transition={{ 
                  top: { duration: 8 + i * 2, repeat: Infinity, ease: "linear", repeatDelay: i },
                  opacity: { duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }
                }}
              />
            ))}
            
            {/* Эффект шума по всему экрану */}
            <div 
              className="absolute inset-0 pointer-events-none" 
              style={{ 
                backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'1\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                opacity: 0.03
              }}
            />
            
            {/* Верхняя панель терминала */}
            <div className="h-12 bg-gradient-to-r from-red-950/90 via-red-900/80 to-red-950/90 border-b-2 border-red-700/70 flex items-center justify-between px-4">
              <div className="flex items-center space-x-2">
                <motion.div 
                  className="w-3 h-3 rounded-full bg-red-500"
                  animate={{ 
                    opacity: [0.6, 1, 0.6],
                    boxShadow: ['0 0 0px rgba(255, 0, 0, 0.3)', '0 0 10px rgba(255, 0, 0, 0.9)', '0 0 0px rgba(255, 0, 0, 0.3)']
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="text-xl font-mono text-red-200 tracking-wider font-bold">NEBULA_CORE_TERMINAL</div>
                <motion.div 
                  className="h-5 border-l border-red-500/50 mx-2"
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="flex space-x-1 items-center">
                  <span className="text-sm font-mono text-red-400/90">AUTH:</span>
                  <span className="text-sm font-mono text-red-300/90">ALPHA_</span>
                  <motion.span
                    className="inline-block w-2 h-4 bg-red-400/80 ml-0.5"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                </div>
              </div>
              
              {/* Меню навигации */}
              <div className="flex items-center space-x-3 mr-8">
                {['main', 'security', 'data', 'network'].map(tab => (
                  <motion.button
                    key={tab}
                    className={`px-3 py-1 text-xs uppercase font-mono tracking-wider rounded border border-red-600/40
                              ${activeTab === tab ? 'bg-red-900/50 text-red-100 border-red-500/60' : 'text-red-300/70 hover:bg-red-900/30'}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </motion.button>
                ))}
              </div>
            </div>
            
            {/* Содержимое терминала */}
            <div className="flex flex-col h-[calc(100%-3rem)]">
              <div className="flex-1 p-0 overflow-hidden relative">
                {/* Фон терминала с сеткой */}
                <div className="absolute inset-0 grid grid-cols-[repeat(40,minmax(0,1fr))] gap-px pointer-events-none">
                  {Array.from({length: 40}).map((_, i) => (
                    <div key={`col-${i}`} className="border-r border-red-600/5 h-full"></div>
                  ))}
                </div>
                <div className="absolute inset-0 grid grid-rows-[repeat(40,minmax(0,1fr))] gap-px pointer-events-none">
                  {Array.from({length: 40}).map((_, i) => (
                    <div key={`row-${i}`} className="border-b border-red-600/5 w-full"></div>
                  ))}
                </div>
                
                {/* Содержимое терминала в зависимости от выбранной вкладки */}
                <div className="relative z-10 h-full">
                  {/* Основная вкладка - показываем трехпанельный интерфейс */}
                  {activeTab === 'main' && (
                    <div className="flex h-full">
                      {/* Левая панель - статус системы */}
                      <div className="w-[25%] h-full border-r border-red-700/30 p-3 flex flex-col">
                        <div className="font-mono text-xs text-red-400 uppercase mb-2 flex items-center">
                          <motion.div 
                            className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5"
                            animate={{ opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                          System Status
                        </div>
                        
                        {/* Индикаторы состояния системы */}
                        <div className="space-y-3 mb-4">
                          {securityStats.map((stat, idx) => (
                            <div key={stat.label} className="space-y-1">
                              <div className="flex justify-between text-[10px] font-mono">
                                <span className="text-red-300/90">{stat.label}</span>
                                <motion.span 
                                  className="text-red-200"
                                  animate={{ opacity: [0.8, 1, 0.8] }}
                                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                                >
                                  {stat.value.toFixed(1)}%
                                </motion.span>
                              </div>
                              <div className="h-1 bg-red-900/40 rounded-full overflow-hidden">
                                <motion.div 
                                  className={`h-full ${stat.color}`}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${stat.value}%` }}
                                  transition={{ duration: 1, delay: 0.5 + idx * 0.2 }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {/* Связанные системные узлы */}
                        <div className="font-mono text-xs text-red-400 uppercase mb-2 flex items-center">
                          <motion.div 
                            className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5"
                            animate={{ opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                          />
                          Connected Nodes
                        </div>
                        
                        <div className="space-y-1 mb-4">
                          {systemNodes.map((node, idx) => (
                            <div 
                              key={node} 
                              className="text-[10px] font-mono text-red-300/80 flex items-center"
                            >
                              <motion.div 
                                className="w-1 h-1 rounded-full bg-green-500 mr-1.5"
                                animate={{ opacity: [0.6, 1, 0.6] }}
                                transition={{ duration: 1, repeat: Infinity, delay: idx * 0.2 }}
                              />
                              {node}
                            </div>
                          ))}
                        </div>
                        
                        {/* Hex коды для декорации */}
                        <div className="mt-auto border-t border-red-700/30 pt-2">
                          <div className="text-[8px] font-mono text-red-400/50 space-y-0.5">
                            {randomHexStrings.map((hex, idx) => (
                              <div key={idx} className="font-mono">
                                {hex.split('').map((char, charIdx) => (
                                  <motion.span 
                                    key={charIdx}
                                    animate={{ 
                                      opacity: cursorPosition === charIdx ? [0.5, 1, 0.5] : 0.5
                                    }}
                                    transition={{ duration: 0.5 }}
                                  >
                                    {char}
                                  </motion.span>
                                ))}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {/* Центральная панель - главный терминал */}
                      <div className="flex-1 p-4 flex flex-col overflow-y-auto scrollbar-thin scrollbar-track-red-900/10 scrollbar-thumb-red-700/30">
                        {/* Заголовок версии и времени */}
                        <div className="flex justify-between items-center mb-4">
                          <div className="text-xs font-mono text-red-300/70">
                            NEBULA OS v4.2.1 [NEURAL ENGINE]
                          </div>
                          <div className="text-xs font-mono text-red-300/70 flex items-center">
                            <span>UPTIME:</span>
                            <motion.span 
                              className="ml-1"
                              animate={{ opacity: [0.7, 1, 0.7] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              {`${Math.floor(Math.random() * 100)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`}
                            </motion.span>
                          </div>
                        </div>
                        
                        {/* Индикатор инициализации */}
                        <motion.div 
                          className="mb-6 border border-red-700/40 bg-red-900/20 rounded p-3"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          <div className="font-mono text-sm text-red-200 mb-2 flex items-center">
                            <motion.div 
                              className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2"
                              animate={{ opacity: [0.6, 1, 0.6] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            />
                            NEBULA NEURAL INTERFACE INITIALIZED
                          </div>
                          
                          <div className="space-y-1 font-mono text-xs text-red-300/70">
                            {statusMessages.map((msg, idx) => (
                              <motion.div 
                                key={idx}
                                initial={{ opacity: 0, x: -5 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: idx * 0.2 }}
                                className="flex items-start"
                              >
                                <span className="text-red-500 mr-1.5">&gt;</span>
                                {msg}
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                        
                        {/* История команд */}
                        <div className="font-mono text-sm text-red-300 space-y-4">
                          {history.map((entry, idx) => (
                            <motion.div 
                              key={idx} 
                              className="pl-2 border-l-2 border-red-700/50"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.5, delay: 0.2 + idx * 0.2 }}
                            >
                              <div className="flex items-center text-xs text-red-400">
                                <span className="mr-1">$</span>
                                <span className="font-bold">{entry.command}</span>
                              </div>
                              <div className="text-xs mt-1 text-red-300/80">
                                {entry.output}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                        
                        {/* Активная командная строка */}
                        <div className="mt-4 font-mono text-xs flex items-center">
                          <div className="text-red-400 mr-1.5">NEBULA@SYSTEM:~$</div>
                          <input
                            ref={inputRef}
                            type="text"
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value)}
                            onKeyDown={handleCommand}
                            className="bg-transparent outline-none border-none text-red-200 font-mono flex-1 min-w-0"
                            style={{ caretColor: '#f87171' }}
                            autoFocus
                            spellCheck={false}
                            placeholder="Enter command..."
                          />
                        </div>
                      </div>
                      
                      {/* Правая панель - визуализация данных и активности */}
                      <div className="w-[25%] h-full border-l border-red-700/30 p-3 flex flex-col">
                        <div className="font-mono text-xs text-red-400 uppercase mb-2 flex items-center">
                          <motion.div 
                            className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5"
                            animate={{ opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                          Neural Activity
                        </div>
                        
                        {/* Визуализация нейронной активности */}
                        <div className="h-48 border border-red-700/30 rounded-md bg-red-950/50 relative overflow-hidden mb-4">
                          {/* Сетка точек для визуализации */}
                          <div className="absolute inset-0">
                            {Array.from({ length: 100 }).map((_, i) => (
                              <motion.div
                                key={`node-${i}`}
                                className="absolute w-1 h-1 rounded-full bg-red-500/70"
                                style={{
                                  left: `${Math.random() * 100}%`,
                                  top: `${Math.random() * 100}%`,
                                }}
                                animate={{ 
                                  opacity: [0.3, 0.8, 0.3],
                                  scale: [0.8, 1.2, 0.8]
                                }}
                                transition={{ 
                                  duration: 1 + Math.random() * 2,
                                  repeat: Infinity,
                                  delay: Math.random() * 2
                                }}
                              />
                            ))}
                            
                            {/* Линии соединений между точками */}
                            {Array.from({ length: 20 }).map((_, i) => (
                              <motion.div
                                key={`connection-${i}`}
                                className="absolute bg-red-600/30"
                                style={{
                                  left: `${Math.random() * 90}%`,
                                  top: `${Math.random() * 90}%`,
                                  width: `${10 + Math.random() * 30}%`,
                                  height: '1px',
                                  transformOrigin: 'left center',
                                  transform: `rotate(${Math.random() * 360}deg)`
                                }}
                                animate={{ opacity: [0, 0.5, 0] }}
                                transition={{ 
                                  duration: 2 + Math.random() * 3,
                                  repeat: Infinity,
                                  delay: Math.random() * 3
                                }}
                              />
                            ))}
                          </div>
                        </div>
                        
                        {/* Секция логов и уведомлений */}
                        <div className="font-mono text-xs text-red-400 uppercase mb-2 flex items-center">
                          <motion.div 
                            className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5"
                            animate={{ opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.7 }}
                          />
                          System Logs
                        </div>
                        
                        <div className="h-32 border border-red-700/30 rounded-md bg-red-950/50 p-2 overflow-auto text-[9px] font-mono text-red-300/70 mb-4 scrollbar-thin scrollbar-track-red-900/10 scrollbar-thumb-red-700/30">
                          {Array.from({ length: 15 }).map((_, i) => (
                            <div key={`log-${i}`} className="flex mb-1 last:mb-0">
                              <span className="text-red-500/80 mr-1.5">[{new Date().toISOString().replace('T', ' ').substr(0, 19)}]</span>
                              <span>
                                {[
                                  "Connection established with neural node #42",
                                  "Memory sector B12 optimized",
                                  "Quantum encryption key refreshed",
                                  "Scanning sector C for anomalies",
                                  "Firewall rules updated",
                                  "Neural pathway A-17 recalibrated"
                                ][Math.floor(Math.random() * 6)]}
                              </span>
                            </div>
                          ))}
                        </div>
                        
                        {/* Состояние подключения */}
                        <div className="mt-auto border-t border-red-700/30 pt-2 flex items-center justify-between">
                          <div className="flex items-center">
                            <motion.div 
                              className="w-2 h-2 rounded-full bg-green-500 mr-1.5"
                              animate={{ 
                                opacity: [0.6, 1, 0.6],
                                boxShadow: ['0 0 0px rgba(0, 255, 0, 0.3)', '0 0 5px rgba(0, 255, 0, 0.8)', '0 0 0px rgba(0, 255, 0, 0.3)']
                              }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                            <span className="text-[10px] font-mono text-red-300/90">SECURE CONNECTION</span>
                          </div>
                          
                          <div className="text-[10px] font-mono text-red-300/80">
                            ID: {randomHexStrings[0]?.substring(0, 8) || 'AB12CD34'}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Вкладка Security - показываем SecurityTab */}
                  {activeTab === 'security' && (
                    <SecurityTab isActive={activeTab === 'security'} />
                  )}
                  
                  {/* Вкладка Data - показываем DataTab */}
                  {activeTab === 'data' && (
                    <DataTab isActive={activeTab === 'data'} />
                  )}
                  
                  {/* Вкладка Network - показываем NetworkTab */}
                  {activeTab === 'network' && (
                    <NetworkTab isActive={activeTab === 'network'} />
                  )}
                </div>
              </div>
              
              {/* Нижняя информационная панель */}
              <div className="h-10 bg-gradient-to-r from-red-950 via-red-900/90 to-red-950 border-t-2 border-red-700/50 flex items-center justify-between px-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1.5">
                    <motion.div 
                      className="w-2 h-2 rounded-full bg-red-500"
                      animate={{ opacity: [0.4, 0.9, 0.4] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <div className="text-xs font-mono text-red-300">NEBULA_CORE:ACTIVE</div>
                  </div>
                  
                  <div className="flex items-center space-x-1.5">
                    <motion.div 
                      className="w-2 h-2 rounded-full bg-green-500"
                      animate={{ opacity: [0.4, 0.9, 0.4] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                    />
                    <div className="text-xs font-mono text-red-300">MEMORY:OPTIMIZED</div>
                  </div>
                  
                  <div className="flex items-center space-x-1.5">
                    <motion.div 
                      className="w-2 h-2 rounded-full bg-yellow-500"
                      animate={{ opacity: [0.4, 0.9, 0.4] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
                    />
                    <div className="text-xs font-mono text-red-300">QUANTUM:CALIBRATED</div>
                  </div>
                </div>
                
                <div className="text-xs font-mono text-red-300 flex items-center">
                  <div className="mr-3 flex items-center space-x-1">
                    <span className="text-red-400">SYS:</span>
                    <motion.span
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      READY
                    </motion.span>
                  </div>
                  <motion.div
                    className="h-3 w-3"
                    animate={{ 
                      opacity: [0.4, 0.8, 0.4],
                      rotate: [0, 360]
                    }}
                    transition={{ 
                      opacity: { duration: 2, repeat: Infinity },
                      rotate: { duration: 8, repeat: Infinity, ease: "linear" }
                    }}
                  >
                    <svg viewBox="0 0 24 24" className="text-red-400" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12s4.48 10 10 10 10-4.48 10-10z"></path>
                      <path d="M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10z"></path>
                      <path d="M12 8v8"></path>
                      <path d="M8 12h8"></path>
                    </svg>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NebulaTerminal; 