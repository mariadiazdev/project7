import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import hook correctly
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import '../styles/App.css';


// SignUp Component
function SignUp () {
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
      .post("http://localhost:3000/api/auth/signup", { email, password,firstName,lastName })
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
        <p>Already have an account? <Link to="/login">Login</Link></p>
        <Button variant="dark" type="submit">Sign Up</Button>
      </form>
    </div>
  );
}

export default SignUp;
