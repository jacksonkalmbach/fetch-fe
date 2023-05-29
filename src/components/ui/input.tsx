import React from "react";

interface InputProps {
  type: string;
  placeholder: string;
}

const Input = ({ type, ...props }: InputProps) => {
  return (
    <input
      className="flex h-10 w-full border border-gray bg-white px-3 py-2 text-sm ring-offset-background"
      type="email"
      id="email"
      {...props}
    />
  );
};

export default Input;
