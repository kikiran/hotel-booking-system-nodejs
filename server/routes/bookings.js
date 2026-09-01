const express = require('express');
const router = express.Router();
const { bookings, hotels } = require('../data/mockData');
const { authMiddleware, adminOnly } = require('../middleware/auth');

router.get('/', authMiddleware, (req, res) => {
  try {
    let userBookings;
    if (req.user.role === 'admin') {
      userBookings = [...bookings];
    } else {
      userBookings = bookings.filter(b => b.userId === req.user.id);
    }

    const { status, page = 1, limit = 10 } = req.query;
    let filtered = [...userBookings];

    if (status) {
      filtered = filtered.filter(b => b.status === status);
    }

    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const total = filtered.length;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const start = (pageNum - 1) * limitNum;

    res.json({
      bookings: filtered.slice(start, start + limitNum),
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum)
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/stats', authMiddleware, adminOnly, (req, res) => {
  try {
    const totalBookings = bookings.length;
    const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
    const pendingBookings = bookings.filter(b => b.status === 'pending').length;
    const completedBookings = bookings.filter(b => b.status === 'completed').length;
    const cancelledBookings = bookings.filter(b => b.status === 'cancelled').length;
    const totalRevenue = bookings.filter(b => b.status !== 'cancelled').reduce((sum, b) => sum + b.totalPrice, 0);
    const avgBookingValue = totalBookings > 0 ? Math.round(totalRevenue / confirmedBookings) : 0;

    res.json({
      totalBookings,
      confirmedBookings,
      pendingBookings,
      completedBookings,
      cancelledBookings,
      totalRevenue,
      avgBookingValue
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', authMiddleware, (req, res) => {
  try {
    const { hotelId, roomId, checkIn, checkOut, guests, guestName, guestEmail, guestPhone, paymentMethod, specialRequests } = req.body;

    if (!hotelId || !roomId || !checkIn || !checkOut || !guests) {
      return res.status(400).json({ error: 'Missing required booking information' });
    }

    const hotel = hotels.find(h => h.id === hotelId);
    if (!hotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }

    const room = hotel.rooms.find(r => r.id === roomId);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    if (nights <= 0) {
      return res.status(400).json({ error: 'Check-out must be after check-in' });
    }

    const totalPrice = room.price * nights;

    const newBooking = {
      id: `b${Date.now()}`,
      userId: req.user.id,
      hotelId,
      roomId,
      hotelName: hotel.name,
      roomName: room.name,
      checkIn,
      checkOut,
      guests: parseInt(guests),
      totalPrice,
      status: 'confirmed',
      createdAt: new Date().toISOString().split('T')[0],
      guestName: guestName || req.user.name,
      guestEmail: guestEmail || req.user.email,
      guestPhone: guestPhone || '',
      paymentMethod: paymentMethod || 'Credit Card',
      specialRequests: specialRequests || ''
    };

    bookings.push(newBooking);

    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:bookingId/cancel', authMiddleware, (req, res) => {
  try {
    const booking = bookings.find(b => b.id === req.params.bookingId);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    if (booking.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }

    if (booking.status === 'cancelled') {
      return res.status(400).json({ error: 'Booking is already cancelled' });
    }

    booking.status = 'cancelled';
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:bookingId', authMiddleware, adminOnly, (req, res) => {
  try {
    const index = bookings.findIndex(b => b.id === req.params.bookingId);
    if (index === -1) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    bookings.splice(index, 1);
    res.json({ message: 'Booking deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
