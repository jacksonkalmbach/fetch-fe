import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DogInterface } from "../types/dog";

import FavoritePreview from "./favoritePreview";

const FavoritesList = () => {
  const navigate = useNavigate();
  const favorites = useSelector((state: any) => state.searchFilters.favorites);
  const [favoriteDogs, setFavoriteDogs] = useState<DogInterface[]>([]);

  useEffect(() => {
    fetch("https://frontend-take-home-service.fetch.com/dogs", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(favorites),
    })
      .then((response) => response.json())
      .then((data) => {
        setFavoriteDogs(data);
        console.log(data);
      });
  }, [favorites]);

  const handleViewAllFavorites = () => {
    navigate("/discover/favorites");
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex justify-between w-full items-end border-b border-primary">
        <p className="text-primary font-bold text-xl">
          {`Favorites (${favoriteDogs.length})`}
        </p>
        {favoriteDogs.length > 0 && (
          <p
            className="text-gray hover:font-bold cursor-pointer"
            onClick={handleViewAllFavorites}
          >
            View All
          </p>
        )}
      </div>
      <div className="flex flex-col gap-4 mt-2 max-h-[200px] overflow-scroll overflow-x-hidden">
        {favoriteDogs.length > 0 &&
          favoriteDogs.map((dog: DogInterface) => (
            <FavoritePreview dog={dog} />
          ))}
      </div>
    </div>
  );
};

export default FavoritesList;
