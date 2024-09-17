"use client";

import Card from "./components/Molecoles/Card/Card";
import styles from "./Home.module.scss";
import eracleaData from "./data";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { Key, useState } from "react";
import Toast from "./components/Atom/Toast/Toast";
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

  const [user] = useAuthState(auth);
  const router = useRouter();

  console.log({ user });

  if (!user) {
    router.push("/sign_up");
  }

  const [toastOpen, setToastOpen] = useState(true);
  return (
    <>
      <main className="main">
        {toastOpen && (
          <Toast
            type="success"
            onClose={() => setToastOpen(false)}
            message="Toast prova Toast prova Toast prova Toast prova"
          />
        )}
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
