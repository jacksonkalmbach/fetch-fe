import React from "react";

interface CardTitleProps {
  title: string;
}

const CardTitle = ({ title }: CardTitleProps) => {
  return <h2 className="flex font-bold font-3xl">{title}</h2>;
};

export default CardTitle;
