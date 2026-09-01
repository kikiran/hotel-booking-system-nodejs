import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { formatDate, formatPrice } from '../utils/helpers';
import toast from 'react-hot-toast';
import { FiCheck, FiLock, FiShield, FiCalendar, FiUsers, FiPlus, FiMinus } from 'react-icons/fi';

export default function Checkout() {
  const navigate = useNavigate();
  const { bookingData, clearBooking, setCurrentBooking } = useBooking();
  const { user, token } = useAuth();

  const [guestName, setGuestName] = useState(user?.name || '');
  const [guestEmail, setGuestEmail] = useState(user?.email || '');
  const [guestPhone, setGuestPhone] = useState(user?.phone || '');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!bookingData.hotel || !bookingData.room) {
      toast.error('Please select a room to book');
      navigate('/hotels');
    }
  }, [bookingData]);

  if (!bookingData.hotel || !bookingData.room) {
    return null;
  }

  const { hotel, room, checkIn, checkOut, guests, totalPrice, nights } = bookingData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (paymentMethod === 'Credit Card' && (!cardName || !cardNumber || !cardExpiry || !cardCvv)) {
      toast.error('Please fill in all card details');
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          hotelId: hotel.id,
          roomId: room.id,
          checkIn,
          checkOut,
          guests,
          guestName,
          guestEmail,
          guestPhone,
          paymentMethod,
          specialRequests
        })
      });

      const data = await res.json();

      if (res.ok) {
        setCurrentBooking(data);
        clearBooking();
        toast.success('Booking confirmed successfully!');
        navigate(`/booking-confirmation/${data.id}`);
      } else {
        toast.error(data.error || 'Booking failed. Please try again.');
      }
    } catch {
      toast.error('Booking failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatCardNumber = (value) => {
    return value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (value) => {
    const clean = value.replace(/\D/g, '').slice(0, 4);
    if (clean.length >= 3) return `${clean.slice(0, 2)}/${clean.slice(2)}`;
    return clean;
  };

  return (
    <div className="pt-20 lg:pt-24 bg-secondary-50 min-h-screen">
      <div className="bg-gradient-to-r from-primary-900 to-primary-700 py-10">
        <div className="section-container">
          <h1 className="text-3xl lg:text-4xl font-display font-bold text-white mb-2">Complete Your Booking</h1>
          <p className="text-white/70">Review your details and confirm your stay</p>
        </div>
      </div>

      <div className="section-container py-8 lg:py-12">
        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-secondary-100 p-6">
              <h2 className="text-lg font-semibold text-secondary-900 mb-4">Your Stay</h2>
              <div className="flex items-start gap-4">
                <img src={hotel.images[0]} alt={hotel.name} className="w-32 h-24 object-cover rounded-lg flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-secondary-900">{hotel.name}</h3>
                  <p className="text-sm text-secondary-500 mb-2">{hotel.location}</p>
                  <div className="flex flex-wrap gap-3 text-sm text-secondary-600">
                    <div className="flex items-center gap-1.5">
                      <FiCalendar className="w-4 h-4" />
                      {formatDate(checkIn)} - {formatDate(checkOut)}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FiUsers className="w-4 h-4" />
                      {guests} guest{guests > 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-secondary-100 flex justify-between">
                <div>
                  <div className="text-sm font-medium text-secondary-800">{room.name}</div>
                  <div className="text-sm text-secondary-500">{nights} nights</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-secondary-500">{formatPrice(room.price)} × {nights}</div>
                  <div className="font-semibold text-secondary-900">{formatPrice(totalPrice)}</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-secondary-100 p-6">
              <h2 className="text-lg font-semibold text-secondary-900 mb-4">Guest Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    required
                    className="input-field"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    required
                    className="input-field"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="input-field"
                    placeholder="+1-555-000-0000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1.5">Special Requests</label>
                  <input
                    type="text"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="input-field"
                    placeholder="Optional"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-secondary-100 p-6">
              <h2 className="text-lg font-semibold text-secondary-900 mb-4">Payment Details</h2>
              <div className="grid sm:grid-cols-3 gap-3 mb-6">
                {['Credit Card', 'PayPal', 'Bank Transfer'].map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPaymentMethod(method)}
                    className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all ${
                      paymentMethod === method
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-secondary-200 text-secondary-600 hover:border-secondary-300'
                    }`}
                  >
                    {paymentMethod === method && <FiCheck className="w-4 h-4" />}
                    {method}
                  </button>
                ))}
              </div>

              {paymentMethod === 'Credit Card' && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-secondary-700 mb-1.5">Name on Card</label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="input-field"
                      placeholder="John Smith"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-secondary-700 mb-1.5">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      className="input-field"
                      placeholder="4242 4242 4242 4242"
                      inputMode="numeric"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1.5">Expiry Date</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                      className="input-field"
                      placeholder="MM/YY"
                      inputMode="numeric"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1.5">CVV</label>
                    <input
                      type="password"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      className="input-field"
                      placeholder="***"
                      inputMode="numeric"
                      maxLength={4}
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'PayPal' && (
                <p className="text-sm text-secondary-600 bg-secondary-50 rounded-lg p-4">
                  You will be redirected to PayPal to complete your payment securely after confirming the booking.
                </p>
              )}

              {paymentMethod === 'Bank Transfer' && (
                <p className="text-sm text-secondary-600 bg-secondary-50 rounded-lg p-4">
                  Bank transfer details will be sent to your email after confirmation. Please complete the transfer within 48 hours.
                </p>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border border-secondary-100 p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">Price Summary</h3>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-secondary-600">{room.name}</span>
                  <span className="text-secondary-800">{formatPrice(room.price)} × {nights} nights</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-secondary-600">Subtotal</span>
                  <span className="text-secondary-800">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-secondary-600">Taxes & Fees</span>
                  <span className="text-secondary-800">Included</span>
                </div>
                <div className="border-t border-secondary-200 pt-3 flex justify-between items-center">
                  <span className="font-semibold text-secondary-900">Total</span>
                  <span className="text-2xl font-bold text-primary-600">{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full text-lg py-3 mb-4 disabled:opacity-50"
              >
                {submitting ? 'Processing...' : `Book Now · ${formatPrice(totalPrice)}`}
              </button>

              <div className="space-y-3 text-sm text-secondary-600">
                <div className="flex items-center gap-2">
                  <FiLock className="w-4 h-4 text-green-500" />
                  <span>Secure encrypted payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiShield className="w-4 h-4 text-green-500" />
                  <span>Free cancellation up to 48 hours before check-in</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheck className="w-4 h-4 text-green-500" />
                  <span>Instant confirmation</span>
                </div>
              </div>

              <p className="mt-6 text-xs text-secondary-500 leading-relaxed">
                By clicking "Book Now" you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
