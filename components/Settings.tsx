import React, { useState } from 'react';
import { User, Building2, Bell, Shield, Save } from 'lucide-react';

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
      { id: 'profile', label: 'Meu Perfil', icon: User },
      { id: 'company', label: 'Dados da Empresa', icon: Building2 },
      { id: 'notifications', label: 'Notificações', icon: Bell },
      { id: 'security', label: 'Segurança & API', icon: Shield },
  ];

  return (
    <div className="max-w-4xl mx-auto animate-fade-in-up">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Configurações</h1>

      <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Tabs */}
          <div className="w-full md:w-64 flex-shrink-0 space-y-1">
              {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                        activeTab === tab.id 
                        ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm border border-slate-100 dark:border-slate-700' 
                        : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                      <tab.icon size={18} /> {tab.label}
                  </button>
              ))}
          </div>

          {/* Content Area */}
          <div className="flex-1 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm p-8">
              {activeTab === 'profile' && (
                  <div className="space-y-6">
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Informações Pessoais</h2>
                      <div className="flex items-center gap-6 mb-8">
                          <div className="w-20 h-20 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                          <div>
                              <button className="text-sm font-bold text-emerald-600 border border-emerald-200 bg-emerald-50 px-4 py-2 rounded-lg hover:bg-emerald-100 transition-colors">Alterar Foto</button>
                          </div>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                          <InputGroup label="Nome Completo" defaultValue="Douglas S." />
                          <InputGroup label="Cargo" defaultValue="Contador Sênior" />
                          <InputGroup label="Email" defaultValue="douglas@exemplo.com" />
                          <InputGroup label="Telefone" defaultValue="(11) 99999-9999" />
                      </div>
                  </div>
              )}

              {activeTab === 'company' && (
                  <div className="space-y-6">
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800 mb-6">
                          <p className="text-sm text-blue-800 dark:text-blue-300">
                              <strong>Dica:</strong> Manter os dados da empresa atualizados ajuda a IA a fornecer respostas mais precisas sobre regime tributário.
                          </p>
                      </div>
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Dados Fiscais</h2>
                      <div className="space-y-4">
                          <InputGroup label="Razão Social" defaultValue="Consultoria Fiscal Ltda" />
                          <div className="grid grid-cols-2 gap-6">
                              <InputGroup label="CNPJ" defaultValue="00.000.000/0001-00" />
                              <div className="space-y-2">
                                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">Regime Tributário</label>
                                  <select className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none">
                                      <option>Simples Nacional</option>
                                      <option>Lucro Presumido</option>
                                      <option>Lucro Real</option>
                                  </select>
                              </div>
                          </div>
                          <InputGroup label="CNAE Principal" defaultValue="6920-6/01 - Atividades de contabilidade" />
                      </div>
                  </div>
              )}

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700 flex justify-end">
                <button className="flex items-center gap-2 bg-slate-900 dark:bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity">
                    <Save size={18} /> Salvar Alterações
                </button>
            </div>
          </div>
      </div>
    </div>
  );
};

const InputGroup = ({ label, defaultValue }: { label: string, defaultValue: string }) => (
    <div className="space-y-2">
        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">{label}</label>
        <input 
            type="text" 
            defaultValue={defaultValue} 
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
        />
    </div>
);