const PrivacyPolicy = () => {
  return (
    <div className="pt-32 min-h-screen bg-slate-50">
      <section className="bg-slate-900 py-20 text-center">
        <h1 className="text-5xl font-heading font-extrabold text-white">Privacy Policy</h1>
        <p className="text-slate-400 mt-4">Last Updated: April 2026</p>
      </section>

      <section className="py-24 container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-white p-12 md:p-20 rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 prose prose-slate prose-lg">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">1. Information We Collect</h2>
          <p className="text-slate-600 leading-relaxed mb-8">
            We collect information that you provide directly to us when you request a quote, sign up for our newsletter, or contact our support team. This may include your name, email address, phone number, and physical address.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mb-8">2. How We Use Your Information</h2>
          <p className="text-slate-600 leading-relaxed mb-8">
            The information we collect is used to provide and improve our services, communicate with you about your installation, send you marketing materials (if you've opted in), and ensure the security of our platform.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mb-8">3. Data Security</h2>
          <p className="text-slate-600 leading-relaxed mb-8">
            We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mb-8">4. Your Rights</h2>
          <p className="text-slate-600 leading-relaxed">
            You have the right to access, correct, or delete your personal information. If you wish to exercise these rights, please contact us at privacy@solartech.com.
          </p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
