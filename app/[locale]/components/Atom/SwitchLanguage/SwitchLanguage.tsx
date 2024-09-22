"use client";
import React, { ChangeEvent } from "react";
import styles from "./SwitchLanguage.module.scss";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

function SwitchLanguage() {
  const router = useRouter();
  const t = useTranslations("SelectLanguage");

  const languageChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    router.replace(`/${value}`);
  };

  return (
    <select className={styles.select_switch} onChange={languageChangeHandler}>
      <option value="" title="null">
        {t("select")}
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
