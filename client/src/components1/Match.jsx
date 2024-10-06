import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Match.css'; // Ensure you have a CSS file for styles

const MatchNotifications = () => {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/match'); // Adjust this to your actual endpoint
                setMatches(data);
            } catch (err) {
                setError('Failed to fetch match notifications');
            } finally {
                setLoading(false);
            }
        };

        fetchMatches();
    }, []);

    const filteredMatches = matches.filter((match) =>
        match.itemId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="notifications-container">
            <h2>Matched Notifications</h2>

            {/* Search Input */}
            <input
                type="text"
                placeholder="Search notifications by Item ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="search-input"
            />

            {filteredMatches.length === 0 ? (
                <div>No match notifications found.</div>
            ) : (
                <ul className="notifications-list">
                    {filteredMatches.map((match) => (
                        <li key={match._id} className="notification-item">
                            <strong>Email:</strong> {match.email} <br />
                            <strong>Location:</strong> {match.location} <br />
                            <strong>Item ID:</strong> {match.itemId} <br />
                            <hr />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MatchNotifications;
