import React from 'react';
import { ToolLayout, Card } from '../ToolShared';
import { MapPin } from 'lucide-react';

// Alíquotas ICMS por Estado (2024)
const ESTADOS = [
    { uf: 'AC', nome: 'Acre', interna: 19, interestadual: 12, fcp: 2 },
    { uf: 'AL', nome: 'Alagoas', interna: 19, interestadual: 12, fcp: 2 },
    { uf: 'AP', nome: 'Amapá', interna: 18, interestadual: 12, fcp: 2 },
    { uf: 'AM', nome: 'Amazonas', interna: 20, interestadual: 12, fcp: 2 },
    { uf: 'BA', nome: 'Bahia', interna: 20.5, interestadual: 12, fcp: 2 },
    { uf: 'CE', nome: 'Ceará', interna: 20, interestadual: 12, fcp: 2 },
    { uf: 'DF', nome: 'Distrito Federal', interna: 20, interestadual: 12, fcp: 0 },
    { uf: 'ES', nome: 'Espírito Santo', interna: 17, interestadual: 12, fcp: 2 },
    { uf: 'GO', nome: 'Goiás', interna: 19, interestadual: 12, fcp: 2 },
    { uf: 'MA', nome: 'Maranhão', interna: 22, interestadual: 12, fcp: 2 },
    { uf: 'MT', nome: 'Mato Grosso', interna: 17, interestadual: 12, fcp: 2 },
    { uf: 'MS', nome: 'Mato Grosso do Sul', interna: 17, interestadual: 12, fcp: 2 },
    { uf: 'MG', nome: 'Minas Gerais', interna: 18, interestadual: 12, fcp: 2 },
    { uf: 'PA', nome: 'Pará', interna: 19, interestadual: 12, fcp: 2 },
    { uf: 'PB', nome: 'Paraíba', interna: 20, interestadual: 12, fcp: 2 },
    { uf: 'PR', nome: 'Paraná', interna: 19, interestadual: 12, fcp: 2 },
    { uf: 'PE', nome: 'Pernambuco', interna: 20.5, interestadual: 12, fcp: 2 },
    { uf: 'PI', nome: 'Piauí', interna: 21, interestadual: 12, fcp: 2 },
    { uf: 'RJ', nome: 'Rio de Janeiro', interna: 20, interestadual: 12, fcp: 2 },
    { uf: 'RN', nome: 'Rio Grande do Norte', interna: 20, interestadual: 12, fcp: 2 },
    { uf: 'RS', nome: 'Rio Grande do Sul', interna: 17, interestadual: 12, fcp: 2 },
    { uf: 'RO', nome: 'Rondônia', interna: 19.5, interestadual: 12, fcp: 0 },
    { uf: 'RR', nome: 'Roraima', interna: 20, interestadual: 12, fcp: 0 },
    { uf: 'SC', nome: 'Santa Catarina', interna: 17, interestadual: 12, fcp: 2 },
    { uf: 'SP', nome: 'São Paulo', interna: 18, interestadual: 12, fcp: 2 },
    { uf: 'SE', nome: 'Sergipe', interna: 19, interestadual: 12, fcp: 2 },
    { uf: 'TO', nome: 'Tocantins', interna: 20, interestadual: 12, fcp: 2 },
];

export default function AliquotasEstado({ onBack }: { onBack: () => void }) {
    return (
        <ToolLayout
            title="Alíquotas por Estado"
            description="Consulte as alíquotas de ICMS internas e interestaduais de todos os estados"
            onBack={onBack}
        >
            <div className="space-y-6">

                <Card title="Alíquotas ICMS 2024">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-slate-100 dark:bg-slate-800">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">UF</th>
                                    <th className="px-4 py-3 text-left text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">Estado</th>
                                    <th className="px-4 py-3 text-center text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">Interna</th>
                                    <th className="px-4 py-3 text-center text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">Interestadual</th>
                                    <th className="px-4 py-3 text-center text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">FCP</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                {ESTADOS.map((estado) => (
                                    <tr key={estado.uf} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <td className="px-4 py-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                                            {estado.uf}
                                        </td>
                                        <td className="px-4 py-3 text-slate-900 dark:text-white font-medium">
                                            {estado.nome}
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg font-bold">
                                                {estado.interna}%
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg font-bold">
                                                {estado.interestadual}%
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            {estado.fcp > 0 ? (
                                                <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-lg font-bold">
                                                    {estado.fcp}%
                                                </span>
                                            ) : (
                                                <span className="text-slate-400">-</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>

                <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                        <div className="text-xs text-blue700 dark:text-blue-300 font-bold mb-2">📊 Alíquota Interna</div>
                        <div className="text-sm text-blue-800 dark:text-blue-200">
                            Aplicada em operações dentro do mesmo estado. Varia de 17% a 22%.
                        </div>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-4">
                        <div className="text-xs text-purple-700 dark:text-purple-300 font-bold mb-2">🔄 Alíquota Interestadual</div>
                        <div className="text-sm text-purple-800 dark:text-purple-200">
                            Operações entre estados: 12% (padrão) ou 7% (Sul/Sudeste → N/NE/CO exceto ES).
                        </div>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
                        <div className="text-xs text-amber-700 dark:text-amber-300 font-bold mb-2">💰 FCP</div>
                        <div className="text-sm text-amber-800 dark:text-amber-200">
                            Fundo de Combate à Pobreza. Adicional de até 2% conforme legislação estadual.
                        </div>
                    </div>
                </div>

            </div>
        </ToolLayout>
    );
}
