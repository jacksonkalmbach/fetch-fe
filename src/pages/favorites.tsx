import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { DogInterface } from "../types/dog";
import Card from "../components/card";
import BackIcon from "../components/icons/back";

const Favorites = () => {
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
      });
  }, [favorites]);

  const handleBackClick = () => {
    navigate("/discover");
  };

  return (
    <div className="w-full h-full">
      <Outlet />
      <div className="flex flex-col w-full h-full bg-lightGray p-6 gap-10">
        <div className="flex w-fit items-center p-2 border border-transparent rounded cursor-pointer hover:border-gray hover:border">
          <BackIcon
            className="w-6 h-6 inline-block mr-2"
            onClick={handleBackClick}
          />
          Back to Discover
        </div>
        <h1 className="text-3xl font-bold w-full text-center">My Favorites</h1>
        <div className="flex w-full h-full justify-center flex-wrap gap-6">
          {favoriteDogs.length > 0 &&
            favoriteDogs.map((dog: DogInterface) => {
              const { id, name, age, img, zip_code, breed } = dog;
              return (
                <Card
                  key={id}
                  id={id}
                  name={name}
                  age={age}
                  img={img}
                  zipCode={zip_code}
                  breed={breed}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
