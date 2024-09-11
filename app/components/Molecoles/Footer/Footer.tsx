import Link from "next/link";
import React from "react";
import styles from "./Footer.module.scss";

import imgFav from "@/app/favicon.ico";

const listFooter = [
  {
    id: crypto.randomUUID(),
    url: "",
    label: "Account",
    icon: "@/app/favicon.ico",
  },
  {
    id: crypto.randomUUID(),
    url: "",
    label: "Audioguida",
    icon: "@/app/favicon.ico",
  },
  {
    id: crypto.randomUUID(),
    url: "",
    label: "Biglietti",
    icon: "@/app/favicon.ico",
  },
  {
    id: crypto.randomUUID(),
    url: "",
    label: "Eventi",
    icon: "@/app/favicon.ico",
  },
  {
    id: crypto.randomUUID(),
    url: "",
    label: "Esplora",
    icon: "@/app/favicon.ico",
  },
];
function Footer() {
  return (
    <footer className={styles.footer}>
      <ul>
        {listFooter.map((el) => {
          return (
            <li key={el.id}>
              <Link href={el.url}>
                {/* <img src={el.icon} alt={el.label} /> */}
                <div className={styles.iconContainer}>
                  <div className={styles.iconTest} />
                </div>
                <p>{el.label}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </footer>
  );
}

export default Footer;
