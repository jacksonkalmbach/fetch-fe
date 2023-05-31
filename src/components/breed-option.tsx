import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBreed } from "../store/reducers/search-filters-slice";

interface BreedOptionProps {
  title: string;
}

const BreedOption = ({ title }: BreedOptionProps) => {
  const dispatch = useDispatch();
  const breeds = useSelector((state: any) => state.searchFilters.breeds);

  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (breeds.includes(title)) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [breeds, title]);

  const handleClick = () => {
    if (breeds.includes(title)) {
      return;
    } else {
      dispatch(addBreed(title));
      setSelected(true);
    }
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
