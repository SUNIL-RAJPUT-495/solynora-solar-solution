const FAQ = () => {
  const faqs = [
    {
      q: 'What is solar energy?',
      a: 'Solar energy is harnessed from sunlight.'
    },
    {
      q: 'How does installation work?',
      a: 'We assess your site and install panels efficiently.'
    },
    {
      q: 'What maintenance is required?',
      a: 'Regular cleaning and inspection ensure optimal performance. We offer comprehensive maintenance plans.'
    },
    {
      q: 'Are there financing options?',
      a: 'Yes, we provide flexible financing options including solar loans and EMI plans to make solar energy accessible for everyone.'
    },
    {
      q: 'Is solar energy cost-effective?',
      a: 'Yes, it significantly reduces electricity bills.'
    }
  ];

  return (
    <div className="pt-32 min-h-screen bg-slate-50">
      <section className="bg-slate-900 py-24 text-center">
        <h1 className="text-5xl font-heading font-extrabold text-white mb-6">Frequently Asked Questions</h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Everything you need to know about switching to solar energy.
        </p>
      </section>

      <section className="py-24 container mx-auto px-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, idx) => (
            <details key={idx} className="group bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden transition-all duration-300 open:ring-2 open:ring-primary">
              <summary className="flex items-center justify-between p-8 cursor-pointer list-none">
                <h3 className="text-xl font-bold text-slate-900">{faq.q}</h3>
                <span className="text-2xl text-primary transition-transform group-open:rotate-180">↓</span>
              </summary>
              <div className="px-8 pb-8 text-slate-600 leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FAQ;
