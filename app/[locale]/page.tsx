"use client";

import Card from "./components/Molecoles/Card/Card";
import styles from "./Home.module.scss";
import eracleaData from "./data";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/[locale]/firebase/config";
import { Key, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import Sounder from "./components/Atom/Sounder/Sounder";
import SwitchLanguage from "./components/Atom/SwitchLanguage/SwitchLanguage";

//error simulation
// const session = null;

export default function HomePage() {
  const locale = useLocale(); // Ottieni la lingua corrente

  const t = useTranslations("HomePage");
  const tCat = useTranslations("eracleaDataCategory");
  //error simulation
  // if (!session) throw new Error("Example Error with Session!");

  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  /* console.log({ user }); */

  useEffect(() => {
    if (!loading && !user) {
      // Se l'utente non è loggato e non c'è stato un errore di caricamento
      router.push("/sign_up");
    } else if (user) {
      // L'utente è loggato, rimani sulla pagina
    }
  }, [user, loading, router]);

  const languageChangeHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.value;
    router.replace(`/${value}`);
  };
  /* const pathname = usePathname(); */
  /* useEffect(() => {
    console.log("locale", locale);
    console.log(pathname);
  }, []); */

  return (
    <>
      <main className="main">
        <h1>{t("titleEraclea")}</h1>
        <div className={styles.txt_container}>
          <p className={styles.cit}>{t("citEraclea")}</p>
          {/* <p className={styles.cit_label}>{labels.citArchiLabel}</p> */}
        </div>
        {/* <button value="en" onClick={languageChangeHandler}>
          English
        </button>
        <button value="it" onClick={languageChangeHandler}>
          Italiano
        </button> */}

        {eracleaData.map(
          (point: {
            id: string | null | undefined;
            roadmap: string;
            title: string;
            image: string;
          }) => {
            return (
              <Card
                key={point.id}
                roadmap={`${point.roadmap}${point.id}`}
                label={tCat(point.title)}
                image={point.image}
              />
            );
          }
        )}
      </main>
    </>
  );
}
