import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SIMPLEIN School — One School. One Connected System.",
  description:
    "SIMPLEIN School brings school administration, student records, attendance, academics and communication together in one organised platform by SIMPLEIN SOLUTIONS LLP.",
  keywords: [
    "School Management System",
    "School ERP",
    "Student Information System",
    "Attendance Management",
    "Timetable Software",
    "Report Card Generator",
    "SIMPLEIN Solutions",
  ],
  authors: [{ name: "SIMPLEIN SOLUTIONS LLP", url: "https://www.simpleinsolutions.com/" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-white text-[#111111] font-sans antialiased">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
