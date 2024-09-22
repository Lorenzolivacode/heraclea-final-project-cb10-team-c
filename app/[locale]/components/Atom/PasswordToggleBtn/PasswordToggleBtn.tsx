import React from "react";
import Image from "next/image";
import EyeClosed from "@/public/icons/account/eye-closed.svg";
import Eye from "@/public/icons/account/eye.svg";

interface PasswordToggleButtonProps {
  showPassword: boolean;
  onToggle: () => void;
}

const PasswordToggleButton: React.FC<PasswordToggleButtonProps> = ({
  showPassword,
  onToggle,
}) => {
  return (
    <Image
      src={showPassword ? EyeClosed : Eye}
      alt={showPassword ? "Nascondi password" : "Mostra password"}
      width={24}
      height={24}
      onClick={onToggle}
    />
  );
};

export default PasswordToggleButton;
