import React, { ReactNode } from 'react';

type I18nProviderProps = {
  children: ReactNode;
};

export default function I18nProvider({ children }: I18nProviderProps) {
  // Просто возвращаем дочерние компоненты без обработки
  return <>{children}</>;
} 