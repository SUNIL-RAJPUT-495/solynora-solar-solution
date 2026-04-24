const HelpCenter = () => {
  const categories = [
    { title: 'Getting Started', icon: '🚀', topics: ['Switching to Solar', 'Choosing Panels', 'Cost Estimations'] },
    { title: 'Technical Support', icon: '🛠️', topics: ['Monitoring App', 'Inverter Issues', 'Panel Maintenance'] },
    { title: 'Billing & Payments', icon: '💳', topics: ['Tax Credits', 'Financing Options', 'Invoices'] },
    { title: 'General Info', icon: 'ℹ️', topics: ['Warranties', 'Sustainability', 'Global Impact'] }
  ];

  return (
    <div className="pt-32 min-h-screen bg-slate-50">
      <section className="bg-slate-900 py-24 text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-heading font-extrabold text-white mb-8">Help Center</h1>
          <div className="max-w-2xl mx-auto relative">
            <input 
              type="text" 
              placeholder="Search for help..." 
              className="w-full px-8 py-5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:ring-2 focus:ring-primary outline-none transition-all text-lg backdrop-blur-md"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary text-slate-900 px-6 py-2 rounded-xl font-bold">
              Search
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, idx) => (
            <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-all duration-500">
              <div className="text-5xl mb-6">{cat.icon}</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">{cat.title}</h3>
              <ul className="space-y-3">
                {cat.topics.map((topic) => (
                  <li key={topic}>
                    <a href="#" className="text-slate-500 hover:text-primary transition-colors flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-slate-200 rounded-full" />
                      {topic}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 bg-white border-t border-slate-100">
        <div className="container mx-auto px-6 text-center">
          <p className="text-lg text-slate-600">
            Can't find what you're looking for? <a href="/contact" className="text-primary font-bold hover:underline">Contact Support</a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default HelpCenter;
