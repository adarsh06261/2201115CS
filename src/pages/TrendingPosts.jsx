import React, { useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";

const TrendingPosts = ({ apiService }) => {
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      try {
        const posts = await apiService.getPosts();
        const comments = await apiService.getComments();


        const commentCounts = comments.reduce((acc, comment) => {
          acc[comment.postId] = (acc[comment.postId] || 0) + 1;
          return acc;
        }, {});

        const maxComments = Math.max(...Object.values(commentCounts), 0);

        const trending = posts.filter(
          post => commentCounts[post.id] === maxComments
        );

        setTrendingPosts(trending);
      } catch (error) {
        console.error("Error fetching trending posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingPosts();
  }, [apiService]);

  return (
    <div>
      <h2>Trending Posts</h2>
      {loading ? (
        <Spinner animation="border" />
      ) : trendingPosts.length > 0 ? (
        trendingPosts.map(post => (
          <Card key={post.id} className="mb-3">
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Text>{post.body}</Card.Text>
              <small className="text-muted">Post ID: {post.id}</small>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>No trending posts found.</p>
      )}
    </div>
  );
};

export default TrendingPosts;
