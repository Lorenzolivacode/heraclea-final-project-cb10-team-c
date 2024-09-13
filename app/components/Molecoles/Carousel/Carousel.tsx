"use client";
import React, { useRef } from "react";
import styles from "./carousel.module.scss";

function Carousel({ images }: { images: string[] }) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleCarouselBtn = (index: number) => {
    if (carouselRef.current) {
      let containerWidth = carouselRef.current.offsetWidth;
      carouselRef.current?.scrollTo({
        left: containerWidth * index,
      });
    }
  };
  return (
    <div ref={carouselRef} className={styles.carousel}>
      {images.map((image) => {
        return (
          <img
            key={crypto.randomUUID()}
            src={image}
            alt="Image"
            className={styles.image}
          />
        );
      })}
      <div className={styles.btn_container}>
        {images.map((image, index) => {
          return (
            <button
              key={crypto.randomUUID()}
              className={styles.btn}
              onClick={() => handleCarouselBtn(index)}
            >
              {/* {index + 1} */}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Carousel;
