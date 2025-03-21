import React, { useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";

const Feed = ({ apiService, polling }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let interval;
    
    const fetchPosts = async () => {
      try {
        const newPosts = await apiService.getPosts();
        setPosts(prevPosts => {
          const updatedPosts = [...newPosts, ...prevPosts].slice(0, 50);
          return updatedPosts;
        });
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts(); 

    if (polling) {
      interval = setInterval(fetchPosts, 5000); 
    }

    return () => clearInterval(interval); 
  }, [apiService, polling]);

  return (
    <div>
      <h2>Real-Time Feed</h2>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        posts.map(post => (
          <Card key={post.id} className="mb-3">
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Text>{post.body}</Card.Text>
              <small className="text-muted">Post ID: {post.id}</small>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

export default Feed;
