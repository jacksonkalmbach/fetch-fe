import React from "react";

import Dashboard from "../components/dashboard";
import DashboardNav from "../components/dashboard-nav";

const Discover = () => {
  return (
    <div className="flex h-screen w-screen">
      <DashboardNav />
      <div className="flex flex-col w-full h-full">
        <Dashboard />
      </div>
    </div>
  );
};

export default Discover;
