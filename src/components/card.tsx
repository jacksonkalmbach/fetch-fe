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
    <div className="flex flex-col max-w-[300px] max-h-[300px] justify-center items-center p-2 bg-white rounded cursor-pointer hover:border-2 hover:border-primary">
      <div className="relative w-[250px] h-[250px]">
        <span className="material-symbols-outlined absolute top-2 right-2 text-primary bg-white rounded-full p-1 z-10 cursor-pointer">
          favorite
        </span>
        <img className="w-full h-full object-cover" src={img} alt={name} />
      </div>
      <div>
        <h3 className="font-bold text-3xl">{name}</h3>
        <div className="flex text-gray">
          <p className="text-gray-400">{breed}</p>
          <p className="flex items-center justify-center gap-1 text-gray-400">
            <span className="material-symbols-outlined">cake</span> {age}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
