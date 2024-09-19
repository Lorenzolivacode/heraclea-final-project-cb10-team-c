"use client";

import React from "react";
import styles from "./esplora.module.scss";
import BigButton from "@/app/[locale]/components/Atom/BigButton/BigButton";
import { useRouter } from "@/i18n/routing";

function Esplora() {
  const router = useRouter();
  return (
    <main className={styles.main}>
      <h1>Esplora</h1>
      <div className={styles.buttonContainer}>
        <BigButton
          text="ESCURSIONI"
          onClick={() => router.push("/escursioni_page")}
        ></BigButton>
        <BigButton
          text="PERCORSI"
          onClick={() => router.push("/category_home/2")}
        ></BigButton>
      </div>
    </main>
  );
}

export default Esplora;
