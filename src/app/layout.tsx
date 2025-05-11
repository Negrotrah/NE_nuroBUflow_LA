import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NebulaProvider } from "@/contexts/NebulaContext";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "NeuroFlow - Каталог нейросетей",
  description: "Ваш каталог передовых нейросетей для любых задач",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <NebulaProvider>
          {children}
        </NebulaProvider>
      </body>
    </html>
  );
}
