import express from 'express';
import { authMiddleware } from '../middelware/protect.js';
import { createResume, deleteResume, getResumeById, getUserResumes, updateResume } from '../controller/ResumeController.js';
import { upload } from '../config/multer.js';



const resumeRouter=express.Router();
resumeRouter.post('/create-resume',authMiddleware,createResume);
resumeRouter.get('/get-resume',authMiddleware,getUserResumes);
resumeRouter.delete('/delete-Resume/:resumeId',authMiddleware,deleteResume);
resumeRouter.get('/get-resume/:id',authMiddleware,getResumeById);
resumeRouter.get('/get-public-resume/:id',authMiddleware,getResumeById);
resumeRouter.put('/update/:resumeId',authMiddleware,upload.single('image'),updateResume);


export default resumeRouter;