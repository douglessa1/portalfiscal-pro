import React, { useState } from 'react';
import { ToolLayout, Card, Button, FormInput, FormSelect, ResultCard, CalculationMemory } from '../ToolShared';
import { Calculator, TrendingUp } from 'lucide-react';

export default function IcmsStCalculator({ onBack }: { onBack: () => void }) {
    const [form, setForm] = useState({
        valorProduto: '',
        mva: '',
        aliqInterna: '',
        aliqInterestadual: '12',
        icmsProprio: ''
    });

    const [result, setResult] = useState<any>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setResult(null);
    };

    const calculate = () => {
        const valorProd = parseFloat(form.valorProduto);
        const mvaPercent = parseFloat(form.mva);
        const aliqInt = parseFloat(form.aliqInterna);
        const aliqInter = parseFloat(form.aliqInterestadual);

        if (!valorProd || !mvaPercent || !aliqInt) {
            alert('Preencha todos os campos obrigatórios');
            return;
        }

        // Cálculo ICMS-ST (Base Dupla)
        // 1. Base de Cálculo ST = Valor Produto × (1 + MVA/100)
        const baseST = valorProd * (1 + mvaPercent / 100);

        // 2. ICMS Próprio (se informado) ou calcular
        let icmsProprio = parseFloat(form.icmsProprio) || 0;
        if (!form.icmsProprio) {
            icmsProprio = valorProd * (aliqInter / 100);
        }

        // 3. ICMS ST = (Base ST × Alíq Interna) - ICMS Próprio
        const icmsST = (baseST * aliqInt / 100) - icmsProprio;

        // 4. Valor Total com ST
        const totalComST = valorProd + icmsST;

        setResult({
            valorProduto: valorProd,
            baseST,
            icmsProprio,
            icmsST,
            totalComST,
            mvaAplicada: mvaPercent,
            aliqInternaAplicada: aliqInt,
            hash: `ICMSST-${Date.now().toString(36).toUpperCase()}`
        });
    };

    const fmt = (v: number) => new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(v);

    const fmtPercent = (v: number) => `${v.toFixed(2)}%`;

    return (
        <ToolLayout
            title="Calculadora ICMS-ST"
            description="Cálculo de Substituição Tributária (ICMS-ST) conforme legislação estadual."
            onBack={onBack}
        >
            <div className="grid md:grid-cols-12 gap-8">

                {/* Inputs */}
                <div className="md:col-span-5 space-y-6">
                    <Card title="Dados do Produto">
                        <div className="space-y-4">

                            <FormInput
                                label="Valor do Produto (R$)"
                                name="valorProduto"
                                type="number"
                                placeholder="1000.00"
                                value={form.valorProduto}
                                onChange={handleChange}
                            />

                            <FormInput
                                label="MVA - Margem Valor Agregado (%)"
                                name="mva"
                                type="number"
                                placeholder="40"
                                value={form.mva}
                                onChange={handleChange}
                            />

                            <FormInput
                                label="Alíquota Interna (%)"
                                name="aliqInterna"
                                type="number"
                                placeholder="18"
                                value={form.aliqInterna}
                                onChange={handleChange}
                            />

                            <FormInput
                                label="Alíquota Interestadual (%) - Opcional"
                                name="aliqInterestadual"
                                type="number"
                                placeholder="12"
                                value={form.aliqInterestadual}
                                onChange={handleChange}
                            />

                            <FormInput
                                label="ICMS Próprio (R$) - Opcional"
                                name="icmsProprio"
                                type="number"
                                placeholder="Será calculado automaticamente"
                                value={form.icmsProprio}
                                onChange={handleChange}
                            />

                            <div className="pt-2">
                                <Button onClick={calculate} className="w-full">
                                    <Calculator size={18} /> Calcular ICMS-ST
                                </Button>
                            </div>

                        </div>
                    </Card>

                    <Card title="O que é ICMS-ST?">
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            A <strong>Substituição Tributária</strong> antecipa o recolhimento do ICMS
                            de toda a cadeia comercial, responsabilizando o fabricante ou importador
                            pelo recolhimento do tributo devido nas etapas subsequentes.
                        </p>
                    </Card>
                </div>

                {/* Results */}
                <div className="md:col-span-7 space-y-6">
                    {result ? (
                        <div className="animate-fade-in space-y-6">

                            <div className="grid grid-cols-2 gap-4">
                                <ResultCard
                                    label="Base de Cálculo ST"
                                    value={fmt(result.baseST)}
                                    subtext={`MVA: ${fmtPercent(result.mvaAplicada)}`}
                                    color="blue"
                                />
                                <ResultCard
                                    label="ICMS Próprio"
                                    value={fmt(result.icmsProprio)}
                                    color="purple"
                                />
                            </div>

                            <ResultCard
                                label="ICMS-ST a Recolher"
                                value={fmt(result.icmsST)}
                                subtext={`Alíquota Interna: ${fmtPercent(result.aliqInternaAplicada)}`}
                                highlight
                                color="emerald"
                            />

                            <ResultCard
                                label="Valor Total com ST"
                                value={fmt(result.totalComST)}
                                subtext="Produto + ICMS-ST"
                                color="amber"
                            />

                            <CalculationMemory
                                hash={result.hash}
                                steps={[
                                    {
                                        label: 'Valor do Produto',
                                        formula: 'Base original',
                                        value: fmt(result.valorProduto)
                                    },
                                    {
                                        label: 'Aplicação do MVA',
                                        formula: `${fmt(result.valorProduto)} × (1 + ${fmtPercent(result.mvaAplicada)})`,
                                        value: fmt(result.baseST)
                                    },
                                    {
                                        label: 'ICMS da Operação Própria',
                                        formula: `Calculado ou informado`,
                                        value: fmt(result.icmsProprio)
                                    },
                                    {
                                        label: 'ICMS-ST Devido',
                                        formula: `(${fmt(result.baseST)} × ${fmtPercent(result.aliqInternaAplicada)}) - ${fmt(result.icmsProprio)}`,
                                        value: fmt(result.icmsST)
                                    },
                                    {
                                        label: 'Total com Substituição',
                                        formula: `Produto + ICMS-ST`,
                                        value: fmt(result.totalComST)
                                    },
                                ]}
                            />

                        </div>
                    ) : (
                        <div className="h-full bg-slate-50 dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center text-slate-400 p-10 text-center">
                            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                                <TrendingUp size={32} />
                            </div>
                            <p className="font-medium">Preencha os dados ao lado para calcular o ICMS-ST.</p>
                            <p className="text-xs mt-2 opacity-75">A MVA e alíquotas variam conforme legislação estadual e NCM do produto.</p>
                        </div>
                    )}
                </div>

            </div>
        </ToolLayout>
    );
}
