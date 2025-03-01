
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import MainLayout from "./mainLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StylowaMC",
  description: "Oficjalna strona StylowaMC - Najlepszego serwera Minecraft Oneblock oraz Survival w Polsce",
};

//To prevent a home page to flash just use 'return router.push("...")' instead of 'router.push("...")'. Thus you won't see the home page if you're not signed in. Also can use 'loading' variable coming second from useAuthState hook to render some fallback component. So there won't be any need of adding session storage item.

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       <MainLayout>
        {children}
       </MainLayout>
      </body>
    </html>
  );
}
