import React, { useState, useEffect } from 'react';
import AxiosAdmin from '../../utils/axiosAdmin';
import AdminLayout from '../../components/admin/AdminLayout';
import { Users, Search, Filter, Trash2, MessageSquare, Phone, Calendar, ChevronRight, MoreHorizontal, User } from 'lucide-react';

const AdminLeads = () => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        try {
            const response = await AxiosAdmin.get(`/api/leads`);
            setLeads(response.data.leads);
        } catch (err) {
            console.error("Error fetching leads:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await AxiosAdmin.put(`/api/leads/${id}`, { status: newStatus });
            fetchLeads();
        } catch (err) {
            console.error("Error updating status:", err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this lead?")) return;
        try {
            await AxiosAdmin.delete(`/api/leads/${id}`);
            fetchLeads();
        } catch (err) {
            console.error("Error deleting lead:", err);
        }
    };

    const filteredLeads = leads.filter(lead => 
        lead.name.toLowerCase().includes(search.toLowerCase()) || 
        lead.phone.includes(search) ||
        (lead.message && lead.message.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <AdminLayout>
            <div className="space-y-10 animate-in fade-in duration-700">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2.5 bg-yellow-500/10 rounded-xl">
                                <Users size={24} className="text-yellow-500" />
                            </div>
                            <span className="text-sm font-bold text-yellow-500/80 uppercase tracking-widest">Growth Tracking</span>
                        </div>
                        <h1 className="text-4xl font-black text-white mb-2 tracking-tight">Project Leads</h1>
                        <p className="text-slate-400 text-lg">Track and manage potential solar installations and client requests.</p>
                    </div>
                    
                    <div className="flex items-center gap-4 bg-slate-900/50 backdrop-blur-md border border-slate-800 p-2 rounded-2xl w-full lg:w-auto">
                        <div className="relative flex-grow lg:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input 
                                type="text" 
                                placeholder="Search by name, phone or message..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="bg-slate-950/50 border border-slate-800 rounded-xl py-3.5 pl-12 pr-6 text-sm text-white focus:border-yellow-500/50 outline-none transition-all w-full"
                            />
                        </div>
                    </div>
                </div>

                {/* Desktop Table View */}
                <div className="hidden lg:block bg-slate-900/40 backdrop-blur-3xl border border-slate-800/60 rounded-[2.5rem] overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto no-scrollbar">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-950/40 border-b border-slate-800/50">
                                    <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Client</th>
                                    <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Message</th>
                                    <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Contact</th>
                                    <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</th>
                                    <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/40">
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="px-10 py-32 text-center">
                                            <div className="w-12 h-12 border-4 border-yellow-500/10 border-t-yellow-500 rounded-full animate-spin mx-auto" />
                                        </td>
                                    </tr>
                                ) : filteredLeads.length > 0 ? filteredLeads.map((lead) => (
                                    <tr key={lead._id} className="group hover:bg-white/[0.02] transition-colors">
                                        <td className="px-10 py-8">
                                            <div className="flex items-center gap-5">
                                                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-[1.25rem] flex items-center justify-center font-black text-slate-900 shadow-lg shadow-yellow-500/10">
                                                    {lead.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-white text-lg group-hover:text-yellow-500 transition-colors">{lead.name}</p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <Calendar size={12} className="text-slate-600" />
                                                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                                                            {new Date(lead.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="max-w-xs xl:max-w-md">
                                                <p className="text-sm text-slate-300 font-medium leading-relaxed line-clamp-2 italic">
                                                    "{lead.message || 'No message provided'}"
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="flex flex-col gap-2">
                                                <a href={`tel:${lead.phone}`} className="flex items-center gap-2.5 text-slate-400 hover:text-yellow-500 transition-colors group/link w-fit">
                                                    <div className="p-1.5 bg-slate-800 rounded-lg group-hover/link:bg-yellow-500/10 transition-colors">
                                                        <Phone size={14} className="group-hover/link:text-yellow-500" />
                                                    </div>
                                                    <span className="text-sm font-black">{lead.phone}</span>
                                                </a>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="relative w-fit">
                                                <select 
                                                    value={lead.status}
                                                    onChange={(e) => handleStatusUpdate(lead._id, e.target.value)}
                                                    className={`text-[10px] font-black uppercase tracking-widest px-5 py-2.5 rounded-xl outline-none appearance-none border transition-all cursor-pointer min-w-[140px] shadow-sm ${
                                                        lead.status === 'new' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                                        lead.status === 'contacted' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                                                        lead.status === 'converted' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                                        'bg-slate-800 text-slate-500 border-slate-700'
                                                    }`}
                                                >
                                                    <option value="new">New Lead</option>
                                                    <option value="contacted">Contacted</option>
                                                    <option value="converted">Converted</option>
                                                    <option value="closed">Closed</option>
                                                </select>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8 text-right">
                                            <button 
                                                onClick={() => handleDelete(lead._id)}
                                                className="p-3 text-slate-600 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all active:scale-90"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" className="px-10 py-32 text-center text-slate-500 font-medium">
                                            No leads found matching your search.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Mobile/Tablet Card View */}
                <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6">
                    {loading ? (
                        <div className="col-span-full py-32 text-center">
                            <div className="w-12 h-12 border-4 border-yellow-500/10 border-t-yellow-500 rounded-full animate-spin mx-auto" />
                        </div>
                    ) : filteredLeads.length > 0 ? filteredLeads.map((lead) => (
                        <div key={lead._id} className="bg-slate-900/40 border border-slate-800/60 rounded-[2.5rem] p-8 space-y-6 shadow-2xl relative overflow-hidden group">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center font-black text-slate-900 text-xl shadow-lg">
                                        {lead.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-black text-white text-xl">{lead.name}</p>
                                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{new Date(lead.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => handleDelete(lead._id)}
                                    className="p-3 text-slate-600 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>

                            <div className="p-6 bg-slate-950/40 rounded-3xl border border-slate-800/50">
                                <div className="flex items-center gap-2 mb-3">
                                    <MessageSquare size={14} className="text-yellow-500" />
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Message</span>
                                </div>
                                <p className="text-slate-300 italic text-sm leading-relaxed">"{lead.message || 'No message provided'}"</p>
                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-6 pt-2">
                                <div className="space-y-2">
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Contact</span>
                                    <a href={`tel:${lead.phone}`} className="flex items-center gap-2.5 text-white font-black text-sm">
                                        <div className="p-1.5 bg-slate-800 rounded-lg">
                                            <Phone size={14} className="text-yellow-500" />
                                        </div>
                                        {lead.phone}
                                    </a>
                                </div>
                                <div className="space-y-2">
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Status</span>
                                    <select 
                                        value={lead.status}
                                        onChange={(e) => handleStatusUpdate(lead._id, e.target.value)}
                                        className={`text-[10px] font-black uppercase tracking-widest px-4 py-2.5 rounded-xl outline-none appearance-none border transition-all ${
                                            lead.status === 'new' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                            lead.status === 'contacted' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                                            lead.status === 'converted' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                            'bg-slate-800 text-slate-500 border-slate-700'
                                        }`}
                                    >
                                        <option value="new">New</option>
                                        <option value="contacted">Contacted</option>
                                        <option value="converted">Converted</option>
                                        <option value="closed">Closed</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="col-span-full py-32 text-center text-slate-500 font-bold bg-slate-900/20 rounded-[3rem] border-2 border-dashed border-slate-800">
                            No leads found matching your search.
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminLeads;

