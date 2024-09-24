"use client";
import { Dispatch, SetStateAction, useContext } from "react";
import { useRouter, usePathname } from "next/navigation";
import { IsModalAudioOpenContext } from "@/app/[locale]/ModalAudioContext/ModalAudioContext";
import style from "/app/[locale]/components/Molecoles/Header/Header.module.scss";
import Hamburger from "../HamburgerMenu/HamburgerMenu";
import Link from "next/link";
import Menu from "../Menu/Menu";
import ModalAudio from "../../Atom/ModalAudio/ModalAudio";
import Image from "next/image";

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}

const Header = ({ isMenuOpen, setIsMenuOpen }: HeaderProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const isAudioOpen = useContext(IsModalAudioOpenContext);

  if (isAudioOpen === undefined) {
    throw new Error(
      "useContext must be used within a ModalAudioContext provider"
    );
  }

  const handleBackClick = () => {
    router.back();
  };

  const handleClick = () => {
    setIsMenuOpen(false); // Chiude il menu quando si clicca sull'header
  };

  const hideMenuOnRoutes = ["/log_in", "/sign_up"];
  const shouldHideMenu = hideMenuOnRoutes.includes(pathname);

  const isHomePage =
    pathname === "/" || pathname === "/it" || pathname === "/en";

  return (
    <div className={style.nav}>
      {isAudioOpen && <ModalAudio />}
      <div>
        {!isHomePage && (
          <Image
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
          <Image
            src="/icons/logoSienna.svg"
            alt="Logo"
            width={69}
            height={69}
            onClick={handleClick}
          />
        </Link>
      </div>
      {!shouldHideMenu && (
        <>
          <span className={style.span}>
            <Hamburger
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
              className={""}
            />
          </span>
          <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        </>
      )}
    </div>
  );
};

export default Header;
