import React, { useEffect, useState } from 'react';
import { fetchTaxNews } from '../services/gemini';
import { NewsArticle } from '../types';
import { Newspaper, RefreshCw, Zap, XCircle, Clock, ArrowUpRight, TrendingUp, Filter, ChevronRight, Share2, Bookmark, Megaphone } from 'lucide-react';

interface NewsFeedProps {
    customNews?: any[];
}

export const NewsFeed: React.FC<NewsFeedProps> = ({ customNews = [] }) => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Destaques');
  const [isProUser, setIsProUser] = useState(false); 

  const loadNews = async () => {
    setLoading(true);
    const query = activeCategory === 'Destaques' ? 'Reforma Tributária e Mercado' : `Notícias sobre ${activeCategory} no Brasil`;
    
    const data = await fetchTaxNews(query);
    // Duplicate data if not enough to fill grid for demo purposes
    const filledData = data.length < 8 ? [...data, ...data] : data;
    
    // Merge custom news at the top if category matches or is 'Destaques'
    let finalArticles = filledData;
    if (customNews.length > 0 && (activeCategory === 'Destaques' || activeCategory === 'Tributário')) {
        // Convert custom news to NewsArticle format
        const formattedCustomNews = customNews.map(item => ({
            title: item.title,
            summary: item.summary,
            source: item.source,
            date: item.date,
            url: '#',
            isCustom: true
        }));
        finalArticles = [...formattedCustomNews, ...filledData];
    }

    setArticles(finalArticles.slice(0, 10)); 
    setLoading(false);
  };

  useEffect(() => {
    loadNews();
  }, [activeCategory, customNews]);

  // Placeholder images for visual "newspaper" feel
  const getPlaceholderImage = (index: number) => {
    const gradients = [
        'bg-gradient-to-br from-slate-800 to-slate-900',
        'bg-gradient-to-bl from-emerald-900 to-slate-900',
        'bg-gradient-to-tr from-blue-900 to-slate-900',
        'bg-gradient-to-br from-purple-900 to-slate-900',
    ];
    return gradients[index % gradients.length];
  }

  const CATEGORIES = ['Destaques', 'Tributário', 'Economia', 'Jurídico', 'Mercado', 'Tecnologia'];

  return (
    <div className="space-y-8 animate-fade-in-up pb-10">
      
      {/* Header & Ticker */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Em Tempo Real</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    Radar Fiscal
                </h1>
                <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">
                    Curadoria inteligente das principais fontes tributárias do Brasil.
                </p>
            </div>
            
            <div className="flex items-center gap-3">
               <button 
                 onClick={() => setIsProUser(!isProUser)}
                 className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border transition-colors ${
                    isProUser 
                    ? 'bg-emerald-100 border-emerald-200 text-emerald-700 dark:bg-emerald-900/30 dark:border-emerald-800 dark:text-emerald-400' 
                    : 'bg-slate-100 border-slate-200 text-slate-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400'
                 }`}
               >
                  {isProUser ? <Zap size={14} fill="currentColor" /> : <XCircle size={14} />}
                  {isProUser ? 'Assinante Pro' : 'Versão Gratuita'}
               </button>
            </div>
        </div>

        {/* Categories Navigation */}
        <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
                <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                        activeCategory === cat
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md'
                        : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                    }`}
                >
                    {cat}
                </button>
            ))}
            <button 
                onClick={loadNews}
                className="ml-auto p-2 text-slate-400 hover:text-emerald-500 transition-colors"
                title="Atualizar Feed"
            >
                <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            </button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-96">
            <div className="md:col-span-8 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse"></div>
            <div className="md:col-span-4 space-y-4">
                <div className="h-1/3 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse"></div>
                <div className="h-1/3 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse"></div>
                <div className="h-1/3 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse"></div>
            </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT COLUMN (8 cols) - Hero & Feed */}
            <div className="lg:col-span-8 space-y-8">
                
                {/* 1. HERO ARTICLE */}
                {articles[0] && (
                    <div className="relative group rounded-3xl overflow-hidden min-h-[450px] cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500">
                        <div className={`absolute inset-0 ${getPlaceholderImage(0)} group-hover:scale-105 transition-transform duration-700`}></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
                        
                        <div className="absolute top-6 left-6">
                             <span className="bg-emerald-500/90 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm">
                                <TrendingUp size={12} /> {articles[0].isCustom ? 'Comunicado Oficial' : 'Destaque do Dia'}
                            </span>
                        </div>

                        <div className="absolute bottom-0 left-0 p-8 w-full">
                             <div className="flex items-center gap-3 text-emerald-300 text-xs font-bold uppercase tracking-widest mb-3">
                                <span className="flex items-center gap-1"><Clock size={12} /> {articles[0].date}</span>
                                <span>•</span>
                                <span>{articles[0].source}</span>
                             </div>
                             <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight group-hover:underline decoration-emerald-500 underline-offset-8 decoration-4">
                                {articles[0].title}
                             </h2>
                             <p className="text-slate-200 text-lg line-clamp-2 max-w-3xl mb-6 leading-relaxed">
                                {articles[0].summary}
                             </p>
                             <div className="flex items-center gap-4">
                                <button className="bg-white text-slate-900 px-6 py-2.5 rounded-full font-bold text-sm hover:bg-emerald-50 transition-colors flex items-center gap-2">
                                    Ler Completo <ArrowUpRight size={16} />
                                </button>
                             </div>
                        </div>
                    </div>
                )}

                {/* 2. STANDARD FEED LIST */}
                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Filter size={20} className="text-emerald-500" /> Mais Notícias
                    </h3>
                    <div className="grid gap-6">
                        {articles.slice(1, 6).map((article, idx) => (
                            <div key={idx} className={`bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-emerald-200 dark:hover:border-emerald-900 transition-all cursor-pointer flex flex-col md:flex-row gap-6 group ${article.isCustom ? 'border-l-4 border-l-emerald-500' : ''}`}>
                                <div className={`w-full md:w-48 h-32 rounded-xl shrink-0 ${getPlaceholderImage(idx + 1)} flex items-center justify-center`}>
                                    {article.isCustom && <Megaphone className="text-white opacity-50" size={32} />}
                                </div>
                                <div className="flex-1 flex flex-col justify-center">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">{article.source}</span>
                                        <span className="text-xs text-slate-400 flex items-center gap-1"><Clock size={12} /> {article.date}</span>
                                    </div>
                                    <h4 className="text-lg font-bold text-slate-900 dark:text-white leading-tight mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                        {article.title}
                                    </h4>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                                        {article.summary}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* RIGHT COLUMN (4 cols) - Sidebar */}
            <div className="lg:col-span-4 space-y-6">
                {/* Trending Topics */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6 shadow-sm">
                    <h3 className="font-bold text-slate-900 dark:text-white mb-4">Assuntos do Momento</h3>
                    <div className="space-y-3">
                        {['#ReformaTributária', '#DIFAL', '#SimplesNacional', '#IRPF2025', '#BlocoK'].map((tag, i) => (
                            <div key={i} className="flex items-center justify-between group cursor-pointer">
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-300 group-hover:text-emerald-600 transition-colors">{tag}</span>
                                <span className="text-xs text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full">{(10 - i)}k posts</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
      )}
    </div>
  );
};
