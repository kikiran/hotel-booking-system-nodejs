import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { formatDate, formatPrice, getStatusColor } from '../utils/helpers';
import toast from 'react-hot-toast';
import { FiCalendar, FiMapPin, FiUsers, FiChevronDown, FiClock } from 'react-icons/fi';

const STATUS_TABS = [
  { value: '', label: 'All Bookings' },
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

export default function MyBookings() {
  const { token } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('');
  const [hotels, setHotels] = useState({});

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/bookings', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setBookings(data.bookings || []);

      const hotelPromises = data.bookings.map(b =>
        fetch(`/api/hotels/${b.hotelId}`).then(r => r.json())
      );
      const hotelData = await Promise.all(hotelPromises);
      const hotelMap = {};
      hotelData.forEach(h => { hotelMap[h.id] = h; });
      setHotels(hotelMap);
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;

    try {
      const res = await fetch(`/api/bookings/${bookingId}/cancel`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        toast.success('Booking cancelled successfully');
        fetchBookings();
      } else {
        toast.error(data.error || 'Failed to cancel booking');
      }
    } catch {
      toast.error('Failed to cancel booking');
    }
  };

  const filterBookings = () => {
    const now = new Date();
    let filtered = [...bookings];

    if (activeTab === 'upcoming') {
      filtered = filtered.filter(b => b.status === 'confirmed' && new Date(b.checkIn) > now);
    } else if (activeTab) {
      filtered = filtered.filter(b => b.status === activeTab);
    }

    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return filtered;
  };

  const filteredBookings = filterBookings();

  return (
    <div className="pt-20 lg:pt-24 bg-secondary-50 min-h-screen">
      <div className="bg-gradient-to-r from-primary-900 to-primary-700 py-10">
        <div className="section-container">
          <h1 className="text-3xl lg:text-4xl font-display font-bold text-white mb-2">My Bookings</h1>
          <p className="text-white/70">Track and manage all your hotel reservations</p>
        </div>
      </div>

      <div className="section-container py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-56 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-secondary-100 p-4 sticky top-24">
              <h3 className="font-semibold text-secondary-900 px-2 mb-3">Filter</h3>
              <nav className="space-y-1">
                {STATUS_TABS.map((tab) => (
                  <button
                    key={tab.value}
                    onClick={() => setActiveTab(tab.value)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab.value
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-secondary-600 hover:bg-secondary-50'
                    }`}
                  >
                    {tab.label}
                    {tab.value && (
                      <span className="float-right text-xs text-secondary-400">
                        {bookings.filter(b => tab.value === 'upcoming' ? (b.status === 'confirmed' && new Date(b.checkIn) > new Date()) : b.status === tab.value).length}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          <div className="flex-1">
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-xl border border-secondary-100 p-5 animate-pulse">
                    <div className="h-5 bg-secondary-200 rounded w-1/3 mb-3" />
                    <div className="h-4 bg-secondary-200 rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : filteredBookings.length > 0 ? (
              <div className="space-y-4">
                {filteredBookings.map((booking) => {
                  const hotel = hotels[booking.hotelId];
                  return (
                    <div key={booking.id} className="bg-white rounded-xl shadow-sm border border-secondary-100 overflow-hidden">
                      <div className="flex flex-col lg:flex-row">
                        <div className="lg:w-56 flex-shrink-0">
                          <img
                            src={hotel?.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop'}
                            alt={booking.hotelName}
                            className="w-full h-40 lg:h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="flex-1 p-5">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                            <div>
                              <h3 className="font-semibold text-secondary-900">{booking.hotelName}</h3>
                              <p className="text-sm text-secondary-500 flex items-center gap-1 mt-0.5">
                                <FiMapPin className="w-3 h-3" />
                                {hotel?.location || ''}
                              </p>
                              <p className="text-sm text-secondary-600 mt-1">{booking.roomName}</p>
                            </div>
                            <div className="flex flex-col items-start sm:items-end gap-2">
                              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(booking.status)}`}>
                                {booking.status}
                              </span>
                              <span className="text-xl font-bold text-primary-600">{formatPrice(booking.totalPrice)}</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-4 mb-4 text-sm text-secondary-600">
                            <div className="flex items-center gap-1.5">
                              <FiCalendar className="w-4 h-4" />
                              {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
                            </div>
                            <div className="flex items-center gap-1.5">
                              <FiUsers className="w-4 h-4" />
                              {booking.guests} guest{booking.guests > 1 ? 's' : ''}
                            </div>
                            <div className="flex items-center gap-1.5">
                              <FiClock className="w-4 h-4" />
                              Booked {formatDate(booking.createdAt)}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-3 border-t border-secondary-100 pt-4">
                            <span className="text-sm text-secondary-500">Ref: <span className="font-mono font-medium text-secondary-700">LUX-{booking.id.toUpperCase()}</span></span>
                            {booking.specialRequests && (
                              <span className="text-sm text-secondary-500 italic">Request: {booking.specialRequests}</span>
                            )}
                          </div>

                          {(booking.status === 'confirmed' || booking.status === 'pending') && (
                            <div className="mt-3 flex gap-3">
                              <button
                                onClick={() => handleCancel(booking.id)}
                                className="text-sm text-red-600 hover:text-red-700 font-medium"
                              >
                                Cancel Booking
                              </button>
                              {(new Date(booking.checkOut) > new Date()) && (
                                <Link to={`/hotels/${hotel?.slug || ''}`} className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                                  View Hotel
                                </Link>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-xl border border-secondary-100">
                <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&h=150&fit=crop" alt="No bookings" className="w-40 h-32 object-cover rounded-xl mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">No bookings found</h3>
                <p className="text-secondary-500 mb-4">
                  {activeTab ? `You don't have any ${activeTab} bookings.` : 'You haven\'t made any bookings yet.'}
                </p>
                <Link to="/hotels" className="btn-primary text-sm">
                  Browse Hotels
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
