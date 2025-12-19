import React from 'react';
import { ToolLayout, Card } from '../ToolShared';
import { Database, FileSearch } from 'lucide-react';

export default function AuditorSped({ onBack }: { onBack: () => void }) {
    return (
        <ToolLayout
            title="Auditor SPED"
            description="Analise e audite arquivos SPED Fiscal e Contribuições"
            onBack={onBack}
        >
            <div className="space-y-6">
                <Card title="Upload SPED">
                    <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-12 text-center">
                        <Database size={64} className="mx-auto mb-4 text-slate-300 dark:text-slate-700" />
                        <p className="text-slate-600 dark:text-slate-400 mb-2">
                            Envie arquivo SPED para análise
                        </p>
                        <p className="text-xs text-slate-500">
                            Formatos: .txt (SPED Fiscal, SPED Contribuições)
                        </p>
                    </div>
                </Card>

                <div className="grid md:grid-cols-4 gap-4">
                    {['Bloco 0', 'Bloco C', 'Bloco D', 'Bloco H'].map((bloco, idx) => (
                        <div key={idx} className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-center">
                            <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mb-1">0</div>
                            <div className="text-xs text-slate-600 dark:text-slate-400">{bloco}</div>
                        </div>
                    ))}
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                    <FileSearch className="inline mb-1 mr-2 text-blue-600 dark:text-blue-400" size={20} />
                    <strong className="text-blue-800 dark:text-blue-200">Funcionalidades:</strong>
                    <ul className="text-sm text-blue-700 dark:text-blue-300 mt-2 ml-6 list-disc">
                        <li>Contagem de registros por bloco</li>
                        <li>Validação de estrutura</li>
                        <li>Identificação de inconsistências</li>
                        <li>Relatório de auditoria</li>
                    </ul>
                </div>

                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 text-sm text-amber-800 dark:text-amber-200">
                    <strong>⚠️ Em desenvolvimento:</strong> Parser completo de SPED será implementado na próxima versão.
                </div>
            </div>
        </ToolLayout>
    );
}
