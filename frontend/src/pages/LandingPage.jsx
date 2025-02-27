import React, { useState, useEffect } from "react";
import axios from "axios";

const LandingPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/posts")
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => console.error("Error fetching posts:", error));
  }, []);

  return (
    <div className="landing-container">
      <h1>Welcome to the Liverpool Fan Discussion Board 🔴⚽</h1>
      {posts.map((post) => (
        <div key={post._id} className="post-card">
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p><strong>By:</strong> {post.author}</p>
        </div>
      ))}
    </div>
  );
};

export default LandingPage;
