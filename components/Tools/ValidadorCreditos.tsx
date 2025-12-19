import React from 'react';
import { ToolLayout, Card } from '../ToolShared';
import { CheckCircle } from 'lucide-react';

export default function ValidadorCreditos({ onBack }: { onBack: () => void }) {
    const INSUMOS_CREDITO = [
        { nome: 'Matérias-primas', credito: 'Sim', observacao: 'Utilizadas na fabricação' },
        { nome: 'Energia elétrica', credito: 'Sim', observacao: 'Consumida no processo produtivo' },
        { nome: 'Frete sobre insumos', credito: 'Sim', observacao: 'Relacionado à produção' },
        { nome: 'Materiais de limpeza', credito: 'Não', observacao: 'Não relacionado diretamente à produção' },
        { nome: 'Combustíveis', credito: 'Depende', observacao: 'Somente se usado na produção' },
    ];

    return (
        <ToolLayout
            title="Validador de Créditos PIS/COFINS"
            description="Verifique se você pode aproveitar créditos de PIS/COFINS no regime não-cumulativo"
            onBack={onBack}
        >
            <div className="space-y-6">
                <Card title="Insumos Comuns - Direito a Crédito">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-slate-100 dark:bg-slate-800">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-bold text-slate-700 dark:text-slate-300">Insumo</th>
                                    <th className="px-4 py-3 text-center text-xs font-bold text-slate-700 dark:text-slate-300">Crédito</th>
                                    <th className="px-4 py-3 text-left text-xs font-bold text-slate-700 dark:text-slate-300">Observação</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                {INSUMOS_CREDITO.map((item, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                        <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{item.nome}</td>
                                        <td className="px-4 py-3 text-center">
                                            {item.credito === 'Sim' ? (
                                                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg font-bold text-xs">
                                                    ✓ Sim
                                                </span>
                                            ) : item.credito === 'Não' ? (
                                                <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg font-bold text-xs">
                                                    ✗ Não
                                                </span>
                                            ) : (
                                                <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-lg font-bold text-xs">
                                                    ⚠ Depende
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-slate-600 dark:text-slate-400 text-xs">{item.observacao}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
                        <CheckCircle className="mb-2 text-green-600 dark:text-green-400" size={24} />
                        <div className="text-xs font-bold text-green-700 dark:text-green-300 mb-2">✅ Conceito de Insumo</div>
                        <div className="text-sm text-green-800 dark:text-green-200">
                            Segundo o STJ e Receita Federal, insumo é aquilo <strong>essencial e relevante</strong> para o processo produtivo ou prestação de serviço, ainda que não se integre ao produto final.
                        </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                        <div className="text-xs font-bold text-blue-700 dark:text-blue-300 mb-2">📚 Legislação</div>
                        <div className="text-sm text-blue-800 dark:text-blue-200">
                            Lei 10.833/2003 (Art. 3º), IN RFB 1.911/2019 e jurisprudência do STJ (RE 1.221.170).
                        </div>
                    </div>
                </div>

                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
                    <strong className="text-amber-800 dark:text-amber-200">⚠️ Atenção:</strong>
                    <p className="text-sm text-amber-700 dark:text-amber-300 mt-2">
                        A classificação de créditos depende da análise específica de cada caso. Consulte sempre um contador ou advogado tributarista para sua situação.
                    </p>
                </div>
            </div>
        </ToolLayout>
    );
}
