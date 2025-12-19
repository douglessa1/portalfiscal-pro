import React from 'react';
import { ToolLayout, Card } from '../ToolShared';
import { Split } from 'lucide-react';

export default function SplitPaymentCalculator({ onBack }: { onBack: () => void }) {
    return (
        <ToolLayout
            title="Split Payment"
            description="Simulador de pagamento segregado para IBS/CBS na Reforma Tributária"
            onBack={onBack}
        >
            <div className="space-y-6">
                <Card title="O que é Split Payment?">
                    <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
                        <p>
                            O <strong>Split Payment</strong> (Pagamento Segregado) é um mecanismo da Reforma Tributária
                            onde os tributos IBS e CBS são separados automaticamente no momento do pagamento.
                        </p>
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                            <div className="font-bold text-blue-900 dark:text-blue-100 mb-2">Como Funciona:</div>
                            <ol className="list-decimal ml-5 space-y-1 text-blue-800 dark:text-blue-200">
                                <li>Comprador realiza pagamento de R$ 100</li>
                                <li>Sistema separa automaticamente: R$ 85 para vendedor + R$ 15 para governo (exemplo)</li>
                                <li>Tributos já ficam retidos na origem</li>
                                <li>Reduz sonegação e simplifica fiscalização</li>
                            </ol>
                        </div>
                    </div>
                </Card>

                <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4 text-center">
                        <Split className="mx-auto mb-2 text-emerald-600 dark:text-emerald-400" size={32} />
                        <div className="text-xs font-bold text-emerald-700 dark:text-emerald-300 mb-1">Automático</div>
                        <div className="text-sm text-emerald-800 dark:text-emerald-200">
                            Separação no Pagamento
                        </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 text-center">
                        <div className="text-2xl mb-2">🔒</div>
                        <div className="text-xs font-bold text-blue700 dark:text-blue-300 mb-1">Seguro</div>
                        <div className="text-sm text-blue-800 dark:text-blue-200">
                            Reduz Sonegação
                        </div>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-4 text-center">
                        <div className="text-2xl mb-2">⚡</div>
                        <div className="text-xs font-bold text-purple-700 dark:text-purple-300 mb-1">Eficiente</div>
                        <div className="text-sm text-purple-800 dark:text-purple-200">
                            Fiscalização Simplificada
                        </div>
                    </div>
                </div>

                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
                    <strong className="text-amber-800 dark:text-amber-200">⚠️ Previsão:</strong>
                    <p className="text-sm text-amber-700 dark:text-amber-300 mt-2">
                        O Split Payment entra em vigor gradualmente a partir de 2026 junto com IBS/CBS.
                        Calculadora completa será implementada com regulamentação definitiva.
                    </p>
                </div>
            </div>
        </ToolLayout>
    );
}
