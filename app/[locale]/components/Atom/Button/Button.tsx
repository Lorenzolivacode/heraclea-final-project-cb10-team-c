import { ReactNode, MouseEventHandler } from "react";
import style from "./button.module.scss";

interface ButtonProps {
  children?: ReactNode;
  text: string;
  type?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  text = "",
  onClick,
  className,
}) => {
  return (
    <button className={`${style.button} ${className || ""}`} onClick={onClick}>
      {text}
      {children}
    </button>
  );
};

export default Button;
