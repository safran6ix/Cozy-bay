import React from 'react';
import './Rooms.css';

const Rooms = () => {
    const rooms = [
        {
            type: 'Standard Room',
            price: '$50/night',
            description: 'Cozy room with garden view, perfect for solo travelers',
            features: ['Queen Bed', 'Private Bathroom', 'AC', 'Wi-Fi']
        },
        {
            type: 'Deluxe Room',
            price: '$80/night',
            description: 'Spacious room with pool view and balcony',
            features: ['King Bed', 'Private Bathroom', 'AC', 'Wi-Fi', 'Balcony']
        },
        {
            type: 'Suite',
            price: '$120/night',
            description: 'Luxury suite with ocean view and private terrace',
            features: ['King Bed', 'Private Bathroom', 'AC', 'Wi-Fi', 'Terrace', 'Mini Bar']
        }
    ];

    return (
        <div className="rooms-page">
            <div className="container">
                <h1 className="page-title">Our Rooms</h1>
                <div className="rooms-grid">
                    {rooms.map((room, index) => (
                        <div key={index} className="room-card">
                            <h2>{room.type}</h2>
                            <p className="price">{room.price}</p>
                            <p className="description">{room.description}</p>
                            <ul className="features">
                                {room.features.map((feature, i) => (
                                    <li key={i}>✓ {feature}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Rooms;