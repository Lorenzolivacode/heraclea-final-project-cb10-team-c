import React from "react";
import styles from "./Card.module.scss";
import Link from "next/link";

interface CardProps {
  label: string;
  children?: React.ReactNode;
  image: string;
  roadmap: string;
}
function Card({ label, children, image, roadmap }: CardProps) {
  return (
    <Link className={styles.card_section} href={roadmap}>
      {/* <section className={styles.card_section}>
      </section> */}
      <img src={image} alt={label} />
      <div className={styles.title_container}>
        <h2>{label}</h2>
        {children}
      </div>
    </Link>
  );
}

export default Card;
