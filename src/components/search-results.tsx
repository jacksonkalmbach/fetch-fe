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

  const favorites = useSelector((state: any) => state.searchFilters.favorites);
  const { minAge, maxAge, breeds, zipCodes, sort } = useSelector(
    (state: any) => state.searchFilters
  );

  const searchBreeds = breeds
    .map((breed: string) => `&breeds=${encodeURIComponent(breed)}`)
    .join("");
  const searchZipCodes = zipCodes
    .map((zipCode: string) => `&zipCodes=${encodeURIComponent(zipCode)}`)
    .join("");

  const apiUrl = "https://frontend-take-home-service.fetch.com";
  const searchEndpoint = "/dogs/search";

  const fetchData = (url: string) => {
    fetch(url, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setSearch(data.resultIds);
        setDogsAvailable(data.total);
      });
  };

  useEffect(() => {
    const url = `${apiUrl}${searchEndpoint}?ageMin=${minAge}&ageMax=${maxAge}${searchZipCodes}${searchBreeds}&size=${resultsPerPage}&sort=breed:${sort}`;
    fetchData(url);
  }, [minAge, maxAge, searchBreeds, searchZipCodes, sort, resultsPerPage]);

  useEffect(() => {
    const url = `${apiUrl}/dogs`;
    fetch(url, {
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
    if (pageNumber < Math.ceil(dogsAvailable / resultsPerPage)) {
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    }
  };

  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber((prevPageNumber) => prevPageNumber - 1);
    }
  };

  const handleFavoritesClick = () => {
    navigate("/discover/favorites");
  };

  const renderHeader = () => {
    if (dogsAvailable !== 0) {
      return (
        <h2>
          We found{" "}
          <span className="text-primary font-bold">{dogsAvailable}</span>{" "}
          available dogs!
        </h2>
      );
    } else {
      return <h2>No dogs found</h2>;
    }
  };

  const renderCards = () => (
    <>
      {dogs.map((dog) => (
        <Card
          key={dog.id}
          id={dog.id}
          age={dog.age}
          breed={dog.breed}
          img={dog.img}
          name={dog.name}
          zipCode={dog.zip_code}
        />
      ))}
    </>
  );

  const renderPagination = () => {
    const allPages = Math.ceil(dogsAvailable / resultsPerPage);
    const currentPage = Math.min(pageNumber, allPages);

    return (
      <div className="flex gap-8 justify-center items-center">
        <div
          className={`flex items-center ${
            pageNumber > 1
              ? "hover:font-bold cursor-pointer"
              : "text-gray cursor-not-allowed"
          }`}
          onClick={handlePreviousPage}
        >
          <ChevronLeftIcon className="h-4 w-4" />
          <p>Prev </p>
        </div>
        <div>
          Page {currentPage} of {allPages}
        </div>
        <div
          className={`flex items-center ${
            pageNumber < allPages
              ? "hover:font-bold cursor-pointer"
              : "text-gray cursor-not-allowed"
          }`}
          onClick={handleNextPage}
        >
          <p>Next</p>
          <ChevronRightIcon className="h-4 w-4" />
        </div>
      </div>
    );
  };

  const renderStats = () => (
    <div className="flex">
      Viewing{" "}
      <p className="font-bold px-2 text-primary">
        {Math.min(resultsPerPage, dogsAvailable)}
      </p>{" "}
      of <p className="font-bold px-2 text-primary">{dogsAvailable}</p>
    </div>
  );

  return (
    <div className="flex flex-col gap-4 max-h-full overflow-hidden">
      <div className="flex justify-between items-center px-8">
        {renderHeader()}
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
        {renderCards()}
      </div>
      <div className="flex w-full justify-between px-6">
        {renderPagination()}
        {renderStats()}
      </div>
    </div>
  );
};

export default SearchResults;
