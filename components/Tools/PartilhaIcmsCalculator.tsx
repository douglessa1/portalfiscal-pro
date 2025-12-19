import React, { useState } from 'react';
import { ToolLayout, Card, Button, FormInput, FormSelect, ResultCard, CalculationMemory } from '../ToolShared';
import { Calculator, GitFork } from 'lucide-react';

const CRONOGRAMA_PARTILHA = [
    { ano: 2016, origem: 60, destino: 40 },
    { ano: 2017, origem: 40, destino: 60 },
    { ano: 2018, origem: 20, destino: 80 },
    { ano: 2019, origem: 0, destino: 100 }
];

export default function PartilhaIcmsCalculator({ onBack }: { onBack: () => void }) {
    const [form, setForm] = useState({
        valorOperacao: '',
        aliqOrigem: '18',
        aliqDestino: '18',
        ano: '2019'
    });

    const [result, setResult] = useState<any>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setResult(null);
    };

    const calculate = () => {
        const valor = parseFloat(form.valorOperacao);
        const aliqOrig = parseFloat(form.aliqOrigem);
        const aliqDest = parseFloat(form.aliqDestino);
        const ano = parseInt(form.ano);

        if (!valor || !aliqOrig || !aliqDest) {
            alert('Preencha todos os campos obrigatórios');
            return;
        }

        // Buscar percentuais do ano
        const partilha = CRONOGRAMA_PARTILHA.find(p => p.ano === ano) || CRONOGRAMA_PARTILHA[3];

        // Cálculos
        const icmsOrigem = (valor * aliqOrig) / 100;
        const icmsDestino = (valor * aliqDest) / 100;
        const diferenca = icmsDestino - icmsOrigem;

        const valorOrigem = (diferenca * partilha.origem) / 100;
        const valorDestino = (diferenca * partilha.destino) / 100;

        setResult({
            valor,
            icmsOrigem,
            icmsDestino,
            diferenca,
            valorOrigem,
            valorDestino,
            percOrigem: partilha.origem,
            percDestino: partilha.destino,
            ano,
            hash: `PARTILHA-${Date.now().toString(36).toUpperCase()}`
        });
    };

    const fmt = (v: number) => new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(v);

    return (
        <ToolLayout
            title="Partilha de DIFAL"
            description="Cálculo da partilha do DIFAL entre estados de origem e destino conforme EC 87/2015."
            onBack={onBack}
        >
            <div className="grid md:grid-cols-12 gap-8">

                <div className="md:col-span-5 space-y-6">
                    <Card title="Dados da Operação">
                        <div className="space-y-4">

                            <FormInput
                                label="Valor da Operação (R$)"
                                name="valorOperacao"
                                type="number"
                                placeholder="10000.00"
                                value={form.valorOperacao}
                                onChange={handleChange}
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <FormInput
                                    label="Alíquota Origem (%)"
                                    name="aliqOrigem"
                                    type="number"
                                    placeholder="18"
                                    value={form.aliqOrigem}
                                    onChange={handleChange}
                                />
                                <FormInput
                                    label="Alíquota Destino (%)"
                                    name="aliqDestino"
                                    type="number"
                                    placeholder="18"
                                    value={form.aliqDestino}
                                    onChange={handleChange}
                                />
                            </div>

                            <FormSelect
                                label="Ano da Operação"
                                name="ano"
                                value={form.ano}
                                onChange={handleChange}
                            >
                                {CRONOGRAMA_PARTILHA.map(p => (
                                    <option key={p.ano} value={p.ano}>
                                        {p.ano} - Origem {p.origem}% / Destino {p.destino}%
                                    </option>
                                ))}
                            </FormSelect>

                            <div className="pt-2">
                                <Button onClick={calculate} className="w-full">
                                    <Calculator size={18} /> Calcular Partilha
                                </Button>
                            </div>

                        </div>
                    </Card>

                    <Card title="Sobre a EC 87/2015">
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            A <strong>Emenda Constitucional 87/2015</strong> instituiu a partilha gradual do DIFAL
                            entre os estados de origem e destino, até que em 2019 o recolhimento passou a ser
                            100% para o estado de destino.
                        </p>
                    </Card>
                </div>

                <div className="md:col-span-7 space-y-6">
                    {result ? (
                        <div className="animate-fade-in space-y-6">

                            <div className="grid grid-cols-2 gap-4">
                                <ResultCard
                                    label="ICMS Origem"
                                    value={fmt(result.icmsOrigem)}
                                    subtext={`Alíquota: ${form.aliqOrigem}%`}
                                    color="blue"
                                />
                                <ResultCard
                                    label="ICMS Destino"
                                    value={fmt(result.icmsDestino)}
                                    subtext={`Alíquota: ${form.aliqDestino}%`}
                                    color="purple"
                                />
                            </div>

                            <ResultCard
                                label="Diferença (DIFAL)"
                                value={fmt(result.diferenca)}
                                subtext="Diferencial de alíquotas"
                                highlight
                                color="emerald"
                            />

                            {/* Partilha */}
                            <Card title={`Partilha ${result.ano}`}>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                                        <div>
                                            <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase">Estado Origem</div>
                                            <div className="text-2xl font-extrabold text-blue-900 dark:text-blue-100">{fmt(result.valorOrigem)}</div>
                                            <div className="text-xs text-blue-700 dark:text-blue-300 mt-1">{result.percOrigem}% do DIFAL</div>
                                        </div>
                                        <GitFork className="text-blue-400" size={32} />
                                    </div>

                                    <div className="flex justify-between items-center p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                                        <div>
                                            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase">Estado Destino</div>
                                            <div className="text-2xl font-extrabold text-emerald-900 dark:text-emerald-100">{fmt(result.valorDestino)}</div>
                                            <div className="text-xs text-emerald-700 dark:text-emerald-300 mt-1">{result.percDestino}% do DIFAL</div>
                                        </div>
                                        <GitFork className="text-emerald-400 rotate-180" size={32} />
                                    </div>
                                </div>
                            </Card>

                            <CalculationMemory
                                hash={result.hash}
                                steps={[
                                    {
                                        label: 'Valor da Operação',
                                        formula: 'Base de cálculo',
                                        value: fmt(result.valor)
                                    },
                                    {
                                        label: 'ICMS Estado Origem',
                                        formula: `${fmt(result.valor)} × ${form.aliqOrigem}%`,
                                        value: fmt(result.icmsOrigem)
                                    },
                                    {
                                        label: 'ICMS Estado Destino',
                                        formula: `${fmt(result.valor)} × ${form.aliqDestino}%`,
                                        value: fmt(result.icmsDestino)
                                    },
                                    {
                                        label: 'Diferencial (DIFAL)',
                                        formula: `${fmt(result.icmsDestino)} - ${fmt(result.icmsOrigem)}`,
                                        value: fmt(result.diferenca)
                                    },
                                    {
                                        label: `Partilha Origem (${result.percOrigem}%)`,
                                        formula: `${fmt(result.diferenca)} × ${result.percOrigem}%`,
                                        value: fmt(result.valorOrigem)
                                    },
                                    {
                                        label: `Partilha Destino (${result.percDestino}%)`,
                                        formula: `${fmt(result.diferenca)} × ${result.percDestino}%`,
                                        value: fmt(result.valorDestino)
                                    },
                                ]}
                            />

                        </div>
                    ) : (
                        <div className="h-full bg-slate-50 dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center text-slate-400 p-10 text-center">
                            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                                <GitFork size={32} />
                            </div>
                            <p className="font-medium">Informe os dados ao lado para calcular a partilha do DIFAL.</p>
                            <p className="text-xs mt-2 opacity-75">A partir de 2019, todo o DIFAL é devido ao estado de destino.</p>
                        </div>
                    )}
                </div>

            </div>
        </ToolLayout>
    );
}
