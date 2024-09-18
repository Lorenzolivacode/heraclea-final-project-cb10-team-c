import React from "react";
import Image from "next/image";
import styles from "./Toast.module.scss";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info" | "default";
  timeout?: number;
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
  type = "default",
  timeout = 3000,
  onClose,
  position = "top-right",
}: ToastProps) {
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
      typeImg = "/icons/toast-icons/icon-success.png";
      break;
    case "error":
      typeImg = "/icons/toast-icons/icon-error.png";
      break;
    case "info":
      typeImg = "/icons/toast-icons/icon-info.png";
      break;
    default:
      typeImg = "/icons/toast-icons/icon-default.png";
  }

  setTimeout(() => {
    onClose();
    console.log("close");
  }, timeout);

  return (
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
  );
}

export default Toast;
