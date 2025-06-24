
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactUs = () => {
  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-primary mb-6 text-center">Contact Us</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Get in Touch</h3>
          
          <div className="flex items-center space-x-3">
            <div className="bg-secondary p-2 rounded-full">
              <Mail size={20} className="text-primary" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Email</p>
              <p className="text-gray-600">info@alafatregistration.org</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="bg-secondary p-2 rounded-full">
              <Phone size={20} className="text-primary" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Phone</p>
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="bg-secondary p-2 rounded-full">
              <MapPin size={20} className="text-primary" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Address</p>
              <p className="text-gray-600">123 Orthodox Way<br />City, State 12345</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Office Hours</h3>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Monday - Friday</span>
              <span className="text-gray-900 font-medium">9:00 AM - 5:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Saturday</span>
              <span className="text-gray-900 font-medium">10:00 AM - 3:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Sunday</span>
              <span className="text-gray-900 font-medium">After Service</span>
            </div>
          </div>
          
          <div className="mt-6">
            <button className="w-full bg-primary hover:bg-primary/90 text-white py-3 px-4 rounded-lg font-medium transition-colors">
              Send Message
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
