"use client";
import { useState } from "react";
import Header from "@/app/components/Molecoles/Header/Header";
import Footer from "../../Molecoles/Footer/Footer";
import { TicketPriceProvider } from "@/app/TicketsContext/TicketsContext"; // Assicurati di aggiornare il percorso

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <TicketPriceProvider> {children}</TicketPriceProvider>
      <Footer setIsMenuOpen={setIsMenuOpen} />
    </>
  );
}
