import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setMinAge,
  setMaxAge,
  addZipCode,
} from "../store/reducers/search-filters-slice";

import BreedOption from "./breed-option";

interface FilterItemProps {
  title: string;
  selected: boolean;
  name: string;
  onClick?: () => void;
}

const FilterItem = ({ title, selected, name }: FilterItemProps) => {
  const dispatch = useDispatch();
  const [breeds, setBreeds] = useState<string[]>([]);
  const [filteredBreeds, setFilteredBreeds] = useState<string[]>([]);
  const [searchField, setSearchField] = useState<string>("");
  const [showOptions, setShowOptions] = useState<boolean>(false);

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
    if (event.target.name === "breed") {
      const searchFieldString = event.target.value.toLowerCase();
      setSearchField(searchFieldString);
    } else if (event.target.name === "minAge") {
      dispatch(setMinAge(event.target.value));
    } else if (event.target.name === "maxAge") {
      dispatch(setMaxAge(event.target.value));
    }
  };

  useEffect(() => {
    if (searchField.length > 0) {
      setShowOptions(true);
    } else {
      setShowOptions(false);
    }
  }, [searchField]);

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <label className="font-bold">{title}</label>
      <input
        className="flex h-10 w-full border border-gray rounded bg-white px-3 py-2 text-sm ring-offset-background"
        type="text"
        placeholder="Any"
        name={name}
        onChange={onSearchChange}
      />
      {title === "Breed" && showOptions && (
        <div className="max-h-[150px] w-full overflow-scroll overflow-x-hidden">
          {filteredBreeds.map((breed: string) => (
            <BreedOption title={breed} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterItem;
