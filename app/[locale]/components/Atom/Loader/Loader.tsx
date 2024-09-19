"use client";
import React from "react";
import styles from "./Loader.module.scss";
import Image from "next/image";

export default function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <Image
        src={"/logoSienna.gif"}
        alt="Logo"
        width={150}
        height={150}
        unoptimized
      />
      <h4>Loading</h4>
    </div>
  );
}
