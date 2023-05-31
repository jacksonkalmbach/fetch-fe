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
    <div className="flex justify-between items-center px-8">
      {dogsAvailable !== 0 ? (
        <h2>
          We found{" "}
          <span className="text-primary font-bold">{dogsAvailable}</span>{" "}
          available dogs!
        </h2>
      ) : (
        <h2>No dogs found</h2>
      )}
      <div className="flex items-center gap-4">
        <Button
          type="button"
          buttonType="primary"
          onClick={handleFavoritesClick}
          text="Go To Favorites"
        />
        <SelectSmall />
      </div>
    </div>
  );
};

export default SearchResultHeader;
