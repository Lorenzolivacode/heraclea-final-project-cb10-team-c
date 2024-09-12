import Link from "next/link";
import style from "@/app/components/Molecoles/Menu/Menu.module.scss";

interface MenuProps {
  isOpen: boolean;
}
const Menu = ({ isOpen }: MenuProps) => {
  const menuItems = [
    { label: "Account", link: "/account" },
    { label: "Biglietti", link: "/biglietti" },
    { label: "Esplora", link: "/esplora" },
    { label: "Nelle vicinanze", link: "/vicinanze" },
    { label: "Dove siamo", link: "/dove_siamo" },
    { label: "Norme", link: "/norme" },
    { label: "Credits", link: "/credits" },
  ];

  return (
    <div className={`${style.menu} ${isOpen ? style.open : ""}`}>
      {menuItems.map((item, index) => (
        <div key={index} className={style.menuItem}>
          <Link href={item.link}>
            <span>{item.label}</span>
            <span>{">"}</span>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Menu;
