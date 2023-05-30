import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Slider from "@mui/material/Slider";
import SelectedFilter from "./selected-filter";
import Input from "./ui/input";

import { clearBreeds } from "../store/reducers/search-filters-slice";

const Filters = () => {
  const dispatch = useDispatch();

  const selectedBreeds = useSelector(
    (state: any) => state.searchFilters.breeds
  );

  const handleClearAll = () => {
    dispatch(clearBreeds);
  };

  return (
    <div className="flex flex-col w-full space-y-6">
      <div className="flex h-6 w-full justify-start items-center space-x-6">
        <Input type="text" placeholder="Search by breed" />

        <Input type="text" placeholder="Search by zip code" />
        <Slider
          getAriaLabel={() => "Temperature"}
          min={0}
          max={20}
          defaultValue={[2, 6]}
          valueLabelDisplay="auto"
          name="age"
        />
      </div>
      <div className="flex space-x-2 items-center">
        {selectedBreeds.map((breed: string) => (
          <SelectedFilter title={breed} />
        ))}
        {selectedBreeds.length > 0 && (
          <p className="cursor-pointer text-gray" onClick={handleClearAll}>
            Clear All
          </p>
        )}
      </div>
    </div>
  );
};

export default Filters;
