// Posts.js
import React from 'react';
import { useFetch } from './hooks/useFetch';
import { Card, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function PostCard({ title, message, mediaUrl, isRead, postId }) {
  const navigate = useNavigate();
  const buttonText = isRead ? "Read Again" : "Read";

  const readPost = () => {
    navigate(`/postDetail/${postId}`);
  };

  // Helper function to render media based on URL content
  const renderMedia = (url) => {
    if (!url) return null; // If there's no URL, render nothing

    const lowerUrl = url.toLowerCase();

    switch (true) {
      case lowerUrl.includes('video'):
        return (
          <video width="100%" controls>
            <source src={url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );

      case lowerUrl.includes('audio'):
        return (
          <audio controls>
            <source src={url} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        );

      case lowerUrl.includes('img'):
        return (
          <Card.Img
            variant="top"
            src={url}
            alt={title}
            style={{ maxHeight: '400px', objectFit: 'cover' }}
          />
        );

      default:
        // Fallback if it's not recognized as containing "video", "audio", or "img"
        return (
          <a href={url} target="_blank" rel="noopener noreferrer">
            {url}
          </a>
        );
    }
  };

  return (
    <Card className="my-3" style={{ width: '80%' }}>
      {/* Use the helper function to decide how to render the media */}
      {renderMedia(mediaUrl)}

      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text className="truncate-text" >{message}</Card.Text>
        <Button onClick={readPost} variant="dark">
          {buttonText}
        </Button>
      </Card.Body>
    </Card>
  );
}

function Posts() {
  const authToken = localStorage.getItem('authToken');
  const userId = localStorage.getItem('userId');
  const { results, isLoading, error } = useFetch(
    `http://localhost:3000/api/post/all?userId=${userId}`,
    authToken
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!results || !results.data) {
    return <p>No posts available.</p>;
  }
  // Sort the posts so those with isRead: true go to the bottom
  const sortedPosts = [...results.data].sort((a, b) => {

    if (a.isRead === b.isRead) return 0;

    return a.isRead ? 1 : -1;
  });

  return (
    <div className="container">
      <h1> View Posts</h1>
      <Row>
        {sortedPosts.map((post) => (
          <Col
            key={post.id}
            sm={12}
            md={12}
            lg={6}
            className="mx-auto"
          >
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
