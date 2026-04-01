import mongoose from "mongoose";

const schemaResume = new mongoose.Schema({
    // ربط السيرة الذاتية بالمستخدم
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    // إعدادات القالب والمظهر
    title: { type: String, required: true }, // عنوان الـ Resume (مثلاً: My Web Dev CV)
    public: { type: Boolean, default: false }, // هل السيرة الذاتية عامة أم خاصة
    template: { type: String, default: "classic" }, // نوع القالب المختار
    accentColor: { type: String, default: "#4f46e5" }, 

    personalInfo: {
        image: { type: String }, // URL الصورة
        fullName: { type: String },
        profession: { type: String },
        email: { type: String },
        phone: { type: String },
        location: { type: String },
        linkedin: { type: String },
        website: { type: String }
    },

    // الملخص المهني والمهارات
    professionalSummary: { type: String },
    skills: [String], // مصفوفة نصوص بسيطة للمهارات

    // الخبرة العملية
    experience: [{
        company: { type: String },
        position: { type: String },
        startDate: { type: String },
        endDate: { type: String },
        description: { type: String },
        isCurrent: { type: Boolean, default: false }
    }],

    // المشاريع
    projects: [{
        name: { type: String },
        type: { type: String }, // مثلاً: Web App, Mobile App
        description: { type: String }
    }],

    // التعليم
    education: [{
        institution: { type: String },
        degree: { type: String },
        field: { type: String },
        graduationDate: { type: String },
        gpa: { type: String }
    }]

}, { timestamps: true });

export const Resume = mongoose.model('resume', schemaResume);