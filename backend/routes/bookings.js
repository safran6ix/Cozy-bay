// backend/routes/bookings.js - Booking API routes
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Room = require('../models/Room');

// Create booking
router.post('/', async (req, res) => {
    try {
        const { roomId, checkIn, checkOut, guests, guestName, guestEmail, guestPhone, specialRequests } = req.body;

        const room = await Room.findById(roomId);
        if (!room) return res.status(404).json({ message: 'Room not found' });

        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
        const totalPrice = room.price * nights;

        const booking = new Booking({
            roomId,
            guestName,
            guestEmail,
            guestPhone,
            checkIn: checkInDate,
            checkOut: checkOutDate,
            guests,
            totalPrice,
            specialRequests
        });

        const newBooking = await booking.save();
        res.status(201).json(newBooking);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get bookings by email
router.get('/email/:email', async (req, res) => {
    try {
        const bookings = await Booking.find({ guestEmail: req.params.email }).populate('roomId');
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;