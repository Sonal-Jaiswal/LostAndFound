import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './found2.css';

const FoundItemForm = () => {
  const [itemDetails, setItemDetails] = useState({
    itemName: '',
    description: '',
    location: '',
    contactInfo: '',
    email: '',
  });

  const [responseMessage, setResponseMessage] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/found`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemDetails),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      console.log(result);
      setResponseMessage('Submitted successfully!'); // Set success message

      // Navigate to the TrackFound page after a short delay (optional)
      setTimeout(() => {
        navigate('/trackfound'); // Replace with the correct path to your TrackFound page
      }, 2000); // Adjust the delay as needed
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('Submission failed. Please try again.'); // Set error message
    }
  };

  return (
    <div className="form-container">
      <h2>Found an Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="itemName">Item Name:</label>
          <input
            type="text"
            id="itemName"
            name="itemName"
            value={itemDetails.itemName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={itemDetails.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="location">Location Found:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={itemDetails.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contactInfo">Your Contact (phone) Info (optional):</label>
          <input
            type="text"
            id="contactInfo"
            name="contactInfo"
            value={itemDetails.contactInfo}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Your Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={itemDetails.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
      {responseMessage && <p className="response-message">{responseMessage}</p>}
    </div>
  );
};

export default FoundItemForm;
