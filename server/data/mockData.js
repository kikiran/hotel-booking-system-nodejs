const hotels = [
  {
    id: "h1",
    name: "The Grand Palace Hotel",
    slug: "the-grand-palace-hotel",
    location: "New York City, USA",
    address: "350 Fifth Avenue, Manhattan, NY 10118",
    description: "Experience unparalleled luxury in the heart of Manhattan. The Grand Palace Hotel offers world-class amenities, breathtaking city views, and impeccable service that has earned us recognition as one of the top hotels in the world. Our elegantly designed rooms and suites feature modern comforts while preserving timeless elegance.",
    shortDescription: "Luxury hotel in the heart of Manhattan with stunning city views and world-class amenities.",
    starRating: 5,
    rating: 4.8,
    reviewCount: 1247,
    priceRange: "$$$",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200&h=800&fit=crop"
    ],
    amenities: ["Free WiFi", "Pool", "Spa", "Restaurant", "Bar", "Gym", "Room Service", "Concierge", "Valet Parking", "Business Center", "Airport Shuttle", "Pet Friendly"],
    coordinates: { lat: 40.7484, lng: -73.9857 },
    featured: true,
    category: "luxury",
    rooms: [
      {
        id: "r1",
        name: "Deluxe King Room",
        type: "deluxe",
        description: "Spacious room with a king-size bed, premium linens, and panoramic city views.",
        price: 299,
        maxGuests: 2,
        bedType: "King",
        size: "45 sqm",
        amenities: ["City View", "Mini Bar", "Smart TV", "Nespresso Machine", "Rain Shower"],
        images: ["https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop"],
        available: true,
        totalRooms: 20,
        availableRooms: 8
      },
      {
        id: "r2",
        name: "Executive Suite",
        type: "suite",
        description: "Elegant suite with separate living area, work desk, and premium amenities.",
        price: 499,
        maxGuests: 3,
        bedType: "King",
        size: "70 sqm",
        amenities: ["City View", "Living Room", "Mini Bar", "Smart TV", "Nespresso Machine", "Jacuzzi Tub", "Butler Service"],
        images: ["https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop"],
        available: true,
        totalRooms: 10,
        availableRooms: 4
      },
      {
        id: "r3",
        name: "Presidential Suite",
        type: "presidential",
        description: "Our finest accommodation featuring a grand living space, private terrace, and exclusive butler service.",
        price: 999,
        maxGuests: 4,
        bedType: "King",
        size: "120 sqm",
        amenities: ["Panoramic View", "Private Terrace", "Full Bar", "Smart TV", "Private Pool", "Butler Service", "Private Check-in"],
        images: ["https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop"],
        available: true,
        totalRooms: 3,
        availableRooms: 1
      }
    ]
  },
  {
    id: "h2",
    name: "Ocean Breeze Resort",
    slug: "ocean-breeze-resort",
    location: "Miami Beach, USA",
    address: "1200 Collins Avenue, Miami Beach, FL 33139",
    description: "Escape to paradise at Ocean Breeze Resort, where pristine beaches meet luxurious comfort. Our beachfront property offers direct ocean access, multiple pools, and a world-renowned spa. Each room is designed to maximize stunning ocean views while providing the ultimate in tropical relaxation.",
    shortDescription: "Beachfront luxury resort with direct ocean access and world-class spa facilities.",
    starRating: 5,
    rating: 4.7,
    reviewCount: 892,
    priceRange: "$$$",
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&h=800&fit=crop"
    ],
    amenities: ["Free WiFi", "Beach Access", "Pool", "Spa", "Restaurant", "Bar", "Water Sports", "Kids Club", "Fitness Center", "Golf Course"],
    coordinates: { lat: 25.7814, lng: -80.1300 },
    featured: true,
    category: "resort",
    rooms: [
      {
        id: "r4",
        name: "Ocean View Room",
        type: "standard",
        description: "Beautiful room with stunning ocean views and a private balcony.",
        price: 249,
        maxGuests: 2,
        bedType: "Queen",
        size: "40 sqm",
        amenities: ["Ocean View", "Balcony", "Mini Bar", "Smart TV", "Rain Shower"],
        images: ["https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop"],
        available: true,
        totalRooms: 30,
        availableRooms: 15
      },
      {
        id: "r5",
        name: "Beachfront Villa",
        type: "villa",
        description: "Exclusive villa steps from the beach with private outdoor space.",
        price: 599,
        maxGuests: 4,
        bedType: "King",
        size: "90 sqm",
        amenities: ["Beach Access", "Private Garden", "Full Kitchen", "Smart TV", "Outdoor Shower", "Hammock"],
        images: ["https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&h=600&fit=crop"],
        available: true,
        totalRooms: 8,
        availableRooms: 3
      },
      {
        id: "r6",
        name: "Penthouse Suite",
        type: "penthouse",
        description: "Top-floor penthouse with 360-degree ocean views and a rooftop terrace.",
        price: 899,
        maxGuests: 6,
        bedType: "King",
        size: "150 sqm",
        amenities: ["360° Ocean View", "Rooftop Terrace", "Private Pool", "Full Bar", "Smart TV", "Butler Service"],
        images: ["https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&h=600&fit=crop"],
        available: true,
        totalRooms: 2,
        availableRooms: 1
      }
    ]
  },
  {
    id: "h3",
    name: "Mountain Lodge Retreat",
    slug: "mountain-lodge-retreat",
    location: "Aspen, Colorado, USA",
    address: "315 East Dean Street, Aspen, CO 81611",
    description: "Nestled in the breathtaking Rocky Mountains, our lodge offers an authentic mountain retreat experience. Perfect for both winter skiing and summer hiking, the Mountain Lodge combines rustic charm with modern luxury. Enjoy cozy fireplaces, stunning mountain views, and world-class dining.",
    shortDescription: "Rustic luxury mountain lodge with ski-in access and stunning Rocky Mountain views.",
    starRating: 4,
    rating: 4.6,
    reviewCount: 634,
    priceRange: "$$",
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1200&h=800&fit=crop"
    ],
    amenities: ["Free WiFi", "Ski-in Access", "Fireplace", "Restaurant", "Hot Tub", "Sauna", "Equipment Rental", "Guided Tours", "Wine Cellar", "Library"],
    coordinates: { lat: 39.1869, lng: -106.8178 },
    featured: true,
    category: "boutique",
    rooms: [
      {
        id: "r7",
        name: "Cozy Mountain Room",
        type: "standard",
        description: "Warm and inviting room with a fireplace and mountain views.",
        price: 189,
        maxGuests: 2,
        bedType: "Queen",
        size: "35 sqm",
        amenities: ["Mountain View", "Fireplace", "Mini Bar", "Smart TV", "Heated Floors"],
        images: ["https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop"],
        available: true,
        totalRooms: 25,
        availableRooms: 12
      },
      {
        id: "r8",
        name: "Alpine Suite",
        type: "suite",
        description: "Spacious suite with a separate living area and private balcony.",
        price: 349,
        maxGuests: 3,
        bedType: "King",
        size: "60 sqm",
        amenities: ["Mountain View", "Balcony", "Fireplace", "Living Room", "Mini Bar", "Smart TV", "Heated Floors"],
        images: ["https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop"],
        available: true,
        totalRooms: 10,
        availableRooms: 5
      }
    ]
  },
  {
    id: "h4",
    name: "Sakura Garden Hotel",
    slug: "sakura-garden-hotel",
    location: "Tokyo, Japan",
    address: "1-1 Marunouchi, Chiyoda City, Tokyo 100-0005",
    description: "Experience the perfect blend of traditional Japanese hospitality and modern luxury. Located near the Imperial Palace, our hotel features serene garden views, authentic onsen spa, and exquisite Japanese cuisine. Each room reflects the beauty of Japanese design with tatami elements and zen aesthetics.",
    shortDescription: "Elegant Japanese hotel near the Imperial Palace with traditional onsen spa and zen gardens.",
    starRating: 5,
    rating: 4.9,
    reviewCount: 1089,
    priceRange: "$$$",
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1455587734955-081b22074882?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=1200&h=800&fit=crop"
    ],
    amenities: ["Free WiFi", "Onsen Spa", "Zen Garden", "Restaurant", "Tea Ceremony", "Sushi Bar", "Fitness Center", "Business Center", "Concierge", "Cultural Activities"],
    coordinates: { lat: 35.6852, lng: 139.7521 },
    featured: true,
    category: "luxury",
    rooms: [
      {
        id: "r9",
        name: "Japanese Deluxe Room",
        type: "deluxe",
        description: "Elegant room blending traditional Japanese aesthetics with modern comfort.",
        price: 359,
        maxGuests: 2,
        bedType: "King",
        size: "50 sqm",
        amenities: ["Garden View", "Tatami Area", "Smart TV", "Nespresso Machine", "Deep Soaking Tub"],
        images: ["https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop"],
        available: true,
        totalRooms: 15,
        availableRooms: 7
      },
      {
        id: "r10",
        name: "Imperial Suite",
        type: "suite",
        description: "Luxurious suite with private onsen and panoramic garden views.",
        price: 799,
        maxGuests: 3,
        bedType: "King",
        size: "100 sqm",
        amenities: ["Garden View", "Private Onsen", "Living Room", "Smart TV", "Full Bar", "Butler Service"],
        images: ["https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop"],
        available: true,
        totalRooms: 5,
        availableRooms: 2
      }
    ]
  },
  {
    id: "h5",
    name: "Coastal Haven Inn",
    slug: "coastal-haven-inn",
    location: "Santorini, Greece",
    address: "Oia, Santorini 847 02, Greece",
    description: "Perched on the iconic cliffs of Santorini, Coastal Haven Inn offers breathtaking caldera views, whitewashed architecture, and legendary sunsets. Our boutique property combines Cycladic charm with contemporary luxury, featuring infinity pools, cave suites, and authentic Greek dining.",
    shortDescription: "Boutique cliffside hotel in Santorini with infinity pool and caldera sunset views.",
    starRating: 4,
    rating: 4.7,
    reviewCount: 756,
    priceRange: "$$",
    images: [
      "https://images.unsplash.com/photo-1570213489059-0aac6626cade?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1580502304784-8985b7eb7260?w=1200&h=800&fit=crop"
    ],
    amenities: ["Free WiFi", "Infinity Pool", "Spa", "Restaurant", "Sunset Terrace", "Wine Bar", "Yoga Classes", "Excursion Desk", "Airport Transfer", "Concierge"],
    coordinates: { lat: 36.4618, lng: 25.3753 },
    featured: false,
    category: "boutique",
    rooms: [
      {
        id: "r11",
        name: "Caldera View Room",
        type: "standard",
        description: "Charming room with stunning caldera views and a private balcony.",
        price: 219,
        maxGuests: 2,
        bedType: "Queen",
        size: "38 sqm",
        amenities: ["Caldera View", "Balcony", "Mini Bar", "Smart TV", "Air Conditioning"],
        images: ["https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop"],
        available: true,
        totalRooms: 18,
        availableRooms: 9
      },
      {
        id: "r12",
        name: "Cave Suite",
        type: "suite",
        description: "Unique cave suite carved into the cliff with a private plunge pool.",
        price: 449,
        maxGuests: 2,
        bedType: "King",
        size: "55 sqm",
        amenities: ["Caldera View", "Private Plunge Pool", "Living Area", "Smart TV", "Full Bar", "Outdoor Shower"],
        images: ["https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&h=600&fit=crop"],
        available: true,
        totalRooms: 6,
        availableRooms: 3
      }
    ]
  },
  {
    id: "h6",
    name: "Urban Boutique Hotel",
    slug: "urban-boutique-hotel",
    location: "London, UK",
    address: "47 Park Lane, Mayfair, London W1K 1DG",
    description: "A stylish boutique hotel in the prestigious Mayfair district, blending contemporary design with classic British elegance. Steps from Hyde Park and Oxford Street, Urban Boutique Hotel offers sophisticated rooms, a Michelin-starred restaurant, and an exclusive rooftop bar with panoramic London skyline views.",
    shortDescription: "Stylish boutique hotel in Mayfair with Michelin dining and rooftop skyline views.",
    starRating: 4,
    rating: 4.5,
    reviewCount: 523,
    priceRange: "$$",
    images: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1200&h=800&fit=crop"
    ],
    amenities: ["Free WiFi", "Rooftop Bar", "Restaurant", "Spa", "Gym", "Concierge", "Business Center", "Airport Shuttle", "Laundry Service", "Meeting Rooms"],
    coordinates: { lat: 51.5074, lng: -0.1278 },
    featured: false,
    category: "boutique",
    rooms: [
      {
        id: "r13",
        name: "Classic London Room",
        type: "standard",
        description: "Elegant room with contemporary British design and city views.",
        price: 229,
        maxGuests: 2,
        bedType: "Queen",
        size: "35 sqm",
        amenities: ["City View", "Mini Bar", "Smart TV", "Rain Shower", "Work Desk"],
        images: ["https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop"],
        available: true,
        totalRooms: 22,
        availableRooms: 10
      },
      {
        id: "r14",
        name: "Mayfair Suite",
        type: "suite",
        description: "Luxurious suite with separate living space and views over Hyde Park.",
        price: 449,
        maxGuests: 3,
        bedType: "King",
        size: "65 sqm",
        amenities: ["Park View", "Living Room", "Mini Bar", "Smart TV", "Butler Service", "Freestanding Bath"],
        images: ["https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop"],
        available: true,
        totalRooms: 8,
        availableRooms: 4
      }
    ]
  },
  {
    id: "h7",
    name: "Desert Oasis Resort",
    slug: "desert-oasis-resort",
    location: "Dubai, UAE",
    address: "Al Nakheel, Dubai Marina, Dubai, UAE",
    description: "An ultra-luxury desert-inspired resort in the heart of Dubai Marina. Featuring an iconic tower design, private beach, and the world's tallest infinity pool. Every detail is crafted for the discerning traveler seeking the extraordinary.",
    shortDescription: "Ultra-luxury marina resort with private beach and world-class infinity pool.",
    starRating: 5,
    rating: 4.8,
    reviewCount: 1456,
    priceRange: "$$$",
    images: [
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1200&h=800&fit=crop"
    ],
    amenities: ["Free WiFi", "Private Beach", "Infinity Pool", "Spa", "3 Restaurants", "Helipad", "Yacht Charter", "Water Sports", "Shopping Mall", "Kids Club"],
    coordinates: { lat: 25.0805, lng: 55.1403 },
    featured: true,
    category: "luxury",
    rooms: [
      {
        id: "r15",
        name: "Marina View Room",
        type: "deluxe",
        description: "Stunning room with floor-to-ceiling windows overlooking the marina.",
        price: 379,
        maxGuests: 2,
        bedType: "King",
        size: "55 sqm",
        amenities: ["Marina View", "Floor-to-Ceiling Windows", "Mini Bar", "Smart TV", "Rain Shower"],
        images: ["https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop"],
        available: true,
        totalRooms: 40,
        availableRooms: 22
      },
      {
        id: "r16",
        name: "Royal Penthouse",
        type: "penthouse",
        description: "The ultimate in luxury with a private pool, butler, and panoramic views.",
        price: 1299,
        maxGuests: 6,
        bedType: "King",
        size: "200 sqm",
        amenities: ["360° View", "Private Pool", "Full Kitchen", "Butler Service", "Helipad Access", "Private Cinema"],
        images: ["https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&h=600&fit=crop"],
        available: true,
        totalRooms: 2,
        availableRooms: 1
      }
    ]
  },
  {
    id: "h8",
    name: "Historic Charm Inn",
    slug: "historic-charm-inn",
    location: "Rome, Italy",
    address: "Via del Corso 123, 00186 Roma RM, Italy",
    description: "Set in a beautifully restored 16th-century palazzo, Historic Charm Inn offers an authentic Roman experience. Located between the Trevi Fountain and the Spanish Steps, our intimate property features hand-painted frescoes, marble bathrooms, and a hidden garden courtyard.",
    shortDescription: "Intimate 16th-century palazzo hotel between Trevi Fountain and Spanish Steps.",
    starRating: 4,
    rating: 4.6,
    reviewCount: 478,
    priceRange: "$$",
    images: [
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&h=800&fit=crop"
    ],
    amenities: ["Free WiFi", "Garden Courtyard", "Restaurant", "Bar", "Terrace", "Concierge", "Tour Desk", "Library", "Wine Cellar", "Cooking Classes"],
    coordinates: { lat: 41.9009, lng: 12.4833 },
    featured: false,
    category: "boutique",
    rooms: [
      {
        id: "r17",
        name: "Fresco Room",
        type: "standard",
        description: "Characterful room with original frescoes and antique furnishings.",
        price: 199,
        maxGuests: 2,
        bedType: "Queen",
        size: "32 sqm",
        amenities: ["Garden View", "Original Frescoes", "Smart TV", "Espresso Machine", "Marble Bath"],
        images: ["https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop"],
        available: true,
        totalRooms: 12,
        availableRooms: 6
      },
      {
        id: "r18",
        name: "Palazzo Suite",
        type: "suite",
        description: "Grand suite with private terrace overlooking the garden courtyard.",
        price: 399,
        maxGuests: 3,
        bedType: "King",
        size: "75 sqm",
        amenities: ["Garden View", "Private Terrace", "Living Room", "Smart TV", "Full Bar", "Antique Furnishings"],
        images: ["https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop"],
        available: true,
        totalRooms: 5,
        availableRooms: 2
      }
    ]
  }
];

