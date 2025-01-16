import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import hook correctly
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../styles/Login.css';

// Login Component
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/api/auth/login", { email, password })
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem("authToken", token);
        localStorage.setItem("userId", response.data.userId);
        navigate("/home"); // Use navigate to redirect
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          setErrorMessage("Invalid credentials. Please try again.");
        } else {
          setErrorMessage("An error occurred. Please try again later.");
        }
      });
  };

  return (
    <div className="login-body">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
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
