import { useNavigate } from "react-router-dom";
const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
        style={{ 
          backgroundImage: `url('/solar_hero_premium_1777009573420.png')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 text-left">
        <div className="max-w-2xl mt-12">
          <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-white leading-tight mb-6 animate-fade-in">
            Powering the Future with <span className="text-primary">Clean Energy</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-lg leading-relaxed">
            Experience the next generation of solar technology. Save up to 90% on electricity bills while saving the planet.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('openLeadModal'))}
              className="bg-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-amber-600 transition-all shadow-xl hover:shadow-primary/20 active:scale-95"
            >
              Get a Free Quote
            </button>
            <button onClick={() => {navigate("/about")}} className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all active:scale-95">
              Learn More
            </button>
          </div>
          
          {/* Stats or Trust Markers */}
          <div className="mt-12 mb-12 flex gap-8 items-center border-t border-white/10 pt-8">
            <div>
              <p className="text-3xl font-bold text-white">10k+</p>
              <p className="text-slate-400 text-sm">Homes Powered</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">25 yrs</p>
              <p className="text-slate-400 text-sm">Warranty</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">99%</p>
              <p className="text-slate-400 text-sm">Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
