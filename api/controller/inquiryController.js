import Inquiry from '../models/Inquiry.js';

export const createInquiry = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        const inquiry = new Inquiry({ name, email, subject, message });
        await inquiry.save();
        res.status(201).json({ message: "Inquiry submitted successfully", inquiry, success: true });
    } catch (err) {
        res.status(500).json({ message: err.message, error: true });
    }
};

export const getInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.find().sort({ createdAt: -1 });
        res.json({ inquiries, success: true });
    } catch (err) {
        res.status(500).json({ message: err.message, error: true });
    }
};

export const updateInquiryStatus = async (req, res) => {
    try {
        const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        res.json({ message: "Inquiry status updated", inquiry, success: true });
    } catch (err) {
        res.status(500).json({ message: err.message, error: true });
    }
};

export const deleteInquiry = async (req, res) => {
    try {
        await Inquiry.findByIdAndDelete(req.params.id);
        res.json({ message: "Inquiry deleted", success: true });
    } catch (err) {
        res.status(500).json({ message: err.message, error: true });
    }
};
