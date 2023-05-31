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
    const fetchBreeds = async () => {
      try {
        const response = await fetch(
          "https://frontend-take-home-service.fetch.com/dogs/breeds",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        setBreeds(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBreeds();
  }, []);

  useEffect(() => {
    const newFilteredBreeds = breeds.filter((breed) =>
      breed.toLowerCase().includes(searchField)
    );
    setFilteredBreeds(newFilteredBreeds);
  }, [searchField, breeds]);

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    switch (event.target.name) {
      case "breed":
        setSearchField(inputValue.toLowerCase());
        break;
      case "minAge":
        dispatch(setMinAge(inputValue));
        break;
      case "maxAge":
        dispatch(setMaxAge(inputValue));
        break;
      case "zipCode":
        const zipCode = inputValue.trim();
        if (/^\d+$/.test(zipCode) && zipCode.length === 5) {
          dispatch(addZipCode(zipCode));
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setShowOptions(searchField.length > 0);
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
        maxLength={name === "zipCode" ? 5 : undefined}
      />
      {title === "Breed" && showOptions && (
        <div className="max-h-[150px] w-full overflow-y-auto">
          {filteredBreeds.map((breed: string) => (
            <BreedOption key={breed} title={breed} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterItem;
