import React from "react";

interface SelectedFilterProps {
  title: string;
}

const SelectedFilter = ({ title }: SelectedFilterProps) => {
  return (
    <div className="flex justify-center items-center w-fit bg-white px-3 py-1 rounded-full space-x-2 shadow-md">
      <span className="material-symbols-outlined cursor-pointer text-primary text-sm">
        close
      </span>
      <p className="text-gray">{title}</p>
    </div>
  );
};

export default SelectedFilter;
