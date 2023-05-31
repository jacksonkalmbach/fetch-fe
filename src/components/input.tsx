import React from "react";

interface InputProps {
  name: string;
  type: string;
  placeholder: string;
  value: string;
  handleChange: (e: any) => void;
}

const Input = ({
  name,
  handleChange,
  type,
  placeholder,
  value,
}: InputProps) => {
  return (
    <input
      className="px-2 py-1 h-10 border border-lightGray rounded-md"
      placeholder={placeholder}
      type={type}
      onChange={handleChange}
      name={name}
      value={value}
    />
  );
};

export default Input;
