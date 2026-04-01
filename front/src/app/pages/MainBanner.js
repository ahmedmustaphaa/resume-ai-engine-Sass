import React from 'react';
import { Zap, ShieldCheck, BarChart3, ArrowUpRight } from "lucide-react";

function MainBanner() {
  return (
    <section className="py-24 relative px-6 max-w-7xl mx-auto overflow-hidden">
      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-200/30 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-200/30 blur-[120px] rounded-full -z-10" />

      {/* Header Section */}
      <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-5 duration-700">
        <span className="bg-white text-[#00A86B] px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border-2 border-emerald-100 shadow-sm inline-flex items-center gap-2">
          <Zap size={12} fill="#00A86B" /> Neural Process
        </span>
        <h2 className="text-4xl md:text-6xl font-black text-slate-900 mt-6 mb-6 tracking-tighter italic">
          ENGINEER YOUR <span className="text-[#00A86B]">FUTURE</span>
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto font-bold text-lg leading-relaxed">
          Our specialized AI ecosystem transforms your raw experience into a high-performance, ATS-optimized professional identity.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Side: Professional Image Stacking */}
        <div className="relative h-[400px] md:h-[550px] w-full max-w-[500px] mx-auto lg:mx-0">
          {/* Main Image */}
          <div className="absolute top-0 left-0 w-[75%] h-[80%] rounded-[3rem] overflow-hidden border-4 border-white shadow-2xl z-10 rotate-[-3deg] hover:rotate-0 transition-transform duration-500">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800" 
              alt="Team Collaboration" 
              className="w-full h-full object-cover"
            />
          </div>
          {/* Floating Second Image */}
          <div className="absolute bottom-0 right-0 w-[70%] h-[75%] rounded-[3rem] overflow-hidden border-[6px] border-white shadow-2xl z-20 rotate-[3deg] hover:rotate-0 transition-transform duration-500 group">
             <img 
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800" 
              alt="System Interface" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Stats Overlay on image */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white shadow-xl">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ATS Efficiency</p>
                <p className="text-xl font-black text-emerald-600">98.4% Match Rate</p>
            </div>
          </div>
        </div>

        {/* Right Side: Features List (High Contrast) */}
        <div className="flex flex-col gap-6">
          <FeatureItem 
            icon={<Zap size={28} className="text-emerald-600" fill="currentColor" />} 
            title="AI Optimization" 
            desc="Our neural engine rephrases your achievements to match industry-standard keywords perfectly." 
            borderColor="hover:border-emerald-500"
            iconBg="bg-emerald-50"
          />
          <FeatureItem 
            icon={<ShieldCheck size={28} className="text-blue-600" />} 
            title="Privacy Protocol" 
            desc="Bank-grade encryption for your personal data. We prioritize security at every development stage." 
            borderColor="hover:border-blue-500"
            iconBg="bg-blue-50"
          />
          <FeatureItem 
            icon={<BarChart3 size={28} className="text-slate-900" />} 
            title="Live Score Analysis" 
            desc="Track your resume's strength in real-time as you build. Instant feedback for maximum impact." 
            borderColor="hover:border-slate-900"
            iconBg="bg-slate-100"
          />
        </div>
      </div>
    </section>
  );
}

function FeatureItem({ icon, title, desc, borderColor, iconBg }) {
  return (
    <div className={`group p-8 bg-white border-2 border-slate-100 rounded-[2.5rem] transition-all duration-500 cursor-pointer ${borderColor} hover:-translate-y-2 hover:shadow-2xl shadow-slate-200/50 relative overflow-hidden`}>
      <div className="flex items-start gap-6 relative z-10">
        <div className={`w-16 h-16 shrink-0 rounded-2xl ${iconBg} flex items-center justify-center transition-transform group-hover:scale-110 duration-500`}>
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-black text-slate-900 text-xl uppercase tracking-tighter italic">{title}</h3>
            <ArrowUpRight className="text-slate-300 group-hover:text-slate-900 transition-colors" size={20} />
          </div>
          <p className="text-sm font-bold text-slate-500 leading-relaxed tracking-wide">{desc}</p>
        </div>
      </div>
      {/* Subtle Background Text for depth */}
      <span className="absolute -bottom-4 -right-4 text-slate-50 font-black text-6xl select-none pointer-events-none group-hover:text-slate-100 transition-colors uppercase">
        {title.split(' ')[0]}
      </span>
    </div>
  );
}

export default MainBanner;