import Slider from "@mui/material/Slider";
import React from "react";
import SelectedFilter from "./selected-filter";
import Input from "./ui/input";

const Filters = () => {
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
        <SelectedFilter title="Golden Retriever" />
        <SelectedFilter title="Lab" />
        <SelectedFilter title="Vizsla" />
        <p className="cursor-pointer text-gray">Clear All</p>
      </div>
    </div>
  );
};

export default Filters;
