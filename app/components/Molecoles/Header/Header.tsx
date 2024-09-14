"use client";

import { Dispatch, SetStateAction } from "react";
import { useRouter, usePathname } from "next/navigation";
import style from "@/app/components/Molecoles/Header/Header.module.scss";
import Hamburger from "../HamburgerMenu/HamburgerMenu";
import Link from "next/link";

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}

const Header = ({ isMenuOpen, setIsMenuOpen }: HeaderProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleBackClick = () => {
    router.back();
  };
  const isHomePage = pathname === "/";

  return (
    <div className={style.nav}>
      <div>
        {!isHomePage && (
          <img
            src="/icons/header/arrow-left.svg"
            alt="Back"
            width={40}
            height={40}
            onClick={handleBackClick}
          />
        )}
      </div>
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
