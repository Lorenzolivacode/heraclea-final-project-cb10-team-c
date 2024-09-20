import React from "react";
import styles from "./esplora.module.scss";
import ButtonLink from "@/app/[locale]/components/Atom/ButtonLink/ButtonLink";
import { useTranslations } from "next-intl";

function Esplora() {
  const t = useTranslations("ExploraPage");
  return (
    <main className={styles.main}>
      <div className={styles.title}>
        <h1>{t("title")}</h1>
      </div>
      <div className={styles.buttonContainer}>
        <ButtonLink
          text={t("btnExursion")}
          href={"/escursioni_page"}
        ></ButtonLink>
        <ButtonLink text={t("btnPath")} href={"/category_home/2"}></ButtonLink>
      </div>
    </main>
  );
}

export default Esplora;
