import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBreed } from "../store/reducers/search-filters-slice";

interface BreedOptionProps {
  title: string;
}

const BreedOption = ({ title }: BreedOptionProps) => {
  const dispatch = useDispatch();

  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    dispatch(addBreed(title));
    setSelected(true);
  };

  return (
    <div
      className={`flex justify-start w-full max-h-[40px] overflow-hidden hover:bg-lightGray p-2 cursor-pointer ${
        selected && "font-bold text-primary"
      }`}
      key={title}
      onClick={handleClick}
    >
      {title}
    </div>
  );
};

export default BreedOption;
