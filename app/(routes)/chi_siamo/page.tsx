import React from "react";
import styles from "./credits.module.scss";

const credits = [
  {
    id: 1,
    title: "Contributori Locali",
    text: `Ringraziamo [Nome Storico/Archeologo] per la preziosa consulenza storica, [Nome Fotografo] per le splendide fotografie del sito di Eraclea Minoa, e [Nome Guida Locale] per il loro supporto nella raccolta di informazioni culturali e storiche.`,
  },
  {
    id: 2,
    title: "Comune e Ufficio Turistico",
    text: `Un ringraziamento speciale al Comune di [Regione] e all'Ufficio Turistico di [Regione] per la collaborazione nella fornitura di materiali storici e immagini. Grazie anche al Museo Archeologico di Eraclea Minoa per il contributo di manufatti e dati storici.`,
  },
  {
    id: 3,
    title: "Team di Sviluppo",
    text: `L'app è stata realizzata da un team di sviluppo (MIGLIORE AL MONDO) dedicato, che ha lavorato per offrire un'esperienza interattiva e coinvolgente del sito storico.`,
  },
  {
    id: 4,
    title: "Licenza",
    text: `Tutti i contenuti sono utilizzati con il permesso dei rispettivi proprietari e l'app è concessa sotto licenza [Tipo di Licenza].`,
  },
];

function Credits() {
  return (
    <div className={styles.main}>
      <h1>Credits</h1>
      <img src="/assets/maschera.webp" alt="mask image" />
      <div className={styles.textBox}>
        <p>
          {`Quest'app è stata creata per valorizzare il patrimonio storico di Eraclea Minoa e offrire ai visitatori un'esperienza immersiva e informativa. Grazie alla collaborazione di esperti locali e istituzioni, siamo riusciti a integrare contenuti culturali e strumenti tecnologici per esplorare al meglio il sito.`}
        </p>
        {credits.map((credit) => (
          <div key={credit.id}>
            <h3>{credit.title}</h3>
            <p>{credit.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Credits;
