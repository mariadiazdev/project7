// Posts.js
import React from 'react';
import { useFetch } from './hooks/useFetch';
import { Card, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';


function PostCard({ title, message, mediaUrl, isRead, postId }) {
  const navigate = useNavigate();
  const buttonText = isRead? "Read Again" : "Read";
  const readPost = () => {
    navigate(`/postDetail/${postId}`);
  };

  return (
    <Card className="my-3" style={{ width: '80%' }}>
      {/* Only show an image if mediaUrl exists */}
      {mediaUrl && (
        <Card.Img
          variant="top"
          src={mediaUrl}
          alt={title}
          style={{ maxHeight: '400px', objectFit: 'cover' }}
        />
      )}
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{message}</Card.Text>
        <Button onClick={readPost} variant="dark">{buttonText}</Button>
      </Card.Body>
    </Card>
  );
}

function Posts() {

  const authToken = localStorage.getItem('authToken');
  const userId = localStorage.getItem('userId');
  const { results, isLoading, error } = useFetch(`http://localhost:3000/api/post/all?userId=${userId}`, authToken);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;


  if (!results || !results.data) {
    return <p>No posts available.</p>;
  }
  // Now we can safely .map over results.data
  return (
    <div className="container">
      <Row>
        {results.data.map((post) => (
          <Col key={post.id}
            sm={12}
            md={8}
            lg={6}
            className="mx-auto">

            <PostCard
              title={post.title}
              message={post.message}
              mediaUrl={post.mediaUrl}
              isRead={post.isRead}
              postId={post.id}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Posts;
