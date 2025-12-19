import React from 'react';
import { ToolLayout, Card } from '../ToolShared';
import { Table } from 'lucide-react';

const ANEXOS_DATA = {
    I: {
        nome: 'Comércio', faixas: [
            { ate: 180000, aliq: 4.00, deducao: 0 },
            { ate: 360000, aliq: 7.30, deducao: 5940 },
            { ate: 720000, aliq: 9.50, deducao: 13860 },
            { ate: 1800000, aliq: 10.70, deducao: 22500 },
            { ate: 3600000, aliq: 14.30, deducao: 87300 },
            { ate: 4800000, aliq: 19.00, deducao: 378000 },
        ]
    },
    II: {
        nome: 'Indústria', faixas: [
            { ate: 180000, aliq: 4.50, deducao: 0 },
            { ate: 360000, aliq: 7.80, deducao: 5940 },
            { ate: 720000, aliq: 10.00, deducao: 13860 },
            { ate: 1800000, aliq: 11.20, deducao: 22500 },
            { ate: 3600000, aliq: 14.70, deducao: 85500 },
            { ate: 4800000, aliq: 30.00, deducao: 720000 },
        ]
    },
    III: {
        nome: 'Serviços', faixas: [
            { ate: 180000, aliq: 6.00, deducao: 0 },
            { ate: 360000, aliq: 11.20, deducao: 9360 },
            { ate: 720000, aliq: 13.50, deducao: 17640 },
            { ate: 1800000, aliq: 16.00, deducao: 35640 },
            { ate: 3600000, aliq: 21.00, deducao: 125640 },
            { ate: 4800000, aliq: 33.00, deducao: 648000 },
        ]
    },
};

export default function TabelasSimplesNacional({ onBack }: { onBack: () => void }) {
    return (
        <ToolLayout
            title="Tabelas Simples Nacional"
            description="Consulte alíquotas e faixas de todos os anexos do Simples Nacional"
            onBack={onBack}
        >
            <div className="space-y-6">
                {Object.entries(ANEXOS_DATA).map(([anexo, data]) => (
                    <Card key={anexo} title={`Anexo ${anexo} - ${data.nome}`}>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-slate-100 dark:bg-slate-800">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-bold text-slate-700 dark:text-slate-300">Receita Bruta em 12 Meses (R$)</th>
                                        <th className="px-4 py-3 text-center text-xs font-bold text-slate-700 dark:text-slate-300">Alíquota</th>
                                        <th className="px-4 py-3 text-right text-xs font-bold text-slate-700 dark:text-slate-300">Valor a Deduzir</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                    {data.faixas.map((faixa, idx) => {
                                        const deFormatado = faixa.ate === 180000 ? '180.000' :
                                            faixa.ate === 360000 ? '360.000' :
                                                faixa.ate === 720000 ? '720.000' :
                                                    faixa.ate === 1800000 ? '1.800.000' :
                                                        faixa.ate === 3600000 ? '3.600.000' :
                                                            '4.800.000';

                                        return (
                                            <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                                <td className="px-4 py-3 text-slate-900 dark:text-white">
                                                    Até R$ {deFormatado}
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-lg font-bold">
                                                        {faixa.aliq.toFixed(2)}%
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-right font-mono text-slate-600 dark:text-slate-400">
                                                    R$ {faixa.deducao.toLocaleString('pt-BR')}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                ))}

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                    <Table className="inline mb-1 mr-2 text-blue-600 dark:text-blue-400" size={20} />
                    <strong className="text-blue-800 dark:text-blue-200">Fórmula do Cálculo:</strong>
                    <div className="text-sm text-blue-700 dark:text-blue-300 mt-2 font-mono">
                        Alíquota Efetiva = [(RBT12 × Aliq%) - Dedução] ÷ RBT12
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
