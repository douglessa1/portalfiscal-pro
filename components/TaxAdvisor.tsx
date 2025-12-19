import React, { useState, useMemo } from 'react';
import { BrainCircuit, Sparkles, AlertCircle, Send, Plus, History, MessageSquare, ExternalLink, BookOpen, Scale, Landmark, Globe, ChevronRight, Copy, Check, FileBadge, ScrollText, Newspaper, BarChart3 } from 'lucide-react';
import { analyzeComplexTaxScenario } from '../services/gemini';
import { Source } from '../types';
import ReactMarkdown from 'react-markdown';

interface ChatSession {
    id: string;
    title: string;
    date: string;
    query: string;
    response: string;
    sources?: Source[];
}

export const TaxAdvisor: React.FC = () => {
  const [query, setQuery] = useState('');
  const [currentResponse, setCurrentResponse] = useState<string | null>(null);
  const [currentSources, setCurrentSources] = useState<Source[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [history, setHistory] = useState<ChatSession[]>([
      { id: '1', title: 'Fusão Lucro Real x Presumido', date: 'Há 2 dias', query: '...', response: '...', sources: [] },
      { id: '2', title: 'Crédito de PIS/COFINS', date: 'Há 5 dias', query: '...', response: '...', sources: [] },
  ]);

  const handleAnalyze = async () => {
    if (!query.trim()) return;
    setIsThinking(true);
    setCurrentResponse(null);
    setCurrentSources([]);
    
    const { text, sources } = await analyzeComplexTaxScenario(query);
    
    setCurrentResponse(text);
    setCurrentSources(sources);
    setIsThinking(false);

    // Add to history
    const newSession: ChatSession = {
        id: Date.now().toString(),
        title: query.slice(0, 30) + '...',
        date: 'Agora',
        query: query,
        response: text,
        sources: sources
    };
    setHistory([newSession, ...history]);
  };

  const handleCopyResponse = async () => {
      if (!currentResponse) return;
      try {
          await navigator.clipboard.writeText(currentResponse);
          setCopyFeedback(true);
          setTimeout(() => setCopyFeedback(false), 2000);
      } catch (err) {
          console.error('Failed to copy', err);
      }
  };

  // Helper to categorize sources
  const getSourceCategory = (url: string) => {
      const lowerUrl = url.toLowerCase();
      if (lowerUrl.includes('receita.fazenda') || lowerUrl.includes('gov.br/receitafederal')) return 'Receita Federal';
      if (lowerUrl.includes('planalto.gov.br')) return 'Legislação';
      if (lowerUrl.includes('jusbrasil') || lowerUrl.includes('stf') || lowerUrl.includes('stj') || lowerUrl.includes('trf')) return 'Judiciário';
      if (lowerUrl.includes('valor') || lowerUrl.includes('cnn') || lowerUrl.includes('exame') || lowerUrl.includes('uol') || lowerUrl.includes('estadao')) return 'Notícias';
      if (lowerUrl.includes('gov.br')) return 'Governo Geral';
      return 'Outros';
  };

  // Helper to get icon based on domain (Visual)
  const getSourceIcon = (url: string) => {
      const category = getSourceCategory(url);
      switch (category) {
          case 'Receita Federal': return <FileBadge size={20} className="text-blue-600 dark:text-blue-400" />;
          case 'Legislação': return <ScrollText size={20} className="text-yellow-600 dark:text-yellow-400" />;
          case 'Judiciário': return <Scale size={20} className="text-amber-700 dark:text-amber-400" />;
          case 'Notícias': return <Newspaper size={20} className="text-slate-600 dark:text-slate-400" />;
          case 'Governo Geral': return <Landmark size={20} className="text-emerald-700 dark:text-emerald-400" />;
          default: return <Globe size={20} className="text-slate-400 dark:text-slate-500" />;
      }
  };

  // Calculate Source Distribution Stats
  const sourceStats = useMemo(() => {
      if (!currentSources.length) return [];
      
      const counts: Record<string, number> = {};
      currentSources.forEach(source => {
          const cat = getSourceCategory(source.url);
          counts[cat] = (counts[cat] || 0) + 1;
      });

      const total = currentSources.length;
      
      return Object.entries(counts)
          .map(([label, count]) => ({
              label,
              count,
              percent: Math.round((count / total) * 100),
              color: label === 'Receita Federal' ? 'bg-blue-500' :
                     label === 'Legislação' ? 'bg-yellow-500' :
                     label === 'Judiciário' ? 'bg-amber-600' :
                     label === 'Notícias' ? 'bg-slate-500' :
                     'bg-emerald-500'
          }))
          .sort((a, b) => b.count - a.count);
  }, [currentSources]);

  return (
    <div className="grid lg:grid-cols-4 gap-4 md:gap-6 h-[calc(100vh-7rem)] md:h-[calc(100vh-8rem)]">
      
      {/* Sidebar History (Hidden on Mobile) */}
      <div className="hidden lg:flex flex-col bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 dark:border-slate-700">
              <button 
                onClick={() => { setQuery(''); setCurrentResponse(null); setCurrentSources([]); }}
                className="w-full flex items-center justify-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 py-3 rounded-xl font-bold hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors"
              >
                  <Plus size={18} /> Nova Consulta
              </button>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
              <p className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Histórico Recente</p>
              {history.map(session => (
                  <button key={session.id} className="w-full text-left p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors group">
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400">{session.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                          <History size={12} className="text-slate-400" />
                          <span className="text-xs text-slate-400">{session.date}</span>
                      </div>
                  </button>
              ))}
          </div>
      </div>

      {/* Main Chat Area */}
      <div className="lg:col-span-3 flex flex-col bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden relative">
        
        {/* Chat Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10 space-y-6 md:space-y-8 scroll-smooth">
            {!currentResponse && !isThinking ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-50 px-4">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-indigo-50 dark:bg-indigo-900/20 rounded-3xl flex items-center justify-center mb-6">
                        <BrainCircuit size={32} className="text-indigo-500 md:w-10 md:h-10" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2">Como posso ajudar hoje?</h2>
                    <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
                        Utilizo o modelo <span className="font-mono text-xs bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded">Gemini 1.5 Pro</span> com acesso à legislação atualizada via Google Search para analisar cenários tributários complexos.
                    </p>
                </div>
            ) : (
                <>
                     {/* User Message */}
                     <div className="flex gap-3 md:gap-4 flex-row-reverse">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex-shrink-0"></div>
                        <div className="bg-slate-100 dark:bg-slate-700 rounded-2xl rounded-tr-sm p-3 md:p-4 text-slate-800 dark:text-slate-200 max-w-[85%] md:max-w-3xl">
                            <p className="whitespace-pre-wrap text-sm md:text-base">{query}</p>
                        </div>
                     </div>

                     {/* AI Response */}
                     <div className="flex gap-3 md:gap-4">
                        <div className="flex-shrink-0">
                            {/* Avatar Icon */}
                            {!isThinking && (
                                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-sm border border-indigo-200 dark:border-indigo-800">
                                    <BrainCircuit size={18} className="md:w-5 md:h-5" />
                                </div>
                            )}
                        </div>

                        <div className="flex-1 space-y-6 min-w-0">
                            {isThinking ? (
                                <div className="space-y-6 pt-1">
                                    <div className="flex items-center gap-3 md:gap-4">
                                         <div className="relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12">
                                            <div className="absolute inset-0 bg-indigo-500 rounded-full opacity-20 animate-ping"></div>
                                            <div className="relative bg-white dark:bg-slate-800 rounded-full p-2 border border-indigo-100 dark:border-indigo-900 shadow-sm">
                                                <BrainCircuit size={18} className="text-indigo-600 dark:text-indigo-400 animate-pulse md:w-5 md:h-5" />
                                            </div>
                                         </div>
                                         <div className="space-y-1">
                                            <span className="block font-bold text-sm text-slate-700 dark:text-slate-200">
                                                Analisando Cenário Fiscal
                                            </span>
                                            <span className="block text-xs text-slate-500 dark:text-slate-400 animate-pulse">
                                                Consultando legislação vigente e jurisprudência...
                                            </span>
                                         </div>
                                    </div>
                                    
                                    {/* Skeleton Loader for Text */}
                                    <div className="space-y-3 pl-12 md:pl-16 opacity-60">
                                        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full w-3/4 animate-pulse"></div>
                                        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full w-full animate-pulse delay-75"></div>
                                        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full w-5/6 animate-pulse delay-100"></div>
                                        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full w-2/3 animate-pulse delay-150"></div>
                                    </div>

                                    {/* Skeleton Loader for Sources */}
                                    <div className="pt-4 pl-12 md:pl-16 opacity-60 flex gap-4 overflow-hidden">
                                        <div className="h-16 w-32 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl animate-pulse"></div>
                                        <div className="h-16 w-32 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl animate-pulse delay-75"></div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="prose prose-sm md:prose-base prose-slate dark:prose-invert max-w-none bg-white dark:bg-transparent rounded-lg">
                                        <ReactMarkdown>{currentResponse || ''}</ReactMarkdown>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        <button className="text-xs font-bold text-slate-500 hover:text-blue-600 flex items-center gap-1 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-full transition-colors">
                                            <MessageSquare size={12} /> Continuar conversa
                                        </button>
                                        <button 
                                            onClick={handleCopyResponse}
                                            className="text-xs font-bold text-slate-500 hover:text-emerald-600 flex items-center gap-1 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-full transition-colors"
                                            title="Copiar resposta"
                                        >
                                            {copyFeedback ? <Check size={12} /> : <Copy size={12} />}
                                            {copyFeedback ? 'Copiado' : 'Copiar'}
                                        </button>
                                    </div>

                                    {/* Professional Citations Section */}
                                    {currentSources.length > 0 && (
                                        <div className="mt-8 border-t border-slate-100 dark:border-slate-700 pt-6">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                                <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                                                    <BookOpen size={18} className="text-emerald-600" />
                                                    <h3 className="font-bold text-sm md:text-base">Fontes e Referências Legais</h3>
                                                </div>
                                            </div>

                                            {/* Source Distribution Chart */}
                                            {sourceStats.length > 0 && (
                                                <div className="mb-6 bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 border border-slate-100 dark:border-slate-700">
                                                    <div className="flex items-center gap-2 mb-3 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                                        <BarChart3 size={14} /> Distribuição de Fontes
                                                    </div>
                                                    <div className="space-y-3">
                                                        {sourceStats.map((stat, idx) => (
                                                            <div key={idx} className="flex items-center gap-3">
                                                                <div className="w-24 md:w-32 flex-shrink-0 text-xs font-medium text-slate-600 dark:text-slate-300 truncate">
                                                                    {stat.label}
                                                                </div>
                                                                <div className="flex-1 h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                                                    <div 
                                                                        className={`h-full rounded-full ${stat.color} transition-all duration-500`}
                                                                        style={{ width: `${stat.percent}%` }}
                                                                    ></div>
                                                                </div>
                                                                <div className="w-8 text-right text-xs font-bold text-slate-700 dark:text-slate-200">
                                                                    {stat.count}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                                {currentSources.map((source, idx) => (
                                                    <a 
                                                        key={idx} 
                                                        href={source.url} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group"
                                                    >
                                                        <div className="p-2 md:p-3 bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700 group-hover:border-emerald-200 dark:group-hover:border-emerald-900 transition-colors flex-shrink-0">
                                                            {getSourceIcon(source.url)}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-[10px] md:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1 truncate">
                                                                {source.snippet || 'Fonte Externa'}
                                                            </p>
                                                            <h4 className="font-semibold text-xs md:text-sm text-slate-900 dark:text-white leading-tight line-clamp-2 mb-2 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                                                                {source.title}
                                                            </h4>
                                                            <div className="flex items-center text-xs font-medium text-emerald-600 dark:text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-1 group-hover:translate-y-0">
                                                                Acessar Documento <ChevronRight size={12} />
                                                            </div>
                                                        </div>
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    
                                    {/* Disclaimer Footer */}
                                    <div className="pt-4 flex items-start gap-2 text-[10px] md:text-xs text-slate-400">
                                        <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
                                        <p>IA generativa pode cometer erros. Verifique as informações na fonte oficial (Receita Federal/Planalto).</p>
                                    </div>
                                </>
                            )}
                        </div>
                     </div>
                </>
            )}
        </div>

        {/* Input Area */}
        <div className="p-3 md:p-4 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700 z-10">
            <div className="relative max-w-4xl mx-auto">
                <textarea
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Descreva o caso fiscal..."
                    className="w-full pl-4 pr-12 md:pr-14 py-3 md:py-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none shadow-sm transition-all max-h-40 min-h-[50px] md:min-h-[60px] text-sm md:text-base"
                    rows={1}
                    onKeyDown={(e) => {
                        if(e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleAnalyze();
                        }
                    }}
                />
                <button 
                    onClick={handleAnalyze}
                    disabled={!query.trim() || isThinking}
                    className="absolute right-2 bottom-2 md:bottom-2.5 p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg disabled:opacity-50 disabled:hover:bg-indigo-600 transition-colors"
                >
                    <Send size={16} className="md:w-[18px] md:h-[18px]" />
                </button>
            </div>
            <p className="hidden md:block text-center text-[10px] text-slate-400 mt-2">Pressione Enter para enviar. Shift + Enter para quebra de linha.</p>
        </div>

      </div>
    </div>
  );
};