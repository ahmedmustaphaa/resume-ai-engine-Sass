import { ai } from "../config/gemAi.js";
import { Resume } from "../model/Resume.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from 'axios'
export const enhanceProfessionalSummary = async (req, res) => {
    try {
        const { userContent } = req.body;
        if (!userContent) {
            return res.status(400).json({ success: false, message: "يا هندسة فين النص اللي هنحسنه؟" });
        }
        console.log(userContent)
        console.log(process.env.OPEN_AI_MODEL)
        const response = await ai.chat.completions.create({
            model:"gemini-3-flash-preview",
            messages: [
                { 
                    role: "system", 
                    content: `You are an expert Resume Writer and Career Coach. 
                    Your task is to enhance the user's professional summary. 
                    Rules:
                    1. Use strong action verbs and professional vocabulary.
                    2. Keep it concise (max 3-4 impactful sentences).
                    3. Focus on achievements and value proposition.
                    4. Tone: Professional, confident, and modern.
                    5. Output: Return ONLY the enhanced text, no conversational filler like 'Here is your summary'.` 
                },
                {
                    role: "user",
                    content: `Please enhance this summary: "${userContent}"`,
                },
            ],
            temperature: 0.7, 
        });
        const enhancedText = response.choices[0].message.content.trim();
        res.json({ 
            success: true, 
            message: "Summary enhanced successfully!", 
            data: enhancedText 
        });

    } catch (error) {
      console.error("Full error object:", error);
     res.status(500).json({ success: false, message: error.message });
        
    }
}
export const enhanceJobDescription = async (req, res) => {
    try {
        // بنستلم النص اللي اليوزر كتبه في خانة الـ Description للوظيفة الحالية
        const { rawDescription } = req.body; 

        if (!rawDescription) {
            return res.status(400).json({ success: false, message: "فين الكلام اللي هنحسنه يا هندسة؟" });
        }

        const response = await ai.chat.completions.create({
            model: process.env.OPEN_AI_MODEL,
            messages: [
                { 
                    role: "system", 
                    content: `You are a professional Resume Editor. 
                    Rewrite the following job description into professional bullet points.
                    - Use the 'Action Verb + Task + Result' format.
                    - Make it sound high-impact.
                    - Output ONLY the bullet points, no extra text.` 
                },
                {
                    role: "user",
                    content: `Improve this description: "${rawDescription}"`,
                },
            ],
        });

        const enhancedText = response.choices[0].message.content.trim();

        res.json({ 
            success: true, 
            data: enhancedText 
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const uploadResume = async (req, res) => {
  try {
    const { resumeText, title } = req.body;
    const userId = req.user?.id; // تأكد إن الـ middleware بيبعت الـ id هنا صح

    if (!resumeText) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const response = await ai.chat.completions.create({
      model: process.env.OPEN_AI_MODEL,
      messages: [
        {
          role: "system",
          content: `You are an expert AI Agent. Extract data from resume and return ONLY valid JSON.
          IMPORTANT: Use these EXACT keys:
          {
            "professionalSummary": "",
            "personalInfo": { "fullName": "", "profession": "", "email": "", "phone": "", "location": "", "linkedin": "", "website": "" },
            "skills": [],
            "experience": [{ "company": "", "position": "", "startDate": "", "endDate": "", "description": "", "isCurrent": false }],
            "projects": [{ "name": "", "type": "", "description": "" }],
            "education": [{ "institution": "", "degree": "", "field": "", "graduationDate": "", "gpa": "" }]
          }`
        },
        {
          role: "user",
          content: `extract data from this resume text: ${resumeText}`
        }
      ],
      response_format: { type: "json_object" }
    });

    const extractedData = response.choices[0].message.content; 
    const parsedData = JSON.parse(extractedData);

    // هنا بنعمل Merge للداتا مع التأكد إن الـ userId والـ title مبعوتين صح
    const newResume = await Resume.create({
      userId,
      title: title || "New Resume",
      professionalSummary: parsedData.professionalSummary,
      personalInfo: parsedData.personalInfo,
      skills: parsedData.skills,
      experience: parsedData.experience,
      projects: parsedData.projects,
      education: parsedData.education
    });

    res.json({ success: true, resumeId: newResume._id });

  } catch (error) {
    console.error("AI Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};