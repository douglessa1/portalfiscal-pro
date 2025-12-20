import React from 'react';
import { ArrowLeft, Lock, Copy, Check, Info } from 'lucide-react';

// --- Layout & Structure ---

export const ToolLayout: React.FC<{
    title: string;
    description: string;
    children: React.ReactNode;
    onBack?: () => void;
}> = ({ title, description, children, onBack }) => {
    return (
        <div className="space-y-6 animate-fade-in-up pb-10 max-w-7xl mx-auto">
            {onBack && (
                <button 
                    onClick={onBack}
                    className="group flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors mb-2"
                >
                    <div className="p-1 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/30 transition-colors">
                        <ArrowLeft size={16} className="group-hover:text-emerald-600 dark:group-hover:text-emerald-400" />
                    </div>
                    Voltar para Central
                </button>
            )}
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">{title}</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1 text-lg">{description}</p>
            </div>
            <div className="h-px w-full bg-gradient-to-r from-slate-200 via-slate-100 to-transparent dark:from-slate-700 dark:via-slate-800"></div>
            {children}
        </div>
    );
};

// --- Results & Visuals ---

export const ResultCard: React.FC<{
    label: string;
    value: string;
    subtext?: string;
    highlight?: boolean;
    color?: 'emerald' | 'blue' | 'purple' | 'amber';
}> = ({ label, value, subtext, highlight, color = 'emerald' }) => {
    const colors = {
        emerald: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-900',
        blue: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-900',
        purple: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-900',
        amber: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-900',
    };

    return (
        <div className={`p-4 rounded-xl border ${highlight ? colors[color] : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'} shadow-sm transition-all`}>
            <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${highlight ? 'opacity-80' : 'text-slate-500 dark:text-slate-400'}`}>{label}</p>
            <p className={`text-2xl font-extrabold ${highlight ? '' : 'text-slate-900 dark:text-white'}`}>{value}</p>
            {subtext && <p className={`text-xs mt-1 ${highlight ? 'opacity-70' : 'text-slate-400'}`}>{subtext}</p>}
        </div>
    );
};

export const CalculationMemory: React.FC<{
    steps: { label: string; formula: string; value: string }[];
    hash?: string;
}> = ({ steps, hash }) => {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        if(!hash) return;
        navigator.clipboard.writeText(hash);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="mt-6 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-100/50 dark:bg-slate-800/50">
                <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <Info size={14} /> Memória de Cálculo Auditável
                </h3>
                {hash && (
                    <button 
                        onClick={handleCopy}
                        className="text-[10px] font-mono text-slate-400 hover:text-emerald-500 flex items-center gap-1 transition-colors"
                        title="Copiar Hash de Validação"
                    >
                        {hash} {copied ? <Check size={12} /> : <Copy size={12} />}
                    </button>
                )}
            </div>
            <div className="divide-y divide-slate-200 dark:divide-slate-800">
                {steps.map((step, idx) => (
                    <div key={idx} className="px-4 py-3 flex justify-between items-center text-sm hover:bg-white dark:hover:bg-slate-800/80 transition-colors">
                        <span className="text-slate-600 dark:text-slate-400 font-medium">{step.label}</span>
                        <div className="text-right">
                            <span className="block text-xs text-slate-400 font-mono mb-0.5">{step.formula}</span>
                            <span className="font-bold text-slate-900 dark:text-slate-200">{step.value}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- Form Elements ---

export const Card: React.FC<{ children: React.ReactNode; className?: string; title?: string }> = ({ children, className = "", title }) => (
    <div className={`bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden ${className}`}>
        {title && (
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
                <h3 className="font-bold text-slate-900 dark:text-white">{title}</h3>
            </div>
        )}
        <div className="p-6">{children}</div>
    </div>
);

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline'; size?: 'sm' | 'md' | 'lg' }> = ({ children, className = "", variant = 'primary', size = 'md', ...props }) => {
    const baseClass = "rounded-xl font-bold transition-all flex items-center justify-center gap-2 active:scale-95";
    
    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2.5 text-sm",
        lg: "px-6 py-3 text-base",
    };
    
    const variants = {
        primary: "bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-200/40 dark:shadow-none hover:shadow-emerald-200/60",
        secondary: "bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100",
        outline: "bg-transparent border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-600 dark:hover:border-emerald-400 dark:hover:text-emerald-400"
    };
    
    return (
        <button className={`${baseClass} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
            {children}
        </button>
    );
};

export const FormInput = ({ label, className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label?: string }) => (
    <div className="space-y-2">
        {label && <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">{label}</label>}
        <input 
            className={`w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400 font-medium ${className}`}
            {...props}
        />
    </div>
);

export const FormSelect = ({ label, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string }) => (
    <div className="space-y-2">
        {label && <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">{label}</label>}
        <div className="relative">
            <select 
                className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all appearance-none font-medium"
                {...props}
            >
                {children}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </div>
        </div>
    </div>
);

// Feature Lock (Premium)
export const FeatureLock: React.FC<{
    children?: React.ReactNode;
    fallback?: React.ReactNode;
    featureId?: string;
    showUpgrade?: boolean;
}> = ({ children }) => {
    // For demo purposes, we unlock everything. In real app, check user.plan
    return <>{children}</>;
};

export const UpgradePrompt = () => <div />;