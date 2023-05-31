import React from "react";
import { useDispatch } from "react-redux";
import {
  removeBreed,
  removeZipCode,
} from "../store/reducers/search-filters-slice";

interface SelectedFilterProps {
  title: string;
  type: string;
}

const SelectedFilter = ({ title, type }: SelectedFilterProps) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    if (type === "breed") {
      dispatch(removeBreed(title));
    } else {
      dispatch(removeZipCode(title));
    }
  };

  return (
    <div className="flex justify-center items-center w-fit bg-white px-3 py-1 rounded-full space-x-2 shadow-md">
      <span
        className="material-symbols-outlined cursor-pointer text-primary text-sm"
        onClick={handleRemove}
      >
        close
      </span>
      <p className="text-gray">{title}</p>
    </div>
  );
};

export default SelectedFilter;
