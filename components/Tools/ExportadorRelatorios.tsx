import React from 'react';
import { ToolLayout, Card } from '../ToolShared';
import { Download, FileSpreadsheet } from 'lucide-react';

export default function ExportadorRelatorios({ onBack }: { onBack: () => void }) {
    const relatorios = [
        { tipo: 'Cálculos Mensais', formato: 'PDF / Excel', descricao: 'Todos os cálculos do mês' },
        { tipo: 'Histórico Anual', formato: 'Excel', descricao: 'Consolidação anual detalhada' },
        { tipo: 'Compliance Report', formato: 'PDF', descricao: 'Relatório de conformidade' },
        { tipo: 'Auditoria Trail', formato: 'CSV', descricao: 'Trilha de auditoria completa' },
    ];

    return (
        <ToolLayout
            title="Exportador de Relatórios"
            description="Exporte seus cálculos e relatórios em diversos formatos"
            onBack={onBack}
        >
            <div className="space-y-6">
                <Card title="Formatos Disponíveis">
                    <div className="grid md:grid-cols-2 gap-4">
                        {relatorios.map((rel, idx) => (
                            <div
                                key={idx}
                                className="p-6 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors cursor-pointer group"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <FileSpreadsheet className="text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform" size={32} />
                                    <Download size={20} className="text-slate-400 group-hover:text-emerald-500" />
                                </div>
                                <div className="font-bold text-slate-900 dark:text-white mb-1">{rel.tipo}</div>
                                <div className="text-xs text-slate-600 dark:text-slate-400 mb-2">{rel.descricao}</div>
                                <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400">{rel.formato}</div>
                            </div>
                        ))}
                    </div>
                </Card>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                    <strong className="text-blue-800 dark:text-blue-200">✨ Recursos de Exportação:</strong>
                    <ul className="text-sm text-blue-700 dark:text-blue-300 mt-2 ml-6 list-disc">
                        <li>Exportação em lote de múltiplos cálculos</li>
                        <li>Templates personalizados</li>
                        <li>Agendamento de relatórios automáticos</li>
                        <li>Envio por email</li>
                        <li>Integração com Google Drive / Dropbox</li>
                    </ul>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-4 text-sm text-purple-800 dark:text-purple-200">
                    <strong>💼 PRO Feature:</strong> Exportação avançada disponível para usuários PRO.
                </div>
            </div>
        </ToolLayout>
    );
}
