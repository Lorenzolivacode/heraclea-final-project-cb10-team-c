"use client";
import { useState } from "react";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "./components/Molecoles/Footer/Footer";
import Header from "./components/Molecoles/Header/Header";
import Menu from "./components/Molecoles/Menu/Menu";
import InitialPage from "./(routes)/InitialPage/page";

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
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showHamburger, setShowHamburger] = useState(false);

  return (
    <html lang="it">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        {/* <Header setShowHamburger={setShowHamburger} showMenu={showHamburger}  /> */}
        {/* {showHamburger && <Menu />} */}
          <InitialPage/>
        {/* {children} */}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
