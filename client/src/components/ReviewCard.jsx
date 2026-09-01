import StarRating from './StarRating';
import { formatDate } from '../utils/helpers';

export default function ReviewCard({ review }) {
  return (
    <div className="py-5 border-b border-secondary-100 last:border-0">
      <div className="flex items-start gap-4">
        <img
          src={review.userAvatar}
          alt={review.userName}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          loading="lazy"
        />
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <div>
              <h4 className="font-medium text-secondary-900">{review.userName}</h4>
              <StarRating rating={review.rating} size="sm" />
            </div>
            <span className="text-sm text-secondary-500">{formatDate(review.date)}</span>
          </div>
          <h5 className="font-medium text-secondary-800 mb-1">{review.title}</h5>
          <p className="text-secondary-600 text-sm leading-relaxed">{review.comment}</p>
        </div>
      </div>
    </div>
  );
}
