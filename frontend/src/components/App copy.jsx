import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import NavBar from "./NavMenu";
import SignUp from "./SignUp";

import "bootstrap/dist/css/bootstrap.css";
import DeleteAccount from "./DeleteAccount";

function App() {
  const isLoggedIn = !!localStorage.getItem("authToken");
  const handleLogout = () => {
    localStorage.removeItem("authToken"); 
    localStorage.removeItem("userId");
  };

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Home /> : <Login/>}
        />
        <Route
          path="/login"
          element={isLoggedIn ? <Home /> : <Login/>}
        />
        <Route
          path="/signup"
          element={isLoggedIn ? <Home /> : <SignUp/>}
        />
        <Route
          path="/home"
          element={isLoggedIn ? <Home /> : <Login/>}
        />
        <Route
          path="/deleteaccount"
          element={ <DeleteAccount /> }
        />
      </Routes>
    </Router>
  );
}

export default App;