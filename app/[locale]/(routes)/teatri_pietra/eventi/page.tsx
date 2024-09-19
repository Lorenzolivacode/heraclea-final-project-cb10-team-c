"use client";
import style from "./../Eventi.module.scss";
import Card from "@/app/[locale]/components/Molecoles/Card/Card";
import eventiData from "@/app/[locale]/event_data";

export default function Eventi() {
  return (
    <main className="main">
      <h1 className={style.title}>Eventi</h1>
      {eventiData.map((point) => (
        <Card
          key={point.id}
          roadmap={point.roadmap}
          label={point.name.italian}
          image={point.image}
        />
      ))}
    </main>
  );
}
