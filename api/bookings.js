import { promises as fs } from 'fs';
import path from 'path';

const bookingsFilePath = path.join('/tmp', 'bookings.json');

async function ensureBookingsFile() {
    try {
        await fs.access(bookingsFilePath);
    } catch (error) {
        await fs.writeFile(bookingsFilePath, JSON.stringify([], null, 2));
    }
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { name, email, phone, guests, date, time } = req.body;
            if (!name || !email || !phone || !guests || !date || !time) {
                return res.status(400).json({ error: 'All fields are required' });
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ error: 'Please provide a valid email address' });
            }
            const phoneRegex = /^[\+]?\d{7,16}$/;
            if (!phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))) {
                return res.status(400).json({ error: 'Please provide a valid phone number' });
            }
            const bookingDate = new Date(date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (bookingDate < today) {
                return res.status(400).json({ error: 'Booking date must be in the future' });
            }
            await ensureBookingsFile();
            const bookingsData = await fs.readFile(bookingsFilePath, 'utf8');
            const bookings = JSON.parse(bookingsData);
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
            bookings.push(newBooking);
            await fs.writeFile(bookingsFilePath, JSON.stringify(bookings, null, 2));
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
            res.status(500).json({ error: 'Failed to create booking' });
        }
    } else if (req.method === 'GET') {
        try {
            await ensureBookingsFile();
            const bookingsData = await fs.readFile(bookingsFilePath, 'utf8');
            const bookings = JSON.parse(bookingsData);
            res.json({ bookings });
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve bookings' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
} 