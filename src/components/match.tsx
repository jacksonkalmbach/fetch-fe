import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DogInterface } from "../types/dog";
import CloseIcon from "./icons/close";

interface MatchProps {
  onClick: () => void;
}

const Match = ({ onClick }: MatchProps) => {
  const favorites = useSelector((state: any) => state.searchFilters.favorites);
  const [matchId, setMatchId] = useState<string[]>([]);
  const [match, setMatch] = useState<DogInterface>({} as DogInterface);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
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
  }, [favorites]);

  useEffect(() => {
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
      });
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
            <div>Finding your match...</div>
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
            </div>
          </div>
        ) : (
          match && (
            <div className="flex flex-col items-center justify-center">
              <div className="flex w-full justify-end px-6 ">
                <div
                  className="flex items-center space-x-2 w-fit px-3 py-2 text-gray cursor-pointer border-transparent rounded hover:border hover:border-gray"
                  onClick={onClick}
                >
                  <CloseIcon className="w-6 h-6" />
                  Close
                </div>
              </div>
              <h1 className="text-3xl font-bold mb-4">It's a Match!</h1>
              <div className="flex justify-between w-full bg-lightGray p-4 rounded-md">
                <img src={match.img} alt={match.name} className="w-1/2" />
                <div className="flex flex-col w-full items-center justify-start  p-2">
                  <h2 className="text-2xl font-bold w-full px-4">
                    {match.name}
                  </h2>
                  <div className="flex flex-col gap-2 w-full h-full justify-start items-start px-4 mt-6">
                    <div>
                      <p className="font-bold text-l">Details:</p>
                    </div>
                    <p>Age: {match.age}</p>
                    <p>Breed: {match.breed}</p>
                    <p>Location: {match.zip_code}</p>
                  </div>
                  <button className="bg-primary text-white px-4 py-2 rounded-md mt-4">
                    Adopt {match.name}
                  </button>
                </div>
              </div>
              <div className="flex gap-4 mt-4"></div>
            </div>
          )
        )}
      </div>
      <div className="absolute z-20 w-full h-full bg-black opacity-60"></div>
    </>
  );
};

export default Match;
