import React from 'react';
import { ToolLayout, Card } from '../ToolShared';
import { FileCheck, Upload } from 'lucide-react';

export default function ValidadorNfe({ onBack }: { onBack: () => void }) {
    return (
        <ToolLayout
            title="Validador NFe"
            description="Valide estrutura e regras de negócio de arquivos XML NFe"
            onBack={onBack}
        >
            <div className="space-y-6">
                <Card title="Upload de NFe">
                    <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-12 text-center">
                        <Upload size={64} className="mx-auto mb-4 text-slate-300 dark:text-slate-700" />
                        <p className="text-slate-600 dark:text-slate-400 mb-2">
                            Arraste um arquivo XML de NFe ou clique para selecionar
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-500">
                            Formato: XML NFe (mod. 55)
                        </p>
                    </div>
                </Card>

                <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                        <FileCheck className="mb-2 text-blue-600 dark:text-blue-400" size={24} />
                        <div className="text-xs font-bold text-blue-700 dark:text-blue-300 mb-1">Estrutura XML</div>
                        <div className="text-sm text-blue-800 dark:text-blue-200">
                            Validação de schema e campos obrigatórios
                        </div>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-4">
                        <div className="text-xl mb-2">📋</div>
                        <div className="text-xs font-bold text-purple-700 dark:text-purple-300 mb-1">Regras de Negócio</div>
                        <div className="text-sm text-purple-800 dark:text-purple-200">
                            CFOP, NCM, CST, alíquotas
                        </div>
                    </div>
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4">
                        <div className="text-xl mb-2">✅</div>
                        <div className="text-xs font-bold text-emerald-700 dark:text-emerald-300 mb-1">Relatório</div>
                        <div className="text-sm text-emerald-800 dark:text-emerald-200">
                            Erros, avisos e sugestões
                        </div>
                    </div>
                </div>

                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
                    <div className="text-sm text-amber-800 dark:text-amber-200">
                        <strong>ℹ️ Recurso em desenvolvimento:</strong> Validador completo será implementado em breve.
                        Atualmente disponível apenas visualização básica.
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
