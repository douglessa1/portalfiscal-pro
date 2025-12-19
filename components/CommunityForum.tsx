import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, MessageCircle, MoreHorizontal, Filter, PlusCircle, CheckCircle2, Search, TrendingUp, Award, User, Hash, Eye, ArrowUp, Clock, Bookmark, X, Bold, Italic, Link as LinkIcon, List, Image } from 'lucide-react';
import { Button, FormInput } from './ToolShared';

interface Topic {
    id: number;
    author: string;
    role: string;
    avatarColor: string;
    title: string;
    category: string;
    votes: number;
    comments: number;
    views: number;
    time: string;
    isSolved: boolean;
    preview: string;
}

export const CommunityForum: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [newTopic, setNewTopic] = useState({ title: '', content: '', category: 'Geral' });
  const [topics, setTopics] = useState<Topic[]>([
    {
      id: 1,
      author: "Ana Silva",
      role: "Contadora Sênior",
      avatarColor: "bg-purple-100 text-purple-600",
      title: "Dúvida sobre Difal na EC 87/2015 para não contribuintes",
      category: "ICMS",
      votes: 45,
      comments: 12,
      views: 342,
      time: "2h atrás",
      isSolved: true,
      preview: "Pessoal, estou com um cliente do RS vendendo para consumidor final no SP. A nova regra de partilha mudou algo específico para produtos de informática? Já consultei a legislação estadual mas..."
    },
    {
      id: 2,
      author: "Carlos Mendes",
      role: "Advogado Tributarista",
      avatarColor: "bg-blue-100 text-blue-600",
      title: "Impacto da Reforma Tributária no Lucro Presumido - Serviços",
      category: "Reforma Tributária",
      votes: 128,
      comments: 34,
      views: 1205,
      time: "5h atrás",
      isSolved: false,
      preview: "Fiz uma simulação aqui e parece que a carga tributária para prestadores de serviço vai subir drasticamente. Alguém já tem um estudo comparativo sólido para compartilhar?"
    },
    // ... other initial topics
  ]);

  const handleCreateTopic = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newTopic.title || !newTopic.content) return;

      const topic: Topic = {
          id: Date.now(),
          author: "Douglas S.",
          role: "Usuário Pro",
          avatarColor: "bg-emerald-100 text-emerald-600",
          title: newTopic.title,
          category: newTopic.category,
          votes: 0,
          comments: 0,
          views: 0,
          time: "Agora",
          isSolved: false,
          preview: newTopic.content.substring(0, 150) + "..."
      };

      setTopics([topic, ...topics]);
      setShowModal(false);
      setNewTopic({ title: '', content: '', category: 'Geral' });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in-up pb-12 relative">
      
      {/* Create Topic Modal */}
      {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setShowModal(false)}></div>
              <div className="relative bg-white dark:bg-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up border border-slate-200 dark:border-slate-700">
                  <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white">Criar Novo Tópico</h2>
                      <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"><X size={20}/></button>
                  </div>
                  <form onSubmit={handleCreateTopic} className="p-6 space-y-4">
                      <FormInput 
                        label="Título da Pergunta" 
                        placeholder="Seja específico. Ex: Alíquota de ICMS para..." 
                        value={newTopic.title}
                        onChange={(e) => setNewTopic({...newTopic, title: e.target.value})}
                      />
                      <div>
                          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Detalhes</label>
                          <div className="border border-slate-200 dark:border-slate-600 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500 transition-all">
                              {/* Fake Toolbar */}
                              <div className="flex items-center gap-1 p-2 bg-slate-50 dark:bg-slate-700 border-b border-slate-200 dark:border-slate-600">
                                  <button type="button" className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-600 rounded text-slate-500 dark:text-slate-300"><Bold size={16}/></button>
                                  <button type="button" className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-600 rounded text-slate-500 dark:text-slate-300"><Italic size={16}/></button>
                                  <div className="w-px h-4 bg-slate-300 dark:bg-slate-500 mx-1"></div>
                                  <button type="button" className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-600 rounded text-slate-500 dark:text-slate-300"><List size={16}/></button>
                                  <button type="button" className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-600 rounded text-slate-500 dark:text-slate-300"><LinkIcon size={16}/></button>
                                  <button type="button" className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-600 rounded text-slate-500 dark:text-slate-300"><Image size={16}/></button>
                              </div>
                              <textarea 
                                className="w-full p-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none h-40 resize-none text-sm"
                                placeholder="Descreva sua dúvida com detalhes, cite leis se possível..."
                                value={newTopic.content}
                                onChange={(e) => setNewTopic({...newTopic, content: e.target.value})}
                              />
                          </div>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Categoria</label>
                        <select 
                            className="w-full h-11 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                            value={newTopic.category}
                            onChange={(e) => setNewTopic({...newTopic, category: e.target.value})}
                        >
                            <option>Geral</option>
                            <option>ICMS</option>
                            <option>Reforma Tributária</option>
                            <option>IRPF</option>
                            <option>Simples Nacional</option>
                        </select>
                      </div>
                      <div className="pt-2 flex justify-end gap-3">
                          <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-slate-500 font-bold text-sm hover:text-slate-800">Cancelar</button>
                          <Button type="submit">Publicar Dúvida</Button>
                      </div>
                  </form>
              </div>
          </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 md:p-10 shadow-xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-widest text-xs mb-2">
                    <MessageSquare size={14} /> Comunidade Oficial
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                    Fórum de Inteligência Fiscal
                </h1>
                <p className="text-slate-300 text-lg">
                    Conecte-se com profissionais, tire dúvidas e compartilhe experiências.
                </p>
                
                <div className="pt-6 w-full max-w-xl">
                    <div className="relative group">
                        <input 
                            type="text" 
                            placeholder="Pesquisar por tópicos, leis ou dúvidas..." 
                            className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:bg-white/20 focus:ring-2 focus:ring-emerald-500/50 backdrop-blur transition-all"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-400 transition-colors" size={20} />
                    </div>
                </div>
            </div>
            
            <button 
                onClick={() => setShowModal(true)}
                className="shrink-0 px-6 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 rounded-xl font-bold shadow-glow transition-all flex items-center gap-2 hover:-translate-y-1"
            >
                <PlusCircle size={20} /> Criar Novo Tópico
            </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between bg-white dark:bg-slate-800 p-2 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-x-auto">
                <div className="flex items-center gap-1">
                    {['Recentes', 'Mais Votados', 'Sem Resposta', 'Meus Tópicos'].map((filter, i) => (
                        <button key={filter} className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${i === 0 ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'}`}>
                            {filter}
                        </button>
                    ))}
                </div>
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-500 hover:text-emerald-600 transition-colors whitespace-nowrap">
                    <Filter size={16} /> Filtros
                </button>
            </div>

            <div className="space-y-4">
                {topics.map(topic => (
                    <div key={topic.id} className={`bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all cursor-pointer group overflow-hidden ${topic.isSolved ? 'border-l-4 border-l-emerald-500' : 'border-l-4 border-l-slate-300 dark:border-l-slate-600'}`}>
                        <div className="p-5 flex gap-6">
                            <div className="hidden sm:flex flex-col gap-3 min-w-[80px] text-center pt-1">
                                <div className="flex flex-col items-center p-2 rounded-lg bg-slate-50 dark:bg-slate-900/50">
                                    <span className="text-lg font-bold text-slate-700 dark:text-slate-200">{topic.votes}</span>
                                    <span className="text-[10px] text-slate-500 uppercase font-medium">Votos</span>
                                </div>
                                <div className={`flex flex-col items-center p-2 rounded-lg border ${topic.isSolved ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-900' : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700'}`}>
                                    <span className={`text-lg font-bold ${topic.isSolved ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400'}`}>{topic.comments}</span>
                                    <span className={`text-[10px] uppercase font-medium ${topic.isSolved ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`}>Resp.</span>
                                </div>
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${topic.avatarColor}`}>
                                            {topic.author.charAt(0)}
                                        </div>
                                        <span className="text-xs font-bold text-slate-700 dark:text-slate-200 hover:underline">{topic.author}</span>
                                        <span className="text-xs text-slate-400">•</span>
                                        <span className="text-xs text-slate-500 dark:text-slate-400">{topic.role}</span>
                                        <span className="text-xs text-slate-400 mx-1">•</span>
                                        <span className="text-xs text-slate-400 flex items-center gap-1"><Clock size={10} /> {topic.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {topic.isSolved && (
                                            <span className="hidden sm:flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/40 px-2 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                                                <CheckCircle2 size={12} strokeWidth={3} /> RESOLVIDO
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                        {topic.title}
                                    </h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                                        {topic.preview}
                                    </p>
                                </div>
                                
                                <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold border border-slate-200 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                                            {topic.category}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
                                        <span className="flex items-center gap-1 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                                            <Eye size={14} /> {topic.views} visualizações
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm p-6">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <TrendingUp className="text-blue-500" size={20} /> Em Alta
                </h3>
                <div className="flex flex-wrap gap-2">
                    {['Reforma Tributária', 'SPED Fiscal', 'DIFAL', 'Simples Nacional', 'IRPF', 'Bloco K', 'ICMS', 'ISS'].map(tag => (
                        <span key={tag} className="px-3 py-1.5 bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-medium hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-700 dark:hover:text-emerald-400 cursor-pointer transition-colors border border-slate-100 dark:border-slate-600 flex items-center gap-1">
                            <Hash size={10} /> {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
