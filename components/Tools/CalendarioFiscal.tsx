import React from 'react';
import { ToolLayout, Card } from '../ToolShared';
import { Calendar, Bell } from 'lucide-react';

const OBRIGACOES = [
    { dia: 7, nome: 'DCTF', descricao: 'Declaração de Débitos e Créditos Tributários Federais' },
    { dia: 15, nome: 'GFIP', descricao: 'Guia de Recolhimento do FGTS e Informações à Previdência Social' },
    { dia: 20, nome: 'DAS', descricao: 'Documento de Arrecadação do Simples Nacional' },
    { dia: 20, nome: 'DARF', descricao: 'Vencimento geral de tributos federais' },
    { dia: 25, nome: 'EFD ICMS/IPI', descricao: 'Escrituração Fiscal Digital' },
    { dia: 25, nome: 'EFD Contribuições', descricao: 'PIS/COFINS Digital' },
    { dia: 31, nome: 'DIRF', descricao: 'Declaração do Imposto sobre a Renda Retido na Fonte (Anual)' },
];

export default function CalendarioFiscal({ onBack }: { onBack: () => void }) {
    const hoje = new Date().getDate();

    return (
        <ToolLayout
            title="Calendário Fiscal"
            description="Acompanhe os prazos das principais obrigações fiscais"
            onBack={onBack}
        >
            <div className="space-y-6">
                <Card title="Obrigações Mensais">
                    <div className="space-y-3">
                        {OBRIGACOES.map((obr, idx) => {
                            const vencido = hoje > obr.dia;
                            const proximoVencer = hoje >= obr.dia - 3 && hoje <= obr.dia;

                            return (
                                <div
                                    key={idx}
                                    className={`p-4 rounded-xl border-2 ${vencido ? 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700' :
                                            proximoVencer ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-300 dark:border-amber-700' :
                                                'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                                        }`}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-3">
                                            <div className={`text-2xl font-extrabold ${vencido ? 'text-red-600 dark:text-red-400' :
                                                    proximoVencer ? 'text-amber-600 dark:text-amber-400' :
                                                        'text-emerald-600 dark:text-emerald-400'
                                                }`}>
                                                {obr.dia}
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-900 dark:text-white">{obr.nome}</div>
                                                <div className="text-sm text-slate-600 dark:text-slate-400">{obr.descricao}</div>
                                            </div>
                                        </div>
                                        {proximoVencer && (
                                            <Bell size={20} className="text-amber-500 animate-pulse" />
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Card>

                <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4 text-center">
                        <Calendar className="mx-auto mb-2 text-emerald-600 dark:text-emerald-400" size={32} />
                        <div className="text-2xl font-extrabold text-emerald-900 dark:text-emerald-100">
                            {OBRIGACOES.filter(o => hoje < o.dia).length}
                        </div>
                        <div className="text-xs text-emerald-700 dark:text-emerald-300 mt-1">Pendentes este mês</div>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 text-center">
                        <Bell className="mx-auto mb-2 text-amber-600 dark:text-amber-400" size={32} />
                        <div className="text-2xl font-extrabold text-amber-900 dark:text-amber-100">
                            {OBRIGACOES.filter(o => hoje >= o.dia - 3 && hoje <= o.dia).length}
                        </div>
                        <div className="text-xs text-amber-700 dark:text-amber-300 mt-1">Próximas ao vencimento</div>
                    </div>
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 text-center">
                        <div className="text-2xl mb-2">⚠️</div>
                        <div className="text-2xl font-extrabold text-red-900 dark:text-red-100">
                            {OBRIGACOES.filter(o => hoje > o.dia).length}
                        </div>
                        <div className="text-xs text-red-700 dark:text-red-300 mt-1">Vencidas</div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
