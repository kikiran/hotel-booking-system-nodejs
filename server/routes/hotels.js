const express = require('express');
const router = express.Router();
const { hotels } = require('../data/mockData');
const { optionalAuth } = require('../middleware/auth');

router.get('/', optionalAuth, (req, res) => {
  try {
    let filtered = [...hotels];
    const { search, location, category, minPrice, maxPrice, rating, amenities, sort, featured, page = 1, limit = 12 } = req.query;

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(h =>
        h.name.toLowerCase().includes(q) ||
        h.location.toLowerCase().includes(q) ||
        h.description.toLowerCase().includes(q) ||
        h.amenities.some(a => a.toLowerCase().includes(q))
      );
    }

    if (location) {
      const loc = location.toLowerCase();
      filtered = filtered.filter(h => h.location.toLowerCase().includes(loc));
    }

    if (category) {
      filtered = filtered.filter(h => h.category === category);
    }

    if (featured === 'true') {
      filtered = filtered.filter(h => h.featured);
    }

    if (minPrice) {
      filtered = filtered.filter(h => h.rooms.some(r => r.price >= parseInt(minPrice)));
    }

    if (maxPrice) {
      filtered = filtered.filter(h => h.rooms.some(r => r.price <= parseInt(maxPrice)));
    }

    if (rating) {
      filtered = filtered.filter(h => h.rating >= parseFloat(rating));
    }

    if (amenities) {
      const amenityList = amenities.split(',');
      filtered = filtered.filter(h => amenityList.every(a => h.amenities.some(ha => ha.toLowerCase().includes(a.toLowerCase()))));
    }

    if (sort) {
      switch (sort) {
        case 'price-low':
          filtered.sort((a, b) => Math.min(...a.rooms.map(r => r.price)) - Math.min(...b.rooms.map(r => r.price)));
          break;
        case 'price-high':
          filtered.sort((a, b) => Math.min(...b.rooms.map(r => r.price)) - Math.min(...a.rooms.map(r => r.price)));
          break;
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'reviews':
          filtered.sort((a, b) => b.reviewCount - a.reviewCount);
          break;
        case 'name':
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
        default:
          break;
      }
    }

    const total = filtered.length;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const start = (pageNum - 1) * limitNum;
    const paginatedHotels = filtered.slice(start, start + limitNum);

    const hotelsWithoutRooms = paginatedHotels.map(h => ({
      ...h,
      rooms: undefined,
      minPrice: Math.min(...h.rooms.map(r => r.price)),
      maxPrice: Math.max(...h.rooms.map(r => r.price))
    }));

    res.json({
      hotels: hotelsWithoutRooms,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum)
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/featured', (req, res) => {
  try {
    const featured = hotels.filter(h => h.featured).map(h => ({
      ...h,
      rooms: undefined,
      minPrice: Math.min(...h.rooms.map(r => r.price)),
      maxPrice: Math.max(...h.rooms.map(r => r.price))
    }));
    res.json(featured);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:slug', (req, res) => {
  try {
    const hotel = hotels.find(h => h.slug === req.params.slug || h.id === req.params.slug);
    if (!hotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:hotelId/rooms', (req, res) => {
  try {
    const hotel = hotels.find(h => h.id === req.params.hotelId);
    if (!hotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }
    res.json({ hotel: { id: hotel.id, name: hotel.name, location: hotel.location }, rooms: hotel.rooms });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
