import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import ImageGallery from '../components/ImageGallery';
import RoomCard from '../components/RoomCard';
import StarRating from '../components/StarRating';
import ReviewCard from '../components/ReviewCard';
import { formatDate, formatPrice, calculateNights } from '../utils/helpers';
import toast from 'react-hot-toast';
import { FiMapPin, FiChevronRight, FiCheck, FiHeart, FiMaximize2, FiUsers, FiStar, FiSave, FiCalendar, FiAward, FiPhone } from 'react-icons/fi';

export default function HotelDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { initBooking } = useBooking();
  const { user, token } = useAuth();

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [checkIn, setCheckIn] = useState(searchParams.get('checkIn') || '');
  const [checkOut, setCheckOut] = useState(searchParams.get('checkOut') || '');
  const [guests, setGuests] = useState(parseInt(searchParams.get('guests')) || 2);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    fetchHotel();
    window.scrollTo(0, 0);
  }, [slug]);

  const fetchHotel = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/hotels/${slug}`);
      if (!res.ok) throw new Error('Hotel not found');
      const data = await res.json();
      setHotel(data);

      const reviewRes = await fetch(`/api/reviews/${data.id}`);
      const reviewData = await reviewRes.json();
      setReviews(reviewData.reviews || []);
    } catch (err) {
      toast.error('Hotel not found');
      navigate('/hotels');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectRoom = (room) => {
    setSelectedRoom(room);
  };

  const handleBookNow = () => {
    if (!hotel || !selectedRoom) {
      toast.error('Please select a room type');
      return;
    }

    if (!checkIn || !checkOut) {
      toast.error('Please select check-in and check-out dates');
      return;
    }

    if (new Date(checkOut) <= new Date(checkIn)) {
      toast.error('Check-out date must be after check-in date');
      return;
    }

    initBooking(hotel, selectedRoom, checkIn, checkOut, guests);
    navigate('/checkout');
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please sign in to leave a review');
      navigate('/login');
      return;
    }

    const form = e.target;
    const rating = parseInt(form.rating.value);
    const title = form.title.value;
    const comment = form.comment.value;

    if (!rating || !title || !comment) {
      toast.error('Please fill in all review fields');
      return;
    }

    try {
      const res = await fetch(`/api/reviews/${hotel.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ rating, title, comment })
      });

      if (res.ok) {
        const newReview = await res.json();
        setReviews(prev => [newReview, ...prev]);
        form.reset();
        form.rating.value = '5';
        toast.success('Review submitted successfully!');
        fetchHotel();
      } else {
        const data = await res.json();
        toast.error(data.error || 'Failed to submit review');
      }
    } catch {
      toast.error('Failed to submit review');
    }
  };

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!hotel) return null;

  const nights = calculateNights(checkIn, checkOut);

  return (
    <div className="pt-16 lg:pt-20">
      <div className="bg-gradient-to-r from-primary-900 to-primary-700 text-white">
        <div className="section-container py-8 lg:py-12">
          <nav className="flex items-center gap-2 text-white/60 text-sm mb-4">
            <a href="/" className="hover:text-white">Home</a>
            <FiChevronRight className="w-3 h-3" />
            <a href="/hotels" className="hover:text-white">Hotels</a>
            <FiChevronRight className="w-3 h-3" />
            <span className="text-white">{hotel.name}</span>
          </nav>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl lg:text-4xl font-display font-bold">{hotel.name}</h1>
                <span className="bg-accent-500 text-white text-xs font-semibold px-3 py-1 rounded-full capitalize">{hotel.category}</span>
              </div>
              <div className="flex items-center gap-2 text-white/70 mb-3">
                <FiMapPin className="w-4 h-4" />
                <span>{hotel.location}</span>
              </div>
              <div className="flex items-center gap-4">
                <StarRating rating={hotel.rating} size="md" />
                <span className="text-white font-semibold">{hotel.rating}</span>
                <span className="text-white/60">({hotel.reviewCount} reviews)</span>
              </div>
            </div>
            <button
              onClick={() => setLiked(!liked)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                liked ? 'bg-red-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <FiHeart className={liked ? 'fill-current' : ''} />
              {liked ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>
      </div>

      <div className="section-container py-8">
        <ImageGallery images={hotel.images} hotelName={hotel.name} />
      </div>

      <div className="section-container py-8 lg:py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-10">
            <section>
              <h2 className="text-2xl font-display font-bold text-secondary-900 mb-4">About This Hotel</h2>
              <p className="text-secondary-600 leading-relaxed mb-4">{hotel.description}</p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-primary-50 rounded-xl p-4 text-center">
                  <FiAward className="w-6 h-6 text-primary-600 mx-auto mb-2" />
                  <div className="font-semibold text-secondary-900">{hotel.starRating} Star</div>
                  <div className="text-sm text-secondary-500">Property</div>
                </div>
                <div className="bg-primary-50 rounded-xl p-4 text-center">
                  <FiMapPin className="w-6 h-6 text-primary-600 mx-auto mb-2" />
                  <div className="font-semibold text-secondary-900 line-clamp-1">Prime Location</div>
                  <div className="text-sm text-secondary-500">Central & Convenient</div>
                </div>
                <div className="bg-primary-50 rounded-xl p-4 text-center">
                  <FiUsers className="w-6 h-6 text-primary-600 mx-auto mb-2" />
                  <div className="font-semibold text-secondary-900">{hotel.amenities.length}+</div>
                  <div className="text-sm text-secondary-500">Amenities</div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-secondary-900 mb-4">Hotel Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {hotel.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2 bg-white rounded-lg p-3 border border-secondary-100">
                    <FiCheck className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-secondary-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-secondary-900 mb-4">Select Your Room</h2>
              <div className="space-y-4">
                {hotel.rooms.map((room) => (
                  <RoomCard
                    key={room.id}
                    room={room}
                    selected={selectedRoom?.id === room.id}
                    onSelect={handleSelectRoom}
                    showBookingButton
                  />
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-secondary-900 mb-4">Guest Reviews</h2>
              <div className="bg-white rounded-xl border border-secondary-100 p-6 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl font-bold text-secondary-900">{hotel.rating}</div>
                    <div>
                      <StarRating rating={hotel.rating} size="lg" />
                      <p className="text-secondary-500 text-sm mt-1">{hotel.reviewCount} verified reviews</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiPhone className="w-4 h-4 text-primary-600" />
                    <span className="text-sm text-secondary-600">Verified guest reviews only</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-secondary-100 px-6">
                {reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
                {reviews.length === 0 && (
                  <p className="text-secondary-500 text-center py-8">No reviews yet. Be the first to review this hotel!</p>
                )}
              </div>
            </section>

            {user && (
              <section>
                <h2 className="text-2xl font-display font-bold text-secondary-900 mb-4">Write a Review</h2>
                <form onSubmit={handleAddReview} className="bg-white rounded-xl border border-secondary-100 p-6">
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">Rating</label>
                      <select name="rating" defaultValue="5" className="input-field">
                        {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} {r === 1 ? 'Star' : 'Stars'}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">Review Title</label>
                      <input name="title" type="text" placeholder="Summarize your experience" className="input-field" />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-secondary-700 mb-2">Your Review</label>
                    <textarea
                      name="comment"
                      rows="4"
                      placeholder="Share your experience..."
                      className="input-field resize-none"
                    />
                  </div>
                  <button type="submit" className="btn-primary">Submit Review</button>
                </form>
              </section>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border border-secondary-100 p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">Book Your Stay</h3>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1.5">Check-in Date</label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="input-field text-sm"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1.5">Check-out Date</label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="input-field text-sm"
                    min={checkIn || new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1.5">Number of Guests</label>
                  <select value={guests} onChange={(e) => setGuests(parseInt(e.target.value))} className="input-field text-sm">
                    {[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>)}
                  </select>
                </div>
              </div>

              {selectedRoom && checkIn && checkOut && nights > 0 && (
                <div className="bg-secondary-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-secondary-700">{selectedRoom.name}</span>
                    <span className="text-sm text-secondary-600">{formatPrice(selectedRoom.price)}/night</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-secondary-600 mb-2">
                    <span>Nights</span>
                    <span>{nights}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-secondary-600 mb-2">
                    <span>Guests</span>
                    <span>{guests}</span>
                  </div>
                  <div className="border-t border-secondary-200 pt-3 mt-3">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-secondary-900">Total</span>
                      <span className="text-xl font-bold text-primary-600">{formatPrice(selectedRoom.price * nights)}</span>
                    </div>
                    <div className="text-xs text-secondary-500 mt-1">Taxes and fees included</div>
                  </div>
                </div>
              )}

              <button onClick={handleBookNow} className="btn-primary w-full text-lg py-3 mb-3" disabled={!selectedRoom}>
                {selectedRoom ? 'Book Now' : 'Select a Room First'}
              </button>
              <button onClick={() => saveHotel} className="btn-secondary w-full text-sm flex items-center justify-center gap-2">
                <FiSave className="w-4 h-4" />
                Save to Wishlist
              </button>

              <div className="mt-6 pt-6 border-t border-secondary-100 space-y-3">
                <div className="flex items-center gap-2 text-sm text-secondary-600">
                  <FiCheck className="w-4 h-4 text-green-500" /> Free cancellation
                </div>
                <div className="flex items-center gap-2 text-sm text-secondary-600">
                  <FiCheck className="w-4 h-4 text-green-500" /> No prepayment needed
                </div>
                <div className="flex items-center gap-2 text-sm text-secondary-600">
                  <FiCheck className="w-4 h-4 text-green-500" /> Best price guarantee
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
