
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getInternalAdverts, Advert } from '../services/firebaseService';

const AdCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [adverts, setAdverts] = useState<Advert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdverts = async () => {
      setLoading(true);
      try {
        const internalAdverts = await getInternalAdverts();
        setAdverts(internalAdverts);
      } catch (error) {
        console.error('Error loading internal adverts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdverts();
  }, []);

  useEffect(() => {
    if (adverts.length > 1) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % adverts.length);
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [adverts.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % adverts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + adverts.length) % adverts.length);
  };

  const handleAdvertClick = (advert: Advert) => {
    if (advert.link) {
      window.open(advert.link, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="w-full h-48 md:h-64 rounded-lg bg-gray-200 animate-pulse flex items-center justify-center">
        <span className="text-gray-500">Loading...</span>
      </div>
    );
  }

  if (adverts.length === 0) {
    return (
      <div className="w-full h-48 md:h-64 rounded-lg bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center text-white">
        <div className="text-center">
          <h3 className="text-xl md:text-2xl font-bold mb-2">Welcome to Alafat</h3>
          <p className="text-sm md:text-base opacity-90">Your spiritual journey starts here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-48 md:h-64 rounded-lg overflow-hidden shadow-lg">
      <div 
        className="flex transition-transform duration-300 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {adverts.map((advert) => (
          <div
            key={advert.id}
            className="min-w-full h-full relative flex items-center justify-center cursor-pointer"
            onClick={() => handleAdvertClick(advert)}
            style={{
              backgroundImage: `linear-gradient(rgba(60, 16, 18, 0.3), rgba(60, 16, 18, 0.3)), url(${advert.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {advert.link && (
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all" />
            )}
          </div>
        ))}
      </div>

      {/* Navigation buttons - only show if more than 1 advert */}
      {adverts.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all"
          >
            <ChevronLeft size={20} className="text-white" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all"
          >
            <ChevronRight size={20} className="text-white" />
          </button>

          {/* Dots indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {adverts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide ? 'bg-secondary w-6' : 'bg-white bg-opacity-50'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AdCarousel;
