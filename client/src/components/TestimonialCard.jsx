import StarRating from './StarRating';
import { FiMessageSquare } from 'react-icons/fi';

export default function TestimonialCard({ testimonial }) {
  return (
    <div className="card p-6 lg:p-8 relative">
      <FiMessageSquare className="absolute top-4 right-4 w-8 h-8 text-primary-100" />
      <div className="flex items-center gap-4 mb-4">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover"
          loading="lazy"
        />
        <div>
          <h4 className="font-semibold text-secondary-900">{testimonial.name}</h4>
          <p className="text-sm text-secondary-500">{testimonial.role}</p>
        </div>
      </div>
      <StarRating rating={testimonial.rating} size="sm" />
      <p className="mt-4 text-secondary-600 text-sm leading-relaxed">{testimonial.text}</p>
    </div>
  );
}
