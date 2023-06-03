import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import FiltersIcon from "./icons/filters";
import FilledHeartIcon from "./icons/filled-heart";
import Logo from "./icons/logo";
import { RootState } from "../store/store";

const MobileHeader = () => {
  const navigate = useNavigate();
  const favorites = useSelector(
    (state: RootState) => state.searchFilters.favorites
  );

  const handleFavoritesClick = () => {
    navigate("/discover/favorites");
  };

  return (
    <div className="flex items-center justify-around p-2 bg-white md:hidden">
      <FiltersIcon className="w-8 h-8 text-gray" />
      <div className="flex items-center space-x-1">
        <Logo />
        <div className="text-2xl text-primary font-bold">PETFETCH</div>
      </div>
      <div onClick={handleFavoritesClick}>
        {favorites.length > 0 ? (
          <FilledHeartIcon
            className="w-8 h-8 text-primary"
            count={favorites.length}
          />
        ) : (
          <FilledHeartIcon className="w-8 h-8 text-gray" />
        )}
      </div>
    </div>
  );
};

export default MobileHeader;
