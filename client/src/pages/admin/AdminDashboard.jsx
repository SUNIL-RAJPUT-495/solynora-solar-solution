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
    AlertCircle 
} from 'lucide-react';

const AdminDashboard = () => {
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
            <div className="flex items-center justify-center h-96">
                <div className="w-12 h-12 border-4 border-yellow-500/30 border-t-yellow-500 rounded-full animate-spin" />
            </div>
        </AdminLayout>
    );

    const statCards = [
        { title: 'Total Leads', value: stats?.totalLeads || 0, icon: <Users size={24} />, color: 'bg-blue-500', trend: '+12%' },
        { title: 'New Inquiries', value: stats?.totalInquiries || 0, icon: <MessageSquare size={24} />, color: 'bg-purple-500', trend: '+5%' },
        { title: 'Active Blogs', value: stats?.totalBlogs || 0, icon: <FileText size={24} />, color: 'bg-green-500', trend: '0%' },
    ];

    return (
        <AdminLayout>
            <div className="space-y-10">
                {/* Welcome Header */}
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
                    <p className="text-slate-400">Here's what's happening with Solynora Solar today.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {statCards.map((card, idx) => (
                        <div key={idx} className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem] relative overflow-hidden group hover:border-yellow-500/50 transition-all duration-500">
                            <div className={`absolute top-0 right-0 w-32 h-32 ${card.color}/10 blur-[60px] rounded-full -mr-16 -mt-16`} />
                            
                            <div className="flex items-center justify-between mb-6">
                                <div className={`p-4 rounded-2xl ${card.color}/20 text-white shadow-xl`}>
                                    {card.icon}
                                </div>
                                <span className="text-xs font-bold px-3 py-1 bg-slate-800 rounded-full text-slate-400 border border-slate-700">
                                    {card.trend}
                                </span>
                            </div>

                            <div>
                                <h3 className="text-slate-400 font-medium mb-1">{card.title}</h3>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-bold text-white">{card.value}</span>
                                    <span className="text-slate-600 text-sm font-medium">this month</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Recent Activity Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                    {/* Recent Leads */}
                    <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden">
                        <div className="p-8 border-b border-slate-800 flex items-center justify-between">
                            <h2 className="text-xl font-bold flex items-center gap-3">
                                <Clock className="text-yellow-500" size={20} />
                                Recent Leads
                            </h2>
                            <button className="text-sm font-bold text-yellow-500 hover:text-yellow-400 transition-colors">View All</button>
                        </div>
                        <div className="divide-y divide-slate-800">
                            {recentLeads.length > 0 ? recentLeads.map((lead) => (
                                <div key={lead._id} className="p-6 flex items-center justify-between hover:bg-slate-800/30 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center text-xl font-bold text-blue-400">
                                            {lead.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-white">{lead.name}</p>
                                            <p className="text-sm text-slate-500">{lead.service}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="hidden md:block text-right">
                                            <p className="text-sm font-bold text-white">{lead.phone}</p>
                                            <p className="text-xs text-slate-600">{new Date(lead.createdAt).toLocaleDateString()}</p>
                                        </div>
                                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                                            lead.status === 'new' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'
                                        }`}>
                                            {lead.status}
                                        </span>
                                    </div>
                                </div>
                            )) : (
                                <div className="p-10 text-center text-slate-500">No recent leads found.</div>
                            )}
                        </div>
                    </div>

                    {/* Recent Inquiries */}
                    <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden">
                        <div className="p-8 border-b border-slate-800 flex items-center justify-between">
                            <h2 className="text-xl font-bold flex items-center gap-3">
                                <MessageSquare className="text-purple-500" size={20} />
                                Recent Inquiries
                            </h2>
                            <button className="text-sm font-bold text-yellow-500 hover:text-yellow-400 transition-colors">View All</button>
                        </div>
                        <div className="divide-y divide-slate-800">
                            {recentInquiries.length > 0 ? recentInquiries.map((inquiry) => (
                                <div key={inquiry._id} className="p-6 flex items-center justify-between hover:bg-slate-800/30 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center text-xl font-bold text-purple-400">
                                            {inquiry.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-white">{inquiry.name}</p>
                                            <p className="text-sm text-slate-500 line-clamp-1">{inquiry.subject}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="hidden md:block text-right">
                                            <p className="text-sm font-bold text-white">{inquiry.email}</p>
                                            <p className="text-xs text-slate-600">{new Date(inquiry.createdAt).toLocaleDateString()}</p>
                                        </div>
                                        {inquiry.status === 'new' ? (
                                            <AlertCircle size={20} className="text-yellow-500" />
                                        ) : (
                                            <CheckCircle2 size={20} className="text-green-500" />
                                        )}
                                    </div>
                                </div>
                            )) : (
                                <div className="p-10 text-center text-slate-500">No recent inquiries found.</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
