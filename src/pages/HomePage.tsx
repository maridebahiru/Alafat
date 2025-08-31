
import Layout from '../components/Layout';
import AdCarousel from '../components/AdCarousel';
import FeaturedSongs from '../components/FeaturedSongs';
import FeaturedProducts from '../components/FeaturedProducts';
import CountdownTimer from '../components/CountdownTimer';
import ContactUs from '../components/ContactUs';
import PromotionCarousel from '../components/PromotionCarousel';
import { MagnetizeButton } from '../components/ui/magnetize-button';
import { useLanguage } from '../contexts/LanguageContext';

const HomePage = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      {/* Hero Banner Section */}
      <div className="relative min-h-screen bg-gradient-to-b from-amber-50 to-white">
        {/* Background Image */}
        <div className="absolute inset-0 bg-[url('/lovable-uploads/5b00b1cc-42f8-4942-8f55-beb802ec40b4.png')] bg-cover bg-center opacity-20"></div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 pt-20">
          {/* Logo/Emblem */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 mx-auto bg-amber-600 rounded-full flex items-center justify-center mb-4">
              <span className="text-white text-2xl font-bold">☩</span>
            </div>
          </div>

          {/* Main Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-red-900 mb-4 drop-shadow-lg">
              የሙሪያዶች ዜማ
            </h1>
            <p className="text-xl md:text-2xl text-amber-800 font-medium">
              Melody of Myriads
            </p>
          </div>

          {/* Countdown Section */}
          <div className="text-center mb-16">
            <h2 className="text-xl md:text-2xl text-amber-700 font-semibold mb-8">
              The Hymn of Praise is About to Begin
            </h2>
            <CountdownTimer />
          </div>
        </div>
      </div>

      <div className="space-y-16 py-16">
        {/* Featured Songs Section */}
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-red-900 mb-4">Featured Hymns</h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto"></div>
          </div>
          <FeaturedSongs />
        </div>

        {/* Recent Products Section */}
        <div className="bg-gradient-to-r from-amber-50 to-red-50 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-red-900 mb-4">Recent Products</h2>
              <div className="w-24 h-1 bg-amber-600 mx-auto"></div>
            </div>
            <FeaturedProducts />
          </div>
        </div>

        {/* Donation Section */}
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-red-900 mb-4">Support Our Ministry</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Your generous donations help us continue spreading the Orthodox faith through music and community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagnetizeButton 
                className="bg-red-900 hover:bg-red-800 text-white px-8 py-3 text-lg font-semibold"
                particleCount={14}
                attractRadius={50}
              >
                Donate Now
              </MagnetizeButton>
              <MagnetizeButton 
                className="border-2 border-red-900 bg-white text-red-900 hover:bg-red-50 px-8 py-3 text-lg font-semibold"
                particleCount={10}
                attractRadius={40}
              >
                Donate Later
              </MagnetizeButton>
            </div>
          </div>
        </div>

        {/* Promotion Carousel */}
        <PromotionCarousel />

        {/* Contact Section */}
        <div className="bg-red-900 text-white py-16">
          <div className="container mx-auto px-4">
            <ContactUs />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
