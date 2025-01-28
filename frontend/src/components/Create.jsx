import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import '../styles/Post.css';


function Create() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [media, setMedia] = useState(null);
  const userId = localStorage.getItem("userId");

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

//Check all fields
    if (!title || (!message && !media)) {
      setErrorMessage("Please provide a title and either a message or an image.");
      return;
    }

    const formData = new FormData();
    formData.append(
      "post",
      JSON.stringify({
        title,
        message,
        userId, 
      })
    );

    if (media) {
      formData.append("file", media);
    }

    try {
      const response = await axios.post("http://localhost:3000/api/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": "Bearer "+ localStorage.authToken
        },
      });

      setSuccessMessage(response.data.message || "Post created successfully!");
      // TODO: USE TOSTIFY
      setErrorMessage("");
      setTimeout(() => navigate("/Home"), 1000);

      
    } catch (error) {
      console.error("Error creating post:", error);
      setErrorMessage("An error occurred while creating your post.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="form-body create-form" >
      <form onSubmit={handleSubmit}>
        <h1>Create A Post</h1>

        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="textarea"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <input
          type="file"
          accept="image/*,audio/*,video/* "
          onChange={(e) => setMedia(e.target.files[0])}
        />

        <Button variant="dark" type="submit">
          Post
        </Button>
      </form>
    </div>
  );
}

export default Create;
