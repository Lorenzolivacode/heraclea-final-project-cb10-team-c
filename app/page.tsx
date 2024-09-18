"use client";

import Card from "./components/Molecoles/Card/Card";
import styles from "./Home.module.scss";
import eracleaData from "./data";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { Key, useEffect } from "react";
import { useRouter } from "next/navigation";

const labels = {
  titleEraclea: "Uno sguardo su Eraclea...",
  citEraclea:
    "“Eraclea Minoa, dove le antiche rovine sfiorano il mare e la bellezza eterna vive nel silenzio della storia.”",
  citArchimede:
    "“Superare le proprie limitazioni e divenire signori dell'universo.”",
  citArchiLabel: "Archimede",
};

//error simulation
// const session = null;

export default function HomePage() {
  //error simulation
  // if (!session) throw new Error("Example Error with Session!");

  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  console.log({ user });

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
        <h1>{labels.titleEraclea}</h1>
        <div className={styles.txt_container}>
          <p className={styles.cit}>{labels.citEraclea}</p>
          {/* <p className={styles.cit_label}>{labels.citArchiLabel}</p> */}
        </div>
        {eracleaData.map(
          (point: {
            id: Key | null | undefined;
            roadmap: string;
            title: {
              italian: string;
              english: string;
              french: string;
              spanish: string;
            };
            image: string;
          }) => {
            return (
              <Card
                key={point.id}
                roadmap={`${point.roadmap}${point.id}`}
                label={point.title.italian}
                image={point.image}
              />
            );
          }
        )}
      </main>
    </>
  );
}
