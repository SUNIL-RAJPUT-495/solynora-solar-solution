import React from 'react';
import rahulImg from '../assets/rahul_sharma.png';
import priyaImg from '../assets/priya_verma.png';
import amitImg from '../assets/amit_patel.png';
import snehaImg from '../assets/sneha_gupta.png';

const Testimonials = () => {
  const reviews = [
    {
      name: 'Rahul Sharma',
      role: 'Homeowner',
      text: 'Switching to Solynora was the best decision for our home. Our electricity bill dropped by 85% in the first month!',
      rating: 5,
      image: rahulImg
    },
    {
      name: 'Priya Verma',
      role: 'Business Owner',
      text: 'The commercial installation was seamless. Their team handled everything from permits to final setup with extreme professionalism.',
      rating: 5,
      image: priyaImg
    },
    {
      name: 'Amit Patel',
      role: 'Tech Enthusiast',
      text: 'I love the monitoring app! I can see exactly how much energy I am generating and saving in real-time. Highly recommended.',
      rating: 5,
      image: amitImg
    },
    {
      name: 'Sneha Gupta',
      role: 'Sustainability Advocate',
      text: 'SolarTech is not just a company, they are partners in a greener future. Their support and maintenance are top-notch.',
      rating: 4,
      image: snehaImg
    }
  ];

  return (
    <div className="pt-32 min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-slate-100 py-24 text-center relative overflow-hidden border-b border-slate-200">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03]">
          <div className="absolute top-10 left-10 text-9xl text-slate-900 opacity-20">❝</div>
        </div>
        <h1 className="text-5xl md:text-7xl font-heading font-black text-slate-900 mb-8 tracking-tight relative z-10">
          Client <span className="text-primary">Stories</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed relative z-10">
          Hear from our satisfied customers who have already made the switch to clean, renewable solar energy.
        </p>
      </section>

      {/* Testimonials Grid */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {reviews.map((review, idx) => (
            <div key={idx} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50 relative hover:shadow-2xl transition-all duration-500">
              <div className="flex gap-1 text-primary mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i} className="text-2xl">★</span>
                ))}
              </div>
              <p className="text-xl text-slate-700 leading-relaxed mb-8 font-medium">
                "{review.text}"
              </p>
              <div className="flex items-center gap-5 pt-8 border-t border-slate-50">
                <img src={review.image} alt={review.name} className="w-16 h-16 rounded-2xl object-cover ring-4 ring-slate-50" />
                <div>
                  <h4 className="text-xl font-bold text-slate-900">{review.name}</h4>
                  <p className="text-slate-500 font-medium">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Success Stats */}
      <section className="bg-primary py-20 text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {[
              { label: 'Happy Clients', value: '5,000+' },
              { label: 'Projects Done', value: '7,500+' },
              { label: 'CO2 Reduced', value: '250 Tons' },
              { label: 'Energy Saved', value: '150MW' }
            ].map((stat, idx) => (
              <div key={idx} className="space-y-2">
                <p className="text-4xl md:text-5xl font-heading font-extrabold">{stat.value}</p>
                <p className="text-amber-100 font-bold uppercase tracking-widest text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
