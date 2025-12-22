import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Provider } from "@/components/pages/layout/Provider";
import Navbar from "@/components/pages/layout/Navbar";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import Footer from "@/components/pages/layout/Footer";
import FloatingActionButton from "@/components/pages/layout/FloatingActionButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ENTHUSIAST RUN",
  description: "Enthusiast Run is a premier fun run event by IBM Student Union, Universitas Ciputra. Discover our routes, partnership opportunities, and 5K/10K categories.",
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