const users = [
  {
    id: "u1",
    name: "Admin User",
    email: "admin@luxstay.com",
    password: "admin123",
    role: "admin",
    phone: "+1-555-0100",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    joinedDate: "2023-01-15"
  },
  {
    id: "u2",
    name: "John Smith",
    email: "john@example.com",
    password: "password123",
    role: "user",
    phone: "+1-555-0101",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    joinedDate: "2023-06-20"
  },
  {
    id: "u3",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    password: "password123",
    role: "user",
    phone: "+1-555-0102",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    joinedDate: "2023-08-10"
  }
];

const bookings = [
  {
    id: "b1",
    userId: "u2",
    hotelId: "h1",
    roomId: "r1",
    hotelName: "The Grand Palace Hotel",
    roomName: "Deluxe King Room",
    checkIn: "2026-09-15",
    checkOut: "2026-09-18",
    guests: 2,
    totalPrice: 897,
    status: "confirmed",
    createdAt: "2026-08-20",
    guestName: "John Smith",
    guestEmail: "john@example.com",
    guestPhone: "+1-555-0101",
    paymentMethod: "Credit Card",
    specialRequests: "Late check-in requested"
  },
  {
    id: "b2",
    userId: "u2",
    hotelId: "h2",
    roomId: "r4",
    hotelName: "Ocean Breeze Resort",
    roomName: "Ocean View Room",
    checkIn: "2026-10-01",
    checkOut: "2026-10-05",
    guests: 2,
    totalPrice: 996,
    status: "confirmed",
    createdAt: "2026-08-25",
    guestName: "John Smith",
    guestEmail: "john@example.com",
    guestPhone: "+1-555-0101",
    paymentMethod: "Credit Card",
    specialRequests: ""
  },
  {
    id: "b3",
    userId: "u3",
    hotelId: "h3",
    roomId: "r7",
    hotelName: "Mountain Lodge Retreat",
    roomName: "Cozy Mountain Room",
    checkIn: "2026-09-20",
    checkOut: "2026-09-23",
    guests: 2,
    totalPrice: 567,
    status: "pending",
    createdAt: "2026-08-28",
    guestName: "Sarah Johnson",
    guestEmail: "sarah@example.com",
    guestPhone: "+1-555-0102",
    paymentMethod: "PayPal",
    specialRequests: "Near fireplace preferred"
  },
  {
    id: "b4",
    userId: "u3",
    hotelId: "h4",
    roomId: "r9",
    hotelName: "Sakura Garden Hotel",
    roomName: "Japanese Deluxe Room",
    checkIn: "2026-07-10",
    checkOut: "2026-07-14",
    guests: 1,
    totalPrice: 1436,
    status: "completed",
    createdAt: "2026-06-15",
    guestName: "Sarah Johnson",
    guestEmail: "sarah@example.com",
    guestPhone: "+1-555-0102",
    paymentMethod: "Credit Card",
    specialRequests: ""
  }
];

