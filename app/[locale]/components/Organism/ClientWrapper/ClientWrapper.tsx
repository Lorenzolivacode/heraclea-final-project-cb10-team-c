"use client";
import { useState } from "react";
import Header from "@/app/[locale]/components/Molecoles/Header/Header";
import Footer from "../../Molecoles/Footer/Footer";
import { TicketPriceProvider } from "@/app/[locale]/TicketsContext/TicketsContext"; // Assicurati di aggiornare il percorso
import { ModalAudioProvider } from "@/app/[locale]/ModalAudioContext/ModalAudioContext";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <ModalAudioProvider>
        <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

        <TicketPriceProvider> {children}</TicketPriceProvider>
        <Footer setIsMenuOpen={setIsMenuOpen} />
      </ModalAudioProvider>
    </>
  );
}
