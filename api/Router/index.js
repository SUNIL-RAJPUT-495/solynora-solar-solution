import express from 'express';
import { login, getMe, logout } from '../controller/authController.js';
import Admin from '../models/Admin.js';
import bcrypt from 'bcryptjs';
import { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog } from '../controller/blogController.js';
import { createLead, getLeads, updateLeadStatus, deleteLead } from '../controller/leadController.js';
import { createInquiry, getInquiries, updateInquiryStatus, deleteInquiry } from '../controller/inquiryController.js';
import { getStats } from '../controller/dashboardController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Auth
router.post('/auth/login', login);
router.get('/auth/me', auth, getMe);
router.post('/auth/logout', logout);

// Seed Admin (Remove or protect in production)
router.post('/auth/seed', async (req, res) => {
    try {
        const adminExists = await Admin.findOne({ email: 'admin@solynora.com' });
        if (adminExists) return res.status(400).json({ message: "Admin already exists" });

        const hashedPassword = await bcrypt.hash('admin123', 10);
        const admin = new Admin({
            name: 'Solynora Admin',
            email: 'admin@solynora.com',
            password: hashedPassword
        });
        await admin.save();
        res.json({ message: "Admin seeded successfully", email: 'admin@solynora.com', password: 'admin123' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Dashboard
router.get('/dashboard/stats', auth, getStats);

// Blogs
router.get('/blogs', getBlogs);
router.get('/blogs/:id', getBlogById);
router.post('/blogs', auth, createBlog);
router.put('/blogs/:id', auth, updateBlog);
router.delete('/blogs/:id', auth, deleteBlog);

// Leads
router.post('/leads', createLead);
router.get('/leads', auth, getLeads);
router.put('/leads/:id', auth, updateLeadStatus);
router.delete('/leads/:id', auth, deleteLead);

// Inquiries
router.post('/inquiries', createInquiry);
router.get('/inquiries', auth, getInquiries);
router.put('/inquiries/:id', auth, updateInquiryStatus);
router.delete('/inquiries/:id', auth, deleteInquiry);

export default router;
