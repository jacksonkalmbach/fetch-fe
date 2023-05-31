import React from "react";

interface ImageProps {
  img: string;
  name: string;
}

const Image = ({ img, name }: ImageProps) => {
  return <img className="w-full h-full object-cover" src={img} alt={name} />;
};

export default Image;
