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
    "bg-transparent border-primary border text-primary font-bold px-2 py-1 rounded cursor-pointer hover:bg-primary/90 hover:text-white active:scale-95 transition",
  disabled:
    "bg-lightGray border border-gray text-gray font-bold px-2 py-1 rounded cursor-not-allowed",
};

const Button = ({ text, type, buttonType, onClick }: ButtonProps) => {
  return (
    <button className={buttonTypes[buttonType]} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
