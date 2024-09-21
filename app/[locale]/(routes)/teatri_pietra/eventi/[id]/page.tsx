"use client";

import { useRouter } from "@/i18n/routing";
import { notFound } from "next/navigation";
import eventiData from "@/app/[locale]/event_data";
import style from "./EventiDetail.module.scss";
import Button from "@/app/[locale]/components/Atom/Button/Button";
import { IEventObj } from "@/app/[locale]/Interface/Interface_eracleaData";
import { useTranslations } from "next-intl";

interface UserProps {
  params: { id: string };
}

export default function EventDetail({ params }: UserProps) {
  const router = useRouter();
  const { id } = params;
  const t = useTranslations("EventDetail");

  const event = eventiData.find((item: IEventObj) => item.id === id);

  if (!event) {
    return notFound();
  }

  return (
    <main className={style.main}>
      <h1 className={style.titolo}>{t(event.title)}</h1>
      <img src={event.image} className={style.img} alt={`Evento ${id}`} />
      <p className={style.paragraph}>{t(event.credits)}</p>
      <div className={style.detailsSection}>
        <h3>{t("subtitle")}</h3>
        <p>{t(event.description)}</p>
        <Button
          text={t("buttonCTA")}
          onClick={() => router.push("/acquista_page/calendario")}
        />
      </div>
    </main>
  );
}
