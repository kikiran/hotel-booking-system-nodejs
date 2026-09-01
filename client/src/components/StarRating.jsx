import { FiStar } from 'react-icons/fi';

export default function StarRating({ rating, size = 'md' }) {
  const sizeClasses = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const starSize = sizeClasses[size] || sizeClasses.md;

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <FiStar
          key={star}
          className={`${starSize} ${
            star <= rating
              ? 'text-accent-400 fill-accent-400'
              : star - 0.5 <= rating
              ? 'text-accent-400 fill-accent-200'
              : 'text-secondary-300'
          }`}
        />
      ))}
    </div>
  );
}
