"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import maschera from "@/public/assets/maschera.webp";
import styles from "./account.module.scss";
import { auth } from "@/app/[locale]/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get, onValue } from "firebase/database";
import { saveUserData } from "@/app/[locale]/firebase/database"; // Importa la funzione per salvare i dati utente

interface Ticket {
  id: string;
  type: string;
  quantity: number;
  price: number;
}

interface PaymentInfo {
  cardName: string;
  cardNumber: string;
  expiryDate: string;
  paymentMethod: string;
  selectedCard: string;
}

interface Order {
  id: string;
  date: string;
  total: number;
  tickets: Ticket[];
  userId: string;
  firstName: string;
  lastName: string;
  paymentInfo: PaymentInfo; // Aggiungi questa linea
}

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
}

const AccountPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"profile" | "orders">("orders");
  const [userData, setUserData] = useState<UserData>({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [orders, setOrders] = useState<Order[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserData>(userData);
  const searchParams = useSearchParams();
  const userName = userData.firstName || "Utente";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        const userDataFromDB = await fetchUserData(uid);
        setUserData(userDataFromDB);
        setFormData(userDataFromDB); // Aggiorna formData qui
        fetchOrders(uid);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserData = async (uid: string): Promise<UserData> => {
    const db = getDatabase();
    const userRef = ref(db, `users/${uid}`);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      console.log("Dati utente recuperati:", data); // Log dei dati utente
      return data as UserData;
    } else {
      console.error("Nessun dato trovato per questo utente.");
      return { firstName: "", lastName: "", email: "" };
    }
  };

  const fetchOrders = (userId: string) => {
    const db = getDatabase();
    const ordersRef = ref(db, "orders");
    onValue(ordersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const userOrders = Object.keys(data).filter(
          (orderId) => data[orderId].userId === userId
        );
        const orderList = userOrders.map((orderId) => ({
          id: orderId,
          date: data[orderId].date,
          total: data[orderId].total, // Assicurati che ci sia una proprietà "total" se esiste
          tickets: data[orderId].tickets || [], // Adatta in base alla tua struttura
        })) as Order[];
        setOrders(orderList);
      } else {
        setOrders([]);
      }
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleEdit = async () => {
    setIsEditing(!isEditing);

    if (isEditing) {
      console.log("Dati salvati:", formData);
      const user = auth.currentUser;
      if (user) {
        await saveUserData(user.uid, formData); // Salva i dati aggiornati
      }
    }
  };

  return (
    <main className="main">
      <div className={styles.profile}>
        <div className={styles.profileInfo}>
          <Image
            src={maschera}
            alt="Maschera"
            priority
            className={styles.profileImage}
          />
          <h1 className={styles.header}>Ciao, {userName}!</h1>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.tabs}>
          <button
            className={styles.button}
            onClick={() => setActiveTab("profile")}
          >
            Account
          </button>
          <button
            className={styles.button}
            onClick={() => setActiveTab("orders")}
          >
            Ordini
          </button>
        </div>

        {activeTab === "profile" ? (
          <form className={styles.form}>
            <div className={styles.formGroup}>
              <label>Nome:</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                disabled={!isEditing}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Cognome:</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                disabled={!isEditing}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                className={styles.input}
              />
            </div>
            <button
              type="button"
              onClick={toggleEdit}
              className={styles.button}
            >
              {isEditing ? "Salva" : "Modifica"}
            </button>
          </form>
        ) : (
          <div>
            {orders.length > 0 ? (
              orders.map((order) => (
                <div key={order.id}>
                  <h4>Data: {order.date}</h4>
                  <p>Totale: {order.total ? order.total.toFixed(2) : "N/A"}€</p>
                  <p>Metodo di pagamento: {order.paymentInfo.paymentMethod}</p>
                  <p>Tickets:</p>
                  <ul>
                    {order.tickets.map((ticket, index) => (
                      <li key={index}>
                        {ticket.quantity} x {ticket.type}
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <p>Non hai effettuato ordini.</p>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default AccountPage;
