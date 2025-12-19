import React, { useState } from 'react';
import { ToolLayout, Card, Button, FormInput, FormSelect, ResultCard, CalculationMemory } from '../ToolShared';
import { Calculator, TrendingDown } from 'lucide-react';

export default function LucroRealPresumidoCalculator({ onBack }: { onBack: () => void }) {
    const [form, setForm] = useState({
        faturamentoAnual: '',
        lucroReal: '',
        tipoAtividade: 'comercio'
    });
    const [result, setResult] = useState<any>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setResult(null);
    };

    const calculate = () => {
        const faturamento = parseFloat(form.faturamentoAnual);
        const lucroReal = parseFloat(form.lucroReal);

        if (!faturamento || !lucroReal) {
            alert('Preencha todos os campos');
            return;
        }

        // LUCRO PRESUMIDO
        const basePresumidaIRPJ = form.tipoAtividade === 'comercio' ? faturamento * 0.08 : faturamento * 0.32;
        const basePresumidaCSLL = form.tipoAtividade === 'comercio' ? faturamento * 0.12 : faturamento * 0.32;

        const irpjPresumido = basePresumidaIRPJ * 0.15;
        const adicionalPresumido = basePresumidaIRPJ > 240000 ? (basePresumidaIRPJ - 240000) * 0.10 : 0;
        const csllPresumido = basePresumidaCSLL * 0.09;
        const pisPresumido = faturamento * 0.0065;
        const cofinsPresumido = faturamento * 0.03;
        const totalPresumido = irpjPresumido + adicionalPresumido + csllPresumido + pisPresumido + cofinsPresumido;

        // LUCRO REAL
        const irpjReal = lucroReal * 0.15;
        const adicionalReal = lucroReal > 240000 ? (lucroReal - 240000) * 0.10 : 0;
        const csllReal = lucroReal * 0.09;
        const pisReal = faturamento * 0.0165; // Não cumulativo
        const cofinsReal = faturamento * 0.076; // Não cumulativo
        const totalReal = irpjReal + adicionalReal + csllReal + pisReal + cofinsReal;

        const economizaMais = totalPresumido < totalReal ? 'Lucro Presumido' : 'Lucro Real';
        const economia = Math.abs(totalPresumido - totalReal);
        const margemLucro = (lucroReal / faturamento) * 100;

        // Break-even
        const breakEvenMargemComercio = 32 * 0.15 / (0.15 + 0.09);
        const breakEvenMargemServico = 32;

        setResult({
            faturamento,
            lucroReal,
            margemLucro,
            // Presumido
            basePresumidaIRPJ,
            basePresumidaCSLL,
            irpjPresumido,
            adicionalPresumido,
            csllPresumido,
            pisPresumido,
            cofinsPresumido,
            totalPresumido,
            // Real
            irpjReal,
            adicionalReal,
            csllReal,
            pisReal,
            cofinsReal,
            totalReal,
            // Comparação
            economizaMais,
            economia,
            hash: `LR-LP-${Date.now().toString(36).toUpperCase()}`
        });
    };

    const fmt = (v: number) => new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(v);

    return (
        <ToolLayout
            title="Lucro Real vs Presumido"
            description="Compare qual regime tributário gera menos impostos para sua empresa"
            onBack={onBack}
        >
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <Card title="Dados da Empresa">
                        <div className="space-y-4">
                            <FormInput
                                label="Faturamento Anual (R$)"
                                name="faturamentoAnual"
                                type="number"
                                placeholder="3000000.00"
                                value={form.faturamentoAnual}
                                onChange={handleChange}
                            />

                            <FormInput
                                label="Lucro Real (R$)"
                                name="lucroReal"
                                type="number"
                                placeholder="150000.00"
                                value={form.lucroReal}
                                onChange={handleChange}
                            />

                            <FormSelect
                                label="Tipo de Atividade"
                                name="tipoAtividade"
                                value={form.tipoAtividade}
                                onChange={handleChange}
                            >
                                <option value="comercio">Comércio / Indústria (8% presunção)</option>
                                <option value="servicos">Serviços (32% presunção)</option>
                            </FormSelect>

                            <Button onClick={calculate} className="w-full">
                                <Calculator size={18} /> Comparar Regimes
                            </Button>
                        </div>
                    </Card>
                </div>

                <div className="space-y-6">
                    {result ? (
                        <diV className="animate-fade-in space-y-6">
                            <Card title={`🏆 Melhor: ${result.economizaMais}`}>
                                <div className={`p-6 rounded-xl ${result.economizaMais === 'Lucro Real' ? 'bg-emerald-50 dark:bg-emerald-900/20' : 'bg-blue-50 dark:bg-blue-900/20'
                                    }`}>
                                    <div className="flex items-center gap-2 mb-2">
                                        <TrendingDown size={24} className="text-emerald-600 dark:text-emerald-400" />
                                        <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Economia Anual</span>
                                    </div>
                                    <div className="text-3xl font-extrabold text-emerald-900 dark:text-emerald-100 mb-1">
                                        {fmt(result.economia)}
                                    </div>
                                    <div className="text-xs text-slate-600 dark:text-slate-400">
                                        {result.economizaMais === 'Lucro Real' ? 'vs Lucro Presumido' : 'vs Lucro Real'}
                                    </div>
                                </div>
                            </Card>

                            <Card title="Comparativo">
                                <div className="space-y-3">
                                    <div className={`p-4 rounded-xl border-2 ${result.economizaMais === 'Lucro Presumido' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' : 'border-slate-200 dark:border-slate-700'
                                        }`}>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-bold text-slate-900 dark:text-white">Lucro Presumido</span>
                                            {result.economizaMais === 'Lucro Presumido' && (
                                                <span className="text-xs bg-emerald-500 text-white px-2 py-0.5 rounded-full">Melhor</span>
                                            )}
                                        </div>
                                        <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">
                                            {fmt(result.totalPresumido)}
                                        </div>
                                    </div>

                                    <div className={`p-4 rounded-xl border-2 ${result.economizaMais === 'Lucro Real' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' : 'border-slate-200 dark:border-slate-700'
                                        }`}>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-bold text-slate-900 dark:text-white">Lucro Real</span>
                                            {result.economizaMais === 'Lucro Real' && (
                                                <span className="text-xs bg-emerald-500 text-white px-2 py-0.5 rounded-full">Melhor</span>
                                            )}
                                        </div>
                                        <div className="text-2xl font-extrabold text-purple-600 dark:text-purple-400">
                                            {fmt(result.totalReal)}
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            <CalculationMemory
                                hash={result.hash}
                                steps={[
                                    { label: 'Faturamento', formula: 'Base', value: fmt(result.faturamento) },
                                    { label: 'Margem Lucro', formula: `${result.lucroReal.toFixed(2)} / ${result.faturamento.toFixed(2)}`, value: `${result.margemLucro.toFixed(2)}%` },
                                    { label: 'Total Presumido', formula: 'IRPJ + CSLL + PIS + COFINS', value: fmt(result.totalPresumido) },
                                    { label: 'Total Real', formula: 'Sobre lucro efetivo + PIS/COFINS', value: fmt(result.totalReal) },
                                    { label: 'Economia', formula: `|Presumido - Real|`, value: fmt(result.economia) },
                                ]}
                            />
                        </diV>
                    ) : (
                        <div className="h-full bg-slate-50 dark:bg-slate-900 rounded-2xl border-dashed border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center p-10 text-center text-slate-400">
                            <p>Preencha os dados para comparar</p>
                        </div>
                    )}
                </div>
            </div>
        </ToolLayout>
    );
}
