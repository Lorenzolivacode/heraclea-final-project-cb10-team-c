import React, { useMemo } from "react";
import eracleaData from "@/app/data";
import Card from "@/app/components/Molecoles/Card/Card";
import { ISubObj } from "@/app/Interface/Interface_eracleaData";
import dynamic from "next/dynamic";
import Loader from "@/app/components/Atom/Loader/Loader";

const labels = {
  titleEracleaDetail: "Scopri storia e natura",
};

interface CategoryProps {
  params: { id: string };
}

function CategoryPage({ params }: CategoryProps) {
  const { id } = params;
  const isArcheo = eracleaData.some(
    //scorro gli obj di eracleaData
    (category, index) => index === 1 && category.id === id
    //se trovo una corrispondenza con entrambe le condizioni, vuol dire che l'id di riferimento fa parte della categoria archeo
  );

  const catId = Number(id);
  let categoryIndex;
  if (!isNaN(catId)) {
    categoryIndex = catId - 1;
  }

  const obj = eracleaData.find((item) => item.id === id); // trovo la subcategory all'id di riferimento
  if (!obj || categoryIndex === undefined) {
    return (
      <main className="main">
        <h1>404 Not found</h1>
      </main>
    );
  }

  const Map = useMemo(
    () =>
      dynamic(() => import("@/app/components/Molecoles/Map/Map"), {
        loading: () => <Loader />,
        ssr: false,
      }),
    []
  );

  return (
    <main className="main">
      <h1>{obj.titleDetails.italian}</h1>
      {isArcheo && <Map posix={[37.394118, 13.28136]} zoom={17} />}
      {eracleaData[categoryIndex].subcategory.map((point: ISubObj) => {
        return (
          <Card
            key={point.id}
            roadmap={`/detail_page/${point.id}`}
            label={point.title.italian}
            image={point.images[0]}
          />
        );
      })}
    </main>
  );
}

export default CategoryPage;
