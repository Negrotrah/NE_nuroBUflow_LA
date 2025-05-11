import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SecurityTabProps {
  isActive: boolean;
}

// Данные о корпорациях
const corporationData = [
  { 
    id: "CP-001",
    name: "Arasaka", 
    securityLevel: 95, 
    status: "SECURE", 
    details: "Военно-промышленный конгломерат с высочайшим уровнем защиты", 
    color: "bg-red-500",
    breach: 2,
    location: "Токио, Япония" 
  },
  { 
    id: "CP-002",
    name: "Militech", 
    securityLevel: 88, 
    status: "COMPROMISED", 
    details: "Обнаружены уязвимости в защите периметра", 
    color: "bg-blue-600",
    breach: 7,
    location: "Делавэр, США" 
  },
  { 
    id: "CP-003",
    name: "Trauma Team", 
    securityLevel: 92, 
    status: "SECURE", 
    details: "Медицинская корпорация с усиленной защитой данных пациентов", 
    color: "bg-yellow-500",
    breach: 1,
    location: "Найт-Сити, США" 
  },
  { 
    id: "CP-004",
    name: "Biotechnica", 
    securityLevel: 86, 
    status: "ALERT", 
    details: "Выявлены попытки извне получить доступ к лабораторным данным", 
    color: "bg-green-500",
    breach: 9,
    location: "Найт-Сити, США" 
  },
  { 
    id: "CP-005",
    name: "Kang Tao", 
    securityLevel: 91, 
    status: "SECURE", 
    details: "Китайская корпорация, специализирующаяся на оружии с ИИ", 
    color: "bg-purple-600",
    breach: 3,
    location: "Чэнду, Китай" 
  },
  { 
    id: "CP-006",
    name: "Orbital Air", 
    securityLevel: 83, 
    status: "VULNERABLE", 
    details: "Транспортная компания с нестабильными протоколами защиты", 
    color: "bg-cyan-500",
    breach: 14,
    location: "Орбитальная станция, LEO" 
  },
  { 
    id: "CP-007",
    name: "NetWatch", 
    securityLevel: 97, 
    status: "SECURE", 
    details: "Организация, контролирующая интернет и борющаяся с киберпреступностью", 
    color: "bg-indigo-600",
    breach: 0,
    location: "Распределенная сеть" 
  },
  { 
    id: "CP-008",
    name: "Night Corp", 
    securityLevel: 89, 
    status: "MONITORED", 
    details: "Крупная городская корпорация со странными схемами защиты", 
    color: "bg-amber-600",
    breach: 5,
    location: "Найт-Сити, США" 
  }
];

// Коды доступа
const accessCodes = [
  "BD77-9F11-JK42-01A3",
  "XC21-4H59-LM88-67G2",
  "ET55-2Z93-QW11-83P5",
  "UV66-8K74-IJ33-47D9",
  "PO12-5E32-RN09-28B6",
  "LK44-3T81-GF76-92C7",
  "WS33-6V26-HY54-10A3",
  "ZQ88-1X65-MV22-56E4"
];

