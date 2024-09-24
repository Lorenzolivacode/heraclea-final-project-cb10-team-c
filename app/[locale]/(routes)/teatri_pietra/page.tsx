import Image from "next/image";
import styles from "./Eventi.module.scss";
import ButtonLink from "@/app/[locale]/components/Atom/ButtonLink/ButtonLink";
import { useTranslations } from "next-intl";

export default function TeatriPietra() {
  const t = useTranslations("EventDetail");
  return (
    <section className={styles.hero}>
      <Image
        src="/assets/eventi_1.webp"
        alt="Teatri di Pietra"
        width={400}
        height={300}
        className={styles.heroImage}
      />

      <ButtonLink text={t("buttonEventPage")} href={"/teatri_pietra/eventi"} />

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
