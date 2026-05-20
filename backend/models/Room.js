// backend/models/Room.js - Room model
const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true, enum: ['Standard', 'Deluxe', 'Suite', 'Presidential'] },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    amenities: [{ type: String }],
    capacity: { type: Number, required: true },
    size: { type: Number, required: true },
    beds: { type: String, required: true },
    images: [{ type: String }],
    isAvailable: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Room', roomSchema);