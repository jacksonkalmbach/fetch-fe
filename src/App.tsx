import React from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./components/dashboard";
import Discover from "./pages/discover";
import Favorites from "./pages/favorites";
import Login from "./pages/login";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/discover/*" element={<Discover />}>
        <Route index element={<Dashboard />} />
        <Route path="favorites" element={<Favorites />} />
      </Route>
    </Routes>
  );
}

export default App;
