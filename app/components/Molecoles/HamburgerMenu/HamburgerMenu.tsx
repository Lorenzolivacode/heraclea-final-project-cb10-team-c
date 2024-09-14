"use client";
import { Dispatch, SetStateAction } from "react";
import style from "@/app/components/Molecoles/HamburgerMenu/HamburgerMenu.module.scss";

interface HamburgerProps {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  className?: string;
}

const Hamburger = ({
  isMenuOpen,
  setIsMenuOpen,
  className,
}: HamburgerProps) => {
  return (
    <div
      className={`${style.main} ${isMenuOpen ? style.active : ""} ${
        className || ""
      }`}
      onClick={() => setIsMenuOpen((prev) => !prev)}
    >
      <div className={style.breadUp} />
      <div className={style.hamb} />
      <div className={style.breadDown} />
    </div>
  );
};

export default Hamburger;
