import React, { useState } from 'react';
import { ToolLayout, Card, Button, FormInput, FormSelect, ResultCard, CalculationMemory } from '../ToolShared';
import { Calculator, TrendingUp, TrendingDown } from 'lucide-react';

export default function IbsCbsCalculator({ onBack }: { onBack: () => void }) {
    const [form, setForm] = useState({
        valorOperacao: '',
        setor: 'comercio'
    });

    const [result, setResult] = useState<any>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setResult(null);
    };

    const calculate = () => {
        const valor = parseFloat(form.valorOperacao);

        if (!valor) {
            alert('Preencha o valor da operação');
            return;
        }

        // SISTEMA ATUAL (estimativas médias conforme setor)
        let icms = 0, pis = 0, cofins = 0;

        switch (form.setor) {
            case 'comercio':
                icms = valor * 0.18;
                pis = valor * 0.0165;
                cofins = valor * 0.076;
                break;
            case 'industria':
                icms = valor * 0.18;
                pis = valor * 0.0165;
                cofins = valor * 0.076;
                break;
            case 'servicos':
                icms = 0; // Geralmente não incide em serviços
                pis = valor * 0.0165;
                cofins = valor * 0.076;
                break;
            default:
                icms = valor * 0.18;
                pis = valor * 0.0165;
                cofins = valor * 0.076;
        }

        const totalAtual = icms + pis + cofins;

        // SISTEMA NOVO (IBS + CBS) - estimativa EC 132/2023
        // Alíquota padrão estimada: ~25% (12.5% IBS + 12.5% CBS)
        const ibs = valor * 0.125;  // 12.5% (estimativa)
        const cbs = valor * 0.125;  // 12.5% (estimativa)
        const totalNovo = ibs + cbs;

        // Comparação
        const diferenca = totalNovo - totalAtual;
        const percentualDiferenca = ((diferenca / totalAtual) * 100);

        setResult({
            valor,
            setor: form.setor,
            // Sistema Atual
            icms,
            pis,
            cofins,
            totalAtual,
            // Sistema Novo
            ibs,
            cbs,
            totalNovo,
            // Comparação
            diferenca,
            percentualDiferenca,
            impacto: diferenca > 0 ? 'aumento' : 'reducao',
            hash: `IBS-CBS-${Date.now().toString(36).toUpperCase()}`
        });
    };

    const fmt = (v: number) => new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(v);

    const fmtPercent = (v: number) => `${v.toFixed(2)}%`;

    return (
        <ToolLayout
            title="Simulador IBS/CBS"
            description="Compare a carga tributária atual com o novo sistema da Reforma Tributária (IBS + CBS)."
            onBack={onBack}
        >
            <div className="grid md:grid-cols-12 gap-8">

                <div className="md:col-span-5 space-y-6">
                    <Card title="Dados da Simulação">
                        <div className="space-y-4">

                            <FormInput
                                label="Valor da Operação (R$)"
                                name="valorOperacao"
                                type="number"
                                placeholder="10000.00"
                                value={form.valorOperacao}
                                onChange={handleChange}
                            />

                            <FormSelect
                                label="Setor de Atividade"
                                name="setor"
                                value={form.setor}
                                onChange={handleChange}
                            >
                                <option value="comercio">Comércio</option>
                                <option value="industria">Indústria</option>
                                <option value="servicos">Serviços</option>
                            </FormSelect>

                            <div className="pt-2">
                                <Button onClick={calculate} className="w-full">
                                    <Calculator size={18} /> Simular Impacto
                                </Button>
                            </div>

                        </div>
                    </Card>

                    <Card title="Sobre a Reforma Tributária">
                        <div className="text-sm text-slate-600 dark:text-slate-400 space-y-2 leading-relaxed">
                            <p>
                                A <strong>EC 132/2023</strong> cria dois novos tributos que substituirão
                                ICMS, ISS, PIS, COFINS e IPI:
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-2">
                                <li><strong>IBS</strong> - Imposto sobre Bens e Serviços (substitui ICMS e ISS)</li>
                                <li><strong>CBS</strong> - Contribuição sobre Bens e Serviços (substitui PIS e COFINS)</li>
                            </ul>
                            <p className="text-xs mt-3 opacity-75">
                                ⚠️ Valores estimados. Alíquotas finais serão definidas por lei complementar.
                            </p>
                        </div>
                    </Card>
                </div>

                <div className="md:col-span-7 space-y-6">
                    {result ? (
                        <div className="animate-fade-in space-y-6">

                            {/* Sistema Atual */}
                            <Card title="Sistema Atual">
                                <div className="grid grid-cols-3 gap-3 mb-4">
                                    <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-xl">
                                        <div className="text-xs text-red-700 dark:text-red-300 font-bold">ICMS</div>
                                        <div className="text-lg font-extrabold text-red-900 dark:text-red-100">{fmt(result.icms)}</div>
                                    </div>
                                    <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-xl">
                                        <div className="text-xs text-orange-700 dark:text-orange-300 font-bold">PIS</div>
                                        <div className="text-lg font-extrabold text-orange-900 dark:text-orange-100">{fmt(result.pis)}</div>
                                    </div>
                                    <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-xl">
                                        <div className="text-xs text-amber-700 dark:text-amber-300 font-bold">COFINS</div>
                                        <div className="text-lg font-extrabold text-amber-900 dark:text-amber-100">{fmt(result.cofins)}</div>
                                    </div>
                                </div>
                                <ResultCard
                                    label="Total Sistema Atual"
                                    value={fmt(result.totalAtual)}
                                    color="amber"
                                />
                            </Card>

                            {/* Sistema Novo */}
                            <Card title="Sistema Novo (IBS + CBS)">
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
                                        <div className="text-xs text-blue-700 dark:text-blue-300 font-bold">IBS (12,5%)</div>
                                        <div className="text-xl font-extrabold text-blue-900 dark:text-blue-100">{fmt(result.ibs)}</div>
                                        <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">Substitui ICMS/ISS</div>
                                    </div>
                                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl">
                                        <div className="text-xs text-purple-700 dark:text-purple-300 font-bold">CBS (12,5%)</div>
                                        <div className="text-xl font-extrabold text-purple-900 dark:text-purple-100">{fmt(result.cbs)}</div>
                                        <div className="text-xs text-purple-600 dark:text-purple-400 mt-1">Substitui PIS/COFINS</div>
                                    </div>
                                </div>
                                <ResultCard
                                    label="Total Sistema Novo"
                                    value={fmt(result.totalNovo)}
                                    color="purple"
                                />
                            </Card>

                            {/* Impacto */}
                            <ResultCard
                                label={result.impacto === 'aumento' ? 'Aumento de Carga' : 'Redução de Carga'}
                                value={fmt(Math.abs(result.diferenca))}
                                subtext={`${result.impacto === 'aumento' ? '+' : '-'}${fmtPercent(Math.abs(result.percentualDiferenca))} em relação ao sistema atual`}
                                highlight
                                color={result.impacto === 'aumento' ? 'amber' : 'emerald'}
                            />

                            <CalculationMemory
                                hash={result.hash}
                                steps={[
                                    {
                                        label: 'Valor da Operação',
                                        formula: `Setor: ${result.setor}`,
                                        value: fmt(result.valor)
                                    },
                                    {
                                        label: 'ICMS (Sistema Atual)',
                                        formula: 'Estimativa média',
                                        value: fmt(result.icms)
                                    },
                                    {
                                        label: 'PIS + COFINS (Sistema Atual)',
                                        formula: '1,65% + 7,6%',
                                        value: fmt(result.pis + result.cofins)
                                    },
                                    {
                                        label: 'Total Atual',
                                        formula: 'ICMS + PIS + COFINS',
                                        value: fmt(result.totalAtual)
                                    },
                                    {
                                        label: 'IBS (Sistema Novo)',
                                        formula: '12,5% estimado',
                                        value: fmt(result.ibs)
                                    },
                                    {
                                        label: 'CBS (Sistema Novo)',
                                        formula: '12,5% estimado',
                                        value: fmt(result.cbs)
                                    },
                                    {
                                        label: 'Total Novo',
                                        formula: 'IBS + CBS',
                                        value: fmt(result.totalNovo)
                                    },
                                    {
                                        label: 'Diferença',
                                        formula: `Total Novo - Total Atual`,
                                        value: fmt(result.diferenca)
                                    },
                                ]}
                            />

                            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900 rounded-xl p-4">
                                <div className="flex items-start gap-3">
                                    {result.impacto === 'aumento' ? (
                                        <TrendingUp className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" size={20} />
                                    ) : (
                                        <TrendingDown className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" size={20} />
                                    )}
                                    <div className="text-sm text-amber-800 dark:text-amber-200">
                                        <strong>Nota:</strong> Esta é uma simulação com alíquotas estimadas.
                                        As alíquotas finais do IBS e CBS serão definidas por lei complementar
                                        e podem variar conforme o produto/serviço e regime aplicável.
                                    </div>
                                </div>
                            </div>

                        </div>
                    ) : (
                        <div className="h-full bg-slate-50 dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center text-slate-400 p-10 text-center">
                            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                                <Calculator size={32} />
                            </div>
                            <p className="font-medium">Simule o impacto da Reforma Tributária na sua operação.</p>
                            <p className="text-xs mt-2 opacity-75">Compare o sistema atual (ICMS/PIS/COFINS) com o novo (IBS/CBS).</p>
                        </div>
                    )}
                </div>

            </div>
        </ToolLayout>
    );
}
