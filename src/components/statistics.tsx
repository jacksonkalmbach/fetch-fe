import React from "react";

interface StatisticsProps {
  resultsPerPage: number;
  dogsAvailable: number;
}

const Statistics = ({ resultsPerPage, dogsAvailable }: StatisticsProps) => {
  const displayedResults = Math.min(resultsPerPage, dogsAvailable);

  return (
    <div className="flex">
      Viewing <p className="font-bold px-2 text-primary">{displayedResults}</p>{" "}
      of <p className="font-bold px-2 text-primary">{dogsAvailable}</p>
    </div>
  );
};

export default Statistics;
