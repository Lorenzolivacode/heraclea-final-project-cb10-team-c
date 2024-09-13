import Card from "./../../components/Molecoles/Card/Card";
import styles from "./../../Home.module.scss";
import style from "./Escursioni.module.scss";

const arrayTest = [
  {
    name: "In Bici tra Storia e Natura",
    image: "/",
    id: "1",
    roadmap: "#",
  },
  {
    name: "Passeggiata a Cavallo",
    image: "/",
    id: "2",
    roadmap: "#",
  },
  {
    name: "Trekking alla Foce",
    image: "/",
    id: "3",
    roadmap: "#",
  },
];


export default function Excursion() {
  return (
    <>
      <main className={styles.main}>
      <h1 className={style.title}>Escursioni</h1>
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