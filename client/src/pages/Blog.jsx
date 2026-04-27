import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '../common/SummerAPI';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="pt-32 min-h-screen bg-slate-50">
      {/* Blog Header */}
      <section className="bg-slate-900 py-20 text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-heading font-extrabold text-white mb-6">Our Blog</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Stay updated with the latest trends, tips, and news in the world of solar energy.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-24 container mx-auto px-6">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {blogs.length > 0 ? blogs.map((blog) => (
              <div key={blog._id} className="group cursor-pointer">
                {/* Blog Image */}
                <div className="aspect-[16/10] overflow-hidden rounded-[2.5rem] bg-slate-200 mb-8 shadow-xl border border-slate-100 relative">
                  {blog.image ? (
                    <img 
                      src={blog.image} 
                      alt={blog.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-300">
                      Blog Image
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Blog Content */}
                <div className="px-2">
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-slate-900 mb-4 group-hover:text-primary transition-colors leading-tight">
                    {blog.title}
                  </h2>
                  <div className="flex items-center gap-2 text-slate-400 font-medium">
                    <span className="text-lg">📅</span>
                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            )) : (
              <div className="col-span-full text-center text-slate-500 py-20">
                No blog posts available yet.
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default Blog;

