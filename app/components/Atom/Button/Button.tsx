import { ReactNode, MouseEventHandler } from "react";
import style from "@/app/components/Atom/Button/button.module.scss";

interface ButtonProps {
  children?: ReactNode;
  text: string;
  type?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({
  children,
  text = "",
  onClick,
  type,
}) => {
  return (
    <button className={style.button} onClick={onClick}>
      {text}
      {children}
    </button>
  );
};

export default Button;