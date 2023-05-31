import React from "react";
import { useSelector, useDispatch } from "react-redux";

import SelectedFilter from "./selected-filter";

import { clearBreeds } from "../store/reducers/search-filters-slice";

const Filters = () => {
  const dispatch = useDispatch();

  const selectedBreeds = useSelector(
    (state: any) => state.searchFilters.breeds
  );

  const handleClearAll = () => {
    dispatch(clearBreeds());
  };

  return (
    <div className="flex flex-col w-full">
      {selectedBreeds.length > 0 && (
        <p className="font-bold">Filters Applied: </p>
      )}
      <div className="flex flex-wrap space-x-2 space-y-2 items-center mt-4">
        {selectedBreeds.map((breed: string) => (
          <SelectedFilter title={breed} />
        ))}
        {selectedBreeds.length > 1 && (
          <p className="cursor-pointer text-gray" onClick={handleClearAll}>
            Clear All
          </p>
        )}
      </div>
    </div>
  );
};

export default Filters;
