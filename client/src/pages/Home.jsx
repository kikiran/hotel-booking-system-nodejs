import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroSearch from '../components/HeroSearch';
import HotelCard from '../components/HotelCard';
import TestimonialCard from '../components/TestimonialCard';
import { formatPrice } from '../utils/helpers';
import { FiArrowRight, FiStar, FiShield, FiHeadphones, FiTrendingUp, FiAward, FiGlobe, FiHeart } from 'react-icons/fi';

export default function Home() {
  const [hotels, setHotels] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/hotels?featured=true&limit=4').then(r => r.json()),
      fetch('/api/destinations').then(r => r.json()),
      fetch('/api/testimonials').then(r => r.json()),
    ]).then(([hotelData, destData, testiData]) => {
      setHotels(hotelData.hotels || []);
      setDestinations(destData);
      setTestimonials(testiData);
    }).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center hero-gradient overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&h=1080&fit=crop" alt="" className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-950/80 via-primary-900/60 to-primary-800/40" />
        <div className="section-container relative z-10 py-20 lg:py-32">
          <div className="max-w-3xl mb-10 lg:mb-14">
            <span className="inline-block text-accent-400 font-medium text-sm mb-4 tracking-wide uppercase">Welcome to LuxStay</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight mb-6">
              Find Your Perfect <span className="text-accent-400">Luxury Stay</span>
            </h1>
            <p className="text-lg lg:text-xl text-white/80 leading-relaxed max-w-2xl">
              Discover handpicked hotels and resorts worldwide. Book exceptional stays with confidence and create unforgettable memories.
            </p>
          </div>
          <HeroSearch variant="hero" />
        </div>
      </section>

      <section className="section-container py-12 -mt-10 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: FiStar, label: 'Verified Hotels', value: '500+' },
            { icon: FiGlobe, label: 'Destinations', value: '100+' },
            { icon: FiHeart, label: 'Happy Guests', value: '50K+' },
            { icon: FiAward, label: 'Awards Won', value: '25+' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-white rounded-xl p-5 shadow-sm border border-secondary-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary-900">{value}</div>
                <div className="text-sm text-secondary-500">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-container py-16 lg:py-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-primary-600 font-medium text-sm tracking-wide uppercase block mb-2">Featured Hotels</span>
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-secondary-900">Handpicked for You</h2>
          </div>
          <Link to="/hotels" className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors">
            View All Hotels <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card animate-pulse">
                <div className="aspect-[4/3] bg-secondary-200" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-secondary-200 rounded w-3/4" />
                  <div className="h-4 bg-secondary-200 rounded w-1/2" />
                  <div className="h-3 bg-secondary-200 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        )}
      </section>

      <section className="bg-primary-900 py-16 lg:py-24">
        <div className="section-container">
          <div className="text-center mb-12">
            <span className="text-accent-400 font-medium text-sm tracking-wide uppercase block mb-2">Explore Destinations</span>
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-white">Popular Destinations</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {destinations.map((dest) => (
              <Link
                key={dest.name}
                to={`/hotels?location=${dest.name}`}
                className="group relative overflow-hidden rounded-xl aspect-[4/3]"
              >
                <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-white font-semibold text-lg">{dest.name}</h3>
                  <p className="text-white/70 text-sm">{dest.hotelCount} hotels</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-container py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-primary-600 font-medium text-sm tracking-wide uppercase block mb-2">Why Choose Us</span>
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-secondary-900 mb-6">The Best Booking Experience</h2>
            <p className="text-secondary-600 mb-8 leading-relaxed">
              We partner with the world's finest hotels to bring you exceptional stays at the best prices. Our commitment to quality ensures every booking is a memorable experience.
            </p>
            <div className="space-y-6">
              {[
                { icon: FiShield, title: 'Secure Booking', desc: 'Your data is protected with bank-level encryption.' },
                { icon: FiHeadphones, title: '24/7 Support', desc: 'Our team is always available to help you.' },
                { icon: FiTrendingUp, title: 'Best Price Guarantee', desc: 'Find a lower price? We\'ll match it and give you 10% off.' },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-4">
                  <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-900 mb-1">{title}</h3>
                    <p className="text-secondary-500 text-sm">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=600&fit=crop" alt="Luxury Hotel" className="w-full aspect-[4/3] object-cover" loading="lazy" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 flex items-center gap-3">
              <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
                <FiStar className="w-6 h-6 text-accent-500" />
              </div>
              <div>
                <div className="font-bold text-secondary-900">4.8/5</div>
                <div className="text-sm text-secondary-500">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary-100 py-16 lg:py-24">
        <div className="section-container">
          <div className="text-center mb-12">
            <span className="text-primary-600 font-medium text-sm tracking-wide uppercase block mb-2">Testimonials</span>
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-secondary-900">What Our Guests Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-container py-16 lg:py-24">
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-3xl p-8 lg:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1920&h=600&fit=crop" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">Ready for Your Next Adventure?</h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Sign up now and get exclusive access to member-only deals and early bird offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="btn-accent text-lg px-8 py-3">
                Get Started Free
              </Link>
              <Link to="/hotels" className="border-2 border-white/30 text-white hover:bg-white/10 font-medium py-3 px-8 rounded-lg transition-colors text-lg">
                Browse Hotels
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
