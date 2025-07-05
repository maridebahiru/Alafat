
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const ContactUs = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-primary mb-6 text-center">Contact Us</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="bg-primary/10 p-3 rounded-lg">
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Phone</h3>
              <p className="text-gray-600">+251 xxx xxxx</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="bg-primary/10 p-3 rounded-lg">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Email</h3>
              <p className="text-gray-600">info@alafat.com</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="bg-primary/10 p-3 rounded-lg">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Location</h3>
              <p className="text-gray-600">Addis Ababa, Ethiopia</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-4">
            <MessageCircle className="w-5 h-5 text-primary" />
            <h3 className="font-medium text-gray-900">Send us a message</h3>
          </div>
          
          <form className="space-y-3">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
            />
            <textarea
              rows={3}
              placeholder="Your Message"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
            />
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
