import React, { useState } from 'react';
import { ToolLayout, Card, Button, FormInput, FormSelect, ResultCard, CalculationMemory } from '../ToolShared';
import { Calculator, Calendar, TrendingUp } from 'lucide-react';

// Cronograma de Transição conforme EC 132/2023
const CRONOGRAMA = [
    { ano: 2026, cbsNovo: 0.9, cbsAntigo: 0.1, ibsNovo: 0, ibsAntigo: 1.0, icms: 1.0, iss: 1.0 },
    { ano: 2027, cbsNovo: 1.0, cbsAntigo: 0, ibsNovo: 0.1, ibsAntigo: 0, icms: 0.9, iss: 0.9 },
    { ano: 2028, cbsNovo: 1.0, cbsAntigo: 0, ibsNovo: 0.2, ibsAntigo: 0, icms: 0.8, iss: 0.8 },
    { ano: 2029, cbsNovo: 1.0, cbsAntigo: 0, ibsNovo: 0.3, ibsAntigo: 0, icms: 0.7, iss: 0.7 },
    { ano: 2030, cbsNovo: 1.0, cbsAntigo: 0, ibsNovo: 0.5, ibsAntigo: 0, icms: 0.5, iss: 0.5 },
    { ano: 2031, cbsNovo: 1.0, cbsAntigo: 0, ibsNovo: 0.7, ibsAntigo: 0, icms: 0.3, iss: 0.3 },
    { ano: 2032, cbsNovo: 1.0, cbsAntigo: 0, ibsNovo: 0.9, ibsAntigo: 0, icms: 0.1, iss: 0.1 },
    { ano: 2033, cbsNovo: 1.0, cbsAntigo: 0, ibsNovo: 1.0, ibsAntigo: 0, icms: 0, iss: 0 }
];

