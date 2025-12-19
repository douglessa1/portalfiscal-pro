import React, { useState } from 'react';
import { Users, AlertTriangle, TrendingUp, DollarSign, Activity, Settings, Search, MoreVertical, Plus, Save } from 'lucide-react';
import { Card, FormInput, Button } from './ToolShared';

interface AdminDashboardProps {
    onPostNews: (news: any) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onPostNews }) => {
  const [newsForm, setNewsForm] = useState({
      title: '',
      summary: '',
      category: 'Destaques',
      source: 'Portal Fiscal Pro'
  });

  const handlePublish = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newsForm.title || !newsForm.summary) return;

      onPostNews({
          ...newsForm,
          date: new Date().toLocaleDateString('pt-BR'),
          isCustom: true
      });

      // Reset
      setNewsForm({ title: '', summary: '', category: 'Destaques', source: 'Portal Fiscal Pro' });
      alert('Notícia publicada com sucesso!');
  };

  return (
    <div className="space-y-6 animate-fade-in-up pb-10">
      <div className="flex justify-between items-center mb-6">
         <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Painel Administrativo</h1>
            <p className="text-slate-500 dark:text-slate-400">Visão geral do sistema e gerenciamento de conteúdo.</p>
         </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
         {/* News Poster (Left Column) */}
         <div className="lg:col-span-1">
             <Card title="Publicar Notícia / Aviso">
                 <form onSubmit={handlePublish} className="space-y-4">
                     <FormInput 
                        label="Título da Manchete" 
                        placeholder="Ex: Novo prazo para entrega da EFD..." 
                        value={newsForm.title}
                        onChange={(e) => setNewsForm({...newsForm, title: e.target.value})}
                     />
                     <div>
                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Resumo</label>
                        <textarea 
                            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none h-32 resize-none text-sm"
                            placeholder="Descreva brevemente a notícia..."
                            value={newsForm.summary}
                            onChange={(e) => setNewsForm({...newsForm, summary: e.target.value})}
                        />
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-2">
                            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Categoria</label>
                            <select 
                                className="w-full h-11 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm"
                                value={newsForm.category}
                                onChange={(e) => setNewsForm({...newsForm, category: e.target.value})}
                            >
                                <option>Destaques</option>
                                <option>Tributário</option>
                                <option>Urgente</option>
                            </select>
                         </div>
                     </div>
                     <Button type="submit" className="w-full">
                         <Plus size={18} /> Publicar no Feed
                     </Button>
                 </form>
             </Card>
         </div>

         {/* Stats Overview (Right Columns) */}
         <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AdminStatCard title="Usuários Totais" value="12,450" change="+12%" icon={Users} color="blue" />
                <AdminStatCard title="Receita Mensal" value="R$ 45.2k" change="+8.5%" icon={DollarSign} color="emerald" />
                <AdminStatCard title="Uso de IA (Tokens)" value="2.4M" change="+24%" icon={Activity} color="purple" />
                <AdminStatCard title="Alertas Pendentes" value="14" change="Ação Req." icon={AlertTriangle} color="amber" />
            </div>

            {/* Recent Users Table */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                    <h3 className="font-bold text-slate-900 dark:text-white">Usuários Recentes</h3>
                    <div className="relative">
                        <input type="text" placeholder="Buscar..." className="pl-8 pr-3 py-1 text-sm border border-slate-200 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 focus:outline-none" />
                        <Search className="absolute left-2.5 top-1.5 text-slate-400" size={14} />
                    </div>
                </div>
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 font-medium">
                        <tr>
                            <th className="px-6 py-3">Usuário</th>
                            <th className="px-6 py-3">Plano</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3 text-right">Ação</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                        {[
                            { name: "Ricardo Oliveira", email: "ricardo@firma.com", plan: "Auditor", status: "Active" },
                            { name: "Julia Santos", email: "julia.contabil@gmail.com", plan: "Pro", status: "Active" },
                            { name: "Marcos Vinicius", email: "mv.consultoria@uol.com.br", plan: "Free", status: "Inactive" },
                        ].map((user, idx) => (
                            <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-slate-900 dark:text-white">{user.name}</div>
                                    <div className="text-xs text-slate-500">{user.email}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold 
                                        ${user.plan === 'Auditor' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' : 
                                        user.plan === 'Pro' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 
                                        'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400'}`}>
                                        {user.plan}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                                        <span className="text-slate-600 dark:text-slate-400">{user.status}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                        <MoreVertical size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
         </div>
      </div>
    </div>
  );
};

const AdminStatCard = ({ title, value, change, icon: Icon, color }: any) => {
    const colorClasses = {
        blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
        emerald: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400',
        purple: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
        amber: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400',
    }[color as string] || 'bg-slate-50 text-slate-600';

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${colorClasses}`}>
                    <Icon size={24} />
                </div>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-full">{change}</span>
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">{title}</div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white">{value}</div>
        </div>
    );
};
