"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./SliderBA.module.scss";

function SliderBA({ imgA, imgB }: { imgA: string; imgB: string }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const handleMove = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    let x;

    if ("touches" in e) {
      // Evento di tocco (smartphone)
      x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
    } else {
      // Evento di mouse
      x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    }

    const perc = Math.max(0, Math.min((x / rect.width) * 100, 100));

    setSliderPosition(perc);
  };

  const handleStartDrag = () => {
    setIsDragging(true);
  };
  const handleEndDrag = () => {
    setIsDragging(false);
  };
  return (
    <div className={styles.container_slider}>
      <div
        className={styles.container_images}
        onMouseDown={handleStartDrag}
        onMouseMove={handleMove}
        onMouseUp={handleEndDrag}
        // Oni-touch events per dispositivi mobile, come gli eventi di mouse
        onTouchStart={handleStartDrag} // Inizia il "drag" su touch
        onTouchMove={handleMove} // Rileva il movimento su touch
        onTouchEnd={handleEndDrag}
      >
        <Image fill priority alt="" src={imgA} />
        <div
          className={styles.container_imgB}
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <Image fill priority alt="" src={imgB} />
        </div>
        <div
          className={styles.slider_line}
          style={{ left: `${sliderPosition}%` }}
        >
          <div className={styles.slider_btn} />
        </div>
      </div>
    </div>
  );
}

export default SliderBA;
