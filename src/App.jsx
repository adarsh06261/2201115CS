import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import TopUsers from "./pages/TopUsers";
import TrendingPosts from "./pages/TrendingPosts";
import Feed from "./pages/Feed";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
          <Link className="navbar-brand" to="/">
            Social Analytics
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/top-users">
                  Top Users
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/trending-posts">
                  Trending Posts
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/feed">
                  Feed
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <Routes>
          <Route path="/top-users" element={<TopUsers />} />
          <Route path="/trending-posts" element={<TrendingPosts />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/" element={<h2>Welcome to Social Analytics</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
