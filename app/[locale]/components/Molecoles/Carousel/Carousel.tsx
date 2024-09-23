"use client";
import React, { useRef } from "react";
import styles from "./carousel.module.scss";
import Image from "next/image";

function Carousel({ images }: { images: string[] }) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleCarouselBtn = (index: number) => {
    if (carouselRef.current) {
      const containerWidth = carouselRef.current.offsetWidth;
      carouselRef.current?.scrollTo({
        left: containerWidth * index,
      });
    }
  };
  return (
    <div className={styles.carousel_container}>
      <div ref={carouselRef} className={styles.carousel}>
        {images.map((image) => {
          return (
            <Image
              width={600}
              height={400}
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
              ></button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Carousel;
