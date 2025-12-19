import React, { useState, useEffect } from 'react';
import { ToolLayout, Card } from '../ToolShared';
import { History, Trash2 } from 'lucide-react';

export default function HistoricoSimulacoes({ onBack }: { onBack: () => void }) {
    const [historico, setHistorico] = useState<any[]>([]);

    useEffect(() => {
        // Carregar do localStorage
        const saved = localStorage.getItem('all_calculations_history');
        if (saved) {
            try {
                setHistorico(JSON.parse(saved));
            } catch (e) {
                console.error('Erro ao carregar histórico', e);
            }
        }
    }, []);

    const limparHistorico = () => {
        if (confirm('Deseja limpar todo o histórico de simulações?')) {
            localStorage.removeItem('all_calculations_history');
            setHistorico([]);
        }
    };

    return (
        <ToolLayout
            title="Histórico de Simulações"
            description="Visualize e gerencie todos os cálculos realizados"
            onBack={onBack}
        >
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                        {historico.length} simulações salvas
                    </div>
                    {historico.length > 0 && (
                        <button
                            onClick={limparHistorico}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                            <Trash2 size={16} /> Limpar Tudo
                        </button>
                    )}
                </div>

                {historico.length === 0 ? (
                    <Card>
                        <div className="text-center py-12">
                            <History size={64} className="mx-auto mb-4 text-slate-300 dark:text-slate-700" />
                            <p className="text-slate-500 dark:text-slate-400">
                                Nenhuma simulação registrada ainda
                            </p>
                            <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
                                Use as calculadoras para gerar simulações
                            </p>
                        </div>
                    </Card>
                ) : (
                    <div className="space-y-3">
                        {historico.slice(0, 50).map((item, idx) => (
                            <Card key={idx}>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <div className="font-bold text-slate-900 dark:text-white mb-1">
                                            {item.tipo || 'Cálculo'}
                                        </div>
                                        <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
                                            {item.hash || `#${idx + 1}`}
                                        </div>
                                        <div className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                                            {item.timestamp ? new Date(item.timestamp).toLocaleString('pt-BR') : 'Data não disponível'}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        {item.total && (
                                            <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.total)}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </ToolLayout>
    );
}
