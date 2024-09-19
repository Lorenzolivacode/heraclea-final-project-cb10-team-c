import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import style from "/app/components/Molecoles/Menu/Menu.module.scss";

interface MenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  isAuthenticated?: boolean;
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
    { label: "Log out", action: () => handleSignOut() },
  ];

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert("Logout effettuato con successo!");
    } catch (error) {
      console.error("Errore durante il logout:", error);
      alert("Si è verificato un errore durante il logout. Riprova.");
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
