import React from "react";
import "../components/PostCard.css";

const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p><strong>Author:</strong> {post.author}</p>
    </div>
  );
};

export default PostCard;
