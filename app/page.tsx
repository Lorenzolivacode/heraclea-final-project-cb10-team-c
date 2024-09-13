import SignIn from "./(routes)/sign_in/page";
import Card from "./components/Molecoles/Card/Card";
import styles from "./Home.module.scss";
import eracleaData from "./data";
import { Key } from "react";

/* const renderCard = [
  {
    name: "Eraclea Minoa",
    image: "https://www.itbeach.it/wp-content/uploads/2020/02/0070074-1.jpg",
    id: "1",
    roadmap: "#",
  },
  {
    name: "L'area archeologica",
    image: "https://www.selinunte.net/Eraclea_teatro.jpg",
    id: "2",
    roadmap: "#",
  },
]; */

const labels = {
  titleEraclea: "Uno sguardo su Eraclea...",
  citArchimede:
    "“Superare le proprie limitazioni e divenire signori dell'universo.”",
  citLabel: "Archimede",
};
export default function HomePage() {
  return (
    <>
      <main className="main">
        <h1>{labels.titleEraclea}</h1>
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
                roadmap={point.roadmap}
                label={point.title.italian}
                image={point.image}
              />
            );
          }
        )}
        {/* {renderCard.map((point) => {
          return (
            <Card
              key={point.id}
              roadmap={point.roadmap}
              label={point.name}
              image={point.image}
            />
          );
        })} */}

        <div className={styles.txt_container}>
          <p className={styles.cit}>{labels.citArchimede}</p>
          <p className={styles.cit_label}>{labels.citLabel}</p>
        </div>
      </main>
    </>
  );
}
