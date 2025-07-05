
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const AdCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const ads = [
    {
      id: 1,
      image: '/lovable-uploads/ba20a4a5-84df-4981-acf0-cae01c447072.png',
      title: 'Ethiopian Orthodox Music Collection',
      description: 'Discover our extensive collection of traditional Orthodox songs and chants.',
    },
    {
      id: 2,
      image: '/lovable-uploads/aab69517-55fa-435c-bf9a-110721c35cf2.png',
      title: 'Support Our Community',
      description: 'Your donations help us preserve and share our sacred traditions.',
    },
    {
      id: 3,
      image: '/lovable-uploads/2c396672-14d7-4d20-aad0-dd53b02ff0f8.png',
      title: 'Orthodox Products & Books',
      description: 'Browse our collection of Orthodox books, icons, and religious items.',
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
    <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
      {ads.map((ad, index) => (
        <div
          key={ad.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="w-full h-full bg-cover bg-center relative"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${ad.image})`
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center text-center text-white p-6">
              <div>
                <h2 className="text-2xl md:text-4xl font-bold mb-4">{ad.title}</h2>
                <p className="text-lg md:text-xl opacity-90">{ad.description}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
      >
        <ChevronRight size={24} />
      </button>
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {ads.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default AdCarousel;
