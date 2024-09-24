"use client";
import React, { useRef } from "react";
import styles from "./carousel.module.scss";

interface IObj {
  src: string;
  alt: string;
  title: string;
  roadmap: string;
}

interface CarouselProps {
  children: React.ReactNode;
  array: IObj[];
}

function Carousel({ children, array }: CarouselProps) {
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
        {children}
        <div className={styles.btn_container}>
          {array.map((_, index) => {
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
