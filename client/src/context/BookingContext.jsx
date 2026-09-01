import { createContext, useContext, useState } from 'react';

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [bookingData, setBookingData] = useState({
    hotel: null,
    room: null,
    checkIn: '',
    checkOut: '',
    guests: 1,
    totalPrice: 0,
    nights: 0
  });
  const [currentBooking, setCurrentBooking] = useState(null);

  const initBooking = (hotel, room, checkIn, checkOut, guests) => {
    const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    setBookingData({
      hotel,
      room,
      checkIn,
      checkOut,
      guests,
      totalPrice: room.price * nights,
      nights
    });
  };

  const clearBooking = () => {
    setBookingData({
      hotel: null,
      room: null,
      checkIn: '',
      checkOut: '',
      guests: 1,
      totalPrice: 0,
      nights: 0
    });
  };

  return (
    <BookingContext.Provider value={{ bookingData, initBooking, clearBooking, currentBooking, setCurrentBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
