import React, { useState } from "react";
import axios from "axios";

function Dashboard() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState(""); // For success or error message
  
    const handleUpdate = async () => {
      const userId = "user_id"; // Get this from token or session
      try {
        const token = localStorage.getItem("token");
const response = await axios.put("http://localhost:5000/profile", 
  { username, email },
  { headers: { Authorization: `Bearer ${token}` } } // Sending the token in Authorization header
);

       
        
        // Show success message if the update is successful
        if (response) {
          setMessage("Profile updated successfully!");
        }
      } catch (error) {
        // If there's an error, show the error message
        setMessage("Failed to update profile. Please try again.");
      }
    };
  
    return (
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleUpdate}>Update Profile</button>

        {/* Conditionally render the success or error message */}
        {message && <div>{message}</div>}
      </div>
    );
}

export default Dashboard;
