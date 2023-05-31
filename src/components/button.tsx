import React from "react";

interface ButtonProps {
  text: string;
  type?: string;
  buttonType: string;
  onClick?: () => void;
}

const buttonTypes: { [key: string]: string } = {
  primary:
    "bg-primary border-primary text-white font-bold px-2 py-1 rounded cursor-pointer hover:bg-primary/90 active:scale-95 transition",
  outlined:
    "bg-transparent border-transparent text-primary font-bold px-2 py-1 rounded cursor-pointer hover:bg-primary/90 active:scale-95 transition",
};

const Button = ({ text, type, buttonType, onClick }: ButtonProps) => {
  return (
    <button className={buttonTypes[buttonType]} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
