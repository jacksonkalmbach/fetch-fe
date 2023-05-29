import React from "react";

const DashboardNav = () => {
  return (
    <div className="flex flex-col min-w-[280px] h-screen bg-white p-6 border-r-2">
      <div className="flex m-10 justify-center items-center">LOGO</div>
      <div className="flex flex-col w-full items-center justify-center w-full h-[80px]">
        <div className="flex justify-center items-center bg-primary text-white w-full h-full rounded">
          <span className="material-symbols-outlined">pets</span>Discover
        </div>
        <div className="flex justify-center items-center">
          <span className="material-symbols-outlined font-variation-settings-FILL-1">
            favorite
          </span>
          Favorites
        </div>
        <div className="flex justify-center items-center w-full h-full">
          <span className="material-symbols-outlined">logout</span>Logout
        </div>
      </div>
    </div>
  );
};

export default DashboardNav;
