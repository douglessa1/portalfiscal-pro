import React, { useState } from 'react';
import { ToolLayout, Card, Button, FormInput, ResultCard, CalculationMemory } from '../ToolShared';
import { Calculator, Percent } from 'lucide-react';

export default function MvaAjustadaCalculator({ onBack }: { onBack: () => void }) {
    const [form, setForm] = useState({
        mvaOriginal: '',
        aliqInterestadual: '12',
        aliqInterna: '18'
    });

    const [result, setResult] = useState<any>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setResult(null);
    };

    const calculate = () => {
        const mvaOriginal = parseFloat(form.mvaOriginal);
        const aliqInter = parseFloat(form.aliqInterestadual);
        const aliqIntra = parseFloat(form.aliqInterna);

        if (isNaN(mvaOriginal) || isNaN(aliqInter) || isNaN(aliqIntra)) {
            alert('Preencha todos os campos obrigatórios');
            return;
        }

        if (aliqIntra >= 100) {
            alert('Alíquota Interna não pode ser 100% ou maior');
            return;
        }

        // Fórmula MVA Ajustada
        // MVA_aj = [(1 + MVA_orig) × (1 - ALIQ_inter) / (1 - ALIQ_intra)] - 1
        const fator1 = 1 + (mvaOriginal / 100);
        const fator2 = 1 - (aliqInter / 100);
        const fator3 = 1 - (aliqIntra / 100);

        const mvaAjustada = ((fator1 * fator2) / fator3) - 1;
        const mvaAjustadaPercentual = mvaAjustada * 100;

        // Comparativo de impacto
        const valorExemplo = 1000; // Valor exemplo para demonstração
        const baseMVAOriginal = valorExemplo * (1 + mvaOriginal / 100);
        const baseMVAAjustada = valorExemplo * (1 + mvaAjustadaPercentual / 100);
        const diferenca = baseMVAAjustada - baseMVAOriginal;
        const diferencaPerc = ((diferenca / baseMVAOriginal) * 100);

        setResult({
            mvaOriginal,
            mvaAjustada: mvaAjustadaPercentual,
            aliqInter,
            aliqIntra,
            fator1,
            fator2,
            fator3,
            // Comparativo
            baseMVAOriginal,
            baseMVAAjustada,
            diferenca,
            diferencaPerc,
            hash: `MVA-${Date.now().toString(36).toUpperCase()}`
        });
    };

    const fmt = (v: number) => new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(v);

    const fmtPercent = (v: number) => `${v.toFixed(4)}%`;

    return (
        <ToolLayout
            title="Calculadora MVA Ajustada"
            description="Ajuste da Margem de Valor Agregado para operações interestaduais com Substituição Tributária."
            onBack={onBack}
        >
            <div className="grid md:grid-cols-12 gap-8">

                {/* Inputs */}
                <div className="md:col-span-5 space-y-6">
                    <Card title="Dados para Ajuste">
                        <div className="space-y-4">

                            <FormInput
                                label="MVA Original (%)"
                                name="mvaOriginal"
                                type="number"
                                placeholder="40.00"
                                value={form.mvaOriginal}
                                onChange={handleChange}
                            />

                            <FormInput
                                label="Alíquota Interestadual (%)"
                                name="aliqInterestadual"
                                type="number"
                                placeholder="12"
                                value={form.aliqInterestadual}
                                onChange={handleChange}
                            />

                            <FormInput
                                label="Alíquota Interna do Destino (%)"
                                name="aliqInterna"
                                type="number"
                                placeholder="18"
                                value={form.aliqInterna}
                                onChange={handleChange}
                            />

                            <div className="pt-2">
                                <Button onClick={calculate} className="w-full">
                                    <Calculator size={18} /> Calcular MVA Ajustada
                                </Button>
                            </div>

                        </div>
                    </Card>

                    <Card title="Quando usar?">
                        <div className="text-sm text-slate-600 dark:text-slate-400 space-y-2 leading-relaxed">
                            <p>
                                A <strong>MVA Ajustada</strong> é necessária em operações <strong>interestaduais</strong>
                                sujeitas à Substituição Tributária.
                            </p>
                            <p>
                                O ajuste compensa a diferença entre a alíquota interestadual (menor) e a
                                alíquota interna do estado de destino, garantindo que o ICMS-ST seja
                                calculado corretamente.
                            </p>
                        </div>
                    </Card>
                </div>

                {/* Results */}
                <div className="md:col-span-7 space-y-6">
                    {result ? (
                        <div className="animate-fade-in space-y-6">

                            <div className="grid grid-cols-2 gap-4">
                                <ResultCard
                                    label="MVA Original"
                                    value={fmtPercent(result.mvaOriginal)}
                                    subtext="Utilizada em operações internas"
                                    color="blue"
                                />
                                <ResultCard
                                    label="MVA Ajustada"
                                    value={fmtPercent(result.mvaAjustada)}
                                    subtext="Para operações interestaduais"
                                    highlight
                                    color="emerald"
                                />
                            </div>

                            {/* Comparativo de Impacto */}
                            <Card title="Impacto do Ajuste (Base R$ 1.000,00)">
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-600 dark:text-slate-400">Base com MVA Original:</span>
                                        <span className="font-bold text-slate-900 dark:text-white">{fmt(result.baseMVAOriginal)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-600 dark:text-slate-400">Base com MVA Ajustada:</span>
                                        <span className="font-bold text-slate-900 dark:text-white">{fmt(result.baseMVAAjustada)}</span>
                                    </div>
                                    <div className="h-px bg-slate-200 dark:bg-slate-700"></div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium text-slate-700 dark:text-slate-300">Diferença:</span>
                                        <div className="text-right">
                                            <span className={`font-bold text-lg ${result.diferenca > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                                                {fmt(Math.abs(result.diferenca))}
                                            </span>
                                            <span className="block text-xs text-slate-500 dark:text-slate-400">
                                                {result.diferenca > 0 ? '↑' : '↓'} {fmtPercent(Math.abs(result.diferencaPerc))}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            <CalculationMemory
                                hash={result.hash}
                                steps={[
                                    {
                                        label: 'Fator 1',
                                        formula: `1 + (${fmtPercent(result.mvaOriginal)} / 100)`,
                                        value: result.fator1.toFixed(6)
                                    },
                                    {
                                        label: 'Fator 2',
                                        formula: `1 - (${fmtPercent(result.aliqInter)} / 100)`,
                                        value: result.fator2.toFixed(6)
                                    },
                                    {
                                        label: 'Fator 3',
                                        formula: `1 - (${fmtPercent(result.aliqIntra)} / 100)`,
                                        value: result.fator3.toFixed(6)
                                    },
                                    {
                                        label: 'MVA Ajustada',
                                        formula: `[(${result.fator1.toFixed(4)} × ${result.fator2.toFixed(4)}) / ${result.fator3.toFixed(4)}] - 1`,
                                        value: fmtPercent(result.mvaAjustada)
                                    },
                                ]}
                            />

                            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900 rounded-xl p-4 text-sm">
                                <div className="flex items-start gap-3">
                                    <Percent className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" size={18} />
                                    <div className="text-blue-800 dark:text-blue-200">
                                        <strong className="block mb-1">Base Legal:</strong>
                                        <p className="text-xs leading-relaxed">
                                            Conforme <strong>Convênio ICMS 52/2017</strong>, em operações interestaduais
                                            deve-se aplicar a MVA Ajustada para compensar a diferença de alíquotas.
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ) : (
                        <div className="h-full bg-slate-50 dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center text-slate-400 p-10 text-center">
                            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                                <Percent size={32} />
                            </div>
                            <p className="font-medium">Informe os dados ao lado para calcular a MVA Ajustada.</p>
                            <p className="text-xs mt-2 opacity-75">Utilize a MVA Original prevista na legislação estadual.</p>
                        </div>
                    )}
                </div>

            </div>
        </ToolLayout>
    );
}
