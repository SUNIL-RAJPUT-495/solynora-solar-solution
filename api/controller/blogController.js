import Blog from '../models/Blog.js';

export const createBlog = async (req, res) => {
    try {
        const { title, content, image } = req.body;
        const blog = new Blog({ title, content, image });
        await blog.save();
        res.status(201).json({ message: "Blog created successfully", blog, success: true });
    } catch (err) {
        res.status(500).json({ message: err.message, error: true });
    }
};

export const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.json({ blogs, success: true });
    } catch (err) {
        res.status(500).json({ message: err.message, error: true });
    }
};

export const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: "Blog not found" });
        res.json({ blog, success: true });
    } catch (err) {
        res.status(500).json({ message: err.message, error: true });
    }
};

export const updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: "Blog updated successfully", blog, success: true });
    } catch (err) {
        res.status(500).json({ message: err.message, error: true });
    }
};

export const deleteBlog = async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.json({ message: "Blog deleted successfully", success: true });
    } catch (err) {
        res.status(500).json({ message: err.message, error: true });
    }
};
