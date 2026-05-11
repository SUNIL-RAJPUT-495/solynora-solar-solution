import React, { useState, useEffect } from 'react';
import AxiosAdmin from '../../utils/axiosAdmin';
import AdminLayout from '../../components/admin/AdminLayout';
import { MessageSquare, Mail, Search, Trash2, Eye, CheckCircle, Clock, Filter, ArrowRight, User, Hash, Sparkles, X, Phone } from 'lucide-react';

const AdminInquiries = () => {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedInquiry, setSelectedInquiry] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        try {
            const response = await AxiosAdmin.get(`/api/inquiries`);
            setInquiries(response.data.inquiries);
        } catch (err) {
            console.error("Error fetching inquiries:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await AxiosAdmin.put(`/api/inquiries/${id}`, { status: newStatus });
            fetchInquiries();
            if (selectedInquiry?._id === id) setSelectedInquiry({ ...selectedInquiry, status: newStatus });
        } catch (err) {
            console.error("Error updating status:", err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this inquiry?")) return;
        try {
            await AxiosAdmin.delete(`/api/inquiries/${id}`);
            fetchInquiries();
            setIsModalOpen(false);
        } catch (err) {
            console.error("Error deleting inquiry:", err);
        }
    };

    const filteredInquiries = inquiries.filter(inquiry => {
        const matchesSearch = inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             inquiry.subject.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'all' || inquiry.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const openDetail = (inquiry) => {
        setSelectedInquiry(inquiry);
        setIsModalOpen(true);
        if (inquiry.status === 'new') {
            handleStatusUpdate(inquiry._id, 'read');
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-8 animate-in fade-in duration-700">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-yellow-500/10 rounded-xl ring-1 ring-yellow-500/20">
                                <MessageSquare size={20} className="text-yellow-500" />
                            </div>
                            <span className="text-[10px] font-black text-yellow-500/80 uppercase tracking-widest">Support Portal</span>
                        </div>
                        <h1 className="text-3xl font-black text-white mb-1 tracking-tight">Customer Inquiries</h1>
                        <p className="text-slate-400 text-sm">Manage and respond to client inquiries efficiently.</p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-yellow-500 transition-colors" size={16} />
                            <input 
                                type="text" 
                                placeholder="Search by name or subject..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-slate-950/50 border border-slate-800 rounded-xl py-2.5 pl-11 pr-6 text-sm text-white focus:border-yellow-500/50 outline-none transition-all w-full lg:w-64"
                            />
                        </div>
                        <select 
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="bg-slate-900 border border-slate-800 rounded-xl py-2.5 px-4 text-xs font-black text-slate-400 uppercase tracking-widest outline-none focus:border-yellow-500/50 transition-all"
                        >
                            <option value="all">All</option>
                            <option value="new">New</option>
                            <option value="read">Read</option>
                            <option value="replied">Replied</option>
                        </select>
                    </div>
                </div>

                {/* Table View */}
                <div className="bg-slate-900/40 backdrop-blur-3xl border border-slate-800/60 rounded-[2rem] overflow-hidden shadow-2xl relative">
                    <div className="overflow-x-auto no-scrollbar">
                        <table className="w-full text-left min-w-[1000px] border-separate border-spacing-0">
                            <thead className="sticky top-[73px] z-10 bg-slate-900/95 backdrop-blur-md">
                                <tr className="bg-slate-950/40 border-b border-slate-800/50">
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Sender</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Subject</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Email</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/40">
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="px-8 py-20 text-center">
                                            <div className="w-10 h-10 border-4 border-yellow-500/10 border-t-yellow-500 rounded-full animate-spin mx-auto" />
                                        </td>
                                    </tr>
                                ) : filteredInquiries.length > 0 ? filteredInquiries.map((item) => (
                                    <tr 
                                        key={item._id} 
                                        onClick={() => openDetail(item)}
                                        className="group hover:bg-white/[0.03] bg-slate-900/40 transition-colors cursor-pointer"
                                    >
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center font-black text-slate-900 text-sm shadow-lg shadow-yellow-500/10">
                                                    {item.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-white text-sm group-hover:text-yellow-500 transition-colors">{item.name}</p>
                                                    <span className="text-[10px] text-slate-500 font-bold uppercase">{new Date(item.createdAt).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-sm text-slate-300 font-medium line-clamp-1">{item.subject}</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-sm text-slate-400 font-bold">{item.email}</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border shadow-sm ${
                                                item.status === 'new' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                                                item.status === 'read' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                                'bg-green-500/10 text-green-400 border-green-500/20'
                                            }`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button 
                                                    onClick={(e) => { e.stopPropagation(); handleDelete(item._id); }}
                                                    className="p-2.5 text-slate-600 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" className="px-8 py-20 text-center text-slate-500 font-medium">
                                            No inquiries found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Detail Modal */}
                {isModalOpen && selectedInquiry && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setIsModalOpen(false)} />
                        <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl relative z-10 rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                            <div className="p-6 border-b border-slate-800/60 bg-slate-950/40 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-yellow-500 rounded-2xl flex items-center justify-center font-black text-slate-900 text-xl">
                                        {selectedInquiry.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-black text-white tracking-tight">{selectedInquiry.name}</h2>
                                        <p className="text-xs text-slate-500 font-bold">{selectedInquiry.email}</p>
                                    </div>
                                </div>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-white transition-colors">
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto no-scrollbar">
                                <div className="space-y-2">
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Subject</span>
                                    <h3 className="text-lg font-bold text-white">{selectedInquiry.subject}</h3>
                                </div>
                                <div className="p-6 bg-slate-950/40 rounded-3xl border border-slate-800/50">
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-4">Message</span>
                                    <p className="text-slate-300 italic text-sm leading-relaxed">"{selectedInquiry.message}"</p>
                                </div>
                                <div className="flex items-center justify-between pt-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Received On</span>
                                        <p className="text-xs text-white font-bold">{new Date(selectedInquiry.createdAt).toLocaleString()}</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <button 
                                            onClick={() => handleStatusUpdate(selectedInquiry._id, 'replied')}
                                            className="bg-green-500/10 text-green-500 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-green-500 hover:text-white transition-all"
                                        >
                                            Mark Answered
                                        </button>
                                        <a 
                                            href={`mailto:${selectedInquiry.email}?subject=Re: ${selectedInquiry.subject}`}
                                            className="bg-yellow-500 text-slate-900 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-yellow-400 transition-all flex items-center gap-2"
                                        >
                                            <Mail size={14} />
                                            Reply
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default AdminInquiries;
