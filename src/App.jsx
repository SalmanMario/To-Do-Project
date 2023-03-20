import React from "react";
import { Box } from "@mui/material";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { MainPage } from "./pages/MainPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mainpage" element={<MainPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
