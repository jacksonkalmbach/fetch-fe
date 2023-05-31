import React from "react";
import Filters from "./filters";
import SearchResults from "./search-results";

const Dashboard = () => {
  return (
    <div className="w-full h-full flex bg-lightGray">
      <div className="flex flex-col h-full w-full px-12">
        <div className="flex h-full flex-col w-full gap-6">
          <Filters />
          <SearchResults />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
