"use client";

import { useContext, useEffect, useRef, useState } from "react";
import styles from "./AudioGuide.module.scss";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  SetIsModalAudioOpenContext,
  SetModalAudioSrcContext,
  SetModalAudioTitleContext,
} from "@/app/[locale]/ModalAudioContext/ModalAudioContext";

interface AudioGuida {
  label?: string;
  filePath: string;
  text: string;
  img: string;
}

export default function AudioGuide({ label, text, filePath, img }: AudioGuida) {
  const [isTextVisible, setIsTextVisible] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const t = useTranslations("AudioguidePage");

  const toggleVisibility = () => {
    setIsTextVisible((prevState) => !prevState);
  };

  const setIsAudioOpen = useContext(SetIsModalAudioOpenContext);
  const setAudioTitle = useContext(SetModalAudioTitleContext);
  const setAudioSrc = useContext(SetModalAudioSrcContext);

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

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(e.target.value);
      setCurrentTime(Number(e.target.value));
    }
  };

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      const handleMetadata = () => {
        setDuration(audio.duration || 0);
      };

      audio.addEventListener("loadedmetadata", handleMetadata);
      audio.addEventListener("timeupdate", () => {
        setCurrentTime(audio.currentTime);
      });

      audio.load();

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

  const handleAudioStorage = () => {
    window.localStorage.setItem("audioIsOpen", JSON.stringify(true)); // Salvare come booleano

    const storedValue = localStorage.getItem("audioIsOpen") || "false"; // Default a "false" se è null
    console.log(JSON.parse(storedValue)); // Recuperare e parsare
    setIsModalOpen(false);
  };

  const handleModalAudio = () => {
    setIsAudioOpen !== undefined && setIsAudioOpen(true);
    setAudioTitle !== undefined && label && setAudioTitle(label);
    setAudioSrc !== undefined && setAudioSrc(filePath);
  };

  return (
    <div>
      <div className={styles.label}>
        <figcaption onClick={() => setIsModalOpen(true)}>{label}</figcaption>
        <Image
          className={styles.headphonesIcon}
          src="/icons/headphonesSienna.svg"
          alt="Headphones Icon"
          width={50}
          height={50}
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      <audio ref={audioRef} src={filePath} className={styles.audio}></audio>

      {isModalOpen && (
        <div
          className={`${styles.modalOverlay} ${
            isTextVisible ? styles.active : ""
          }`}
        >
          <button onClick={handleAudioStorage}>Open modale audio</button>
          <button
            className={styles.reduceBtn}
            onClick={() => {
              setIsModalOpen(false);
              handleStopPlaying();
              handleModalAudio();
            }}
          >
            -
          </button>
          <button
            className={styles.closeBtn}
            onClick={() => {
              setIsModalOpen(false);
              handleStopPlaying();
            }}
          >
            X
          </button>
          <div className={styles.modalContent}>
            <div className={styles.imageWrapper}>
              <Image
                src={img}
                alt={"teatro greco di eraclea"}
                width={800}
                height={800}
              />
            </div>
            <figure className={styles.audioPlayer}>
              <div className={styles.customControls}>
                <button
                  className={styles.playPauseButton}
                  onClick={handlePlayPause}
                >
                  {isPlaying ? (
                    <Image
                      src="/icons/audioguide-icons/pause.svg"
                      alt="Icon Pause Player"
                      className={styles.icon}
                      width={20}
                      height={20}
                    />
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
                <button
                  className={styles.buttonStop}
                  onClick={handleStopPlaying}
                >
                  <Image
                    src="/icons/audioguide-icons/stop.svg"
                    alt="Icon Stop Player"
                    className={styles.icon}
                    width={20}
                    height={20}
                  />
                </button>
              </div>
            </figure>
            <div className={styles.timeDisplay}>
              <span>{formatTime(currentTime)}</span>
              <input
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={handleSeek}
                className={styles.rangeInput}
                style={
                  {
                    "--value": (currentTime / duration) * 100,
                  } as React.CSSProperties
                }
              />
              <span>{formatTime(duration)}</span>
            </div>

            <button
              className={styles.textToggleButton}
              onClick={toggleVisibility}
            >
              {isTextVisible ? t("buttonTextNascondi") : t("buttonTextMostra")}
            </button>
            <p
              className={`${styles.textContent} ${
                isTextVisible ? styles.textVisible : ""
              }`}
            >
              {text}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
