"use client";

import { useRouter } from "next/router";
import { notFound } from "next/navigation";
import eventiData from "@/app/event_data";
import style from "./EventiDetail.module.scss";
import Button from "@/app/components/Atom/Button/Button";
import { IEventObj } from "@/app/Interface/Interface_eracleaData";

interface UserProps {
  params: { id: string };
}

export default function EventDetail({ params }: UserProps) {
  /* const router = useRouter();
  const { id } = router.query as { id?: string }; */
  const { id } = params;

  const event = eventiData.find((item: IEventObj) => item.id === id);

  if (!event) {
    return notFound();
  }

  return (
    <main className={style.main}>
      <h1 className={style.titolo}>{event.name.italian}</h1>
        <img src={event.image} 
        className={style.img} 
        alt={`Evento ${id}`} />
        <p className={style.paragraph}>{event.paragraph1}</p>
      <div className={style.detailsSection}>
        <h2>Trama</h2>
        <p>{event.description.italian}</p>
        <Button text="Acquista" 
        onClick={() => alert("Acquista clicked")} />
      </div>
    </main>
  );
}
