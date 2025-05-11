'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

type NebulaContextType = {
  isNebulaMode: boolean;
  setNebulaMode: (value: boolean) => void;
  showNebulaTransition: boolean;
  setShowNebulaTransition: (value: boolean) => void;
};

const defaultContext: NebulaContextType = {
  isNebulaMode: false,
  setNebulaMode: () => {},
  showNebulaTransition: false,
  setShowNebulaTransition: () => {},
};

export const NebulaContext = createContext<NebulaContextType>(defaultContext);

export const NebulaProvider = ({ children }: { children: ReactNode }) => {
  const [isNebulaMode, setNebulaMode] = useState(false);
  const [showNebulaTransition, setShowNebulaTransition] = useState(false);

  // Обновляем атрибут data-nebula-active на HTML-элементе при изменении режима NEBULA
  useEffect(() => {
    // Используем документ только на стороне клиента
    if (typeof document !== 'undefined') {
      if (isNebulaMode) {
        document.documentElement.setAttribute('data-nebula-active', 'true');
      } else {
        document.documentElement.setAttribute('data-nebula-active', 'false');
      }
    }
  }, [isNebulaMode]);

  return (
    <NebulaContext.Provider
      value={{
        isNebulaMode,
        setNebulaMode,
        showNebulaTransition,
        setShowNebulaTransition,
      }}
    >
      {children}
    </NebulaContext.Provider>
  );
};

export const useNebula = () => useContext(NebulaContext); 