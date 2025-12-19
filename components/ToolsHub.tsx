import React, { useState } from 'react';
import { Search, Lock, Zap, ShieldCheck, ArrowRight, Calculator, FileText, Scale, TrendingUp, BarChart3, GraduationCap, ArrowRightLeft, Package, User } from 'lucide-react';

type ToolTier = 'Gratuito' | 'Pro' | 'Auditor';

interface Tool {
  id: string;
  title: string;
  description: string;
  tier: ToolTier;
  icon: React.ElementType;
  isNew?: boolean;
}

interface ToolsHubProps {
    onSelectTool: (toolId: string) => void;
}

export const ToolsHub: React.FC<ToolsHubProps> = ({ onSelectTool }) => {
  const [filter, setFilter] = useState<'Todos' | ToolTier>('Todos');

  const tools: Tool[] = [
    { id: 'simples-nacional', title: 'Calculadora Simples Nacional', description: 'Simulação rápida de alíquotas e anexos para empresas do Simples.', tier: 'Gratuito', icon: Calculator },
    { id: 'difal', title: 'Calculadora DIFAL', description: 'Diferencial de Alíquota ICMS com memória de cálculo.', tier: 'Pro', icon: ArrowRightLeft },
    { id: 'icms-st', title: 'ICMS-ST & MVA', description: 'Cálculo de Substituição Tributária e MVA Ajustada.', tier: 'Pro', icon: Scale },
    { id: 'ncm-finder', title: 'NCM Finder', description: 'Busca inteligente de códigos NCM e alíquotas.', tier: 'Gratuito', icon: Package },
    { id: 'mei-das', title: 'MEI - DAS & Relatório', description: 'Controle de receitas e geração de guias MEI.', tier: 'Gratuito', icon: User },
    { id: 'split-payment', title: 'Split Payment (Reforma)', description: 'Simulador do novo sistema de pagamento dividido.', tier: 'Auditor', icon: ArrowRightLeft, isNew: true },
    { id: 'consultor-ia', title: 'Consultor Fiscal AI', description: 'Análise de cenários complexos com Gemini 1.5 Pro.', tier: 'Pro', icon: Zap },
    { id: 'auditor-xml', title: 'Auditoria de XMLs', description: 'Validação cruzada de notas fiscais.', tier: 'Auditor', icon: ShieldCheck },
  ];

  const filteredTools = filter === 'Todos' ? tools : tools.filter(t => t.tier === filter);

  const getTierColor = (tier: ToolTier) => {
    switch(tier) {
      case 'Gratuito': return 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400';
      case 'Pro': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'Auditor': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Central de Ferramentas</h1>
          <p className="text-slate-500 dark:text-slate-400">Soluções especializadas para cada nível de atuação.</p>
        </div>
        
        {/* Filter Pills */}
        <div className="flex p-1 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          {(['Todos', 'Gratuito', 'Pro', 'Auditor'] as const).map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === item 
                  ? 'bg-slate-900 dark:bg-slate-700 text-white shadow-md' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => (
          <div 
            key={tool.id} 
            onClick={() => onSelectTool(tool.id)}
            className="group bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden cursor-pointer"
          >
             <div className="absolute top-0 right-0 p-4">
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${getTierColor(tool.tier)}`}>
                  {tool.tier}
                </span>
             </div>

             <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors ${
               tool.tier === 'Auditor' ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600' :
               tool.tier === 'Pro' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600' :
               'bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
             }`}>
                <tool.icon size={24} />
             </div>

             <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors flex items-center gap-2">
               {tool.title}
               {tool.isNew && <span className="text-[10px] bg-red-100 text-red-600 px-1.5 rounded font-bold uppercase">Novo</span>}
             </h3>
             <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
               {tool.description}
             </p>

             <div className="flex items-center text-sm font-semibold text-slate-400 group-hover:text-slate-900 dark:text-slate-500 dark:group-hover:text-white transition-colors">
                Acessar Ferramenta <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};
