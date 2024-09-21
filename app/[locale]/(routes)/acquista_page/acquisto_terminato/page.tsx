import Image from "next/image";
import style from "@/app/[locale]/(routes)/acquista_page/acquisto_terminato/acquistoTerminato.module.scss";
import HeroImage from "@/public/assets/vasetti.webp";
import { Link } from "@/i18n/routing";
/* import QrCodeGenerator from "@/app/components/Molecoles/QR code/QrCodeGenerator"; */
import { useTranslations } from "next-intl";

function Purchase() {
  const t = useTranslations("AcquistoTerminatoPage");
  return (
    <>
      <div className={style.main}>
        <Image src={HeroImage} alt="vasi" priority={true} />
        <h1>{t("title")}</h1>
        <p>{t("textSuccess")}</p>
        <p>
          {t("ctaQR")} <Link href={"/account_user"}>QR code</Link>
        </p>
        {/*<QrCodeGenerator />*/}
      </div>
    </>
  );
}

export default Purchase;
