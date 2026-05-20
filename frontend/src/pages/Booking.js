import React, { useState } from 'react';
import axios from 'axios';
import './Booking.css';

const Booking = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        checkIn: '',
        checkOut: '',
        guests: 1,
        roomType: 'standard',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Make sure this URL matches your backend
            const response = await axios.post('http://localhost:5000/api/bookings', formData);
            console.log('Booking response:', response.data);
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 5000);
            setFormData({
                name: '', email: '', phone: '', checkIn: '', checkOut: '',
                guests: 1, roomType: 'standard', message: ''
            });
        } catch (error) {
            console.error('Booking error:', error);
            alert('Booking failed. Please make sure the backend server is running on port 5000');
        }
    };

    return (
        <div className="booking-page">
            <div className="container">
                <h1 className="page-title">Book Your Stay</h1>
                <div className="booking-grid">
                    <form onSubmit={handleSubmit} className="booking-form">
                        <div className="form-group">
                            <label>Full Name *</label>
                            <input type="text" name="name" required onChange={handleChange} value={formData.name} />
                        </div>

                        <div className="form-group">
                            <label>Email *</label>
                            <input type="email" name="email" required onChange={handleChange} value={formData.email} />
                        </div>

                        <div className="form-group">
                            <label>Phone Number *</label>
                            <input type="tel" name="phone" required onChange={handleChange} value={formData.phone} />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Check-in Date *</label>
                                <input type="date" name="checkIn" required onChange={handleChange} value={formData.checkIn} />
                            </div>

                            <div className="form-group">
                                <label>Check-out Date *</label>
                                <input type="date" name="checkOut" required onChange={handleChange} value={formData.checkOut} />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Number of Guests *</label>
                                <input type="number" name="guests" min="1" max="4" onChange={handleChange} value={formData.guests} />
                            </div>

                            <div className="form-group">
                                <label>Room Type</label>
                                <select name="roomType" onChange={handleChange} value={formData.roomType}>
                                    <option value="standard">Standard Room</option>
                                    <option value="deluxe">Deluxe Room</option>
                                    <option value="suite">Suite</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Special Requests (Optional)</label>
                            <textarea name="message" rows="4" onChange={handleChange} value={formData.message}></textarea>
                        </div>

                        <button type="submit" className="btn btn-primary">Confirm Booking</button>
                    </form>

                    <div className="booking-info">
                        <h3>What's Included</h3>
                        <ul>
                            <li>✓ Complimentary breakfast</li>
                            <li>✓ Free Wi-Fi throughout</li>
                            <li>✓ Pool access</li>
                            <li>✓ Surfboard storage</li>
                            <li>✓ 24/7 front desk</li>
                        </ul>

                        <div className="contact-info">
                            <h4>Need Help?</h4>
                            <p>📞 +94 76 123 4567</p>
                            <p>✉️ stay@cozybay.com</p>
                        </div>
                    </div>
                </div>

                {submitted && (
                    <div className="success-message">
                        Booking request submitted! We'll contact you within 24 hours.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Booking;