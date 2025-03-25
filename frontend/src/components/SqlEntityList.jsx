import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/SqlEntityList.css"; // Using dedicated styles

const SqlEntityList = () => {
  const [users, setUsers] = useState([]);
  const [entities, setEntities] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all users when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch entities when a user is selected
  useEffect(() => {
    if (selectedUser) {
      fetchEntitiesByUser(selectedUser);
    }
  }, [selectedUser]);

  // Fetch all users from SQL database
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/api/sql/users");
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to fetch users. Please try again.");
      setLoading(false);
    }
  };

  // Fetch entities created by a specific user
  const fetchEntitiesByUser = async (userId) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8000/api/sql/entities/user/${userId}`);
      setEntities(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching entities:", error);
      setError("Failed to fetch entities. Please try again.");
      setLoading(false);
    }
  };

  // Handle user selection change
  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
  };

  return (
    <div className="entity-list-container">
      <h2>SQL Entities by User</h2>
      
      {error && <p className="error-message">{error}</p>}
      
      <div className="user-dropdown">
        <label htmlFor="user-select">Select User: </label>
        <select 
          id="user-select" 
          value={selectedUser} 
          onChange={handleUserChange}
          disabled={loading}
        >
          <option value="">-- Select a user --</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username} ({user.email})
            </option>
          ))}
        </select>
      </div>
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="entities-container">
          <h3>Entities created by {selectedUser ? users.find(u => u.id.toString() === selectedUser)?.username : "selected user"}</h3>
          
          {entities.length > 0 ? (
            <ul className="entity-list">
              {entities.map((entity) => (
                <li key={entity.id} className="entity-item">
                  <strong>{entity.name}</strong>
                  <span className="entity-creator">
                    Created by: {entity.creator?.username || "Unknown"}
                  </span>
                  <span className="entity-date">
                    Created: {new Date(entity.createdAt).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p>{selectedUser ? "No entities found for this user." : "Please select a user to view their entities."}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SqlEntityList;