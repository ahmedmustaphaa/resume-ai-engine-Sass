import React from 'react';
import { Plus, FolderDot, Trash2 } from 'lucide-react';

function Projects({handleGlobalSave, projects = [],setResumeData, onAdd, onSave, onChange }) {
  
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    onChange(index, name, value);
  };

  const handleDeleteItem = (index) => {
    setResumeData((prev) => ({
      ...prev,
     
      project: (prev.project || []).filter((_, i) => i !== index)
    }));
  };
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Projects</h2>
          <p className="text-sm text-gray-500 mt-1">Add your projects</p>
        </div>

        <button
          onClick={onAdd}
          className="flex items-center gap-1.5 bg-[#D1FAE5] text-[#065F46] px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#A7F3D0] transition-all"
        >
          <Plus size={18} />
          Add Project
        </button>
      </div>

      {/* Content Area */}
      <div className="flex flex-col gap-4">
        {projects.length === 0 ? (
          /* Empty State */
          <div className="min-h-[250px] flex flex-col items-center justify-center border-2 border-dashed border-gray-100 rounded-2xl bg-white p-8">
            <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 border border-gray-100">
              <FolderDot size={40} className="text-gray-300" strokeWidth={1.5} />
            </div>
            <p className="text-gray-600 font-medium text-lg">No projects added yet.</p>
            <p className="text-gray-400 text-sm mt-1">Click "Add Project" to get started.</p>
          </div>
        ) : (
          /* Projects Forms */
          projects.map((proj, index) => (
            <div key={index} className="relative p-6 border border-gray-100 rounded-2xl bg-white shadow-sm transition-all hover:shadow-md">
              {/* زر الحذف */}
              <button onClick={()=>handleDeleteItem(index)} className="absolute top-4 right-4 text-red-400 hover:text-red-600 transition-colors">
                <Trash2 size={18} />
              </button>

              <h3 className="text-sm font-bold text-gray-800 mb-4">Project #{index + 1}</h3>

              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  name="projectName"
                  value={proj.projectName || ''}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Project Name"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 outline-none text-sm transition-all"
                />
                
                <input
                  type="text"
                  name="projectType"
                  value={proj.projectType || ''}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Project Type (e.g., Full Stack, Mobile App)"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 outline-none text-sm transition-all"
                />

                <textarea
                  name="description"
                  value={proj.description || ''}
                  onChange={(e) => handleChange(index, e)}
                  rows="4"
                  placeholder="Describe your project..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 outline-none text-sm transition-all resize-none"
                ></textarea>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Save Button */}
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

export default Projects;