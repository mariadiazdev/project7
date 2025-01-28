import React from 'react';
import { useDelete } from './hooks/useDelete';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function PostCard({ singlePost }) {
  const { deleteResource } = useDelete();
  const navigate = useNavigate();

  const isOwner = singlePost.userId == localStorage.getItem('userId');
  const postId = singlePost.id;

  console.log('canDelete =>', isOwner);
  console.log(`postId => ${postId}`);

  const handleDelete = async () => {
    try {
      console.log(`INSIDEDELETE => ${singlePost}`);
      await deleteResource(
        `http://localhost:3000/api/post/${postId}`,
        localStorage.getItem('authToken')
      );
      console.log('Deleted Post:', postId);
      navigate('/home');
    } catch (err) {
      console.error(err);
    }
  };

  const goBack = () => {
    navigate('/home');
  };

  // Helper function to render media (image, video, audio) based on URL
  const renderMedia = (url) => {
    if (!url) return null;
    const lowerUrl = url.toLowerCase();

    switch (true) {
      // Adjust these checks as needed (here we assume path includes "/video/" etc.)
      case lowerUrl.includes('/video/'):
        return (
          <video width="100%" controls>
            <source src={url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );

      case lowerUrl.includes('/audio/'):
        return (
          <audio controls>
            <source src={url} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        );

      case lowerUrl.includes('/img/'):
        return (
          <Card.Img
            variant="top"
            src={url}
            alt={singlePost.title}
            style={{ maxHeight: '400px', objectFit: 'cover' }}
          />
        );

      default:
        // Fallback: if it doesn't contain "/video/", "/audio/", or "/img/"
        return (
          <a href={url} target="_blank" rel="noopener noreferrer">
            {url}
          </a>
        );
    }
  };

  return (
    <Card className="my-3" style={{ width: '80%' }}>
      {/* Conditionally render the correct media type */}
      {renderMedia(singlePost.mediaUrl)}

      <Card.Body>
        <Card.Title>{singlePost.title}</Card.Title>
        <Card.Text>{singlePost.message}</Card.Text>
        <Button onClick={goBack} variant="dark">
          Back
        </Button>
        {isOwner && (
          <Button variant="danger" onClick={handleDelete}>
            Delete Post
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default PostCard;