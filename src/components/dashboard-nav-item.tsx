import React from "react";

import { useNavigate } from "react-router-dom";

interface DashNavItemProps {
  title: string;
  icon: string;
  link: string;
}

const DashNavItem = ({ title, icon, link }: DashNavItemProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(link);
  };

  return (
    <div
      className="flex flex w-full items-center justify-center w-full h-[80px] text-gray cursor-pointer hover:bg-lightGray"
      onClick={handleClick}
    >
      <div className="flex justify-left items-center space-x-2 w-1/2">
        <span className="material-symbols-outlined">{icon}</span>
        <div>{title}</div>
      </div>
    </div>
  );
};

export default DashNavItem;
