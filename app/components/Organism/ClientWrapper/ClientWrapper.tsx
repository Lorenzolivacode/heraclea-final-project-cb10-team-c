"use client";
import { useState } from "react";
import Header from "@/app/components/Molecoles/Header/Header";
import Footer from "../../Molecoles/Footer/Footer";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      {children}
      <Footer setIsMenuOpen={setIsMenuOpen} />
    </>
  );
}
