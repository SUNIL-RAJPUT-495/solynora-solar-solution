import React, { useState, useEffect } from 'react';

const LeadModal = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if modal has already been shown in this session
    const hasShown = sessionStorage.getItem('leadModalShown');
    
    if (!hasShown) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        sessionStorage.setItem('leadModalShown', 'true');
      }, 4000); // 4 seconds delay

      return () => clearTimeout(timer);
    }
  }, []);

  // Listen for manual trigger event
  useEffect(() => {
    const handleOpen = () => setIsVisible(true);
    window.addEventListener('openLeadModal', handleOpen);
    return () => window.removeEventListener('openLeadModal', handleOpen);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-[2px] animate-in fade-in duration-300">
      <div className="relative w-full max-w-sm bg-white rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
        {/* Close Button */}
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

          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsVisible(false); alert('Thank you! We will get back to you soon.'); }}>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">Full Name</label>
              <input 
                type="text" 
                required
                placeholder="Name" 
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">Phone Number</label>
              <input 
                type="tel" 
                required
                placeholder="+91 7976458341" 
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">Service</label>
              <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all appearance-none text-sm">
                <option>Residential Solar</option>
                <option>Commercial Solar</option>
                <option>Maintenance</option>
              </select>
            </div>

            <button className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-bold text-base hover:bg-slate-800 transition-all shadow-lg active:scale-[0.98] mt-2">
              Get Started
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LeadModal;
