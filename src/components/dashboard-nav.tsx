import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Favorites from "./favorites";

import FilterItem from "./filter-item";
import Logo from "./icons/logo";

const DashboardNav = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState<string>("");

  const handleSelected = (title: string) => {
    setSelectedFilter(title);
    console.log(title);
  };

  const handleLogout = () => {
    fetch("https://frontend-take-home-service.fetch.com/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // name: userName,
        // email: userEmail,
      }),
    });

    navigate("/login");
  };

  return (
    <div className="flex flex-col min-w-[280px] h-screen bg-white p-6 border-r-2 border-lightGray">
      <div className="flex mb-4 justify-center items-center w-full space-x-2">
        <Logo />
        <h1 className="text-primary font-bold text-3xl">PETFETCH</h1>
      </div>
      <p className="text-primary font-bold text-xl w-full border-b mb-4">
        Filters
      </p>
      <div className="flex flex-col h-full justify-between">
        <div className="flex flex-col gap-6">
          <div className="relative">
            <FilterItem
              title="Breed"
              onClick={() => handleSelected("Breed")}
              selected={selectedFilter === "Breed" ? true : false}
            />
          </div>
          <FilterItem
            title="Minimum Age"
            selected={selectedFilter === "Minimum Age" ? true : false}
          />
          <FilterItem
            title="Maximum Age"
            selected={selectedFilter === "Maximum Age" ? true : false}
          />
          <FilterItem
            title="Zip Code"
            selected={selectedFilter === "Zip Code" ? true : false}
          />
          <Favorites />
        </div>
        <p
          className="flex text-gray items-center w-full justify-center gap-2 rounded cursor-pointer p-2 hover:bg-lightGray hover:text-black"
          onClick={handleLogout}
        >
          <span className="material-symbols-outlined">logout</span>Logout
        </p>
      </div>
    </div>
  );
};

export default DashboardNav;
