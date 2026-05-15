// frontend/src/App.jsx - Simplified version without framer-motion
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import './styles/global.css';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [formData, setFormData] = useState({
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    specialRequests: ''
  });

  useEffect(() => {
    fetchRooms();

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await axios.get(`${API_URL}/rooms`);
      setRooms(res.data.data || res.data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load rooms');
    } finally {
      setLoading(false);
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!selectedRoom) return;

    if (new Date(formData.checkIn) >= new Date(formData.checkOut)) {
      toast.error('Check-out date must be after check-in date');
      return;
    }

    try {
      const bookingData = {
        roomId: selectedRoom._id || selectedRoom.id,
        ...formData
      };
      await axios.post(`${API_URL}/bookings`, bookingData);
      toast.success(`Booking confirmed for ${selectedRoom.name}!`);
      setShowBookingModal(false);
      setFormData({
        guestName: '',
        guestEmail: '',
        guestPhone: '',
        checkIn: '',
        checkOut: '',
        guests: 1,
        specialRequests: ''
      });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed');
    }
  };

  const calculateNights = () => {
    if (!formData.checkIn || !formData.checkOut) return 0;
    return Math.max(1, Math.ceil((new Date(formData.checkOut) - new Date(formData.checkIn)) / (1000 * 60 * 60 * 24)));
  };

  const calculateTotal = () => {
    if (!selectedRoom) return 0;
    const price = selectedRoom.discountedPrice || selectedRoom.price;
    return price * calculateNights();
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Toaster position="top-right" />

      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <span className="logo-icon">🌊</span>
            Cozy<span>Bay</span>
          </div>
          <ul className="nav-links">
            <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a></li>
            <li><a href="#rooms" onClick={(e) => { e.preventDefault(); scrollToSection('rooms'); }}>Rooms</a></li>
            <li><a href="#amenities" onClick={(e) => { e.preventDefault(); scrollToSection('amenities'); }}>Amenities</a></li>
            <li><a href="#gallery" onClick={(e) => { e.preventDefault(); scrollToSection('gallery'); }}>Gallery</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a></li>
            <li><button className="btn-book-nav" onClick={() => scrollToSection('rooms')}>Book Now →</button></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-slider">
          <div className="hero-bg" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920")' }}>
            <div className="hero-overlay"></div>
          </div>
        </div>
        <div className="hero-content">
          <div className="container">
            <span className="hero-badge">★★★★★ 5-Star Luxury Resort</span>
            <h1>Welcome to <span className="highlight">Cozy Bay</span></h1>
            <p>Experience unparalleled luxury where the crystal-clear bay meets sophisticated comfort. Your perfect coastal escape awaits.</p>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={() => scrollToSection('rooms')}>
                Explore Suites <span>→</span>
              </button>
              <button className="btn-secondary-outline" onClick={() => scrollToSection('contact')}>
                Contact Us
              </button>
            </div>
            <div className="hero-stats">
              <div>
                <span>200+</span>
                <p>Luxury Rooms</p>
              </div>
              <div>
                <span>50+</span>
                <p>5-Star Reviews</p>
              </div>
              <div>
                <span>24/7</span>
                <p>Concierge Service</p>
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <span>Scroll to explore</span>
          <div className="mouse"></div>
        </div>
      </section>

      {/* Rooms Section */}
      <section id="rooms" className="section rooms-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Luxury Accommodations</span>
            <h2 className="section-title">Experience <span className="highlight">Ultimate Comfort</span></h2>
            <p>Discover our collection of meticulously designed rooms and suites</p>
          </div>

          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="rooms-grid">
              {rooms.map((room) => (
                <div key={room._id || room.id} className="room-card">
                  <div className="room-image">
                    <img src={room.images?.[0] || 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800'} alt={room.name} />
                    {room.discount > 0 && <span className="discount-badge">-{room.discount}%</span>}
                    <span className="room-type">{room.type}</span>
                  </div>
                  <div className="room-info">
                    <h3>{room.name}</h3>
                    <p>{room.description?.substring(0, 100)}...</p>
                    <div className="room-features">
                      <span>👥 {room.capacity} Guests</span>
                      <span>📏 {room.size} m²</span>
                    </div>
                    <div className="room-price">
                      {room.discount > 0 ? (
                        <>
                          <span className="original">${room.price}</span>
                          <span className="discounted">${Math.round(room.price * (1 - room.discount / 100))}</span>
                        </>
                      ) : (
                        <span>${room.price}</span>
                      )}
                      <span className="per-night">/ night</span>
                    </div>
                    <button className="btn-book" onClick={() => {
                      setSelectedRoom(room);
                      setShowBookingModal(true);
                    }}>Book Now →</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Amenities Section */}
      <section id="amenities" className="amenities-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">World-Class Amenities</span>
            <h2 className="section-title">Luxury <span className="highlight">At Your Fingertips</span></h2>
          </div>
          <div className="amenities-grid">
            {amenitiesData.map((amenity, index) => (
              <div key={index} className="amenity-card">
                <div className="amenity-icon">{amenity.icon}</div>
                <h3>{amenity.title}</h3>
                <p>{amenity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="gallery-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Visual Journey</span>
            <h2 className="section-title">Capture The <span className="highlight">Moments</span></h2>
          </div>
          <div className="gallery-grid">
            {galleryImages.map((image, index) => (
              <div key={index} className="gallery-item">
                <img src={image.url} alt={image.caption} />
                <div className="gallery-overlay">
                  <span>{image.caption}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="contact-wrapper">
            <div className="contact-info">
              <h3>Visit Our Resort</h3>
              <p>Experience the perfect blend of luxury and nature</p>
              <div className="info-item">
                <span className="icon">📍</span>
                <div>
                  <strong>Address</strong>
                  <p>123 Bayfront Avenue, Coastal City, CC 12345</p>
                </div>
              </div>
              <div className="info-item">
                <span className="icon">📞</span>
                <div>
                  <strong>Reservations</strong>
                  <p>+1 (555) 123-4567</p>
                  <p>reservations@cozybay.com</p>
                </div>
              </div>
              <div className="info-item">
                <span className="icon">⏰</span>
                <div>
                  <strong>Front Desk</strong>
                  <p>24/7 Service</p>
                  <p>Check-in: 3PM | Check-out: 11AM</p>
                </div>
              </div>
            </div>

            <form className="contact-form" onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              try {
                await axios.post(`${API_URL}/contact`, {
                  name: formData.get('name'),
                  email: formData.get('email'),
                  message: formData.get('message')
                });
                toast.success('Message sent successfully!');
                e.target.reset();
              } catch (err) {
                toast.error('Failed to send message');
              }
            }}>
              <h3>Send Us a Message</h3>
              <input type="text" name="name" placeholder="Your Name" required />
              <input type="email" name="email" placeholder="Your Email" required />
              <textarea name="message" rows="5" placeholder="Your Message" required></textarea>
              <button type="submit" className="btn-primary full-width">Send Message →</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">Cozy<span>Bay</span></div>
              <p>Luxury redefined. Experience the finest hospitality by the bay.</p>
              <div className="social-links">
                <a href="#">📘</a>
                <a href="#">📸</a>
                <a href="#">🐦</a>
                <a href="#">📧</a>
              </div>
            </div>
            <div className="footer-links">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a></li>
                <li><a href="#rooms" onClick={(e) => { e.preventDefault(); scrollToSection('rooms'); }}>Rooms</a></li>
                <li><a href="#amenities" onClick={(e) => { e.preventDefault(); scrollToSection('amenities'); }}>Amenities</a></li>
                <li><a href="#gallery" onClick={(e) => { e.preventDefault(); scrollToSection('gallery'); }}>Gallery</a></li>
              </ul>
            </div>
            <div className="footer-links">
              <h4>Support</h4>
              <ul>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Cancellation Policy</a></li>
              </ul>
            </div>
            <div className="footer-newsletter">
              <h4>Newsletter</h4>
              <p>Get exclusive offers and updates</p>
              <div className="newsletter-input">
                <input type="email" placeholder="Your email" />
                <button>→</button>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Cozy Bay Hotel. All rights reserved. | Designed for luxury travel</p>
          </div>
        </div>
      </footer>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="modal-overlay" onClick={() => setShowBookingModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowBookingModal(false)}>×</button>
            <h2>Book {selectedRoom?.name}</h2>
            <p className="modal-price">${selectedRoom?.discountedPrice || selectedRoom?.price} <span>/ night</span></p>
            <form onSubmit={handleBookingSubmit}>
              <input type="text" placeholder="Full Name" required value={formData.guestName} onChange={e => setFormData({ ...formData, guestName: e.target.value })} />
              <input type="email" placeholder="Email" required value={formData.guestEmail} onChange={e => setFormData({ ...formData, guestEmail: e.target.value })} />
              <input type="tel" placeholder="Phone" required value={formData.guestPhone} onChange={e => setFormData({ ...formData, guestPhone: e.target.value })} />
              <div className="modal-row">
                <input type="date" placeholder="Check In" required value={formData.checkIn} onChange={e => setFormData({ ...formData, checkIn: e.target.value })} />
                <input type="date" placeholder="Check Out" required value={formData.checkOut} onChange={e => setFormData({ ...formData, checkOut: e.target.value })} />
              </div>
              <select value={formData.guests} onChange={e => setFormData({ ...formData, guests: e.target.value })}>
                {[1, 2, 3, 4, 5, 6].map(n => <option key={n}>{n} Guest{n > 1 ? 's' : ''}</option>)}
              </select>
              <textarea placeholder="Special Requests" value={formData.specialRequests} onChange={e => setFormData({ ...formData, specialRequests: e.target.value })}></textarea>
              <div className="modal-total">
                <span>Total: ${calculateTotal()}</span>
                <span>{calculateNights()} night(s)</span>
              </div>
              <div className="modal-buttons">
                <button type="button" className="btn-cancel" onClick={() => setShowBookingModal(false)}>Cancel</button>
                <button type="submit" className="btn-submit">Confirm Booking</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

const amenitiesData = [
  { icon: "🍽️", title: "Fine Dining", description: "World-class restaurants with Michelin-starred chefs" },
  { icon: "🏊", title: "Infinity Pool", description: "Stunning ocean-view pool with swim-up bar" },
  { icon: "💆", title: "Luxury Spa", description: "Traditional treatments and modern therapies" },
  { icon: "🏋️", title: "Fitness Center", description: "State-of-the-art equipment with personal trainers" },
  { icon: "🍸", title: "Beach Bar", description: "Signature cocktails with sunset views" },
  { icon: "🚗", title: "Valet Parking", description: "Complimentary valet service for guests" },
  { icon: "👶", title: "Kids Club", description: "Supervised activities for children" },
  { icon: "🏖️", title: "Private Beach", description: "Exclusive beach access for hotel guests" }
];

const galleryImages = [
  { url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800", caption: "Ocean View Suite" },
  { url: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800", caption: "Infinity Pool" },
  { url: "https://images.unsplash.com/photo-1590073242678-70ee3fc28f8e?w=800", caption: "Spa & Wellness" },
  { url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800", caption: "Fine Dining" },
  { url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800", caption: "Luxury Suite" },
  { url: "https://images.unsplash.com/photo-1511938556997-30b0ee12e35c?w=800", caption: "Beach View" }
];

export default App;