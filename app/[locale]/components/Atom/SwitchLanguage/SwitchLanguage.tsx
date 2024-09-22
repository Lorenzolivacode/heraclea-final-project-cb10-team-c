"use client";
import React, { ChangeEvent } from "react";
import styles from "./SwitchLanguage.module.scss";
import { useRouter } from "next/navigation";

function SwitchLanguage() {
  const router = useRouter();

  const languageChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    router.replace(`/${value}`);
  };

  return (
    <select className={styles.select_switch} onChange={languageChangeHandler}>
      <option value="" title="null">
        Seleziona lingua
      </option>
      <option value="it" title="Italiano">
        🇮🇹 Italiano
      </option>
      <option value="en" title="English">
        🇬🇧 English
      </option>
    </select>
  );
}

export default SwitchLanguage;
