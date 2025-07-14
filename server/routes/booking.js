const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// POST /api/bookings - Create a new booking
router.post('/', bookingController.createBooking);

// GET /api/bookings - Get all bookings (for admin purposes)
router.get('/', bookingController.getAllBookings);

module.exports = router; 