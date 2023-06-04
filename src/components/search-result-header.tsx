import React from "react";

import Button from "./button";
import SelectSmall from "./select-small";

interface SearchResultHeaderProps {
  dogsAvailable: number;
  onFavoritesClick: () => void;
}

const SearchResultHeader: React.FC<SearchResultHeaderProps> = ({
  dogsAvailable,
  onFavoritesClick,
}) => {
  const handleFavoritesClick = () => {
    onFavoritesClick();
  };

  return (
    <div className="flex flex-col justify-between items-center px-8 md:flex md:flex-row md:w-full">
      <div className="hidden md:flex md:w-full">
        {dogsAvailable !== 0 ? (
          <h2>
            We found{" "}
            <span className="text-primary font-bold">{dogsAvailable}</span>{" "}
            available dogs!
          </h2>
        ) : (
          <h2>No dogs found</h2>
        )}
      </div>
      <div className="flex flex-col w-full md:items-center md:gap-4 md:flex-row md:justify-end">
        <div className="hidden md:flex">
          <Button
            type="button"
            buttonType="primary"
            onClick={handleFavoritesClick}
            text="View Favorites"
          />
        </div>
        <SelectSmall />
      </div>
    </div>
  );
};

export default SearchResultHeader;
