import React, { useEffect, useState } from 'react';
import './Trackfound.css';

const FoundItems = () => {
    const [foundItems, setFoundItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); // State for search input

    useEffect(() => {
        const fetchFoundItems = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/found'); // Change port if necessary
                if (!response.ok) {
                    throw new Error('Failed to fetch found items');
                }
                const data = await response.json();

                // Check if data is an empty array
                if (data.length === 0) {
                    throw new Error("No items found yet");
                }
                setFoundItems(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFoundItems();
    }, []); // Empty dependency array means this effect runs once on mount

    // Filter found items by itemName based on search input
    const filteredItems = foundItems.filter(item =>
        item.itemName.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="found-items-container">
            <h2>Found Items</h2>

            {/* Search Input */}
            <input
                type="text"
                placeholder="Search by item name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
                className="search-input"
                aria-label="Search by item name"
            />

            <ul className="found-items-list">
                {filteredItems.length > 0 ? (
                    filteredItems.map(item => (
                        <li key={item._id}> {/* Use item._id as a unique key */}
                            <h3>{item.itemName}</h3>
                            <p>{item.description}</p>
                            <p>Location: {item.location}</p>
                            <p>Contact Info: {item.contactInfo}</p>
                            <p>Email: {item.email}</p>
                        </li>
                    ))
                ) : (
                    <div>No items match your search.</div>
                )}
            </ul>
        </div>
    );
};

export default FoundItems;
