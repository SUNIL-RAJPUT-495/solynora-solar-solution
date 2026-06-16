import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { baseURL } from '../common/SummerAPI';
import { Languages } from 'lucide-react';

const LeadModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('en'); // 'en' or 'hi'
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  const translations = {
    en: {
      title: "Get a Free Quote",
      subtitle: "Fill out the form and we'll call you back.",
      nameLabel: "Full Name",
      namePlaceholder: "Name",
      phoneLabel: "Mobile Number",
      phonePlaceholder: "+91 0000000000",
      messageLabel: "Message",
      messagePlaceholder: "How can we help you?",
      submitBtn: "Get Started",
      submitting: "Submitting...",
      successMsg: "Thank you! We will get back to you soon.",
      errorMsg: "Something went wrong. Please try again."
    },
    hi: {
      title: "मुफ्त कोट प्राप्त करें",
      subtitle: "फॉर्म भरें और हम आपको वापस कॉल करेंगे।",
      nameLabel: "पूरा नाम",
      namePlaceholder: "नाम लिखें",
      phoneLabel: "मोबाइल नंबर",
      phonePlaceholder: "+91 0000000000",
      messageLabel: "संदेश",
      messagePlaceholder: "हम आपकी कैसे मदद कर सकते हैं?",
      submitBtn: "शुरू करें",
      submitting: "सबमिट हो रहा है...",
      successMsg: "धन्यवाद! हम जल्द ही आपसे संपर्क करेंगे।",
      errorMsg: "कुछ गलत हो गया। कृपया पुन: प्रयास करें।"
    }
  };

  const t = translations[language];

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
    if (formData.phone.length !== 10) {
      toast.error(language === 'en' ? 'Please enter exactly 10 digits for your mobile number.' : 'कृपया 10 अंकों का मान्य मोबाइल नंबर दर्ज करें।');
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${baseURL}/api/leads`, { ...formData, language });
      toast.success(t.successMsg);
      setIsVisible(false);
    } catch (err) {
      toast.error(t.errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-[2px] animate-in fade-in duration-300">
      <div className="relative w-full max-w-sm bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
        
        {/* Header with Language Toggle */}
        <div className="flex items-center justify-between p-4 pb-0">
          <button 
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full text-xs font-bold text-slate-600 hover:bg-slate-200 transition-all border border-slate-200"
          >
            <Languages size={14} className="text-primary" />
            {language === 'en' ? 'हिंदी में बदलें' : 'Switch to English'}
          </button>
          
          <button 
            onClick={() => setIsVisible(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-6 md:p-8 pt-4 no-scrollbar">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-heading font-black text-slate-900 mb-1">{t.title}</h2>
            <p className="text-sm text-slate-500 font-medium">{t.subtitle}</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">{t.nameLabel}</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={t.namePlaceholder} 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all text-sm font-medium"
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">{t.phoneLabel}</label>
              <input 
                type="text" 
                required
                maxLength="10"
                value={formData.phone}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                  setFormData({ ...formData, phone: val });
                }}
                placeholder={t.phonePlaceholder} 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all text-sm font-medium"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">{t.messageLabel}</label>
              <textarea 
                required
                rows="3"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder={t.messagePlaceholder} 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all text-sm font-medium resize-none"
              ></textarea>
            </div>

            <button 
              disabled={loading}
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-base hover:bg-slate-800 transition-all shadow-xl active:scale-[0.98] mt-4 flex items-center justify-center gap-2"
            >
              {loading ? t.submitting : t.submitBtn}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LeadModal;
