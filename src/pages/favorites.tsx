import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { DogInterface } from "../types/dog";
import Card from "../components/card";
import BackIcon from "../components/icons/back";
import Match from "../components/match";
import Button from "../components/button";

const Favorites = () => {
  const navigate = useNavigate();
  const favorites = useSelector((state: any) => state.searchFilters.favorites);
  const [favoriteDogs, setFavoriteDogs] = useState<DogInterface[]>([]);
  const [showMatch, setShowMatch] = useState(false);

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
    console.log("Back to Discover");
  };

  const handleFindMatchClick = () => {
    if (favoriteDogs.length === 0) {
      return;
    }
    setShowMatch(true);
  };

  const handleClose = () => {
    setShowMatch(false);
  };

  return (
    <div className="w-full h-full relative">
      <Outlet />
      {showMatch && <Match onClick={handleClose} />}
      <div className="flex flex-col w-full h-full bg-lightGray p-6 gap-10">
        <div
          className="flex w-fit items-center p-2 border border-transparent rounded cursor-pointer hover:bg-gray hover:border hover:text-white"
          onClick={handleBackClick}
        >
          <BackIcon className="w-6 h-6 inline-block mr-2" />
          Back to Discover
        </div>
        <div className="flex flex-col w-full items-center px-6 gap-4 md:flex-row">
          <h1 className="text-center text-3xl font-bold w-full md:text-start">
            My Favorites
          </h1>
          <div className="flex w-full justify-center md:justify-end">
            <Button
              text="Find a Match"
              onClick={handleFindMatchClick}
              buttonType={favoriteDogs.length > 0 ? "primary" : "disabled"}
            />
          </div>
        </div>
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
