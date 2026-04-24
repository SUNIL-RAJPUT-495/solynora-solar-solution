import Testimonials from "./Testimonials";
const About = () => {
  return (
    <div className="pt-24 min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-slate-900 py-20 text-center">
        <h1 className="text-5xl font-heading font-extrabold text-white mb-4">About Solynora</h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Leading the transition to a sustainable world through innovative solar technology.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-heading font-bold text-slate-900">Our Mission</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              At Solynora, we believe that clean energy should be accessible to everyone. Our mission is to accelerate the adoption of solar power by providing high-quality, efficient, and affordable solar solutions for homes and businesses.
            </p>
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-lg">
              <h3 className="text-xl font-bold text-primary mb-2">Sustainable Future</h3>
              <p className="text-slate-500">We are committed to reducing the global carbon footprint and protecting our planet for future generations.</p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/20 rounded-3xl blur-2xl" />
            <img 
              src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=1974&auto=format&fit=crop" 
              alt="Mission" 
              className="relative rounded-3xl shadow-2xl w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-slate-900">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Innovation', desc: 'We constantly push the boundaries of solar technology to deliver better performance.' },
              { title: 'Integrity', desc: 'Transparency and honesty are at the heart of everything we do.' },
              { title: 'Excellence', desc: 'We strive for the highest quality in our products and services.' }
            ].map((value, idx) => (
              <div key={idx} className="p-8 rounded-3xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-xl transition-all duration-300">
                <div className="text-3xl text-primary mb-4 font-bold">0{idx + 1}</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Testimonials />
    </div>
  );
};

export default About;
