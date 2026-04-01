"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../assets/logo.svg";
import { LayoutDashboard, LogOut } from "lucide-react";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const NavLinks = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/features" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Contact", href: "/contact" },
  ];

  // دالة للتأكد من حالة التسجيل
  const checkAuth = () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    // تشغيل الفحص عند تحميل الصفحة
    checkAuth();

    // إضافة "رادار" يسمع لأي تغيير في التوكن من صفحات تانية (زي صفحة Login)
    window.addEventListener("storage", checkAuth);
    
    // حدث مخصص عشان يشتغل في نفس الصفحة (Next.js Optimization)
    window.addEventListener("auth-change", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("auth-change", checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("auth-change")); // تنبيه النافبار فوراً
    window.location.href = "/"; 
  };

  return (
    <header className="w-full relative z-[100] bg-white/80 backdrop-blur-md">
      <div className="w-full flex justify-center py-2 bg-gradient-to-r from-[#BCFF9A] to-[#E4FFD9] border-b border-emerald-100">
        <div className="flex items-center gap-2 text-sm">
          <span className="bg-[#00A63E] text-white px-3 py-0.5 rounded-full font-black text-[10px] uppercase tracking-wider">
            New
          </span>
          <span className="text-[#016630] font-bold text-xs">Neural AI Engine Integration Active</span>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex-shrink-0 transition-transform hover:scale-105">
          <Image src={logo} alt="Logo" width={110} height={35} priority />
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {NavLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-slate-500 hover:text-[#00C950] font-bold text-sm transition-all relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00C950] transition-all group-hover:w-full" />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
               <Link 
                href="/app" 
                className="flex items-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded-2xl text-xs font-black hover:bg-[#00C950] transition-all shadow-lg shadow-black/10 active:scale-95"
              >
                <LayoutDashboard size={16} />
                Dashboard
              </Link>
              
              <button 
                onClick={handleLogout}
                className="p-2.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link 
              href="/login" 
              className="bg-[#00C950] text-white px-6 py-2.5 rounded-full text-xs font-black hover:bg-[#00a342] transition-all shadow-[0_10px_20px_-5px_rgba(0,201,80,0.3)] active:scale-95"
            >
              Get Started
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;