// Генерация случайных hex-строк для декоративных элементов
const generateRandomHex = (length: number) => {
  return Array.from({ length }, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('').toUpperCase();
};

const SecurityTab: React.FC<SecurityTabProps> = ({ isActive }) => {
  const [selectedCorp, setSelectedCorp] = useState<string | null>(null);
  const [randomHex, setRandomHex] = useState<string[]>([]);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);
  const [showCopyAlert, setShowCopyAlert] = useState(false);

  // Эффект для обновления случайных hex-кодов и запуска сканирования
  useEffect(() => {
    if (!isActive) return;
    
    // Обновление hex-кодов
    const hexInterval = setInterval(() => {
      setRandomHex(Array.from({ length: 5 }, () => generateRandomHex(16)));
    }, 1000);
    
    // Симуляция процесса сканирования 
    setScanComplete(false);
    setScanProgress(0);
    const scanInterval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(scanInterval);
          setScanComplete(true);
          return 100;
        }
        return prev + 1;
      });
    }, 30);
    
    return () => {
      clearInterval(hexInterval);
      clearInterval(scanInterval);
    };
  }, [isActive]);

  if (!isActive) return null;

  const handleSelectCorp = (corpId: string) => {
    setSelectedCorp(prevId => prevId === corpId ? null : corpId);
  };

  const selectedCorpData = corporationData.find(corp => corp.id === selectedCorp);

  // Функция копирования ключа
  const handleCopyAlpha = () => {
    navigator.clipboard.writeText('ALPHA-7F1C');
    setShowCopyAlert(true);
    setTimeout(() => setShowCopyAlert(false), 2000);
  };

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
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </motion.div>
            <h2 className="text-red-200 font-mono text-lg tracking-wider">NEBULA SECURITY MATRIX</h2>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="text-xs font-mono text-red-400/80 p-1 border border-red-700/30 rounded bg-red-900/20">
              SEC_LVL: ALPHA
            </div>
            <motion.div 
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="h-3 w-3 rounded-full bg-red-500"
            />
          </div>
        </div>
      </div>
      
      {/* Главная область содержимого */}
      <div className="flex-1 flex gap-4 overflow-hidden">
        {/* Левая панель - список корпораций */}
        <div className="w-[40%] border border-red-700/30 rounded-md bg-red-950/30 p-3 overflow-y-auto">
          <div className="text-xs font-mono text-red-400 uppercase mb-3 flex items-center">
            <motion.div 
              className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            Corporations Database
          </div>
          
          <div className="space-y-2">
            {corporationData.map((corp, idx) => (
              <motion.div 
                key={corp.id}
                className={`border border-red-700/30 rounded cursor-pointer overflow-hidden
                          ${selectedCorp === corp.id ? 'bg-red-900/40 border-red-500/70' : 'bg-red-950/40 hover:bg-red-900/20'}`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleSelectCorp(corp.id)}
                layout
              >
                <div className="flex justify-between items-center p-2">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full ${corp.color} mr-2`}></div>
                      <span className="text-red-200 font-mono font-bold text-sm">{corp.name}</span>
                    </div>
                    <div className="text-xs text-red-400/70 font-mono mt-1">{corp.id}</div>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <div className={`text-xs font-mono px-1.5 py-0.5 rounded 
                                ${corp.status === 'SECURE' ? 'bg-green-900/30 text-green-300' : 
                                  corp.status === 'COMPROMISED' ? 'bg-orange-900/30 text-orange-300' : 
                                  corp.status === 'ALERT' ? 'bg-yellow-900/30 text-yellow-300' : 
                                  corp.status === 'VULNERABLE' ? 'bg-red-900/30 text-red-300' : 
                                  'bg-blue-900/30 text-blue-300'}`}>
                      {corp.status}
                    </div>
                    <div className="text-xs text-red-400/70 font-mono mt-1">SEC: {corp.securityLevel}%</div>
                  </div>
                </div>
                
                {/* Раскрывающаяся часть с дополнительной информацией */}
                {selectedCorp === corp.id && (
                  <motion.div 
                    className="border-t border-red-700/30 p-2 bg-red-950/50"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex justify-between mb-2">
                      <div className="text-xs text-red-400/80 font-mono">Location:</div>
                      <div className="text-xs text-red-300/90 font-mono">{corp.location}</div>
                    </div>
                    <div className="flex justify-between mb-2">
                      <div className="text-xs text-red-400/80 font-mono">Breach Attempts:</div>
                      <div className="text-xs text-red-300/90 font-mono">{corp.breach}/week</div>
                    </div>
                    {/* Подсказка для Arasaka */}
                    {corp.name === 'Arasaka' && (
                      <div className="flex justify-between mb-2 cursor-pointer group" onClick={handleCopyAlpha} title="Copy fragment">
                        <div className="text-xs text-red-400/80 font-mono">Alpha Protocol Key:</div>
                        <div className="text-xs text-red-300/90 font-mono group-hover:text-red-200 transition-colors">ALPHA-7F1C</div>
                      </div>
                    )}
                    <div className="text-xs text-red-400/80 font-mono mb-1">Access Code:</div>
                    <div className="text-xs text-red-200 font-mono bg-red-900/20 p-1 rounded border border-red-700/30 flex items-center">
                      <motion.div 
                        className="h-2 w-2 bg-red-500 rounded-full mr-1.5"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                      {accessCodes[corporationData.indexOf(corp)]}
                    </div>
                    <div className="text-xs text-red-400/80 font-mono mt-2">{corp.details}</div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Правая панель - детали и визуализация */}
        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          {/* Верхняя секция - сканирование и активные угрозы */}
          <div className="flex-1 border border-red-700/30 rounded-md bg-red-950/30 p-3 overflow-y-auto">
            <div className="text-xs font-mono text-red-400 uppercase mb-3 flex items-center">
              <motion.div 
                className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              Security Scanner
            </div>
            
            {/* Визуализация сканирования */}
            <div className="border border-red-700/30 bg-red-950/50 rounded-md p-3 mb-4">
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm font-mono text-red-300">Network Security Scan</div>
                <div className="text-xs font-mono text-red-400/80">{scanComplete ? 'COMPLETE' : 'IN PROGRESS'}</div>
              </div>
              
              <div className="h-2 bg-red-900/50 rounded-full overflow-hidden mb-1">
                <motion.div 
                  className="h-full bg-red-500"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>
              
              <div className="flex justify-between">
                <div className="text-xs font-mono text-red-400/80">{scanProgress}%</div>
                <div className="text-xs font-mono text-red-400/80">
                  {scanComplete ? 'Secure' : 'Scanning...'}
                </div>
              </div>
            </div>
            
            {/* Активные угрозы и соединения */}
            <div className="mb-4">
              <div className="text-sm font-mono text-red-300 mb-2">Active Threats</div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { type: 'Malware', count: 3, color: 'bg-orange-500' },
                  { type: 'Intrusions', count: 1, color: 'bg-red-500' },
                  { type: 'Data Leaks', count: 0, color: 'bg-yellow-500' },
                  { type: 'Backdoors', count: 2, color: 'bg-purple-500' }
                ].map((threat, idx) => (
                  <div key={idx} className="border border-red-700/30 bg-red-950/40 rounded-md p-2 flex items-center justify-between">
                    <div className="text-xs font-mono text-red-300/90 flex items-center">
                      <div className={`w-1.5 h-1.5 rounded-full ${threat.color} mr-1.5`}></div>
                      {threat.type}
                    </div>
                    <div className={`text-xs font-mono font-bold ${threat.count > 0 ? 'text-red-300' : 'text-green-400'}`}>
                      {threat.count}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Визуализация сети и соединений */}
            <div className="border border-red-700/30 bg-red-950/50 rounded-md p-3 relative h-32 mb-4">
              <div className="text-sm font-mono text-red-300 mb-2">Network Connections</div>
              
              <div className="absolute inset-8">
                {/* Центральный узел */}
                <motion.div 
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-red-500 z-20"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                {/* Линии соединений */}
                {Array.from({ length: 8 }).map((_, i) => {
                  const angle = (i / 8) * Math.PI * 2;
                  const x = 50 + Math.cos(angle) * 45;
                  const y = 50 + Math.sin(angle) * 40;
                  
                  return (
                    <React.Fragment key={i}>
                      <motion.div 
                        className={`absolute top-[50%] left-[50%] h-[1px] origin-left
                                  ${i % 3 === 0 ? 'bg-red-500/60' : i % 3 === 1 ? 'bg-blue-500/60' : 'bg-yellow-500/60'}`}
                        style={{ 
                          width: `${Math.sqrt(Math.pow(x - 50, 2) + Math.pow(y - 50, 2))}%`,
                          transform: `rotate(${angle}rad)` 
                        }}
                        animate={{ opacity: [0.4, 0.8, 0.4] }}
                        transition={{ duration: 1.5 + (i * 0.3), repeat: Infinity }}
                      />
                      <motion.div 
                        className={`absolute w-1.5 h-1.5 rounded-full
                                  ${i % 3 === 0 ? 'bg-red-500' : i % 3 === 1 ? 'bg-blue-500' : 'bg-yellow-500'}`}
                        style={{ top: `${y}%`, left: `${x}%` }}
                        animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 1 + (i * 0.2), repeat: Infinity }}
                      />
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Нижняя секция - система мониторинга */}
          <div className="h-1/3 border border-red-700/30 rounded-md bg-red-950/30 p-3 overflow-y-auto">
            <div className="text-xs font-mono text-red-400 uppercase mb-3 flex items-center">
              <motion.div 
                className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              Log Monitor
            </div>
            
            {/* Логи системы безопасности */}
            <div className="font-mono text-xs text-red-300/70 space-y-1.5 h-[calc(100%-24px)] overflow-y-auto pb-2 scrollbar-thin scrollbar-track-red-900/10 scrollbar-thumb-red-700/30">
              {/* Текущая дата и время */}
              <div className="text-red-400/80 border-b border-red-700/20 pb-1 mb-1">
                {new Date().toISOString().replace('T', ' ').substring(0, 19)}
              </div>
              
              {/* Сгенерированные логи */}
              {[
                { time: '08:42:15', message: 'Security scan completed. Status: SECURE', color: 'text-green-400' },
                { time: '08:38:27', message: 'Blocked unauthorized access attempt from 187.23.45.112', color: 'text-red-400' },
                { time: '08:35:19', message: 'Militech security protocol breach detected and contained', color: 'text-yellow-400' },
                { time: '08:31:04', message: 'Firewall rules updated. New rules: 247', color: 'text-blue-400' },
                { time: '08:22:51', message: 'Neural monitoring system activated', color: 'text-purple-400' },
                { time: '08:17:33', message: 'Daily backup complete. Encryption verified', color: 'text-green-400' },
                { time: '08:12:09', message: 'Arasaka connection secured via quantum tunnel', color: 'text-blue-400' },
                { time: '08:05:46', message: 'Kang Tao security certificate updated', color: 'text-yellow-400' },
                { time: '07:58:22', message: 'System kernel hardening complete', color: 'text-green-400' },
                { time: '07:45:17', message: 'Malicious code detected in Night Corp data packet', color: 'text-red-400' },
              ].map((log, idx) => (
                <motion.div 
                  key={idx}
                  className="flex"
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                >
                  <span className="text-red-500/70 mr-2">[{log.time}]</span>
                  <span className={log.color}>{log.message}</span>
                </motion.div>
              ))}
              
              {/* Декоративные HEX строки в конце */}
              <div className="mt-2 pt-2 border-t border-red-700/20">
                {randomHex.map((hex, idx) => (
                  <div key={idx} className="font-mono text-[8px] text-red-400/40 mb-0.5">
                    {hex}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Нижняя полоса со статусом */}
      <div className="h-6 mt-4 bg-red-950/80 border border-red-700/30 rounded-sm px-2 flex items-center justify-between">
        <div className="text-[10px] font-mono text-red-300/70 flex items-center">
          <motion.div 
            className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          NEBULA SECURITY PROTOCOL: ACTIVE
        </div>
        
        <div className="flex items-center space-x-4">
          {selectedCorpData ? (
            <div className="text-[10px] font-mono text-red-300/70">
              SELECTED: {selectedCorpData.name} | SEC: {selectedCorpData.securityLevel}%
            </div>
          ) : (
            <div className="text-[10px] font-mono text-red-300/70">
              NO CORPORATION SELECTED
            </div>
          )}
          
          <div className="text-[10px] font-mono text-red-300/70">
            LOG: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Уведомление о копировании */}
      {showCopyAlert && (
        <div className="fixed left-1/2 bottom-16 z-[9999] -translate-x-1/2 px-6 py-2 rounded bg-red-900/90 border border-red-500/60 text-red-200 font-mono text-sm shadow-lg animate-fade-in-out">
          Fragment copied: <span className="font-bold">ALPHA-7F1C</span>
        </div>
      )}
    </div>
  );
};

export default SecurityTab; 