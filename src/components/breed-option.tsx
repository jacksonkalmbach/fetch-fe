import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBreed } from "../store/reducers/search-filters-slice";

interface BreedOptionProps {
  title: string;
}

const BreedOption = ({ title }: BreedOptionProps) => {
  const dispatch = useDispatch();
  const breeds = useSelector((state: any) => state.searchFilters.breeds);
  const isSelected = breeds.includes(title);

  const handleClick = () => {
    if (isSelected) {
      return;
    } else {
      dispatch(addBreed(title));
    }
  };

  useEffect(() => {
    setSelected(isSelected);
  }, [isSelected]);

  const [selected, setSelected] = useState<boolean>(isSelected);

  return (
    <div
      className={`flex justify-start w-full max-h-[40px] overflow-hidden hover:bg-lightGray p-2 cursor-pointer ${
        selected && "font-bold text-primary"
      }`}
      onClick={handleClick}
    >
      {title}
    </div>
  );
};

export default BreedOption;
