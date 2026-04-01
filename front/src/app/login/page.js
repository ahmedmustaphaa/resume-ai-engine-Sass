"use client"

import { useEffect, useState } from "react"
import { api } from "../utils/api"
import { useRouter } from "next/navigation"
import { Mail, Lock, User, ArrowRight, Loader2, Zap } from "lucide-react"

function Login() {
    const [state, setState] = useState("login") 
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)

    const router = useRouter();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            router.push('/')
        }
    }, [router])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const endpoint = state === "login" ? '/user/login' : '/user/register';
            const { data } = await api.post(endpoint, formData);
                   console.log(data)
                
            if (data.success) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('name',data.name)
    
window.dispatchEvent(new Event("storage"));
                router.push('/');
            } else {
                alert(data.message || "Something went wrong");
            }
        } catch (error) {
            alert(error.response?.data?.message || "Error connecting to server");
        } finally {
            setLoading(false);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    return (
        <div className="min-h-screen bg-[#F1F5F9] flex items-center justify-center p-4 relative overflow-hidden">
            
            <div className="fixed inset-0 pointer-events-none opacity-50">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-200/50 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-200/50 blur-[120px] rounded-full" />
            </div>

            <div className="relative z-10 w-full max-w-[450px] animate-in fade-in zoom-in-95 duration-500">
                <div className="bg-white border-2 border-slate-200 rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-slate-200/50">
                    
                    <div className="flex flex-col items-center mb-10">
                        <div className="w-16 h-16 bg-[#00A86B] rounded-[1.2rem] flex items-center justify-center shadow-xl shadow-emerald-500/20 mb-6">
                            <Zap className="text-white" size={32} fill="white" />
                        </div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">
                            {state === "login" ? "Welcome Back" : "Join System"}
                        </h1>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-2">
                            {state === "login" ? "Access your neural workspace" : "Initialize your professional profile"}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {state !== "login" && (
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                                    <User size={18} strokeWidth={2.5} />
                                </div>
                                <input 
                                    type="text" 
                                    name="name" 
                                    placeholder="FULL NAME" 
                                    className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-emerald-500 focus:bg-white font-bold text-sm transition-all shadow-inner" 
                                    value={formData.name} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                        )}

                        <div className="relative group">
                            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                                <Mail size={18} strokeWidth={2.5} />
                            </div>
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="EMAIL ADDRESS" 
                                className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-emerald-500 focus:bg-white font-bold text-sm transition-all shadow-inner" 
                                value={formData.email} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>

                        <div className="relative group">
                            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                                <Lock size={18} strokeWidth={2.5} />
                            </div>
                            <input 
                                type="password" 
                                name="password" 
                                placeholder="PASSWORD" 
                                className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-emerald-500 focus:bg-white font-bold text-sm transition-all shadow-inner" 
                                value={formData.password} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>

                        {state === "login" && (
                            <div className="flex justify-end px-2">
                                <button type="button" className="text-[10px] font-black text-slate-400 hover:text-emerald-600 uppercase tracking-widest transition-colors">
                                    Lost Password?
                                </button>
                            </div>
                        )}

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-slate-900 text-white p-5 rounded-[1.5rem] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-emerald-600 transition-all shadow-xl shadow-slate-900/10 active:scale-[0.98] disabled:opacity-70 mt-4"
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : (
                                <>
                                    {state === "login" ? "Authorize" : "Initialize"}
                                    <ArrowRight size={18} strokeWidth={3} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-10 pt-8 border-t-2 border-slate-50 text-center">
                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                            {state === "login" ? "New to the system?" : "Already have access?"}
                            <button 
                                onClick={() => setState(prev => prev === "login" ? "register" : "login")} 
                                className="text-emerald-600 ml-2 hover:underline"
                            >
                                {state === "login" ? "Create Account" : "Secure Login"}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login