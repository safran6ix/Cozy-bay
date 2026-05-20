// backend/routes/contact.js - Contact API
const express = require('express');
const router = express.Router();

// Contact form submission (store in database or send email)
router.post('/', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        // Here you would typically send an email or save to database
        console.log('Contact message:', { name, email, message });
        res.json({ message: 'Message sent successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;