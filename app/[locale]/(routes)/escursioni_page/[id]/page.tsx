import { notFound } from "next/navigation";
import style from "./Id.module.scss";
import Button from "@/app/[locale]/components/Atom/Button/Button";
import { useTranslations } from "next-intl";
import Image from "next/image";

const getEscursioneById = (id: string) => {
  const arrayTest = [
    {
      id: "1",
      title: "titleCard1",
      image: "/assets/bici.webp",
    },
    { id: "2", title: "titleCard2", image: "/assets/cavallo.webp" },
    { id: "3", title: "titleCard3", image: "/assets/trekking.webp" },
  ];

  const escursione = arrayTest.find((item) => item.id === id);
  return escursione || null;
};

export default function EscursioneDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const t = useTranslations("EscursioniPage");

  const escursione = getEscursioneById(id);

  if (!escursione) {
    return notFound();
  }
  return (
    <main className={style.main}>
      <h1>{t(escursione.title)}</h1>
      <Image
        width={800}
        height={800}
        src={escursione.image}
        className={style.img}
        alt={`Escursione ${id}`}
      />
      <div className={style.bookingSection}>
        <h2>{t("titlePrenotazione")}</h2>
        <p>
          {t("textPrenotazione")}{" "}
          <a href="tel:+393339987565" className={style.phoneLink}>
            +39 333 9987565
          </a>
        </p>
        <Button text={t("buttonCTA")} />
      </div>
    </main>
  );
}
