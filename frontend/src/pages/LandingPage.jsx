import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [posts, setPosts] = useState([]);

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

  return (
    <div className="landing-container">
      <h1>Welcome to the Liverpool Fan Discussion Board 🔴⚽</h1>
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
  );
};

export default LandingPage;
