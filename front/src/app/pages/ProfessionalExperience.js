import React, { useState } from 'react';
import { Plus, Briefcase, Trash2, Sparkles, Loader2 } from 'lucide-react';
import { api } from '../utils/api.js';

function ProfessionalExperience({handleGlobalSave, experiences = [],setResumeData, onAdd, onSave, onChange, onRemove }) {
  // state لمتابعة أي خبرة بيتم معالجتها حالياً بواسطة الـ AI
  const [loadingIndex, setLoadingIndex] = useState(null);

  const handleChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const updatedValue = type === 'checkbox' ? checked : value;
    onChange(index, name, updatedValue);
  };

  const handleEnhance = async (index) => {
    const currentDescription = experiences[index]?.description;
    const currentRole = experiences[index]?.role;

    if (!currentDescription && !currentRole) {
      alert("Please enter a job title or a brief description first.");
      return;
    }

    setLoadingIndex(index);
    try {
      const response = await api.post('/ai/enhance-job', { 
        role: currentRole,
        description: currentDescription 
      });
      
      // استخراج النص فقط لتجنب مشكلة الـ Object Object
      const enhancedText = response.data?.data || response.data;
      
      if (typeof enhancedText === 'string') {
        onChange(index, 'description', enhancedText);
      }
    } catch (error) {
      console.error("AI Enhance Error:", error);
    } finally {
      setLoadingIndex(null);
    }
  };

const handleDeleteItem = (index) => {
    setResumeData((prev) => ({
      ...prev,
      // تأكد من اسم الحقل: لو في الـ State اسمه 'experience' (مفرد) خليه مطابق
      experience: (prev.experience || []).filter((_, i) => i !== index)
    }));
  };
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Professional Experience</h2>
          <p className="text-sm text-gray-500 mt-1">Add your job experience</p>
        </div>

        <button
          onClick={onAdd}
          className="flex items-center gap-1.5 bg-[#D1FAE5] text-[#065F46] px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#A7F3D0] transition-all"
        >
          <Plus size={18} />
          Add Experience
        </button>
      </div>

      {/* منطقة المحتوى */}
      <div className="flex flex-col gap-4">
        {experiences.length === 0 ? (
          <div className="min-h-[250px] flex flex-col items-center justify-center border-2 border-dashed border-gray-100 rounded-2xl bg-white p-8">
            <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 border border-gray-100">
              <Briefcase size={40} className="text-gray-300" strokeWidth={1.5} />
            </div>
            <p className="text-gray-600 font-medium text-lg">No work experience added yet.</p>
            <p className="text-gray-400 text-sm mt-1">Click "Add Experience" to get started.</p>
          </div>
        ) : (
          experiences.map((exp, index) => (
            <div key={index} className="relative p-6 border border-gray-100 rounded-2xl bg-white shadow-sm transition-all hover:shadow-md">
              
              {/* زر الحذف - تأكد من تمرير onRemove من الـ Parent */}
              <button 

                onClick={() => handleDeleteItem(index)}
                className="absolute top-4 right-4 text-red-300 hover:text-red-500 transition-colors"
              >
                <Trash2 size={18} />
              </button>

              <h3 className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-4">Experience #{index + 1}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="company"
                  value={exp.company || ''}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Company Name"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                />
                
                <input
                  type="text"
                  name="role"
                  value={exp.role || ''}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Job Title"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                />

                <input
                  type="date"
                  name="startDate"
                  value={exp.startDate || ''}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 outline-none text-sm"
                />

                <input
                  type="date"
                  name="endDate"
                  value={exp.endDate || ''}
                  disabled={exp.currentlyWorking}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 outline-none text-sm disabled:bg-gray-50"
                />
              </div>

              <div className="flex items-center gap-2 mt-4">
                <input
                  type="checkbox"
                  id={`current-${index}`}
                  name="currentlyWorking"
                  checked={exp.currentlyWorking || false}
                  onChange={(e) => handleChange(index, e)}
                  className="w-4 h-4 rounded text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor={`current-${index}`} className="text-xs text-gray-500 font-medium">
                  Currently working here
                </label>
              </div>

              {/* الوصف مع الـ AI */}
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-bold text-gray-700">Job Description</label>
                  <button 
                    onClick={() => handleEnhance(index)}
                    disabled={loadingIndex === index}
                    className="flex items-center gap-1 text-[10px] text-purple-600 font-bold bg-purple-50 px-2 py-1 rounded-md hover:bg-purple-100 transition-all disabled:opacity-50"
                  >
                    {loadingIndex === index ? (
                      <Loader2 size={12} className="animate-spin" />
                    ) : (
                      <Sparkles size={12} />
                    )}
                    {loadingIndex === index ? 'Generating...' : 'Enhance with AI'}
                  </button>
                </div>
                <textarea
                  name="description"
                  value={exp.description || ''}
                  onChange={(e) => handleChange(index, e)}
                  rows="4"
                  placeholder="Describe your key responsibilities and achievements..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm resize-none"
                ></textarea>
              </div>
            </div>
          ))
        )}
      </div>

      {/* زر الحفظ */}
      <div className="mt-2">
        <button
          onClick={handleGlobalSave}
          className="bg-[#D1FAE5] text-[#065F46] px-8 py-2.5 rounded-xl font-bold hover:bg-[#A7F3D0] transition-all active:scale-95 border border-[#6EE7B7]/30"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default ProfessionalExperience;