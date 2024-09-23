import style from "./acquista.module.scss";
import { useTranslations } from "next-intl";
import ButtonLink from "../../components/Atom/ButtonLink/ButtonLink";

function Acquista() {
  const t = useTranslations("AcquistaPage");
  return (
    <>
      <div className={style.container}>
        <div className={style.title}>
          <h1>{t("title")}</h1>
        </div>
        <div className={style.mainButtons}>
          <ButtonLink
            text={t("buttonTickets")}
            href={"/acquista_page/calendario"}
          />
          <ButtonLink text={t("buttonAudioguide")} href={"/audioguide"} />
          <ButtonLink text={t("buttonEvents")} href={"/teatri_pietra"} />
        </div>
      </div>
    </>
  );
}

export default Acquista;
