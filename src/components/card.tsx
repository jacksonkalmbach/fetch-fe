// Card.tsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import HeartIcon from "./icons/heart-icon";
import Image from "./image";

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
  const favorite = favorites.includes(id);

  const handleFavoriteClick = () => {
    if (!favorite && !favorites.includes(id)) {
      dispatch(addToFavorites(id));
    } else if (favorite) {
      dispatch(removeFromFavorites(id));
    }
  };

  return (
    <div className="flex flex-col max-w-[270px] h-fit justify-center items-center px-2 py-4 bg-white rounded-lg">
      <div className="relative w-[250px] h-[250px]">
        <HeartIcon favorite={favorite} onClick={handleFavoriteClick} />
        <Image img={img} name={name} />
      </div>
      <div className="w-full">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-3xl">{name}</h3>
          <p className="flex items-center justify-center gap-1 text-gray-400 px-2">
            <span className="material-symbols-outlined">cake</span> {age}
          </p>
        </div>
        <div className="flex text-gray w-full justify-between items-center">
          <p className="text-gray-400">{breed}</p>
          <p className="flex items-center justify-center gap-1 text-gray-400 text-gray">
            <span className="material-symbols-outlined">location_on</span>{" "}
            {zipCode}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
