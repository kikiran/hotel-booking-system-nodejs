import { Link } from 'react-router-dom';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-secondary-900 text-white">
      <div className="section-container py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <HiOutlineOfficeBuilding className="text-2xl text-primary-400" />
              <span className="text-xl font-display font-bold">
                Lux<span className="text-accent-400">Stay</span>
              </span>
            </Link>
            <p className="text-secondary-400 text-sm leading-relaxed mb-6">
              Discover the world's finest hotels and resorts. Book your dream stay with confidence and experience luxury like never before.
            </p>
            <div className="flex gap-3">
              {[FiFacebook, FiTwitter, FiInstagram, FiLinkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-secondary-800 hover:bg-primary-600 flex items-center justify-center transition-colors duration-200">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {[
                { name: 'Browse Hotels', path: '/hotels' },
                { name: 'Special Offers', path: '/hotels?featured=true' },
                { name: 'Destinations', path: '/hotels' },
                { name: 'About Us', path: '/contact' },
                { name: 'Contact', path: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-secondary-400 hover:text-white text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2.5">
              {['Help Center', 'Cancellation Policy', 'Safety Resources', 'Privacy Policy', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-secondary-400 hover:text-white text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FiMapPin className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                <span className="text-secondary-400 text-sm">123 Luxury Avenue, New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <span className="text-secondary-400 text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <span className="text-secondary-400 text-sm">support@luxstay.com</span>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="text-sm font-medium text-white mb-2">Subscribe to Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-secondary-800 text-white text-sm px-4 py-2.5 rounded-l-lg border border-secondary-700 focus:outline-none focus:border-primary-500 placeholder-secondary-500"
                />
                <button className="bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium px-4 py-2.5 rounded-r-lg transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-secondary-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-secondary-500 text-sm">
            &copy; {new Date().getFullYear()} LuxStay. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-secondary-500 hover:text-white text-sm transition-colors">Privacy</a>
            <a href="#" className="text-secondary-500 hover:text-white text-sm transition-colors">Terms</a>
            <a href="#" className="text-secondary-500 hover:text-white text-sm transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
