import React, { useState, useEffect } from "react";
import "./Post.css"; // Import the CSS file

const Post = () => {
  const [post, setPost] = useState({
    title: "",
    content: "",
    author: "",
  });

  const [posts, setPosts] = useState([]); // Store fetched posts
  const [message, setMessage] = useState("");

  // Fetch posts from backend
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/posts");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });

      if (response.ok) {
        setMessage("✅ Post added successfully!");
        setPost({ title: "", content: "", author: "" }); // Reset form
        fetchPosts(); // Refresh posts after submission
      } else {
        setMessage("❌ Failed to add post.");
      }
    } catch (error) {
      console.error("Error submitting post:", error);
      setMessage("❌ Server error.");
    }
  };

  return (
    <div className="post-container">
      <h2>Create a Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={post.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="Content"
          value={post.content}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={post.author}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit Post</button>
      </form>
      {message && <p className="message">{message}</p>}

      <h2>Latest Posts</h2>
      <div className="posts-list">
        {posts.length === 0 ? (
          <p>No posts available.</p>
        ) : (
          posts.map((p) => (
            <div key={p._id} className="post-card">
              <h3>{p.title}</h3>
              <p>{p.content}</p>
              <p><strong>By:</strong> {p.author}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Post;
