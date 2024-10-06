import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import './Lost1.css'; 
import axios from 'axios';

const LostItemPage = () => {
    const [itemType, setItemType] = useState('');
    const [customItem, setCustomItem] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [customLocation, setCustomLocation] = useState('');
    const navigate = useNavigate(); 

    const handleIconClick = (item) => {
        setItemType(item);
        setCustomItem('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const selectedItem = itemType === 'Other' ? customItem : itemType;

        if (selectedItem && customLocation) {
            const requestBody = {
                itemType: selectedItem,
                itemDescription,
                location: customLocation,
            };

            console.log("Request Body:", requestBody);
            setLoading(true);

            try {
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/lost-items`, requestBody);
                console.log(response.data);
                setSubmitted(true);
                setError('');

                setTimeout(() => {
                    navigate('/map');
                }, 1000);
            } catch (error) {
                console.error('Error submitting the lost item:', error);
                setError(error.response?.data?.error || 'Failed to submit the item. Please try again.');
            } finally {
                setLoading(false);
            }
        } else {
            setError('Please select an item type and enter a location.');
        }
    };

    return (
        <div className="lost-item-page">
            <h2>Report a Lost Item</h2>
            {submitted && <p className="success-message">Your report has been submitted! Redirecting to the map...</p>}
            {error && <p className="error-message">{error}</p>} 
            <form onSubmit={handleSubmit}>
                <div className="item-type-selection">
                    <h3>Select Item Type:</h3>
                    <div className="icons">
                        {['Wallet', 'Phone', 'Keys', 'Glasses', 'Bag', 'Watch', 'Umbrella', 'Headphones', 'Laptop', 'Camera', 'Book', 'Pet', 'Other'].map((item, index) => (
                            <div
                                className={`icon ${itemType === item ? 'selected' : ''}`} // Apply 'selected' class if the item is chosen
                                key={index}
                                onClick={() => handleIconClick(item)}
                            >
                                {item === 'Other' ? '❓' : 
                                 item === 'Wallet' ? '👜' : 
                                 item === 'Phone' ? '📱' : 
                                 item === 'Keys' ? '🔑' : 
                                 item === 'Glasses' ? '👓' : 
                                 item === 'Bag' ? '🛍️' : 
                                 item === 'Watch' ? '⌚' : 
                                 item === 'Umbrella' ? '☂️' : 
                                 item === 'Headphones' ? '🎧' : 
                                 item === 'Laptop' ? '💻' : 
                                 item === 'Camera' ? '📷' : 
                                 item === 'Book' ? '📚' : 
                                 '🐾'}
                            </div>
                        ))}
                    </div>
                    {itemType === 'Other' && (
                        <div className="custom-input">
                            <label htmlFor="custom-item">Non-listed Item:</label>
                            <input
                                type="text"
                                id="custom-item"
                                placeholder="Specify the item"
                                value={customItem}
                                onChange={(e) => setCustomItem(e.target.value)}
                                required
                            />
                        </div>
                    )}
                </div>
                <div className="item-description">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        rows="4"
                        value={itemDescription}
                        onChange={(e) => setItemDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="custom-location">
                    <label htmlFor="custom-location">Enter Location:</label>
                    <input
                        type="text"
                        id="custom-location"
                        placeholder="Enter your location"
                        value={customLocation}
                        onChange={(e) => setCustomLocation(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="submit-button" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default LostItemPage;
