import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import FilledHeartIcon from "./icons/filled-heart";
import OutlineHeartIcon from "./icons/outline-heart";

import {
  addToFavorites,
  removeFromFavorites,
} from "../store/reducers/search-filters-slice";

interface CardProps {
  id: string;
  name: string;
  breed: string;
  age: number;
  img: string;
  zipCode: string;
}

const Card = ({ id, name, breed, age, img, zipCode }: CardProps) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: any) => state.searchFilters.favorites);

  const [favorite, setFavorite] = useState(false);

  const handleFavoriteClick = () => {
    if (!favorite) {
      if (favorites.includes(id)) {
        return;
      } else {
        dispatch(addToFavorites(id));
        setFavorite(true);
      }
    } else {
      dispatch(removeFromFavorites(id));
      setFavorite(false);
    }
  };

  return (
    <div className="flex flex-col max-w-[300px] h-fit justify-center items-center px-2 py-4 bg-white rounded-lg">
      <div className="relative w-[250px] h-[250px]">
        {favorites.includes(id) ? (
          <FilledHeartIcon
            className="absolute h-6 w-6 top-2 right-2 text-primary bg-white rounded-full p-1 z-10 cursor-pointer shadow-md"
            onClick={handleFavoriteClick}
          />
        ) : (
          <OutlineHeartIcon
            className="absolute h-6 w-6 top-2 right-2 text-primary bg-white rounded-full p-1 z-10 cursor-pointer shadow-md"
            onClick={handleFavoriteClick}
          />
        )}
        <img className="w-full h-full object-cover" src={img} alt={name} />
      </div>
      <div className="w-full">
        <div className="flex justify-center items-center">
          <h3 className="font-bold text-3xl">{name}</h3>
        </div>
        <div className="flex text-gray w-full justify-evenly items-center">
          <p className="text-gray-400">{breed}</p>
          <p className="flex items-center justify-center gap-1 text-gray-400 px-2">
            <span className="material-symbols-outlined">cake</span> {age}
          </p>
          <p className="flex items-center justify-center gap-1 text-gray-400">
            <span className="material-symbols-outlined">location_on</span>{" "}
            {zipCode}
          </p>
        </div>
        <div className="flex justify-start text-gray"></div>
      </div>
    </div>
  );
};

export default Card;
