import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearFavorites } from "../store/reducers/search-filters-slice";
import { DogInterface } from "../types/dog";

import FavoritePreview from "./favoritePreview";

const FavoritesList = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: any) => state.searchFilters.favorites);
  const [favoriteDogs, setFavoriteDogs] = useState<DogInterface[]>([]);

  useEffect(() => {
    const fetchFavoriteDogs = async () => {
      try {
        const response = await fetch(
          "https://frontend-take-home-service.fetch.com/dogs",
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(favorites),
          }
        );
        const data = await response.json();
        setFavoriteDogs(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFavoriteDogs();
  }, [favorites]);

  const handleClearFavorites = () => {
    dispatch(clearFavorites());
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex justify-between w-full items-end border-b border-primary">
        <p className="text-primary font-bold text-xl">
          Favorites ({favoriteDogs.length})
        </p>
        {favoriteDogs.length > 0 && (
          <p
            className="text-gray hover:font-bold cursor-pointer"
            onClick={handleClearFavorites}
          >
            Clear All
          </p>
        )}
      </div>
      <div className="flex flex-col gap-4 mt-2 max-h-[200px] overflow-y-auto">
        {favoriteDogs.map((dog: DogInterface) => (
          <FavoritePreview key={dog.id} dog={dog} />
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;
