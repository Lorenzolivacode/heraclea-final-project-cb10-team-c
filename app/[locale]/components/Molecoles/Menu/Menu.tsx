"use client";

import { Link } from "@/i18n/routing";
import { Dispatch, SetStateAction } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/app/[locale]/firebase/config";
import { useRouter } from "@/i18n/routing";
import style from "/app/[locale]/components/Molecoles/Menu/Menu.module.scss";
import { useTranslations } from "next-intl";
import SwitchLanguage from "../../Atom/SwitchLanguage/SwitchLanguage";

interface MenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}

const Menu = ({ isMenuOpen, setIsMenuOpen }: MenuProps) => {
  const router = useRouter();
  const t = useTranslations("Menu");

  const menuItems = [
    { label: t("account"), link: "/account_user" },
    { label: t("tickets"), link: "/acquista_page" },
    { label: t("explore"), link: "/esplora_page" },
    { label: t("inTheArea"), link: "/nelle_vicinanze" },
    { label: t("ourLocation"), link: "/contatti" },
    { label: t("regulations"), link: "/norme" },
    { label: t("credits"), link: "/chi_siamo" },
    { label: t("logout"), action: () => handleSignOut() },
  ];

  const handleSignOut = async () => {
    console.log("Attempting to log out...");
    try {
      await signOut(auth);
      console.log("Logged out successfully!");
      router.push(`/sign_up`);
    } catch (error) {
      console.error("Errore durante il logout:", error);
    }
  };

  return (
    <div className={`${style.menu} ${isMenuOpen ? style.open : ""}`}>
      {menuItems.map((item, index) => (
        <div key={index} className={style.menuItem}>
          {item.link ? (
            <Link
              href={item.link}
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <span>{item.label}</span>
              <span>{">"}</span>
            </Link>
          ) : (
            <button
              className={style.menuButton}
              onClick={() => {
                item.action && item.action();
                setTimeout(() => {
                  setIsMenuOpen(false);
                }, 3000);
              }}
            >
              {item.label}
            </button>
          )}
        </div>
      ))}
      <SwitchLanguage />
    </div>
  );
};

export default Menu;
