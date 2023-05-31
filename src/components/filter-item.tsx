import React, { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import BreedOption from "./breed-option";

interface FilterItemProps {
  title: string;
  selected: boolean;
  onClick?: () => void;
}

const FilterItem = ({ title, selected }: FilterItemProps) => {
  const selectedBreeds = useSelector(
    (state: any) => state.searchFilters.breeds
  );
  const [breeds, setBreeds] = useState<string[]>([]);
  const [filteredBreeds, setFilteredBreeds] = useState<string[]>([]);
  const [searchField, setSearchField] = useState<string>("");

  useEffect(() => {
    fetch("https://frontend-take-home-service.fetch.com/dogs/breeds", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setBreeds(data);
      });
  }, []);

  useEffect(() => {
    const newFilteredBreeds = breeds.filter((breed) => {
      return breed.toLocaleLowerCase().includes(searchField);
    });

    setFilteredBreeds(newFilteredBreeds);
  }, [searchField, breeds]);

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchFieldString = event.target.value.toLowerCase();
    setSearchField(searchFieldString);
  };

  return (
    <>
      {title === "Breed" && selected ? (
        <div className="absolute w-[400px] flex flex-col justify-center border rounded items-center z-10 bg-white pt-6 px-4">
          <label className="font-bold">{title}</label>
          {selectedBreeds.length === 0 ? (
            <p>All Dog Breeds {breeds.length}</p>
          ) : (
            <p>{selectedBreeds.length} Selected</p>
          )}
          <input
            className="flex h-10 w-full border border-lightGray rounded bg-white px-3 py-2 text-sm ring-offset-background"
            type="text"
            placeholder="Search Breeds"
            onChange={onSearchChange}
          />
          <div className="h-[300px] overflow-scroll w-full overflow-x-hidden">
            {filteredBreeds.map((breed: string) => (
              <BreedOption title={breed} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-2">
          <label className="font-bold">{title}</label>
          <input
            className="flex h-10 w-full border border-gray rounded bg-white px-3 py-2 text-sm ring-offset-background"
            type="text"
            placeholder="Any"
          />
        </div>
      )}
    </>
  );
};

export default FilterItem;
