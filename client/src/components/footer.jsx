import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="footer-links">
                    <a href="/about">About Us</a>
                    <a href="/contact">Contact Us</a>
                    <a href="/terms">Terms of Service</a>
                </div>
                <ul className="social-media">
                    <li>Instagram</li>
                    <li>LinkedIn</li>
                    <li>GitHub</li>
                </ul>
                <p>&copy; {new Date().getFullYear()} Findit. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
