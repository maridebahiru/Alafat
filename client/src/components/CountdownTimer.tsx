import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const CountdownTimer = () => {
  const { language } = useLanguage();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set target date for Melody of Meriad event - January 7, 2026
    const targetDate = new Date('2026-01-07T00:00:00');

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const title = language === 'am' ? 'የአላፋት ዝማሬ' : 'Melody of Meriad';

  return (
    <div className="bg-gradient-to-r from-primary to-secondary-dark text-white rounded-lg p-6 shadow-lg">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
      </div>
      
      <div className="grid grid-cols-4 gap-4 text-center">
        <div className="bg-white bg-opacity-20 rounded-lg p-3">
          <div className="text-2xl font-bold text-secondary">{timeLeft.days}</div>
          <div className="text-xs opacity-80">Days</div>
        </div>
        <div className="bg-white bg-opacity-20 rounded-lg p-3">
          <div className="text-2xl font-bold text-secondary">{timeLeft.hours}</div>
          <div className="text-xs opacity-80">Hours</div>
        </div>
        <div className="bg-white bg-opacity-20 rounded-lg p-3">
          <div className="text-2xl font-bold text-secondary">{timeLeft.minutes}</div>
          <div className="text-xs opacity-80">Minutes</div>
        </div>
        <div className="bg-white bg-opacity-20 rounded-lg p-3">
          <div className="text-2xl font-bold text-secondary">{timeLeft.seconds}</div>
          <div className="text-xs opacity-80">Seconds</div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
