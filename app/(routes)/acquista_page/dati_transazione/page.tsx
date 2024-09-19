"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
import style from "@/app/(routes)/acquista_page/dati_transazione/pagamento.module.scss";
import ApplePay from "@/app/components/Atom/ApplepayBtn/ApplePayBtn";
import GooglePayBtn from "@/app/components/Atom/GooglePayBtn/GooglePayBtn";
import Paypal from "@/public/icons/pagamenti/paypal.svg";
import Button from "@/app/components/Atom/Button/Button";
import SelectCarta from "@/app/components/Molecoles/SelectCarta/SelectCarta";

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
  const [cardNumber, setCardNumber] = useState("");
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isFormValid, setIsFormValid] = useState(true);

  const [prices, setPrices] = useState<any>({});

  const fetchPrices = () => {
    const db = getDatabase();
    const pricesRef = ref(db, "prices");
    onValue(pricesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setPrices(data);
      }
    });
  };

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
            tickets: Object.values(order.tickets || []),
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
    fetchPrices();
  }, []);

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

  const calculateOrderTotal = (order: any) => {
    return order.tickets
      .reduce((total: number, ticket: any) => {
        return total + ticket.price * ticket.quantity;
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
                <p key={idx}>
                  {ticket.quantity} x {ticket.type} ={" "}
                  {(ticket.quantity * ticket.price).toFixed(2)}€
                </p>
              ))}
              <h2>Totale Ordine: {calculateOrderTotal(order)}€</h2>
            </div>
          ))
        ) : (
          <p>Non ci sono ordini registrati.</p>
        )}
        <h2>Totale Complessivo: {calculateGrandTotal()}€</h2>
        <Button
          text={"Modifica ordine"}
          onClick={() => router.push("/acquista_page/calendario")}
        />
      </div>

      <h2>Inserisci dati</h2>

      {/* FORM */}
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
            {!isFormValid && (
              <p className={style.errorMessage}>
                Per favore, compila tutti i campi.
              </p>
            )}
            <Button text="Avanti" type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default DataPayment;
