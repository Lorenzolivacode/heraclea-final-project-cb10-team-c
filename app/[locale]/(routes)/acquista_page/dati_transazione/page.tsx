"use client";
import Image from "next/image";
import { useRouter } from "@/i18n/routing";
import { useState, useEffect } from "react";
import {
  getAuth,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import { getDatabase, ref, onValue, update, remove } from "firebase/database";
import style from "./pagamento.module.scss";
import TrashOutline from "@/public/icons/pagamenti/trash-outline.svg";
<<<<<<< HEAD

import ModalPayment from "@/app/[locale]/components/Molecoles/ModalPayment/ModalPayment";
import { useTranslations } from "next-intl";
=======
import { useTranslations } from "next-intl";
import ModalPayment from "@/app/[locale]/components/Molecoles/ModalPayment/ModalPayment";
>>>>>>> a50b184c035f0606f5980c5af8b76e9fa92052e8

// Interfacce
interface Ticket {
  id: string;
  type: string;
  price: number;
  quantity: number;
}

interface UpdatedTickets {
  [orderId: string]: {
    [ticketId: string]: number; // ticketId come chiave e quantity come valore
  };
}

interface Order {
  id: string;
  date: string;
  tickets: Ticket[];
  timestamp: string;
}

interface User {
  uid: string;
  email: string | null;
  displayName?: string | null;
}

function DataPayment() {
  const router = useRouter();

  // Stati
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatedTickets, setUpdatedTickets] = useState<UpdatedTickets>({});
  const t = useTranslations("DatiTransazionePage");

  // Funzione per recuperare gli ordini
  const fetchOrders = (userId: string) => {
    const db = getDatabase();
    const ordersRef = ref(db, `orders`);
    onValue(ordersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const userOrders = Object.keys(data).filter(
          (orderId) => data[orderId].userId === userId
        );
        const orderList: Order[] = userOrders.map((orderId) => {
          const order = data[orderId];
          return {
            id: orderId,
            date: order.date,
            tickets: Object.entries(order.tickets || {}).map(
              ([ticketId, ticketData]: [string, any]) => ({
                id: ticketId,
                ...ticketData,
              })
            ),
            timestamp: order.timestamp,
          };
        });
        setOrders(orderList);
      } else {
        setOrders([]);
      }
      setLoading(false);
    });
  };

  // Effetto per gestire l'autenticazione
  useEffect(() => {
    const auth = getAuth();
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      (authenticatedUser: FirebaseUser | null) => {
        if (authenticatedUser) {
          const userData: User = {
            uid: authenticatedUser.uid,
            email: authenticatedUser.email,
            displayName: authenticatedUser.displayName,
          };
          setUser(userData);
          fetchOrders(authenticatedUser.uid); // Fetch ordini all'accesso
        } else {
          setUser(null);
          setOrders([]);
        }
      }
    );

    return () => unsubscribeAuth();
  }, []);

  // Imposta i biglietti iniziali
  useEffect(() => {
    if (orders.length > 0) {
      const initialTickets: UpdatedTickets = orders.reduce(
        (acc: UpdatedTickets, order) => {
          acc[order.id] = {};
          order.tickets.forEach((ticket) => {
            acc[order.id][ticket.id] = ticket.quantity;
          });
          return acc;
        },
        {}
      );
      setUpdatedTickets(initialTickets);
    } else {
      setUpdatedTickets({}); // Reset se non ci sono ordini
    }
  }, [orders]);

  // Funzione per eliminare un ordine
  const deleteOrder = async (orderId: string) => {
    try {
      const orderRef = ref(getDatabase(), `orders/${orderId}`);
      await remove(orderRef);
      console.log("Ordine eliminato con successo!");
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== orderId)
      );
    } catch (error) {
      setError("Errore nell'eliminare l'ordine. Riprova.");
      console.error("Errore:", error);
    }
  };

  // Calcola il totale di un ticket
  const calculateTicketTotal = (ticket: Ticket, quantity: number) => {
    const price =
      typeof ticket.price === "string"
        ? parseFloat(ticket.price)
        : ticket.price;
    return isNaN(price) ? 0 : price * quantity;
  };

  // Calcola il totale di un ordine
  const calculateOrderTotal = (order: Order) => {
    return order.tickets
      .reduce((total: number, ticket: Ticket) => {
        const quantity =
          updatedTickets[order.id]?.[ticket.id] || ticket.quantity;
        return total + calculateTicketTotal(ticket, quantity);
      }, 0)
      .toFixed(2);
  };

  // Calcola il totale complessivo
  const calculateGrandTotal = () => {
    return orders
      .reduce((total: number, order: Order) => {
        return total + parseFloat(calculateOrderTotal(order));
      }, 0)
      .toFixed(2);
  };

  return (
    <div className={style.main}>
      <div className={style.riepilogoContainer}>
        <h1>{t("title")}</h1>
        {loading ? (
          <p>{t("loading")}</p>
        ) : error ? (
          <p className={style.error}>{error}</p>
        ) : orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id} className={style.order}>
              <h4>
                {t("date")}: {order.date}
              </h4>
              {order.tickets.map((ticket) => (
                <div key={ticket.id}>
                  <p>
                    {ticket.quantity} x {ticket.type} ={" "}
                    {(ticket.quantity * ticket.price).toFixed(2)}€
                  </p>
                </div>
              ))}
              <div className={style.totalOrder}>
                <h3>Totale Ordine: {calculateOrderTotal(order)}€</h3>
                <Image
                  src={TrashOutline}
                  alt="delete"
                  width={30}
                  onClick={() => deleteOrder(order.id)}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
          ))
        ) : (
          <p>{t("orders")}</p>
        )}
        <h2>
          {t("finalTotal")}: {calculateGrandTotal()}€
        </h2>
      </div>

      <h2>{t("titlePayment")}</h2>
      <ModalPayment />
    </div>
  );
}

export default DataPayment;
