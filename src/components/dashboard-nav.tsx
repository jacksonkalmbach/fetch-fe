import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Logo from "./icons/logo";
import FavoritesList from "./favorites-list";
import FilterItem from "./filter-item";

const DashboardNav = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const userName = useSelector((state: any) => state.userAuth.name);
  const userEmail = useSelector((state: any) => state.userAuth.email);

  const handleSelected = (title: string) => {
    setSelectedFilter(title);
  };

  const handleLogout = async () => {
    try {
      await fetch("https://frontend-take-home-service.fetch.com/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userName,
          email: userEmail,
        }),
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="hidden md:flex flex-col min-w-[280px] h-screen bg-white p-6 border-r-2 border-lightGray overflow-hidden">
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
              name="breed"
              onClick={() => handleSelected("Breed")}
              selected={selectedFilter === "Breed"}
            />
          </div>
          <FilterItem
            title="Minimum Age"
            name="minAge"
            selected={selectedFilter === "Minimum Age"}
          />
          <FilterItem
            title="Maximum Age"
            name="maxAge"
            selected={selectedFilter === "Maximum Age"}
          />
          <FilterItem
            title="Zip Code"
            name="zipCode"
            selected={selectedFilter === "Zip Code"}
          />
          <FavoritesList />
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
