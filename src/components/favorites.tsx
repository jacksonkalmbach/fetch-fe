import React from "react";
import { useSelector } from "react-redux";

const Favorites = () => {
  const favorites = useSelector((state: any) => state.searchFilters.favorites);
  console.log(favorites);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex justify-between w-full items-end border-b border-primary">
        <p className="text-primary font-bold text-xl">Favorites</p>
        <p className="text-gray hover:font-bold cursor-pointer">View All</p>
      </div>
      <div className="flex flex-col gap-4 mt-2">
        {favorites.length > 0 &&
          favorites.map((favorite: string) => {
            return <p>{favorite}</p>;
          })}
      </div>
    </div>
  );
};

export default Favorites;
