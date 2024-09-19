import Card from "@/app/[locale]/components/Molecoles/Card/Card";
import style from "./Escursioni.module.scss";

const arrayTest = [
  {
    name: "In Bici tra Storia e Natura",
    image: "/assets/bici.webp",
    id: "1",
    roadmap: "/escursioni_page/1",
  },
  {
    name: "Passeggiata a Cavallo",
    image: "/assets/cavallo.webp",
    id: "2",
    roadmap: "/escursioni_page/2",
  },
  {
    name: "Trekking alla Foce",
    image: "/assets/trekking.webp",
    id: "3",
    roadmap: "/escursioni_page/3",
  },
];

export default function Excursion() {
  return (
    <main className="main">
      <h1 className={style.title}>Escursioni</h1>
      {arrayTest.map((point) => (
        <Card
          key={point.id}
          roadmap={point.roadmap}
          label={point.name}
          image={point.image}
        />
      ))}
    </main>
  );
}
