import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { GALLERY_IMAGES } from '../data/constants';
import type { GalleryImage } from '../types';

const Gallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'classroom', label: 'Classroom' },
    { id: 'events', label: 'Events' },
    { id: 'graduation', label: 'Graduation' },
    { id: 'workshop', label: 'Workshops' },
  ];

  const filteredImages = filter === 'all' ? GALLERY_IMAGES : GALLERY_IMAGES.filter(img => img.category === filter);

  const handlePrev = () => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const prevIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
    setSelectedImage(filteredImages[prevIndex]);
  };

  const handleNext = () => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const nextIndex = currentIndex === filteredImages.length - 1 ? 0 : currentIndex + 1;
    setSelectedImage(filteredImages[nextIndex]);
  };

  return (
    <section id="gallery" className="relative py-24 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-950/10 dark:via-primary-950/10 light:via-primary-50/30 to-transparent" />
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-500 text-sm font-medium mb-4">
            <Camera className="w-4 h-4" />
            Our Gallery
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-adaptive mb-6">
            Moments of <span className="gradient-text">Excellence</span>
          </h2>
          <p className="text-xl text-adaptive-secondary max-w-3xl mx-auto">
            Glimpses of our vibrant community, classroom sessions, and success celebrations
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                filter === category.id
                  ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30'
                  : 'bg-primary-500/10 border border-primary-500/20 text-adaptive-secondary hover:text-adaptive hover:border-primary-500/40'
              }`}
              aria-pressed={filter === category.id}
              aria-label={`Filter gallery by ${category.label}`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`group cursor-pointer ${index % 5 === 0 ? 'sm:col-span-2 sm:row-span-2' : ''}`}
                onClick={() => setSelectedImage(image)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedImage(image);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`View ${image.caption} image`}
              >
                <div className="photo-frame relative h-full min-h-[200px] overflow-hidden rounded-2xl">
                  <img
                    src={image.src}
                    alt={image.caption}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-950/90 via-primary-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white font-medium">{image.caption}</p>
                      <span className="inline-block mt-2 px-3 py-1 rounded-full bg-primary-500/20 text-primary-300 text-xs capitalize">{image.category}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 p-3 rounded-full bg-primary-500/20 text-white hover:bg-primary-500/40 transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              onClick={() => setSelectedImage(null)}
              aria-label="Close image viewer"
            >
              <X className="w-6 h-6" />
            </button>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-primary-500/20 text-white hover:bg-primary-500/40 transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-primary-500/20 text-white hover:bg-primary-500/40 transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative max-w-5xl max-h-[80vh] w-full" onClick={(e) => e.stopPropagation()}>
              <img src={selectedImage.src} alt={selectedImage.caption} className="w-full h-full object-contain rounded-2xl" />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent rounded-b-2xl">
                <p className="text-white text-lg font-medium">{selectedImage.caption}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
