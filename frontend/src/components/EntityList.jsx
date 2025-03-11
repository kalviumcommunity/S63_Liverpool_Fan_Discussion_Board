import React, { useState, useEffect } from "react";
import axios from "axios";

const EntityList = () => {
  const [entities, setEntities] = useState([]);

  const fetchEntities = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/entities");
      setEntities(response.data);
    } catch (error) {
      console.error("Error fetching entities:", error);
    }
  };

  useEffect(() => {
    axios.get("http://localhost:8000/api/entities")
      .then(response => {
        console.log("Fetched Entities:", response.data); // Debugging
        setEntities(response.data);
      })
      .catch(error => console.error("Error fetching entities:", error));
  }, []);
  

  useEffect(() => {
    fetchEntities();
  }, []);

  return (
    <div className="entity-list-container">
      <h2>Entities List</h2>
      <ul>
        {entities.length > 0 ? (
          entities.map((item) => (
            <li key={item._id}>{item.name}</li>
          ))
        ) : (
          <p>No entities found</p>
        )}
      </ul>
      <button onClick={fetchEntities}>Refresh List</button>
    </div>
  );
};

export default EntityList;
