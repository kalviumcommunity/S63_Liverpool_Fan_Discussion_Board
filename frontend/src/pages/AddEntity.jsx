import React, { useState } from "react";
import axios from "axios";
import "../styles/AddEntity.css";

const AddEntity = () => {
  const [entity, setEntity] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (entity.trim() === "") {
      setMessage("❌ Entity name cannot be empty.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:8000/api/entities", { name: entity });
      console.log("Entity added:", response.data);
      setMessage("✅ Entity added successfully!");
      setEntity(""); // Clear input field
    } catch (error) {
      console.error("Error adding entity:", error);
      setMessage("❌ Failed to add entity. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-entity-container">
      <h2>🔴 Add New Entity</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Entity Name"
          value={entity}
          onChange={(e) => setEntity(e.target.value)}
        />
        <button type="submit" disabled={loading}>{loading ? "Adding..." : "Add"}</button>
      </form>
    </div>
  );
};

export default AddEntity;
