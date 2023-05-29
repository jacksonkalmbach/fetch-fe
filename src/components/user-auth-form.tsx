import React, { useState } from "react";
import Input from "./ui/input";

const UserAuthForm = () => {
  return (
    <div className="flex flex-col w-[350px] justify-center items-center">
      <h1 className="text-3xl">Welcome</h1>
      <p className="text-sm">Enter your email to sign in to your account</p>
      <form className="w-full h-full flex flex-col p-5">
        <label htmlFor="email">Email</label>
        <Input placeholder="name@example.com" type="email" />
        <label htmlFor="password">Password</label>
        <Input placeholder="Password" type="password" />
        <button
          className="flex justify-center items-center bg-primary text-white rounded-md h-8 w-full mt-4 hover:bg-primary/90 active:scale-95 transition"
          type="submit"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default UserAuthForm;
