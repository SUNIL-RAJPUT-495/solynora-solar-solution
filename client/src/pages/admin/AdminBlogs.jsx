import React, { useState, useEffect } from 'react';
import AxiosAdmin from '../../utils/axiosAdmin';
import AdminLayout from '../../components/admin/AdminLayout';
import { FileText, Plus, Search, Trash2, Edit, X, Image as ImageIcon, Loader2 } from 'lucide-react';

const AdminBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);
    const [formData, setFormData] = useState({ title: '', content: '', image: '' });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await AxiosAdmin.get(`/api/blogs`);
            setBlogs(response.data.blogs);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (editingBlog) {
                await AxiosAdmin.put(`/api/blogs/${editingBlog._id}`, formData);
            } else {
                await AxiosAdmin.post(`/api/blogs`, formData);
            }
            setIsModalOpen(false);
            setEditingBlog(null);
            setFormData({ title: '', content: '', image: '' });
            fetchBlogs();
        } catch (err) {
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this blog post?")) return;
        try {
            await AxiosAdmin.delete(`/api/blogs/${id}`);
            fetchBlogs();
        } catch (err) {
            console.error(err);
        }
    };

    const openEditModal = (blog) => {
        setEditingBlog(blog);
        setFormData({ title: blog.title, content: blog.content, image: blog.image });
        setIsModalOpen(true);
    };

    return (
        <AdminLayout>
            <div className="space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Blog Posts</h1>
                        <p className="text-slate-400">Create and manage content for your solar news section.</p>
                    </div>
                    <button 
                        onClick={() => { setIsModalOpen(true); setEditingBlog(null); setFormData({ title: '', content: '', image: '' }); }}
                        className="bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-6 py-3.5 rounded-2xl font-bold transition-all shadow-xl shadow-yellow-500/20 active:scale-[0.98] flex items-center gap-2"
                    >
                        <Plus size={20} />
                        New Post
                    </button>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {loading ? (
                        <div className="col-span-full py-20 text-center">
                            <div className="w-10 h-10 border-4 border-yellow-500/30 border-t-yellow-500 rounded-full animate-spin mx-auto" />
                        </div>
                    ) : blogs.length > 0 ? blogs.map((blog) => (
                        <div key={blog._id} className="bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden group hover:border-yellow-500/50 transition-all duration-500">
                            <div className="aspect-[16/9] relative bg-slate-800">
                                {blog.image ? (
                                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-700">
                                        <ImageIcon size={48} />
                                    </div>
                                )}
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <button 
                                        onClick={() => openEditModal(blog)}
                                        className="p-2 bg-slate-900/80 backdrop-blur-md text-white rounded-lg hover:bg-yellow-500 hover:text-slate-900 transition-all"
                                    >
                                        <Edit size={18} />
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(blog._id)}
                                        className="p-2 bg-slate-900/80 backdrop-blur-md text-white rounded-lg hover:bg-red-500 transition-all"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                            <div className="p-8">
                                <span className="text-xs font-bold text-yellow-500 uppercase tracking-widest mb-3 block">
                                    {new Date(blog.createdAt).toLocaleDateString()}
                                </span>
                                <h3 className="text-xl font-bold text-white mb-4 line-clamp-2 leading-snug group-hover:text-yellow-500 transition-colors">
                                    {blog.title}
                                </h3>
                                <p className="text-slate-500 text-sm line-clamp-3 leading-relaxed">
                                    {blog.content}
                                </p>
                            </div>
                        </div>
                    )) : (
                        <div className="col-span-full py-20 text-center text-slate-500">No blog posts found. Create your first one!</div>
                    )}
                </div>

                {/* Create/Edit Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
                        <div className="bg-slate-900 border border-slate-800 w-full max-w-3xl relative z-10 rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                            <div className="p-8 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
                                <h2 className="text-2xl font-bold">{editingBlog ? 'Edit Post' : 'New Blog Post'}</h2>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-white transition-colors">
                                    <X size={24} />
                                </button>
                            </div>
                            
                            <form onSubmit={handleSubmit} className="p-10 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Blog Title</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="Enter a catchy title..." 
                                        className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-4 px-6 text-white outline-none focus:border-yellow-500 transition-all text-lg font-bold"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Cover Image</label>
                                    <div className="flex items-center gap-6">
                                        <div className="w-40 h-24 bg-slate-950 rounded-2xl border-2 border-dashed border-slate-800 overflow-hidden flex items-center justify-center relative group">
                                            {formData.image ? (
                                                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                            ) : (
                                                <ImageIcon className="text-slate-700" size={32} />
                                            )}
                                            <input 
                                                type="file" 
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="absolute inset-0 opacity-0 cursor-pointer" 
                                            />
                                        </div>
                                        <div className="flex-grow">
                                            <p className="text-sm text-slate-400 mb-2">Upload a high-quality cover image. Max size 5MB.</p>
                                            <label className="text-xs font-bold text-yellow-500 cursor-pointer hover:text-yellow-400">
                                                Choose File
                                                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Content</label>
                                    <textarea 
                                        required
                                        rows="8"
                                        value={formData.content}
                                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                        placeholder="Write your story here..." 
                                        className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-4 px-6 text-white outline-none focus:border-yellow-500 transition-all resize-none leading-relaxed"
                                    ></textarea>
                                </div>

                                <div className="flex justify-end gap-4 pt-4">
                                    <button 
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-8 py-4 text-slate-400 font-bold hover:text-white transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        disabled={submitting}
                                        className="bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-10 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-yellow-500/20 flex items-center gap-2"
                                    >
                                        {submitting ? <Loader2 className="animate-spin" size={20} /> : (editingBlog ? 'Update Post' : 'Publish Now')}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default AdminBlogs;
