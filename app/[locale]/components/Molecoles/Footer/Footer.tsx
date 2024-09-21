import React, { Dispatch, SetStateAction } from "react";
import styles from "./Footer.module.scss";
import UlEl from "../UlEl/UlEl";

interface FooterProps {
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}

const listFooter = [
  {
    id: crypto.randomUUID(),
    url: "/account_user",
    label: "labelAccount",
    icon: "/icons/footer-icons/account.svg",
    iconActive: "/icons/footer-icons/account-fill.svg",
  },
  {
    id: crypto.randomUUID(),
    url: "/audioguide",
    label: "labelAudioguide",
    icon: "/icons/footer-icons/Headphone.svg",
    iconActive: "/icons/footer-icons/Headphone-fill.svg",
  },
  {
    id: crypto.randomUUID(),
    url: "/acquista_page",
    label: "labelTickets",
    icon: "/icons/footer-icons/Two-Tickets.svg",
    iconActive: "/icons/footer-icons/Two-Tickets-fill.svg",
  },
  {
    id: crypto.randomUUID(),
    url: "/teatri_pietra",
    label: "labelEvents",
    icon: "/icons/footer-icons/calendar.svg",
    iconActive: "/icons/footer-icons/calendar-fill.svg",
  },
  {
    id: crypto.randomUUID(),
    url: "/esplora_page",
    label: "labelExplore",
    icon: "/icons/footer-icons/Trekking.svg",
    iconActive: "/icons/footer-icons/Trekking-fill.svg",
  },
];
function Footer({ setIsMenuOpen }: FooterProps) {
  const handleClick = () => {
    setIsMenuOpen(false); // Chiude il menu quando si clicca sul footer
  };
  return (
    <footer className={styles.footer} onClick={handleClick}>
      <UlEl array={listFooter} />
    </footer>
  );
}

export default Footer;
