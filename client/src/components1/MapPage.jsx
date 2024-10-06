import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import placeholderIcon from '../images/placeholder.png'; // Adjust the path if necessary
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import axios from 'axios'; // For reverse geocoding and geocoding
import { useNavigate } from 'react-router-dom'; // Import useNavigate

// Custom Hook to handle map events
const LocationMarker = ({ setPosition, setPlaceName }) => {
    useMapEvents({
        click(e) {
            const newPosition = [e.latlng.lat, e.latlng.lng];
            setPosition(newPosition);
            fetchPlaceName(newPosition, setPlaceName); // Fetch place name based on coordinates
        },
    });

    return null;
};

// Function to fetch the place name from coordinates
const fetchPlaceName = async (coords, setPlaceName) => {
    const [lat, lon] = coords;
    try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`);
        const placeName = response.data.display_name; // Human-readable address
        setPlaceName(placeName); // Set the place name
    } catch (error) {
        console.error('Error fetching place name:', error);
        setPlaceName('Unknown place'); // Fallback in case of error
    }
};

// Function to fetch coordinates based on a place name
const fetchCoordinates = async (placeName, setPosition, setPlaceName) => {
    try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${placeName}`);
        if (response.data && response.data.length > 0) {
            const { lat, lon, display_name } = response.data[0];
            setPosition([parseFloat(lat), parseFloat(lon)]); // Set new position based on search
            setPlaceName(display_name); // Set place name for popup
        } else {
            alert('Place not found');
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        alert('Error searching for the location');
    }
};

const MapPage = () => {
    const [position, setPosition] = useState([20.3534, 85.8196]); // Default position
    const [placeName, setPlaceName] = useState(''); // Holds the name of the selected place
    const [searchTerm, setSearchTerm] = useState(''); // Store the search input
    const navigate = useNavigate(); // Hook for navigation

    const lostItem = JSON.parse(localStorage.getItem('lostItem')); // Retrieve lost item data

    const handleSubmitLocation = async () => {
        const requestBody = {
            location: placeName, // Use the human-readable place name
            coordinates: {
                type: "Point", // This indicates it's a Point
                coordinates: [position[1], position[0]], // Longitude first, then Latitude
            },
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/location`, { // Updated URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                const savedLocation = await response.json(); // Get the saved location data
                console.log('Saved location:', savedLocation);
                alert('Lost item submitted successfully');
            } else {
                const errorData = await response.json(); // Get error details
                console.error('Error details:', errorData);
                alert('Error submitting lost item');
            }
        } catch (error) {
            console.error('Error submitting lost item:', error);
        }
    };

    const handleNext = () => {
        navigate('/'); // Redirect to homepage (assuming your homepage path is '/')
    };

    // Modify the search handler to accept both place names and coordinates
    const handleSearch = () => {
        // Check if the input is in the format of "lat, lon"
        const coordRegex = /^-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?$/;
        if (coordRegex.test(searchTerm.trim())) {
            const [lat, lon] = searchTerm.split(',').map(Number);
            if (!isNaN(lat) && !isNaN(lon)) {
                setPosition([lat, lon]); // Set position directly from coordinates
                fetchPlaceName([lat, lon], setPlaceName); // Fetch the place name for popup
            }
        } else {
            fetchCoordinates(searchTerm, setPosition, setPlaceName); // Search for place name if not coordinates
        }
    };

    // Create custom icon
    const customIcon = new L.Icon({
        iconUrl: placeholderIcon,
        iconSize: [30, 40], // Width and height of the icon in pixels
        iconAnchor: [15, 40], // Position of the icon relative to its tip (for centering)
        popupAnchor: [0, -40], // Position of the popup relative to the icon
    });

    return (
        <div className="map-page">
            <h2>Select the Last Seen Location</h2>
            {/* Search input and button */}
            <div className="search-container">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for a place or enter coordinates"
                    className="search-input"
                />
                <button onClick={handleSearch} className="search-button">Search</button>
            </div>

            <MapContainer center={position} zoom={13} style={{ height: '60vh', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <LocationMarker setPosition={setPosition} setPlaceName={setPlaceName} />
                <Marker position={position} icon={customIcon}>
                    <Popup>
                        {placeName ? `Last seen: ${placeName}` : 'Fetching location...'} <br />
                        <button onClick={handleSubmitLocation}>Submit Location</button>
                    </Popup>
                </Marker>
            </MapContainer>
            <button onClick={handleNext}>Next</button> {/* Placeholder for next function */}
        </div>
    );
};

export default MapPage;
