import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DogInterface } from "../types/dog";

import Button from "./button";
import Card from "./card";

interface MatchProps {
  onClick: () => void;
}

const Match = ({ onClick }: MatchProps) => {
  const favorites = useSelector((state: any) => state.searchFilters.favorites);
  const [matchId, setMatchId] = useState<string[]>([]);
  const [match, setMatch] = useState<DogInterface>({} as DogInterface);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      fetch("https://frontend-take-home-service.fetch.com/dogs/match", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(favorites),
      })
        .then((response) => response.json())
        .then((data) => {
          setMatchId([data.match]);
        });
    } catch (error) {
      console.log("Error finding a match in Match.tsx", error);
    }
  }, [favorites]);

  useEffect(() => {
    try {
      fetch("https://frontend-take-home-service.fetch.com/dogs", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(matchId),
      })
        .then((response) => response.json())
        .then((data) => {
          setMatch(data[0]);
          fetch("https://frontend-take-home-service.fetch.com/dogs/match", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(favorites),
          });
        });
    } catch (error) {
      console.log("Error getting match details in Match.tsx", error);
    }
  }, [favorites, matchId]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [match]);

  return (
    <>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-fit h-fit bg-white z-30 flex flex-col items-center justify-start p-12 shadow-md rounded-md">
        {isLoading ? (
          <div className="flex flex-col justify-center items-center max-w-1/2 max-h-1/2 p-6 gap-4">
            <div className="flex text-center flex-wrap">
              Finding your match...
            </div>
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
            </div>
          </div>
        ) : (
          match && (
            <div className="flex flex-col items-center justify-center gap-4 w-full">
              <div className="relative top-0 right-0  flex w-full justify-end md:justify-end md:px-6 ">
                <Button buttonType="outlined" onClick={onClick} text="Close" />
              </div>
              <h1 className="text-3xl font-bold mb-4">It's a Match!</h1>
              <div className="flex flex-col justify-between w-full bg-lightGray p-4 gap-4 rounded-md">
                <Card
                  id={match.id}
                  age={match.age}
                  breed={match.breed}
                  img={match.img}
                  name={match.name}
                  zipCode={match.zip_code}
                />
                <Button text={`Adopt ${match.name}`} buttonType="primary" />
              </div>
            </div>
          )
        )}
      </div>
      <div className="absolute z-20 w-full h-full bg-black opacity-60"></div>
    </>
  );
};

export default Match;
