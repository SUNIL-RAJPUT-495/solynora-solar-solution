const Services = () => {
  return (
    <div className="pt-24 min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-slate-900 py-20 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <h1 className="text-5xl font-heading font-extrabold text-white mb-4 relative z-10">Our Services</h1>
        <p className="text-lg  text-slate-400 max-w-2xl mx-auto relative z-10">
          Expert solar solutions for your needs. Our team of dedicated professionals is here to assist you with personalized energy solutions that fit your lifestyle. Whether you are looking to reduce your energy bill, minimize your carbon footprint, or invest in sustainable energy, we offer a range of services tailored to meet your specific requirements. Let us help you harness the power of the sun for a greener tomorrow.
        </p>
      </section>

      {/* Main Services Grid */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: 'Residential Solar',
              icon: '🏠',
              desc: 'Transform your home into a clean power station. Save on bills and increase your property value.',
              features: ['Zero Down Options', '24/7 Monitoring', 'Smart Battery Ready']
            },
            {
              title: 'Commercial Solar',
              icon: '🏢',
              desc: 'Reduce operational costs and show your commitment to sustainability with commercial-grade systems.',
              features: ['Tax Benefits', 'Scalable Design', 'Fast Payback Period']
            },
            {
              title: 'Maintenance',
              icon: '🛠️',
              desc: 'Keep your solar system running at peak performance with our expert maintenance and cleaning services.',
              features: ['Panel Cleaning', 'Health Checks', 'Repair Services']
            }
          ].map((service, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-10 border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-all duration-300">
              <div className="text-6xl mb-6">{service.icon}</div>
              <h3 className="text-2xl font-heading font-bold text-slate-900 mb-4">{service.title}</h3>
              <p className="text-slate-500 mb-8 leading-relaxed">{service.desc}</p>
              <ul className="space-y-3">
                {service.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                    <span className="text-secondary">✓</span> {f}
                  </li>
                ))}
              </ul>
              <button className="mt-10 w-full py-4 border-2 border-slate-900 rounded-2xl font-bold hover:bg-slate-900 hover:text-white transition-all">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Why Us Section */}
      <section className="bg-slate-900 py-24 text-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1508514177221-18d14037b43f?q=80&w=2072&auto=format&fit=crop"
                alt="Tech"
                className="rounded-3xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="md:w-1/2 space-y-8">
              <h2 className="text-4xl font-heading font-bold leading-tight">Advanced Solar Technology for Modern Living</h2>
              <p className="text-lg text-slate-400">
                We use the latest N-type bifacial panels and high-efficiency inverters to ensure you get the maximum power from every ray of sunlight.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-primary text-3xl font-bold mb-1">22.5%</h4>
                  <p className="text-sm text-slate-500 uppercase tracking-widest">Cell Efficiency</p>
                </div>
                <div>
                  <h4 className="text-secondary text-3xl font-bold mb-1">98.5%</h4>
                  <p className="text-sm text-slate-500 uppercase tracking-widest">Inverter Peak</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-heading font-extrabold text-slate-900 mb-4">Our Featured Projects</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">Witness the transformation of energy through our latest installations.</p>
          </div>

          <div className="space-y-16">
            {/* Top 2 Images Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="overflow-hidden rounded-[2.5rem] shadow-xl group">
                <img 
                  src="https://images.unsplash.com/photo-1509391141513-394dd9625c0e?q=80&w=2070&auto=format&fit=crop" 
                  alt="Solar Installation 1" 
                  className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="overflow-hidden rounded-[2.5rem] shadow-xl group">
                <img 
                  src="/solar_hero_premium_1777009573420.png" 
                  alt="Solar Installation 2" 
                  className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </div>

            {/* Content & New Generated Image */}
            <div className="flex flex-col lg:flex-row items-center gap-16 bg-slate-50 rounded-[3rem] p-10 md:p-16 border border-slate-100 shadow-sm">
              <div className="lg:w-1/2 space-y-6">
                <h3 className="text-4xl font-heading font-bold text-slate-900">Rooftop Solar Solutions</h3>
                <p className="text-lg text-slate-600 leading-relaxed italic border-l-4 border-primary pl-6">
                  "Efficient energy solutions are essential for sustainable development and significantly contribute to reducing costs. By utilizing innovative technology and adopting renewable resources, we can create a cleaner environment while meeting our energy needs."
                </p>
                <p className="text-slate-500 leading-relaxed">
                  In today's world, it is crucial to invest in these solutions to ensure a brighter and more stable future for generations to come. Our team ensures every installation meets the highest safety and efficiency standards.
                </p>
                <button className="bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-95">
                  View Full Case Study
                </button>
              </div>
              <div className="lg:w-1/2 relative">
                <div className="absolute -inset-4 bg-primary/10 rounded-[2.5rem] blur-2xl" />
                <img 
                  src="/solar_mechanics_working_1777011237096.png" 
                  alt="Mechanics at Work" 
                  className="relative rounded-[2.5rem] shadow-2xl w-full object-cover aspect-video"
                />
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 shadow-lg">
                  <p className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Live Installation Team
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Services;
