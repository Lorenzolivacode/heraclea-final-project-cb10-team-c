"use client";

import { Link } from "@/i18n/routing";
import { Dispatch, SetStateAction, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/app/[locale]/firebase/config";
import { useRouter } from "@/i18n/routing";
//import { useLocale } from "next-intl";
import style from "/app/[locale]/components/Molecoles/Menu/Menu.module.scss";
import Toast from "../../Atom/Toast/Toast";
import { useTranslations } from "next-intl";

interface MenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}

const Menu = ({ isMenuOpen, setIsMenuOpen }: MenuProps) => {
  const [isToastSuccessOpen, setIsToastSuccessOpen] = useState(false);
  const [isToastErrorOpen, setIsToastErrorOpen] = useState(false);
  const router = useRouter();
  // const locale = useLocale();
  const t = useTranslations("Menu");

  const menuItems = [
    { label: t("account"), link: "/account_user" },
    { label: t("tickets"), link: "/acquista_page" },
    { label: t("explore"), link: "/esplora_page" },
    { label: t("inTheArea"), link: "/nelle_vicinanze" },
    { label: t("whereWeAre"), link: "/contatti" },
    { label: t("regulations"), link: "/norme" },
    { label: t("credits"), link: "/chi_siamo" },
    { label: t("logout"), action: () => handleSignOut() },
  ];

  const handleSignOut = async () => {
    console.log("Attempting to log out...");
    try {
      await signOut(auth);
      console.log("Logged out successfully!");
      setIsToastSuccessOpen(true);

      // Usa il locale senza duplicazioni
      router.push(`/sign_up`);
    } catch (error) {
      console.error("Errore durante il logout:", error);
      setIsToastErrorOpen(true);
    }
  };

  return (
    <div className={`${style.menu} ${isMenuOpen ? style.open : ""}`}>
      <Toast
        isOpen={isToastSuccessOpen}
        onClose={() => setIsToastSuccessOpen(false)}
        message="Logout effettuato con successo!"
        type="success"
      />
      {isToastErrorOpen && (
        <Toast
          isOpen={isToastErrorOpen}
          onClose={() => setIsToastErrorOpen(false)}
          message="Si è verificato un errore durante il logout. Riprova."
          type="error"
        />
      )}

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
                setIsMenuOpen(false);
              }}
            >
              {item.label}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Menu;
