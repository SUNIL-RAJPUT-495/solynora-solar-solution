import { Link } from 'react-router-dom';
import logo from '../assets/logo.avif';

const Footer = () => {
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Testimonials', path: '/testimonials' },
  ];

  return (
    <footer className="bg-slate-900 text-slate-400 pt-24 pb-12 border-t border-white/5 mt-auto">
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand & Description */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <img src={logo} alt="Solynora Logo" className="h-12 w-auto object-contain brightness-0 invert" />
            </Link>
            <p className="text-slate-400 leading-relaxed max-w-xs">
              We are dedicated to providing sustainable energy solutions that empower homes and businesses while protecting our planet for future generations.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/solynora/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#E4405F] hover:text-white transition-all shadow-lg"
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a 
                href="https://www.linkedin.com/in/solynora-solar-solutions-a566a1390/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#0A66C2] hover:text-white transition-all shadow-lg"
                aria-label="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h4 className="text-white font-bold text-lg uppercase tracking-widest">Company</h4>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="hover:text-primary transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-slate-700 rounded-full group-hover:bg-primary transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="space-y-6">
            <h4 className="text-white font-bold text-lg uppercase tracking-widest">Support</h4>
            <ul className="space-y-4">
              {[
                { name: 'Help Center', path: '/help-center' },
                { name: 'Privacy Policy', path: '/privacy-policy' },
                { name: 'Terms of Service', path: '/terms-of-service' },
                { name: 'Cookie Policy', path: '/cookie-policy' },
                { name: 'FAQ', path: '/faq' }
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-slate-700 rounded-full group-hover:bg-white transition-colors" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="space-y-6">
            <h4 className="text-white font-bold text-lg uppercase tracking-widest">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <span className="text-xl">📍</span>
                <p>Sainthal mode, near Pandit Kachori Wala, in front of the Jvvnl office, Dausa, Rajasthan 303303</p>
              </div>
              <div className="flex gap-4 items-center">
                <span className="text-xl">📞</span>
                <p>+91-7976458341</p>
              </div>
              <div className="flex gap-4 items-center">
                <span className="text-xl">✉️</span>
                <p>solynorasolarsolutions@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Solar Solutions. All rights reserved. 
          </p>
         
        </div>
      </div>
    </footer>
  );
};

export default Footer;
