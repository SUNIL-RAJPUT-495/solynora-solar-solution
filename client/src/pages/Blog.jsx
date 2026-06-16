import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { baseURL } from '../common/SummerAPI';
import { Calendar, ArrowRight, Search, Clock, ChevronRight } from 'lucide-react';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/blogs`);
        setBlogs(response.data.blogs);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const filteredBlogs = (blogs || []).filter(blog =>
    blog?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const featuredBlog = filteredBlogs.length > 0 ? filteredBlogs[0] : null;
  const remainingBlogs = filteredBlogs.length > 1 ? filteredBlogs.slice(1) : [];

  return (
    <div className=" pt-10 min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-slate-100 py-24 relative overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-[0.03]" />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 bg-yellow-500/10 text-yellow-600 rounded-full text-sm font-bold tracking-widest uppercase mb-6 border border-yellow-500/20">
            Insights & News
          </span>
          <h1 className="text-5xl md:text-7xl font-heading font-black text-slate-900 mb-8 tracking-tight">
            Our <span className="text-yellow-600">Solar</span> Blog
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-12">
            Stay updated with the latest trends, expert tips, and breakthrough news in the world of solar energy and sustainable living.
          </p>
        </div>
      </section>

      <section className="py-24 container mx-auto px-6">
        {loading ? (
          <div className="flex justify-center py-40">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-slate-200 border-t-yellow-500 rounded-full animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 bg-slate-900 rounded-full" />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-24">
            {/* Featured Post */}
            {featuredBlog && !searchTerm && (
              <div className="group relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white rounded-[4rem] p-8 md:p-12 shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                  <div className="aspect-[16/10] lg:aspect-square overflow-hidden rounded-[3rem] relative shadow-2xl">
                    {featuredBlog.image ? (
                      <img
                        src={featuredBlog.image}
                        alt={featuredBlog.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300">Image Placeholder</div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                    <div className="absolute top-8 left-8">
                      <span className="px-6 py-2 bg-yellow-500 text-slate-900 rounded-full text-sm font-bold shadow-xl">Featured Post</span>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="flex items-center gap-4 text-slate-400 font-bold text-sm tracking-widest uppercase">
                      <Calendar size={18} className="text-yellow-500" />
                      <span>{new Date(featuredBlog.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      <span className="w-1.5 h-1.5 bg-slate-200 rounded-full" />
                      <span>5 min read</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-heading font-black text-slate-900 leading-tight group-hover:text-yellow-600 transition-colors">
                      {featuredBlog.title}
                    </h2>

                    <p className="text-xl text-slate-500 leading-relaxed line-clamp-3">
                      {featuredBlog.content}
                    </p>

                    <Link
                      to={`/blog/${featuredBlog._id}`}
                      className="inline-flex items-center gap-3 bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold hover:bg-yellow-500 hover:text-slate-900 transition-all shadow-xl shadow-slate-900/10 active:scale-[0.98]"
                    >
                      Read Full Story
                      <ArrowRight size={20} />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {(searchTerm ? filteredBlogs : remainingBlogs).length > 0 ? (searchTerm ? filteredBlogs : remainingBlogs).map((blog) => (
                <div key={blog._id} className="group flex flex-col bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/30 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 hover:-translate-y-2">
                  <div className="aspect-[16/10] overflow-hidden relative">
                    {blog.image ? (
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300 font-bold">SOLYNORA</div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <div className="p-10 flex flex-col flex-grow">
                    <div className="flex items-center gap-3 text-slate-400 font-bold text-xs uppercase tracking-widest mb-6">
                      <Calendar size={14} className="text-yellow-500" />
                      <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                    </div>

                    <h3 className="text-2xl font-heading font-bold text-slate-900 mb-6 group-hover:text-yellow-600 transition-colors leading-snug line-clamp-2">
                      {blog.title}
                    </h3>

                    <p className="text-slate-500 leading-relaxed line-clamp-3 mb-8 flex-grow">
                      {blog.content}
                    </p>

                    <Link
                      to={`/blog/${blog._id}`}
                      className="inline-flex items-center gap-2 text-slate-900 font-bold group/btn hover:text-yellow-600 transition-colors"
                    >
                      Read Post
                      <ChevronRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>
              )) : (
                <div className="col-span-full text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                    <Search size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">No articles found</h3>
                  <p className="text-slate-500">Try adjusting your search terms or browse our latest posts.</p>
                </div>
              )}
            </div>


          </div>
        )}
      </section>
    </div>
  );
};

export default Blog;


