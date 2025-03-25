import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/AddEntity.css";

const AddEntity = () => {
  const [entity, setEntity] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch users when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch all users from SQL database
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/api/sql/users");
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setMessage("❌ Failed to fetch users. Please try again.");
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (entity.trim() === "") {
      setMessage("❌ Entity name cannot be empty.");
      return;
    }

    if (!selectedUser) {
      setMessage("❌ Please select a user.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:8000/api/sql/entities", { 
        name: entity,
        created_by: selectedUser
      });
      console.log("Entity added:", response.data);
      setMessage("✅ Entity added successfully!");
      setEntity(""); // Clear input field
      setSelectedUser(""); // Clear selected user
      
      // Redirect to landing page after a short delay
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      console.error("Error adding entity:", error);
      setMessage(`❌ Failed to add entity: ${error.response?.data?.error || "Please try again."}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle user selection change
  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
  };

  return (
    <div className="add-entity-container">
      <h2>🔴 Add New SQL Entity</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="entity-name">Entity Name:</label>
          <input
            id="entity-name"
            type="text"
            placeholder="Enter Entity Name"
            value={entity}
            onChange={(e) => setEntity(e.target.value)}
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="user-select">Created By:</label>
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
        
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Entity"}
        </button>
      </form>
    </div>
  );
};

export default AddEntity;
