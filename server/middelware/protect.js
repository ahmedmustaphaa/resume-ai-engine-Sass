import jwt from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
    const  token  = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.json({ success: false, message: "Not Authorized, Login Again" });
    }

    try {
        // فك تشفير التوكن
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
   
        req.user = { id: token_decode.id }; 
        
        next(); 
    } catch (error) {
        return res.json({ success: false, message: "Invalid Token" });
    }
};