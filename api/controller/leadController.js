import Lead from '../models/Lead.js';

export const createLead = async (req, res) => {
    try {
        const { name, phone, service } = req.body;
        const lead = new Lead({ name, phone, service });
        await lead.save();
        res.status(201).json({ message: "Lead submitted successfully", lead, success: true });
    } catch (err) {
        res.status(500).json({ message: err.message, error: true });
    }
};

export const getLeads = async (req, res) => {
    try {
        const leads = await Lead.find().sort({ createdAt: -1 });
        res.json({ leads, success: true });
    } catch (err) {
        res.status(500).json({ message: err.message, error: true });
    }
};

export const updateLeadStatus = async (req, res) => {
    try {
        const lead = await Lead.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        res.json({ message: "Lead status updated", lead, success: true });
    } catch (err) {
        res.status(500).json({ message: err.message, error: true });
    }
};

export const deleteLead = async (req, res) => {
    try {
        await Lead.findByIdAndDelete(req.params.id);
        res.json({ message: "Lead deleted", success: true });
    } catch (err) {
        res.status(500).json({ message: err.message, error: true });
    }
};
