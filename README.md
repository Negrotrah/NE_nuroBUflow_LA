# NuroFlow

NuroFlow - это современное веб-приложение, разработанное на базе Next.js с использованием TypeScript, предоставляющее интерактивный интерфейс с анимированным фоном и современным дизайном.

## 🚀 Portable Version / Портативная версия

**English:** 
To run the portable version of NuroFlow, you need to download the full archive separately. The repository doesn't include `node_modules` and `.next` directories due to their large size. Please contact the repository owner for access to the complete portable package that includes all necessary dependencies.

**Русский:**
Для запуска портативной версии NuroFlow необходимо скачать полный архив отдельно. Репозиторий не включает директории `node_modules` и `.next` из-за их большого размера. Пожалуйста, свяжитесь с владельцем репозитория для получения доступа к полному портативному пакету, который включает все необходимые зависимости.

## Особенности проекта

- Современный пользовательский интерфейс с анимированным фоном
- Построен на Next.js и TypeScript
- Использует Tailwind CSS для стилизации
- Адаптивный дизайн для различных устройств

## Установка и запуск

```bash
# Установка зависимостей
npm install
# или
yarn install

# Запуск сервера разработки
npm run dev
# или
yarn dev
```

Откройте [http://localhost:3000](http://localhost:3000) в вашем браузере, чтобы увидеть результат.

## Структура проекта

```
/neuroflow          # Основная директория проекта
├── /public         # Статические файлы
├── /src            # Исходный код
│   ├── /app        # App Router Next.js
│   ├── /components # React компоненты
│   ├── /styles     # CSS и стили
│   └── /utils      # Вспомогательные функции
├── .eslintrc.json  # Конфигурация ESLint
├── next.config.js  # Конфигурация Next.js
├── package.json    # Зависимости и скрипты
└── tsconfig.json   # Конфигурация TypeScript
```

## Развертывание

Для развертывания проекта вы можете использовать Vercel или любую другую платформу, поддерживающую Next.js приложения.

```bash
# Сборка проекта
npm run build
# или
yarn build
```

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
