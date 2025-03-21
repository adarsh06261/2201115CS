import React, { useEffect, useState } from "react";
import { Table, Spinner } from "react-bootstrap";

const TopUsers = ({ apiService }) => {
  const [topUsers, setTopUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const users = await apiService.getUsers();
        const posts = await apiService.getPosts();

        const postCounts = posts.reduce((acc, post) => {
          acc[post.userId] = (acc[post.userId] || 0) + 1;
          return acc;
        }, {});

        const usersWithPosts = users
          .map(user => ({ ...user, postCount: postCounts[user.id] || 0 }))
          .sort((a, b) => b.postCount - a.postCount)
          .slice(0, 5); 

        setTopUsers(usersWithPosts);
      } catch (error) {
        console.error("Error fetching top users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopUsers();
  }, [apiService]);

  return (
    <div>
      <h2>Top 5 Users by Posts</h2>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Post Count</th>
            </tr>
          </thead>
          <tbody>
            {topUsers.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.postCount}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default TopUsers;
