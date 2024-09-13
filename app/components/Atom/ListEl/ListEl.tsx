import Link from "next/link";
import React from "react";
import styles from "./ListEl.module.scss";
export interface IElement {
  id: string;
  label: string;
  url: string;
  icon?: string;
}
function ListEl({ el }: { el: IElement }) {
  return (
    <li className={styles.listEl}>
      <Link href={el.url}>
        {/* <img src={el.icon} alt={el.label} /> */}
        <div className={styles.iconContainer}>
          <div className={styles.iconTest} />
        </div>
        <p>{el.label}</p>
      </Link>
    </li>
  );
}

export default ListEl;
