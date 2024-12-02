import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Providers } from "@/components/providers";
import { Toaster } from "sonner";
import dynamic from 'next/dynamic';
import { Suspense } from "react";

const AuthToast = dynamic(() => import('@/components/AuthToast').then((mod) => mod.AuthToast));


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Vizuu",
  description: "Quiz generating app"
};

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
        <Providers>
        <Navbar />
        {children}
        <Toaster richColors/>
        <Suspense fallback={null}>
            <AuthToast />
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
