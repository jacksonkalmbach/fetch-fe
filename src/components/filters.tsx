import React from "react";
import { useSelector, useDispatch } from "react-redux";

import SelectedFilter from "./selected-filter";
import {
  clearBreeds,
  clearZipCodes,
} from "../store/reducers/search-filters-slice";

const Filters = () => {
  const dispatch = useDispatch();
  const selectedBreeds = useSelector(
    (state: any) => state.searchFilters.breeds
  );
  const selectedZipCodes = useSelector(
    (state: any) => state.searchFilters.zipCodes
  );

  const handleClearAll = () => {
    dispatch(clearBreeds());
    dispatch(clearZipCodes());
  };

  const renderSelectedFilters = (filters: string[], type: string) => {
    return filters.map((filter: string) => (
      <SelectedFilter key={filter} title={filter} type={type} />
    ));
  };

  return (
    <div className="flex w-full items-center space-x-2 mt-6">
      <div className="flex items-center">
        {selectedBreeds.length > 0 || selectedZipCodes.length > 0 ? (
          <p className="font-bold">Filters Applied: </p>
        ) : null}
      </div>

      <div className="flex items-center space-x-2">
        {renderSelectedFilters(selectedBreeds, "breed")}
      </div>

      <div className="flex items-center space-x-2">
        {renderSelectedFilters(selectedZipCodes, "zipCode")}
      </div>

      {(selectedBreeds.length > 1 || selectedZipCodes.length > 1) && (
        <p className="cursor-pointer text-gray" onClick={handleClearAll}>
          Clear All
        </p>
      )}
    </div>
  );
};

export default Filters;
