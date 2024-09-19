import { ReactNode, MouseEventHandler } from "react";
import style from "./EventButton.module.scss";

interface ButtonProps {
  children?: ReactNode;
  text: string;
  type?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const EventButton: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button className={style.button} onClick={onClick}>
      {text}
    </button>
  );
};

export default EventButton;
