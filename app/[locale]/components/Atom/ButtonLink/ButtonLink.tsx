import { ReactNode, MouseEventHandler } from "react";
import style from "./ButtonLink.module.scss";
import { Link } from "@/i18n/routing";

interface ButtonProps {
  text: string;
  target?: "_blank" | "_self";
  href: string;
}

const EventButton: React.FC<ButtonProps> = ({
  text,
  href,
  target = "_self",
}) => {
  return (
    <Link className={style.button} href={href} target={target}>
      <p>{text}</p>
    </Link>
  );
};

export default EventButton;
