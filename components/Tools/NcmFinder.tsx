import React, { useState } from 'react';
import { ToolLayout, FormInput, Button } from '../ToolShared';
import { Search, Package, Tag, ArrowRight } from 'lucide-react';

// Mock Data
const NCM_DB = [
    { code: '8471.30.12', desc: 'Máquinas automáticas para processamento de dados, portáteis (Tablets)', ipi: '0%', aliq: '12-18%' },
    { code: '8471.30.19', desc: 'Outras máquinas automáticas para processamento de dados', ipi: '15%', aliq: '18%' },
    { code: '2203.00.00', desc: 'Cervejas de malte', ipi: '6%', aliq: '20% + ST' },
    { code: '8703.22.10', desc: 'Veículos automóveis para transporte de passageiros', ipi: '11%', aliq: '12%' },
    { code: '3004.90.99', desc: 'Outros medicamentos contendo produtos misturados', ipi: '0%', aliq: 'Isento' },
];

export default function NcmFinder({ onBack }: { onBack: () => void }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<typeof NCM_DB>([]);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setHasSearched(true);
        if (!query) {
            setResults([]);
            return;
        }
        
        const filtered = NCM_DB.filter(item => 
            item.code.includes(query) || 
            item.desc.toLowerCase().includes(query.toLowerCase())
        );
        
        // If no matches, show generic fallback for demo
        if (filtered.length === 0 && query.length > 2) {
             setResults([
                 { code: '0000.00.00', desc: `Simulação: Resultado para "${query}"`, ipi: 'Var', aliq: 'Var' },
                 ...NCM_DB.slice(0, 2)
             ]);
        } else {
            setResults(filtered);
        }
    };

    return (
        <ToolLayout 
            title="NCM Finder Inteligente" 
            description="Busque códigos NCM, alíquotas de IPI e descrições TIPI atualizadas."
            onBack={onBack}
        >
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Search Bar */}
                <form onSubmit={handleSearch} className="relative group">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                        <Search className="text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
                    </div>
                    <input 
                        type="text" 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Digite o nome do produto ou código (ex: Cerveja, 8471...)"
                        className="w-full h-16 pl-12 pr-32 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-lg shadow-sm focus:border-emerald-500 focus:ring-0 outline-none transition-all"
                        autoFocus
                    />
                    <div className="absolute right-2 top-2 bottom-2">
                        <Button type="submit" className="h-full rounded-xl px-6">
                            Buscar
                        </Button>
                    </div>
                </form>

                {/* Results Area */}
                <div className="space-y-4">
                    {hasSearched && results.length === 0 ? (
                        <div className="text-center py-12 text-slate-500">
                            <Package size={48} className="mx-auto mb-4 opacity-20" />
                            <p>Nenhum NCM encontrado para "{query}".</p>
                        </div>
                    ) : (
                        results.map((item, idx) => (
                            <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all cursor-pointer group shadow-sm hover:shadow-md">
                                <div className="flex justify-between items-start gap-4">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="font-mono text-lg font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1 rounded-lg">
                                                {item.code}
                                            </span>
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded">TIPI 2024</span>
                                        </div>
                                        <h3 className="text-lg font-medium text-slate-900 dark:text-white leading-relaxed">
                                            {item.desc}
                                        </h3>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <ArrowRight className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
                                    </div>
                                </div>
                                
                                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 flex gap-4">
                                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                                        <Tag size={14} className="text-slate-400" />
                                        <span>IPI: <strong>{item.ipi}</strong></span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                                        <Tag size={14} className="text-slate-400" />
                                        <span>ICMS Médio: <strong>{item.aliq}</strong></span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                    
                    {!hasSearched && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                            {['Eletrônicos', 'Bebidas', 'Automotivo', 'Farmacêutico'].map((cat) => (
                                <button 
                                    key={cat}
                                    onClick={() => { setQuery(cat); handleSearch({ preventDefault: () => {} } as any); }}
                                    className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-center"
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </ToolLayout>
    );
}