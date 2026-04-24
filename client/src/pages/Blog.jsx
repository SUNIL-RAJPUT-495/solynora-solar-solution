import React from 'react';

const Blog = () => {
  // This data will eventually come from the backend/admin panel
  const blogs = [
    {
      id: 1,
      title: "How Solar Energy is Transforming Homes in Rajasthan",
      image: "/solar_home.png",
      date: "April 24, 2026"
    },
    {
      id: 2,
      title: "Top 5 Benefits of Regular Solar Panel Maintenance",
      image: "/solar_maintenance_dausa_1777017026374.png",
      date: "April 22, 2026"
    },
    {
      id: 3,
      title: "Professional Installation: Why it Matters for Longevity",
      image: "/solar_installation_dausa_1777017049528.png",
      date: "April 20, 2026"
    },
    {
      id: 4,
      title: "Meet the Team: The Experts Behind Solynora Solar",
      image: "/solynora_team.png",
      date: "April 18, 2026"
    }
  ];

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {blogs.map((blog) => (
            <div key={blog.id} className="group cursor-pointer">
              {/* Blog Image */}
              <div className="aspect-[16/10] overflow-hidden rounded-[2.5rem] bg-slate-200 mb-8 shadow-xl border border-slate-100 relative">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Blog Content */}
              <div className="px-2">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-slate-900 mb-4 group-hover:text-primary transition-colors leading-tight">
                  {blog.title}
                </h2>
                <div className="flex items-center gap-2 text-slate-400 font-medium">
                  <span className="text-lg">📅</span>
                  <span>{blog.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter / Call to Action */}
      
    </div>
  );
};

export default Blog;
