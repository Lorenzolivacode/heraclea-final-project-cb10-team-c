/* "use client"; */
import React, { useEffect, useState } from "react";
import eracleaData from "@/app/data";
import Carousel from "@/app/components/Molecoles/Carousel/Carousel";

interface UserProps {
  params: { id: string };
}
function DetailPage({ params }: UserProps) {
  /* const [archeo, setArcheo] = useState(false); */ //senza use client non serve lo useState
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

  /* const obj = eracleaData[0].subcategory.find((item) => item.id === id); */

  /* useEffect(() => {
    if (
      eracleaData.some(
        //scorro gli obj di eracleaData
        (category, index) =>
          index === 1 && category.subcategory.some((item) => item.id === id) //conftonto l'id di riferimento con gli id presenti nelle subcategori del secondo obj
        //se trovo una corrispondenza con entrambe le condizioni, vuol dire che l'id di riferimento fa parte della categoria archeo
      )
    ) {
      setArcheo(true); // quindi, setto archeo a true
    }
  }, [id]); */

  /* useEffect(() => {
    console.log("Params ID:", id);
    console.log("Data:", eracleaData[0].subcategory);
  }, []); */
  if (!obj) {
    return (
      <main className="main">
        <h1>404 Not found</h1>
      </main>
    );
  }
  return (
    <main className="main">
      {!archeo && <Carousel images={obj.images} />}
      <h1>{obj.title.italian}</h1>
      <p>{obj.description.italian}</p>
    </main>
  );
}

export default DetailPage;
