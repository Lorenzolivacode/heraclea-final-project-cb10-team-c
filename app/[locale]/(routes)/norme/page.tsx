import style from "./norme.module.scss";
import { useTranslations } from "next-intl";
function Norme() {
  const t = useTranslations("Norme");
  return (
    <main className={style.main}>
      <h1 className={style.title}>{t("title")}</h1>
      <div className={style.container}>
        <p>{t("textIntro")}</p>
      </div>
      <div className={style.container}>
        <img
          src="/icons/norme-icons/people.svg"
          alt="people"
          width={35}
          height={35}
        />
        <p>{t("textChildren")}</p>
      </div>
      <div className={style.container}>
        <img
          src="/icons/norme-icons/Assistive_Technology.svg"
          alt="Assistive_logo"
          width={35}
          height={35}
        />
        <p>{t("textAssistiveTech")}</p>
      </div>
    </main>
  );
}

export default Norme;
