import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { formatDate, formatPrice } from '../utils/helpers';
import toast from 'react-hot-toast';
import { FiCheckCircle, FiDownload, FiPrinter, FiCalendar, FiClock, FiUsers, FiMapPin, FiArrowRight } from 'react-icons/fi';

export default function BookingConfirmation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setCurrentBooking } = useBooking();
  const { token } = useAuth();
  const [booking, setBooking] = useState(null);
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooking();
  }, [id]);

  const fetchBooking = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/bookings', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      const found = data.bookings.find(b => b.id === id);
      if (found) {
        setBooking(found);
        const hotelRes = await fetch(`/api/hotels/${found.hotelId}`);
        const hotelData = await hotelRes.json();
        setHotel(hotelData);
      } else {
        toast.error('Booking not found');
        navigate('/my-bookings');
      }
    } catch (err) {
      console.error('Failed to fetch booking:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!booking) return null;

  return (
    <div className="pt-20 lg:pt-24 bg-secondary-50 min-h-screen">
      <div className="section-container py-8 lg:py-12 max-w-4xl">
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <FiCheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-display font-bold text-secondary-900 mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-secondary-500">
            A confirmation email has been sent to {booking.guestEmail}
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-lg">
            <span className="text-sm text-secondary-600">Booking Reference:</span>
            <span className="font-mono font-semibold text-primary-700">LUX-{booking.id.toUpperCase()}</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-secondary-100 overflow-hidden mb-6">
          <div className="bg-primary-600 text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-display font-semibold">{booking.hotelName}</h2>
              {hotel && <p className="text-white/70 text-sm flex items-center gap-1 mt-1"><FiMapPin className="w-3 h-3" /> {hotel.location}</p>}
            </div>
            <span className={`inline-block px-3 py-1.5 rounded-full text-sm font-medium bg-white/20 capitalize`}>
              {booking.status}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
            <div>
              <div className="flex items-center gap-2 text-secondary-400 mb-1">
                <FiCalendar className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wide">Check-in</span>
              </div>
              <div className="font-semibold text-secondary-900">{formatDate(booking.checkIn)}</div>
              <div className="text-sm text-secondary-500">From 2:00 PM</div>
            </div>
            <div>
              <div className="flex items-center gap-2 text-secondary-400 mb-1">
                <FiCalendar className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wide">Check-out</span>
              </div>
              <div className="font-semibold text-secondary-900">{formatDate(booking.checkOut)}</div>
              <div className="text-sm text-secondary-500">Until 11:00 AM</div>
            </div>
            <div>
              <div className="flex items-center gap-2 text-secondary-400 mb-1">
                <FiUsers className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wide">Guests</span>
              </div>
              <div className="font-semibold text-secondary-900">{booking.guests} guest{booking.guests > 1 ? 's' : ''}</div>
              <div className="text-sm text-secondary-500">{booking.roomName}</div>
            </div>
            <div>
              <div className="flex items-center gap-2 text-secondary-400 mb-1">
                <FiClock className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wide">Payment</span>
              </div>
              <div className="font-semibold text-secondary-900">{booking.paymentMethod}</div>
              <div className="text-sm text-secondary-500">Paid in full</div>
            </div>
          </div>

          <div className="border-t border-secondary-100 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-secondary-50">
            <div>
              <div className="text-sm text-secondary-500 mb-1">Total Amount Paid</div>
              <div className="text-2xl font-bold text-primary-600">{formatPrice(booking.totalPrice)}</div>
            </div>
            <div className="flex gap-3">
              <button onClick={handlePrint} className="btn-secondary text-sm flex items-center gap-2">
                <FiPrinter className="w-4 h-4" />
                Print Receipt
              </button>
              <button onClick={handlePrint} className="btn-outline text-sm flex items-center gap-2">
                <FiDownload className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          </div>
        </div>

        {booking.specialRequests && (
          <div className="bg-white rounded-xl border border-secondary-100 p-6 mb-6">
            <h3 className="font-semibold text-secondary-900 mb-2">Special Requests</h3>
            <p className="text-secondary-600 text-sm">{booking.specialRequests}</p>
          </div>
        )}

        <div className="bg-white rounded-xl border border-secondary-100 p-6 mb-6">
          <h3 className="font-semibold text-secondary-900 mb-2">Guest Details</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-secondary-500 block mb-1">Name</span>
              <span className="text-secondary-900 font-medium">{booking.guestName}</span>
            </div>
            <div>
              <span className="text-secondary-500 block mb-1">Email</span>
              <span className="text-secondary-900 font-medium">{booking.guestEmail}</span>
            </div>
            <div>
              <span className="text-secondary-500 block mb-1">Phone</span>
              <span className="text-secondary-900 font-medium">{booking.guestPhone || 'Not provided'}</span>
            </div>
            <div>
              <span className="text-secondary-500 block mb-1">Booking Reference</span>
              <span className="text-secondary-900 font-medium font-mono">LUX-{booking.id.toUpperCase()}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/my-bookings" className="btn-primary flex items-center justify-center gap-2">
            View My Bookings
            <FiArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/hotels" className="btn-outline">
            Browse More Hotels
          </Link>
        </div>
      </div>
    </div>
  );
}
