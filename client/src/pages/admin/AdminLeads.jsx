import React, { useState, useEffect } from 'react';
import AxiosAdmin from '../../utils/axiosAdmin';
import AdminLayout from '../../components/admin/AdminLayout';
import { Users, Search, Filter, Trash2, ExternalLink, ChevronRight, Phone } from 'lucide-react';

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
        lead.service.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AdminLayout>
            <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Lead Management</h1>
                        <p className="text-sm md:text-base text-slate-400">Manage and track your solar project leads from here.</p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                        <div className="relative flex-1 sm:flex-none">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input 
                                type="text" 
                                placeholder="Search leads..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="bg-slate-900 border border-slate-800 rounded-2xl py-3 pl-12 pr-6 text-sm text-white focus:border-yellow-500 outline-none transition-all w-full lg:w-80"
                            />
                        </div>
                    </div>
                </div>

                {/* Desktop Leads Table */}
                <div className="hidden md:block bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-950/50 border-b border-slate-800">
                                    <th className="px-8 py-6 text-xs font-bold text-slate-500 uppercase tracking-widest">Client Name</th>
                                    <th className="px-8 py-6 text-xs font-bold text-slate-500 uppercase tracking-widest">Service Interested</th>
                                    <th className="px-8 py-6 text-xs font-bold text-slate-500 uppercase tracking-widest">Contact Info</th>
                                    <th className="px-8 py-6 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                                    <th className="px-8 py-6 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="px-8 py-20 text-center">
                                            <div className="w-10 h-10 border-4 border-yellow-500/30 border-t-yellow-500 rounded-full animate-spin mx-auto" />
                                        </td>
                                    </tr>
                                ) : filteredLeads.length > 0 ? filteredLeads.map((lead) => (
                                    <tr key={lead._id} className="group hover:bg-slate-800/30 transition-colors">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center font-bold text-yellow-500">
                                                    {lead.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-white">{lead.name}</p>
                                                    <p className="text-xs text-slate-500">{new Date(lead.createdAt).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-sm text-slate-300 font-medium">{lead.service}</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2 text-slate-400 hover:text-yellow-500 transition-colors cursor-pointer">
                                                <Phone size={14} />
                                                <span className="text-sm font-bold">{lead.phone}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <select 
                                                value={lead.status}
                                                onChange={(e) => handleStatusUpdate(lead._id, e.target.value)}
                                                className={`text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full outline-none appearance-none border transition-all cursor-pointer ${
                                                    lead.status === 'new' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                                    lead.status === 'contacted' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                                                    lead.status === 'converted' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                                    'bg-slate-700/50 text-slate-400 border-slate-600'
                                                }`}
                                            >
                                                <option value="new">New</option>
                                                <option value="contacted">Contacted</option>
                                                <option value="converted">Converted</option>
                                                <option value="closed">Closed</option>
                                            </select>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button 
                                                onClick={() => handleDelete(lead._id)}
                                                className="p-3 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" className="px-8 py-20 text-center text-slate-500">
                                            No leads found matching your search.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Mobile Leads Cards */}
                <div className="md:hidden space-y-4">
                    {loading ? (
                        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center">
                            <div className="w-10 h-10 border-4 border-yellow-500/30 border-t-yellow-500 rounded-full animate-spin mx-auto" />
                        </div>
                    ) : filteredLeads.length > 0 ? filteredLeads.map((lead) => (
                        <div key={lead._id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4">
                                <button 
                                    onClick={() => handleDelete(lead._id)}
                                    className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center font-bold text-yellow-500 text-lg">
                                    {lead.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-bold text-white text-lg">{lead.name}</p>
                                    <p className="text-xs text-slate-500">{new Date(lead.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800/50">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Service</p>
                                    <p className="text-sm text-slate-300 font-medium">{lead.service}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Phone</p>
                                    <div className="flex items-center gap-2 text-slate-400">
                                        <Phone size={12} />
                                        <span className="text-sm font-bold">{lead.phone}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-800/50 flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Status</p>
                                    <div className="relative">
                                        <select 
                                            value={lead.status}
                                            onChange={(e) => handleStatusUpdate(lead._id, e.target.value)}
                                            className={`text-[10px] font-bold uppercase tracking-wider px-4 py-2 rounded-full outline-none appearance-none border transition-all cursor-pointer ${
                                                lead.status === 'new' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                                lead.status === 'contacted' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                                                lead.status === 'converted' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                                'bg-slate-700/50 text-slate-400 border-slate-600'
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
                        </div>
                    )) : (
                        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-500">
                            No leads found matching your search.
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminLeads;