const reviews = [
  {
    id: "rev1",
    hotelId: "h1",
    userId: "u2",
    userName: "John Smith",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rating: 5,
    title: "Absolutely stunning experience!",
    comment: "The Grand Palace Hotel exceeded all my expectations. The room was beautifully appointed with incredible city views. The staff went above and beyond to make our stay memorable. The spa experience was world-class. Highly recommend!",
    date: "2026-07-25",
    hotelName: "The Grand Palace Hotel"
  },
  {
    id: "rev2",
    hotelId: "h1",
    userId: "u3",
    userName: "Sarah Johnson",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 4,
    title: "Great location and service",
    comment: "Perfect location in Manhattan. The room was spacious and clean. The restaurant food was excellent. Only minor issue was the checkout process took a bit long. Would definitely stay again.",
    date: "2026-07-15",
    hotelName: "The Grand Palace Hotel"
  },
  {
    id: "rev3",
    hotelId: "h2",
    userId: "u2",
    userName: "John Smith",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rating: 5,
    title: "Paradise found!",
    comment: "Ocean Breeze Resort is truly a paradise. Waking up to the sound of waves and stepping directly onto the beach was magical. The infinity pool is breathtaking. The water sports activities were so much fun!",
    date: "2026-06-30",
    hotelName: "Ocean Breeze Resort"
  },
  {
    id: "rev4",
    hotelId: "h3",
    userId: "u3",
    userName: "Sarah Johnson",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 5,
    title: "Cozy mountain escape",
    comment: "The Mountain Lodge Retreat was the perfect winter getaway. Sitting by the fireplace with a glass of wine after a day of skiing was heavenly. The food was incredible and the staff were so warm and welcoming.",
    date: "2026-06-20",
    hotelName: "Mountain Lodge Retreat"
  },
  {
    id: "rev5",
    hotelId: "h4",
    userId: "u3",
    userName: "Sarah Johnson",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 5,
    title: "Impeccable Japanese hospitality",
    comment: "The Sakura Garden Hotel is a masterpiece of Japanese design and hospitality. The onsen spa was incredibly relaxing. The tea ceremony experience was a highlight of my trip. The attention to detail in every aspect was remarkable.",
    date: "2026-07-14",
    hotelName: "Sakura Garden Hotel"
  },
  {
    id: "rev6",
    hotelId: "h5",
    userId: "u2",
    userName: "John Smith",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rating: 4,
    title: "Sunset views are unreal",
    comment: "The caldera views at sunset are truly unforgettable. The cave suite was unique and romantic. Great wine bar and the local food was delicious. Would love to visit again!",
    date: "2026-05-18",
    hotelName: "Coastal Haven Inn"
  }
];

