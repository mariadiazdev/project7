import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { AuthProvider, useAuth } from "../context/AuthContext";
import NavBar from "./NavBar";
import Home from "./Home";
import Post from "./Create";
import Login from "./Login";
import SignUp from "./SignUp";
import Create from "./Create"
import PostDetail from "./PostDetail.jsx"
import DeleteAccount from "./DeleteAccount";

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

// This child component can safely call `useAuth()` because it's *inside* <AuthProvider>
function AppContent() {
  const { isLoggedIn } = useAuth();

  return (
    <Router>
 
      <NavBar />

      <Routes>
        {isLoggedIn ? (
          // If logged in, these routes are accessible
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/post" element={<Post />} />
            <Route path="/create" element={<Create />} />
            <Route path="/postDetail/:postId" element={<PostDetail/>}/>
            <Route path="/DeleteAccount" element={<DeleteAccount />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </>
        ) : (
          // If logged out, user can ONLY visit login or signup
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<Login />} />
            <Route path="*" element={<Navigate to="/signup" replace />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
