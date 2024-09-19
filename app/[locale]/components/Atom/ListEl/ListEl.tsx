"use client";
import Link from "next/link";
import React from "react";
import styles from "./ListEl.module.scss";
import Image from "next/image";
import { usePathname } from "next/navigation";

export interface IElement {
  id: string;
  label: string;
  url: string;
  icon?: string;
  iconActive?: string;
}
function ListEl({ el }: { el: IElement }) {
  /* const { pathname } = useRouter(); */
  const pathname = usePathname();

  const isActive = el.url === pathname;
  return (
    <li className={styles.listEl}>
      <Link href={el.url}>
        {el.icon && (
          <Image
            src={el.iconActive && isActive ? el.iconActive : el.icon}
            alt={el.label}
            className={styles.iconTest}
            width={35}
            height={35}
          />
        )}

        {/* <img src={el.icon} alt={el.label} className={styles.iconContainer} /> */}
        {/* <div className={styles.iconContainer}>
          <div className={styles.iconTest} />
        </div> */}
        <p>{el.label}</p>
      </Link>
    </li>
  );
}

export default ListEl;
