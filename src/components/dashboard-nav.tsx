import React from "react";
import DashNavItem from "./dashboard-nav-item";

const DashboardNav = () => {
  return (
    <div className="flex flex-col min-w-[280px] h-screen bg-white p-6 border-r-2 border-lightGray">
      <div className="flex m-10 justify-center items-center">LOGO</div>
      <div className="flex flex-col w-full items-center justify-start w-full h-full">
        <DashNavItem title="Find a Dog" icon="pets" link="discover" />
        <DashNavItem title="Favorites" icon="favorite" link="/favorites" />
      </div>
      <div className="mb-6">
        <DashNavItem title="Logout" icon="logout" link="/" />
      </div>
    </div>
  );
};

export default DashboardNav;
