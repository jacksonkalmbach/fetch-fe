import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setName, setEmail } from "../store/reducers/user-slice";

import Button from "./button";
import Logo from "./icons/logo";
import FormInput from "./form-input";

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
    <div className="flex flex-col w-fit justify-center items-center shadow-xl rounded-lg bg-white p-10 md:w-1/3">
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
        <FormInput
          label="Name"
          name="name"
          placeholder="ex. John Doe"
          handleChange={handleChange}
          type="text"
          value={userName}
        />
        <FormInput
          label="Email"
          name="email"
          placeholder="name@example.com"
          handleChange={handleChange}
          type="email"
          value={userEmail}
        />
        <div className="w-full flex justify-center">
          <Button type="submit" buttonType="primary" text="Get Started" />
        </div>
      </form>
    </div>
  );
};

export default UserAuthForm;
