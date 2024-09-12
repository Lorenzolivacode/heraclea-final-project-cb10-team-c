"use client";
import { Dispatch, SetStateAction } from "react";
import style from "@/app/components/Molecoles/HamburgerMenu/HamburgerMenu.module.scss";

interface HamburgerProps {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
  className?: string;
}

const Hamburger = (props: HamburgerProps) => {
  const { active: open, setActive: setOpen, className } = props;

  return (
    <div
      className={`${style.main} ${open ? style.active : ""} ${className || ""}`}
      onClick={() => setOpen((prev) => !prev)}
    >
      <div className={style.breadUp} />
      <div className={style.hamb} />
      <div className={style.breadDown} />
    </div>
  );
};

export default Hamburger;
