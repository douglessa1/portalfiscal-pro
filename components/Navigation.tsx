import React, { useState } from 'react';
import { Logo } from './Logo';
import { LayoutDashboard, Newspaper, BrainCircuit, Image, Palette, ChevronRight, Grid, Shield, Users, Settings, CreditCard, Building2, ChevronDown, DollarSign } from 'lucide-react';

interface NavigationProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  isOpen: boolean;
  currentCompany: string;
  onCompanyChange: (company: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentTab, onTabChange, isOpen, currentCompany, onCompanyChange }) => {
  const [showCompanyMenu, setShowCompanyMenu] = useState(false);

  const companies = [
      "Consultoria Matriz - SP",
      "Filial Serviços - RJ",
      "Filial Comércio - MG"
  ];

  const sections = [
      {
          title: "Principal",
          items: [
            { id: 'dashboard', label: 'Visão Geral', icon: LayoutDashboard },
            { id: 'news', label: 'Notícias Fiscais', icon: Newspaper },
            { id: 'finance', label: 'Gestão Financeira', icon: DollarSign }, // New Link
            { id: 'tools', label: 'Ferramentas', icon: Grid },
          ]
      },
      {
          title: "Inteligência",
          items: [
            { id: 'advisor', label: 'Consultor AI', icon: BrainCircuit },
            { id: 'studio', label: 'Studio Criativo', icon: Image },
          ]
      },
      {
          title: "Comunidade",
          items: [
             { id: 'forum', label: 'Fórum & Dúvidas', icon: Users },
          ]
      },
      {
          title: "Sistema",
          items: [
             { id: 'plans', label: 'Planos de Assinatura', icon: CreditCard },
             { id: 'admin', label: 'Painel Admin', icon: Shield },
             { id: 'settings', label: 'Configurações', icon: Settings },
             { id: 'design', label: 'Identidade Visual', icon: Palette },
          ]
      }
  ];

  return (
    <nav className={`
        bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 h-screen sticky top-0 flex flex-col shadow-soft dark:shadow-none z-50 transition-all duration-300 ease-in-out overflow-hidden
        ${isOpen ? 'w-72' : 'w-0 opacity-0 md:opacity-100 md:w-20'}
    `}>
      <div className={`p-6 pb-2 flex-shrink-0 transition-opacity duration-300 ${!isOpen && 'px-4 items-center justify-center'}`}>
        <div className="cursor-pointer w-fit mb-6" onClick={() => onTabChange('dashboard')}>
            <Logo className="h-9" iconOnly={!isOpen} />
        </div>

        {/* Company Selector */}
        {isOpen ? (
            <div className="relative">
                <button 
                    onClick={() => setShowCompanyMenu(!showCompanyMenu)}
                    className="w-full flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-emerald-500 transition-all group"
                >
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0">
                            <Building2 size={16} className="text-slate-600 dark:text-slate-300" />
                        </div>
                        <div className="text-left truncate">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Empresa</p>
                            <p className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-emerald-600 transition-colors">{currentCompany}</p>
                        </div>
                    </div>
                    <ChevronDown size={16} className="text-slate-400" />
                </button>

                {showCompanyMenu && (
                    <>
                        <div className="fixed inset-0 z-10" onClick={() => setShowCompanyMenu(false)}></div>
                        <div className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden z-20 animate-fade-in-up">
                            {companies.map((company) => (
                                <button
                                    key={company}
                                    onClick={() => {
                                        onCompanyChange(company);
                                        setShowCompanyMenu(false);
                                    }}
                                    className={`w-full text-left px-4 py-3 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${currentCompany === company ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/10' : 'text-slate-600 dark:text-slate-300'}`}
                                >
                                    {company}
                                </button>
                            ))}
                            <div className="border-t border-slate-100 dark:border-slate-700 p-2">
                                <button className="w-full text-center text-xs font-bold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white py-1">
                                    + Adicionar Filial
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        ) : (
            <div className="flex justify-center mb-4">
                <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center cursor-pointer hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:text-emerald-600 transition-colors" title={currentCompany}>
                    <Building2 size={20} />
                </div>
            </div>
        )}
      </div>
      
      <div className="flex-1 py-2 px-4 space-y-6 overflow-y-auto overflow-x-hidden custom-scrollbar">
        {sections.map((section, idx) => (
            <div key={idx} className={!isOpen ? 'text-center' : ''}>
                {isOpen && <p className="px-4 text-[11px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-wider mb-2 animate-fade-in">{section.title}</p>}
                <div className="space-y-1">
                    {section.items.map((item) => {
                    const isActive = currentTab === item.id;
                    return (
                        <button
                        key={item.id}
                        onClick={() => onTabChange(item.id)}
                        title={!isOpen ? item.label : undefined}
                        className={`w-full group flex items-center rounded-xl text-sm font-medium transition-all duration-200
                            ${isOpen ? 'justify-between px-4 py-2.5' : 'justify-center p-3'}
                            ${isActive 
                            ? 'bg-slate-900 dark:bg-slate-800 text-white shadow-lg shadow-slate-200 dark:shadow-none' 
                            : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                            }`}
                        >
                        <div className={`flex items-center gap-3 ${!isOpen && 'justify-center'}`}>
                            <item.icon size={isOpen ? 18 : 22} className={isActive ? 'text-emerald-400' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300'} strokeWidth={isActive ? 2.5 : 2} />
                            {isOpen && <span>{item.label}</span>}
                        </div>
                        {isOpen && isActive && <ChevronRight size={14} className="text-slate-400" />}
                        </button>
                    );
                    })}
                </div>
            </div>
        ))}
      </div>
    </nav>
  );
};
