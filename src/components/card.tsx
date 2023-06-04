import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { RootState } from "../store/store";

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
  const favorites = useSelector(
    (state: RootState) => state.searchFilters.favorites
  );
  const favorite = favorites.includes(id);
  const url = process.env.REACT_APP_BASE_API_URL;

  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleFavoriteClick = () => {
    if (!favorite && !favorites.includes(id)) {
      dispatch(addToFavorites(id));
    } else if (favorite) {
      dispatch(removeFromFavorites(id));
    }
  };

  useEffect(() => {
    let isMounted = true;

    setIsLoading(true);
    setError(false);

    const abortController = new AbortController();
    const signal = abortController.signal;

    fetch(`${url}/locations`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([zipCode]),
      signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        if (isMounted) {
          console.log(data);
          setCity(data[0].city);
          setState(data[0].state);
        }
      })
      .catch((error) => {
        if (isMounted) {
          console.error("Error fetching location in Card.tsx", error);
          setError(true);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [zipCode, url]);

  return (
    <div className="flex flex-col max-w-[270px] h-fit justify-center items-center px-2 py-4 bg-white rounded-lg">
      {isLoading ? (
        <Skeleton width={250} height={250} />
      ) : (
        <div className="relative w-[250px] h-[250px]">
          <HeartIcon favorite={favorite} onClick={handleFavoriteClick} />
          <Image img={img} name={name} />
        </div>
      )}
      <div className="w-full p-2">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-3xl">{name}</h3>
          <p className="flex items-center justify-center gap-1 text-gray-400 px-2">
            <span className="material-symbols-outlined">cake</span> {age}
          </p>
        </div>
        <div className="flex flex-col text-gray w-full">
          <p className="text-gray-400 text-md">{breed}</p>
          {error ? (
            <p className="text-red-500">Error fetching location</p>
          ) : (
            <p className="flex items-center justify-start gap-1 text-gray-400 text-gray text-md">
              {city}, {state} {zipCode}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
