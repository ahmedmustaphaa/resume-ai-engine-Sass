"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation"
import { LogOut, User } from 'lucide-react'

function NavDash() {
    // 1. تعريف State لاسم المستخدم عشان نضمن تحديث الـ UI بعد التحميل
    const [userName, setUserName] = useState('');
    const router = useRouter();

    // 2. استخدام useEffect للتعامل مع localStorage بأمان (Client-side only)
    useEffect(() => {
        const storedName = localStorage.getItem('name');
        if (storedName) {
            setUserName(storedName);
        }
    }, []);

    const handleLogOut = () => {
        // مسح البيانات عند تسجيل الخروج
        localStorage.removeItem('token');
        localStorage.removeItem('name'); 
        
        // التوجيه لصفحة تسجيل الدخول
        router.push('/login');
    }

    return (
        <nav className='sticky top-0 z-50 px-6 md:px-20 py-3 flex items-center bg-white justify-between border-b border-gray-100 shadow-sm'>
            
            {/* اللوجو: مع النقطة الخضراء المميزة */}
            <div className='flex items-center gap-2 cursor-pointer' onClick={() => router.push('/')}>
                <h1 className='text-[#1A1A1A] text-[22px] font-bold tracking-tight'>
                    resume<span className='inline-block h-2 w-2 rounded-full bg-[#22C55E] ml-1'></span>
                </h1>
            </div>

            {/* جهة اليمين: معلومات المستخدم */}
            <div className='flex items-center gap-6'>
                <div className='flex items-center gap-2 text-gray-700 font-medium text-sm'>
                    <div className='w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-[#22C55E] border border-green-100'>
                        <User size={16} />
                    </div>
                    {/* عرض الاسم المخزن في الـ State */}
                    <span className='hidden sm:block capitalize'>
                        {userName || 'User'}
                    </span>
                </div>

                <button 
                    className='flex items-center gap-2 px-5 py-2 text-[13px] font-semibold text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 border border-gray-200' 
                    onClick={handleLogOut}
                >
                    <LogOut size={15} />
                    Logout
                </button>
            </div>
        </nav>
    )
}

export default NavDash;