import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import '../styles/App.css';



function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password) {
      setErrorMessage("All fields are required.");
      return; // Stop form submission if any field is empty
    }

    axios
      .post("http://localhost:3000/api/auth/signup", { email, password, firstName, lastName })
      .then((response) => {
        setErrorMessage("");
        setSuccessMessage("Registration successful! You can now log in.");

        setTimeout(() => navigate("/login"), 1000);
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          setErrorMessage("Email already registered.");
        } else {
          setErrorMessage("An error occurred. Please try again later.");
        }
      });
  };

  return (
    <div className="form-body">
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        {/* Success Alert */}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}

        {/* Error Message */}
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

        <label htmlFor="email" class="signup-label" >Email</label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          autocomplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password" class="signup-label">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="FirstName" class="signup-label">First Name</label>
        <input
          id="FirstName"
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label htmlFor="LastName" class="signup-label"> Last Name</label>
        <input
          id="LastName"
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setlastName(e.target.value)}
        />
        <p>Already have an account? <Link to="/login">Login</Link></p>
        <Button variant="dark" type="submit">Sign Up</Button>
      </form>
    </div>
  );
}

export default SignUp;
