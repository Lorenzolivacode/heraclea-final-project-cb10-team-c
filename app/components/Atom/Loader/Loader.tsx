"use client";
import React from "react";
import styles from "./Loader.module.scss";

export default function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <img src="/logoSienna.gif" alt="Logo" />
      <h4>Loading</h4>
    </div>
  );
}
