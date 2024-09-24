"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import styles from "./Toast.module.scss";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  timeout?: number;
  isOpen: boolean;
  onClose: () => void;
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "center";
}
function Toast({
  message,
  type = "info",
  timeout = 4000,
  isOpen,
  onClose,
  position = "top-right",
}: ToastProps) {
  useEffect(() => {
    setTimeout(() => {
      onClose();
    }, timeout);
  }, []);

  let typeImg;
  let positionClass;

  switch (position) {
    case "top-right":
      positionClass = "top_right";
      break;
    case "top-left":
      positionClass = "top_left";
      break;
    case "bottom-right":
      positionClass = "bottom_right";
      break;
    case "bottom-left":
      positionClass = "bottom_left";
      break;
    case "center":
      positionClass = "center";
      break;
    default:
      positionClass = "top_right";
  }

  switch (type) {
    case "success":
      typeImg = "/icons/toast-icons/icon-success-ivory.png";
      break;
    case "error":
      typeImg = "/icons/toast-icons/icon-error-ivory.png";
      break;
    case "info":
      typeImg = "/icons/toast-icons/icon-info-ivory.png";
      break;
    default:
      typeImg = "/icons/toast-icons/icon-info-ivory.png";
  }

  return (
    /* createPortal */ <>
      {isOpen && (
        <div
          className={`${styles.toast} ${styles[type as keyof typeof styles]} ${
            styles[positionClass]
          }`}
        >
          <div className={styles.toast_inset}>
            <div className={styles.flipflop_container}>
              <div className={styles.flipflop}></div>
            </div>
            <div className={styles.message_container}>
              <Image
                src={"/icons/logoIvory.svg"}
                alt="Logo Heraclea"
                width={40}
                height={40}
              />
              <p className={styles.toast__message}>{message}</p>
            </div>
            <div className={styles.loader_container}></div>
            <div className={styles.loader}>
              <div className={styles.loader_fill}></div>
            </div>
            {
              <Image
                className={styles.type_img}
                src={typeImg}
                alt={`icon ${type}`}
                width={22}
                height={22}
              />
            }
            <div className={styles.close} onClick={onClose}>
              x
            </div>
          </div>
        </div>
      )}
    </> /* ,
    headerEl */
  );
}

export default Toast;
