import { Link } from 'react-router-dom';
import { FiMapPin, FiStar, FiHeart } from 'react-icons/fi';
import { formatPrice } from '../utils/helpers';
import { useState } from 'react';

export default function HotelCard({ hotel }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="card group">
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={hotel.images[0]}
          alt={hotel.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <button
          onClick={(e) => { e.preventDefault(); setLiked(!liked); }}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            liked ? 'bg-red-500 text-white' : 'bg-white/90 text-secondary-600 hover:bg-white hover:text-red-500'
          }`}
        >
          <FiHeart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
        </button>
        {hotel.featured && (
          <span className="absolute top-3 left-3 bg-accent-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            Featured
          </span>
        )}
        <div className="absolute bottom-3 left-3 flex items-center gap-1">
          <FiStar className="w-4 h-4 text-accent-400 fill-accent-400" />
          <span className="text-white text-sm font-semibold">{hotel.rating}</span>
          <span className="text-white/70 text-xs">({hotel.reviewCount} reviews)</span>
        </div>
      </div>

      <Link to={`/hotels/${hotel.slug}`} className="block p-4 lg:p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-secondary-900 group-hover:text-primary-600 transition-colors line-clamp-1">
            {hotel.name}
          </h3>
          <span className="text-xs font-medium text-secondary-500 bg-secondary-100 px-2 py-1 rounded-md flex-shrink-0 capitalize">
            {hotel.category}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-secondary-500 text-sm mb-3">
          <FiMapPin className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="line-clamp-1">{hotel.location}</span>
        </div>
        <p className="text-secondary-500 text-sm line-clamp-2 mb-4">
          {hotel.shortDescription}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {hotel.amenities.slice(0, 3).map((amenity) => (
            <span key={amenity} className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded-md">
              {amenity}
            </span>
          ))}
          {hotel.amenities.length > 3 && (
            <span className="text-xs bg-secondary-100 text-secondary-600 px-2 py-1 rounded-md">
              +{hotel.amenities.length - 3} more
            </span>
          )}
        </div>
        <div className="flex items-end justify-between pt-3 border-t border-secondary-100">
          <div>
            <span className="text-secondary-500 text-xs">Starting from</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-secondary-900">{formatPrice(hotel.minPrice)}</span>
              <span className="text-secondary-500 text-sm">/night</span>
            </div>
          </div>
          <span className="text-primary-600 text-sm font-medium group-hover:underline">
            View Details
          </span>
        </div>
      </Link>
    </div>
  );
}
