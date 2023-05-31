import React from "react";
import FilledHeartIcon from "./filled-heart";
import OutlineHeartIcon from "./outline-heart";

interface HeartIconProps {
  favorite: boolean;
  onClick: () => void;
}

const HeartIcon = ({ favorite, onClick }: HeartIconProps) => {
  return (
    <div className="absolute h-6 w-6 top-2 right-2 text-primary bg-white rounded-full p-1 z-10 cursor-pointer shadow-md">
      {favorite ? (
        <FilledHeartIcon onClick={onClick} />
      ) : (
        <OutlineHeartIcon onClick={onClick} />
      )}
    </div>
  );
};

export default HeartIcon;
