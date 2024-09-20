"use client";

import React from "react";
import Loader from "./components/Atom/Loader/Loader";
import styles from "./Home.module.scss";

export default function Loading() {
  return (
    <div className={styles.loadingPage}>
      <Loader />
    </div>
  );
}
