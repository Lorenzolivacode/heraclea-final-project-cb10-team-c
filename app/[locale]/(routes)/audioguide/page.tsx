import audiotext from "./audioguideData";
import styles from "./audioguide.module.scss";
import AudioGuide from "@/app/[locale]/components/Molecoles/Audioguide/AudioGuide";
import { useTranslations } from "next-intl";

function AudioGuidePage() {
  const t = useTranslations("AudioguidePage");
  const translatedAudioText = audiotext.map((audio) => ({
    ...audio,
    img: t(`img${audio.id}`),
    filePath: t(`filePath${audio.id}`),
    text: t(`text${audio.id}`),
    label: t(`label${audio.id}`),
  }));

  return (
    <main className={styles.main}>
      <h1>{t("title")}</h1>
      {translatedAudioText.map((audio) => (
        <div className={styles.playerBox} key={audio.id}>
          <AudioGuide
            label={audio.label}
            filePath={audio.filePath}
            text={audio.text}
            img={audio.img}
          />
        </div>
      ))}
    </main>
  );
}

export default AudioGuidePage;
