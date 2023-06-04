import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Card from "./card";
import Pagination from "./pagination";
import SearchResultHeader from "./search-result-header";

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
  const [nextPage, setNextPage] = useState<string>("");
  const [prevPage, setPrevPage] = useState<string>("");
  const resultsPerPage = 16;

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
    try {
      fetch(url, {
        method: "GET",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          setSearch(data.resultIds);
          setDogsAvailable(data.total);
          setNextPage(data.next);
          setPrevPage(data.prev);
        });
    } catch (error) {
      console.log("Error getting search results in SearchResults.tsx", error);
    }
  };

  useEffect(() => {
    const url = `${apiUrl}${searchEndpoint}?ageMin=${minAge}&ageMax=${maxAge}${searchZipCodes}${searchBreeds}&size=${resultsPerPage}&sort=breed:${sort}`;
    fetchData(url);
    setPageNumber(1);
  }, [minAge, maxAge, searchBreeds, searchZipCodes, sort, resultsPerPage]);

  useEffect(() => {
    const url = `${apiUrl}/dogs`;

    try {
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
    } catch (error) {
      console.log("Error getting dogs in SearchResults.tsx", error);
    }
  }, [search]);

  const handleNextPage = () => {
    if (pageNumber < Math.ceil(dogsAvailable / resultsPerPage)) {
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    }

    if (nextPage) {
      const url = new URL(nextPage, apiUrl);
      fetchData(url.href);
    }
  };

  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber((prevPageNumber) => prevPageNumber - 1);
    }

    if (prevPage) {
      const url = new URL(prevPage, apiUrl);
      fetchData(url.href);
    }
  };

  const handleFavoritesClick = () => {
    navigate("/discover/favorites");
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

  const allPages = Math.ceil(dogsAvailable / resultsPerPage);
  const currentPage = Math.min(pageNumber, allPages);

  return (
    <div className="flex flex-col gap-4 max-h-full overflow-hidden">
      <SearchResultHeader
        dogsAvailable={dogsAvailable}
        onFavoritesClick={handleFavoritesClick}
      />
      <div className="w-full h-4/5 flex flex-wrap overflow-scroll overflow-x-hidden justify-center gap-3">
        {renderCards()}
      </div>
      <div className="flex w-full justify-between px-6">
        <Pagination
          currentPage={currentPage}
          totalPages={allPages}
          onNextPage={handleNextPage}
          onPreviousPage={handlePreviousPage}
        />
      </div>
    </div>
  );
};

export default SearchResults;
