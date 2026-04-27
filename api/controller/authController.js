import Admin from '../models/Admin.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(400).json({ message: "Invalid credentials", error: true, success: false });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials", error: true, success: false });
        }

        const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie('admin_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000
        }).json({
            message: "Login successful",
            token,
            user: { id: admin._id, name: admin.name, email: admin.email },
            success: true,
            error: false
        });
    } catch (err) {
        res.status(500).json({ message: err.message, error: true, success: false });
    }
};

export const getMe = async (req, res) => {
    try {
        const admin = await Admin.findById(req.user.id).select('-password');
        res.json({ user: admin, success: true, error: false });
    } catch (err) {
        res.status(500).json({ message: err.message, error: true, success: false });
    }
};

export const logout = async (req, res) => {
    res.clearCookie('token').json({ message: "Logged out successfully", success: true, error: false });
};
