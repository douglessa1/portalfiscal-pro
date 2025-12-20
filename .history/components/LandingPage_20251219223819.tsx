import React, { useState, useEffect, useRef } from 'react';
import { Logo } from './Logo';
import { ArrowRight, BrainCircuit, Newspaper, LayoutDashboard, ShieldCheck, Zap, X, Mail, Lock, Loader2, CheckCircle2, TrendingUp, Calendar, Users, Briefcase, Scale } from 'lucide-react';

interface LandingPageProps {
  onEnterApp: () => void;
}

// Utility component for Lazy Loading sections
const LazySection = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only load once
        }
      },
      { rootMargin: '200px' } // Start loading 200px before it enters viewport for smooth UX
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={elementRef} className={`transition-opacity duration-1000 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'} ${className}`}>
      {isVisible ? children : <div className="h-24 w-full" />} {/* Minimal placeholder to prevent complete collapse */}
    </div>
  );
};

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [activeFeature, setActiveFeature] = useState<'dashboard' | 'ai' | 'news'>('dashboard');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // DEV MODE: Instant login
    onEnterApp();
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      {/* Header - Always Loaded */}
      <header className="sticky top-0 z-40 w-full glass border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-4">
             <button onClick={() => scrollToSection('features')} className="hidden md:block text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">Funcionalidades</button>
             <button onClick={() => scrollToSection('pricing')} className="hidden md:block text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">Planos</button>
             <button 
                onClick={() => onEnterApp()}
                className="px-5 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-200/50"
             >
                Acessar Sistema
             </button>
          </div>
        </div>
      </header>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setShowLogin(false)}></div>
            <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up">
                <div className="p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-slate-900">Acesse sua conta</h2>
                        <button onClick={() => setShowLogin(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
                            <X size={20} />
                        </button>
                    </div>
                    
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl text-sm mb-4 border border-emerald-100">
                            <strong>Modo Desenvolvedor:</strong> Clique em entrar para acessar sem senha.
                        </div>
                        
                        <button 
                            type="submit" 
                            className="w-full py-3 bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 hover:bg-emerald-500 hover:shadow-emerald-300 transition-all flex items-center justify-center gap-2"
                        >
                            Entrar no Sistema
                        </button>
                    </form>
                </div>
            </div>
        </div>
      )}

      <main>
        {/* Hero Section */}
        <section className="relative pt-20 pb-20 overflow-hidden">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-emerald-400/10 rounded-full blur-[120px] -z-10"></div>
           
           <div className="max-w-7xl mx-auto px-6 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm mb-8 animate-fade-in-up">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-xs font-bold text-slate-600 tracking-wide uppercase">Plataforma All-in-One</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
                 Sua Rotina Fiscal, <br />
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                    Sem Planilhas, Sem Medo.
                 </span>
              </h1>
              
              <p className="max-w-2xl mx-auto text-lg text-slate-600 mb-10 leading-relaxed">
                 O <strong>Portal Fiscal Pro</strong> centraliza tudo o que você precisa: Consultoria via IA, Agenda de Obrigações e Notícias em Tempo Real. Feito para quem não pode errar.
              </p>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-20">
                 <button 
                    onClick={() => onEnterApp()}
                    className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white text-lg font-bold rounded-2xl transition-all shadow-xl shadow-emerald-200 hover:shadow-emerald-300 hover:-translate-y-1 flex items-center gap-2"
                 >
                    Acessar Dashboard
                    <ArrowRight size={20} />
                 </button>
              </div>

              {/* PRODUCT SHOWCASE TABS */}
              <div id="features" className="max-w-5xl mx-auto">
                 {/* Tabs Navigation */}
                 <div className="flex justify-center mb-8">
                    <div className="p-1.5 bg-white border border-slate-200 rounded-xl shadow-sm inline-flex gap-1">
                        <button 
                            onClick={() => setActiveFeature('dashboard')}
                            className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeFeature === 'dashboard' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
                        >
                            <LayoutDashboard size={16} /> Visão Geral
                        </button>
                        <button 
                            onClick={() => setActiveFeature('ai')}
                            className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeFeature === 'ai' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
                        >
                            <BrainCircuit size={16} /> Consultor IA
                        </button>
                        <button 
                            onClick={() => setActiveFeature('news')}
                            className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeFeature === 'news' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
                        >
                            <Newspaper size={16} /> Radar Fiscal
                        </button>
                    </div>
                 </div>

                 {/* Tab Content Visualization */}
                 <div className="relative rounded-2xl bg-slate-900 p-2 shadow-2xl shadow-slate-400/40 border border-slate-800 transition-all duration-500">
                    <div className="rounded-xl overflow-hidden bg-slate-50 aspect-[16/10] md:aspect-[16/9] relative text-left">
                        
                        {/* Fake Browser Header */}
                        <div className="h-10 bg-white border-b border-slate-200 flex items-center px-4 gap-2">
                             <div className="flex gap-1.5">
                                 <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                                 <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                                 <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                             </div>
                             <div className="ml-4 flex-1 max-w-lg h-6 bg-slate-100 rounded-md flex items-center px-3 text-[10px] text-slate-400 font-mono">
                                portal-fiscal-pro.app/{activeFeature}
                             </div>
                        </div>

                        {/* Content Body */}
                        <div className="p-6 h-full overflow-hidden bg-[#F8FAFC]">
                            {activeFeature === 'dashboard' && (
                                <div className="space-y-4 animate-fade-in">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <div className="h-6 w-32 bg-slate-900/10 rounded mb-2"></div>
                                            <div className="h-4 w-48 bg-slate-900/5 rounded"></div>
                                        </div>
                                        <div className="h-8 w-24 bg-emerald-500 rounded-lg"></div>
                                    </div>
                                    <div className="grid grid-cols-4 gap-4">
                                        <div className="h-24 bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                                            <div className="h-8 w-8 bg-emerald-100 rounded-lg mb-2"></div>
                                            <div className="h-4 w-16 bg-slate-100 rounded"></div>
                                        </div>
                                        <div className="h-24 bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                                            <div className="h-8 w-8 bg-blue-100 rounded-lg mb-2"></div>
                                            <div className="h-4 w-16 bg-slate-100 rounded"></div>
                                        </div>
                                        <div className="h-24 bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                                            <div className="h-8 w-8 bg-indigo-100 rounded-lg mb-2"></div>
                                            <div className="h-4 w-16 bg-slate-100 rounded"></div>
                                        </div>
                                        <div className="h-24 bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                                            <div className="h-8 w-8 bg-amber-100 rounded-lg mb-2"></div>
                                            <div className="h-4 w-16 bg-slate-100 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeFeature === 'ai' && (
                                <div className="h-full flex flex-col animate-fade-in">
                                    <div className="flex-1 space-y-4 overflow-hidden relative">
                                        <div className="flex flex-row-reverse gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-200 shrink-0"></div>
                                            <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tr-sm shadow-sm max-w-[80%] text-sm text-slate-700">
                                                Como fica o ICMS-ST para autopeças no estado de SP com a nova reforma?
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                                                <BrainCircuit size={16} />
                                            </div>
                                            <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-sm shadow-sm max-w-[90%] space-y-2">
                                                <div className="h-3 w-full bg-slate-100 rounded"></div>
                                                <div className="h-3 w-[90%] bg-slate-100 rounded"></div>
                                                <div className="h-3 w-[95%] bg-slate-100 rounded"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeFeature === 'news' && (
                                <div className="grid grid-cols-3 gap-4 animate-fade-in h-full overflow-hidden">
                                    <div className="col-span-2 row-span-2 bg-slate-800 rounded-xl relative overflow-hidden p-6 flex flex-col justify-end text-white">
                                        <div className="absolute top-4 left-4 bg-red-600 text-[10px] font-bold px-2 py-1 uppercase">Urgente</div>
                                        <div className="h-6 w-[80%] bg-white/20 rounded mb-2"></div>
                                        <div className="h-6 w-[60%] bg-white/20 rounded mb-4"></div>
                                        <div className="h-3 w-full bg-white/10 rounded"></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>
      </main>
    </div>
  );
};