import HeroSection from '../components/HeroSection';
import SolarCalculator from '../components/SolarCalculator';
import Testimonials from './Testimonials';

const Home = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <HeroSection />

      {/* Features Section */}
      <section className="py-24 px-6 container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-slate-900 mb-4">Why Choose Solynora?</h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            We provide world-class solar solutions that are efficient, sustainable, and designed to last for decades.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Huge Savings', icon: '💰', desc: 'Reduce your electricity bills by up to 90% and enjoy significant long-term ROI.' },
            { title: 'Eco-Friendly', icon: '🌍', desc: 'Contribute to a cleaner planet by switching to renewable energy and reducing carbon emissions.' },
            { title: 'Long Warranty', icon: '🛡️', desc: 'We provide up to 25 years of warranty on our panels for your total peace of mind.' }
          ].map((feature, idx) => (
            <div key={idx} className="bg-white p-10 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-all duration-300 group">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">{feature.icon}</div>
              <h3 className="text-2xl font-heading font-bold text-slate-900 mb-4">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Calculator Section with special background */}
      <section className="bg-slate-900 py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-white mb-4">Estimate Your Potential</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Our advanced calculator helps you understand your energy needs and potential savings in seconds.
            </p>
          </div>
          <SolarCalculator />
        </div>
      </section>
      {/* About & Mission Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary font-bold uppercase tracking-wider text-sm mb-4 block">Who We Are</span>
              <h2 className="text-4xl font-heading font-extrabold text-slate-900 mb-6">About Solynora Solar Solutions</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                Solynora Solar Solutions excels in the field of solar installation, providing expert services tailored to meet diverse energy needs. We are dedicated to bringing clean, reliable, and affordable energy to homes and businesses across Rajasthan.
              </p>
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Our Mission</h3>
                <p className="text-slate-600 leading-relaxed">
                  We aim to provide sustainable energy solutions in Rajasthan. Our mission is to harness renewable resources effectively, ensuring that we contribute to a greener planet. By implementing innovative technologies and practices, we strive to empower local communities, reduce carbon footprints, and promote energy efficiency across the region.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-slate-100 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src="/solynora_team.png" 
                  alt="Solynora Team" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-3xl shadow-xl border border-slate-50 hidden md:block">
                <p className="text-4xl font-bold text-primary mb-1">100+</p>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Projects Done</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 text-center mb-16">
          <h2 className="text-4xl font-heading font-extrabold text-slate-900 mb-6">Our Services</h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Expert solar solutions for your energy needs. Our team of professionals is dedicated to providing innovative and sustainable energy solutions that cater to both residential and commercial clients.
          </p>
        </div>

        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Maintenance Service */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden group hover:border-primary/20 transition-all">
            <div className="aspect-video rounded-2xl overflow-hidden mb-8">
              <img 
                src="/solar_maintenance_dausa_1777017026374.png" 
                alt="Solar Maintenance" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Reliable Maintenance</h3>
            <p className="text-slate-600 leading-relaxed mb-6">
              Ensuring that your solar panels operate at peak efficiency and deliver maximum energy output. Our expert team is dedicated to providing thorough inspections, cleaning, and repairs in Rajasthan.
            </p>
            <ul className="space-y-3 mb-8">
              {['Periodic Cleaning', 'System Health Check', 'Efficiency Optimization'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-600">
                  <span className="text-primary font-bold">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Installation Service */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden group hover:border-primary/20 transition-all">
            <div className="aspect-video rounded-2xl overflow-hidden mb-8">
              <img 
                src="/solar_installation_dausa_1777017049528.png" 
                alt="Solar Installation" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Professional Installation</h3>
            <p className="text-slate-600 leading-relaxed mb-6">
              Expert solar panel installation in Dausa. With the sun's abundant energy, installing solar panels not only reduces electricity bills but also contributes to a sustainable environment.
            </p>
            <ul className="space-y-3 mb-8">
              {['Residential Setup', 'Commercial Installation', 'Custom System Design'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-600">
                  <span className="text-primary font-bold">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Success Story / Recent Project */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-slate-900 rounded-[3.5rem] overflow-hidden flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 p-12 lg:p-20">
              <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Success Story</span>
              <h2 className="text-4xl font-heading font-extrabold text-white mb-6">Empowering Homes in Rajasthan</h2>
              <p className="text-lg text-slate-400 leading-relaxed mb-10">
                Check out one of our latest installations in Dausa. This modern home now runs 100% on solar energy, saving the owners over ₹15,000 every month on electricity bills.
              </p>
              <div className="flex gap-8">
                <div>
                  <p className="text-3xl font-bold text-white mb-1">90%</p>
                  <p className="text-sm text-slate-500 uppercase tracking-widest">Bill Reduction</p>
                </div>
                <div className="w-px h-12 bg-slate-800" />
                <div>
                  <p className="text-3xl font-bold text-white mb-1">15kW</p>
                  <p className="text-sm text-slate-500 uppercase tracking-widest">System Size</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 w-full h-full min-h-[400px]">
              <img 
                src="/solar_home.png" 
                alt="Solar Powered Home" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      <Testimonials />
    </div>
  );
};

export default Home;
