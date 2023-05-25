import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-start">
      <h1 className="text-xl">Find a Furry Friend!</h1>
      <button
        className="bg-primary text-white px-2 py-1 rounded"
        onClick={handleClick}
      >
        Get Started
      </button>
    </div>
  );
};

export default Home;
