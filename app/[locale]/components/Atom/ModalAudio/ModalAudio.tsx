"use client";
import React, { useContext, useState } from "react";
import styles from "./ModalAudio.module.scss";
import {
  SetIsModalAudioOpenContext,
  ModalAudioSrcContext,
  ModalAudioTitleContext,
} from "@/app/[locale]/ModalAudioContext/ModalAudioContext";

function ModalAudio() {
  const [reduceClass, setReduceClass] = useState(false);
  const setIsAudioOpen = useContext(SetIsModalAudioOpenContext);

  const audioTitle = useContext(ModalAudioTitleContext);
  const audioSrc = useContext(ModalAudioSrcContext);

  const handleReduce = () => {
    setReduceClass((prevState) => !prevState);
  };

  const handleAudioClose = () => {
    setIsAudioOpen !== undefined && setIsAudioOpen(false);
  };
  return (
    <div
      className={`${styles.modale_audio} ${reduceClass && styles.audio_reduce}`}
    >
      <div className={`${styles.audio_container}`}>
        <h3>{audioTitle}</h3>
        <div className={styles.btn_container}>
          <button onClick={handleReduce}>{!reduceClass ? "-" : "□"}</button>
          <button onClick={handleAudioClose}>x</button>
        </div>
      </div>
      <audio controls className={styles.audio}>
        <source src={audioSrc} type="audio/mp3" />
      </audio>
    </div>
  );
}

export default ModalAudio;
