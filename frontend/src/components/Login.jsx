import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; 
import { useAuth } from "../context/AuthContext"; 

import Button from 'react-bootstrap/Button';
import '../styles/Login.css';

// Login Component
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); 

  const { login } = useAuth(); // login function from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); 

      try {
      const response = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });
      const { token, userId } = response.data;

      // Call the login context function
      login(token, userId);

      // Optionally clear the inputs
      setEmail("");
      setPassword("");

      // Redirect to home after successful login
      navigate("/home");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage("Invalid credentials. Please try again.");
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="form-body">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <label htmlFor="Email" className="signup-label">Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password" className="signup-label">Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        <Button variant="dark" type="submit">Login</Button>
      </form>
    </div>
  );
}

export default Login;
