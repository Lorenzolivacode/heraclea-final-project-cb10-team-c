"use client";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import styles from './Eventi.module.scss';
import EventButton from "@/app/components/Atom/EventButton/EventButton";

export default function TeatriPietra() {
  const router = useRouter();

  return (
    <main className="main">
      <h1>Teatri di Pietra</h1>
      <section className={styles.hero}>
        <Image
          src="/assets/eventi_1.webp"
          alt="Teatri di Pietra"
          width={400}
          height={300}
          className={styles.heroImage}
        />
      </section>
      <EventButton
        text="Scopri gli eventi"
        onClick={() => router.push("/")}
      />
      <section className={styles.hero}>
        <Image
          src="/assets/eventi-bg.webp" 
          alt="Spettacolo Teatri di Pietra"
          width={400}
          height={300}
          className={styles.heroImage}
        />
      </section>
    </main>
  );
}
