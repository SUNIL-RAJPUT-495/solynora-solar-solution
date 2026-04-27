import Blog from '../models/Blog.js';
import Lead from '../models/Lead.js';
import Inquiry from '../models/Inquiry.js';

export const getStats = async (req, res) => {
    try {
        const totalBlogs = await Blog.countDocuments();
        const totalLeads = await Lead.countDocuments();
        const totalInquiries = await Inquiry.countDocuments();
        
        const recentLeads = await Lead.find().sort({ createdAt: -1 }).limit(5);
        const recentInquiries = await Inquiry.find().sort({ createdAt: -1 }).limit(5);

        res.json({
            stats: {
                totalBlogs,
                totalLeads,
                totalInquiries
            },
            recentLeads,
            recentInquiries,
            success: true
        });
    } catch (err) {
        res.status(500).json({ message: err.message, error: true });
    }
};
