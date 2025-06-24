
import { useState, useEffect } from 'react';
import { Star, Gift, Calendar, Users } from 'lucide-react';

const PromotionCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const promotions = [
    {
      id: 1,
      icon: <Star className="w-6 h-6" />,
      title: "Special Festival Discount",
      description: "Get 25% off on all spiritual items during Timkat celebration",
      color: "bg-gradient-to-r from-yellow-500 to-orange-500"
    },
    {
      id: 2,
      icon: <Gift className="w-6 h-6" />,
      title: "Free Shipping Weekend",
      description: "Free delivery on orders over $50. Limited time offer!",
      color: "bg-gradient-to-r from-green-500 to-teal-500"
    },
    {
      id: 3,
      icon: <Calendar className="w-6 h-6" />,
      title: "Weekly Prayer Sessions",
      description: "Join us every Wednesday for community prayer and fellowship",
      color: "bg-gradient-to-r from-blue-500 to-purple-500"
    },
    {
      id: 4,
      icon: <Users className="w-6 h-6" />,
      title: "Youth Ministry Program",
      description: "New youth program starting this month. Ages 13-25 welcome!",
      color: "bg-gradient-to-r from-pink-500 to-red-500"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promotions.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(timer);
  }, [promotions.length]);

  return (
    <div className="relative overflow-hidden bg-white rounded-lg shadow-md h-24">
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {promotions.map((promo) => (
          <div
            key={promo.id}
            className={`min-w-full h-full ${promo.color} flex items-center justify-center text-white px-6`}
          >
            <div className="flex items-center space-x-4 text-center">
              <div className="bg-white bg-opacity-20 p-2 rounded-full">
                {promo.icon}
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">{promo.title}</h3>
                <p className="text-sm opacity-90">{promo.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots indicator */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
        {promotions.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide ? 'bg-white w-4' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default PromotionCarousel;
