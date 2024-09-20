
import React from 'react';
import styles from './purchases.module.scss';

const Purchases: React.FC = () => {
  const purchases = [
    { id: 1, item: 'Biglietto Intero', date: '2024-08-01', price: '15€' },
    { id: 2, item: 'Teatri di Pietra', date: '2024-09-10', price: '5€' },
  ];

  return (
    <ul className={styles.purchasesList}>
      {purchases.map((purchase) => (
        <li key={purchase.id}>
          {purchase.item} - {purchase.date} - {purchase.price}
        </li>
      ))}
    </ul>
  );
};

export default Purchases;
