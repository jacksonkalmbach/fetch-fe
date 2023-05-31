import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Card from "./card";
import ChevronDownIcon from "./icons/chevron-down";

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
  const [sortType, setSortType] = useState<string>("Breeds A-Z");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const resultsPerPage = 8;

  const filters = useSelector((state: any) => state.searchFilters);

  const apiUrl = "https://frontend-take-home-service.fetch.com";
  const searchEndpoint = "/dogs/search";
  const { minAge, maxAge, breeds, zipCodes } = filters;

  const queryParams = new URLSearchParams();
  queryParams.append("minAge", minAge.toString());
  queryParams.append("maxAge", maxAge.toString());

  if (breeds.length > 0) {
    breeds.forEach((breed: string) => queryParams.append("breeds", breed));
  }

  if (zipCodes.length > 0) {
    zipCodes.forEach((zipCode: string) =>
      queryParams.append("zipCodes", zipCode)
    );
  }
  const searchUrl = `${apiUrl}${searchEndpoint}?${queryParams.toString()}`;

  useEffect(() => {
    fetch(searchUrl, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setSearch(data.resultIds);
        setDogsAvailable(data.total);
        setCurrentPage(1);
      });
  }, [filters, searchUrl]);

  useEffect(() => {
    // Calculate the start and end index of the current page's results
    const startIndex = (currentPage - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;

    // Extract the portion of dogs array for the current page
    const currentDogs = search.slice(startIndex, endIndex);

    fetch("https://frontend-take-home-service.fetch.com/dogs", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currentDogs), // Use currentDogs instead of search
    })
      .then((response) => response.json())
      .then((data) => {
        setDogs(data);
      });
  }, [search, currentPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-col gap-6 mx-h-full overflow-scroll">
      <div className="flex justify-between items-center px-8">
        <h2>
          We found{" "}
          <span className="text-primary font-bold">{dogsAvailable}</span>{" "}
          available dogs!
        </h2>
        <div className="flex bg-white px-3 py-2 space-x-2 rounded">
          <p className="text-gray">Sort by:</p>
          <p className="text-primary">{sortType}</p>
          <ChevronDownIcon className="w-6 h-6 cursor-pointer" />
        </div>
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
      {/* Pagination */}
    </div>
  );
};

export default SearchResults;

{
  /* <div className="flex justify-center my-4">
        {Array.from({ length: Math.ceil(dogsAvailable / resultsPerPage) }).map(
          (_, index) => (
            <button
              key={index}
              className={`mx-1 px-2 py-1 rounded ${
                currentPage === index + 1 ? "bg-primary text-white" : "bg-gray"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          )
        )}
      </div> */
}
