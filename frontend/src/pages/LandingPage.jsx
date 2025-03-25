import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SqlEntityList from "../components/SqlEntityList";
import "./LandingPage.css"; // Import styles for LandingPage

const LandingPage = () => {
  const [posts, setPosts] = useState([]);
  const [showSqlEntities, setShowSqlEntities] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    axios.get("http://localhost:8000/api/posts")
      .then(response => setPosts(response.data))
      .catch(error => console.error("Error fetching posts:", error));
  };

  // Handle delete post
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await axios.delete(`http://localhost:8000/api/posts/${id}`);
        fetchPosts(); // Refresh the list after deleting
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  // Toggle between posts and SQL entities
  const toggleView = () => {
    setShowSqlEntities(!showSqlEntities);
  };

  return (
    <div className="landing-container">
      <h1>Welcome to the Liverpool Fan Discussion Board 🔴⚽</h1>
      
      <div className="view-toggle">
        <button 
          onClick={toggleView} 
          className={`toggle-btn ${!showSqlEntities ? 'active' : ''}`}
        >
          Show Posts
        </button>
        <button 
          onClick={toggleView} 
          className={`toggle-btn ${showSqlEntities ? 'active' : ''}`}
        >
          Show SQL Entities
        </button>
      </div>

      {showSqlEntities ? (
        <div className="sql-entities-section">
          <SqlEntityList />
          <Link to="/add-entity" className="add-entity-btn">➕ Add New Entity</Link>
        </div>
      ) : (
        <div className="posts-section">
          <Link to="/add" className="add-post-btn">➕ Add New Post</Link>
          
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post._id} className="post-card">
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                <p><strong>By:</strong> {post.author}</p>
                <div className="post-actions">
                  <Link to={`/update/${post._id}`} className="edit-btn">✏ Edit</Link>
                  <button onClick={() => handleDelete(post._id)} className="delete-btn">🗑 Delete</button>
                </div>
              </div>
            ))
          ) : (
            <p>No posts available. Be the first to share your thoughts! 🔴</p>
          )}
        </div>
      )}
    </div>
  );
};

export default LandingPage;
