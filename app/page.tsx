"use client";

import SignIn from "./(routes)/sign_in/page";
import Card from "./components/Molecoles/Card/Card";
import styles from "./Home.module.scss";
import eracleaData from "./data";
import { Key, useState } from "react";
import Toast from "./components/Atom/Toast/Toast";

const labels = {
  titleEraclea: "Uno sguardo su Eraclea...",
  citEraclea:
    "“Eraclea Minoa, dove le antiche rovine sfiorano il mare e la bellezza eterna vive nel silenzio della storia.”",
  citArchimede:
    "“Superare le proprie limitazioni e divenire signori dell'universo.”",
  citArchiLabel: "Archimede",
};
export default function HomePage() {
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
