"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import style from "./nelle_vicinanze.module.scss";
import Card from "@/app/[locale]/components/Molecoles/Card/Card";
import { useTranslations } from "next-intl";
import Image from "next/image";

function Vicinanze() {
  const [currentSlideRistoranti, setCurrentSlideRistoranti] = useState(0);
  const [currentSlideVisitare, setCurrentSlideVisitare] = useState(0);
  const t = useTranslations("NelleVicinanze");

  const ristorantiRef = useRef<HTMLDivElement>(null);
  const visitareRef = useRef<HTMLDivElement>(null);

  const ristorantiSection = [
    {
      src: "/assets/garibaldi.webp",
      alt: "lido_garibaldi",
      title: "Lido Garibaldi",
      roadmap: "https://g.co/kgs/YYZQzJf",
    },
    {
      src: "/assets/ristorante.webp",
      alt: "ristorante_sicilia_antica",
      title: "Ristorante Sicilia Antica",
      roadmap: "https://g.co/kgs/cPFpb3i",
    },
    {
      src: "/assets/bellevue.webp",
      alt: "lido_bellevue",
      title: "Lido Bellevue",
      roadmap: "https://www.facebook.com/lidobellevueracleaminoa/?locale=it_IT",
    },
  ];

  const visitareSection = [
    {
      src: "/assets/platani_vicinanze.webp",
      alt: "riserva_naturale",
      title: "Riserva Naturale",
      roadmap: "https://g.co/kgs/qrDjdPb",
    },
    {
      src: "/assets/valledeitempli.webp",
      alt: "valle_dei_templi",
      title: "Valle Dei Templi",
      roadmap: "https://www.parcovalledeitempli.it/",
    },
    {
      src: "/assets/teatro_andromeda.jpeg",
      alt: "teatro_andromeda",
      title: "Teatro Andromeda",
      roadmap: "https://g.co/kgs/wPfN4cF",
    },
  ];

  const handleScroll = useCallback((section: "ristoranti" | "visitare") => {
    const ref =
      section === "ristoranti" ? ristorantiRef.current : visitareRef.current;
    if (ref) {
      const scrollPosition = ref.scrollLeft;
      const slideWidth = ref.clientWidth;
      const slideIndex = Math.round(scrollPosition / slideWidth);

      if (section === "ristoranti") {
        setCurrentSlideRistoranti(slideIndex);
      } else {
        setCurrentSlideVisitare(slideIndex);
      }
    }
  }, []);

  useEffect(() => {
    const ristorantiElement = ristorantiRef.current;
    const visitareElement = visitareRef.current;

    const handleRistorantiScroll = () => handleScroll("ristoranti");
    const handleVisitareScroll = () => handleScroll("visitare");

    if (ristorantiElement) {
      ristorantiElement.addEventListener("scroll", handleRistorantiScroll);
    }

    if (visitareElement) {
      visitareElement.addEventListener("scroll", handleVisitareScroll);
    }

    return () => {
      if (ristorantiElement) {
        ristorantiElement.removeEventListener("scroll", handleRistorantiScroll);
      }

      if (visitareElement) {
        visitareElement.removeEventListener("scroll", handleVisitareScroll);
      }
    };
  }, [handleScroll]);

  const goToSlide = (section: "ristoranti" | "visitare", index: number) => {
    const ref =
      section === "ristoranti" ? ristorantiRef.current : visitareRef.current;

    if (ref) {
      ref.scrollTo({
        left: ref.clientWidth * index,
        behavior: "smooth",
      });

      if (section === "ristoranti") {
        setCurrentSlideRistoranti(index);
      } else {
        setCurrentSlideVisitare(index);
      }
    }
  };

  return (
    <main className="main">
      <h1 className={style.title}>{t("title")}</h1>

      <section className={style.container}>
        <div className={style.category}>
          <Image
            src="/icons/nelle-vicinanze-icons/fork-and-knife.svg"
            alt="forchetta_cucchiaio"
            width={35}
            height={35}
            loading="lazy"
          />
          <p>{t("subtitleRestaurants")}</p>
        </div>

        <div className={style.carousel} ref={ristorantiRef}>
          {ristorantiSection.map(({ src, alt, title, roadmap }, index) => (
            <div
              key={alt}
              className={`${style.card} ${
                index === currentSlideRistoranti ? style.active : ""
              }`}
            >
              <Card
                target="_blank"
                label={title}
                image={src}
                roadmap={roadmap}
              />
            </div>
          ))}
        </div>
        <div className={style.dots}>
          {ristorantiSection.map((_, index) => (
            <span
              key={index}
              className={`${style.dot} ${
                index === currentSlideRistoranti ? style.activeDot : ""
              }`}
              onClick={() => goToSlide("ristoranti", index)}
            />
          ))}
        </div>
      </section>

      <section className={style.container}>
        <div className={style.category}>
          <Image
            src="/icons/nelle-vicinanze-icons/camera.svg"
            alt="camera"
            width={35}
            height={35}
            loading="lazy"
          />
          <p>{t("subtitleVisit")}</p>
        </div>

        <div className={style.carousel} ref={visitareRef}>
          {visitareSection.map(({ src, alt, title, roadmap }, index) => (
            <div
              key={alt}
              className={`${style.card} ${
                index === currentSlideVisitare ? style.active : ""
              }`}
            >
              <Card
                target="_blank"
                label={title}
                image={src}
                roadmap={roadmap}
              />
            </div>
          ))}
        </div>
        <div className={style.dots}>
          {visitareSection.map((_, index) => (
            <span
              key={index}
              className={`${style.dot} ${
                index === currentSlideVisitare ? style.activeDot : ""
              }`}
              onClick={() => goToSlide("visitare", index)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Vicinanze;
