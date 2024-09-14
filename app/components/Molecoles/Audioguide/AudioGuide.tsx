"use client";

import { useEffect, useState } from "react";
import { useTts } from "tts-react";
import type { TTSHookProps } from "tts-react";
import styles from "./AudioGuide.module.scss";

interface CustomProps extends TTSHookProps {}

const CustomTTSComponent = ({ children }: CustomProps) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [italianVoice, setItalianVoice] = useState<SpeechSynthesisVoice | null>(
    null
  );
  const [isCaptionVisible, setIsCaptionVisible] = useState<boolean>(false);

  // Fetch Italian voices and handle voice change
  useEffect(() => {
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      if (voices.length > 0) {
        const italianVoices = voices.filter((voice) => voice.lang === "it-IT");

        // Choose Italian female voice at index 2 or fallback
        if (italianVoices[2]) {
          setItalianVoice(italianVoices[2]);
        } else if (italianVoices.length > 0) {
          setItalianVoice(italianVoices[0]); // Fallback to the first available Italian voice
        }
      }
    };

    // Check if voices are already loaded
    if (speechSynthesis.getVoices().length > 0) {
      loadVoices();
    } else {
      // Add an event listener to load voices once they are available
      speechSynthesis.addEventListener("voiceschanged", loadVoices);
    }

    return () => {
      speechSynthesis.removeEventListener("voiceschanged", loadVoices);
    };
  }, []);

  // Initialize TTS only once the voice is available
  const { ttsChildren, state, play, stop, pause } = useTts({
    children,
    voice: italianVoice ?? undefined, // Only use the voice when it's available
  });

  // Track play/pause state
  useEffect(() => {
    setIsPlaying(state.isPlaying);
  }, [state.isPlaying]);

  const handlePlayPauseToggle = () => {
    if (state.isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const toggleVisibility = () => {
    setIsCaptionVisible((prevState) => !prevState);
  };

  return (
    <>
      <figure className={styles.audioPlayer}>
        <div className={styles.controls}>
          <button onClick={handlePlayPauseToggle}>
            {isPlaying ? (
              <img
                src="/icons/audioguide-icons/pause.svg"
                alt="pause icon"
                className={styles.playerIcons}
              />
            ) : (
              <img
                src="/icons/audioguide-icons/play.svg"
                alt="play icon"
                className={styles.playerIcons}
              />
            )}
          </button>
          <button onClick={stop}>
            <img
              src="/icons/audioguide-icons/stop.svg"
              alt="play icon"
              className={styles.playerIcons}
            />
          </button>
        </div>

        <div className={styles.caption}>
          <button onClick={toggleVisibility}>
            {!isCaptionVisible ? "Show text" : "Hide text"}
          </button>
        </div>
      </figure>
      {/* Show children content only when TTS is playing or paused */}
      <figcaption className={styles.figcaption}>
        {isCaptionVisible && ttsChildren}
      </figcaption>
    </>
  );
};

export default CustomTTSComponent;
