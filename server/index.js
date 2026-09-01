const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const hotelRoutes = require('./routes/hotels');
const roomRoutes = require('./routes/rooms');
const bookingRoutes = require('./routes/bookings');
const reviewRoutes = require('./routes/reviews');

app.use('/api/auth', authRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);

app.get('/api/destinations', (req, res) => {
  const { destinations } = require('./data/mockData');
  res.json(destinations);
});

app.get('/api/testimonials', (req, res) => {
  const { testimonials } = require('./data/mockData');
  res.json(testimonials);
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve the built React frontend (if present) and support SPA routing.
// When running inside the Docker image the built client lives at ./client/dist.
const staticDir = path.join(__dirname, '..', 'client', 'dist');

if (fs.existsSync(staticDir)) {
  app.use(express.static(staticDir));

  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/')) return next();
    res.sendFile(path.join(staticDir, 'index.html'));
  });

  console.log(`Serving static frontend from ${staticDir}`);
} else if (!process.env.CLIENT_DIST) {
  console.log('No built frontend found - API-only mode (frontend served via Vite dev server).');
}

app.listen(PORT, () => {
  console.log(`LuxStay API server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
