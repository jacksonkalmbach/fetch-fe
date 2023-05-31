import React from "react";
import { useDispatch } from "react-redux";
import { removeFromFavorites } from "../store/reducers/search-filters-slice";

import { DogInterface } from "../types/dog";
import FilledHeartIcon from "./icons/filled-heart";

interface DogProps {
  dog: DogInterface;
}

const FavoritePreview = ({ dog }: DogProps) => {
  const dispatch = useDispatch();
  const { id, name, breed, img } = dog;

  const handleClick = () => {
    dispatch(removeFromFavorites(id));
  };

  return (
    <div className="flex border border-lightGray items-center justify-between pr-2">
      <div className="flex space-x-2">
        <div className="h-12 w-12 object-contain">
          <img className="w-full h-full" src={img} alt={name} />
        </div>
        <div className="flex flex-col">
          <div className="font-bold">{name}</div>
          <div className="text-gray">{breed}</div>
        </div>
      </div>
      <FilledHeartIcon
        className="text-primary h-6 w-6 cursor-pointer"
        onClick={handleClick}
      />
    </div>
  );
};

export default FavoritePreview;
