import express from 'express';
import { loginUser, registerUser ,getUserProfile, getUserResumes} from '../controller/userController.js';
import { authMiddleware } from '../middelware/protect.js';

const userRouter=express.Router();


userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);
userRouter.get('/data',authMiddleware, getUserProfile)
userRouter.get('/resume',authMiddleware, getUserResumes)


export default userRouter;