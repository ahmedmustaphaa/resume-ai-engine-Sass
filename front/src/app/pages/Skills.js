import React, { useState } from 'react';
import { Plus, Sparkle, X } from 'lucide-react';

function Skills({handleGlobalSave, skills = [], onAddSkill, onRemoveSkill, onSave }) {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (inputValue.trim()) {
      onAddSkill(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-900">Skills</h2>
        <p className="text-sm text-gray-500 mt-1">Add your technical and soft skills</p>
      </div>

      {/* Input Field and Add Button */}
      <div className="flex gap-3">
        <input
          type="text"
          className="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 text-sm"
          placeholder="Enter a skill (e.g., JavaScript, Project Management)"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
        />
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 transition-all active:scale-95 shadow-sm"
        >
          <Plus size={18} />
          Add
        </button>
      </div>

      {/* Skills Display Area */}
      <div className="min-h-[180px] flex flex-col items-center justify-center border-2 border-dashed border-gray-100 rounded-2xl bg-white p-6">
        {skills.length === 0 ? (
          <div className="text-center flex flex-col items-center">
            <Sparkle size={40} className="text-gray-200 mb-3" />
            <p className="text-gray-600 font-medium">No skills added yet.</p>
            <p className="text-gray-400 text-sm mt-1">Add your technical and soft skills above.</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 w-full self-start">
            {skills.map((skill, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg border border-blue-100 text-sm font-medium animate-in fade-in zoom-in duration-200"
              >
                {skill}
                <button onClick={() => onRemoveSkill(index)} className="hover:text-red-500">
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tip Box */}
      <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
        <p className="text-sm text-blue-800 leading-relaxed">
          <span className="font-bold">Tip:</span> Add 8-12 relevant skills. Include both technical skills (programming languages, tools) and soft skills (leadership, communication).
        </p>
      </div>

      {/* Save Button */}
      <div className="mt-2 text-left">
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

export default Skills;