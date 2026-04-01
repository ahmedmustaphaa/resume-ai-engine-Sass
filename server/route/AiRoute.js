import express from 'express';
import { enhanceProfessionalSummary  ,  enhanceJobDescription, uploadResume  } from '../controller/AiController.js';
  

import { authMiddleware } from '../middelware/protect.js';


export const AiRouter = express.Router();

AiRouter.post('/enhance-summary', authMiddleware, enhanceProfessionalSummary);
AiRouter.post('/enhance-job', authMiddleware, enhanceJobDescription);
AiRouter.post('/extract-upload',authMiddleware, uploadResume);