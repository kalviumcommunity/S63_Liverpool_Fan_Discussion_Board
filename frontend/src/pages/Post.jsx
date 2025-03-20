import React, { useState, useEffect } from "react";
import "../styles/Post.css"; // Import the CSS file

const Post = () => {
  const [post, setPost] = useState({
    title: "",
    content: "",
    created_by: "",
  });

  const [posts, setPosts] = useState([]); // Store fetched posts
  const [users, setUsers] = useState([]); // Store fetched users
  const [selectedUser, setSelectedUser] = useState(""); // Track selected user
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchUsers();
    fetchPosts();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/users");
      if (!response.ok) throw new Error(`Failed to fetch users: ${response.statusText}`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setMessage("❌ Failed to fetch users.");
    }
  };

  const fetchPosts = async (userId = "") => {
    try {
      const url = userId ? `http://localhost:8000/api/posts/user/${userId}` : "http://localhost:8000/api/posts";
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to fetch posts: ${response.statusText}`);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setMessage("❌ Failed to fetch posts.");
    }
  };

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!post.created_by) {
      setMessage("❌ Please select a user before submitting.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });

      if (!response.ok) {
        throw new Error(`Failed to add post: ${response.statusText}`);
      }

      setMessage("✅ Post added successfully!");
      setPost({ title: "", content: "", created_by: "" }); // Reset form
      fetchPosts(); // Refresh posts after submission
    } catch (error) {
      console.error("Error submitting post:", error);
      setMessage("❌ Server error while adding post.");
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
        <select name="created_by" value={post.created_by} onChange={(e) => setPost({ ...post, created_by: e.target.value })} required>
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>{user.name}</option>
          ))}
        </select>
        <button type="submit">Submit Post</button>
      </form>
      {message && <p className="message">{message}</p>}

      <h2>Filter Posts by User</h2>
      <select onChange={(e) => { setSelectedUser(e.target.value); fetchPosts(e.target.value); }}>
        <option value="">All Users</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>{user.name}</option>
        ))}
      </select>

      <h2>Latest Posts</h2>
      <div className="posts-list">
        {posts.length === 0 ? (
          <p>No posts available.</p>
        ) : (
          posts.map((p) => (
            <div key={p._id} className="post-card">
              <h3>{p.title}</h3>
              <p>{p.content}</p>
              <p><strong>By:</strong> {users.find(user => user._id === p.created_by)?.name || "Unknown"}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Post;
