import React, { useState, useEffect } from 'react';
import AxiosAdmin from '../../utils/axiosAdmin';
import AdminLayout from '../../components/admin/AdminLayout';
import { MessageSquare, Mail, Search, Trash2, Eye, CheckCircle, Clock, Filter, ArrowRight, User, Hash } from 'lucide-react';

const AdminInquiries = () => {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedInquiry, setSelectedInquiry] = useState(null);
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
            setSelectedInquiry(null);
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

    const getStatusBadge = (status) => {
        switch (status) {
            case 'new':
                return <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">New</span>;
            case 'read':
                return <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter bg-blue-500/10 text-blue-500 border border-blue-500/20">Read</span>;
            case 'replied':
                return <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter bg-green-500/10 text-green-500 border border-green-500/20">Replied</span>;
            default:
                return null;
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-10 animate-in fade-in duration-700">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2.5 bg-yellow-500/10 rounded-xl">
                                <MessageSquare size={24} className="text-yellow-500" />
                            </div>
                            <span className="text-sm font-bold text-yellow-500/80 uppercase tracking-widest">Customer Support</span>
                        </div>
                        <h1 className="text-4xl font-black text-white mb-2 tracking-tight">Customer Inquiries</h1>
                        <p className="text-slate-400 text-lg">Manage support requests and general questions with ease.</p>
                    </div>
                    <div className="flex items-center gap-4 bg-slate-900/50 backdrop-blur-md border border-slate-800 p-2 rounded-2xl">
                        <div className="px-4 py-2 text-center">
                            <span className="block text-2xl font-black text-white leading-none">{inquiries.length}</span>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total</span>
                        </div>
                        <div className="w-px h-8 bg-slate-800" />
                        <div className="px-4 py-2 text-center">
                            <span className="block text-2xl font-black text-yellow-500 leading-none">
                                {inquiries.filter(i => i.status === 'new').length}
                            </span>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Unread</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Inquiry List Panel */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        {/* Search and Filters */}
                        <div className="space-y-4">
                            <div className="relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-yellow-500 transition-colors" size={18} />
                                <input 
                                    type="text" 
                                    placeholder="Search by name or subject..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl py-4 pl-12 pr-6 text-white outline-none focus:border-yellow-500/50 focus:ring-4 focus:ring-yellow-500/5 transition-all"
                                />
                            </div>
                            
                            <div className="flex gap-2 p-1 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl overflow-x-auto no-scrollbar">
                                {['all', 'new', 'read', 'replied'].map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => setFilterStatus(status)}
                                        className={`px-4 py-2 rounded-lg text-xs font-bold capitalize transition-all whitespace-nowrap ${
                                            filterStatus === status 
                                            ? 'bg-yellow-500 text-slate-900 shadow-lg shadow-yellow-500/20' 
                                            : 'text-slate-500 hover:text-white hover:bg-slate-800'
                                        }`}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* List */}
                        <div className="bg-slate-900/40 backdrop-blur-3xl border border-slate-800/60 rounded-[2.5rem] overflow-hidden flex flex-col h-[600px] shadow-2xl">
                            <div className="p-6 border-b border-slate-800/60 flex items-center justify-between bg-slate-950/20">
                                <h2 className="font-bold flex items-center gap-2 text-slate-300">
                                    <Filter size={16} className="text-yellow-500" />
                                    Messages
                                </h2>
                                <span className="text-[10px] font-black bg-slate-800 text-slate-400 px-2 py-1 rounded-md">{filteredInquiries.length}</span>
                            </div>
                            <div className="flex-grow overflow-y-auto divide-y divide-slate-800/40 custom-scrollbar">
                                {loading ? (
                                    <div className="p-20 text-center">
                                        <div className="w-10 h-10 border-4 border-yellow-500/10 border-t-yellow-500 rounded-full animate-spin mx-auto" />
                                    </div>
                                ) : filteredInquiries.length > 0 ? filteredInquiries.map((item) => (
                                    <div 
                                        key={item._id} 
                                        onClick={() => setSelectedInquiry(item)}
                                        className={`p-6 cursor-pointer transition-all duration-300 group relative ${
                                            selectedInquiry?._id === item._id 
                                            ? 'bg-yellow-500/5' 
                                            : 'hover:bg-slate-800/30'
                                        }`}
                                    >
                                        {selectedInquiry?._id === item._id && (
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-500 shadow-[4px_0_15px_rgba(234,179,8,0.5)]" />
                                        )}
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
                                                {new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                            </span>
                                            {getStatusBadge(item.status)}
                                        </div>
                                        <h4 className={`font-bold transition-colors mb-1 ${selectedInquiry?._id === item._id ? 'text-yellow-500' : 'text-white group-hover:text-yellow-500/80'}`}>
                                            {item.name}
                                        </h4>
                                        <p className="text-sm text-slate-500 font-medium line-clamp-1 leading-relaxed">{item.subject}</p>
                                    </div>
                                )) : (
                                    <div className="p-20 text-center flex flex-col items-center gap-4">
                                        <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center text-slate-600">
                                            <Search size={32} />
                                        </div>
                                        <div>
                                            <p className="text-white font-bold">No messages found</p>
                                            <p className="text-slate-500 text-sm">Try adjusting your search or filters</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Inquiry Detail Panel */}
                    <div className="lg:col-span-8 h-[740px]">
                        <div className="bg-slate-900/40 backdrop-blur-3xl border border-slate-800/60 rounded-[3rem] overflow-hidden flex flex-col h-full shadow-2xl relative">
                            {selectedInquiry ? (
                                <div className="flex flex-col h-full animate-in slide-in-from-right-4 duration-500">
                                    {/* Detail Header */}
                                    <div className="p-8 border-b border-slate-800/60 bg-slate-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                                        <div className="flex items-center gap-5">
                                            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-[1.5rem] flex items-center justify-center text-2xl font-black text-slate-900 shadow-xl shadow-yellow-500/20 ring-4 ring-yellow-500/10">
                                                {selectedInquiry.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-3 mb-1">
                                                    <h3 className="text-2xl font-black text-white">{selectedInquiry.name}</h3>
                                                    {getStatusBadge(selectedInquiry.status)}
                                                </div>
                                                <div className="flex items-center gap-4 text-sm text-slate-500 font-medium">
                                                    <span className="flex items-center gap-1.5"><Mail size={14} className="text-yellow-500/70" /> {selectedInquiry.email}</span>
                                                    <span className="w-1 h-1 bg-slate-700 rounded-full" />
                                                    <span className="flex items-center gap-1.5"><Clock size={14} className="text-yellow-500/70" /> {new Date(selectedInquiry.createdAt).toLocaleString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <button 
                                                onClick={() => handleStatusUpdate(selectedInquiry._id, selectedInquiry.status === 'read' ? 'replied' : 'read')}
                                                className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-black transition-all active:scale-95 ${
                                                    selectedInquiry.status === 'replied' 
                                                    ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
                                                    : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-700/50'
                                                }`}
                                            >
                                                <CheckCircle size={18} />
                                                {selectedInquiry.status === 'replied' ? 'Replied' : 'Mark as Read'}
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(selectedInquiry._id)}
                                                className="p-3 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 transition-all hover:text-white border border-red-500/20 active:scale-95"
                                                title="Delete Inquiry"
                                            >
                                                <Trash2 size={22} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Detail Content */}
                                    <div className="p-10 flex-grow overflow-y-auto custom-scrollbar">
                                        <div className="max-w-4xl">
                                            <div className="mb-12">
                                                <div className="flex items-center gap-2 mb-4">
                                                    <Hash size={16} className="text-yellow-500" />
                                                    <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Inquiry Subject</span>
                                                </div>
                                                <h4 className="text-3xl font-black text-white leading-tight tracking-tight">{selectedInquiry.subject}</h4>
                                            </div>
                                            
                                            <div className="relative">
                                                <div className="flex items-center gap-2 mb-6">
                                                    <MessageSquare size={16} className="text-yellow-500" />
                                                    <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Message Content</span>
                                                </div>
                                                <div className="relative group">
                                                    <div className="absolute -inset-4 bg-gradient-to-br from-yellow-500/10 to-transparent rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                                    <div className="relative bg-slate-950/40 border border-slate-800/50 p-10 rounded-[2.5rem] text-slate-200 leading-relaxed text-xl font-medium shadow-inner">
                                                        <span className="text-yellow-500/40 text-6xl absolute -top-4 -left-2 font-serif">"</span>
                                                        <p className="relative z-10 italic">{selectedInquiry.message}</p>
                                                        <span className="text-yellow-500/40 text-6xl absolute -bottom-12 -right-2 font-serif">"</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Detail Footer */}
                                    <div className="p-8 bg-slate-950/40 border-t border-slate-800/60 flex items-center justify-between">
                                        <div className="text-sm text-slate-500 font-medium">
                                            Click the button to open your email client and respond.
                                        </div>
                                        <a 
                                            href={`mailto:${selectedInquiry.email}?subject=Re: ${selectedInquiry.subject}`}
                                            className="bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-10 py-4 rounded-[1.25rem] font-black transition-all shadow-2xl shadow-yellow-500/20 active:scale-[0.98] flex items-center gap-3 group"
                                        >
                                            <Mail size={20} />
                                            Reply via Email
                                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                        </a>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-center p-20 animate-in fade-in zoom-in duration-700">
                                    <div className="relative mb-8">
                                        <div className="absolute inset-0 bg-yellow-500/20 blur-[60px] rounded-full" />
                                        <div className="relative w-32 h-32 bg-slate-800/40 backdrop-blur-2xl rounded-[2.5rem] flex items-center justify-center border border-slate-700/50 shadow-2xl ring-1 ring-white/5">
                                            <MessageSquare size={56} className="text-slate-600 animate-pulse" />
                                        </div>
                                    </div>
                                    <h3 className="text-3xl font-black text-white mb-3 tracking-tight">Select a conversation</h3>
                                    <p className="text-slate-500 max-w-sm text-lg font-medium leading-relaxed">
                                        Choose any inquiry from the list on the left to read the full message and send a professional response.
                                    </p>
                                    <div className="mt-10 flex gap-4">
                                        <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/30 rounded-full border border-slate-700/50 text-xs font-bold text-slate-500 uppercase tracking-widest">
                                            <User size={14} /> {inquiries.length} Inquiries
                                        </div>
                                        <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/10 rounded-full border border-yellow-500/20 text-xs font-bold text-yellow-500 uppercase tracking-widest">
                                            <Clock size={14} /> Real-time Updates
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminInquiries;

