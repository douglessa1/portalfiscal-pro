import React, { useState } from 'react';
import { ToolLayout, Card, Button, FormInput, FormSelect, ResultCard, CalculationMemory } from '../ToolShared';
import { Calculator, TrendingDown, TrendingUp } from 'lucide-react';

export default function ComparadorRegimesCalculator({ onBack }: { onBack: () => void }) {
    const [form, setForm] = useState({
        faturamentoAnual: '',
        tipoAtividade: 'comercio',
        folhaPagamento: '',
        lucroEstimado: ''
    });

    const [result, setResult] = useState<any>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setResult(null);
    };

    const calculate = () => {
        const faturamento = parseFloat(form.faturamentoAnual);
        const folha = parseFloat(form.folhaPagamento) || 0;
        const lucroEst = parseFloat(form.lucroEstimado) || (faturamento * 0.08); // 8% padrão

        if (!faturamento) {
            alert('Preencha o faturamento anual');
            return;
        }

        // SIMPLES NACIONAL
        let aliqSimples = 0;
        if (form.tipoAtividade === 'comercio') {
            // Anexo I simplificado
            if (faturamento <= 180000) aliqSimples = 4;
            else if (faturamento <= 360000) aliqSimples = 7.3;
            else if (faturamento <= 720000) aliqSimples = 9.5;
            else if (faturamento <= 1800000) aliqSimples = 10.7;
            else if (faturamento <= 3600000) aliqSimples = 14.3;
            else if (faturamento <= 4800000) aliqSimples = 19;
            else aliqSimples = 0; // Acima do limite
        } else {
            // Anexo III simplificado
            if (faturamento <= 180000) aliqSimples = 6;
            else if (faturamento <= 360000) aliqSimples = 11.2;
            else if (faturamento <= 720000) aliqSimples = 13.5;
            else if (faturamento <= 1800000) aliqSimples = 16;
            else if (faturamento <= 3600000) aliqSimples = 21;
            else if (faturamento <= 4800000) aliqSimples = 33;
            else aliqSimples = 0; // Acima do limite
        }

        const totalSimples = aliqSimples > 0 ? (faturamento * aliqSimples / 100) : null;

        // LUCRO PRESUMIDO
        const basePresumidaIRPJ = form.tipoAtividade === 'comercio' ? faturamento * 0.08 : faturamento * 0.32;
        const basePresumidaCSLL = form.tipoAtividade === 'comercio' ? faturamento * 0.12 : faturamento * 0.32;

        const irpjPresumido = basePresumidaIRPJ * 0.15;
        const csllPresumido = basePresumidaCSLL * 0.09;
        const pisPresumido = faturamento * 0.0065;
        const cofinsPresumido = faturamento * 0.03;
        const totalPresumido = irpjPresumido + csllPresumido + pisPresumido + cofinsPresumido;

        // LUCRO REAL
        const baseReal = lucroEst;
        const irpjReal = baseReal * 0.15;
        const csllReal = baseReal * 0.09;
        const pisReal = faturamento * 0.0165; // Não cumulativo
        const cofinsReal = faturamento * 0.076; // Não cumulativo
        const totalReal = irpjReal + csllReal + pisReal + cofinsReal;

        // Análise
        const regimes = [
            { nome: 'Simples Nacional', total: totalSimples, valido: aliqSimples > 0 && faturamento <= 4800000 },
            { nome: 'Lucro Presumido', total: totalPresumido, valido: true },
            { nome: 'Lucro Real', total: totalReal, valido: true }
        ];

        const validos = regimes.filter(r => r.valido && r.total !== null);
        const melhor = validos.reduce((prev, curr) =>
            (curr.total! < prev.total! ? curr : prev)
        );

        const economiaVsPresumido = totalPresumido - melhor.total!;
        const economiaPercent = (economiaVsPresumido / totalPresumido) * 100;

        setResult({
            faturamento,
            lucroEst,
            // Simples
            simplesValido: aliqSimples > 0 && faturamento <= 4800000,
            aliqSimples,
            totalSimples,
            // Presumido
            totalPresumido,
            irpjPresumido,
            csllPresumido,
            pisPresumido,
            cofinsPresumido,
            // Real
            totalReal,
            irpjReal,
            csllReal,
            pisReal,
            cofinsReal,
            // Análise
            melhorRegime: melhor.nome,
            economiaAnual: economiaVsPresumido,
            economiaPercent,
            hash: `COMP-${Date.now().toString(36).toUpperCase()}`
        });
    };

    const fmt = (v: number | null) => {
        if (v === null) return 'N/A';
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(v);
    };

    const fmtPercent = (v: number) => `${v.toFixed(2)}%`;

    return (
        <ToolLayout
            title="Comparador de Regimes Tributários"
            description="Compare Simples Nacional, Lucro Presumido e Lucro Real para encontrar o melhor para seu negócio."
            onBack={onBack}
        >
            <div className="grid md:grid-cols-12 gap-8">

                <div className="md:col-span-5 space-y-6">
                    <Card title="Dados da Empresa">
                        <div className="space-y-4">

                            <FormInput
                                label="Faturamento Anual (R$)"
                                name="faturamentoAnual"
                                type="number"
                                placeholder="1200000.00"
                                value={form.faturamentoAnual}
                                onChange={handleChange}
                            />

                            <FormSelect
                                label="Tipo de Atividade"
                                name="tipoAtividade"
                                value={form.tipoAtividade}
                                onChange={handleChange}
                            >
                                <option value="comercio">Comércio / Indústria</option>
                                <option value="servicos">Serviços</option>
                            </FormSelect>

                            <FormInput
                                label="Folha de Pagamento Anual (R$)"
                                name="folhaPagamento"
                                type="number"
                                placeholder="240000.00 (opcional)"
                                value={form.folhaPagamento}
                                onChange={handleChange}
                            />

                            <FormInput
                                label="Lucro Estimado (R$)"
                                name="lucroEstimado"
                                type="number"
                                placeholder="Deixe em branco para estimativa"
                                value={form.lucroEstimado}
                                onChange={handleChange}
                            />

                            <div className="pt-2">
                                <Button onClick={calculate} className="w-full">
                                    <Calculator size={18} /> Comparar Regimes
                                </Button>
                            </div>

                        </div>
                    </Card>

                    <Card title="Sobre os Regimes">
                        <div className="text-sm text-slate-600 dark:text-slate-400 space-y-2 leading-relaxed">
                            <p><strong>Simples Nacional:</strong> Regime simplificado para empresas até R$ 4,8 milhões/ano.</p>
                            <p><strong>Lucro Presumido:</strong> Base de cálculo presumida por atividade.</p>
                            <p><strong>Lucro Real:</strong> Tributação sobre lucro efetivo. Obrigatório para faturamento acima de R$ 78 milhões.</p>
                        </div>
                    </Card>
                </div>

                <div className="md:col-span-7 space-y-6">
                    {result ? (
                        <div className="animate-fade-in space-y-6">

                            {/* Melhor Regime */}
                            <Card title="🏆 Recomendação">
                                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-xl">
                                    <p className="text-sm text-emerald-700 dark:text-emerald-300 mb-2">Regime Mais Vantajoso:</p>
                                    <h2 className="text-3xl font-extrabold text-emerald-900 dark:text-emerald-100 mb-4">{result.melhorRegime}</h2>
                                    <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                                        <TrendingDown size={20} />
                                        <span className="font-bold">Economia de {fmt(result.economiaAnual)}/ano</span>
                                        <span className="text-xs">({fmtPercent(result.economiaPercent)} vs Presumido)</span>
                                    </div>
                                </div>
                            </Card>

                            {/* Comparativo */}
                            <Card title="Comparativo Detalhado">
                                <div className="space-y-4">

                                    {/* Simples Nacional */}
                                    <div className={`p-4 rounded-xl border-2 ${result.melhorRegime === 'Simples Nacional' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' : 'border-slate-200 dark:border-slate-700'}`}>
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                                Simples Nacional
                                                {result.melhorRegime === 'Simples Nacional' && <span className="text-xs bg-emerald-500 text-white px-2 py-0.5 rounded-full">Melhor</span>}
                                            </h3>
                                            {result.simplesValido ? (
                                                <span className="text-xl font-extrabold text-emerald-600">{fmt(result.totalSimples)}</span>
                                            ) : (
                                                <span className="text-xs text-red-500 font-bold">Não Disponível</span>
                                            )}
                                        </div>
                                        {result.simplesValido && (
                                            <div className="text-xs text-slate-600 dark:text-slate-400">
                                                Alíquota Efetiva: {fmtPercent(result.aliqSimples)}
                                            </div>
                                        )}
                                        {!result.simplesValido && (
                                            <div className="text-xs text-slate-600 dark:text-slate-400">
                                                Faturamento excede limite de R$ 4,8 milhões
                                            </div>
                                        )}
                                    </div>

                                    {/* Lucro Presumido */}
                                    <div className={`p-4 rounded-xl border-2 ${result.melhorRegime === 'Lucro Presumido' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' : 'border-slate-200 dark:border-slate-700'}`}>
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                                Lucro Presumido
                                                {result.melhorRegime === 'Lucro Presumido' && <span className="text-xs bg-emerald-500 text-white px-2 py-0.5 rounded-full">Melhor</span>}
                                            </h3>
                                            <span className="text-xl font-extrabold text-blue-600">{fmt(result.totalPresumido)}</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400">
                                            <div>IRPJ: {fmt(result.irpjPresumido)}</div>
                                            <div>CSLL: {fmt(result.csllPresumido)}</div>
                                            <div>PIS: {fmt(result.pisPresumido)}</div>
                                            <div>COFINS: {fmt(result.cofinsPresumido)}</div>
                                        </div>
                                    </div>

                                    {/* Lucro Real */}
                                    <div className={`p-4 rounded-xl border-2 ${result.melhorRegime === 'Lucro Real' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' : 'border-slate-200 dark:border-slate-700'}`}>
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                                Lucro Real
                                                {result.melhorRegime === 'Lucro Real' && <span className="text-xs bg-emerald-500 text-white px-2 py-0.5 rounded-full">Melhor</span>}
                                            </h3>
                                            <span className="text-xl font-extrabold text-purple-600">{fmt(result.totalReal)}</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400">
                                            <div>IRPJ: {fmt(result.irpjReal)}</div>
                                            <div>CSLL: {fmt(result.csllReal)}</div>
                                            <div>PIS: {fmt(result.pisReal)}</div>
                                            <div>COFINS: {fmt(result.cofinsReal)}</div>
                                        </div>
                                    </div>

                                </div>
                            </Card>

                            <CalculationMemory
                                hash={result.hash}
                                steps={[
                                    {
                                        label: 'Faturamento Anual',
                                        formula: 'Base de cálculo',
                                        value: fmt(result.faturamento)
                                    },
                                    {
                                        label: 'Simples Nacional',
                                        formula: result.simplesValido ? `${fmt(result.faturamento)} × ${fmtPercent(result.aliqSimples)}` : 'Não disponível',
                                        value: result.simplesValido ? fmt(result.totalSimples) : 'N/A'
                                    },
                                    {
                                        label: 'Lucro Presumido',
                                        formula: 'IRPJ + CSLL + PIS + COFINS',
                                        value: fmt(result.totalPresumido)
                                    },
                                    {
                                        label: 'Lucro Real',
                                        formula: `Lucro ${fmt(result.lucroEst)} × 24% + PIS/COFINS`,
                                        value: fmt(result.totalReal)
                                    },
                                    {
                                        label: 'Economia (vs Presumido)',
                                        formula: `Presumido - ${result.melhorRegime}`,
                                        value: fmt(result.economiaAnual)
                                    },
                                ]}
                            />

                        </div>
                    ) : (
                        <div className="h-full bg-slate-50 dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center text-slate-400 p-10 text-center">
                            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                                <Calculator size={32} />
                            </div>
                            <p className="font-medium">Informe os dados da empresa para comparar os regimes tributários.</p>
                            <p className="text-xs mt-2 opacity-75">Descubra qual regime pode economizar mais impostos.</p>
                        </div>
                    )}
                </div>

            </div>
        </ToolLayout>
    );
}
