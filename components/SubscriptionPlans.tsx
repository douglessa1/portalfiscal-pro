import React from 'react';
import { Check, Zap, Shield, Crown, Star, Sparkles } from 'lucide-react';

export const SubscriptionPlans: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-fade-in-up pb-12">
      <div className="text-center space-y-4 pt-8">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">Escolha o plano ideal para sua carreira</h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          Potencialize sua atuação fiscal com ferramentas de inteligência artificial. Cancele quando quiser.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 items-start">
        
        {/* Plano Gratuito */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col hover:border-slate-300 transition-colors">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                Gratuito
            </h3>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-slate-900 dark:text-white">R$ 0</span>
              <span className="text-slate-500">/mês</span>
            </div>
            <p className="text-sm text-slate-500 mt-2">Essencial para estudantes e consultas rápidas.</p>
          </div>
          <button className="w-full py-3 px-4 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white font-bold rounded-xl text-center hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors mb-8">
            Plano Atual
          </button>
          <ul className="space-y-4 flex-1">
            <FeatureItem text="Notícias fiscais básicas" />
            <FeatureItem text="Calculadora Simples Nacional" />
            <FeatureItem text="Acesso de leitura ao Fórum" />
            <FeatureItem text="5 consultas de IA por dia" />
          </ul>
        </div>

        {/* Plano Pro */}
        <div className="relative bg-slate-900 dark:bg-slate-950 rounded-3xl p-8 border border-emerald-500 shadow-2xl flex flex-col transform md:-translate-y-4 ring-4 ring-emerald-500/20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide flex items-center gap-1">
            <Sparkles size={12} fill="currentColor" /> Mais Popular
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
               <Zap className="text-emerald-400 fill-emerald-400" size={20} /> Pro
            </h3>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-white">R$ 49</span>
              <span className="text-slate-400">/mês</span>
            </div>
            <p className="text-sm text-slate-400 mt-2">Para contadores, advogados e analistas que buscam produtividade.</p>
          </div>
          <button className="w-full py-3 px-4 bg-emerald-500 text-white font-bold rounded-xl text-center hover:bg-emerald-400 transition-colors mb-8 shadow-glow">
            Assinar Agora
          </button>
          <ul className="space-y-4 flex-1">
            <FeatureItem text="Consultor AI Ilimitado (Gemini 1.5)" dark />
            <FeatureItem text="Fundamentação Legal com Links" dark />
            <FeatureItem text="Studio Criativo (Geração de Imagens)" dark />
            <FeatureItem text="Acesso total ao Fórum (Perguntar)" dark />
            <FeatureItem text="Leitura de Diário Oficial (OCR)" dark />
            <FeatureItem text="Suporte por Chat" dark />
          </ul>
        </div>

        {/* Plano Auditor */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col hover:border-purple-300 transition-colors">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <Crown className="text-purple-500" size={20} /> Auditor
            </h3>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-slate-900 dark:text-white">R$ 199</span>
              <span className="text-slate-500">/mês</span>
            </div>
            <p className="text-sm text-slate-500 mt-2">Poder total para escritórios e departamentos fiscais.</p>
          </div>
          <button className="w-full py-3 px-4 bg-white dark:bg-slate-800 border-2 border-slate-900 dark:border-slate-600 text-slate-900 dark:text-white font-bold rounded-xl text-center hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors mb-8">
            Contatar Vendas
          </button>
          <ul className="space-y-4 flex-1">
            <FeatureItem text="Tudo do plano Pro" />
            <FeatureItem text="Auditoria em Lote (XML/SPED)" />
            <FeatureItem text="API de Integração" />
            <FeatureItem text="Comparativo Tributário Avançado" />
            <FeatureItem text="Múltiplos Usuários (até 5)" />
            <FeatureItem text="Gestor de Conta Dedicado" />
          </ul>
        </div>
      </div>

      <div className="mt-16 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-indigo-100 dark:border-indigo-900/30">
        <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-full text-indigo-600 dark:text-indigo-400">
                <Shield size={24} />
            </div>
            <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-lg">Garantia de 7 dias</h4>
                <p className="text-slate-600 dark:text-slate-400">Teste as funcionalidades do plano Pro sem compromisso. Se não aumentar sua produtividade, devolvemos seu dinheiro.</p>
            </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <Star size={16} className="text-amber-400 fill-amber-400" />
            <span>Avaliado em <strong>4.9/5</strong> por +2.000 profissionais</span>
        </div>
      </div>
    </div>
  );
};

const FeatureItem = ({ text, dark = false }: { text: string; dark?: boolean }) => (
  <li className="flex items-start gap-3">
    <div className={`mt-1 p-0.5 rounded-full flex-shrink-0 ${dark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'}`}>
      <Check size={12} strokeWidth={3} />
    </div>
    <span className={`text-sm leading-tight ${dark ? 'text-slate-300' : 'text-slate-600 dark:text-slate-400'}`}>{text}</span>
  </li>
);