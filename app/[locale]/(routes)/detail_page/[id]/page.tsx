import React from "react";
import { useTranslations } from "next-intl";

import eracleaData from "@/app/[locale]/data";
import Carousel from "@/app/[locale]/components/Molecoles/Carousel/Carousel";
import SliderBA from "@/app/[locale]/components/Molecoles/SliderBA/SliderBA";

interface UserProps {
  params: { id: string };
}
function DetailPage({ params }: UserProps) {
  const t = useTranslations("eracleaDataSubcategory");
  const { id } = params;
  let archeo = false;

  const obj = eracleaData
    .map((category) => category.subcategory) // mappo gli obj di eracleaData con le subcategory
    .flat() //creo un array di tutte le subcategory
    .find((item) => item.id === id); // trovo la subcategory all'id di riferimento

  if (
    eracleaData.some(
      //scorro gli obj di eracleaData
      (category, index) =>
        index === 1 && category.subcategory.some((item) => item.id === id) //conftonto l'id di riferimento con gli id presenti nelle subcategori del secondo obj
      //se trovo una corrispondenza con entrambe le condizioni, vuol dire che l'id di riferimento fa parte della categoria archeo
    )
  ) {
    archeo = true; // quindi, setto archeo a true
  }

  if (!obj) {
    return (
      <main className="main">
        <h1>404 Not found</h1>
      </main>
    );
  }
  return (
    <main className="main">
      {!archeo ? (
        <Carousel images={obj.images} />
      ) : (
        <SliderBA imgA={obj.images[0]} imgB={obj.images[2]} />
      )}
      <h1>{t(obj.title)}</h1>
      <p>{t(obj.description)}</p>
    </main>
  );
}

export default DetailPage;
