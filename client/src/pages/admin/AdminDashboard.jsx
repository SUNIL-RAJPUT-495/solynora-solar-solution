import React, { useState, useEffect } from 'react';
import AxiosAdmin from '../../utils/axiosAdmin';
import AdminLayout from '../../components/admin/AdminLayout';
import { 
    Users, 
    MessageSquare, 
    FileText, 
    ArrowUpRight, 
    Clock, 
    CheckCircle2, 
    AlertCircle,
    TrendingUp,
    Zap,
    Layout
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [recentLeads, setRecentLeads] = useState([]);
    const [recentInquiries, setRecentInquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await AxiosAdmin.get(`/api/dashboard/stats`);
                setStats(response.data.stats);
                setRecentLeads(response.data.recentLeads);
                setRecentInquiries(response.data.recentInquiries);
            } catch (err) {
                console.error("Dashboard error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) return (
        <AdminLayout>
            <div className="flex items-center justify-center h-[60vh]">
                <div className="w-16 h-16 border-4 border-yellow-500/10 border-t-yellow-500 rounded-full animate-spin" />
            </div>
        </AdminLayout>
    );

    const statCards = [
        { title: 'Total Leads', value: stats?.totalLeads || 0, icon: <Users size={28} />, color: 'bg-blue-500', trend: '+12%', path: '/admin/leads' },
        { title: 'New Inquiries', value: stats?.totalInquiries || 0, icon: <MessageSquare size={28} />, color: 'bg-purple-500', trend: '+5%', path: '/admin/inquiries' },
        { title: 'Active Blogs', value: stats?.totalBlogs || 0, icon: <FileText size={28} />, color: 'bg-green-500', trend: '0%', path: '/admin/blogs' },
    ];

    return (
        <AdminLayout>
            <div className="space-y-12 animate-in fade-in duration-1000">
                {/* Welcome Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="p-2 bg-yellow-500/10 rounded-lg text-yellow-500 font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
                                <Zap size={14} />
                                System Online
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter">Command Center</h1>
                        <p className="text-slate-400 text-lg font-medium">Real-time intelligence for Solynora Solar operations.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="px-6 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-sm font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition-all">
                            Export Report
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                    {statCards.map((card, idx) => (
                        <div 
                            key={idx} 
                            onClick={() => navigate(card.path)}
                            className="bg-slate-900/40 backdrop-blur-3xl border border-slate-800/60 p-4 md:p-10 rounded-[1.5rem] md:rounded-[3rem] relative overflow-hidden group hover:border-yellow-500/40 transition-all duration-500 cursor-pointer shadow-2xl"
                        >
                            <div className={`absolute top-0 right-0 w-40 h-40 ${card.color}/10 blur-[80px] rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-700`} />
                            
                            <div className="flex items-start md:items-center justify-between mb-4 md:mb-8 relative z-10 flex-col md:flex-row gap-3 md:gap-0">
                                <div className={`p-3 md:p-5 rounded-xl md:rounded-[1.5rem] ${card.color}/20 text-white shadow-2xl ring-1 ring-white/10 w-fit`}>
                                    {card.icon}
                                </div>
                                <div className="flex items-center gap-1.5 px-2 md:px-3 py-1 md:py-1.5 bg-slate-950/60 rounded-full text-[8px] md:text-[10px] font-black text-green-400 border border-green-500/10 w-fit">
                                    <TrendingUp size={10} className="md:w-3 md:h-3" />
                                    {card.trend}
                                </div>
                            </div>

                            <div className="relative z-10">
                                <h3 className="text-slate-500 font-black text-[9px] md:text-xs uppercase tracking-widest mb-1 md:mb-2 line-clamp-1">{card.title}</h3>
                                <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-3">
                                    <span className="text-2xl md:text-5xl font-black text-white tracking-tighter">{card.value}</span>
                                    <span className="text-slate-600 text-[9px] md:text-sm font-bold uppercase tracking-widest">Lifetime</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Recent Activity Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                    {/* Recent Leads */}
                    <div className="bg-slate-900/40 backdrop-blur-3xl border border-slate-800/60 rounded-[2rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl">
                        <div className="p-6 md:p-10 border-b border-slate-800/60 flex items-center justify-between bg-slate-950/40">
                            <h2 className="text-lg md:text-xl font-black flex items-center gap-3 text-white tracking-tight">
                                <Users className="text-yellow-500" size={24} />
                                New Arrivals
                            </h2>
                            <button 
                                onClick={() => navigate('/admin/leads')}
                                className="text-xs font-black text-yellow-500 hover:text-yellow-400 uppercase tracking-widest flex items-center gap-2 group"
                            >
                                Explorer
                                <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </div>
                        <div className="divide-y divide-slate-800/40">
                            {recentLeads.length > 0 ? recentLeads.map((lead) => (
                                <div key={lead._id} className="p-5 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors group">
                                    <div className="flex items-center gap-4 md:gap-5">
                                        <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 bg-slate-950/60 rounded-2xl flex items-center justify-center text-xl font-black text-blue-400 border border-white/5 shadow-inner">
                                            {lead.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="font-black text-white text-base md:text-lg group-hover:text-yellow-500 transition-colors">{lead.name}</p>
                                                <span className="px-1.5 py-0.5 bg-blue-500/10 text-blue-500 text-[8px] font-black uppercase tracking-widest rounded-md border border-blue-500/20">Lead</span>
                                                {lead.language === 'hi' && (
                                                    <span className="px-1.5 py-0.5 bg-orange-500/10 text-orange-500 text-[8px] font-black uppercase tracking-widest rounded-md border border-orange-500/20">HI</span>
                                                )}
                                            </div>
                                            <p className="text-xs md:text-sm text-slate-500 font-medium line-clamp-1 italic">"{lead.message || 'No message'}"</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between md:justify-end gap-4 md:gap-8 ml-16 md:ml-0">
                                        <div className="text-left md:text-right">
                                            <p className="text-sm font-black text-white">{lead.phone}</p>
                                            <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mt-1">{new Date(lead.createdAt).toLocaleDateString()}</p>
                                        </div>
                                        <div className={`w-3 h-3 rounded-full shrink-0 ${lead.status === 'new' ? 'bg-blue-500 animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]'}`} />
                                    </div>
                                </div>
                            )) : (
                                <div className="p-20 text-center text-slate-500 font-bold">No recent leads recorded.</div>
                            )}
                        </div>
                    </div>

                    {/* Recent Inquiries */}
                    <div className="bg-slate-900/40 backdrop-blur-3xl border border-slate-800/60 rounded-[2rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl">
                        <div className="p-6 md:p-10 border-b border-slate-800/60 flex items-center justify-between bg-slate-950/40">
                            <h2 className="text-lg md:text-xl font-black flex items-center gap-3 text-white tracking-tight">
                                <MessageSquare className="text-purple-500" size={24} />
                                Intelligence Feed
                            </h2>
                            <button 
                                onClick={() => navigate('/admin/inquiries')}
                                className="text-xs font-black text-yellow-500 hover:text-yellow-400 uppercase tracking-widest flex items-center gap-2 group"
                            >
                                Monitor
                                <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </div>
                        <div className="divide-y divide-slate-800/40">
                            {recentInquiries.length > 0 ? recentInquiries.map((inquiry) => (
                                <div key={inquiry._id} className="p-5 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors group">
                                    <div className="flex items-center gap-4 md:gap-5">
                                        <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 bg-slate-950/60 rounded-2xl flex items-center justify-center text-xl font-black text-purple-400 border border-white/5 shadow-inner">
                                            {inquiry.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="font-black text-white text-base md:text-lg group-hover:text-yellow-500 transition-colors">{inquiry.name}</p>
                                                <span className="px-1.5 py-0.5 bg-purple-500/10 text-purple-500 text-[8px] font-black uppercase tracking-widest rounded-md border border-purple-500/20">Inquiry</span>
                                            </div>
                                            <p className="text-xs md:text-sm text-slate-500 font-medium line-clamp-1">{inquiry.subject}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between md:justify-end gap-4 md:gap-8 ml-16 md:ml-0">
                                        <div className="text-left md:text-right">
                                            <p className="text-sm font-black text-white">{inquiry.email.split('@')[0]}...</p>
                                            <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mt-1">{new Date(inquiry.createdAt).toLocaleDateString()}</p>
                                        </div>
                                        <div className="shrink-0">
                                            {inquiry.status === 'new' ? (
                                                <AlertCircle size={22} className="text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.3)]" />
                                            ) : (
                                                <CheckCircle2 size={22} className="text-green-500 opacity-50" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )) : (
                                <div className="p-20 text-center text-slate-500 font-bold">No active intelligence feed.</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;

