import mongoose from 'mongoose';
import 'dotenv/config'; // لو شغال ES Modules

export const connectedDb = async () => {
    try {
        await mongoose.connect(process.env.MONGOOSE_URL);
        console.log("Database Connected Successfully! ✅"); // دي مش هتطبع إلا لو الاتصال نجح فعلاً
    } catch (error) {
        console.error("Database Connection Error ❌:", error.message);
    }
}