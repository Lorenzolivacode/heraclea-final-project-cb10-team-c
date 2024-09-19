import React from "react";
import styles from "./UlEl.module.scss";
import ListEl, { IElement } from "../../Atom/ListEl/ListEl";

function UlEl({ array }: { array: IElement[] }) {
  return (
    <ul className={styles.ul_el}>
      {array.map((contact, index) => {
        return (
          <React.Fragment key={contact.id || index}>
            <ListEl key={contact.id || index} el={contact} />
            {index + 1 !== array.length && (
              <div key={crypto.randomUUID()} className={styles.lineEl} />
            )}
          </React.Fragment>
        );
      })}
    </ul>
  );
}

export default UlEl;
