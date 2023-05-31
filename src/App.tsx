import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/home";
// import Explore from "./pages/explore";
import Favorites from "./pages/favorites";
import Dashboard from "./components/dashboard";
import Login from "./pages/login";

import "./App.css";
import Discover from "./pages/discover";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/discover/*" element={<Discover />}>
        {/* <Route index element={<>Dashboard Here</>} /> */}
        <Route index element={<Dashboard />} />
        <Route path="favorites" element={<Favorites />} />
      </Route>
    </Routes>
  );
}

export default App;