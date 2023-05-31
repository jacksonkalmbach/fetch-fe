import React from "react";

interface FormInputProps {
  label: string;
  name: string;
  placeholder: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  value: string;
}

const FormInput = ({
  label,
  name,
  placeholder,
  handleChange,
  type,
  value,
}: FormInputProps) => {
  return (
    <div className="flex flex-col w-full">
      <label className="font-bold" htmlFor={name}>
        {label}
      </label>
      <input
        className="flex h-10 w-full border border-gray rounded bg-white px-3 py-2 text-sm ring-offset-background"
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default FormInput;
