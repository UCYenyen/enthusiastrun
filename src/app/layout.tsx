import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components/pages/Layout/Provider";
import Navbar from "@/components/pages/Layout/Navbar";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import Footer from "@/components/pages/Layout/Footer";
import FloatingActionButton from "@/components/pages/Layout/FloatingActionButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ENTHUSIAST FUN RUN",
  description: "ENTHUSIAST FUN RUN 2026",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider session={session}>
          <Navbar />
          {children}
          <Footer />
          <FloatingActionButton />  
        </Provider>
      </body>
    </html>
  );
}
