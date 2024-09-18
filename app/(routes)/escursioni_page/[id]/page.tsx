import { notFound } from "next/navigation";
import styles from "@/app/Home.module.scss";
import style from "./Id.module.scss";
import Button from "@/app/components/Atom/Button/Button";

const getEscursioneById = async (id: string) => {
  const arrayTest = [
    {
      id: "1",
      title: "In bici tra storia e natura",
      image: "/assets/bici.webp",
    },
    { id: "2", title: "Passeggiata a Cavallo", image: "/assets/cavallo.webp" },
    { id: "3", title: "Trekking alla Foce", image: "/assets/trekking.webp" },
  ];

  const escursione = arrayTest.find((item) => item.id === id);
  return escursione || null;
};

export default async function EscursioneDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const escursione = await getEscursioneById(id);

  if (!escursione) {
    return notFound();
  }

  return (
    <main className={style.main}>
      <h1>{escursione.title}</h1>
      {/* <div className={style.imageContainer}> */}
      <img
        src={escursione.image}
        className={style.img}
        alt={`Escursione ${id}`}
      />
      {/* </div> */}
      <div className={style.bookingSection}>
        <h2>Prenota</h2>
        <p>
          Puoi prenotare chiamando il numero{" "}
          <a href="tel:+393339987565" className={style.phoneLink}>
            +39 333 9987565
          </a>
        </p>
        <Button text="Chiama" />
      </div>
    </main>
  );
}
