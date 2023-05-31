import React from "react";
import { Outlet } from "react-router-dom";

// import Dashboard from "../components/dashboard";
import DashboardNav from "../components/dashboard-nav";

const Discover = () => {
  return (
    <>
      <div className="flex h-screen w-screen">
        <DashboardNav />
        <Outlet />
      </div>
    </>
  );
};

export default Discover;
