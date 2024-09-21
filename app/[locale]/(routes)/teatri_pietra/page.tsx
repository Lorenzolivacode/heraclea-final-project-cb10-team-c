import Image from "next/image";
import styles from "./Eventi.module.scss";
import ButtonLink from "@/app/[locale]/components/Atom/ButtonLink/ButtonLink";

export default function TeatriPietra() {
  return (
    <section className={styles.hero}>
      <Image
        src="/assets/eventi_1.webp"
        alt="Teatri di Pietra"
        width={400}
        height={300}
        className={styles.heroImage}
      />

      <ButtonLink text="Scopri gli eventi" href={"/teatri_pietra/eventi"} />

      <Image
        src="/assets/eventi-bg.webp"
        alt="Spettacolo Teatri di Pietra"
        width={400}
        height={300}
        className={styles.heroImage}
      />
    </section>
  );
}

{
  /* <main className={styles.mainPage}>
</main> */
}
