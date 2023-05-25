import React from "react";

const Label = ({ ...props }) => {
  return (
    <label
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      {...props}
    />
  );
};

export default Label;
