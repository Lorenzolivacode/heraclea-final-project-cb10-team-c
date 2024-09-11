import Card from "./components/Molecoles/Card/Card";
import styles from "./Home.module.scss";

const arrayTest = [
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
];
export default function HomePage() {
  return (
    <>
      <main className={styles.main}>
        {arrayTest.map((point) => {
          return (
            <Card
              key={point.id}
              roadmap={point.roadmap}
              label={point.name}
              image={point.image}
            />
          );
        })}
      </main>
    </>
  );
}
