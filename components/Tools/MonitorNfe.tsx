import React from 'react';
import { ToolLayout, Card } from '../ToolShared';
import { Activity, CheckCircle } from 'lucide-react';

const NFE_MOCK = [
    { numero: '000123', serie: '1', data: '18/12/2024', status: 'Autorizada', chave: '35241212345678000190550010001230001234567890' },
    { numero: '000122', serie: '1', data: '18/12/2024', status: 'Autorizada', chave: '35241212345678000190550010001220001234567890' },
    { numero: '000121', serie: '1', data: '17/12/2024', status: 'Cancelada', chave: '35241212345678000190550010001210001234567890' },
];

export default function MonitorNfe({ onBack }: { onBack: () => void }) {
    return (
        <ToolLayout
            title="Monitor NFe"
            description="Monitore o status de emissão e autorização das suas Notas Fiscais Eletrônicas"
            onBack={onBack}
        >
            <div className="space-y-6">
                <div className="grid md:grid-cols-4 gap-4">
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4 text-center">
                        <Activity className="mx-auto mb-2 text-emerald-600 dark:text-emerald-400" size={28} />
                        <div className="text-2xl font-extrabold text-emerald-900 dark:text-emerald-100">156</div>
                        <div className="text-xs text-emerald-700 dark:text-emerald-300 mt-1">Total Mês</div>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 text-center">
                        <CheckCircle className="mx-auto mb-2 text-green-600 dark:text-green-400" size={28} />
                        <div className="text-2xl font-extrabold text-green-900 dark:text-green-100">154</div>
                        <div className="text-xs text-green-700 dark:text-green-300 mt-1">Autorizadas</div>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 text-center">
                        <div className="text-2xl mb-2">⏳</div>
                        <div className="text-2xl font-extrabold text-amber-900 dark:text-amber-100">0</div>
                        <div className="text-xs text-amber-700 dark:text-amber-300 mt-1">Pendentes</div>
                    </div>
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 text-center">
                        <div className="text-2xl mb-2">❌</div>
                        <div className="text-2xl font-extrabold text-red-900 dark:text-red-100">2</div>
                        <div className="text-xs text-red-700 dark:text-red-300 mt-1">Canceladas</div>
                    </div>
                </div>

                <Card title="Últimas NFe Emitidas">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-slate-100 dark:bg-slate-800">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-bold text-slate-700 dark:text-slate-300">Número</th>
                                    <th className="px-4 py-3 text-left text-xs font-bold text-slate-700 dark:text-slate-300">Série</th>
                                    <th className="px-4 py-3 text-left text-xs font-bold text-slate-700 dark:text-slate-300">Data</th>
                                    <th className="px-4 py-3 text-left text-xs font-bold text-slate-700 dark:text-slate-300">Status</th>
                                    <th className="px-4 py-3 text-left text-xs font-bold text-slate-700 dark:text-slate-300">Chave de Acesso</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                {NFE_MOCK.map((nfe, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                        <td className="px-4 py-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">{nfe.numero}</td>
                                        <td className="px-4 py-3">{nfe.serie}</td>
                                        <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{nfe.data}</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 text-xs font-bold rounded ${nfe.status === 'Autorizada' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                                                    'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                                                }`}>
                                                {nfe.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 font-mono text-xs text-slate-500 dark:text-slate-400">{nfe.chave}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 text-sm text-blue-800 dark:text-blue-200">
                    <strong>ℹ️ Dados de demonstração:</strong> Monitor NFe completo requer integração com sistema ERP ou API SEFAZ.
                </div>
            </div>
        </ToolLayout>
    );
}
