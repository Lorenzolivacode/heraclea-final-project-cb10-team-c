"use client";
import { Dispatch, SetStateAction } from "react";
import { useRouter, usePathname } from "next/navigation";
import style from "/app/components/Molecoles/Header/Header.module.scss";
import Hamburger from "../HamburgerMenu/HamburgerMenu";
import Link from "next/link";
import Menu from "../Menu/Menu";

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

  const handleClick = () => {
    setIsMenuOpen(false); // Chiude il menu quando si clicca sull'header
  };

  const hideMenuOnRoutes = ["/log_in", "/sign_up"];
  const shouldHideMenu = hideMenuOnRoutes.includes(pathname);

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
          <img
            src="/icons/logoSienna.svg"
            alt="Logo"
            width={69}
            height={69}
            onClick={handleClick}
          />
        </Link>
      </div>
      {!shouldHideMenu && (
        <span className={style.span}>
          <Hamburger
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            className={""}
          />
          <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        </span>
      )}
    </div>
  );
};

export default Header;
