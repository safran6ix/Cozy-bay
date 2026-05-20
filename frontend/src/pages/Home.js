import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <>
            {/* Hero Section with Banner */}
            <section className="hero">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <h1 className="hero-title">Stay Salty, Sleep Cozy</h1>
                    <p className="hero-subtitle">Experience the perfect blend of surf and comfort at Arugam Bay</p>
                    <Link to="/booking" className="btn btn-primary">Book Your Stay →</Link>
                </div>
            </section>

            {/* About Section */}
            <section className="section about">
                <div className="container">
                    <h2 className="section-title">Welcome to Cozybay</h2>
                    <div className="about-grid">
                        <div className="about-text">
                            <p>Nestled in the heart of Arugam Bay, Cozybay Boutique Surf Stay offers the perfect sanctuary for wave chasers and relaxation seekers alike.</p>
                            <p>With our cozy rooms, refreshing pool, and vibrant bar, we've created a space where you can recharge after an epic day on the waves.</p>
                            <div className="features">
                                <div className="feature">
                                    <span>🏊‍♂️</span>
                                    <h3>Pool</h3>
                                </div>
                                <div className="feature">
                                    <span>🍹</span>
                                    <h3>Bar</h3>
                                </div>
                                <div className="feature">
                                    <span>📶</span>
                                    <h3>Free Wi-Fi</h3>
                                </div>
                                <div className="feature">
                                    <span>🏄‍♂️</span>
                                    <h3>Surf Guides</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Amenities Section */}
            <section className="section amenities">
                <div className="container">
                    <h2 className="section-title">Amenities</h2>
                    <div className="amenities-grid">
                        <div className="amenity-card">
                            <h3>Outdoor Pool</h3>
                            <p>Take a refreshing dip in our saltwater pool after a long surf session</p>
                        </div>
                        <div className="amenity-card">
                            <h3>Surfboard Storage</h3>
                            <p>Secure storage for your surfboards and equipment</p>
                        </div>
                        <div className="amenity-card">
                            <h3>Beach Access</h3>
                            <p>Just 2 minutes walk to the main surf break</p>
                        </div>
                        <div className="amenity-card">
                            <h3>Yoga Deck</h3>
                            <p>Morning and evening yoga sessions available</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section cta">
                <div className="container">
                    <h2>Ready for the perfect wave?</h2>
                    <p>Book your stay at Cozybay and experience Arugam Bay like never before</p>
                    <Link to="/booking" className="btn btn-primary">Check Availability</Link>
                </div>
            </section>
        </>
    );
};

export default Home;