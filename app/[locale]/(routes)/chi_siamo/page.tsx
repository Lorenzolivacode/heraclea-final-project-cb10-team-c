import React from "react";
import styles from "./credits.module.scss";
import { useTranslations } from "next-intl";
import Image from "next/image";

function Credits() {
  const t = useTranslations("CreditsPage");

  const credits = [
    {
      id: 3,
      title: "titleArray3",
      text: "txtArray3",
      team: [
        { name: "Gennaro Samuele" },
        { name: "Nurkovic Lejla" },
        { name: "Miceli Lidia" },
        { name: "Miosi Roberta" },
        { name: "Oliva Lorenzo" },
      ],
    },
  ];
  return (
    <div className={styles.main}>
      <h1>{t("title")}</h1>
      <div className={styles.img}>
        <Image
          layout="responsive"
          width={800}
          height={800}
          src="/assets/7496-sienna.webp"
          alt="mask image"
        />
      </div>
      <div className={styles.textBox}>
        <p>{t("paragraph")}</p>
        {credits.map((credit) => (
          <div className={styles.credit_container} key={credit.id}>
            <h3>{t(credit.title)}</h3>
            <p>{t(credit.text)}</p>
            {credit.team && (
              <ul className={styles.team}>
                {credit.team.map((member, i) => (
                  <li key={i}>
                    <p className={styles.link_txt}>{member.name}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Credits;
