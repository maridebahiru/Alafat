
import { useState, useEffect } from 'react';
import { getExternalAdverts, Advert } from '../services/firebaseService';

const PromotionCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [adverts, setAdverts] = useState<Advert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdverts = async () => {
      setLoading(true);
      try {
        const externalAdverts = await getExternalAdverts();
        setAdverts(externalAdverts);
      } catch (error) {
        console.error('Error loading external adverts:', error);
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
      }, 3000); // Change slide every 3 seconds

      return () => clearInterval(timer);
    }
  }, [adverts.length]);

  const handleAdvertClick = (advert: Advert) => {
    if (advert.link) {
      window.open(advert.link, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="relative overflow-hidden bg-gray-200 rounded-lg shadow-md h-24 animate-pulse flex items-center justify-center">
        <span className="text-gray-500">Loading promotions...</span>
      </div>
    );
  }

  if (adverts.length === 0) {
    return null; // Don't show anything if no external adverts
  }

  return (
    <div className="relative overflow-hidden bg-white rounded-lg shadow-md h-24">
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {adverts.map((advert) => (
          <div
            key={advert.id}
            className="min-w-full h-full flex items-center justify-center cursor-pointer"
            onClick={() => handleAdvertClick(advert)}
            style={{
              backgroundImage: `url(${advert.image})`,
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

      {/* Dots indicator - only show if more than 1 advert */}
      {adverts.length > 1 && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {adverts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide ? 'bg-white w-4' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PromotionCarousel;
