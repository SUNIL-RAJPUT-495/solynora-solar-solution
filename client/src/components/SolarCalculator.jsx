import { useState } from 'react';

const SolarCalculator = () => {
  const [billAmount, setBillAmount] = useState('');
  const [result, setResult] = useState(null);

  const calculateSolar = (e) => {
    e.preventDefault();
    if (!billAmount || billAmount <= 0) return;

    const kwRequirement = (billAmount / 1000).toFixed(1);
    const estimatedCost = (kwRequirement * 60000).toLocaleString('en-IN');
    const yearlySavings = (billAmount * 12).toLocaleString('en-IN');

    setResult({ kwRequirement, estimatedCost, yearlySavings });
  };

  return (
    <div className="max-w-4xl mx-auto  py-20">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-100">
        {/* Left Side: Info */}
        <div className="bg-primary p-5 md:w-1/3 text-white flex flex-col justify-center">
          <h2 className="text-3xl font-heading font-bold mb-4">Savings Calculator</h2>
          <p className="text-amber-100 leading-relaxed mb-6">
            Find out how much you can save by switching to solar. Enter your monthly bill to get an instant estimate.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="bg-white/20 p-2 rounded-full text-xl">⚡</span>
              <span>Personalized System Size</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-white/20 p-2 rounded-full text-xl">💰</span>
              <span>Cost Estimation</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form & Results */}
        <div className="p-10 md:w-2/3">
          <form onSubmit={calculateSolar} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wider">
                Average Monthly Electricity Bill (₹)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                <input 
                  type="number" 
                  value={billAmount} 
                  onChange={(e) => setBillAmount(e.target.value)} 
                  placeholder="e.g. 2500" 
                  className="w-full pl-10 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-lg font-semibold"
                />
              </div>
            </div>
            <button 
              type="submit" 
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-lg active:scale-[0.98]"
            >
              Calculate My Savings
            </button>
          </form>

          {result && (
            <div className="mt-10 p-8 bg-emerald-50 rounded-2xl border border-emerald-100 animate-fade-in-up">
              <h3 className="text-xl font-bold text-emerald-900 mb-6 flex items-center gap-2">
                <span className="text-2xl">📈</span> Your Solar Potential
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-emerald-200/50">
                  <p className="text-sm text-slate-500 mb-1">Recommended System</p>
                  <p className="text-2xl font-bold text-slate-900">{result.kwRequirement} <span className="text-lg font-medium text-slate-500">kW</span></p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-emerald-200/50">
                  <p className="text-sm text-slate-500 mb-1">Estimated Yearly Savings</p>
                  <p className="text-2xl font-bold text-emerald-600">₹{result.yearlySavings}</p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-emerald-200/50">
                <p className="text-sm text-slate-500 mb-1">Approximate Investment</p>
                <p className="text-3xl font-extrabold text-slate-900">₹{result.estimatedCost}</p>
              </div>
              <p className="mt-6 text-xs text-emerald-700/60 leading-tight">
                * This is a rough estimate based on average industry rates. Final costs may vary depending on rooftop conditions, panel quality, and local government subsidies.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SolarCalculator;