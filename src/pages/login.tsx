import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import UserAuthForm from "../components/user-auth-form";

const Login = () => {
  

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-lightGray gap-12">
      <UserAuthForm />
    </div>
  );
};
export default Login;
