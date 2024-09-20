"use client";

import React from "react";
import styles from "./esplora.module.scss";
import BigButton from "@/app/[locale]/components/Atom/BigButton/BigButton";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";

function Esplora() {
  const t = useTranslations("ExploraPage");
  const router = useRouter();
  return (
    <main className={styles.main}>
      <div className={styles.title}>
        <h1>{t("title")}</h1>
      </div>
      <div className={styles.buttonContainer}>
        <BigButton
          text={t("btnExursion")}
          onClick={() => router.push("/escursioni_page")}
        ></BigButton>
        <BigButton
          text={t("btnPath")}
          onClick={() => router.push("/category_home/2")}
        ></BigButton>
      </div>
    </main>
  );
}

export default Esplora;
