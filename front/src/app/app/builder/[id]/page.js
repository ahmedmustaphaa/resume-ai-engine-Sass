"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Download,
  EyeClosed,
  FileText,
  FolderIcon,
  GraduationCap,
  Sparkle,
  User,
  Layout,
  Palette,
} from "lucide-react";

import { useParams } from "next/navigation";

import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import PersronalInformation from "@/app/pages/PersronalInformation";
import ProfessionalSummary from "@/app/pages/ProfessionalSummary";
import ProfessionalExperience from "@/app/pages/ProfessionalExperience";
import Education from "@/app/pages/Education";
import Projects from "@/app/pages/Projects";
import Skills from "@/app/pages/Skills";
import ResumeReview from "@/app/pages/ResumeReview";
import TempleteSelector from "@/app/pages/TempleteSelector";
import ColorPicker from "@/app/pages/ColorBicker";
import { api } from "@/app/utils/api";

// ده بيعرف Next.js إن فيه صفحة افتراضية للـ Build عشان ما يوقفش
export function generateStaticParams() {
  return [{ id: 'default' }]; 
}

// السطر ده بيخلي الصفحات التانية تفتح عادي وقت الـ Runtime (لو فيه Backend)
export const dynamicParams = true;
function Page() {
  const { id } = useParams();

  

// 1. تصحيح الـ State الابتدائي
const [resumeData, setResumeData] = useState({
  _id: "",
  title: "",
  personal_info: { // غيرتها من personalInfo لـ personal_info عشان تطابق الـ onChange
    full_name: "",
    profession: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    website: ""
  },
  professional_summary: "",
  experience: [],
  education: [],
  project: [],
  skills: [],
  template: "modern",
  accent_color: "#3b82f6",
  public: false,
});




    useEffect(() => {
    if (id) {
      loadExistingResume();
    }
  }, [id]);

  const contentRef = useRef(null);

// التعديل الصح في الـ Hook
const handlePrint = useReactToPrint({
  contentRef: contentRef,
  documentTitle: resumeData.personal_info?.full_name || "My-Resume",
  // أضف هذا الجزء لضمان تحميل الـ Styles قبل ظهور نافذة الطباعة
  onBeforeGetContent: () => {
    return Promise.resolve();
  },
});


// 2. تعديل بسيط في الـ loadExistingResume لضمان ثبات الداتا
const loadExistingResume = async () => {
  try {
    const { data } = await api.get(`/resume/get-resume/${id}`);
    if (data.success) {
      const d = data.data;
      setResumeData((prev) => ({
        ...prev,
        _id: d._id,
        personal_info: {
          full_name: d.personalInfo?.fullName || "",
          profession: d.personalInfo?.profession || "",
          email: d.personalInfo?.email || "",
          phone: d.personalInfo?.phone || "",
          location: d.personalInfo?.location || "",
          linkedin: d.personalInfo?.linkedin || "",
          website: d.personalInfo?.website || "",
        },
        professional_summary: d.professionalSummary || "",
        experience: d.experience || [],
        education: d.education || [],
        project: d.projects || [], 
        skills: d.skills || [],
      }));
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

  const [activeSectionsIndex, setActiveSectionsIndex] = useState(0);
  const [removeBackGround, setremoveBackGround] = useState(false);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [showColorMenu, setShowColorMenu] = useState(false);

  const sections = [
    { id: "personal", name: "personal info", icon: User },
    { id: "summary", name: "summary", icon: FileText },
    { id: "experience", name: "experience", icon: Briefcase },
    { id: "education", name: "education", icon: GraduationCap },
    { id: "project", name: "projects", icon: FolderIcon },
    { id: "skills", name: "skills", icon: Sparkle },
  ];

  const activeSection = sections[activeSectionsIndex];



// دالة الحفظ المركزية
const handleGlobalSave = async () => {
    try {
      if (!id) return alert("Resume ID is missing!"); // استخدام id مباشرة

      const formData = new FormData();
      formData.append('resumeData', JSON.stringify(resumeData)); 
      formData.append('resumeId', id); 
      formData.append('removeBackGround', removeBackGround.toString()); // تصحيح الاسم هنا

      // تأكد أن الرابط يطابق الـ Router (شلت كلمة resume لو مش موجودة في الـ Route)
      const response = await api.put(`/update/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.success) {
        alert("Saved Successfully!");
      }
    } catch (error) {
      console.error("Save Error:", error);
      alert("Error saving: " + error.message);
    }
  };
  const updateGlobalSetting = (key, value) => {
    setResumeData((prev) => ({ ...prev, [key]: value }));
  };

const onPersonalInfoChange = (e) => {
  const { name, value } = e.target;

  setResumeData((prev) => ({
    ...prev,
    personal_info: { // التأكد من وجود الـ underscore هنا
      ...prev.personal_info,
      [name]: value, // name هنا لازم يكون fullName
    },
  }));
};

  // --- Education ---
  const handleEducationChange = (index, name, value) => {
    setResumeData((prev) => {
      const updatedEducation = [...prev.education];
      updatedEducation[index] = {
        ...updatedEducation[index],
        [name]: value,
      };

      return { ...prev, education: updatedEducation };
    });
  };

  const addNewEducation = () => {
    setResumeData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          institution: "",
          degree: "",
          field: "",
          date: "",
          gpa: "",
        },
      ],
    }));
  };

  // --- Experience ---
  const handleExperienceChange = (index, name, value) => {
    setResumeData((prev) => {
      const updatedExperience = [...prev.experience];
      updatedExperience[index] = {
        ...updatedExperience[index],
        [name]: value,
      };

      return { ...prev, experience: updatedExperience };
    });
  };

  const addNewExperience = () => {
    setResumeData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          company: "",
          role: "",
          startDate: "",
          endDate: "",
          description: "",
          currentlyWorking: false,
        },
      ],
    }));
  };

  // --- Projects ---
  const handleProjectChange = (index, name, value) => {
    setResumeData((prev) => {
      const updatedProjects = [...prev.project];
      updatedProjects[index] = {
        ...updatedProjects[index],
        [name]: value,
      };

      return { ...prev, project: updatedProjects };
    });
  };

  const addNewProject = () => {
    setResumeData((prev) => ({
      ...prev,
      project: [
        ...prev.project,
        {
          projectName: "",
          projectType: "",
          description: "",
        },
      ],
    }));
  };

  // --- Skills ---
  const handleAddSkill = (skill) => {
    if (!resumeData.skills.includes(skill)) {
      setResumeData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }));
    }
  };

  const handleRemoveSkill = (index) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  } ; return (
    <div className="min-h-screen px-5 md:px-20 py-6 bg-[#F9FAFB]">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Link
          href="/app"
          className="text-[#4470A7] text-[14px] flex items-center gap-2 font-medium hover:underline"
        >
          <ArrowLeft size={14} /> Back To Dashboard
        </Link>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 text-[12px] bg-[#EDDDFF] text-[#C957FA] rounded-lg px-4 py-1.5 transition hover:scale-105">
            <EyeClosed size={16} />
            <p className="font-semibold">Private</p>
          </button>

     <button 
  onClick={() => {
    if (contentRef.current) {
      handlePrint();
    } else {
      alert("الرجاء الانتظار حتى يتم تحميل المعاينة");
    }
  }} 
  className="flex items-center gap-1 text-[12px] bg-[#D2FBE0] text-[#0DA94D] rounded-lg px-4 py-1.5 transition hover:scale-105 shadow-sm"
>
  <Download size={16} />
  <p className="font-semibold">Download</p>
</button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 w-full">

        {/* Left Side */}
        <div className="relative rounded-xl bg-white shadow-sm border border-gray-200 lg:w-[45%] h-fit overflow-visible">

          {/* Progress Bar */}
          <div
            className="absolute top-0 left-0 h-1.5 bg-blue-500 transition-all duration-500"
            style={{
              width: `${((activeSectionsIndex + 1) * 100) / sections.length}%`,
            }}
          ></div>

          {/* Top Controls */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 mt-1">

            <div className="flex gap-2">

              {/* Template */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowTemplateMenu(!showTemplateMenu);
                    setShowColorMenu(false);
                  }}
                  className="flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-md text-sm font-bold border border-blue-100"
                >
                  <Layout size={16} /> Template
                </button>

                {showTemplateMenu && (
                  <div className="absolute top-12 left-0 z-50 shadow-2xl">
                    <TempleteSelector
                      selectedTemplate={resumeData.template}
                      onChange={(id) => {
                        updateGlobalSetting("template", id);
                        setShowTemplateMenu(false);
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Color */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowColorMenu(!showColorMenu);
                    setShowTemplateMenu(false);
                  }}
                  className="flex items-center gap-2 bg-purple-50 text-purple-600 px-3 py-1.5 rounded-md text-sm font-bold border border-purple-100"
                >
                  <Palette size={16} /> Accent
                </button>

                {showColorMenu && (
                  <div className="absolute top-12 left-0 z-50 shadow-2xl">
                    <ColorPicker
                      selectedColor={resumeData.accent_color}
                      onChange={(color) => {
                        updateGlobalSetting("accent_color", color);
                        setShowColorMenu(false);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-4 text-[14px]">
              {activeSectionsIndex > 0 && (
                <button
                  onClick={() =>
                    setActiveSectionsIndex((prev) => prev - 1)
                  }
                  className="flex items-center gap-1 text-gray-500 font-semibold hover:text-blue-600 transition-colors"
                >
                  <ArrowLeft size={16} /> Prev
                </button>
              )}

              {activeSectionsIndex < sections.length - 1 && (
                <button
                  onClick={() =>
                    setActiveSectionsIndex((prev) => prev + 1)
                  }
                  className="flex items-center gap-1 text-gray-500 font-semibold hover:text-blue-600 transition-colors"
                >
                  Next <ArrowRight size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Dynamic Sections */}
          <div className="p-6">

          {activeSection.id === "personal" && (

            
  <PersronalInformation
  handleGlobalSave={handleGlobalSave}
    data={resumeData.personal_info} // التأكد إن الـ Key مطابق للـ State فوق
    onChange={onPersonalInfoChange}
    removeBackGround={removeBackGround}
    setremoveBackGround={setremoveBackGround}
  />
)}

            {activeSection.id === "summary" && (
              <ProfessionalSummary
              handleGlobalSave={handleGlobalSave}
                data={resumeData.professional_summary}
                onChange={(val) =>
                  updateGlobalSetting("professional_summary", val)
                }
              />
            )}

            {activeSection.id === "experience" && (
              <ProfessionalExperience
              handleGlobalSave={handleGlobalSave}
              setResumeData={setResumeData}
                experiences={resumeData.experience}
                onAdd={addNewExperience}
                onChange={handleExperienceChange}
              />
            )}

            {activeSection.id === "education" && (
              <Education
              handleGlobalSave={handleGlobalSave}
              
          setResumeData={setResumeData}
                educationList={resumeData.education}
                onAdd={addNewEducation}
                onChange={handleEducationChange}
              />
            )}

            {activeSection.id === "project" && (
              <Projects
              handleGlobalSave={handleGlobalSave}
              setResumeData={setResumeData}
                projects={resumeData.project}
                onAdd={addNewProject}
                onChange={handleProjectChange}
              />
            )}

            {activeSection.id === "skills" && (
              <Skills
              handleGlobalSave={handleGlobalSave}
                skills={resumeData.skills}
                onAddSkill={handleAddSkill}
                onRemoveSkill={handleRemoveSkill}
              />
            )}
        
          </div>
         
        </div>



{/* الـ Preview في جهة اليمين */}
<div className="flex-1 sticky top-6 h-fit">
  <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
    {/* التعديل هنا: أضف id="resume-print-area" ليتطابق مع الـ CSS */}
    <div ref={contentRef} id="resume-print-area" className="w-full h-full bg-white">
      <ResumeReview
        data={resumeData}
        info={resumeData.personal_info}
        templet={resumeData.template}
        accentColor={resumeData.accent_color}
      />
    </div>
  </div>
</div>
      </div>
         
    
    </div>
  );
}

export default Page;