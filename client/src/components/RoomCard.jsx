import { formatPrice } from '../utils/helpers';
import { FiUsers, FiMaximize2, FiCheck } from 'react-icons/fi';

export default function RoomCard({ room, selected, onSelect, showBookingButton = true }) {
  return (
    <div
      className={`card cursor-pointer transition-all duration-200 ${
        selected ? 'ring-2 ring-primary-500 shadow-md' : 'hover:border-primary-200'
      }`}
      onClick={() => onSelect && onSelect(room)}
    >
      <div className="flex flex-col lg:flex-row">
        <div className="relative lg:w-80 flex-shrink-0">
          <img
            src={room.images[0]}
            alt={room.name}
            className="w-full h-48 lg:h-full object-cover"
            loading="lazy"
          />
          {room.availableRooms <= 3 && room.availableRooms > 0 && (
            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              Only {room.availableRooms} left!
            </span>
          )}
        </div>
        <div className="flex-1 p-4 lg:p-5">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
            <div>
              <h3 className="text-lg font-semibold text-secondary-900">{room.name}</h3>
              <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2.5 py-1 rounded-full capitalize">
                {room.type}
              </span>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-secondary-900">{formatPrice(room.price)}</div>
              <span className="text-secondary-500 text-sm">per night</span>
            </div>
          </div>

          <p className="text-secondary-500 text-sm mb-4">{room.description}</p>

          <div className="flex flex-wrap gap-4 mb-4 text-sm text-secondary-600">
            <div className="flex items-center gap-1.5">
              <FiUsers className="w-4 h-4" />
              <span>Up to {room.maxGuests} guests</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FiMaximize2 className="w-4 h-4" />
              <span>{room.size}</span>
            </div>
            <span className="text-secondary-400">|</span>
            <span>{room.bedType} bed</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {room.amenities.map((amenity) => (
              <span key={amenity} className="inline-flex items-center gap-1 text-xs bg-secondary-50 text-secondary-600 px-2.5 py-1.5 rounded-lg">
                <FiCheck className="w-3 h-3 text-green-500" />
                {amenity}
              </span>
            ))}
          </div>

          {showBookingButton && (
            <div className="flex items-center justify-between pt-3 border-t border-secondary-100">
              <span className={`text-sm font-medium ${room.available ? 'text-green-600' : 'text-red-500'}`}>
                {room.available ? `${room.availableRooms} rooms available` : 'Sold out'}
              </span>
              {selected && (
                <span className="text-sm font-semibold text-primary-600">Selected</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
