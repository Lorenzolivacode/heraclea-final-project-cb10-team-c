import React, { Key } from "react";
import eracleaData from "@/app/data";
import styles from "./eraclea_page.module.scss";
import Card from "@/app/components/Molecoles/Card/Card";
import { ISubObj } from "@/app/Interface/Interface_eracleaData";

const labels = {
  titleEracleaDetail: "Scopri storia e natura",
};
function EracleaPage() {
  return (
    <main className="main">
      <h1>{labels.titleEracleaDetail}</h1>
      {eracleaData[0].subcategory.map((point: ISubObj) => {
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

export default EracleaPage;
