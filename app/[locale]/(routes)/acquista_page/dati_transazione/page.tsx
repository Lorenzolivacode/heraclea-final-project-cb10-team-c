"use client";
import Image from "next/image";
import { useRouter } from "@/i18n/routing";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue, update, remove } from "firebase/database";
import style from "./pagamento.module.scss";
import TrashOutline from "@/public/icons/pagamenti/trash-outline.svg";
import CheckSienna from "@/public/icons/pagamenti/check-sienna.svg";
import PencilOutline from "@/public/icons/pagamenti/pencil-outline.svg";
import ModalPayment from "@/app/[locale]/components/Molecoles/ModalPayment/ModalPayment";
import Counter from "@/app/[locale]/components/Atom/Counter/Counter";

function DataPayment() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingOrder, setEditingOrder] = useState<string | null>(null);
  const [updatedTickets, setUpdatedTickets] = useState<any>({});

  const fetchOrders = (userId: string) => {
    const db = getDatabase();
    const ordersRef = ref(db, `orders`);
    const unsubscribeOrders = onValue(ordersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const userOrders = Object.keys(data).filter(
          (orderId) => data[orderId].userId === userId
        );
        const orderList = userOrders.map((orderId) => {
          const order = data[orderId];
          return {
            id: orderId,
            date: order.date,
            tickets: Object.entries(order.tickets || []).map(
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

    // Cleanup per rimuovere il listener sugli ordini
    return () => unsubscribeOrders();
  };

  useEffect(() => {
    const auth = getAuth();
    const db = getDatabase();

    const unsubscribeAuth = onAuthStateChanged(auth, (authenticatedUser) => {
      if (authenticatedUser) {
        setUser(authenticatedUser);
        const unsubscribeOrders = fetchOrders(authenticatedUser.uid);

        // Cleanup per il listener sugli ordini
        return () => unsubscribeOrders();
      } else {
        setUser(null);
      }
    });

    // Cleanup per il listener dell'autenticazione
    return () => unsubscribeAuth();
  }, []);

  const handleTicketChange = (
    orderId: string,
    ticketId: string,
    newQuantity: number
  ) => {
    setUpdatedTickets((prevTickets: any) => {
      // Evita di aggiornare lo stato se la quantità non è cambiata
      const currentQuantity = prevTickets[orderId]?.[ticketId] || null;
      if (currentQuantity === newQuantity) {
        return prevTickets;
      }

      return {
        ...prevTickets,
        [orderId]: {
          ...prevTickets[orderId],
          [ticketId]: newQuantity,
        },
      };
    });
  };

  useEffect(() => {
    console.log("Updated tickets:", updatedTickets);
    console.log("Orders:", orders);
  }, [updatedTickets, orders]);

  const updateOrder = (orderId: string) => {
    const db = getDatabase();
    const orderRef = ref(db, `orders/${orderId}/tickets`);

    update(orderRef, updatedTickets[orderId])
      .then(() => {
        console.log("Ordine aggiornato con successo.");
        setEditingOrder(null); // Chiudi la modalità di modifica
        setUpdatedTickets({}); // Resetta i ticket aggiornati
      })
      .catch((error) => {
        console.error("Errore durante l'aggiornamento dell'ordine:", error);
      });
  };

  const deleteOrder = (orderId: string) => {
    const orderRef = ref(getDatabase(), `orders/${orderId}`); // Corretto con le backtick
    remove(orderRef)
      .then(() => {
        console.log("Ordine eliminato con successo!");
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order.id !== orderId)
        );
      })
      .catch((error) => {
        console.error("Errore nell'eliminare l'ordine:", error);
      });
  };

  const calculateOrderTotal = (order: any) => {
    return order.tickets
      .reduce((total: number, ticket: any) => {
        const quantity =
          updatedTickets[order.id]?.[ticket.id] || ticket.quantity;
        return total + parseFloat(ticket.price) * quantity;
      }, 0)
      .toFixed(2);
  };

  const calculateGrandTotal = () => {
    return orders
      .reduce(
        (total: number, order: any) =>
          total + parseFloat(calculateOrderTotal(order)),
        0
      )
      .toFixed(2);
  };

  return (
    <div className={style.main}>
      <div className={style.riepilogoContainer}>
        <h1>Riepilogo Ordine</h1>
        {loading ? (
          <p>Caricamento in corso...</p>
        ) : orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={index} className={style.order}>
              <h4>Data: {order.date}</h4>
              {order.tickets.map((ticket: any, idx: number) => (
                <div key={idx}>
                  <p>
                    {ticket.quantity} x {ticket.type} ={" "}
                    {(ticket.quantity * ticket.price).toFixed(2)}€
                  </p>
                  {editingOrder === order.id && (
                    <Counter
                      value={
                        updatedTickets[order.id]?.[ticket.id] || ticket.quantity
                      }
                      onChange={(newQuantity: number) =>
                        handleTicketChange(order.id, ticket.id, newQuantity)
                      }
                    />
                  )}
                </div>
              ))}
              <div className={style.totalOrder}>
                <h3>Totale Ordine: {calculateOrderTotal(order)}€</h3>
                {editingOrder === order.id ? (
                  <Image
                    src={CheckSienna}
                    alt="confirm"
                    width={30}
                    onClick={() => updateOrder(order.id)} // Conferma modifica
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <Image
                    src={PencilOutline}
                    alt="edit"
                    width={25}
                    onClick={() => setEditingOrder(order.id)} // Inizia modifica
                    style={{ cursor: "pointer" }}
                  />
                )}
                <Image
                  src={TrashOutline}
                  alt="delete"
                  width={30}
                  onClick={() => deleteOrder(order.id)} // Elimina ordine
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
          ))
        ) : (
          <p>Non ci sono ordini registrati.</p>
        )}
        <h2>Totale Complessivo: {calculateGrandTotal()}€</h2>
      </div>

      <h2>Inserisci dati di pagamento</h2>

      <ModalPayment />
    </div>
  );
}

export default DataPayment;
