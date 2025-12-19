import React, { useState } from 'react';
import { ToolLayout, Card, Button, FormInput, FormSelect, ResultCard, CalculationMemory } from '../ToolShared';
import { Calculator } from 'lucide-react';

export default function IrpjCsllCalculator({ onBack }: { onBack: () => void }) {
    const [form, setForm] = useState({
        lucro: '',
        regime: 'real'
    });
    const [result, setResult] = useState<any>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setResult(null);
    };

    const calculate = () => {
        const lucro = parseFloat(form.lucro);
        if (!lucro) {
            alert('Preencha o lucro');
            return;
        }

        let irpj = 0, csll = 0, adicionalIRPJ = 0;

        if (form.regime === 'real') {
            irpj = lucro * 0.15; // 15%
            csll = lucro * 0.09; // 9%
            // Adicional de 10% sobre o que exceder R$ 20k/mês (R$ 240k/ano)
            if (lucro > 240000) {
                adicionalIRPJ = (lucro - 240000) * 0.10;
            }
        } else {
            // Presumido - simplificado (depende da base presumida)
            const basePresumida = lucro; // Aqui seria a receita * % presunção
            irpj = basePresumida * 0.15;
            csll = basePresumida * 0.09;
            if (basePresumida > 240000) {
                adicionalIRPJ = (basePresumida - 240000) * 0.10;
            }
        }

        const totalIRPJ = irpj + adicionalIRPJ;
        const total = totalIRPJ + csll;

        setResult({
            lucro,
            regime: form.regime,
            irpj,
            adicionalIRPJ,
            totalIRPJ,
            csll,
            total,
            hash: `IRPJ-${Date.now().toString(36).toUpperCase()}`
        });
    };

    const fmt = (v: number) => new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(v);

    return (
        <ToolLayout
            title="IRPJ / CSLL"
            description="Calcule Imposto de Renda Pessoa Jurídica e Contribuição Social sobre o Lucro Líquido"
            onBack={onBack}
        >
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <Card title="Dados">
                        <div className="space-y-4">
                            <FormSelect
                                label="Regime de Tributação"
                                name="regime"
                                value={form.regime}
                                onChange={handleChange}
                            >
                                <option value="real">Lucro Real</option>
                                <option value="presumido">Lucro Presumido</option>
                            </FormSelect>

                            <FormInput
                                label={form.regime === 'real' ? 'Lucro Líquido (R$)' : 'Base de Cálculo (R$)'}
                                name="lucro"
                                type="number"
                                placeholder="500000.00"
                                value={form.lucro}
                                onChange={handleChange}
                            />

                            <Button onClick={calculate} className="w-full">
                                <Calculator size={18} /> Calcular
                            </Button>
                        </div>
                    </Card>
                </div>

                <div className="space-y-6">
                    {result ? (
                        <div className="animate-fade-in space-y-6">
                            <Card title="Tributação">
                                <div className="space-y-3">
                                    <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                        <div className="text-xs text-red-700 dark:text-red-300 mb-1">IRPJ (15%)</div>
                                        <div className="text-xl font-extrabold text-red-900 dark:text-red-100">{fmt(result.irpj)}</div>
                                    </div>
                                    {result.adicionalIRPJ > 0 && (
                                        <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                                            <div className="text-xs text-amber-700 dark:text-amber-300 mb-1">Adicional IRPJ (10%)</div>
                                            <div className="text-xl font-extrabold text-amber-900 dark:text-amber-100">{fmt(result.adicionalIRPJ)}</div>
                                            <div className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                                                Sobre excedente de R$ 240k
                                            </div>
                                        </div>
                                    )}
                                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                        <div className="text-xs text-blue-700 dark:text-blue-300 mb-1">CSLL (9%)</div>
                                        <div className="text-xl font-extrabold text-blue-900 dark:text-blue-100">{fmt(result.csll)}</div>
                                    </div>
                                </div>
                            </Card>

                            <ResultCard label="Total IRPJ + CSLL" value={fmt(result.total)} color="emerald" highlight />

                            <CalculationMemory
                                hash={result.hash}
                                steps={[
                                    { label: 'Base', formula: form.regime === 'real' ? 'Lucro Real' : 'Lucro Presumido', value: fmt(result.lucro) },
                                    { label: 'IRPJ', formula: '15%', value: fmt(result.irpj) },
                                    ...(result.adicionalIRPJ > 0 ? [{ label: 'Adicional', formula: '10% sobre excedente', value: fmt(result.adicionalIRPJ) }] : []),
                                    { label: 'CSLL', formula: '9%', value: fmt(result.csll) },
                                    { label: 'Total', formula: 'IRPJ + CSLL', value: fmt(result.total) },
                                ]}
                            />
                        </div>
                    ) : (
                        <div className="h-full bg-slate-50 dark:bg-slate-900 rounded-2xl border-dashed border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center p-10 text-center text-slate-400">
                            <p>Preencha o lucro para calcular</p>
                        </div>
                    )}
                </div>
            </div>
        </ToolLayout>
    );
}
