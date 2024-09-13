import Card from '@/app/components/Molecoles/Card/Card';
import styles from '@/../../Home.module.scss';
import style from '@/app/escursioni/Escursioni.module.scss';


const arrayTest = [
  {
    name: "In Bici tra Storia e Natura",
    image: "/path/to/image1.jpg",
    id: "1",
    roadmap: "/escursioni/1", 
  },
  {
    name: "Passeggiata a Cavallo",
    image: "/path/to/image2.jpg",
    id: "2",
    roadmap: "/escursioni/2", 
  },
  {
    name: "Trekking alla Foce",
    image: "/path/to/image3.jpg",
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
