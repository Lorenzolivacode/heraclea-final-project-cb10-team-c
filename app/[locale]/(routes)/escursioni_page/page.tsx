import Card from "@/app/[locale]/components/Molecoles/Card/Card";
import style from "./Escursioni.module.scss";
import { useTranslations } from "next-intl";

function Excursions() {
  const t = useTranslations("EscursioniPage");

  const EscursioniCards = [
    {
      name: "titleCard1",
      image: "/assets/bici.webp",
      id: "1",
      roadmap: "/escursioni_page/1",
    },
    {
      name: "titleCard2",
      image: "/assets/cavallo.webp",
      id: "2",
      roadmap: "/escursioni_page/2",
    },
    {
      name: "titleCard3",
      image: "/assets/trekking.webp",
      id: "3",
      roadmap: "/escursioni_page/3",
    },
  ];

  return (
    <main className="main">
      <h1 className={style.title}>{t("title")}</h1>
      {EscursioniCards.map((card) => (
        <Card
          key={card.id}
          roadmap={card.roadmap}
          label={t(card.name)}
          image={card.image}
        />
      ))}
    </main>
  );
}

export default Excursions;
