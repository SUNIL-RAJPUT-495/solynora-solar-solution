import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String }, // Base64 or URL
    author: { type: String, default: 'Admin' },
    isPublished: { type: Boolean, default: true }
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
