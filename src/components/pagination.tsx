import React from "react";
import ChevronLeftIcon from "./icons/chevron-left";
import ChevronRightIcon from "./icons/chevron-right";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPreviousPage,
  onNextPage,
}: PaginationProps) => {
  return (
    <div className="flex gap-8 justify-center items-center">
      <div
        className={`flex items-center ${
          currentPage > 1
            ? "hover:font-bold cursor-pointer"
            : "text-gray cursor-not-allowed"
        }`}
        onClick={onPreviousPage}
      >
        <ChevronLeftIcon className="h-4 w-4" />
        <p>Prev</p>
      </div>
      <div>
        Page {currentPage} of {totalPages}
      </div>
      <div
        className={`flex items-center ${
          currentPage < totalPages
            ? "hover:font-bold cursor-pointer"
            : "text-gray cursor-not-allowed"
        }`}
        onClick={onNextPage}
      >
        <p>Next</p>
        <ChevronRightIcon className="h-4 w-4" />
      </div>
    </div>
  );
};

export default Pagination;
