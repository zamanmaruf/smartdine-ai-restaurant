const fs = require('fs').promises;
const path = require('path');

// Path to the bookings JSON file
const bookingsFilePath = path.join(__dirname, '../models/bookings.json');

// Ensure the bookings file exists
async function ensureBookingsFile() {
    try {
        await fs.access(bookingsFilePath);
    } catch (error) {
        // File doesn't exist, create it with empty array
        await fs.writeFile(bookingsFilePath, JSON.stringify([], null, 2));
    }
}

// Create a new booking
const createBooking = async (req, res) => {
    try {
        const { name, email, phone, guests, date, time } = req.body;

        // Validate required fields
        if (!name || !email || !phone || !guests || !date || !time) {
            return res.status(400).json({ 
                error: 'All fields are required' 
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                error: 'Please provide a valid email address' 
            });
        }

        // Validate phone format (basic validation)
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))) {
            return res.status(400).json({ 
                error: 'Please provide a valid phone number' 
            });
        }

        // Validate date (must be in the future)
        const bookingDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (bookingDate < today) {
            return res.status(400).json({ 
                error: 'Booking date must be in the future' 
            });
        }

        // Ensure bookings file exists
        await ensureBookingsFile();

        // Read existing bookings
        const bookingsData = await fs.readFile(bookingsFilePath, 'utf8');
        const bookings = JSON.parse(bookingsData);

        // Create new booking object
        const newBooking = {
            id: Date.now().toString(),
            name,
            email,
            phone,
            guests: parseInt(guests),
            date,
            time,
            status: 'pending',
            createdAt: new Date().toISOString()
        };

        // Add to bookings array
        bookings.push(newBooking);

        // Write back to file
        await fs.writeFile(bookingsFilePath, JSON.stringify(bookings, null, 2));

        // Log the booking (for development)
        console.log('New booking received:', newBooking);

        res.status(201).json({
            message: 'Booking created successfully',
            booking: {
                id: newBooking.id,
                name: newBooking.name,
                date: newBooking.date,
                time: newBooking.time,
                guests: newBooking.guests
            }
        });

    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ 
            error: 'Failed to create booking' 
        });
    }
};

// Get all bookings (for admin purposes)
const getAllBookings = async (req, res) => {
    try {
        await ensureBookingsFile();
        
        const bookingsData = await fs.readFile(bookingsFilePath, 'utf8');
        const bookings = JSON.parse(bookingsData);

        res.json({
            bookings: bookings.map(booking => ({
                id: booking.id,
                name: booking.name,
                email: booking.email,
                phone: booking.phone,
                guests: booking.guests,
                date: booking.date,
                time: booking.time,
                status: booking.status,
                createdAt: booking.createdAt
            }))
        });

    } catch (error) {
        console.error('Error getting bookings:', error);
        res.status(500).json({ 
            error: 'Failed to retrieve bookings' 
        });
    }
};

module.exports = {
    createBooking,
    getAllBookings
}; 