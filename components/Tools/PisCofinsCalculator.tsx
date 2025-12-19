import React, { useState } from 'react';
import { ToolLayout, Card, Button, FormInput, FormSelect, ResultCard, CalculationMemory } from '../ToolShared';
import { Calculator } from 'lucide-react';

export default function PisCofinsCalculator({ onBack }: { onBack: () => void }) {
    const [form, setForm] = useState({
        regime: 'cumulativo',
        valorOperacao: '',
        creditoPIS: '',
        creditoCOFINS: ''
    });
    const [result, setResult] = useState<any>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setResult(null);
    };

    const calculate = () => {
        const valor = parseFloat(form.valorOperacao);
        const credPIS = parseFloat(form.creditoPIS) || 0;
        const credCOFINS = parseFloat(form.creditoCOFINS) || 0;

        if (!valor) {
            alert('Preencha o valor da operação');
            return;
        }

        let aliqPIS = 0, aliqCOFINS = 0;

        if (form.regime === 'cumulativo') {
            aliqPIS = 0.65;
            aliqCOFINS = 3.00;
        } else {
            aliqPIS = 1.65;
            aliqCOFINS = 7.60;
        }

        const pisBruto = valor * (aliqPIS / 100);
        const cofinsBruto = valor * (aliqCOFINS / 100);
        const pisLiquido = pisBruto - credPIS;
        const cofinsLiquido = cofinsBruto - credCOFINS;
        const total = pisLiquido + cofinsLiquido;

        setResult({
            valor,
            regime: form.regime,
            aliqPIS,
            aliqCOFINS,
            pisBruto,
            cofinsBruto,
            creditoPIS: credPIS,
            creditoCOFINS: credCOFINS,
            pisLiquido,
            cofinsLiquido,
            total,
            hash: `PIS-COFINS-${Date.now().toString(36).toUpperCase()}`
        });
    };

    const fmt = (v: number) => new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(v);

    return (
        <ToolLayout
            title="PIS/COFINS"
            description="Calcule PIS e COFINS cumulativo e não-cumulativo"
            onBack={onBack}
        >
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <Card title="Dados da Operação">
                        <div className="space-y-4">
                            <FormSelect
                                label="Regime de Tributação"
                                name="regime"
                                value={form.regime}
                                onChange={handleChange}
                            >
                                <option value="cumulativo">Cumulativo (0,65% + 3%)</option>
                                <option value="nao-cumulativo">Não-Cumulativo (1,65% + 7,6%)</option>
                            </FormSelect>

                            <FormInput
                                label="Valor da Operação (R$)"
                                name="valorOperacao"
                                type="number"
                                placeholder="10000.00"
                                value={form.valorOperacao}
                                onChange={handleChange}
                            />

                            {form.regime === 'nao-cumulativo' && (
                                <>
                                    <FormInput
                                        label="Crédito PIS (R$)"
                                        name="creditoPIS"
                                        type="number"
                                        placeholder="0.00"
                                        value={form.creditoPIS}
                                        onChange={handleChange}
                                    />
                                    <FormInput
                                        label="Crédito COFINS (R$)"
                                        name="creditoCOFINS"
                                        type="number"
                                        placeholder="0.00"
                                        value={form.creditoCOFINS}
                                        onChange={handleChange}
                                    />
                                </>
                            )}

                            <Button onClick={calculate} className="w-full">
                                <Calculator size={18} /> Calcular
                            </Button>
                        </div>
                    </Card>
                </div>

                <div className="space-y-6">
                    {result ? (
                        <div className="animate-fade-in space-y-6">
                            <Card title="Regime: {result.regime === 'cumulativo' ? 'Cumulativo' : 'Não-Cumulativo'}">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
                                        <div className="text-xs text-blue-700 dark:text-blue-300 font-bold mb-1">PIS ({result.aliqPIS}%)</div>
                                        <div className="text-xl font-extrabold text-blue-900 dark:text-blue-100">{fmt(result.pisBruto)}</div>
                                        {result.creditoPIS > 0 && (
                                            <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                                                - Crédito: {fmt(result.creditoPIS)}
                                            </div>
                                        )}
                                    </div>
                                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl">
                                        <div className="text-xs text-purple-700 dark:text-purple-300 font-bold mb-1">COFINS ({result.aliqCOFINS}%)</div>
                                        <div className="text-xl font-extrabold text-purple-900 dark:text-purple-100">{fmt(result.cofinsBruto)}</div>
                                        {result.creditoCOFINS > 0 && (
                                            <div className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                                                - Crédito: {fmt(result.creditoCOFINS)}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Card>

                            <ResultCard label="Total a Recolher (PIS + COFINS)" value={fmt(result.total)} color="emerald" highlight />

                            <CalculationMemory
                                hash={result.hash}
                                steps={[
                                    { label: 'Valor Operação', formula: 'Base cálculo', value: fmt(result.valor) },
                                    { label: 'PIS Bruto', formula: `${result.valor.toFixed(2)} × ${result.aliqPIS}%`, value: fmt(result.pisBruto) },
                                    { label: 'COFINS Bruto', formula: `${result.valor.toFixed(2)} × ${result.aliqCOFINS}%`, value: fmt(result.cofinsBruto) },
                                    ...(result.creditoPIS > 0 ? [{ label: 'PIS Líquido', formula: `Bruto - Crédito`, value: fmt(result.pisLiquido) }] : []),
                                    ...(result.creditoCOFINS > 0 ? [{ label: 'COFINS Líquido', formula: `Bruto - Crédito`, value: fmt(result.cofinsLiquido) }] : []),
                                    { label: 'Total', formula: 'PIS + COFINS', value: fmt(result.total) },
                                ]}
                            />
                        </div>
                    ) : (
                        <div className="h-full bg-slate-50 dark:bg-slate-900 rounded-2xl border-dashed border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center p-10 text-center text-slate-400">
                            <p>Preencha os dados para calcular PIS/COFINS</p>
                        </div>
                    )}
                </div>
            </div>
        </ToolLayout>
    );
}
