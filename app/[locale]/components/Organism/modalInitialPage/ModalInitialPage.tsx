"use client";
import React, { useState, useEffect, useRef } from "react";
import style from "./ModalInitialPage.module.scss";
import Toggle from "../../Atom/Toggle/Toggle";
import Modal from "../../Molecoles/Modal/modal";
import Button from "../../Atom/Button/Button";
import { useTranslations } from "next-intl";
import SwitchLanguage from "../../Atom/SwitchLanguage/SwitchLanguage";
import Image from "next/image";

function InitialPagemodal() {
  const [selectedPage, setSelectedPage] = useState<string>("pagina_0");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const t = useTranslations("ModalInitialPage");

  const pages = [
    { video: "/heraclea-logo-unscreen.gif", title: "HERACLEA" },
    {
      title: t("welcomeTitle"),
      description: t("welcomeDescription"),
      video: "/anfora.mp4",
      label: "ITALIANO",
      label2: "INGLESE",
    },
    {
      title: t("discoverTitle"),
      description: t("discoverDescription"),
      video: "/search.mp4",
    },
    {
      title: t("purchaseTitle"),
      description: t("purchaseDescription"),
      video: "/tickets.mp4",
    },
    {
      title: t("itinirariesTitle"),
      description: t("itinerariesDescription"),
      video: "/trekking.mp4",
    },
    {
      title: t("eventsTitle"),
      description: t("eventsDescription"),
      video: "/calendar.mp4",
      label3: t("buttonStart"),
    },
  ];

  const params = [
    "pagina_0",
    "pagina_1",
    "pagina_2",
    "pagina_3",
    "pagina_4",
    "pagina_5",
  ];

  useEffect(() => {
    if (currentPage === 0) {
      const timer = setTimeout(() => {
        setCurrentPage(1);
        setSelectedPage("pagina_1");
        scrollToPage(1);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [currentPage]);

  const scrollToPage = (pageIndex: number) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      container.scrollTo({
        top: pageIndex * container.clientHeight,
        behavior: "smooth",
      });
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const swipeThreshold = 50; // distanza per considerare uno swipe

    if (
      touchStartX.current - touchEndX > swipeThreshold &&
      currentPage < pages.length - 1
    ) {
      // Swipe sinistra -> pagina successiva
      setCurrentPage(currentPage + 1);
      setSelectedPage(params[currentPage + 1]);
      scrollToPage(currentPage + 1);
    } else if (
      touchEndX - touchStartX.current > swipeThreshold &&
      currentPage > 0
    ) {
      // Swipe destra -> pagina precedente
      setCurrentPage(currentPage - 1);
      setSelectedPage(params[currentPage - 1]);
      scrollToPage(currentPage - 1);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setCurrentPage(0);
  };

  const handleButtonClick = () => {
    if (currentPage === 5) {
      closeModal();
    }
  };

  const handleSkip = () => {
    closeModal();
  };

  const handleToggle = (param: string, index: number) => {
    setSelectedPage(param);
    setCurrentPage(index);
    scrollToPage(index);
  };

  return (
    <Modal isVisible={isModalVisible} onClose={closeModal}>
      <div
        ref={scrollRef}
        className={style.scrollContainer}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <main
          className={`${style.main} ${
            currentPage === 0 ? style.initialPage : ""
          }`}
        >
          {currentPage === 1 && (
            <button className={style.skip} onClick={handleSkip}>
              Skip
            </button>
          )}
          <div className={style.infoContainer}>
            <h1
              className={
                currentPage === 0
                  ? style.titleBottom
                  : currentPage === 1
                  ? style.titlePage1
                  : style.title
              }
            >
              {pages[currentPage].title}
            </h1>

            {currentPage === 0 ? (
              <div className={style.gif}>
                <Image
                  layout="responsive"
                  width={800}
                  height={800}
                  src={pages[0].video}
                  alt="Heraclea Logo"
                />
              </div>
            ) : (
              <video
                src={pages[currentPage].video}
                autoPlay
                muted
                className={style.video}
              />
            )}
            <p>{pages[currentPage].description}</p>
            {currentPage !== 0 && (
              <>
                {/* <div className={style.btnContainer}>
                  </div> */}
                {currentPage === 1 && <SwitchLanguage />}
                {currentPage === 5 && (
                  <Button text={t("buttonStart")} onClick={handleButtonClick} />
                )}
                <div className={style.toggleContainer}>
                  {params
                    .filter((_, index) => index !== 0)
                    .map((param, index) => (
                      <Toggle
                        key={param}
                        params={param}
                        selectedPage={selectedPage}
                        onToggle={() => handleToggle(param, index + 1)}
                      />
                    ))}
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </Modal>
  );
}

export default InitialPagemodal;
