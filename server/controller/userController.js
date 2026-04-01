import { User } from "../model/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Resume } from "../model/Resume.js";
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const exists = await User.findOne({ email });
        if (exists) return res.json({ success: false, message: "Email already exists" });

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password: hashPassword });

        const token = createToken(newUser._id);
        res.json({ success: true, token ,message:"User Register successfully"});
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// --- تسجيل الدخول (Login) ---
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.json({ success: false, message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.json({ success: false, message: "Invalid password" });

        const token = createToken(user._id);
        res.json({ success: true, token ,message:"User Login successfully"});
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id; 
        
        const user = await User.findById(userId).select('-password'); // بنستثني الباسورد

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        res.json({ success: true, user });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};



export const getUserResumes = async (req, res) => {
    try {
        const userId = req.user.id; 
        const resumes = await Resume.find({ userId }).sort({ createdAt: -1 });

        res.json({ 
            success: true, 
            data: resumes 
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};