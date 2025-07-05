
import { useState, useEffect } from 'react';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

const PromotionCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const promotions = [
    {
      id: 1,
      title: 'Ethiopian Cultural Center',
      description: 'Learn more about Ethiopian history and culture',
      image: '/lovable-uploads/ba20a4a5-84df-4981-acf0-cae01c447072.png',
      link: '#',
      bgColor: 'bg-blue-600'
    },
    {
      id: 2,
      title: 'Orthodox Book Store',
      description: 'Discover spiritual books and resources',
      image: '/lovable-uploads/aab69517-55fa-435c-bf9a-110721c35cf2.png',
      link: '#',
      bgColor: 'bg-green-600'
    },
    {
      id: 3,
      title: 'Community Events',
      description: 'Join our upcoming community gatherings',
      image: '/lovable-uploads/2c396672-14d7-4d20-aad0-dd53b02ff0f8.png',
      link: '#',
      bgColor: 'bg-purple-600'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promotions.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [promotions.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % promotions.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + promotions.length) % promotions.length);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-primary mb-6 text-center">Community Partners</h2>
      
      <div className="relative w-full h-48 rounded-lg overflow-hidden">
        {promotions.map((promo, index) => (
          <div
            key={promo.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className={`w-full h-full ${promo.bgColor} relative`}>
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 flex items-center justify-between p-6 text-white">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{promo.title}</h3>
                  <p className="text-sm opacity-90 mb-4">{promo.description}</p>
                  <button className="bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors inline-flex items-center">
                    Learn More
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </button>
                </div>
                <div 
                  className="w-24 h-24 bg-cover bg-center rounded-lg ml-4 opacity-80"
                  style={{ backgroundImage: `url(${promo.image})` }}
                />
              </div>
            </div>
          </div>
        ))}
        
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-1 rounded-full transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-1 rounded-full transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      
      <div className="flex justify-center space-x-2 mt-4">
        {promotions.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentSlide ? 'bg-primary' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default PromotionCarousel;
