import React, { useState, useEffect } from 'react';
import AxiosAdmin from '../../utils/axiosAdmin';
import AdminLayout from '../../components/admin/AdminLayout';
import { MessageSquare, Mail, Search, Trash2, Eye, CheckCircle, Clock, Filter, ArrowRight, User, Hash, Sparkles } from 'lucide-react';

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
                return <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 shadow-sm">New</span>;
            case 'read':
                return <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-sm">Read</span>;
            case 'replied':
                return <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-green-500/10 text-green-400 border border-green-500/20 shadow-sm">Replied</span>;
            default:
                return null;
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-12 animate-in fade-in duration-1000">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-yellow-500/10 rounded-2xl ring-1 ring-yellow-500/20">
                                <MessageSquare size={28} className="text-yellow-500" />
                            </div>
                            <span className="text-xs font-black text-yellow-500/80 uppercase tracking-[0.3em] flex items-center gap-2">
                                <Sparkles size={14} />
                                Intelligence Hub
                            </span>
                        </div>
                        <h1 className="text-5xl font-black text-white mb-3 tracking-tighter">Customer Inquiries</h1>
                        <p className="text-slate-400 text-xl font-medium">Manage support requests and general questions with precision.</p>
                    </div>
                    
                    <div className="flex items-center gap-6 bg-slate-900/40 backdrop-blur-3xl border border-slate-800/60 p-4 rounded-3xl shadow-2xl">
                        <div className="px-6 py-2 text-center">
                            <span className="block text-3xl font-black text-white leading-none mb-1">{inquiries.length}</span>
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Conversations</span>
                        </div>
                        <div className="w-px h-10 bg-slate-800" />
                        <div className="px-6 py-2 text-center">
                            <span className="block text-3xl font-black text-yellow-500 leading-none mb-1">
                                {inquiries.filter(i => i.status === 'new').length}
                            </span>
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Awaiting Action</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    {/* Inquiry List Panel */}
                    <div className="lg:col-span-4 flex flex-col gap-8">
                        {/* Search and Filters */}
                        <div className="space-y-5">
                            <div className="relative group">
                                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-yellow-500 transition-all duration-300" size={20} />
                                <input 
                                    type="text" 
                                    placeholder="Search by name or subject..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-slate-950/50 backdrop-blur-xl border border-slate-800/80 rounded-[1.5rem] py-4.5 pl-14 pr-8 text-white outline-none focus:border-yellow-500/50 focus:ring-4 focus:ring-yellow-500/5 transition-all shadow-inner font-medium"
                                />
                            </div>
                            
                            <div className="flex gap-2.5 p-1.5 bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl overflow-x-auto no-scrollbar shadow-xl">
                                {['all', 'new', 'read', 'replied'].map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => setFilterStatus(status)}
                                        className={`px-6 py-2.5 rounded-xl text-xs font-black capitalize transition-all duration-500 whitespace-nowrap tracking-wider ${
                                            filterStatus === status 
                                            ? 'bg-yellow-500 text-slate-900 shadow-xl shadow-yellow-500/20' 
                                            : 'text-slate-500 hover:text-white hover:bg-slate-800/50'
                                        }`}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* List */}
                        <div className="bg-slate-900/40 backdrop-blur-3xl border border-slate-800/60 rounded-[3rem] overflow-hidden flex flex-col h-[650px] shadow-2xl relative group/list">
                            <div className="p-8 border-b border-slate-800/60 flex items-center justify-between bg-slate-950/40">
                                <h2 className="font-black flex items-center gap-3 text-slate-400 text-sm tracking-[0.2em] uppercase">
                                    <Filter size={18} className="text-yellow-500" />
                                    Inbox
                                </h2>
                                <span className="text-[10px] font-black bg-slate-800 text-slate-400 px-3 py-1.5 rounded-xl border border-slate-700/50">{filteredInquiries.length} Items</span>
                            </div>
                            <div className="flex-grow overflow-y-auto divide-y divide-slate-800/40 custom-scrollbar">
                                {loading ? (
                                    <div className="p-32 text-center">
                                        <div className="w-12 h-12 border-4 border-yellow-500/10 border-t-yellow-500 rounded-full animate-spin mx-auto" />
                                    </div>
                                ) : filteredInquiries.length > 0 ? filteredInquiries.map((item) => (
                                    <div 
                                        key={item._id} 
                                        onClick={() => setSelectedInquiry(item)}
                                        className={`p-8 cursor-pointer transition-all duration-500 group relative ${
                                            selectedInquiry?._id === item._id 
                                            ? 'bg-yellow-500/5' 
                                            : 'hover:bg-white/[0.02]'
                                        }`}
                                    >
                                        {selectedInquiry?._id === item._id && (
                                            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-yellow-500 shadow-[4px_0_20px_rgba(234,179,8,0.6)] z-10" />
                                        )}
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
                                                {new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                            </span>
                                            {getStatusBadge(item.status)}
                                        </div>
                                        <h4 className={`text-lg font-black transition-all duration-300 mb-2 tracking-tight ${selectedInquiry?._id === item._id ? 'text-yellow-500 translate-x-1' : 'text-white group-hover:text-yellow-500/90'}`}>
                                            {item.name}
                                        </h4>
                                        <p className="text-sm text-slate-500 font-bold line-clamp-1 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">{item.subject}</p>
                                    </div>
                                )) : (
                                    <div className="p-24 text-center flex flex-col items-center gap-6">
                                        <div className="w-20 h-20 bg-slate-950/50 rounded-[2rem] flex items-center justify-center text-slate-700 shadow-inner ring-1 ring-white/5">
                                            <Search size={40} />
                                        </div>
                                        <div>
                                            <p className="text-white text-xl font-black tracking-tight mb-2">Empty Inbox</p>
                                            <p className="text-slate-500 text-sm font-medium">Your search filters returned no results.</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Inquiry Detail Panel */}
                    <div className="lg:col-span-8 h-[800px]">
                        <div className="bg-slate-900/40 backdrop-blur-3xl border border-slate-800/60 rounded-[4rem] overflow-hidden flex flex-col h-full shadow-2xl relative ring-1 ring-white/[0.02]">
                            {selectedInquiry ? (
                                <div className="flex flex-col h-full animate-in slide-in-from-right-10 duration-700">
                                    {/* Detail Header */}
                                    <div className="p-10 border-b border-slate-800/60 bg-slate-950/40 flex flex-col sm:flex-row sm:items-center justify-between gap-8">
                                        <div className="flex items-center gap-6">
                                            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-[2rem] flex items-center justify-center text-3xl font-black text-slate-900 shadow-2xl shadow-yellow-500/30 ring-8 ring-yellow-500/5">
                                                {selectedInquiry.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-4 mb-2">
                                                    <h3 className="text-3xl font-black text-white tracking-tighter">{selectedInquiry.name}</h3>
                                                    {getStatusBadge(selectedInquiry.status)}
                                                </div>
                                                <div className="flex flex-wrap items-center gap-5 text-sm text-slate-500 font-bold">
                                                    <span className="flex items-center gap-2 px-3 py-1 bg-slate-800/50 rounded-lg"><Mail size={14} className="text-yellow-500" /> {selectedInquiry.email}</span>
                                                    <span className="flex items-center gap-2 px-3 py-1 bg-slate-800/50 rounded-lg"><Clock size={14} className="text-yellow-500" /> {new Date(selectedInquiry.createdAt).toLocaleString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <button 
                                                onClick={() => handleStatusUpdate(selectedInquiry._id, selectedInquiry.status === 'read' ? 'replied' : 'read')}
                                                className={`flex items-center gap-3 px-8 py-4 rounded-[1.5rem] text-xs font-black uppercase tracking-widest transition-all duration-300 active:scale-95 shadow-xl ${
                                                    selectedInquiry.status === 'replied' 
                                                    ? 'bg-green-500/10 text-green-500 border border-green-500/20 shadow-green-500/5' 
                                                    : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 border border-slate-700/50'
                                                }`}
                                            >
                                                <CheckCircle size={18} />
                                                {selectedInquiry.status === 'replied' ? 'Answered' : 'Mark Seen'}
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(selectedInquiry._id)}
                                                className="p-4 bg-red-500/10 text-red-500 rounded-[1.5rem] hover:bg-red-500 transition-all hover:text-white border border-red-500/20 active:scale-95 shadow-xl shadow-red-500/5"
                                                title="Delete Inquiry"
                                            >
                                                <Trash2 size={24} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Detail Content */}
                                    <div className="p-12 flex-grow overflow-y-auto custom-scrollbar bg-gradient-to-b from-transparent to-slate-950/20">
                                        <div className="max-w-4xl mx-auto">
                                            <div className="mb-14 bg-slate-950/40 p-10 rounded-[3rem] border border-slate-800/50 shadow-inner">
                                                <div className="flex items-center gap-3 mb-6">
                                                    <div className="w-8 h-8 bg-yellow-500/10 rounded-full flex items-center justify-center">
                                                        <Hash size={14} className="text-yellow-500" />
                                                    </div>
                                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Official Subject</span>
                                                </div>
                                                <h4 className="text-4xl font-black text-white leading-[1.1] tracking-tight">{selectedInquiry.subject}</h4>
                                            </div>
                                            
                                            <div className="relative group">
                                                <div className="flex items-center gap-3 mb-8">
                                                    <div className="w-8 h-8 bg-yellow-500/10 rounded-full flex items-center justify-center">
                                                        <MessageSquare size={14} className="text-yellow-500" />
                                                    </div>
                                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Message Narrative</span>
                                                </div>
                                                <div className="relative">
                                                    <div className="absolute -inset-10 bg-yellow-500/[0.02] blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                                                    <div className="relative bg-slate-900/60 border border-white/[0.03] p-12 rounded-[3.5rem] text-slate-200 leading-[1.8] text-2xl font-medium shadow-2xl ring-1 ring-white/[0.05]">
                                                        <span className="text-yellow-500/20 text-8xl absolute -top-10 -left-4 font-serif italic select-none">"</span>
                                                        <p className="relative z-10 italic tracking-tight">{selectedInquiry.message}</p>
                                                        <span className="text-yellow-500/20 text-8xl absolute -bottom-20 -right-4 font-serif italic select-none">"</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Detail Footer */}
                                    <div className="p-10 bg-slate-950/60 border-t border-slate-800/60 flex items-center justify-between backdrop-blur-2xl">
                                        <div className="flex flex-col">
                                            <span className="text-sm text-slate-300 font-black mb-1">Direct Response Enabled</span>
                                            <p className="text-xs text-slate-500 font-medium">Securely reply to this client via your default email client.</p>
                                        </div>
                                        <a 
                                            href={`mailto:${selectedInquiry.email}?subject=Re: ${selectedInquiry.subject}`}
                                            className="bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-12 py-5 rounded-[1.75rem] font-black transition-all shadow-2xl shadow-yellow-500/30 active:scale-[0.98] flex items-center gap-4 group ring-4 ring-yellow-500/5"
                                        >
                                            <Mail size={22} />
                                            Send Professional Reply
                                            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-500" />
                                        </a>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-center p-24 animate-in fade-in zoom-in duration-1000">
                                    <div className="relative mb-12">
                                        <div className="absolute inset-0 bg-yellow-500/10 blur-[80px] rounded-full animate-pulse" />
                                        <div className="relative w-40 h-40 bg-slate-900/60 backdrop-blur-3xl rounded-[3.5rem] flex items-center justify-center border border-white/[0.05] shadow-2xl ring-1 ring-white/10">
                                            <MessageSquare size={72} className="text-slate-700/50" />
                                        </div>
                                    </div>
                                    <h3 className="text-4xl font-black text-white mb-4 tracking-tighter">Communications Center</h3>
                                    <p className="text-slate-500 max-w-sm text-xl font-medium leading-relaxed opacity-80">
                                        Select a conversation from the sidebar to engage with your customers.
                                    </p>
                                    <div className="mt-14 flex items-center gap-4">
                                        <div className="flex items-center gap-3 px-6 py-3 bg-slate-950/50 rounded-2xl border border-white/[0.03] text-xs font-black text-slate-400 uppercase tracking-widest shadow-lg">
                                            <User size={16} className="text-yellow-500" /> {inquiries.length} Active Users
                                        </div>
                                        <div className="flex items-center gap-3 px-6 py-3 bg-yellow-500/10 rounded-2xl border border-yellow-500/20 text-xs font-black text-yellow-500 uppercase tracking-widest shadow-lg">
                                            <Sparkles size={16} /> Secure Protocol
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


