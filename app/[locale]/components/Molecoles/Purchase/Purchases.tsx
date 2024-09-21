import React from "react";
import styles from "./purchases.module.scss";
import { useTranslations } from "next-intl";

const Purchases: React.FC = () => {
  const t = useTranslations("Purchases");
  const purchases = [
    { id: 1, item: "ticket", date: "2024-08-01", price: "15€" },
    { id: 2, item: "ticketTheatre", date: "2024-09-10", price: "5€" },
  ];

  return (
    <ul className={styles.purchasesList}>
      {purchases.map((purchase) => (
        <li key={purchase.id}>
          {t(purchase.item)} - {purchase.date} - {purchase.price}
        </li>
      ))}
    </ul>
  );
};

export default Purchases;
