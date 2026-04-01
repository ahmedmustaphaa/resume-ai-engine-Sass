"use client";

import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Upload, 
  X, 
  Trash2, 
  Pencil, 
  Loader2, 
  FileText, 
  Share2, 
  CheckCircle2,
  Zap,
  ChevronRight
} from "lucide-react";
import { useRouter } from "next/navigation";
import { api } from "../utils/api"; 

function MyResumes() {
  const router = useRouter();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // جلب البيانات عند تحميل الصفحة
  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/resume/get-resume');
      if (data.success) setResumes(data.resumes || []);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

const extractTextFromPDF = async (file) => {
    try {
      // استخدام CDN مباشرة في المتصفح عشان نهرب من Webpack خالص
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
      document.head.appendChild(script);

      await new Promise((resolve) => (script.onload = resolve));

      const pdfjs = window['pdfjs-dist/build/pdf'];
      pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;

      let fullText = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        fullText += textContent.items.map((item) => item.str).join(" ") + "\n";
      }
      return fullText.trim();
    } catch (err) {
      console.error("PDF Runtime Error:", err);
      throw new Error("فشل استخراج النص");
    }
  };
const handleCreate = async () => {
    if (!resumeTitle.trim()) return;
    setIsSubmitting(true);
    try {
      const { data } = await api.post('/resume/create-resume', { title: resumeTitle });
      
      // التعديل هنا: استخدم data.resumeId اللي راجعة من الباك إند مباشرة
      if (data.success && data.resumeId) {
        router.push(`/app/builder/${data.resumeId}`);
      }
    } catch (error) {
      console.error("Create Error:", error);
      alert("Error creating resume");
    } finally {
      setIsSubmitting(false);
      setOpenCreateModal(false);
    }
  };


