"use client";
import style from "./../Eventi.module.scss";
import Card from "@/app/[locale]/components/Molecoles/Card/Card";
import eventiData from "@/app/[locale]/event_data";
import { useTranslations } from "next-intl";

export default function Eventi() {
  const t = useTranslations("EventDetail");
  return (
    <main className="main">
      <h1 className={style.title}>{t("title")}</h1>
      {eventiData.map((point) => (
        <Card
          key={point.id}
          roadmap={point.roadmap}
          label={t(point.title)}
          image={point.image}
        />
      ))}
    </main>
  );
}
