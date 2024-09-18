import React from "react";
import audiotext from "./audioguideData";
import dynamic from "next/dynamic";
import styles from "./audioguide.module.scss";
import Loader from "@/app/components/Atom/Loader/Loader";

const AudioGuide = dynamic(
  () => import("@/app/components/Molecoles/Audioguide/AudioGuide"),
  {
    // loading: () => <Loader />,

    ssr: false,
  }
);

function AudioGuidePage() {
  return (
    <main className={styles.main}>
      <h1>Audioguide</h1>
      {audiotext.map((audio) => (
        <div className={styles.playerBox} key={audio.id}>
          <h2>{audio.label}</h2>
          <AudioGuide>
            <p>{audio.text}</p>
          </AudioGuide>
        </div>
      ))}
    </main>
  );
}

export default AudioGuidePage;
