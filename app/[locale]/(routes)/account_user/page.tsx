"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import maschera from "@/public/assets/maschera.webp";
import styles from "./account.module.scss";
import { auth } from "@/app/[locale]/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get, onValue } from "firebase/database";
import { saveUserData } from "@/app/[locale]/firebase/database";
import { useTranslations } from "next-intl";

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
  paymentInfo: PaymentInfo;
}

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  paymentInfo: PaymentInfo; // Aggiungi paymentInfo qui
}

const AccountPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"profile" | "orders">("orders");
  const [userData, setUserData] = useState<UserData>({
    firstName: "",
    lastName: "",
    email: "",
    paymentInfo: {
      cardName: "",
      cardNumber: "",
      expiryDate: "",
      paymentMethod: "",
      selectedCard: "",
    },
  });
  const [orders, setOrders] = useState<Order[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserData>(userData);
  const searchParams = useSearchParams();
  const userName = userData.firstName || "Utente";
  const t = useTranslations("AccountPage");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        const userDataFromDB = await fetchUserData(uid);
        setUserData(userDataFromDB);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setFormData(userData); // Aggiorna formData ogni volta che userData cambia
  }, [userData]);

  const fetchUserData = async (uid: string): Promise<UserData> => {
    const db = getDatabase();
    const userRef = ref(db, `users/${uid}`);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      console.log("Dati utente recuperati:", data);
      return {
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        email: data.email || null, // Assicurati che sia string | null
        paymentInfo: {
          cardName: data.paymentInfo.cardName || "",
          cardNumber: data.paymentInfo.cardNumber || "",
          expiryDate: data.paymentInfo.expiryDate || "",
          paymentMethod: data.paymentInfo.paymentMethod || "",
          selectedCard: data.paymentInfo.selectedCard || "",
        },
      };
    } else {
      console.error("Nessun dato trovato per questo utente.");
      return {
        firstName: "",
        lastName: "",
        email: "", // Imposta a null se non trovato
        paymentInfo: {
          cardName: "",
          cardNumber: "",
          expiryDate: "",
          paymentMethod: "",
          selectedCard: "",
        },
      };
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
          total: data[orderId].total || 0,
          tickets: data[orderId].tickets || [],
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
            {t("buttonAccount")}
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
                  <p>Totale: {order.total.toFixed(2)}€</p>
                  <p>
                    Metodo di pagamento:{" "}
                    {order.paymentInfo?.paymentMethod || "N/A"}
                  </p>
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
