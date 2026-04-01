import React from 'react'
import { Github, Twitter, Linkedin, Zap, ExternalLink } from "lucide-react"

function Footer() {
  return (
    <div className='pt-24 px-4 bg-[#F8FAFC]'>
      <footer className="bg-[#0F172A] w-full max-w-7xl mx-auto text-white pt-16 rounded-t-[3rem] overflow-hidden relative border-x border-t border-slate-800 shadow-2xl">
        
        {/* Glow Effect Top Right */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full"></div>

        <div className="max-w-6xl mx-auto px-8 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
          
          {/* Section 1: Brand & Vision */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Zap size={22} fill="white" className="text-white" />
              </div>
              <span className="text-2xl font-black tracking-tighter italic uppercase">Resume<span className="text-emerald-500">AI</span></span>
            </div>
            
            <p className="text-slate-400 font-bold text-sm leading-relaxed max-w-sm">
              Empowering professionals with neural-driven resume engineering. Build, optimize, and land your dream role with the next generation of career tools.
            </p>
            
            {/* Social Icons with custom styling */}
            <div className="flex gap-4">
              {[
                { icon: <Twitter size={18} />, href: "#" },
                { icon: <Github size={18} />, href: "#" },
                { icon: <Linkedin size={18} />, href: "#" }
              ].map((social, idx) => (
                <a key={idx} href={social.href} className="w-10 h-10 rounded-xl border border-slate-700 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500 hover:bg-emerald-500/5 transition-all duration-300">
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Section 2: Quick Links */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="space-y-6">
              <h3 className="font-black text-[10px] uppercase tracking-[0.3em] text-emerald-500">Ecosystem</h3>
              <ul className="space-y-4 text-sm font-bold text-slate-300">
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-1">AI Builder <ExternalLink size={12}/></a></li>
                <li><a href="#" className="hover:text-white transition-colors">ATS Scanner</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Templates</a></li>
              </ul>
            </div>
            
            <div className="space-y-6">
              <h3 className="font-black text-[10px] uppercase tracking-[0.3em] text-emerald-500">Resources</h3>
              <ul className="space-y-4 text-sm font-bold text-slate-300">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Career Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Access</a></li>
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1 space-y-6">
              <h3 className="font-black text-[10px] uppercase tracking-[0.3em] text-emerald-500">Company</h3>
              <ul className="space-y-4 text-sm font-bold text-slate-300">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li className="flex items-center gap-2">
                  <a href="#" className="hover:text-white transition-colors">Careers</a>
                  <span className="text-[9px] px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/50 text-emerald-500 font-black">HIRING</span>
                </li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Credits Bar */}
        <div className="max-w-6xl mx-auto mt-20 px-8 py-6 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
          <p className="text-slate-500 text-[11px] font-black uppercase tracking-widest">
            © 2026 ResumeAI Engineering. 
          </p>
          <p className='text-[11px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2'>
            Handcrafted with <span className="text-emerald-500">❤</span> in Egypt
          </p>
        </div>

        {/* Branding Footer Signature (Ahmed Mustafa) */}
        <div className="relative mt-4">
          {/* Subtle light beam behind name */}
          <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-4xl h-32 bg-emerald-600/20 rounded-full blur-[100px] pointer-events-none"></div>
          
          <h1 className="text-center font-black leading-[0.8] text-transparent text-[clamp(2.5rem,15vw,14rem)] [-webkit-text-stroke:1px_rgba(255,255,255,0.05)] select-none transition-all duration-700 hover:[-webkit-text-stroke:1px_rgba(16,185,129,0.3)]">
            AHMED MUSTAFA
          </h1>
          
          {/* Overlay text for depth */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
             <span className="text-white text-8xl font-black italic tracking-tighter">DESIGNED BY</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer