// backend/routes/rooms.js - Rooms API routes
const express = require('express');
const router = express.Router();
const Room = require('../models/Room');

// Get all rooms
router.get('/', async (req, res) => {
    try {
        const rooms = await Room.find();
        res.json(rooms);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get single room
router.get('/:id', async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) return res.status(404).json({ message: 'Room not found' });
        res.json(room);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Seed initial rooms (run once)
router.post('/seed', async (req, res) => {
    const rooms = [
        {
            name: 'Cozy Standard Room',
            type: 'Standard',
            price: 120,
            description: 'Perfect for solo travelers or couples, this cozy room offers comfort and simplicity with modern amenities.',
            amenities: ['Free WiFi', 'Flat-screen TV', 'Air conditioning', 'Mini fridge', 'Work desk'],
            capacity: 2,
            size: 25,
            beds: '1 Queen Bed',
            images: ['https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800']
        },
        {
            name: 'Deluxe Ocean View',
            type: 'Deluxe',
            price: 199,
            description: 'Enjoy breathtaking ocean views from your private balcony. Spacious room with premium furnishings.',
            amenities: ['Free WiFi', '55" Smart TV', 'Air conditioning', 'Mini bar', 'Rain shower', 'Balcony', 'Coffee machine'],
            capacity: 3,
            size: 35,
            beds: '1 King Bed + Sofa',
            images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800']
        },
        {
            name: 'Bay Suite',
            type: 'Suite',
            price: 350,
            description: 'Luxurious suite with separate living area and panoramic bay views. Ultimate comfort and elegance.',
            amenities: ['Free WiFi', '65" Smart TV', 'Air conditioning', 'Full mini bar', 'Jacuzzi', 'Separate living room', 'Butler service'],
            capacity: 4,
            size: 55,
            beds: '1 King Bed + Pull-out',
            images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800']
        },
        {
            name: 'Presidential Penthouse',
            type: 'Presidential',
            price: 599,
            description: 'Our most exclusive accommodation featuring a private terrace, dining area, and personalized butler service.',
            amenities: ['Free WiFi', '75" OLED TV', 'Air conditioning', 'Stocked bar', 'Private terrace', 'Dining area', 'Butler service', 'Jacuzzi tub'],
            capacity: 6,
            size: 85,
            beds: '2 King Beds + Sofa',
            images: ['https://images.unsplash.com/photo-1631049035182-249067d7618e?w=800']
        }
    ];

    try {
        await Room.insertMany(rooms);
        res.json({ message: 'Rooms seeded successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;