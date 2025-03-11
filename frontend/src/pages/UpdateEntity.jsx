import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/UpdateEntity.css";

const UpdateEntity = () => {
  const { id } = useParams(); // Get entity ID from URL
  const navigate = useNavigate();
  const [entity, setEntity] = useState("");

  // Fetch entity details when component mounts
  useEffect(() => {
    axios.get(`http://localhost:8000/api/posts/${id}`)
      .then(response => setEntity(response.data.title)) // Assuming "title" is the entity name
      .catch(error => console.error("Error fetching entity:", error));
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (entity.trim() === "") return; // Prevent empty submission

    try {
      await axios.put(`http://localhost:8000/api/posts/${id}`, { title: entity });
      navigate("/"); // Redirect back to the landing page
    } catch (error) {
      console.error("Error updating entity:", error);
    }
  };

  return (
    <div className="update-entity-container">
      <h2>✏ Update Entity</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Update Entity Name"
          value={entity}
          onChange={(e) => setEntity(e.target.value)}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateEntity;
