import React, { useEffect } from 'react';
import { Plus, GraduationCap, Trash2 } from 'lucide-react';

function Education({handleGlobalSave, educationList = [],setResumeData, onAdd, onSave, onChange }) {
  
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    onChange(index, name, value);
  };

const handleRemoveEducation = (index) => {
  setResumeData(prev => ({
    ...prev,
    education: prev.education.filter((_, i) => i !== index)
  }));
};

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Education</h2>
          <p className="text-sm text-gray-500 mt-1">Add your education details</p>
        </div>

        <button
          onClick={onAdd}
          className="flex items-center gap-1.5 bg-[#D1FAE5] text-[#065F46] px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#A7F3D0] transition-all"
        >
          <Plus size={18} />
          Add Education
        </button>
      </div>

      {/* Content Area */}
      <div className="flex flex-col gap-4">
        {educationList.length === 0 ? (
          <div className="min-h-[250px] flex flex-col items-center justify-center border-2 border-dashed border-gray-100 rounded-2xl bg-white p-8">
            <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 border border-gray-100">
              <GraduationCap size={40} className="text-gray-300" strokeWidth={1.5} />
            </div>
            <p className="text-gray-600 font-medium text-lg">No education added yet.</p>
            <p className="text-gray-400 text-sm mt-1">Click "Add Education" to get started.</p>
          </div>
        ) : (
          educationList.map((edu, index) => (
            <div key={index} className="relative p-6 border border-gray-100 rounded-2xl bg-white shadow-sm transition-all hover:shadow-md">
              <button onClick={()=>handleRemoveEducation(index)} className="absolute top-4 right-4 text-red-400 hover:text-red-600 transition-colors">
                <Trash2 size={18} />
              </button>

              <h3 className="text-sm font-bold text-gray-800 mb-4">Education #{index + 1}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="institution"
                  value={edu.institution || ''}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Institution Name"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 outline-none text-sm"
                />
                <input
                  type="text"
                  name="degree"
                  value={edu.degree || ''}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Degree (e.g., Bachelor's, Master's)"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 outline-none text-sm"
                />
                <input
                  type="text"
                  name="field"
                  value={edu.field || ''}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Field of Study"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 outline-none text-sm"
                />
                <input
                  type="date"
                  name="date"
                  value={edu.date || ''}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 outline-none text-sm"
                />
                <input
                  type="text"
                  name="gpa"
                  value={edu.gpa || ''}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="GPA (optional)"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 outline-none text-sm md:col-span-2"
                />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Save Button */}
      <div className="mt-2">
        <button
          onClick={handleGlobalSave}
          className="bg-[#D1FAE5] text-[#065F46] px-8 py-2.5 rounded-xl font-bold hover:bg-[#A7F3D0] transition-all border border-[#6EE7B7]/30"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default Education;