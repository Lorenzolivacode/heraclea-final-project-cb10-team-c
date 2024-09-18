"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import style from "./account.module.scss";
import QrCodeGenerator from "@/app/components/Molecoles/QRcode/QrCodeGenerator";
import Button from "@/app/components/Atom/Button/Button";
import maschera from "@/public/assets/maschera.webp"; 

const AccountPage = () => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("userName") || "Utente";

  const [tickets, setTickets] = useState<{ id: string; name: string }[]>([

  ]);
  
  const [selectedEvent, setSelectedEvent] = useState<{ name: string; id: string } | null>(null);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);

  const toggleTicketModal = () => {
    setShowTicketModal(!showTicketModal);
  };

  const toggleEventModal = (event: { name: string; id: string }) => {
    setSelectedEvent(event);
    setShowEventModal(!showEventModal);
  };

  return (
    <main className="main">
      <h1>Ciao, {userName}</h1>
      <div className={style.container}>
      <Image src={maschera} alt="maschera" priority={true} className={style.profileImage} />
        <div className={style.sections}>
          <button onClick={toggleTicketModal} className={style.ticketButton}>
            I tuoi biglietti
          </button>
        </div>
        <div className={style.sections}>
          <Link href="/audioguide">Le tue audioguide</Link>
        </div>
        <div className={style.sections}>
        <button onClick={toggleTicketModal} className={style.ticketButton}>
            Eventi
          </button>
          {tickets.map((ticket, index) => (
            <p
              key={index}
              onClick={() => toggleEventModal({ name: ticket.name, id: ticket.id })}
              className={style.eventItem}
            >
              {ticket.name}
            </p>
          ))}
        </div>
      </div>

      {showTicketModal && (
        <div className={style.modalOverlay}>
          <div className={style.modalContent}>
            <QrCodeGenerator />
            <Button onClick={toggleTicketModal} className={style.closeButton} text="Chiudi" />
          </div>
        </div>
      )}

      {showEventModal && selectedEvent && (
        <div className={style.modalOverlay}>
          <div className={style.modalContent}>
            <h2>Dettagli Evento: {selectedEvent.name}</h2>
            <p>Questa è la descrizione dell'evento.</p>
            <Link href={`/eventi/${selectedEvent.id}`}>
              <Button text="Acquista biglietti" className={style.buyButton} />
            </Link>
            <Button onClick={() => setShowEventModal(false)} className={style.closeButton} text="Chiudi" />
          </div>
        </div>
      )}
    </main>
  );
};

export default AccountPage;
