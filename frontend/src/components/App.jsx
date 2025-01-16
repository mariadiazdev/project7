import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import NavBar from "./NavBar";
import SignUp from "./SignUp";

import "bootstrap/dist/css/bootstrap.css";

function App() {
  const isLoggedIn = !!localStorage.getItem("authToken");
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Clear stored token
    localStorage.removeItem("userId");
  };

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/signup"
          element={<SignUp />}
        />
        <Route
          path="/home"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;