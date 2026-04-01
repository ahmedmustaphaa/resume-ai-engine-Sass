"use client"; 

import React from 'react';
import { Star, Zap } from "lucide-react";

const testimonials = [
  { 
    text: "The AI is a game-changer. It extracted my data from a messy old PDF and formatted it into a professional layout in seconds. Saved me hours!", 
    name: "Ahmed Mahmoud", 
    role: "MERN Stack Developer", 
    image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" 
  },
  { 
    text: "The ATS Score feature is invaluable. I optimized my resume based on the AI's suggestions and got two callbacks within a week.", 
    name: "Sarah Hassan", 
    role: "UI/UX Designer", 
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200" 
  },
  { 
    text: "The designs are incredibly modern and clean. I never thought building a professional CV could be this seamless. Truly a brilliant tool.", 
    name: "Mohamed Ali", 
    role: "Software Engineer", 
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200" 
  },
  { 
    text: "It helped me craft professional summaries and experience sections perfectly. The AI suggests powerful keywords that catch recruiters' eyes.", 
    name: "Omar Khaled", 
    role: "Product Manager", 
    image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200" 
  },
  { 
    text: "The best user experience I've seen for a resume builder. Fast, accurate, and the final output looks impressive in any interview.", 
    name: "Layla Ibrahim", 
    role: "Marketing Specialist", 
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200" 
  },
  { 
    text: "The AI Import feature is magical! I just uploaded my old CV and it took care of the rest. Highly recommended for busy professionals.", 
    name: "Yasin Radwan", 
    role: "Cloud Architect", 
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200" 
  }
];

const StarIcon = () => (
  <Star size={14} className="text-emerald-500" fill="currentColor" />
);

const TestimonialCard = ({ item }) => (
  <div className="bg-white border-2 border-slate-100 relative rounded-[2rem] p-8 shrink-0 w-[380px] shadow-sm hover:shadow-xl hover:border-emerald-500 transition-all duration-500 group">
    <div className="flex mb-5 gap-1">
      {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
    </div>
    <p className="text-slate-600 font-bold text-sm leading-relaxed mb-8 italic">"{item.text}"</p>
    <div className="flex items-center gap-4 border-t border-slate-50 pt-6">
      <div className="relative">
        <img src={item.image} alt={item.name} className="w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-md shadow-slate-200" />
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white" />
      </div>
      <div>
        <p className="font-black text-slate-900 text-sm uppercase tracking-tighter">{item.name}</p>
        <p className="text-emerald-600 font-black text-[10px] uppercase tracking-[0.2em]">{item.role}</p>
      </div>
    </div>
  </div>
);

export default function Testimonial() {
  return (
    <section className="bg-[#F8FAFC] relative py-24 overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-40">
        <div className="absolute top-0 left-[20%] w-96 h-96 bg-emerald-200/50 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-[20%] w-96 h-96 bg-blue-200/50 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto text-center mb-20 relative z-10 px-6">
        <span className="bg-white text-emerald-600 px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border-2 border-emerald-50 shadow-sm inline-flex items-center gap-2 mb-6">
          <Zap size={12} fill="currentColor" /> Global Feedback
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter italic uppercase">
          Success <span className="text-emerald-500">Stories</span>
        </h2>
        <div className="w-20 h-1.5 bg-emerald-500 mx-auto rounded-full mb-6" />
        <p className="text-slate-500 font-bold text-lg max-w-xl mx-auto">
          Join thousands of professionals who landed their dream jobs using our AI tools.
        </p>
      </div>

      <div className="relative space-y-10 group">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#F8FAFC] to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#F8FAFC] to-transparent z-20 pointer-events-none" />

        {/* Row 1 */}
        <div className="flex gap-8 animate-scroll hover:[animation-play-state:paused]">
          {[...testimonials, ...testimonials].map((item, i) => (
            <TestimonialCard key={i} item={item} />
          ))}
        </div>

        {/* Row 2 */}
        <div className="flex gap-8 animate-scroll-reverse hover:[animation-play-state:paused]">
          {[...testimonials, ...testimonials].map((item, i) => (
            <TestimonialCard key={i} item={item} />
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-380px * 6 - 8 * 2rem)); }
        }
        @keyframes scroll-reverse {
          0% { transform: translateX(calc(-380px * 6 - 8 * 2rem)); }
          100% { transform: translateX(0); }
        }
        .animate-scroll {
          animation: scroll 45s linear infinite;
        }
        .animate-scroll-reverse {
          animation: scroll-reverse 45s linear infinite;
        }
      `}} />
    </section>
  );
}