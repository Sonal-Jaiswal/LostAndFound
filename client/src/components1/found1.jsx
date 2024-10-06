import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import "./found1.css";

const Found = () => {
  const { id } = useParams(); // Get the lost item ID from URL parameters
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const requestBody = {
      email,
      location,
      itemId: id,
    };

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/match`, requestBody); // Update the API URL
      setSuccess('Details submitted successfully!');
      setError('');
      setTimeout(() => {
        navigate('/track'); // Redirect to the track page after submission
      }, 2000);
    } catch (err) {
      setError('Failed to submit the details');
    }
  };

  return (
    <div className="found-container">
      <h2>Found Item</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Live Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter the location"
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {success && <p className="success-message">{success}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Found;
