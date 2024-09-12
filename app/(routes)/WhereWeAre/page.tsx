import React from "react";
import styles from "./WhereWeAre.module.scss";
import ListEl from "@/app/components/Atom/ListEl/ListEl";
import { title } from "process";
const labelTxt = {
  titleWWA: "Dove siamo",
  tell: "Chiama",
  map: "Mappa",
  email: "Email",
  bus: "Bus",
  busTxt:
    "L'area archeologica è collegata con Palermo, Catania ed Agrigento con servizio di pullman di linea.",
  train: "Treno",
  trainTxt:
    "La stazione ferroviaria più vicina è quella di Agrigento Centrale, che dista 40 Km.",
};

const contactArray = [
  {
    id: crypto.randomUUID(),
    label: "Chiama",
    icon: "",
    url: "",
  },
  {
    id: crypto.randomUUID(),
    label: "Mappa",
    icon: "",
    url: "",
  },
  {
    id: crypto.randomUUID(),
    label: "Email",
    icon: "",
    url: "",
  },
];

const descriptionArray = [
  {
    id: crypto.randomUUID(),
    title: labelTxt.bus,
    description: labelTxt.busTxt,
  },
  {
    id: crypto.randomUUID(),
    title: labelTxt.train,
    description: labelTxt.trainTxt,
  },
];
function WhereWeAre() {
  return (
    <main className={styles.main}>
      <h1>{labelTxt.titleWWA}</h1>
      <iframe
        className={styles.map}
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2868.5083000060963!2d13.279766953618033!3d37.39444700932113!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x131a65f668cbce15%3A0xe7d9d20c942aadaa!2sParking!5e1!3m2!1sen!2sit!4v1726136788441!5m2!1sen!2sit"
        width="100%"
        height="300"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <ul>
        {contactArray.map((contact) => {
          return <ListEl key={contact.id} el={contact} />;
        })}
      </ul>
      {descriptionArray.map((description) => {
        return (
          <div key={description.id} className={styles.container_txt}>
            <h2>{description.title}</h2>
            <p>{description.description}</p>
          </div>
        );
      })}
    </main>
  );
}

export default WhereWeAre;
