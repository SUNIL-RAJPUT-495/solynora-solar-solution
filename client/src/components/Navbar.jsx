import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from "../assets/logo.avif";

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const LinkedInIcon = ({ size = 22 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Blog', path: '/blog' },
  ];

  const isActive = (path) => location.pathname === path;

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      {/* Navbar bar */}
      <nav className="fixed top-0 left-0 right-0 z-[200] glass px-6 py-4 flex justify-between items-center shadow-sm">
        {/* Logo */}
        <Link to="/" onClick={closeMenu} className="flex items-center hover:opacity-80 transition-opacity">
          <img src={logo} alt="Solynora Logo" className="h-11 w-auto object-contain" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 items-center list-none m-0 p-0">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`font-medium transition-all duration-300 relative group ${
                  isActive(link.path) ? 'text-primary' : 'text-slate-600 hover:text-primary'
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                  isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            </li>
          ))}
          <li>
            <Link
              to="/contact"
              className="bg-primary text-white px-6 py-2.5 rounded-full font-bold hover:bg-amber-600 transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              Contact Us
            </Link>
          </li>
          <li className="flex gap-4 items-center ml-2">
            <a href="https://www.instagram.com/solynora/" target="_blank" rel="noopener noreferrer"
              className="text-slate-600 hover:text-[#E4405F] transition-colors" aria-label="Instagram">
              <InstagramIcon />
            </a>
            <a href="https://www.linkedin.com/in/solynora-solar-solutions-a566a1390/" target="_blank" rel="noopener noreferrer"
              className="text-slate-600 hover:text-[#0A66C2] transition-colors" aria-label="LinkedIn">
              <LinkedInIcon />
            </a>
          </li>
        </ul>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-slate-800 text-3xl font-bold hover:text-primary transition-colors focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile Menu Fullscreen Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[150] bg-white flex flex-col items-center justify-center">
          <ul className="flex flex-col gap-8 items-center list-none text-center px-6">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  onClick={closeMenu}
                  className={`text-2xl font-bold transition-all ${
                    isActive(link.path) ? 'text-primary' : 'text-slate-700 hover:text-primary'
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/contact"
                onClick={closeMenu}
                className="inline-block bg-primary text-white px-10 py-4 rounded-full font-bold text-xl hover:bg-amber-600 transition-all shadow-xl"
              >
                Contact Us
              </Link>
            </li>
            <li className="flex gap-6 items-center mt-2">
              <a href="https://www.instagram.com/solynora/" target="_blank" rel="noopener noreferrer"
                className="text-slate-500 hover:text-[#E4405F] transition-colors" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href="https://www.linkedin.com/in/solynora-solar-solutions-a566a1390/" target="_blank" rel="noopener noreferrer"
                className="text-slate-500 hover:text-[#0A66C2] transition-colors" aria-label="LinkedIn">
                <LinkedInIcon size={22} />
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;