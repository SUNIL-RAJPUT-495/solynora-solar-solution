export const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const SummaryApi = {
    // Admin & Auth
    adminLogin: { url: baseURL + "/api/auth/login", method: "post" },
    getProfile: { url: baseURL + "/api/auth/me", method: "get" },
    
    // Dashboard
    getStats: { url: baseURL + "/api/dashboard/stats", method: "get" },

    // Blogs
    getBlogs: { url: baseURL + "/api/blogs", method: "get" },
    getBlogById: (id) => ({ url: baseURL + `/api/blogs/${id}`, method: "get" }),
    createBlog: { url: baseURL + "/api/blogs", method: "post" },
    updateBlog: (id) => ({ url: baseURL + `/api/blogs/${id}`, method: "put" }),
    deleteBlog: (id) => ({ url: baseURL + `/api/blogs/${id}`, method: "delete" }),

    // Leads
    createLead: { url: baseURL + "/api/leads", method: "post" },
    getLeads: { url: baseURL + "/api/leads", method: "get" },
    updateLeadStatus: (id) => ({ url: baseURL + `/api/leads/${id}`, method: "put" }),
    deleteLead: (id) => ({ url: baseURL + `/api/leads/${id}`, method: "delete" }),

    // Inquiries
    createInquiry: { url: baseURL + "/api/inquiries", method: "post" },
    getInquiries: { url: baseURL + "/api/inquiries", method: "get" },
    updateInquiryStatus: (id) => ({ url: baseURL + `/api/inquiries/${id}`, method: "put" }),
    deleteInquiry: (id) => ({ url: baseURL + `/api/inquiries/${id}`, method: "delete" }),
}

export default SummaryApi
