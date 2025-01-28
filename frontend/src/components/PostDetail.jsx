import { useEffect, useState } from 'react';
import PostCard from './PostCard';
import { useFetch } from './hooks/useFetch';
import { useParams } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';


function PostDetail() {
    const { postId } = useParams();
    const authToken = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');
    console.log(`UserID=>${userId}`)
    const [postData, setPostData] = useState(null);

   
    const { results, error } = useFetch(
        `http://localhost:3000/api/post/?userId=${userId}&postId=${postId}`,
        authToken
    );
    
    useEffect(() => {
        if (results && !results.isRead) {
            fetch(`http://localhost:3000/api/post/read?userId=${userId}&postId=${postId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Post read:', data);
                })
                .catch(error => {
                    console.error('Error marking post as read:', error);
                });
        }
    }, [results, postId, userId, authToken]);
    if (error) {
        return <p>Error fetching post data.</p>;
    }
    // If results is array, handle that.
    if (!results || results.length === 0) {
        return <p>No posts available.</p>;
    }

    const post = results;
    console.log(post)
    return (
        <div className="container">
            <Row>
                <PostCard
                    singlePost={post.post}
                />
            </Row>
        </div>
    );
}

export default PostDetail