import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Button from "./button";
import Card from "./card";
import ChevronLeftIcon from "./icons/chevron-left";
import ChevronRightIcon from "./icons/chevron-right";
import SelectSmall from "./select-small";

interface Dog {
  id: string;
  name: string;
  breed: string;
  img: string;
  age: number;
  zip_code: string;
}

const SearchResults = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState<Dog[]>([]);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [dogsAvailable, setDogsAvailable] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const resultsPerPage = 16;
  const allPages = Math.ceil(dogsAvailable / resultsPerPage);

  const favorites = useSelector((state: any) => state.searchFilters.favorites);
  const filters = useSelector((state: any) => state.searchFilters);

  const apiUrl = "https://frontend-take-home-service.fetch.com";
  const searchEndpoint = "/dogs/search";
  const { minAge, maxAge, breeds, zipCodes, sort } = filters;

  const searchBreeds = breeds.map((breed: string) => `&breeds=${breed}`);

  const searchZipCodes = zipCodes.map(
    (zipCode: string) => `&zipCodes=${zipCode}`
  );

  console.log("SEARCH ZIP CODES", searchZipCodes.join());
  console.log("SEARCH BREEDS", searchBreeds);

  useEffect(() => {
    fetch(
      `https://frontend-take-home-service.fetch.com/dogs/search?ageMin=${minAge}&ageMax=${maxAge}${searchZipCodes.join()}${searchBreeds}&size=${resultsPerPage}&sort=breed:${sort}`,
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("DATA", data);
        setSearch(data.resultIds);
        setDogsAvailable(data.total);
      });
  }, [filters, minAge, maxAge]);

  useEffect(() => {
    fetch("https://frontend-take-home-service.fetch.com/dogs", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(search),
    })
      .then((response) => response.json())
      .then((data) => {
        setDogs(data);
      });
  }, [search]);

  const handleNextPage = () => {
    if (pageNumber < allPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleFavoritesClick = () => {
    navigate("/discover/favorites");
  };

  return (
    <div className="flex flex-col gap-4 max-h-full overflow-hidden">
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
          {favorites.length > 0 && (
            <Button
              type="button"
              buttonType="primary"
              onClick={handleFavoritesClick}
              text="Go To Favorites"
            />
          )}
          <SelectSmall />
        </div>
      </div>
      <div className="w-full h-4/5 flex flex-wrap overflow-scroll overflow-x-hidden justify-center gap-3">
        {dogs.map((dog) => {
          return (
            <Card
              key={dog.id}
              id={dog.id}
              age={dog.age}
              breed={dog.breed}
              img={dog.img}
              name={dog.name}
              zipCode={dog.zip_code}
            />
          );
        })}
      </div>
      <div className="flex w-full justify-between px-6">
        <div className="flex gap-8 justify-center items-center">
          <div
            className={`flex items-center ${
              pageNumber > 1
                ? "hover:font-bold cursor-pointer"
                : "text-gray cursor-not-allowed"
            }}`}
            onClick={handlePreviousPage}
          >
            <ChevronLeftIcon className="h-4 w-4" />
            <p>Prev </p>
          </div>
          <div>
            Page {pageNumber < allPages ? pageNumber : allPages} of {allPages}
          </div>
          <div
            className={`flex items-center ${
              pageNumber < allPages
                ? "hover:font-bold cursor-pointer"
                : "text-gray cursor-not-allowed"
            }}`}
            onClick={handleNextPage}
          >
            <p>Next</p>
            <ChevronRightIcon className="h-4 w-4" />
          </div>
        </div>
        <div className="flex">
          Viewing{" "}
          <p className="font-bold px-2 text-primary">
            {resultsPerPage < dogsAvailable ? resultsPerPage : dogsAvailable}
          </p>{" "}
          of <p className="font-bold px-2 text-primary">{dogsAvailable}</p>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
