import React from "react";
import Input from "./ui/input";


const Filters = () => {
  return (
    <div className="flex h-6 w-full justify-center items-center space-x-4 p-6">
      <label>Breed</label>
      <Input type="text" placeholder="Search by breed" />
      <Input type="text" placeholder="Search by zip code" />
      <Input type="text" placeholder="Search by age" />
    </div>
  );
};

export default Filters;
