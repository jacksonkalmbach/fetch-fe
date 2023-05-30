import React, { useState, useEffect } from "react";

import Card from "./card";

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

const SearchResults = () => {
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

  return (
    <div className="w-full h-full flex flex-wrap overflow-hidden justify-center gap-2">
      {dogs.map((dog) => {
        return (
          <Card
            key={dog.id}
            age={dog.age}
            breed={dog.breed}
            img={dog.img}
            name={dog.name}
            zipCode={dog.zip_code}
          />
        );
      })}
    </div>
  );
};

export default SearchResults;
