import Card from '@/app/components/Molecoles/Card/Card';
import styles from '@/app/Home.module.scss';
import style from './Escursioni.module.scss';


const arrayTest = [
  {
    name: "In Bici tra Storia e Natura",
    image: "/assets/bici.webp",
    id: "1",
    roadmap: "/escursioni/1", 
  },
  {
    name: "Passeggiata a Cavallo",
    image: "/assets/cavallo.webp",
    id: "2",
    roadmap: "/escursioni/2", 
  },
  {
    name: "Trekking alla Foce",
    image: "/assets/trekking.webp",
    id: "3",
    roadmap: "/escursioni/3", 
  },
];

export default function Excursion() {
  return (
    <main className={styles.main}>
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
