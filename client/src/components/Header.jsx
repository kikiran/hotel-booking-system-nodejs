import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiMenu, FiX, FiUser, FiLogOut, FiChevronDown, FiCalendar, FiLayout } from 'react-icons/fi';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';

export default function Header() {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Hotels', path: '/hotels' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="section-container">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2">
            <HiOutlineOfficeBuilding className={`text-2xl lg:text-3xl ${scrolled ? 'text-primary-600' : 'text-white'}`} />
            <span className={`text-xl lg:text-2xl font-display font-bold ${scrolled ? 'text-secondary-900' : 'text-white'}`}>
              Lux<span className={scrolled ? 'text-primary-600' : 'text-accent-400'}>Stay</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  location.pathname === link.path
                    ? scrolled ? 'text-primary-600' : 'text-accent-400'
                    : scrolled ? 'text-secondary-600 hover:text-primary-600' : 'text-white/80 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    scrolled ? 'hover:bg-secondary-100' : 'hover:bg-white/10'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center overflow-hidden">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <FiUser className="text-primary-600" />
                    )}
                  </div>
                  <span className={`text-sm font-medium ${scrolled ? 'text-secondary-800' : 'text-white'}`}>
                    {user.name.split(' ')[0]}
                  </span>
                  <FiChevronDown className={`w-4 h-4 ${scrolled ? 'text-secondary-500' : 'text-white/70'}`} />
                </button>

                {profileOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-secondary-100 py-2 z-50 animate-slide-down">
                      <div className="px-4 py-3 border-b border-secondary-100">
                        <p className="text-sm font-medium text-secondary-900">{user.name}</p>
                        <p className="text-xs text-secondary-500">{user.email}</p>
                      </div>
                      <Link to="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm text-secondary-700 hover:bg-secondary-50 transition-colors">
                        <FiUser className="w-4 h-4" />
                        My Profile
                      </Link>
                      <Link to="/my-bookings" className="flex items-center gap-3 px-4 py-2.5 text-sm text-secondary-700 hover:bg-secondary-50 transition-colors">
                        <FiCalendar className="w-4 h-4" />
                        My Bookings
                      </Link>
                      {user.role === 'admin' && (
                        <Link to="/admin" className="flex items-center gap-3 px-4 py-2.5 text-sm text-secondary-700 hover:bg-secondary-50 transition-colors">
                          <FiLayout className="w-4 h-4" />
                          Admin Dashboard
                        </Link>
                      )}
                      <div className="border-t border-secondary-100 mt-1 pt-1">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors w-full"
                        >
                          <FiLogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${scrolled ? 'text-secondary-700 hover:bg-secondary-100' : 'text-white/90 hover:text-white'}`}>
                  Sign In
                </Link>
                <Link to="/register" className="btn-primary text-sm">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 rounded-lg ${scrolled ? 'text-secondary-700 hover:bg-secondary-100' : 'text-white hover:bg-white/10'}`}
          >
            {mobileOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-secondary-100 shadow-lg animate-slide-down">
          <div className="section-container py-4">
            <nav className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-secondary-700 hover:bg-secondary-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="mt-4 pt-4 border-t border-secondary-100">
              {user ? (
                <div className="space-y-1">
                  <div className="px-4 py-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center overflow-hidden">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                      ) : (
                        <FiUser className="text-primary-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-secondary-900">{user.name}</p>
                      <p className="text-xs text-secondary-500">{user.email}</p>
                    </div>
                  </div>
                  <Link to="/profile" className="block px-4 py-2.5 text-sm text-secondary-700 hover:bg-secondary-50 rounded-lg">My Profile</Link>
                  <Link to="/my-bookings" className="block px-4 py-2.5 text-sm text-secondary-700 hover:bg-secondary-50 rounded-lg">My Bookings</Link>
                  {user.role === 'admin' && (
                    <Link to="/admin" className="block px-4 py-2.5 text-sm text-secondary-700 hover:bg-secondary-50 rounded-lg">Admin Dashboard</Link>
                  )}
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg">
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 px-4">
                  <Link to="/login" className="btn-secondary text-center text-sm">Sign In</Link>
                  <Link to="/register" className="btn-primary text-center text-sm">Sign Up</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
