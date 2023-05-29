import React from "react";

interface CardProps {
  name: string;
  breed: string;
  age: number;
  img: string;
  zipCode: string;
}

const Card = ({ name, breed, age, img, zipCode }: CardProps) => {
  return (
    <div className="flex flex-col max-w-[300px] justify-center items-center">
      <img className="w-full object-contain" src={img} alt={name} />
      <div className="flex flex-col w-full border p-6">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-3xl">{name}</h3>
          <span className="material-symbols-outlined cursor-pointer">
            favorite
          </span>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-gray-400">{breed}</p>
          <p className="flex items-center justify-center gap-1 text-gray-400">
            <span className="material-symbols-outlined">cake</span> {age}
          </p>
        </div>
        <div className="flex items-center space-x-1">
          <span className="material-symbols-outlined text-gray-400">
            location_on
          </span>
          <p className="text-left text-gray-400">{zipCode}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
