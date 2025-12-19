import React, { useState } from 'react';
import { ToolLayout, Card, Button, FormInput, ResultCard, CalculationMemory } from '../ToolShared';
import { Calculator, DollarSign } from 'lucide-react';

export default function RetencoesCalculator({ onBack }: { onBack: () => void }) {
    const [form, setForm] = useState({
        valorServico: '',
        tipoServico: 'geral'
    });
    const [result, setResult] = useState<any>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setResult(null);
    };

    const calculate = () => {
        const valor = parseFloat(form.valorServico);
        if (!valor) {
            alert('Preencha o valor do serviço');
            return;
        }

        // Retenções padrão
        const irrf = valor * 0.015; // 1,5%
        const csll = valor * 0.01; // 1%
        const cofins = valor * 0.03; // 3%
        const pis = valor * 0.0065; // 0,65%
        const inss = form.tipoServico === 'obra' ? valor * 0.11 : 0; // 11% se obra/construção

        const totalRetido = irrf + csll + cofins + pis + inss;
        const valorLiquido = valor - totalRetido;

        setResult({
            valor,
            irrf,
            csll,
            cofins,
            pis,
            inss,
            totalRetido,
            valorLiquido,
            hash: `RET-${Date.now().toString(36).toUpperCase()}`
        });
    };

    const fmt = (v: number) => new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(v);

    return (
        <ToolLayout
            title="Retenções na Fonte"
            description="Calcule IRRF, CSRF, PIS, COFINS e CSLL retidos"
            onBack={onBack}
        >
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <Card title="Dados do Serviço">
                        <div className="space-y-4">
                            <FormInput
                                label="Valor do Serviço (R$)"
                                name="valorServico"
                                type="number"
                                placeholder="5000.00"
                                value={form.valorServico}
                                onChange={handleChange}
                            />

                            <div>
                                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">Tipo de Serviço</label>
                                <select
                                    name="tipoServico"
                                    value={form.tipoServico}
                                    onChange={handleChange}
                                    className="w-full h-11 px-3 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
                                >
                                    <option value="geral">Serviço Geral</option>
                                    <option value="obra">Obra / Construção Civil</option>
                                </select>
                            </div>

                            <Button onClick={calculate} className="w-full">
                                <Calculator size={18} /> Calcular Retenções
                            </Button>
                        </div>
                    </Card>
                </div>

                <div className="space-y-6">
                    {result ? (
                        <div className="animate-fade-in space-y-6">
                            <Card title="Retenções na Fonte">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                        <span className="text-sm font-medium text-red-700 dark:text-red-300">IRRF (1,5%)</span>
                                        <span className="font-bold text-red-900 dark:text-red-100">{fmt(result.irrf)}</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                        <span className="text-sm font-medium text-blue-700 dark:text-blue-300">CSLL (1%)</span>
                                        <span className="font-bold text-blue-900 dark:text-blue-100">{fmt(result.csll)}</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                        <span className="text-sm font-medium text-purple-700 dark:text-purple-300">COFINS (3%)</span>
                                        <span className="font-bold text-purple-900 dark:text-purple-100">{fmt(result.cofins)}</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                                        <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">PIS (0,65%)</span>
                                        <span className="font-bold text-indigo-900 dark:text-indigo-100">{fmt(result.pis)}</span>
                                    </div>
                                    {result.inss > 0 && (
                                        <div className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                                            <span className="text-sm font-medium text-amber-700 dark:text-amber-300">INSS (11%)</span>
                                            <span className="font-bold text-amber-900 dark:text-amber-100">{fmt(result.inss)}</span>
                                        </div>
                                    )}
                                </div>
                            </Card>

                            <ResultCard label="Total Retido" value={fmt(result.totalRetido)} color="red" />
                            <ResultCard label="Valor Líquido a Receber" value={fmt(result.valorLiquido)} color="emerald" highlight />

                            <CalculationMemory
                                hash={result.hash}
                                steps={[
                                    { label: 'Valor Bruto', formula: 'Serviço prestado', value: fmt(result.valor) },
                                    { label: 'IRRF', formula: '1,5%', value: fmt(result.irrf) },
                                    { label: 'CSLL', formula: '1%', value: fmt(result.csll) },
                                    ...(result.inss > 0 ? [{ label: 'INSS', formula: '11%', value: fmt(result.inss) }] : []),
                                    { label: 'Total Retido', formula: 'Soma retenções', value: fmt(result.totalRetido) },
                                    { label: 'Líquido', formula: 'Bruto - Retido', value: fmt(result.valorLiquido) },
                                ]}
                            />
                        </div>
                    ) : (
                        <div className="h-full bg-slate-50 dark:bg-slate-900 rounded-2xl border-dashed border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center p-10 text-center text-slate-400">
                            <div>
                                <DollarSign size={48} className="mx-auto mb-4 opacity-50" />
                                <p>Preencha os dados para calcular</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </ToolLayout>
    );
}
