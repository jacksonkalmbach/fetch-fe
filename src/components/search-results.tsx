import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Card from "./card";
import Dropdown from "./select-small";
// import ChevronDownIcon from "./icons/chevron-down";
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
  const [search, setSearch] = useState<Dog[]>([]);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [dogsAvailable, setDogsAvailable] = useState<number>(0);
  const resultsPerPage = 8;

  const filters = useSelector((state: any) => state.searchFilters);

  const apiUrl = "https://frontend-take-home-service.fetch.com";
  const searchEndpoint = "/dogs/search";
  const { minAge, maxAge, breeds, zipCodes, sort } = filters;

  useEffect(() => {
    fetch(
      `https://frontend-take-home-service.fetch.com/dogs/search?ageMin=${minAge}&ageMax=${maxAge}&size=${resultsPerPage}&sort=breed:${sort}`,
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

  return (
    <div className="flex flex-col gap-6 max-h-full overflow-hidden">
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

        {/* <div className="flex bg-white px-3 py-2 space-x-2 rounded">
          <p className="text-gray">Sort by:</p>
          <p className="text-primary">{sortType}</p>
          <ChevronDownIcon className="w-6 h-6 cursor-pointer" />
        </div> */}
        <SelectSmall />
      </div>
      <div className="w-full h-full flex flex-wrap overflow-hidden justify-center gap-4">
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
      <div className="flex gap-4 w-full justify-center items-center">
        <div
          className="flex items-center hover:font-bold cursor-pointer"
          onClick={() => console.log("back")}
        >
          <ChevronLeftIcon className="h-4 w-4" />
          <p>Prev Page</p>
        </div>
        <div className="flex items-center hover:font-bold cursor-pointer">
          <p>Next Page</p>
          <ChevronRightIcon className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
