import axios from "axios"
import { useState } from "react"
import '../styles/Login.css';
import '../styles/Login.css';

// Login Component
function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/api/auth/login", { email, password })
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem("authToken", token);
        onLoginSuccess(); 
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
    <div>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
export default Login