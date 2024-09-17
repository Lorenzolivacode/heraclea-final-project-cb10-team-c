"use client";

import style from '@/app/(routes)/teatri_pietra/Eventi.module.scss';
import Card from '@/app/components/Molecoles/Card/Card';

const arrayTest = [
  { name: "Andromaca", image: "/assets/andromaca.webp", id: "1", roadmap: "/eventi_page/1" },
  { name: "Euridice e Orfeo", image: "/assets/euridice.webp", id: "2", roadmap: "/eventi_page/2" },
  { name: "Ulisse racconta Ulisse", image: "/assets/ulisse_r.webp", id: "3", roadmap: "/eventi_page/3" },
];

export default function Eventi() {
  return (
    <main className="main">
      <h1 className={style.title}>Eventi</h1>
      {arrayTest.map((point) => (
        <Card
          key={point.id}
          roadmap={point.roadmap}
          label={point.name}
          image={point.image}
        />
      ))}
    </main>
  );
}
