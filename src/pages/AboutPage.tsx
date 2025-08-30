
import Layout from '../components/Layout';
import { ShootingStars } from '../components/ui/shooting-stars';
import { useLanguage } from '../contexts/LanguageContext';

const AboutPage = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        {/* Hero Section with Shooting Stars Background */}
        <section className="bg-primary text-white rounded-lg relative overflow-hidden min-h-[60vh] mb-8">
          {/* Background with stars */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15)_0%,rgba(0,0,0,0)_80%)]" />
            <div className="stars absolute inset-0" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('nav.about')}</h1>
            <p className="text-lg md:text-xl text-secondary opacity-90 max-w-3xl mx-auto">
              A vibrant Ethiopian Orthodox Christian community dedicated to preserving our faith, 
              culture, and traditions through music, fellowship, and service.
            </p>
          </div>

          {/* Multiple shooting star layers with different colors and speeds */}
          <ShootingStars 
            starColor="hsl(var(--secondary))" 
            trailColor="hsl(var(--secondary) / 0.3)" 
            minSpeed={15} 
            maxSpeed={35} 
            minDelay={1000} 
            maxDelay={3000} 
          />
          <ShootingStars 
            starColor="hsl(var(--secondary-dark))" 
            trailColor="hsl(var(--secondary-dark) / 0.2)" 
            minSpeed={10} 
            maxSpeed={25} 
            minDelay={2000} 
            maxDelay={4000} 
          />
          <ShootingStars 
            starColor="rgba(255,255,255,0.8)" 
            trailColor="rgba(255,255,255,0.2)" 
            minSpeed={20} 
            maxSpeed={40} 
            minDelay={1500} 
            maxDelay={3500} 
          />

          <style jsx>{`
            .stars {
              background-image: 
                radial-gradient(2px 2px at 20px 30px, #eee, rgba(0,0,0,0)),
                radial-gradient(2px 2px at 40px 70px, #fff, rgba(0,0,0,0)),
                radial-gradient(2px 2px at 50px 160px, #ddd, rgba(0,0,0,0)),
                radial-gradient(2px 2px at 90px 40px, #fff, rgba(0,0,0,0)),
                radial-gradient(2px 2px at 130px 80px, #fff, rgba(0,0,0,0)),
                radial-gradient(2px 2px at 160px 120px, #ddd, rgba(0,0,0,0));
              background-repeat: repeat;
              background-size: 200px 200px;
              animation: twinkle 5s ease-in-out infinite;
              opacity: 0.5;
            }
            
            @keyframes twinkle {
              0% { opacity: 0.5; }
              50% { opacity: 0.8; }
              100% { opacity: 0.5; }
            }
          `}</style>
        </section>

        {/* Mission & Vision */}
        <section className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-primary mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To strengthen the Ethiopian Orthodox Christian community through spiritual guidance, 
              cultural preservation, and meaningful connections. We strive to create a welcoming 
              environment where faith flourishes and traditions are passed down to future generations.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-primary mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              To be a beacon of faith and unity in our community, fostering spiritual growth, 
              cultural awareness, and social responsibility. We envision a future where our 
              traditions continue to inspire and guide generations to come.
            </p>
          </div>
        </section>

        {/* Our Location */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-primary text-center mb-8">Our Location</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 mb-6 text-center">
              Visit us at our location in Addis Ababa.
            </p>
            <div className="aspect-video w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.8543!2d38.7578!3d9.0192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b859b7c3c8f3d%3A0x8b5f5f5f5f5f5f5f!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1234567890123"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              ></iframe>
            </div>
            <div className="mt-4 text-center">
              <a
                href="https://maps.app.goo.gl/WhVZsjJbd1BmKovQ8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                View on Google Maps
              </a>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-primary text-center mb-6">Our Story</h2>
          <div className="max-w-4xl mx-auto text-gray-600 leading-relaxed space-y-4">
            <p>
              Our organization was founded with a deep commitment to preserving and celebrating 
              the rich traditions of the Ethiopian Orthodox Church. Our journey began with a simple 
              vision: to create a space where faith, culture, and community could flourish together.
            </p>
            <p>
              Today, we serve as a vital resource for Ethiopian Orthodox Christians, offering sacred 
              music, educational materials, and community support. Through our digital platform, we 
              connect believers worldwide, sharing the beauty of our traditions and strengthening 
              our collective faith.
            </p>
            <p>
              We believe that by honoring our past and embracing the future, we can continue to be 
              a source of spiritual nourishment and cultural pride for generations to come.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-primary text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
          <p className="text-secondary mb-6 max-w-2xl mx-auto">
            Be part of our mission to preserve and celebrate Ethiopian Orthodox traditions. 
            Together, we can strengthen our faith and community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/donate"
              className="bg-secondary text-primary px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors inline-block"
            >
              Support Our Mission
            </a>
            <a 
              href="/"
              className="border border-secondary text-secondary hover:bg-secondary hover:text-primary px-6 py-3 rounded-lg font-medium transition-colors inline-block"
            >
              Explore Our Content
            </a>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AboutPage;
