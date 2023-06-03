import React from "react";
import { Outlet } from "react-router-dom";

import DashboardNav from "../components/dashboard-nav";
import MobileHeader from "../components/mobile-header";

const Discover = () => {
  return (
    <>
      <div className="flex flex-col h-screen w-screen md:flex-row">
        <MobileHeader />
        <DashboardNav />
        <Outlet />
      </div>
    </>
  );
};

export default Discover;
