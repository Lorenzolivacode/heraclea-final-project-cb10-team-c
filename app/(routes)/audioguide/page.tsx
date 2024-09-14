import React from "react";
import audiotext from "./audioguideData";
import dynamic from "next/dynamic";
import styles from "./audioguide.module.scss";

// Dynamically import AudioGuide component and make ssr:false manually
const AudioGuide = dynamic(
  () => import("@/app/components/Molecoles/Audioguide/AudioGuide"),
  {
    loading: () => <p>A guide is loading...</p>,
    ssr: false,
  }
);

function AudioGuidePage() {
  return (
    <div className={styles.main}>
      {audiotext.map((audio) => (
        <div className={styles.playerBox} key={audio.id}>
          <h2>{audio.label}</h2>
          <AudioGuide>
            <p>{audio.text}</p>
          </AudioGuide>
        </div>
      ))}
    </div>
  );
}

export default AudioGuidePage;
