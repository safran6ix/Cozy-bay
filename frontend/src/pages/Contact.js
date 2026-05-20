import React, { useState } from 'react';
import axios from 'axios';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/contact', formData);
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 5000);
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            alert('Failed to send message. Please try again.');
        }
    };

    return (
        <div className="contact-page">
            <div className="container">
                <h1 className="page-title">Contact Us</h1>
                <div className="contact-grid">
                    <form onSubmit={handleSubmit} className="contact-form">
                        <div className="form-group">
                            <label>Name *</label>
                            <input type="text" name="name" required onChange={handleChange} value={formData.name} />
                        </div>

                        <div className="form-group">
                            <label>Email *</label>
                            <input type="email" name="email" required onChange={handleChange} value={formData.email} />
                        </div>

                        <div className="form-group">
                            <label>Message *</label>
                            <textarea name="message" rows="6" required onChange={handleChange} value={formData.message}></textarea>
                        </div>

                        <button type="submit" className="btn btn-primary">Send Message</button>
                    </form>

                    <div className="contact-info">
                        <h3>Get in Touch</h3>
                        <div className="info-item">
                            <span>📍</span>
                            <p>Arugam Bay, Sri Lanka</p>
                        </div>
                        <div className="info-item">
                            <span>📞</span>
                            <p>+94 76 123 4567</p>
                        </div>
                        <div className="info-item">
                            <span>✉️</span>
                            <p>stay@cozybay.com</p>
                        </div>
                        <div className="info-item">
                            <span>🌐</span>
                            <p>@cozybay.surfstay</p>
                        </div>

                        <div className="map-placeholder">
                            <h4>Find Us</h4>
                            <div className="map">
                                <p>📍 Located near Main Surf Point</p>
                                <p>Arugam Bay, Sri Lanka</p>
                            </div>
                        </div>
                    </div>
                </div>

                {submitted && (
                    <div className="success-message">
                        Message sent successfully! We'll get back to you soon.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Contact;