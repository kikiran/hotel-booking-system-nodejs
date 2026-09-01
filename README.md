# LuxStay - Hotel Booking System

A fully responsive, end-to-end Hotel Booking System built with **React.js**, **Node.js**, and **Tailwind CSS**.

No database required — all data is served from in-memory mock data on the backend.

## Features

### 🏨 Complete Booking Flow
- Browse & search hotels with filters (location, price, rating, amenities)
- Hotel detail pages with image galleries, room selection, amenities, and guest reviews
- Live price calculator and room availability check
- Full checkout flow with guest info + payment method selection
- Booking confirmation with printable receipt
- My Bookings dashboard with status tracking and cancellation

### 👤 Authentication
- Register and login with JWT-style tokens (in-memory)
- Protected routes and role-based access (user / admin)
- Profile management

### 📊 Admin Dashboard
- Booking statistics, revenue, occupancy charts
- Booking status breakdown and recent bookings table

### 🎨 Modern UI/UX
- Fully responsive — desktop, tablet, and mobile
- Clean professional design with Tailwind CSS
- Hero search, featured hotels, destinations, testimonials
- Toast notifications, animations, loading states

## Tech Stack

- **Frontend**: React 18, React Router, Vite, Tailwind CSS, React Icons, React Hot Toast, date-fns
- **Backend**: Node.js, Express, CORS

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### 1. Install dependencies

```bash
# Install root, server, and client deps
npm run install:all
```

Or individually:

```bash
npm install                     # root (concurrently)
cd server && npm install        # backend
cd ../client && npm install     # frontend
```

### 2. Run the application (both server + client)

```bash
npm run dev
```

This starts:
- **Backend API** → http://localhost:5000
- **Frontend** → http://localhost:5173

You can also run them separately:

```bash
npm run server   # Express API on :5000
npm run client   # Vite dev server on :5173
```

### 3. Open the app
Navigate to **http://localhost:5173**

## Demo Accounts

| Role  | Email              | Password     |
|-------|--------------------|--------------|
| User  | john@example.com   | password123  |
| Admin | admin@luxstay.com  | admin123     |

> The login page also has one-click demo account buttons.

## API Endpoints

### Auth
- `POST /api/auth/register` — register new user
- `POST /api/auth/login` — login (returns token)
- `GET /api/auth/me` — current user (auth)
- `PUT /api/auth/profile` — update profile (auth)

### Hotels
- `GET /api/hotels` — search/filter/sort/paginate hotels
- `GET /api/hotels/featured` — featured hotels
- `GET /api/hotels/:slug` — hotel detail with rooms

### Rooms
- `GET /api/rooms/:hotelId/:roomId/availability` — availability + price calculator

### Bookings
- `GET /api/bookings` — list user bookings (auth)
- `POST /api/bookings` — create booking (auth)
- `PUT /api/bookings/:id/cancel` — cancel booking (auth)
- `GET /api/bookings/stats` — admin stats (admin)

### Reviews
- `GET /api/reviews/:hotelId` — hotel reviews
- `POST /api/reviews/:hotelId` — add review (auth)

### Misc
- `GET /api/destinations` — popular destinations
- `GET /api/testimonials` — testimonials
- `GET /api/health` — health check

## Project Structure

```
hotel-booking-system-nodejs/
├── package.json              # root scripts (concurrently)
├── Dockerfile                # multi-stage build -> single production image
├── docker-compose.yml        # one-command container run
├── .dockerignore
├── server/
│   ├── index.js              # Express app entry (also serves built client)
│   ├── data/
│   │   └── mockData.js       # hotels, users, bookings, reviews data
│   ├── middleware/
│   │   └── auth.js           # JWT-style auth middleware
│   └── routes/
│       ├── auth.js
│       ├── hotels.js
│       ├── rooms.js
│       ├── bookings.js
│       └── reviews.js
└── client/
    ├── index.html
    ├── vite.config.js        # proxy /api -> :5000
    ├── src/
    │   ├── App.jsx           # router + provider setup
    │   ├── main.jsx
    │   ├── index.css         # Tailwind + custom styles
    │   ├── context/
    │   │   ├── AuthContext.jsx
    │   │   └── BookingContext.jsx
    │   ├── components/
    │   │   ├── Header.jsx
    │   │   ├── Footer.jsx
    │   │   ├── HeroSearch.jsx
    │   │   ├── HotelCard.jsx
    │   │   ├── RoomCard.jsx
    │   │   ├── StarRating.jsx
    │   │   ├── ImageGallery.jsx
    │   │   ├── ReviewCard.jsx
    │   │   ├── TestimonialCard.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Hotels.jsx
    │   │   ├── HotelDetail.jsx
    │   │   ├── Checkout.jsx
    │   │   ├── BookingConfirmation.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Profile.jsx
    │   │   ├── MyBookings.jsx
    │   │   ├── AdminDashboard.jsx
    │   │   └── Contact.jsx
    │   └── utils/
    │       └── helpers.js
```

## Notes

- Data is stored in memory and resets when the server restarts.
- Hotel images are loaded from Unsplash.
- This is a UI/demo-focused application; no production database is used.

## Docker

The included `Dockerfile` builds a single production image that serves both the compiled React frontend and the Node.js API on one port (5000). It uses a multi-stage build:

1. **client-build** — builds the React app with Vite into static files
2. **server-deps** — installs only production backend dependencies
3. **runtime** — copies the built frontend + backend and runs the Express server, which serves the SPA (with deep-link routing) and `/api/*` together

### Prerequisites
- [Docker](https://www.docker.com/get-started) + Docker Compose

### Build & run with Docker Compose

```bash
docker compose up --build
```

Then open **http://localhost:5000**

### Or build/run manually

```bash
# Build the image
docker build -t luxstay-hotel-booking .

# Run the container
docker run -d --name luxstay-app -p 5000:5000 luxstay-hotel-booking
```

### Useful commands

```bash
docker compose up -d --build   # build + run in background
docker compose logs -f app     # follow app logs
docker compose down            # stop and remove containers
docker compose build           # rebuild image without starting
```
