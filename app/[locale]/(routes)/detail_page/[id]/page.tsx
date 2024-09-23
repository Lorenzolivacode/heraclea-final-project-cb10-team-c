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
    .map((category) => category.subcategory) // map degli obj di eracleaData con le subcategory
    .flat() //array di tutte le subcategory
    .find((item) => item.id === id); //subcategory all'id di riferimento

  if (
    eracleaData.some(
      (category, index) =>
        index === 1 && category.subcategory.some((item) => item.id === id) //confronto l'id di riferimento con gli id presenti nelle subcategori del secondo obj
      //se si trova una corrispondenza con entrambe le condizioni, vuol dire che l'id di riferimento fa parte della categoria archeo
    )
  ) {
    archeo = true;
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
