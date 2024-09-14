"use client";

import { Dispatch, SetStateAction, useState } from "react";
import style from "@/app/components/Molecoles/Header/Header.module.scss";
import Hamburger from "../HamburgerMenu/HamburgerMenu";
import Link from "next/link";

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}

const Header = ({ isMenuOpen, setIsMenuOpen }: HeaderProps) => {
  return (
    <div className={style.nav}>
      <div></div>
      <div className={style.logoContainer}>
        <Link href="/">
          <img src="/icons/logoSienna.svg" alt="Logo" width={69} height={69} />
        </Link>
      </div>
      <span className={style.span}>
        <Hamburger
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          className={""}
        />
      </span>
    </div>
  );
};

export default Header;
