import Layout from '../components/Layout';
import AdCarousel from '../components/AdCarousel';
import FeaturedSongs from '../components/FeaturedSongs';
import FeaturedProducts from '../components/FeaturedProducts';
import CountdownTimer from '../components/CountdownTimer';
import ContactUs from '../components/ContactUs';

const HomePage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* Hero Section with Ad Carousel */}
        <section>
          <AdCarousel />
        </section>

        {/* Internal Promotions */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-secondary to-secondary-dark text-primary rounded-lg p-6">
            <h3 className="text-xl font-bold mb-2">Join Our Community</h3>
            <p className="mb-4">Connect with fellow believers and strengthen your faith journey.</p>
            <button className="bg-white text-primary px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors">
              Learn More
            </button>
          </div>
          
          <div className="bg-primary text-white rounded-lg p-6">
            <h3 className="text-xl font-bold mb-2">Weekly Services</h3>
            <p className="mb-4 text-secondary opacity-90">Join us every Sunday for worship and fellowship.</p>
            <button className="bg-secondary text-primary px-4 py-2 rounded-md font-medium hover:bg-secondary/90 transition-colors">
              View Schedule
            </button>
          </div>
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

        {/* Call to Action */}
        <section className="bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">Support Alafat Registration</h2>
          <p className="text-gray-600 mb-6">
            Your donations help us continue our mission of faith, community, and service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              Donate Now
            </button>
            <button className="border border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-lg font-medium transition-colors">
              Learn More
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
