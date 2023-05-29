import React from "react";
import Filters from "./filters";

const Dashboard = () => {
  return (
    <div className="w-full h-full flex bg-lightGray">
      <div className="flex flex-col w-full p-12">
        <div className="flex flex-col w-full mb-12">
          <h1 className="text-3xl font-bold mb-6">Find a Dog</h1>
          <div className="flex w-full">
            <Filters />
          </div>
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
