import React from 'react';
import { useDelete } from './hooks/useDelete';
import { Card, Button, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';



function PostCard({ singlePost }) {
  console.log("SINGLEPOST")
  console.log(singlePost)
  console.log(singlePost.title)

  const isOwner = singlePost.userId == localStorage.getItem("userId")
  const postId = singlePost.postId
  const { deleteResource } = useDelete();
  const navigate = useNavigate();


  console.log('canDelete =>', isOwner);

  const handleDelete = async () => {
    try {
      await deleteResource(
        `http://localhost:3000/api/post/${postId}`,
        localStorage.getItem("authToken")
      );
      console.log('Deleted Post:', postId);
      navigate("/home");
    } catch (err) {
      console.error(err);
    }
  };

  const goBack = () => {
    navigate("/home");
  };

  return (
    <Card className="my-3" style={{ width: '80%' }}>
      {singlePost.mediaUrl && (
        <Card.Img
          variant="top"
          src={singlePost.mediaUrl}
          alt={singlePost.title}
          style={{ maxHeight: '400px', objectFit: 'cover' }}
        />
      )}

      <Card.Body>
        <Card.Title>{singlePost.title}</Card.Title>
        <Card.Text>{singlePost.message}</Card.Text>
        <Button onClick={goBack} variant="dark">back</Button>
        {isOwner && (
          <Button variant="danger" onClick={handleDelete}>Delete Post</Button>
        )}
      </Card.Body>
    </Card>
  );
}


export default PostCard;