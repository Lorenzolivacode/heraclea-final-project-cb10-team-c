import React from "react";
import styles from "./Footer.module.scss";

import UlEl from "../UlEl/UlEl";

const listFooter = [
  {
    id: crypto.randomUUID(),
    url: "/account_user",
    label: "Account",
    icon: "/icons/footer-icons/account.svg",
  },
  {
    id: crypto.randomUUID(),
    url: "/audioguide",
    label: "Audioguida",
    icon: "/icons/footer-icons/Headphone.svg",
  },
  {
    id: crypto.randomUUID(),
    url: "/acquista_page",
    label: "Biglietti",
    icon: "/icons/footer-icons/Two-Tickets.svg",
  },
  {
    id: crypto.randomUUID(),
    url: "/teatri_pietra",
    label: "Eventi",
    icon: "/icons/footer-icons/calendar.svg",
  },
  {
    id: crypto.randomUUID(),
    url: "/esplora_page",
    label: "Esplora",
    icon: "/icons/footer-icons/Trekking.svg",
  },
];
function Footer() {
  return (
    <footer className={styles.footer}>
      <UlEl array={listFooter} />
    </footer>
  );
}

export default Footer;
