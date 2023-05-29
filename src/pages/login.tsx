import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import UserAuthForm from "../components/user-auth-form";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();

  fetch("https://frontend-take-home-service.fetch.com/auth/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "user",
      email: "user@mainModule.com",
    }),
  })
    .then((response) => {
      if (response.ok) {
        navigate("/explore");
      } else {
        console.log("Login failed!");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <UserAuthForm />
    </div>
  );
};
export default Login;
