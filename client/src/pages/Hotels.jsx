import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import HotelCard from '../components/HotelCard';
import HeroSearch from '../components/HeroSearch';
import { FiSliders, FiX, FiChevronDown } from 'react-icons/fi';

const AMENITIES_LIST = ['Free WiFi', 'Pool', 'Spa', 'Restaurant', 'Bar', 'Gym', 'Beach Access', 'Room Service', 'Airport Shuttle'];
const CATEGORIES = [
  { value: '', label: 'All Categories' },
  { value: 'luxury', label: 'Luxury' },
  { value: 'resort', label: 'Resort' },
  { value: 'boutique', label: 'Boutique' },
];
const SORT_OPTIONS = [
  { value: '', label: 'Recommended' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'reviews', label: 'Most Reviewed' },
];
const PRICE_RANGES = [
  { min: '', max: '', label: 'All Prices' },
  { min: '0', max: '200', label: 'Under $200' },
  { min: '200', max: '400', label: '$200 - $400' },
  { min: '400', max: '600', label: '$400 - $600' },
  { min: '600', max: '', label: '$600+' },
];

export default function Hotels() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || '');
  const [priceRange, setPriceRange] = useState(searchParams.get('priceRange') || '');
  const [rating, setRating] = useState(searchParams.get('rating') || '');
  const [amenities, setAmenities] = useState(searchParams.get('amenities')?.split(',') || []);
  const [page, setPage] = useState(parseInt(searchParams.get('page')) || 1);

  useEffect(() => {
    fetchHotels();
  }, [sort, category, rating, priceRange, amenities.join(','), page]);

  const fetchHotels = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (location) params.set('location', location);
      if (category) params.set('category', category);
      if (sort) params.set('sort', sort);
      if (rating) params.set('rating', rating);
      if (amenities.length) params.set('amenities', amenities.join(','));
      if (priceRange) {
        const [min, max] = priceRange.split('-');
        if (min) params.set('minPrice', min);
        if (max) params.set('maxPrice', max);
      }
      params.set('page', page);
      params.set('limit', '12');

      const res = await fetch(`/api/hotels?${params.toString()}`);
      const data = await res.json();
      setHotels(data.hotels || []);
      setTotalPages(data.totalPages || 1);
      setTotal(data.total || 0);
    } catch (err) {
      console.error('Failed to fetch hotels:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchHotels();
  };

  const toggleAmenity = (amenity) => {
    setAmenities(prev => prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]);
  };

  const clearFilters = () => {
    setSearch('');
    setLocation('');
    setCategory('');
    setSort('');
    setPriceRange('');
    setRating('');
    setAmenities([]);
    setPage(1);
  };

  const activeFilterCount = [location, category, priceRange, rating, ...amenities].filter(Boolean).length;

  return (
    <div className="pt-20 lg:pt-24">
      <div className="bg-gradient-to-r from-primary-900 to-primary-700 py-10 lg:py-14">
        <div className="section-container">
          <h1 className="text-3xl lg:text-4xl font-display font-bold text-white mb-2">Find Your Hotel</h1>
          <p className="text-white/70 mb-6">Explore our curated selection of premium hotels worldwide</p>
          <HeroSearch variant="compact" />
        </div>
      </div>

      <div className="section-container py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className={`lg:w-72 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-xl shadow-sm border border-secondary-100 p-5 sticky top-24">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-semibold text-secondary-900 flex items-center gap-2">
                  <FiSliders className="w-4 h-4" />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="bg-primary-100 text-primary-700 text-xs px-2 py-0.5 rounded-full">{activeFilterCount}</span>
                  )}
                </h3>
                {activeFilterCount > 0 && (
                  <button onClick={clearFilters} className="text-sm text-primary-600 hover:text-primary-700">Clear all</button>
                )}
              </div>

              <div className="space-y-5">
                <div>
                  <label className="text-sm font-medium text-secondary-700 mb-2 block">Category</label>
                  <select value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); }} className="input-field text-sm">
                    {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-secondary-700 mb-2 block">Price Range</label>
                  <select value={priceRange} onChange={(e) => { setPriceRange(e.target.value); setPage(1); }} className="input-field text-sm">
                    {PRICE_RANGES.map((p, i) => <option key={i} value={p.min && p.max ? `${p.min}-${p.max}` : p.min || p.max || ''}>{p.label}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-secondary-700 mb-2 block">Minimum Rating</label>
                  <select value={rating} onChange={(e) => { setRating(e.target.value); setPage(1); }} className="input-field text-sm">
                    <option value="">Any Rating</option>
                    <option value="4.5">4.5+ Stars</option>
                    <option value="4">4+ Stars</option>
                    <option value="3.5">3.5+ Stars</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-secondary-700 mb-3 block">Amenities</label>
                  <div className="space-y-2">
                    {AMENITIES_LIST.map((amenity) => (
                      <label key={amenity} className="flex items-center gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={amenities.includes(amenity)}
                          onChange={() => toggleAmenity(amenity)}
                          className="w-4 h-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm text-secondary-600">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-lg font-semibold text-secondary-900">
                  {loading ? 'Searching...' : `${total} hotel${total !== 1 ? 's' : ''} found`}
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden btn-secondary text-sm flex items-center gap-2">
                  <FiSliders className="w-4 h-4" />
                  Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
                </button>
                <select value={sort} onChange={(e) => setSort(e.target.value)} className="input-field text-sm w-auto">
                  {SORT_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
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
            ) : hotels.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {hotels.map((hotel) => (
                    <HotelCard key={hotel.id} hotel={hotel} />
                  ))}
                </div>
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-10">
                    <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="btn-secondary text-sm disabled:opacity-50">
                      Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                          p === page ? 'bg-primary-600 text-white' : 'bg-white text-secondary-600 hover:bg-secondary-100 border border-secondary-200'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                    <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="btn-secondary text-sm disabled:opacity-50">
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiSliders className="w-8 h-8 text-secondary-400" />
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">No hotels found</h3>
                <p className="text-secondary-500 mb-4">Try adjusting your filters or search criteria</p>
                <button onClick={clearFilters} className="btn-primary text-sm">Clear All Filters</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