export default function TransicaoCalculator({ onBack }: { onBack: () => void }) {
    const [form, setForm] = useState({
        valorOperacao: '',
        ano: '2026',
        tipo: 'bem' // bem ou serviço
    });

    const [result, setResult] = useState<any>(null);
    const [timeline, setTimeline] = useState<any[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setResult(null);
        setTimeline([]);
    };

    const calculate = () => {
        const valor = parseFloat(form.valorOperacao);
        const ano = parseInt(form.ano);

        if (!valor) {
            alert('Preencha o valor da operação');
            return;
        }

        const periodo = CRONOGRAMA.find(p => p.ano === ano);
        if (!periodo) return;

        // Alíquotas estimadas
        const aliqICMS = 0.18;
        const aliqISS = 0.05;
        const aliqPIS = 0.0165;
        const aliqCOFINS = 0.076;
        const aliqCBS = 0.125; // Estimativa
        const aliqIBS = 0.125; // Estimativa

        // Sistema Antigo
        let icms = 0, iss = 0;
        if (form.tipo === 'bem') {
            icms = valor * aliqICMS * periodo.icms;
        } else {
            iss = valor * aliqISS * periodo.iss;
        }
        const pisAntigo = valor * aliqPIS * (1 - periodo.cbsNovo);
        const cofinsAntigo = valor * aliqCOFINS * (1 - periodo.cbsNovo);

        // Sistema Novo
        const cbs = valor * aliqCBS * periodo.cbsNovo;
        const ibs = valor * aliqIBS * periodo.ibsNovo;

        // Total
        const totalAntigo = icms + iss + pisAntigo + cofinsAntigo;
        const totalNovo = cbs + ibs;
        const total = totalAntigo + totalNovo;

        setResult({
            ano,
            valor,
            tipo: form.tipo,
            // Antigo
            icms,
            iss,
            pisAntigo,
            cofinsAntigo,
            totalAntigo,
            // Novo
            cbs,
            ibs,
            totalNovo,
            // Total
            total,
            // Percentuais
            percAntigo: (totalAntigo / total) * 100,
            percNovo: (totalNovo / total) * 100,
            hash: `TRANS-${Date.now().toString(36).toUpperCase()}`
        });

        // Calcular timeline completa
        const timelineData = CRONOGRAMA.map(p => {
            let icmsTimeline = 0, issTimeline = 0;
            if (form.tipo === 'bem') {
                icmsTimeline = valor * aliqICMS * p.icms;
            } else {
                issTimeline = valor * aliqISS * p.iss;
            }
            const pisT = valor * aliqPIS * (1 - p.cbsNovo);
            const cofinsT = valor * aliqCOFINS * (1 - p.cbsNovo);
            const cbsT = valor * aliqCBS * p.cbsNovo;
            const ibsT = valor * aliqIBS * p.ibsNovo;
            const totalT = icmsTimeline + issTimeline + pisT + cofinsT + cbsT + ibsT;

            return {
                ano: p.ano,
                antigo: icmsTimeline + issTimeline + pisT + cofinsT,
                novo: cbsT + ibsT,
                total: totalT
            };
        });

        setTimeline(timelineData);
    };

    const fmt = (v: number) => new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(v);

    const fmtPercent = (v: number) => `${v.toFixed(1)}%`;

    return (
        <ToolLayout
            title="Calculadora de Transição"
            description="Simule a carga tributária durante o período de transição da Reforma Tributária (2026-2033)."
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
                                label="Tipo de Operação"
                                name="tipo"
                                value={form.tipo}
                                onChange={handleChange}
                            >
                                <option value="bem">Bem / Mercadoria</option>
                                <option value="servico">Serviço</option>
                            </FormSelect>

                            <FormSelect
                                label="Ano da Operação"
                                name="ano"
                                value={form.ano}
                                onChange={handleChange}
                            >
                                {CRONOGRAMA.map(p => (
                                    <option key={p.ano} value={p.ano}>{p.ano}</option>
                                ))}
                            </FormSelect>

                            <div className="pt-2">
                                <Button onClick={calculate} className="w-full">
                                    <Calculator size={18} /> Simular Transição
                                </Button>
                            </div>

                        </div>
                    </Card>

                    <Card title="Cronograma">
                        <div className="space-y-2">
                            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Período de Transição</div>
                            <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                                <p>• <strong>2026</strong>: CBS inicia (90%)</p>
                                <p>• <strong>2027</strong>: CBS 100% + IBS inicia (10%)</p>
                                <p>• <strong>2027-2032</strong>: Transição gradual</p>
                                <p>• <strong>2033</strong>: 100% novo sistema</p>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="md:col-span-7 space-y-6">
                    {result ? (
                        <div className="animate-fade-in space-y-6">

                            {/* Resultado do Ano Selecionado */}
                            <Card title={`Tributação em ${result.ano}`}>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl">
                                            <div className="text-xs text-amber-700 dark:text-amber-300 font-bold mb-2">Sistema Antigo</div>
                                            <div className="text-2xl font-extrabold text-amber-900 dark:text-amber-100">{fmt(result.totalAntigo)}</div>
                                            <div className="text-xs text-amber-600 dark:text-amber-400 mt-2">{fmtPercent(result.percAntigo)} do total</div>
                                        </div>
                                        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl">
                                            <div className="text-xs text-emerald-700 dark:text-emerald-300 font-bold mb-2">Sistema Novo</div>
                                            <div className="text-2xl font-extrabold text-emerald-900 dark:text-emerald-100">{fmt(result.totalNovo)}</div>
                                            <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-2">{fmtPercent(result.percNovo)} do total</div>
                                        </div>
                                    </div>

                                    <ResultCard
                                        label={`Total a Recolher em ${result.ano}`}
                                        value={fmt(result.total)}
                                        highlight
                                        color="emerald"
                                    />
                                </div>
                            </Card>

                            {/* Timeline Completa */}
                            {timeline.length > 0 && (
                                <Card title="Evolução da Carga Tributária">
                                    <div className="space-y-2">
                                        {timeline.map((t, idx) => (
                                            <div
                                                key={t.ano}
                                                className={`flex items-center gap-3 p-3 rounded-lg ${t.ano === result.ano ? 'bg-emerald-100 dark:bg-emerald-900/30 ring-2 ring-emerald-500' : 'bg-slate-50 dark:bg-slate-800'}`}
                                            >
                                                <div className="flex-shrink-0 w-16 text-center">
                                                    <div className="font-bold text-slate-900 dark:text-white">{t.ano}</div>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 h-6 bg-white dark:bg-slate-900 rounded-full overflow-hidden">
                                                        {t.antigo > 0 && (
                                                            <div
                                                                className="h-full bg-amber-500 dark:bg-amber-600 flex items-center justify-center text-[10px] font-bold text-white"
                                                                style={{ width: `${(t.antigo / t.total) * 100}%` }}
                                                            />
                                                        )}
                                                        {t.novo > 0 && (
                                                            <div
                                                                className="h-full bg-emerald-500 dark:bg-emerald-600 flex items-center justify-center text-[10px] font-bold text-white"
                                                                style={{ width: `${(t.novo / t.total) * 100}%` }}
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex-shrink-0 w-24 text-right text-sm font-bold text-slate-900 dark:text-white">
                                                    {fmt(t.total)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 flex gap-4 text-xs">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 bg-amber-500 rounded"></div>
                                            <span className="text-slate-600 dark:text-slate-400">Sistema Antigo</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 bg-emerald-500 rounded"></div>
                                            <span className="text-slate-600 dark:text-slate-400">Sistema Novo</span>
                                        </div>
                                    </div>
                                </Card>
                            )}

                            <CalculationMemory
                                hash={result.hash}
                                steps={[
                                    {
                                        label: 'Valor da Operação',
                                        formula: `${form.tipo === 'bem' ? 'Bem' : 'Serviço'} em ${result.ano}`,
                                        value: fmt(result.valor)
                                    },
                                    {
                                        label: 'Tributos Antigos',
                                        formula: form.tipo === 'bem' ? 'ICMS + PIS + COFINS (proporção)' : 'ISS + PIS + COFINS (proporção)',
                                        value: fmt(result.totalAntigo)
                                    },
                                    {
                                        label: 'Tributos Novos',
                                        formula: 'IBS + CBS (proporção)',
                                        value: fmt(result.totalNovo)
                                    },
                                    {
                                        label: 'Total no Ano',
                                        formula: 'Antigo + Novo',
                                        value: fmt(result.total)
                                    },
                                ]}
                            />

                        </div>
                    ) : (
                        <div className="h-full bg-slate-50 dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center text-slate-400 p-10 text-center">
                            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                                <Calendar size={32} />
                            </div>
                            <p className="font-medium">Simule a transição tributária gradual de 2026 a 2033.</p>
                            <p className="text-xs mt-2 opacity-75">Veja como a carga evoluirá ano a ano durante a reforma.</p>
                        </div>
                    )}
                </div>

            </div>
        </ToolLayout>
    );
}
