import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
// import { Inter } from "next/font/google";


// const inter = Inter({
//   variable: "--font-inter",
//   subsets: ["latin"],
// });


export const metadata: Metadata = {
  title: "Md Arifur Rahman Sajid",
  description: "Md Arifur Rahman Sajid",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={` overflow-x-hidden  antialiased`}
        suppressHydrationWarning
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
