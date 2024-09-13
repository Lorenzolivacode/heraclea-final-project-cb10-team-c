import Link from "next/link";
import React from "react";
import styles from "./Footer.module.scss";

import imgFav from "@/app/favicon.ico";
import ListEl from "../../Atom/ListEl/ListEl";
import UlEl from "../UlEl/UlEl";

const listFooter = [
  {
    id: crypto.randomUUID(),
    url: "/Account",
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
    url: "/tickets",
    label: "Biglietti",
    icon: "/icons/footer-icons/Two-Tickets.svg",
  },
  {
    id: crypto.randomUUID(),
    url: "/events",
    label: "Eventi",
    icon: "/icons/footer-icons/calendar.svg",
  },
  {
    id: crypto.randomUUID(),
    url: "/explora",
    label: "Esplora",
    icon: "/icons/footer-icons/Trekking.svg",
  },
];
function Footer() {
  return (
    <footer className={styles.footer}>
      <UlEl array={listFooter} />
      {/* <ul>
        {listFooter.map((element, index) => {
          return (
            <>
              <ListEl key={element.id} el={element} />;
              {index + 1 !== listFooter.length && (
                <div className={styles.lineEl} />
              )}
            </>
          );
        })}
      </ul> */}
    </footer>
  );
}
{
  /* <li key={el.id}>
              <Link href={el.url}>
                <img src={el.icon} alt={el.label} />
                <div className={styles.iconContainer}>
                  <div className={styles.iconTest} />
                </div>
                <p>{el.label}</p>
              </Link>
            </li> */
}
export default Footer;
