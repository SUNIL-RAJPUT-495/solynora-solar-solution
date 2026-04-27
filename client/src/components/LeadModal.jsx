import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '../common/SummerAPI';

const LeadModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'Residential Solar'
  });

  useEffect(() => {
    const hasShown = sessionStorage.getItem('leadModalShown');
    if (!hasShown) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        sessionStorage.setItem('leadModalShown', 'true');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleOpen = () => setIsVisible(true);
    window.addEventListener('openLeadModal', handleOpen);
    return () => window.removeEventListener('openLeadModal', handleOpen);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${baseURL}/api/leads`, formData);
      alert('Thank you! We will get back to you soon.');
      setIsVisible(false);
    } catch (err) {
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-[2px] animate-in fade-in duration-300">
      <div className="relative w-full max-w-sm bg-white rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors z-20"
        >
          ✕
        </button>

        <div className="p-6 md:p-8 no-scrollbar">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-heading font-bold text-slate-900 mb-1">Get a Free Quote</h2>
            <p className="text-sm text-slate-500">Fill out the form and we'll call you back.</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">Full Name</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Name" 
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">Phone Number</label>
              <input 
                type="tel" 
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 7976458341" 
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">Service</label>
              <select 
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all appearance-none text-sm"
              >
                <option>Residential Solar</option>
                <option>Commercial Solar</option>
                <option>Maintenance</option>
              </select>
            </div>

            <button 
              disabled={loading}
              className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-bold text-base hover:bg-slate-800 transition-all shadow-lg active:scale-[0.98] mt-2 flex items-center justify-center gap-2"
            >
              {loading ? 'Submitting...' : 'Get Started'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};


export default LeadModal;
