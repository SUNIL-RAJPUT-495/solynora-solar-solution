import React, { useState, useEffect } from 'react';

const LeadModal = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    
    const hasShown = sessionStorage.getItem('leadModalShown');
    
    if (!hasShown) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        sessionStorage.setItem('leadModalShown', 'true');
      }, 4000); // 4 seconds delay

      return () => clearTimeout(timer);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-md max-h-[90vh] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
        {/* Close Button */}
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors z-20"
        >
          ✕
        </button>

        <div className="overflow-y-auto max-h-[90vh] p-8 md:p-12 no-scrollbar">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-heading font-bold text-slate-900 mb-2">Get a Free Quote</h2>
            <p className="text-slate-500">Fill out the form below and our experts will contact you within 24 hours.</p>
          </div>

          <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setIsVisible(false); alert('Thank you! We will get back to you soon.'); }}>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">Full Name</label>
              <input 
                type="text" 
                required
                placeholder="John Doe" 
                className="w-full px-6 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">Phone Number</label>
              <input 
                type="tel" 
                required
                placeholder="+91 98765 43210" 
                className="w-full px-6 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">Service Needed</label>
              <select className="w-full px-6 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all appearance-none">
                <option>Residential Solar</option>
                <option>Commercial Solar</option>
                <option>Solar Maintenance</option>
              </select>
            </div>

            <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl active:scale-[0.98] mt-4">
              Get Started Now
            </button>
            <p className="text-center text-xs text-slate-400 mt-4">
              By clicking, you agree to our privacy policy and terms.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LeadModal;
