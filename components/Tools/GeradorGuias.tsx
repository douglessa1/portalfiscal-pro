import React from 'react';
import { ToolLayout, Card } from '../ToolShared';
import { Download, FileText } from 'lucide-react';

export default function GeradorGuias({ onBack }: { onBack: () => void }) {
    const guias = [
        { nome: 'DAS - Simples Nacional', descricao: 'Documento de Arrecadação do Simples' },
        { nome: 'DARF - Receita Federal', descricao: 'Documento de Arrecadação de Receitas Federais' },
        { nome: 'GNRE - Estados', descricao: 'Guia Nacional de Recolhimento de Tributos Estaduais' },
        { nome: 'GPS - Previdência', descricao: 'Guia da Previdência Social' },
    ];

    return (
        <ToolLayout
            title="Gerador de Guias"
            description="Gere guias de pagamento de tributos federais e estaduais"
            onBack={onBack}
        >
            <div className="space-y-6">
                <Card title="Selecione o Tipo de Guia">
                    <div className="grid md:grid-cols-2 gap-4">
                        {guias.map((guia, idx) => (
                            <div
                                key={idx}
                                className="p-6 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors cursor-pointer group"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <FileText className="text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform" size={32} />
                                    <Download size={20} className="text-slate-400 group-hover:text-emerald-500" />
                                </div>
                                <div className="font-bold text-slate-900 dark:text-white mb-1">{guia.nome}</div>
                                <div className="text-xs text-slate-600 dark:text-slate-400">{guia.descricao}</div>
                            </div>
                        ))}
                    </div>
                </Card>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                    <strong className="text-blue-800 dark:text-blue-200">✨ Recursos:</strong>
                    <ul className="text-sm text-blue-700 dark:text-blue-300 mt-2 ml-6 list-disc">
                        <li>Geração automática de código de barras</li>
                        <li>Cálculo de juros e multa por atraso</li>
                        <li>Exportação em PDF prontoar impressão</li>
                        <li>Histórico de guias emitidas</li>
                    </ul>
                </div>

                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 text-sm text-amber-800 dark:text-amber-200">
                    <strong>⚠️ Em desenvolvimento:</strong> Gerador completo com código de barras será implementado em breve.
                </div>
            </div>
        </ToolLayout>
    );
}
