import React, { useState, useEffect } from "react";

import Slider from "@mui/material/Slider";
import Card from "../components/card";
import { getValue } from "@mui/system";

interface Dog {
  id: string;
  name: string;
  breed: string;
  img: string;
  age: number;
  zip_code: string;
}

const defaultDog = {
  id: "",
  name: "",
  breed: "",
  img: "",
  age: 0,
  zip_code: "",
};

const defaultFilters = {
  breeds: [],
  zipCodes: [],
  ageMin: 0,
  ageMax: 0,
};

const Explore = () => {
  const [search, setSearch] = useState<Dog[]>([]);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [filters, setFilters] = useState(defaultFilters);

  useEffect(() => {
    fetch(`https://frontend-take-home-service.fetch.com/dogs/search`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setSearch(data.resultIds);
      });
  }, [filters]);

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
        console.log("data", data);
        setDogs(data);
      });
  }, [search]);

  const handleAgeChange = (event: Event, newValue: number | number[]) => {
    console.log(newValue);
  };

  return (
    <div className="p-6">
      <h1>Find your Furry Friend</h1>
      <h2>Filter by:</h2>
      <div className="w-[200px]">
        <label>Age: </label>
        <Slider
          getAriaLabel={() => "Temperature"}
          min={0}
          max={20}
          defaultValue={[2, 6]}
          valueLabelDisplay="auto"
          name="age"
          onChange={handleAgeChange}
        />
      </div>
      <div className="flex flex-wrap items-start gap-2">
        {dogs.length > 0 &&
          dogs.map((dog) => (
            <Card
              key={dog.id}
              name={dog.name}
              breed={dog.breed}
              age={dog.age}
              img={dog.img}
              zipCode={dog.zip_code}
            />
          ))}
      </div>
    </div>
  );
};

export default Explore;
