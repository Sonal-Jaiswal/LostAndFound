import React, { useEffect } from 'react';
import { About } from './About';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import './Hero.css';

export const Hero = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const heroContainer = document.querySelector('.hero-container');
    heroContainer.classList.add('animate');
  }, []);

  // Handle navigation on button click
  const handleLostButtonClick = () => {
    navigate('/lost'); // Navigate to the lost page
  };
  const handlefoundButtonClick = () => {
    navigate('/found'); // Navigate to the found page
  };

  useEffect(() => {
    const heroContainer = document.querySelector('.hero-container');
    heroContainer.classList.add('animate');
  }, []);

  return (
    <>
      <div className="hero-container">
        <h1 className="hero-title">FindIt</h1>
        <p className="hero-intro">Helping you reclaim what’s lost on campus.</p>
        <div className="button-container">
          <div className="button-wrapper">
            <button className="hero-button lost" onClick={handleLostButtonClick}>Lost</button>
          </div>
          <div className="button-wrapper">
            <button className="hero-button found" onClick={handlefoundButtonClick}>Found</button>
          </div>
        </div>
        <p className="hero-intro1">Help us in helping others.</p>
      </div>

      <About />  {/* Render About component here */}
      <Footer /> {/* Render Footer component here */}
    </>
  );
};
