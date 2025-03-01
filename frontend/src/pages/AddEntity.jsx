import React, { useState } from "react";
import "../styles/AddEntity.css"; // ✅ Import CSS

const AddEntity = () => {
  const [entity, setEntity] = useState("");
  const [entities, setEntities] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (entity.trim() === "") return;
    setEntities([...entities, entity]);
    setEntity("");
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
      <ul className="entity-list">
        {entities.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default AddEntity;
