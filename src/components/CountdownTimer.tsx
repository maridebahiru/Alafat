
import { useState, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Set target date (example: Ethiopian New Year)
  const targetDate = new Date('2024-09-11T00:00:00').getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="bg-gradient-to-r from-primary to-secondary-dark text-white rounded-lg p-6">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-2">
          <Calendar className="w-6 h-6 mr-2" />
          <h2 className="text-2xl font-bold">Ethiopian New Year</h2>
        </div>
        <p className="text-secondary opacity-90">Countdown to celebration</p>
      </div>
      
      <div className="grid grid-cols-4 gap-4 text-center">
        <div className="bg-white/10 rounded-lg p-4">
          <div className="text-2xl md:text-3xl font-bold">{timeLeft.days}</div>
          <div className="text-sm opacity-80">Days</div>
        </div>
        <div className="bg-white/10 rounded-lg p-4">
          <div className="text-2xl md:text-3xl font-bold">{timeLeft.hours}</div>
          <div className="text-sm opacity-80">Hours</div>
        </div>
        <div className="bg-white/10 rounded-lg p-4">
          <div className="text-2xl md:text-3xl font-bold">{timeLeft.minutes}</div>
          <div className="text-sm opacity-80">Minutes</div>
        </div>
        <div className="bg-white/10 rounded-lg p-4">
          <div className="text-2xl md:text-3xl font-bold">{timeLeft.seconds}</div>
          <div className="text-sm opacity-80">Seconds</div>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <div className="flex items-center justify-center text-secondary">
          <Clock className="w-4 h-4 mr-1" />
          <span className="text-sm">Join us in celebration</span>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
