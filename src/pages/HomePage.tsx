
import Layout from '../components/Layout';
import AdCarousel from '../components/AdCarousel';
import FeaturedSongs from '../components/FeaturedSongs';
import FeaturedProducts from '../components/FeaturedProducts';
import CountdownTimer from '../components/CountdownTimer';
import ContactUs from '../components/ContactUs';
import PromotionCarousel from '../components/PromotionCarousel';
import { useLanguage } from '../contexts/LanguageContext';

const HomePage = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* Hero Section with Ad Carousel */}
        <section>
          <AdCarousel />
        </section>

        {/* Featured Songs */}
        <section>
          <FeaturedSongs />
        </section>

        {/* Featured Products */}
        <section>
          <FeaturedProducts />
        </section>

        {/* Countdown Timer */}
        <section>
          <CountdownTimer />
        </section>

        {/* Promotion Carousel - External Ads */}
        <section>
          <PromotionCarousel />
        </section>

        {/* Call to Action */}
        <section className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => alert('Donation functionality will be available soon')}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Donate Now
            </button>
            <button className="border border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-lg font-medium transition-colors">
              Donate Later
            </button>
          </div>
        </section>

        {/* Contact Us */}
        <ContactUs />
      </div>
    </Layout>
  );
};

export default HomePage;
