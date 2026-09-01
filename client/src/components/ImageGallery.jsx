import { useState } from 'react';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function ImageGallery({ images, hotelName }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`relative overflow-hidden rounded-xl ${
              i === 0 ? 'col-span-2 row-span-2 aspect-square' : 'aspect-[4/3]'
            } group`}
          >
            <img
              src={img}
              alt={`${hotelName} - Image ${i + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            {i === images.length - 1 && images.length > 4 && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-white text-xl font-semibold">+{images.length - 4} more</span>
              </div>
            )}
          </button>
        ))}
      </div>

      {selected !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-white hover:text-white/80 z-10">
            <FiX className="w-8 h-8" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setSelected(selected > 0 ? selected - 1 : images.length - 1); }}
            className="absolute left-4 text-white hover:text-white/80 bg-white/10 rounded-full p-2 z-10"
          >
            <FiChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setSelected(selected < images.length - 1 ? selected + 1 : 0); }}
            className="absolute right-4 text-white hover:text-white/80 bg-white/10 rounded-full p-2 z-10"
          >
            <FiChevronRight className="w-6 h-6" />
          </button>
          <img
            src={images[selected]}
            alt={`${hotelName} - Image ${selected + 1}`}
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-4 text-white/70 text-sm">
            {selected + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
