import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  // const userName = useSelector((state: any) => state.user.name);
  // const userEmail = useSelector((state: any) => state.user.email);

  const handleLogout = () => {
    fetch("https://frontend-take-home-service.fetch.com/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // name: userName,
        // email: userEmail,
      }),
    });

    navigate("/login");
  };

  return (
    <div className="w-full bg-white flex justify-end gap-4 px-6 py-4 items-center">
      <p
        className="flex text-gray items-center justify-center space-x-3 rounded cursor-pointer p-2 hover:bg-lightGray hover:text-black"
        onClick={handleLogout}
      >
        <span className="material-symbols-outlined">logout</span>Logout
      </p>
    </div>
  );
};

export default Header;
