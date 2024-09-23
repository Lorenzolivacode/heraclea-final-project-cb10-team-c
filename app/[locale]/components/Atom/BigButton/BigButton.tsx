import { MouseEventHandler } from "react";
import style from "./BigButton.module.scss";

interface ButtonProps {
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({ text = "", onClick }) => {
  return (
    <button className={style.button} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
