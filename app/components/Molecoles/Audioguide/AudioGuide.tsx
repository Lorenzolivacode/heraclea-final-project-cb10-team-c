"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./AudioGuide.module.scss";
import Image from "next/image";

interface AudioGuida {
  label?: string;
  filePath: string;
  text: string;
}

export default function AudioGuide({ label, text, filePath }: AudioGuida) {
  const [isTextVisible, setIsTextVisible] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleVisibility = () => {
    setIsTextVisible((prevState) => !prevState);
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleStopPlaying = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleMetadata = () => {
        setDuration(audio.duration);
      };

      audio.addEventListener("loadedmetadata", handleMetadata);
      audio.addEventListener("timeupdate", () => {
        setCurrentTime(audio.currentTime);
      });

      return () => {
        audio.removeEventListener("loadedmetadata", handleMetadata);
      };
    }
  }, []);

  const formatTime = (time: number | null) => {
    if (time === null) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className={styles.audioGuideContainer}>
      <figcaption className={styles.label}>{label}</figcaption>
      <figure className={styles.audioPlayer}>
        <audio ref={audioRef} src={filePath} className={styles.audio}></audio>
        <div className={styles.customControls}>
          <button className={styles.playPauseButton} onClick={handlePlayPause}>
            {isPlaying ? (
              <>
                <Image
                  src="/icons/audioguide-icons/pause.svg"
                  alt="Icon Pause Player"
                  className={styles.icon}
                  width={20}
                  height={20}
                />
              </>
            ) : (
              <Image
                src="/icons/audioguide-icons/play.svg"
                alt="Icon Play Player"
                className={styles.icon}
                width={20}
                height={20}
              />
            )}
          </button>
          <button>
            <Image
              src="/icons/audioguide-icons/stop.svg"
              width={20}
              height={20}
              alt="Icon Stop Player"
              onClick={handleStopPlaying}
            />
          </button>
        </div>

        <div className={styles.timeDisplay}>
          <span>{formatTime(currentTime)}</span>/
          <span>{formatTime(duration)}</span>
        </div>
        <button className={styles.textToggleButton} onClick={toggleVisibility}>
          {isTextVisible ? "Hide Text" : "Show Text"}
        </button>
      </figure>

      {isTextVisible && <p className={styles.textContent}>{text}</p>}
    </div>
  );
}
