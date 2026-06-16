import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { 
        type: String, 
        required: true,
        match: [/^\d{10}$/, 'Phone number must be exactly 10 digits']
    },
    message: { type: String, required: true },
    language: { type: String, default: 'en' },
    status: { 
        type: String, 
        enum: ['new', 'contacted', 'converted', 'closed'], 
        default: 'new' 
    }
}, { timestamps: true });

const Lead = mongoose.model('Lead', leadSchema);
export default Lead;

