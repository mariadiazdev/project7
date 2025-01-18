import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

// Import your Auth Context (make sure the path is correct!)
import { AuthProvider, useAuth } from "../context/AuthContext";

// Import components
import NavBar from "./NavBar";
import Home from "./Home";
import Post from "./Post";
import Login from "./Login";
import SignUp from "./SignUp";

function App() {
  // 1) Provide the Auth context at the top level
  return (
    <AuthProvider>
      {/* 2) Put all your routes and NavBar inside a separate child component */}
      <AppContent />
    </AuthProvider>
  );
}

// This child component can safely call `useAuth()` because it's *inside* <AuthProvider>
function AppContent() {
  const { isLoggedIn } = useAuth();

  return (
    <Router>
      {/* If you only want to show NavBar when logged in, conditionally render it.
          Otherwise, remove the condition to always show NavBar. */}
      <NavBar />

      <Routes>
        {isLoggedIn ? (
          // 3A) If logged in, these routes are accessible
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/post" element={<Post />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </>
        ) : (
          // 3B) If logged out, user can ONLY visit login or signup
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
