import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Track.css';

export const Track = () => {
  const [lostItems, setLostItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/lost-items');
        setLostItems(data);
      } catch (err) {
        setError('Failed to fetch lost items. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleMatch = (itemId) => {
    navigate(`/found/${itemId}`); // Navigate to the Found page with the item ID
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter lost items based on itemType or itemDescription
  const filteredItems = lostItems.filter((item) =>
    item.itemType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.itemDescription.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="track-container">
      <h2 className="track-title">Tracked Lost Items</h2>

      {/* Search input field */}
      <input
        type="text"
        placeholder="Search by item type or description"
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
        aria-label="Search by item type or description"
      />

      <ul className="track-list">
        {filteredItems.map((item) => (
          <li className="track-item" key={item._id}>
            <strong>Item ID:</strong> {item._id} <br />
            <strong>Type:</strong> {item.itemType} <br />
            <strong>Description:</strong> {item.itemDescription} <br />
            <strong>Location:</strong> {item.location} <br />
            <hr />
            <button
              onClick={() => handleMatch(item._id)}
              className="match-button"
              aria-label={`Match item with ID ${item._id}`}
            >
              Matched
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
