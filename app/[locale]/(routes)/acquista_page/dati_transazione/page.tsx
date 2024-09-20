"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue, update } from "firebase/database";
import style from "./pagamento.module.scss";
import ApplePay from "@/app/[locale]/components/Atom/ApplepayBtn/ApplePayBtn";
import GooglePayBtn from "@/app/[locale]/components/Atom/GooglePayBtn/GooglePayBtn";
import Paypal from "@/public/icons/pagamenti/paypal.svg";
import Button from "@/app/[locale]/components/Atom/Button/Button";
import SelectCarta from "@/app/[locale]/components/Molecoles/SelectCarta/SelectCarta";
import Counter from "@/app/[locale]/components/Atom/Counter/Counter";

const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  return (
    date.toLocaleDateString("it-IT", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }) +
    " " +
    date.toLocaleTimeString("it-IT", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );
};

function DataPayment() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingOrder, setEditingOrder] = useState<string | null>(null);
  const [updatedTickets, setUpdatedTickets] = useState<any>({});
  const [cardNumber, setCardNumber] = useState("");
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isFormValid, setIsFormValid] = useState(true);

  const fetchOrders = (userId: string) => {
    const db = getDatabase();
    const ordersRef = ref(db, `orders`);
    onValue(ordersRef, (snapshot) => {
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
  };

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (authenticatedUser) => {
      if (authenticatedUser) {
        setUser(authenticatedUser);
        fetchOrders(authenticatedUser.uid);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleTicketChange = (
    orderId: string,
    ticketId: string,
    newQuantity: number
  ) => {
    setUpdatedTickets((prevTickets: any) => ({
      ...prevTickets,
      [orderId]: {
        ...prevTickets[orderId],
        [ticketId]: newQuantity,
      },
    }));
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

  const validateForm = () => {
    return (
      cardNumber.length === 16 &&
      selectedCard !== null &&
      cardName.trim() !== "" &&
      expiryDate.trim() !== "" &&
      cvv.trim() !== ""
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      router.push("/acquista_page/acquisto_terminato");
    } else {
      setIsFormValid(false);
    }
  };

  useEffect(() => {
    setIsFormValid(true);
  }, [cardNumber, selectedCard, cardName, expiryDate, cvv]);

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
              </div>
              <Button
                text={
                  editingOrder === order.id ? "Conferma" : "Modifica Ordine"
                }
                onClick={() => {
                  if (editingOrder === order.id) {
                    updateOrder(order.id);
                  } else {
                    setEditingOrder(order.id);
                  }
                }}
              />
            </div>
          ))
        ) : (
          <p>Non ci sono ordini registrati.</p>
        )}
        <h2>Totale Complessivo: {calculateGrandTotal()}€</h2>
      </div>

      <h2>Inserisci dati di pagamento</h2>

      <div className={style.margin}>
        <div className={style.modal}>
          <form className={style.form} onSubmit={handleSubmit}>
            <div className={style.paymentother}>
              <ApplePay />
              <button name="paypal" type="button">
                <Image src={Paypal} alt="paypal" width={30} />
              </button>
              <GooglePayBtn />
            </div>
            <div className={style.separator}>
              <hr className={style.line} />
              <p>OR</p>
              <hr className={style.line} />
            </div>
            <div className={style.cardInfo}>
              <div className={style.input_container}>
                <label className={style.input_label}>Nome sulla carta</label>
                <input
                  className={style.input_field}
                  type="text"
                  placeholder="Inserisci il tuo nome completo"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  required
                />
              </div>
              <div className={style.input_container}>
                <label className={style.input_label}>Numero della carta</label>
                <div>
                  <SelectCarta
                    cardNumber={cardNumber}
                    setCardNumber={setCardNumber}
                    selectedCard={selectedCard}
                    setSelectedCard={setSelectedCard}
                  />
                </div>
              </div>
              <div className={style.input_container}>
                <label className={style.input_label}>
                  Data scadenza carta / CVV
                </label>
                <div className={style.split}>
                  <input
                    className={style.input_field}
                    placeholder="01/23"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    required
                  />
                  <input
                    className={style.input_field}
                    placeholder="CVV"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            <Button
              type="submit"
              text="Paga adesso"
              className={!isFormValid ? style.invalid : ""}
            />
            {!isFormValid && <p className={style.error}>Dati non validi</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default DataPayment;
