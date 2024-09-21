"use client";
import { useRouter } from "@/i18n/routing";
import Button from "@/app/[locale]/components/Atom/BigButton/BigButton";
import style from "./acquista.module.scss";
import { useTranslations } from "next-intl";

function Acquista() {
  const router = useRouter();
  const t = useTranslations("AcquistaPage");
  return (
    <>
      <div className={style.container}>
        <h1>{t("title")}</h1>
        <div className={style.mainButtons}>
          <Button
            text={t("buttonTickets")}
            onClick={() => router.push("/acquista_page/calendario")}
          />
          <Button
            text={t("buttonAudioguide")}
            onClick={() => router.push("/audioguide")}
          />
          <Button
            text={t("buttonEvents")}
            onClick={() => router.push("/teatri_pietra")}
          />
        </div>
      </div>
    </>
  );
}

export default Acquista;
