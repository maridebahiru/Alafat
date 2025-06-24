
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const AdCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const ads = [
    {
      id: 1,
      title: 'Ethiopian Orthodox Teachings',
      description: 'Join our weekly teachings and spiritual guidance',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475/1200x600',
      color: 'bg-primary'
    },
    {
      id: 2,
      title: 'Alafat Festival 2024',
      description: 'Celebrating our faith and community together',
      image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81/1200x600',
      color: 'bg-gradient-to-r from-secondary-dark to-secondary'
    },
    {
      id: 3,
      title: 'Community Outreach',
      description: 'Supporting our community through service',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d/1200x600',
      color: 'bg-primary'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % ads.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [ads.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % ads.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + ads.length) % ads.length);
  };

  return (
    <div className="relative w-full h-48 md:h-64 rounded-lg overflow-hidden shadow-lg">
      <div 
        className="flex transition-transform duration-300 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {ads.map((ad) => (
          <div
            key={ad.id}
            className={`min-w-full h-full ${ad.color} relative flex items-center justify-center text-white`}
            style={{
              backgroundImage: `linear-gradient(rgba(60, 16, 18, 0.7), rgba(60, 16, 18, 0.7)), url(${ad.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="text-center px-4">
              <h3 className="text-xl md:text-2xl font-bold mb-2">{ad.title}</h3>
              <p className="text-sm md:text-base opacity-90">{ad.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
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
        {ads.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide ? 'bg-secondary w-6' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default AdCarousel;
