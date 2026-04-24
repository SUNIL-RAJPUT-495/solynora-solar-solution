const CookiePolicy = () => {
  return (
    <div className="pt-32 min-h-screen bg-slate-50">
      <section className="bg-slate-900 py-20 text-center">
        <h1 className="text-5xl font-heading font-extrabold text-white">Cookie Policy</h1>
        <p className="text-slate-400 mt-4">Last Updated: April 2026</p>
      </section>

      <section className="py-24 container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-white p-12 md:p-20 rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 prose prose-slate prose-lg text-center">
          <div className="text-7xl mb-12 animate-bounce">🍪</div>
          <h2 className="text-3xl font-bold text-slate-900 mb-8">What are cookies?</h2>
          <p className="text-slate-600 leading-relaxed mb-8">
            Cookies are small text files that are stored on your device when you visit a website. They help the website remember your preferences and improve your browsing experience.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mb-8">How we use them</h2>
          <p className="text-slate-600 leading-relaxed mb-8">
            We use essential cookies to keep our site functional, analytical cookies to understand how you use our platform, and marketing cookies to provide you with relevant offers.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mb-8">Managing cookies</h2>
          <p className="text-slate-600 leading-relaxed">
            You can choose to disable cookies through your browser settings. However, please note that some parts of our site may not function properly if cookies are disabled.
          </p>
        </div>
      </section>
    </div>
  );
};

export default CookiePolicy;
