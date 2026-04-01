import React from 'react';
import { Check } from 'lucide-react';

const colors = [
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Indigo', value: '#6366f1' },
  { name: 'Purple', value: '#a855f7' },
  { name: 'Green', value: '#10b981' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Orange', value: '#f97316' },
  { name: 'Teal', value: '#14b8a6' },
  { name: 'Pink', value: '#ec4899' },
  { name: 'Gray', value: '#64748b' },
  { name: 'Black', value: '#1e293b' },
];

function ColorPicker({ selectedColor, onChange }) {
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-xl w-[280px]">
      <div className="grid grid-cols-4 gap-y-4 gap-x-2">
        {colors.map((color) => {
          const isSelected = selectedColor === color.value;

          return (
            <div 
              key={color.value} 
              className="flex flex-col items-center gap-1 cursor-pointer group"
              onClick={() => onChange(color.value)}
            >
              {/* دائرة اللون */}
              <div
                style={{ backgroundColor: color.value }}
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110
                  ${isSelected ? 'ring-2 ring-offset-2 ring-gray-300' : ''}
                `}
              >
                {isSelected && <Check size={18} className="text-white" />}
              </div>
              
              {/* اسم اللون */}
              <span className="text-[11px] text-gray-500 font-medium">
                {color.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ColorPicker;