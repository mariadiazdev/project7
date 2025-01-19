import React from 'react';
import { useDelete } from './hooks/useDelete';
import Button from 'react-bootstrap/Button';
import { useAuth } from "../context//AuthContext"; // Import our custom hook

function DeleteAccount() {
  const { deleteResource, loading, error } = useDelete();
  const {  logout } = useAuth();
  const handleDelete = async (userId) => {
    try {
        // TODO delete backend
      await deleteResource(`http://localhost:3000/api/auth/delete/${userId}`, localStorage.getItem("authToken"));
      console.log('Deleted user data data:', userId);
      logout()
      // Re-fetch or remove the post from local state
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
        <h1> Sorry to see you go ... </h1>
        <p> Once your data is deleted. You will not be able to recover your access</p>
      
        <Button variant="dark" onClick={() => handleDelete(localStorage.getItem("userId"))}>Confirm</Button>
          
     
    </div>
  );
}

export default DeleteAccount