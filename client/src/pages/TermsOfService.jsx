const TermsOfService = () => {
  return (
    <div className="pt-32 min-h-screen bg-slate-50">
      <section className="bg-slate-900 py-20 text-center">
        <h1 className="text-5xl font-heading font-extrabold text-white">Terms of Service</h1>
        <p className="text-slate-400 mt-4">Last Updated: April 2026</p>
      </section>

      <section className="py-24 container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-white p-12 md:p-20 rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 prose prose-slate prose-lg">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">1. Agreement to Terms</h2>
          <p className="text-slate-600 leading-relaxed mb-8">
            By accessing or using our services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mb-8">2. Use of Services</h2>
          <p className="text-slate-600 leading-relaxed mb-8">
            You agree to use our services only for lawful purposes and in accordance with these Terms. You are responsible for maintaining the confidentiality of any account information.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mb-8">3. Intellectual Property</h2>
          <p className="text-slate-600 leading-relaxed mb-8">
            All content on our platform, including text, graphics, logos, and software, is the property of SolarTech and is protected by international copyright laws.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mb-8">4. Limitation of Liability</h2>
          <p className="text-slate-600 leading-relaxed">
            In no event shall SolarTech be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of our services.
          </p>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;
