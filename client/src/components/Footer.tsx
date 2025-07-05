import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-6">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-secondary">About Alafat</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Ethiopian Orthodox Christian community dedicated to faith, worship, and service. 
              Join us in our mission to strengthen our community through music and fellowship.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-secondary">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/songs" className="text-gray-300 hover:text-secondary transition-colors">Sacred Songs</a></li>
              <li><a href="/shop" className="text-gray-300 hover:text-secondary transition-colors">Shop</a></li>
              <li><a href="/donate" className="text-gray-300 hover:text-secondary transition-colors">Donate</a></li>
              <li><a href="#" className="text-gray-300 hover:text-secondary transition-colors">About Us</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-secondary">Contact</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Mail size={14} className="text-secondary" />
                <span className="text-gray-300">maramawitdereje93@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={14} className="text-secondary" />
                <span className="text-gray-300">+251939186449</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={14} className="text-secondary" />
                <span className="text-gray-300">Dire Dawa, Ethiopia</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-secondary">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                <Instagram size={20} />
              </a>
            </div>
            <div className="mt-4">
              <p className="text-xs text-gray-400">
                Subscribe to our newsletter for updates
              </p>
              <div className="mt-2 flex">
                <input 
                  type="email" 
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 text-xs bg-gray-800 text-white rounded-l-md border border-gray-700 focus:outline-none focus:border-secondary"
                />
                <button className="px-3 py-2 bg-secondary text-primary text-xs font-medium rounded-r-md hover:bg-secondary/90 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-400">
            © 2024 Alafat Registration. All rights reserved. | Built with faith and dedication.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
