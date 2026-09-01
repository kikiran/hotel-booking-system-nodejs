const express = require('express');
const router = express.Router();
const { reviews } = require('../data/mockData');
const { authMiddleware } = require('../middleware/auth');

router.get('/:hotelId', (req, res) => {
  try {
    const hotelReviews = reviews.filter(r => r.hotelId === req.params.hotelId);
    hotelReviews.sort((a, b) => new Date(b.date) - new Date(a.date));

    const avgRating = hotelReviews.length > 0
      ? (hotelReviews.reduce((sum, r) => sum + r.rating, 0) / hotelReviews.length).toFixed(1)
      : 0;

    res.json({
      reviews: hotelReviews,
      total: hotelReviews.length,
      avgRating: parseFloat(avgRating)
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/:hotelId', authMiddleware, (req, res) => {
  try {
    const { rating, title, comment } = req.body;

    if (!rating || !title || !comment) {
      return res.status(400).json({ error: 'Rating, title, and comment are required' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    const { hotels } = require('../data/mockData');
    const hotel = hotels.find(h => h.id === req.params.hotelId);
    if (!hotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }

    const newReview = {
      id: `rev${Date.now()}`,
      hotelId: req.params.hotelId,
      userId: req.user.id,
      userName: req.user.name,
      userAvatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(req.user.name)}&background=3b82f6&color=fff&size=100`,
      rating: parseInt(rating),
      title,
      comment,
      date: new Date().toISOString().split('T')[0],
      hotelName: hotel.name
    };

    reviews.push(newReview);

    hotel.reviewCount += 1;
    const hotelReviews = reviews.filter(r => r.hotelId === req.params.hotelId);
    hotel.rating = parseFloat((hotelReviews.reduce((sum, r) => sum + r.rating, 0) / hotelReviews.length).toFixed(1));

    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
