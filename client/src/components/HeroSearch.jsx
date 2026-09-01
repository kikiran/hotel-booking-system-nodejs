import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiMapPin, FiCalendar, FiUsers } from 'react-icons/fi';
import { format, addDays } from 'date-fns';

export default function HeroSearch({ variant = 'hero' }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [checkIn, setCheckIn] = useState(format(addDays(new Date(), 1), 'yyyy-MM-dd'));
  const [checkOut, setCheckOut] = useState(format(addDays(new Date(), 4), 'yyyy-MM-dd'));
  const [guests, setGuests] = useState(2);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (checkIn) params.set('checkIn', checkIn);
    if (checkOut) params.set('checkOut', checkOut);
    if (guests) params.set('guests', guests);
    navigate(`/hotels?${params.toString()}`);
  };

  if (variant === 'compact') {
    return (
      <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-lg p-4 lg:p-6 border border-secondary-100">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative md:col-span-1">
            <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400" />
            <input
              type="text"
              placeholder="Where are you going?"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <div className="relative">
            <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400" />
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="input-field pl-10"
              min={format(new Date(), 'yyyy-MM-dd')}
            />
          </div>
          <div className="relative">
            <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400" />
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="input-field pl-10"
              min={checkIn || format(new Date(), 'yyyy-MM-dd')}
            />
          </div>
          <button type="submit" className="btn-primary flex items-center justify-center gap-2">
            <FiSearch className="w-4 h-4" />
            Search
          </button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSearch} className="bg-white/10 backdrop-blur-md rounded-2xl p-4 lg:p-6 border border-white/20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-2 relative">
          <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-400" />
          <input
            type="text"
            placeholder="Where are you going?"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 bg-white rounded-xl text-secondary-900 placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-400"
          />
        </div>
        <div className="relative">
          <FiCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-400" />
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 bg-white rounded-xl text-secondary-900 focus:outline-none focus:ring-2 focus:ring-primary-400"
            min={format(new Date(), 'yyyy-MM-dd')}
          />
        </div>
        <div className="relative">
          <FiCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-400" />
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 bg-white rounded-xl text-secondary-900 focus:outline-none focus:ring-2 focus:ring-primary-400"
            min={checkIn || format(new Date(), 'yyyy-MM-dd')}
          />
        </div>
        <button type="submit" className="bg-accent-500 hover:bg-accent-600 text-white font-semibold py-3.5 px-6 rounded-xl transition-colors flex items-center justify-center gap-2">
          <FiSearch className="w-5 h-5" />
          Search
        </button>
      </div>
    </form>
  );
}
