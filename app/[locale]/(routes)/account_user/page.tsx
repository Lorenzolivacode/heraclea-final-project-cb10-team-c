"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/[locale]/firebase/config";
import { getDatabase, ref, get, onValue } from "firebase/database";
import { saveUserData } from "@/app/[locale]/firebase/database";
import Image from "next/image";
import ModalQR from "@/app/[locale]/components/Molecoles/ModalQR/ModalQR";
import maschera from "@/public/assets/maschera.webp";
import style from "./account.module.scss";

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
  paymentInfo: PaymentInfo;
}

const AccountPage = () => {
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
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userName = userData.firstName || "Utente";
  const t = useTranslations("AccountPage");

  const openModal = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTicket(null);
  };

  const buttonColors = {
    profile: {
      background:
        activeTab === "profile" ? "var(--c-white)" : "var(--c-sienna)",
      color: activeTab === "profile" ? "var(--c-sienna)" : "var(--c-white)",
    },
    orders: {
      background: activeTab === "orders" ? "var(--c-white)" : "var(--c-sienna)",
      color: activeTab === "orders" ? "var(--c-sienna)" : "var(--c-white)",
    },
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        const userDataFromDB = await fetchUserData(uid);
        setUserData(userDataFromDB);
        fetchOrders(uid); // Fetch orders after user data is set
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setFormData(userData);
  }, [userData]);

  const fetchUserData = async (uid: string): Promise<UserData> => {
    const db = getDatabase();
    const userRef = ref(db, `users/${uid}`);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      return {
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        email: data.email || "",
        paymentInfo: {
          cardName: data.paymentInfo.cardName || "",
          cardNumber: data.paymentInfo.cardNumber || "",
          expiryDate: data.paymentInfo.expiryDate || "",
          paymentMethod: data.paymentInfo.paymentMethod || "",
          selectedCard: data.paymentInfo.selectedCard || "",
        },
      };
    } else {
      return {
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
          paymentInfo: data[orderId].paymentInfo || {
            paymentMethod: "N/A",
          },
          userId: data[orderId].userId, // Se vuoi mantenere l'userId
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
      const user = auth.currentUser;
      if (user) {
        await saveUserData(user.uid, formData);
      }
    }
  };

  const handleTabChange = (tab: "profile" | "orders") => {
    setActiveTab(tab);
  };

  return (
    <main className={style.main}>
      <div className={style.profile}>
        <div className={style.profileInfo}>
          <Image
            src={maschera}
            alt="Maschera"
            priority
            className={style.profileImage}
          />
          <h1 className={style.header}>
            {t("greeting")} {userName}!
          </h1>
        </div>
      </div>
      <div className={style.container}>
        <div className={style.tabs}>
          <button
            className={style.button}
            onClick={() => handleTabChange("profile")}
            style={buttonColors.profile}
          >
            {t("buttonAccount")}
          </button>
          <button
            className={style.button}
            onClick={() => handleTabChange("orders")}
            style={buttonColors.orders}
          >
            {t("buttonPurchase")}
          </button>
        </div>

        {activeTab === "profile" ? (
          <form className={style.form}>
            <div className={style.formGroup}>
              <label>{t("name")}:</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                disabled={!isEditing}
                className={style.input}
              />
            </div>
            <div className={style.formGroup}>
              <label>{t("surname")}:</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                disabled={!isEditing}
                className={style.input}
              />
            </div>
            <div className={style.formGroup}>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                className={style.input}
              />
            </div>
            <button type="button" onClick={toggleEdit} className={style.button}>
              {isEditing ? `${t("save")}` : `${t("edit")}`}
            </button>
          </form>
        ) : activeTab === "orders" ? (
          <div className={style.purchasesList}>
            {orders.length > 0 ? (
              orders.map((order) => (
                <div key={order.id}>
                  <h4>
                    {t("date")}: {order.date}
                  </h4>
                  <p>
                    {t("total")}: {order.total.toFixed(2)}€
                  </p>
                  <p>
                    {t("paymentMethods")}{" "}
                    {order.paymentInfo.paymentMethod || "N/A"}
                  </p>
                  <p>{t("ticket")}:</p>
                  <ul>
                    {order.tickets.map((ticket, index) => (
                      <li key={index}>
                        {ticket.quantity} x {ticket.type}
                        <p onClick={() => openModal(ticket)}>QR Code</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <p>{t("order")}</p>
            )}
          </div>
        ) : null}
        <ModalQR
          isVisible={isModalOpen}
          onClose={closeModal}
          ticket={selectedTicket}
        ></ModalQR>
      </div>
    </main>
  );
};

export default AccountPage;
