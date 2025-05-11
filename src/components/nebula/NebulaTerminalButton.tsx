import React from 'react';
import { motion } from 'framer-motion';

interface NebulaTerminalButtonProps {
  onClick: () => void;
}

const NebulaTerminalButton: React.FC<NebulaTerminalButtonProps> = ({ onClick }) => {
  return (
    <motion.div
      className="absolute top-[calc(25%+22rem)] right-4 z-50 pointer-events-auto"
      initial={{ 
        opacity: 0, 
        y: -10, 
        scale: 0.95, 
        filter: "brightness(0.6) blur(2px)" 
      }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        filter: "brightness(1) blur(0px)" 
      }}
      transition={{ delay: 2, duration: 1.5, ease: "easeOut" }}
    >
      {/* Декоративный фон с пульсирующим свечением */}
      <motion.div
        className="absolute inset-0 rounded-md"
        style={{ 
          background: 'radial-gradient(circle, rgba(220,38,38,0.2) 0%, rgba(0,0,0,0) 70%)',
          filter: 'blur(10px)',
          transform: 'scale(1.2)',
          zIndex: -1
        }}
        animate={{ 
          opacity: [0.4, 0.8, 0.4],
          scale: [1.2, 1.3, 1.2]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Угловые декоративные элементы в стиле киберпанк */}
      <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-red-500 opacity-80"></div>
      <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-red-500 opacity-80"></div>
      <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-red-500 opacity-80"></div>
      <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-red-500 opacity-80"></div>
      
      <motion.button
        className="relative flex items-center justify-center px-6 py-2.5
                  bg-gradient-to-r from-red-900/90 via-red-800/90 to-red-900/90
                  border-2 border-red-700/70 rounded-md
                  text-red-200 font-mono text-sm tracking-wider font-bold
                  shadow-[0_0_20px_rgba(220,0,0,0.4)]
                  backdrop-blur-sm
                  hover:bg-gradient-to-r hover:from-red-800/95 hover:via-red-700/95 hover:to-red-800/95
                  hover:border-red-500/90 hover:text-red-100
                  transition-all duration-200
                  overflow-hidden"
        onClick={onClick}
        whileHover={{ 
          scale: 1.05,
          boxShadow: '0 0 25px rgba(239,68,68,0.6)',
          textShadow: '0 0 5px rgba(255,255,255,0.5)'
        }}
        whileTap={{ scale: 0.97 }}
      >
        {/* Анимированная полоса свечения, проходящая через кнопку */}
        <motion.div 
          className="absolute top-0 left-0 h-full w-10 bg-gradient-to-r from-transparent via-red-400/30 to-transparent skew-x-[20deg]"
          animate={{ x: [-100, 300] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
          style={{ filter: 'blur(3px)' }}
        />
        
        {/* Иконка замка (отражает тему доступа) */}
        <motion.div 
          className="w-4 h-4 mr-2.5 text-red-400 relative" 
          animate={{ rotate: [0, 5, 0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-4 h-4"
            animate={{
              filter: [
                'drop-shadow(0 0 0px #f87171)',
                'drop-shadow(0 0 6px #f87171)',
                'drop-shadow(0 0 0px #f87171)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </motion.svg>
        </motion.div>
        
        <span className="relative">
          ACCESS_TERMINAL
          <motion.div 
            className="absolute -bottom-1 left-0 right-0 h-px bg-red-500/50"
            animate={{ 
              scaleX: [0.3, 1, 0.3], 
              opacity: [0.3, 0.6, 0.3] 
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
        
        {/* Пульсирующий индикатор справа */}
        <div className="ml-2.5 relative">
          <motion.div 
            className="w-2.5 h-2.5 rounded-full bg-red-600"
            animate={{ 
              opacity: [0.6, 1, 0.6],
              scale: [0.9, 1.1, 0.9],
              boxShadow: ['0 0 0px rgba(255, 0, 0, 0.3)', '0 0 8px rgba(255, 0, 0, 0.8)', '0 0 0px rgba(255, 0, 0, 0.3)']
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.div 
            className="absolute inset-0 rounded-full bg-transparent border-2 border-red-500/40"
            animate={{ 
              scale: [1, 1.8, 1],
              opacity: [0.7, 0, 0.7]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.button>
      
      {/* Декоративные линии */}
      <div className="mt-1.5 flex justify-center space-x-1">
        <motion.div 
          className="h-0.5 w-16 bg-gradient-to-r from-transparent via-red-700/60 to-transparent rounded-full"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="h-0.5 w-6 bg-red-600/50 rounded-full"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.div 
          className="h-0.5 w-10 bg-gradient-to-r from-transparent via-red-700/60 to-transparent rounded-full"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        />
      </div>
      
      {/* Дополнительная строка-индикатор с секретным сообщением */}
      <motion.div
        className="mt-1 text-[8px] font-mono text-red-500/70 text-center tracking-widest"
        animate={{ 
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <motion.span
          animate={{
            textShadow: ['0 0 3px rgba(239, 68, 68, 0)', '0 0 3px rgba(239, 68, 68, 0.5)', '0 0 3px rgba(239, 68, 68, 0)']
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          SYS:NEBULA//ACCESS-PROTOCOL-ACTIVE
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

export default NebulaTerminalButton; 