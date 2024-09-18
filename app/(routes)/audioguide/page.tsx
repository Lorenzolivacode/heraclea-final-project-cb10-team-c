import audiotext from "./audioguideData";
import styles from "./audioguide.module.scss";
import AudioGuide from "@/app/components/Molecoles/Audioguide/AudioGuide";

function AudioGuidePage() {
  return (
    <main className={styles.main}>
      <h1>Audioguide</h1>
      {audiotext.map((audio) => (
        <div className={styles.playerBox} key={audio.id}>
          <AudioGuide
            label={audio.label}
            filePath={audio.filePath}
            text={audio.text}
          />
        </div>
      ))}
    </main>
  );
}

export default AudioGuidePage;
