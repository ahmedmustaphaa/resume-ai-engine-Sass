"use client"
import React, { useState } from 'react'
import { Sparkles } from 'lucide-react'
import { api } from '../utils/api.js'

function ProfessionalSummary({handleGlobalSave, data, onChange, onSave }) {
  // 1. الـ State مكانه هنا (لو محتاجه)، بس الأفضل نستخدم onChange مباشرة
  const [loading, setLoading] = useState(false);

 const handleEnhance = async () => {
  setLoading(true);
  try {
    const response = await api.post('/ai/enhance-summary', { userContent: data });
    
    // التعديل هنا: نأخذ الحقل اللي فيه النص فقط (غالباً اسمه data أو content)
    if (response.data && response.data.data) {
      onChange(response.data.data); // تأكد إنك بتبعت النص الصافي مش الـ Object
    } else if (typeof response.data === 'string') {
      onChange(response.data);
    }
  } catch (error) {
    console.error("AI Enhance Error:", error);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between items-end'>
        <div>
          <h2 className='text-xl font-bold text-gray-900'>Professional Summary</h2>
          <p className='text-sm text-gray-500 mt-1'>Add summary for your resume here</p>
        </div>
        
        <button 
          onClick={handleEnhance} 
          disabled={loading}
          className='flex items-center gap-2 text-[#8B5CF6] bg-[#F5F3FF] px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-[#EDE9FE] disabled:opacity-50'
        >
          <Sparkles size={16} />
          {loading ? 'Enhancing...' : 'AI Enhance'}
        </button>
      </div>

      <div className='relative'>
        <textarea
          rows="6"
          className='w-full p-4 text-gray-700 bg-white border border-gray-200 rounded-2xl outline-none'
          placeholder='Write a compelling professional summary...'
          value={data || ""} // نستخدم data اللي جاية من الـ Props مباشرة
          onChange={(e) => onChange(e.target.value)}
        />
      </div>

      <div className='mt-2'>
        <button 
          onClick={handleGlobalSave}
          
          className='bg-[#D1FAE5] text-[#065F46] px-8 py-2.5 rounded-xl font-bold'
        >
          Save Changes
        </button>
      </div>
    </div>
  )
}

export default ProfessionalSummary