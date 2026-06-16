import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { baseURL } from '../common/SummerAPI';
import { Calendar, User, ArrowLeft, Share2, Clock, ChevronRight } from 'lucide-react';

const BlogDetail = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [recentBlogs, setRecentBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogAndRecent = async () => {
            try {
                setLoading(true);
                // Fetch the specific blog
                const response = await axios.get(`${baseURL}/api/blogs/${id}`);
                setBlog(response.data.blog);

                // Fetch recent blogs for the sidebar
                const recentResponse = await axios.get(`${baseURL}/api/blogs`);
                const filteredRecent = (recentResponse.data.blogs || [])
                    .filter(b => b._id !== id)
                    .slice(0, 3);
                setRecentBlogs(filteredRecent);
            } catch (err) {
                console.error("Error fetching blog details:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogAndRecent();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="w-16 h-16 border-4 border-slate-200 border-t-yellow-500 rounded-full animate-spin" />
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-6">
                <h2 className="text-4xl font-heading font-bold text-slate-900 mb-4">Blog Not Found</h2>
                <p className="text-slate-500 mb-8 text-center max-w-md">The blog post you are looking for might have been removed or the link is incorrect.</p>
                <Link 
                    to="/blog" 
                    className="flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10"
                >
                    <ArrowLeft size={20} />
                    Back to Blog
                </Link>
            </div>
        );
    }

    return (
        <div className="pt-24 min-h-screen bg-slate-50">
            {/* Blog Hero Section */}
            <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
                {blog.image ? (
                    <img 
                        src={blog.image} 
                        alt={blog.title} 
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
                        No Image Available
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                
                <div className="absolute inset-0 flex items-end">
                    <div className="container mx-auto px-6 pb-16">
                        <div className="max-w-4xl">
                            <Link 
                                to="/blog" 
                                className="inline-flex items-center gap-2 text-yellow-500 font-bold mb-6 hover:text-yellow-400 transition-colors bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm"
                            >
                                <ArrowLeft size={16} />
                                Back to Blog
                            </Link>
                            <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-white mb-8 leading-tight">
                                {blog.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-6 text-slate-300">
                                <div className="flex items-center gap-2">
                                    <Calendar size={18} className="text-yellow-500" />
                                    <span className="font-medium">{new Date(blog.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <User size={18} className="text-yellow-500" />
                                    <span className="font-medium">Solynora Team</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock size={18} className="text-yellow-500" />
                                    <span className="font-medium">5 min read</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-6 py-20">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Main Content */}
                    <article className="lg:w-2/3">
                        <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl shadow-slate-200/50 border border-slate-100">
                            <div className="prose prose-slate prose-lg max-w-none">
                                {blog.content.split('\n').map((paragraph, index) => (
                                    paragraph ? (
                                        <p key={index} className="text-slate-600 leading-relaxed mb-6 text-lg">
                                            {paragraph}
                                        </p>
                                    ) : <br key={index} />
                                ))}
                            </div>
                            
                            {/* Share Section */}
                            <div className="mt-16 pt-8 border-t border-slate-100 flex flex-wrap items-center justify-between gap-6">
                                <div className="flex items-center gap-4">
                                    <span className="font-bold text-slate-900">Share this post:</span>
                                    <div className="flex gap-2">
                                        <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-yellow-500 hover:text-white transition-all">
                                            <Share2 size={18} />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-4 py-1.5 bg-slate-100 text-slate-600 rounded-full text-sm font-medium">Solar Energy</span>
                                    <span className="px-4 py-1.5 bg-slate-100 text-slate-600 rounded-full text-sm font-medium">Sustainability</span>
                                    <span className="px-4 py-1.5 bg-slate-100 text-slate-600 rounded-full text-sm font-medium">Innovation</span>
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="lg:w-1/3 space-y-12">
                        {/* Recent Posts */}
                        <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-slate-900/20">
                            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                <span className="w-8 h-1 bg-yellow-500 rounded-full" />
                                Recent Posts
                            </h3>
                            <div className="space-y-8">
                                {recentBlogs.map((item) => (
                                    <Link key={item._id} to={`/blog/${item._id}`} className="group block">
                                        <div className="flex gap-4">
                                            <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-slate-800 border border-slate-700">
                                                {item.image && (
                                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                                )}
                                            </div>
                                            <div className="flex flex-col justify-center">
                                                <h4 className="font-bold text-slate-100 line-clamp-2 group-hover:text-yellow-500 transition-colors mb-2 leading-snug">
                                                    {item.title}
                                                </h4>
                                                <span className="text-xs text-slate-500 font-medium">{new Date(item.createdAt).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            
                            <Link to="/blog" className="mt-10 inline-flex items-center gap-2 text-yellow-500 font-bold hover:gap-3 transition-all group">
                                View all posts
                                <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>

                        {/* Newsletter/CTA */}
                        <div className="bg-yellow-500 rounded-[2.5rem] p-10 text-slate-900 shadow-2xl shadow-yellow-500/20 relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-2xl font-black mb-4">Go Solar Today!</h3>
                                <p className="text-slate-800 font-medium mb-8 leading-relaxed">
                                    Join the clean energy revolution and start saving on your electricity bills.
                                </p>
                                <Link to="/contact" className="block w-full text-center bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20">
                                    Get a Free Quote
                                </Link>
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-3xl" />
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;
