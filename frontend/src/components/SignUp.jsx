import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import hook correctly
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../styles/Login.css';

// SignUp Component
function SignUp () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/api/auth//signup", { email, password,firstName,lastName })
      .then((response) => {
        navigate("/signup"); // Use navigate to redirect
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          setErrorMessage(errorMessage);
        } else {
          setErrorMessage("An error occurred. Please try again later.");
        }
      });
  };

  return (
    <div className="form-body">
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        {errorMessage && <p className="error">{errorMessage}</p>}
        
        <input
          type="first name"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="last name"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setlastName(e.target.value)}
        />
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
        <Button variant="dark" type="submit">Sign Up</Button>
      </form>
    </div>
  );
}

export default SignUp;
