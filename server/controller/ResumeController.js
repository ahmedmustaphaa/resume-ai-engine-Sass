import { imageKit } from "../config/imageKitInstance.js";
import { Resume } from "../model/Resume.js";

export const createResume = async (req, res) => {
    try {
   
        const { title } = req.body;
        const userId = req.user.id;
        if (!title) {
            return res.json({ 
                success: false, 
                message: "من فضلك ادخل عنوان السيرة الذاتية أولاً" 
            });
        }

        // 4. إنشاء السجل بالحد الأدنى من البيانات
        const newResume = await Resume.create({
            userId,
            title,        });

        res.status(201).json({ 
            success: true,
            title,
            message: "تم البدء بنجاح", 
            resumeId: newResume._id 
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getUserResumes = async (req, res) => {
    try {
        const userId = req.user.id; // بناخده من الـ middleware بتاع الـ auth

        // بنبحث عن كل الـ resumes اللي تخص اليوزر ده 
        // وبنرتبهم من الأحدث للأقدم باستخدام sort
        const resumes = await Resume.find({ userId }).sort({ updatedAt: -1 });

        res.status(200).json({ 
            success: true, 
            resumes 
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteResume = async (req, res) => {
    try {
        const { resumeId } = req.params; // 1. استلام معرف الـ CV
        const userId = req.user.id;      // 2. استلام معرف المستخدم من التوكن

        // 3. الحذف بشرطين (المعرف والمالك)
        const deletedResume = await Resume.findOneAndDelete({ 
            _id: resumeId, 
            userId: userId 
        });

        if (!deletedResume) {
            return res.status(404).json({ success: false, message: "الـ Resume غير موجود أو ليس لديك صلاحية لحذفه" });
        }

        res.json({ success: true, message: "تم الحذف بنجاح" });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}



export const getResumeById = async (req, res) => {
    try {
        // 1. استخراج الـ ID من الرابط (URL)
        const { id } = req.params; 
        
        // 2. الحصول على ID المستخدم من التوكن للتحقق من الملكية
        const userId = req.user.id;

        // 3. البحث عن الـ Resume بشرطين: الـ ID بتاعها وأنها تخص هذا المستخدم
        const resume = await Resume.findOne({ _id: id, userId: userId });

        // 4. لو ملقيناش الـ Resume (إما الـ ID غلط أو مش بتاع اليوزر ده)
        if (!resume) {
            return res.status(404).json({ 
                success: false, 
                message: "لم يتم العثور على السيرة الذاتية أو لا تملك صلاحية الوصول" 
            });
        }

        // 5. الرد بالبيانات كاملة
        res.json({ 
            success: true, 
            data: resume 
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getPublicResume = async (req, res) => {
    try {
        const { id } = req.params;
        const resume = await Resume.findById(id);
        if (!resume) {
            return res.status(404).json({ success: false, message: "السيرة الذاتية غير موجودة" });
        }
        if (!resume.public) {
            return res.status(403).json({ 
                success: false, 
                message: "عذراً، هذه السيرة الذاتية خاصة ولا يمكن عرضها للعامة" 
            });
        }

        // 3. إرجاع البيانات لو الشروط تمام
        res.json({ success: true, data: resume });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateResume = async (req, res) => {
    try {
        const userId = req.user.id;
        const { resumeId, resumeData, removeBackGround } = req.body;

        const image = req.file;
        let resumeDataCopy = {};
        if (resumeData) {
            resumeDataCopy = JSON.parse(resumeData);
        }
        if (image) {
            const response = await imageKit.upload({
                file: fs.createReadStream(image.path), // بنقرأ الملف من المسار المؤقت
                fileName: `resume-${userId}.png`,
                folder: 'user-resumes',
                // السحر هنا: قص الوجه ومسح الخلفية لو مطلوب
                transformation: {
                    pre: `w-300,h-300,fo-face,z-0.75${removeBackGround === "true" ? ',e-bgremove' : ''}`
                }
            });

            // تأكد إن السكيما عندك فيها personalInfo مش personal_info (حسب ما عرفتها قبل كدة)
            if (!resumeDataCopy.personalInfo) resumeDataCopy.personalInfo = {};
            resumeDataCopy.personalInfo.image = response.url;
            
            // مسح الملف المؤقت من سيرفرك بعد الرفع لـ ImageKit عشان المساحة
            fs.unlinkSync(image.path);
        }

        // 4. التحديث في الداتابيز (استخدمنا findOneAndUpdate للأمان)
        const resume = await Resume.findOneAndUpdate(
            { _id: resumeId, userId: userId }, // شرط: الـ ID صح والمستخدم هو المالك
            { $set: resumeDataCopy }, 
            { new: true }
        );

        if (!resume) {
            return res.status(404).json({ success: false, message: "Resume not found or unauthorized" });
        }

        res.json({ success: true, message: "Saved successfully", resume });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}