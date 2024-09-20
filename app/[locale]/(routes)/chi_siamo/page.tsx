import React from "react";
import styles from "./credits.module.scss";
import { useTranslations } from "next-intl";
import Link from "next/link";

function Credits() {
  const t = useTranslations("CreditsPage");

  const credits = [
    {
      id: 1,
      title: "titleArray1",
      text: "txtArray1",
    },
    {
      id: 2,
      title: "titleArray2",
      text: "txtArray2",
    },
    {
      id: 3,
      title: "titleArray3",
      text: "txtArray3",
      team: [
        { name: "Gennare Samuele", githubUrl: "samuelegen" },
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
      <img src="/assets/maschera.webp" alt="mask image" />
      <div className={styles.textBox}>
        <p>{t("paragraph")}</p>
        {credits.map((credit) => (
          <div key={credit.id}>
            <h3>{t(credit.title)}</h3>
            <p>{t(credit.text)}</p>
            {credit.team && (
              <ul className={styles.team}>
                {credit.team.map((member) => (
                  <li>
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