const testimonials = [
  {
    id: "t1",
    name: "Michael Chen",
    role: "Business Traveler",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    text: "LuxStay made booking my business trip effortless. The hotel selection is amazing, and the booking process was seamless. I've recommended it to all my colleagues.",
    rating: 5
  },
  {
    id: "t2",
    name: "Emily Rodriguez",
    role: "Family Vacationer",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    text: "We used LuxStay for our family vacation to Miami. Found the perfect resort with kids club and beach access. The filters made it easy to find exactly what we needed!",
    rating: 5
  },
  {
    id: "t3",
    name: "David Kim",
    role: "Honeymoon Trip",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    text: "Booked our honeymoon through LuxStay and it was perfect. The Santorini resort they recommended was absolutely magical. The booking confirmation and details were always clear.",
    rating: 5
  }
];

const destinations = [
  { name: "New York", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&h=400&fit=crop", hotelCount: 1 },
  { name: "Miami", image: "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=600&h=400&fit=crop", hotelCount: 1 },
  { name: "Tokyo", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=400&fit=crop", hotelCount: 1 },
  { name: "Santorini", image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&h=400&fit=crop", hotelCount: 1 },
  { name: "London", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&h=400&fit=crop", hotelCount: 1 },
  { name: "Dubai", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop", hotelCount: 1 },
  { name: "Rome", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&h=400&fit=crop", hotelCount: 1 },
  { name: "Aspen", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop", hotelCount: 1 }
];

module.exports = { hotels, users, bookings, reviews, testimonials, destinations };
