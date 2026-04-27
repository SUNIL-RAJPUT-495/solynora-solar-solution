import React, { useState } from 'react';
import axios from 'axios';
import { baseURL } from '../common/SummerAPI';

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${baseURL}/api/inquiries`, formData);
      alert('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
    } catch (err) {
      alert('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-slate-50">
      <section className="bg-slate-900 py-20 text-center">
        <h1 className="text-5xl font-heading font-extrabold text-white mb-4">Contact Us</h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          We're here to help you power your future. Get in touch with our experts today.
        </p>
      </section>

      <section className="py-24 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/3 space-y-10">
            <div>
              <h2 className="text-3xl font-heading font-bold text-slate-900 mb-6">Get in Touch</h2>
              <p className="text-slate-600 leading-relaxed mb-8">
                Have questions about solar installation or your current system? Our team is available 24/7 to assist you.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { label: 'Call Us', value: '+91-7976458341', icon: '📞' },
                { label: 'Email Us', value: 'solynorasolarsolutions@gmail.com', icon: '✉️' },
                { label: 'Visit Us', value: 'Sainthal mode, near Pandit Kachori Wala, in front of the Jvvnl office, Dausa, Rajasthan 303303', icon: '📍' }
              ].map((info, idx) => (
                <div key={idx} className="flex items-center gap-6 p-6 bg-white rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/50">
                  <div className="text-3xl bg-slate-50 w-16 h-16 flex items-center justify-center rounded-2xl border border-slate-100">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{info.label}</p>
                    <p className="text-lg font-bold text-slate-900">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-2/3 bg-white p-12 rounded-[2.5rem] border border-slate-100 shadow-2xl">
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 uppercase tracking-wider px-2">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe" 
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 uppercase tracking-wider px-2">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com" 
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-wider px-2">Subject</label>
                <select 
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all appearance-none"
                >
                  <option>General Inquiry</option>
                  <option>Residential Installation</option>
                  <option>Commercial Solutions</option>
                  <option>Support & Maintenance</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-wider px-2">Message</label>
                <textarea 
                  rows="5" 
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we help you?" 
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
                ></textarea>
              </div>

              <button 
                disabled={loading}
                className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

