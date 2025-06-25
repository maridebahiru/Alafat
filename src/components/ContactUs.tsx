
import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // You can add actual form submission logic here
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-primary mb-6 text-center">Contact Us</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="space-y-6">
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

          <div className="mt-6">
            <h4 className="text-md font-semibold text-gray-900 mb-3">Office Hours</h4>
            <div className="space-y-2 text-sm">
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
          </div>
        </div>
        
        {/* Contact Form */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Send us a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject *
              </label>
              <Input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="What is this about?"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message *
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Tell us how we can help you..."
                rows={4}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
            >
              <Send size={18} />
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
