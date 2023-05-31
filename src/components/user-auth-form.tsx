import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setName, setEmail } from "../store/reducers/user-slice";

import Button from "./button";
import Input from "./input";
import Logo from "./icons/logo";

const UserAuthForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const handleChange = (e: any) => {
    if (e.target.name === "name") {
      setUserName(e.target.value);
    } else if (e.target.name === "email") {
      setUserEmail(e.target.value);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    fetch("https://frontend-take-home-service.fetch.com/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userName,
        email: userEmail,
      }),
    })
      .then((response) => {
        if (response.ok) {
          dispatch(setName(userName));
          dispatch(setEmail(userEmail));
          navigate("/discover");
        } else {
          console.log("Login failed!");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="flex flex-col w-1/3 justify-center items-center shadow-xl rounded-lg bg-white p-10">
      <div className="w-fit flex items-center gap-2 mb-4">
        <Logo />
        <h1 className="text-4xl text-primary font-bold">PETFETCH</h1>
      </div>

      <p className="text-sm text-l">
        Enter your name and email to get started.
      </p>
      <form
        className="w-full h-full flex flex-col p-5 gap-4"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col w-full">
          <label className="font-bold" htmlFor="name">
            Name
          </label>

          <Input
            name="name"
            placeholder="ex. John Doe"
            handleChange={handleChange}
            type="name"
            value={userName}
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="font-bold" htmlFor="email">
            Email
          </label>
          <Input
            name="email"
            placeholder="name@example.com"
            handleChange={handleChange}
            type="email"
            value={userEmail}
          />
        </div>
        <div className="w-full flex justify-center">
          <Button type="submit" buttonType="primary" text="Get Started" />
        </div>
      </form>
    </div>
  );
};

export default UserAuthForm;
