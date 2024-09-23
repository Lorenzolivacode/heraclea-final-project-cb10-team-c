import React from "react";
import styles from "./credits.module.scss";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";

function Credits() {
  const t = useTranslations("CreditsPage");

  const credits = [
    {
      id: 3,
      title: "titleArray3",
      text: "txtArray3",
      team: [
        { name: "Gennaro Samuele", githubUrl: "samuelegen" },
        { name: "Nurkovic Lejla", githubUrl: "LejNur" },
        { name: "Miceli Lidia", githubUrl: "lidiamiceli" },
        { name: "Miosi Roberta", githubUrl: "RobertaMi89" },
        { name: "Oliva Lorenzo", githubUrl: "Lorenzolivacode" },
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
          src="/assets/maschera.webp"
          alt="mask image"
        />
      </div>
      <div className={styles.textBox}>
        <p>{t("paragraph")}</p>
        {credits.map((credit) => (
          <div key={credit.id}>
            <h3>{t(credit.title)}</h3>
            <p>{t(credit.text)}</p>
            {credit.team && (
              <ul className={styles.team}>
                {credit.team.map((member, i) => (
                  <li key={i}>
                    <Link
                      target="_blank"
                      className={styles.link}
                      href={`https://github.com/${member.githubUrl}`}
                    >
                      {member.name}
                    </Link>
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
