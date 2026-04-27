import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LeadModal from './components/LeadModal';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Testimonials from './pages/Testimonials';
import HelpCenter from './pages/HelpCenter';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';
import FAQ from './pages/FAQ';
import Blog from './pages/Blog';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLeads from './pages/admin/AdminLeads';
import AdminInquiries from './pages/admin/AdminInquiries';
import AdminBlogs from './pages/admin/AdminBlogs';
import { ProtectedAdminRoute } from './utils/ProtectedAdminRoute';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminPath = location.pathname.startsWith('/admin');

  useEffect(() => {
    const handleUnauthorized = () => {
      navigate('/admin/login');
    };

    window.addEventListener('on-unauthorized-admin', handleUnauthorized);
    return () => window.removeEventListener('on-unauthorized-admin', handleUnauthorized);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {!isAdminPath && <Navbar />}
      {!isAdminPath && <LeadModal />}
      
      {/* Page Content */}
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/faq" element={<FAQ />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
          <Route path="/admin/leads" element={<ProtectedAdminRoute><AdminLeads /></ProtectedAdminRoute>} />
          <Route path="/admin/inquiries" element={<ProtectedAdminRoute><AdminInquiries /></ProtectedAdminRoute>} />
          <Route path="/admin/blogs" element={<ProtectedAdminRoute><AdminBlogs /></ProtectedAdminRoute>} />
        </Routes>
      </main>

      {!isAdminPath && <Footer />}
    </div>
  );
}

export default App;