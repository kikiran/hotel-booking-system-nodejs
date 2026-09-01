const express = require('express');
const router = express.Router();
const { hotels, bookings } = require('../data/mockData');

router.get('/:hotelId/:roomId/availability', (req, res) => {
  try {
    const hotel = hotels.find(h => h.id === req.params.hotelId);
    if (!hotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }

    const room = hotel.rooms.find(r => r.id === req.params.roomId);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    const { checkIn, checkOut } = req.query;

    if (checkIn && checkOut) {
      const conflictingBookings = bookings.filter(b =>
        b.hotelId === hotel.id &&
        b.roomId === room.id &&
        b.status !== 'cancelled' &&
        new Date(b.checkOut) > new Date(checkIn) &&
        new Date(b.checkIn) < new Date(checkOut)
      );

      const availableCount = room.totalRooms - conflictingBookings.length;

      res.json({
        available: availableCount > 0,
        availableRooms: Math.max(0, availableCount),
        totalRooms: room.totalRooms,
        price: room.price,
        nights: Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)),
        totalPrice: room.price * Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))
      });
    } else {
      res.json({
        available: room.available,
        availableRooms: room.availableRooms,
        totalRooms: room.totalRooms,
        price: room.price
      });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
