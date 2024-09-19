"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
import Image from "next/image";
import Link from "next/link";
import style from "./account.module.scss";
import QrCodeGenerator from "@/app/components/Molecoles/QRcode/QrCodeGenerator";
import Button from "@/app/components/Atom/Button/Button";
import maschera from "@/public/assets/maschera.webp";

const AccountPage = () => {
  const [user, setUser] = useState<any>(null);
  const [tickets, setTickets] = useState<
    { id: string; name: string; date?: string }[]
  >([]);
  const [selectedEvent, setSelectedEvent] = useState<{
    name: string;
    id: string;
  } | null>(null);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const router = useRouter(); // Per gestire la navigazione

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (authenticatedUser) => {
      if (authenticatedUser) {
        setUser(authenticatedUser);
        fetchOrders(authenticatedUser.uid); // Chiama fetchOrders con l'uid dell'utente
      } else {
        setUser(null);
        // Se non autenticato, reindirizza a /login
        router.push("/login");
      }
    });
  }, []);

  const fetchOrders = (userId: string) => {
    const db = getDatabase();
    const ordersRef = ref(db, `orders/${userId}`);

    onValue(ordersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const ticketList: { id: string; name: string; date?: string }[] = [];
        Object.keys(data).forEach((orderId) => {
          const order = data[orderId];
          if (order.tickets) {
            order.tickets.forEach((ticket: any) => {
              ticketList.push({
                id: orderId,
                name: ticket.type,
                date: order.date,
              });
            });
          }
        });
        setTickets(ticketList); // Aggiorna lo stato con i biglietti
      } else {
        console.log("Nessun dato trovato per l'utente.");
      }
    });
  };

  const handleEventClick = (event: { name: string; id: string }) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  return (
    <main className="main">
      <h1>Ciao, {user ? user.displayName : "Utente"}</h1>
      <div className={style.container}>
        <Image
          src={maschera}
          alt="maschera"
          priority={true}
          className={style.profileImage}
        />
        <div className={style.sections}>
          <button
            onClick={() => setShowTicketModal(!showTicketModal)}
            className={style.ticketButton}
          >
            I tuoi biglietti
          </button>
        </div>
        <div className={style.sections}>
          <Link href="/audioguide">Le tue audioguide</Link>
        </div>
        <div className={style.sections}>
          <h2>Eventi</h2>
          {tickets.length > 0 ? (
            tickets.map((ticket, index) => (
              <p
                key={index}
                className={style.eventItem}
                onClick={() =>
                  handleEventClick({ name: ticket.name, id: ticket.id })
                }
              >
                {ticket.name} -{" "}
                {ticket.date ? ticket.date : "Data non disponibile"}
              </p>
            ))
          ) : (
            <p>Non hai eventi registrati.</p>
          )}
        </div>
      </div>

      {showTicketModal && (
        <div className={style.modalOverlay}>
          <div className={style.modalContent}>
            <QrCodeGenerator />
            <Button
              onClick={() => setShowTicketModal(false)}
              className={style.closeButton}
              text="Chiudi"
            />
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
            <Button
              onClick={() => setShowEventModal(false)}
              className={style.closeButton}
              text="Chiudi"
            />
          </div>
        </div>
      )}
    </main>
  );
};

export default AccountPage;
