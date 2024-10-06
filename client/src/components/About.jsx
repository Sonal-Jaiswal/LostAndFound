import React, { useState } from 'react';
import './About.css'; // Ensure this CSS file exists
import lost from '../images/3372415.png'

// Sample feature descriptions for the slider
const features = [
    {
      src:{lost},
      description: 'Easily navigate through lost and found items with our intuitive design. Our user-friendly interface allows you to search for items based on categories, locations, and time frames. You can quickly find what you’re looking for without any hassle.',
    },
    {
      description: 'Report a lost item or found item in just a few clicks. Simply fill out a form with the details of the item and its location, and submit it for others to see. This streamlined process ensures that your report reaches the right audience swiftly.',
    },
    {
      description: 'Get notified when items matching your search criteria are reported. You can customize your notification settings to receive alerts via email or app notifications. Stay informed and increase your chances of recovering lost belongings quickly.',
    },
  ];
  

export const About = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % features.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + features.length) % features.length);
  };

  return (
    <div className="about-container">
      <h2>About Our Lost & Found</h2>
      <p>
        Our platform is dedicated to helping you reconnect with lost items on campus. Whether you've misplaced your belongings or found something that doesn't belong to you, our user-friendly application provides a simple way to report and recover items.
      </p>

      <h3>Features</h3>
      <div className="slider">
        <div className="slide" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {features.map((feature, index) => (
            <div className="feature-slide" key={index}>
              <p className="slide-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Slider Controls */}
      <div className="slider-controls">
        <button className="control" onClick={prevSlide}>❮</button>
        <button className="control" onClick={nextSlide}>❯</button>
      </div>
    </div>
  );
};
