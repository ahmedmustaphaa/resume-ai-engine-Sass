"use client";
import React from 'react';
import { Mail, Phone, MapPin, Briefcase, Linkedin, Globe, User } from 'lucide-react';

/**
 * 1. فصلنا الـ InputField بره المكون الأساسي
 * ده أهم تعديل عشان الـ Cursor ميهربش وأنت بتكتب
 */
const InputField = ({ icon: Icon, label, name, placeholder, value, onChange }) => (
  <div className='flex flex-col gap-1'>
    <label className='text-sm font-medium text-gray-700'>{label}</label>
    <div className='flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-blue-500 transition-all'>
      <Icon size={16} className='text-gray-400 mr-2' />
      <input
        type="text"
        name={name}
        autoComplete="off"
        // نستخدم value عشان يكون Controlled Component ويسمع في الـ CV
        value={value || ""} 
        onChange={onChange}
        placeholder={placeholder}
        className='w-full outline-none text-sm text-gray-800'
      />
    </div>
  </div>
);

function PersronalInformation({ handleGlobalSave,data, onChange, removeBackGround, setremoveBackGround }) {
  
  return (
    <div className='bg-white border border-gray-200 rounded-lg p-6 shadow-sm animate-in fade-in duration-500'>
      
      {/* Title Section */}
      <div className='mb-6'>
        <h2 className='text-lg font-bold text-gray-800'>Personal Information</h2>
        <p className='text-sm text-gray-500'>Get started with the basic information for your resume</p>
      </div>

      {/* Profile Image Placeholder */}
      <div className='flex items-center gap-3 mb-6'>
        <div className='w-14 h-14 rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-400'>
          <User size={24} />
        </div>
        <button type="button" className='text-blue-600 text-sm font-bold hover:underline'>
          Upload Profile Image
        </button>
      </div>

      {/* Inputs Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
     <InputField 
  icon={User} 
  label="Full Name" 
  name="full_name" // تم التغيير من full_name لـ fullName
  placeholder="e.g. John Doe" 
  value={data?.full_name} // تم التغيير من data?.full_name لـ data?.fullName
  onChange={onChange} 
/>
        <InputField 
          icon={Briefcase} 
          label="Profession" 
          name="profession" 
          placeholder="e.g. Frontend Developer" 
          value={data?.profession} 
          onChange={onChange} 
        />
        <InputField 
          icon={Mail} 
          label="Email Address" 
          name="email" 
          placeholder="e.g. john@example.com" 
          value={data?.email} 
          onChange={onChange} 
        />
        <InputField 
          icon={Phone} 
          label="Phone Number" 
          name="phone" 
          placeholder="e.g. +20 123 456 789" 
          value={data?.phone} 
          onChange={onChange} 
        />
        <InputField 
          icon={MapPin} 
          label="Location" 
          name="location" 
          placeholder="e.g. Cairo, Egypt" 
          value={data?.location} 
          onChange={onChange} 
        />
        <InputField 
          icon={Linkedin} 
          label="LinkedIn Profile" 
          name="linkedin" 
          placeholder="LinkedIn URL" 
          value={data?.linkedin} 
          onChange={onChange} 
        />
        <div className='md:col-span-2'>
          <InputField 
            icon={Globe} 
            label="Personal Website" 
            name="website" 
            placeholder="Portfolio or Blog URL" 
            value={data?.website} 
            onChange={onChange} 
          />
        </div>
      </div>

      {/* AI Background Toggle */}
      <div className='flex items-center gap-3 mt-8 p-3 bg-gray-50 rounded-lg border border-gray-100'>
        <input
          id="remove-bg"
          type="checkbox"
          className="w-4 h-4 text-blue-600 rounded cursor-pointer"
          checked={!!removeBackGround}
          onChange={() => setremoveBackGround(!removeBackGround)}
        />
        <label htmlFor="remove-bg" className='text-sm font-medium text-gray-600 cursor-pointer'>
          Use AI to Remove Image Background automatically
        </label>
      </div>

      {/* Submit Button */}
      <button 

      onClick={handleGlobalSave}
        type="button" 
        className='mt-8 w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl text-sm transition-all shadow-md active:scale-95'
      >
        Save Changes
      </button>
    </div>
  );
}

export default PersronalInformation;