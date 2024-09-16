import Link from "next/link";
import style from "@/app/components/Molecoles/Menu/Menu.module.scss";
import { Dispatch, SetStateAction } from "react";

interface MenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  isAuthenticated?: boolean;
  handleLogout?: () => void;
}

const Menu = ({ isMenuOpen, setIsMenuOpen }: MenuProps) => {
  const menuItems = [
    { label: "Account", link: "/account_user" },
    { label: "Biglietti", link: "/acquista_page" },
    { label: "Esplora", link: "/esplora_page" },
    { label: "Nelle vicinanze", link: "/nelle_vicinanze" },
    { label: "Dove siamo", link: "/contatti" },
    { label: "Norme", link: "/norme" },
    { label: "Credits", link: "/chi_siamo" },
    { label: "Log out", link: "" },
  ];

  return (
    <div className={`${style.menu} ${isMenuOpen ? style.open : ""}`}>
      {menuItems.map((item, index) => (
        <div key={index} className={style.menuItem}>
          <Link onClick={() => setIsMenuOpen((prev) => !prev)} href={item.link}>
            <span>{item.label}</span>
            <span>{">"}</span>
          </Link>
        </div>
      ))}

      {/* Mostra il pulsante di Log out solo se l'utente è autenticato
      {isAuthenticated && (
        <div className={style.menuItem}>
          <button
            onClick={() => {
              handleLogout();
              setIsMenuOpen(false); // Chiude il menu
            }}
          >
            Log out
          </button>
        </div>
      )} */}
    </div>
  );
};

export default Menu;
