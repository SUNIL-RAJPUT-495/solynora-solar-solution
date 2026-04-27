import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    service: { type: String, required: true },
    status: { 
        type: String, 
        enum: ['new', 'contacted', 'converted', 'closed'], 
        default: 'new' 
    }
}, { timestamps: true });

const Lead = mongoose.model('Lead', leadSchema);
export default Lead;
