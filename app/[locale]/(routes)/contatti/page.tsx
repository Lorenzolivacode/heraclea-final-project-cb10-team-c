import React from "react";
import styles from "./contatti.module.scss";
/* import ListEl from "@/app/components/Atom/ListEl/ListEl";
import { title } from "process"; */
import UlEl from "@/app/[locale]/components/Molecoles/UlEl/UlEl";
import { useTranslations } from "next-intl";

const labelTxt = {
  titleWWA: "titleWWA",
  tell: "tell",
  map: "map",
  email: "email",
  bus: "bus",
  busTxt: "busTxt",
  train: "train",
  trainTxt: "trainTxt",
};

const contactArray = [
  {
    id: crypto.randomUUID(),
    label: "tell",
    icon: "/icons/contacts-icons/icon-phone.svg",
    url: "tel: +390000000000",
  },
  {
    id: crypto.randomUUID(),
    label: "map",
    icon: "/icons/contacts-icons/icon-map.svg",
    url: "https://www.google.com/maps?ll=37.393672,13.282562&z=16&t=h&hl=en&gl=IT&mapclient=embed&cid=16706615244174831018",
  },
  {
    id: crypto.randomUUID(),
    label: "email",
    icon: "/icons/contacts-icons/icon-email.svg",
    url: "https://mail.google.com",
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

function Contacts() {
  const t = useTranslations("Contatti");
  return (
    <main className="main">
      <h1 className={styles.title}>{t(labelTxt.titleWWA)}</h1>
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

      <UlEl
        array={contactArray.map((contact) => ({
          ...contact,
          label: t(contact.label),
        }))}
      />
      {/* <UlEl array={contactArray} /> */}
      {/* <ul>
        {contactArray.map((contact, index) => {
          return (
            <>
              <ListEl key={contact.id} el={contact} />
              {index + 1 !== contactArray.length && (
                <div className={styles.lineEl} />
              )}
            </>
          );
        })}
      </ul> */}
      {descriptionArray.map((description) => {
        return (
          <div key={description.id} className={styles.container_txt}>
            <h2>{t(description.title)}</h2>
            <p>{t(description.description)}</p>
          </div>
        );
      })}
    </main>
  );
}

export default Contacts;
