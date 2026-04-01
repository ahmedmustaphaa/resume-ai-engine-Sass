import React from 'react';
import ClassicTemplate from '@/assets/templates/ClassicTemplate';
import MinimalTemplate from '@/assets/templates/MinimalTemplate';
import MinimalImageTemplate from '@/assets/templates/MinimalImageTemplate';
import ModernTemplate from '@/assets/templates/ModernTemplate';
const templates = [
  {
    id: 'classic',
    title: 'Classic',
    description: 'A clean, traditional resume format with clear sections and professional typography',
  },
  {
    id: 'modern',
    title: 'Modern',
    description: 'Sleek design with strategic use of color and modern font choices',
  },
  {
    id: 'minimal-image',
    title: 'Minimal Image',
    description: 'Minimal design with a single image and clean typography',
  },
  {
    id: 'minimal',
    title: 'Minimal',
    description: 'Ultra-clean design that puts your content front and center',
  },
];

const TemplateSelector = ({ selectedTemplate, onChange }) => {
  return (
    <div className="flex flex-col gap-4 p-4 max-w-md bg-white">
      {templates.map((template) => {
        const isSelected = selectedTemplate === template.id;

        return (
          <div
            key={template.id}
            onClick={() => onChange(template.id)}
            className={`
              relative cursor-pointer rounded-xl border-2 p-5 transition-all duration-200
              ${isSelected 
                ? 'border-blue-500 bg-blue-50 shadow-sm' 
                : 'border-gray-200 hover:border-gray-300 bg-white'}
            `}
          >

            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-bold text-gray-800">
                {template.title}
              </h3>
              
              {/* أيقونة الصح الزرقاء */}
              {isSelected && (
                <div className="bg-blue-500 rounded-full p-0.5">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 text-white" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>

            {/* Description Box */}
            <div className={`
              rounded-lg p-4 
              ${isSelected ? 'bg-blue-100/50' : 'bg-slate-50'}
            `}>
              <p className="text-sm italic text-gray-600 leading-relaxed">
                {template.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TemplateSelector;