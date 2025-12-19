import React from 'react';
import { ToolLayout, Card } from '../ToolShared';
import { AlertCircle, Bell } from 'lucide-react';

const ALERTAS = [
    { tipo: 'vencimento', titulo: 'DAS Simples Nacional', mensagem: 'Vence em 3 dias (20/12)', urgencia: 'alta' },
    { tipo: 'limite', titulo: 'Limite MEI', mensagem: 'Você atingiu 75% do limite anual', urgencia: 'media' },
    { tipo: 'mudanca', titulo: 'Nova Legislação', mensagem: 'Atualização na tabela CEST - Convênio 142/2024', urgencia: 'baixa' },
    { tipo: 'oportunidade', titulo: 'Crédito PIS/COFINS', mensagem: 'Você pode ter créditos não aproveitados', urgencia: 'media' },
];

export default function AlertasFiscais({ onBack }: { onBack: () => void }) {
    return (
        <ToolLayout
            title="Alertas Fiscais"
            description="Notificações inteligentes sobre prazos, mudanças e oportunidades fiscais"
            onBack={onBack}
        >
            <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 text-center">
                        <div className="text-3xl font-extrabold text-red-600 dark:text-red-400">
                            {ALERTAS.filter(a => a.urgencia === 'alta').length}
                        </div>
                        <div className="text-xs text-red-700 dark:text-red-300 mt-1">Urgente</div>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 text-center">
                        <div className="text-3xl font-extrabold text-amber-600 dark:text-amber-400">
                            {ALERTAS.filter(a => a.urgencia === 'media').length}
                        </div>
                        <div className="text-xs text-amber-700 dark:text-amber-300 mt-1">Atenção</div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 text-center">
                        <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">
                            {ALERTAS.filter(a => a.urgencia === 'baixa').length}
                        </div>
                        <div className="text-xs text-blue-700 dark:text-blue-300 mt-1">Informativo</div>
                    </div>
                </div>

                <Card title="Alertas Ativos">
                    <div className="space-y-3">
                        {ALERTAS.map((alerta, idx) => (
                            <div
                                key={idx}
                                className={`p-4 rounded-xl border-2 ${alerta.urgencia === 'alta' ? 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700' :
                                        alerta.urgencia === 'media' ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-300 dark:border-amber-700' :
                                            'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700'
                                    }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-3">
                                        <AlertCircle className={`mt-1 ${alerta.urgencia === 'alta' ? 'text-red-600' :
                                                alerta.urgencia === 'media' ? 'text-amber-600' :
                                                    'text-blue-600'
                                            }`} size={20} />
                                        <div>
                                            <div className="font-bold text-slate-900 dark:text-white mb-1">
                                                {alerta.titulo}
                                            </div>
                                            <div className="text-sm text-slate-700 dark:text-slate-300">
                                                {alerta.mensagem}
                                            </div>
                                        </div>
                                    </div>
                                    {alerta.urgencia === 'alta' && (
                                        <Bell size={20} className="text-red-500 animate-pulse" />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-4">
                    <strong className="text-purple-800 dark:text-purple-200">🔔 Notificações Inteligentes</strong>
                    <ul className="text-sm text-purple-700 dark:text-purple-300 mt-2 ml-6 list-disc">
                        <li>Alertas de vencimento com antecedência configurável</li>
                        <li>Monitoramento de limites (MEI, Simples, etc)</li>
                        <li>Avisos sobre mudanças legislativas</li>
                        <li>Oportunidades de economia fiscal</li>
                    </ul>
                </div>
            </div>
        </ToolLayout>
    );
}
