import React from "react";

import Dashboard from "../components/dashboard";
import DashboardNav from "../components/dashboard-nav";
import Header from "../components/header";

const Discover = () => {
  return (
    <div className="flex h-screen w-screen">
      <DashboardNav />
      <div className="flex flex-col w-full h-full">
        <Header />
        <Dashboard />
      </div>
    </div>
  );
};

export default Discover;
