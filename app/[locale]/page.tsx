"use client";

import Card from "./components/Molecoles/Card/Card";
import styles from "./Home.module.scss";
import eracleaData from "./data";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/[locale]/firebase/config";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";

export default function HomePage() {
  const t = useTranslations("HomePage");
  const tCat = useTranslations("eracleaDataCategory");

  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      // Se l'utente non è loggato e non c'è stato un errore di caricamento
      router.push("/sign_up");
    } else if (user) {
      // L'utente è loggato, rimani sulla pagina
    }
  }, [user, loading, router]);

  return (
    <>
      <main className="main">
        <h1>{t("titleEraclea")}</h1>
        <div className={styles.txt_container}>
          <p className={styles.cit}>{t("citEraclea")}</p>
        </div>

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
