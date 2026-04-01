import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { connectedDb } from './config/db.js';
import userRouter from './route/userRoute.js';
import resumeRouter from './route/ResumeRoute.js';
import { AiRouter } from './route/AiRoute.js';

dotenv.config();

const app = express();

app.user(express.json())
app.use(cors({
  origin: true, 
  credentials: true
}));

app.get('/', (req, res) => {
  res.send('Server is running and active!');
});

// الـ Routes
app.use('/api/user', userRouter);
app.use('/api/resume', resumeRouter);
app.use('/api/ai', AiRouter);

// الاتصال بالداتابيز
connectedDb();

// --- التعديل المهم هنا ---

// 1. تصدير الـ app لبيئة Vercel
export default app; 

// 2. تشغيل الـ listen فقط في البيئة المحلية (Local)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}