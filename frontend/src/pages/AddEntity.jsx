import React, { useState } from "react";
import axios from "axios";
import "../styles/AddEntity.css";

const AddEntity = () => {
  const [entity, setEntity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (entity.trim() === "") return;

    try {
      const response = await axios.post("http://localhost:8000/api/entities", { name: entity });
      console.log("Entity added:", response.data);
      setEntity(""); // Clear input field
    } catch (error) {
      console.error("Error adding entity:", error);
    }
  };

  return (
    <div className="add-entity-container">
      <h2>🔴 Add New Entity</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Entity Name"
          value={entity}
          onChange={(e) => setEntity(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddEntity;
