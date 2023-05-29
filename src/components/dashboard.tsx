import React from "react";
import Filters from "./filters";

const Dashboard = () => {
  return (
    <div className="w-full h-full flex bg-lightGray">
      <div className="flex flex-col w-full p-12">
        <h1 className="text-3xl font-bold">Find a Dog</h1>
        <div className="flex w-[600px]">
          <Filters />
        </div>
        <div className="flex justify-between">
          <h2>
            We found <span className="text-primary font-bold">53</span>{" "}
            available dogs!
          </h2>
          <h2>Sort by: Date</h2>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