const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "application/pdf") return;
    
    setIsUploading(true);
    try {
      // استخراج النص من الملف
      const text = await extractTextFromPDF(file);
      
      // إرسال النص للباك إند
      const { data } = await api.post('/ai/extract-upload', { 
        resumeText: text, 
        title: file.name.replace(".pdf", "") 
      });

      console.log(data)

      // التأكد من مسمى الـ ID (استخدمنا هنا resumeId ليتطابق مع الـ Controller)
      if (data.success && data.resumeId) {
        router.push(`/app/builder/${data.resumeId}`);
      } else if (data.resumeId) {
        // حالة احتياطية لو الـ success مش مبعوتة
        router.push(`/app/builder/${data.resumeId}`);
      } else {
        alert("فشل الحصول على معرف السيرة الذاتية من السيرفر");
      }

    } catch (error) {
      console.error("AI Analysis Failed:", error);
      // إظهار رسالة الخطأ الحقيقية اللي راجعة من السيرفر
      const msg = error.response?.data?.message || "حدث خطأ أثناء تحليل الملف";
      alert(msg);
    } finally {
      setIsUploading(false);
      setOpenUploadModal(false);
    }
  };
  // حذف السيرة الذاتية
  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm("حذف السيرة الذاتية نهائياً؟")) return;
    try {
      const { data } = await api.delete(`/resume/delete-Resume/${id}`);
      if (data.success) setResumes(prev => prev.filter(res => res._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-900 p-6 md:p-12 lg:px-24 font-sans relative overflow-x-hidden">
      
      {/* --- Ambient Background --- */}
      <div className="fixed inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-200/50 blur-[140px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-200/50 blur-[120px] rounded-full" />
      </div>

      {/* --- Header Section --- */}
      <div className="relative z-10 mb-12 flex flex-col md:flex-row justify-between items-center border-b-2 border-slate-200 pb-10 gap-6">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-[#00A86B] rounded-[1.2rem] flex items-center justify-center shadow-2xl shadow-emerald-500/30">
            <span className="text-white font-black text-3xl tracking-tighter uppercase">r</span>
          </div>
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">
              AI <span className="text-[#00A86B]">Resume</span>
            </h1>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-2">Professional Builder v2.0</p>
          </div>
        </div>
        
        <div className="flex items-center gap-5 bg-white p-2.5 px-6 rounded-[1.5rem] border-2 border-slate-200 shadow-md">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Operator</span>
            <span className="text-sm font-bold text-slate-900">Ahmed M.</span>
          </div>
          <div className="w-px h-8 bg-slate-100" />
          <button className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-xs font-black hover:bg-rose-600 transition-all shadow-lg shadow-black/10">Logout</button>
        </div>
      </div>

      {/* --- Main Action Cards --- */}
      <div className="relative z-10 flex flex-col md:flex-row gap-8 mb-20">
        {/* Create Blank Card */}
        <div 
          onClick={() => setOpenCreateModal(true)}
          className="group cursor-pointer relative flex-1 bg-white border-b-[10px] border-emerald-500 rounded-[3rem] p-12 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 overflow-hidden border-2 border-transparent hover:border-slate-100"
        >
          <div className="relative z-10">
            <div className="w-20 h-20 rounded-3xl bg-emerald-500 text-white flex items-center justify-center mb-8 shadow-lg shadow-emerald-500/40 group-hover:scale-110 transition-transform duration-500">
              <Plus size={40} strokeWidth={3} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Create New</h2>
            <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">Start a fresh project</p>
          </div>
        </div>

        {/* AI PDF Import Card */}
        <div 
          onClick={() => setOpenUploadModal(true)}
          className="group cursor-pointer relative flex-1 bg-white border-b-[10px] border-blue-600 rounded-[3rem] p-12 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 overflow-hidden border-2 border-transparent hover:border-slate-100"
        >
          <div className="relative z-10">
            <div className="w-20 h-20 rounded-3xl bg-blue-600 text-white flex items-center justify-center mb-8 shadow-lg shadow-blue-600/40 group-hover:scale-110 transition-transform duration-500">
              <Upload size={36} strokeWidth={3} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">AI Import</h2>
            <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">Analyze Existing PDF</p>
          </div>
        </div>
      </div>

      {/* --- Section Divider --- */}
      <div className="relative z-10 flex items-center gap-6 mb-12">
        <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.5em] whitespace-nowrap">Neural Workspace</h3>
        <div className="flex-1 h-0.5 bg-slate-200 rounded-full" />
      </div>

      {/* --- Resumes Grid --- */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {loading ? (
          <div className="col-span-full py-32 flex flex-col items-center gap-6">
            <Loader2 className="animate-spin text-emerald-500" size={50} />
            <p className="text-slate-400 font-black tracking-[0.4em] text-xs uppercase">Connecting to Database...</p>
          </div>
        ) : resumes.length > 0 ? (
          resumes.map((resume) => (
            <div key={resume._id} className="bg-white border-2 border-slate-200 rounded-[2.8rem] p-8 flex flex-col h-[26rem] shadow-lg hover:border-emerald-500 transition-all group relative overflow-hidden">
              <div className="flex justify-between items-start mb-10">
                <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 group-hover:border-emerald-100 transition-all duration-500">
                  <FileText size={32} />
                </div>
                <div className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest shadow-md">
                   <Zap size={10} fill="white" /> AI Active
                </div>
              </div>

              <div className="mb-auto">
                <h4 className="text-2xl font-black text-slate-900 mb-3 leading-tight truncate group-hover:text-emerald-600 transition-colors">
                  {resume.title || "New Project"}
                </h4>
                <div className="flex items-center gap-2 text-slate-400">
                   <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-emerald-400 transition-colors" />
                   <p className="text-[10px] font-bold uppercase tracking-widest">Updated {new Date(resume.updatedAt).toLocaleDateString()}</p>
                </div>
              </div>

              {/* High Contrast Score Bar */}
              <div className="mb-10 p-5 bg-slate-50 rounded-[1.8rem] border border-slate-100">
                <div className="flex justify-between items-end mb-3">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">ATS Compatibility</span>
                  <span className="text-xl font-black text-emerald-600 tracking-tighter">94%</span>
                </div>
                <div className="w-full h-3.5 bg-slate-200 rounded-full overflow-hidden p-[2px]">
                  <div className="h-full bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all duration-1000" style={{ width: '94%' }} />
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t-2 border-slate-100">
                <button 
                  onClick={() => router.push(`/app/builder/${resume._id}`)}
                  className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.15em] text-slate-900 hover:text-emerald-600 transition-all"
                >
                  EditCore <ChevronRight size={14} strokeWidth={4} />
                </button>
                <div className="flex gap-4">
                  <button className="text-slate-300 hover:text-blue-500 transition-colors"><Share2 size={20} /></button>
                  <button onClick={(e) => handleDelete(e, resume._id)} className="text-slate-300 hover:text-rose-500 transition-colors"><Trash2 size={20} /></button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full border-4 border-dashed border-slate-200 rounded-[4rem] py-40 text-center flex flex-col items-center gap-4">
             <FileText size={60} className="text-slate-200" />
             <p className="text-slate-300 font-black uppercase tracking-[0.6em] text-sm">Workspace Empty</p>
          </div>
        )}
      </div>

      {/* --- Modals Implementation --- */}

      {/* New Project Modal */}
      {openCreateModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[3rem] w-full max-w-lg p-12 shadow-2xl border-2 border-slate-100 animate-in zoom-in-95 duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full" />
            <div className="flex justify-between items-center mb-10 relative z-10">
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic">Initialize</h2>
              <button onClick={() => setOpenCreateModal(false)} className="p-3 hover:bg-slate-100 rounded-full text-slate-400 transition-all"><X size={24} /></button>
            </div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4 ml-2">Project Identity</label>
            <input 
              type="text" 
              placeholder="Enter Resume Title..." 
              className="w-full p-6 bg-slate-50 border-2 border-slate-100 rounded-3xl mb-10 outline-none focus:border-emerald-500 focus:bg-white font-black text-xl transition-all shadow-inner"
              value={resumeTitle}
              onChange={(e) => setResumeTitle(e.target.value)}
              autoFocus
            />
            <button 
              onClick={handleCreate}
              disabled={isSubmitting || !resumeTitle.trim()}
              className="w-full bg-emerald-500 text-white p-6 rounded-3xl font-black uppercase tracking-[0.2em] flex items-center justify-center gap-4 hover:bg-emerald-600 transition-all disabled:opacity-50 shadow-xl shadow-emerald-500/20"
            >
              {isSubmitting ? <Loader2 className="animate-spin" /> : <CheckCircle2 size={24} strokeWidth={3} />}
              Confirm Project
            </button>
          </div>
        </div>
      )}

      {/* AI PDF Upload Modal */}
      {openUploadModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[3rem] w-full max-w-lg p-12 shadow-2xl border-2 border-slate-100 animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic">AI Engine</h2>
              <button onClick={() => setOpenUploadModal(false)} className="p-3 hover:bg-slate-100 rounded-full text-slate-400 transition-all"><X size={24} /></button>
            </div>
            <div className="border-4 border-dashed border-slate-200 rounded-[3rem] p-16 flex flex-col items-center justify-center gap-8 mb-10 bg-slate-50 hover:bg-blue-50/50 hover:border-blue-500/40 transition-all relative group overflow-hidden">
              <div className="w-24 h-24 rounded-[2rem] bg-blue-600 text-white flex items-center justify-center shadow-2xl shadow-blue-600/30 group-hover:scale-110 transition-transform duration-500 relative z-10">
                <Zap size={44} fill="white" />
              </div>
              <div className="text-center relative z-10">
                <p className="text-sm font-black text-slate-900 uppercase tracking-tighter mb-2">Neural PDF Extraction</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Select file to begin analysis</p>
              </div>
              <input type="file" accept=".pdf" className="absolute inset-0 opacity-0 cursor-pointer z-20" onChange={handleUpload} disabled={isUploading} />
            </div>
            {isUploading && (
              <div className="flex flex-col items-center gap-4 text-blue-600 font-black uppercase tracking-[0.3em] text-xs">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-.3s]" />
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-.5s]" />
                </div>
                Parsing Intelligence
              </div>
            )}
            {!isUploading && (
              <button onClick={() => setOpenUploadModal(false)} className="w-full text-slate-400 font-black uppercase tracking-widest text-[10px] hover:text-rose-500 transition-colors">Abort System</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default MyResumes;