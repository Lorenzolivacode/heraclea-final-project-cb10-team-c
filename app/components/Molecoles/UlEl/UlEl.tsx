import React from "react";
import styles from "./UlEl.module.scss";
import ListEl, { IElement } from "../../Atom/ListEl/ListEl";

function UlEl({ array }: { array: IElement[] }) {
  return (
    <ul className={styles.ul_el}>
      {array.map((contact, index) => {
        return (
          <>
            <ListEl key={contact.id} el={contact} />
            {index + 1 !== array.length && <div className={styles.lineEl} />}
          </>
        );
      })}
    </ul>
  );
}

export default UlEl;
