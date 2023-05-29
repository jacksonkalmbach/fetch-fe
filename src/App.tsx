import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/home";
// import Explore from "./pages/explore";
import Login from "./pages/login";

import "./App.css";
import Discover from "./pages/discover";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/discover" element={<Discover />} />
    </Routes>
  );
}

export default App;
