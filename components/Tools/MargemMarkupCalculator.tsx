import React, { useState } from 'react';
import { ToolLayout, Card, Button, FormInput, FormSelect, ResultCard, CalculationMemory } from '../ToolShared';
import { Calculator, Percent } from 'lucide-react';

export default function MargemMarkupCalculator({ onBack }: { onBack: () => void }) {
    const [form, setForm] = useState({
        tipo: 'margem-para-markup',
        custo: '',
        percentual: ''
    });
    const [result, setResult] = useState<any>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setResult(null);
    };

    const calculate = () => {
        const custo = parseFloat(form.custo);
        const perc = parseFloat(form.percentual);

        if (!custo || !perc) {
            alert('Preencha todos os campos');
            return;
        }

        let precoVenda = 0, margem = 0, markup = 0;

        if (form.tipo === 'margem-para-markup') {
            // Margem → Markup
            markup = (perc / (100 - perc)) * 100;
            precoVenda = custo * (1 + markup / 100);
            margem = perc;
        } else if (form.tipo === 'markup-para-margem') {
            // Markup → Margem
            margem = (perc / (100 + perc)) * 100;
            precoVenda = custo * (1 + perc / 100);
            markup = perc;
        } else if (form.tipo === 'preco-para-margem') {
            // Preço Venda → Margem e Markup
            precoVenda = perc; // Reutilizando campo
            margem = ((precoVenda - custo) / precoVenda) * 100;
            markup = ((precoVenda - custo) / custo) * 100;
        }

        setResult({
            custo,
            precoVenda,
            margem,
            markup,
            lucro: precoVenda - custo,
            hash: `MARGEM-${Date.now().toString(36).toUpperCase()}`
        });
    };

    const fmt = (v: number) => new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(v);

    return (
        <ToolLayout
            title="Margem e Markup"
            description="Calcule margem de lucro, markup e preço de venda"
            onBack={onBack}
        >
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <Card title="Cálculo">
                        <div className="space-y-4">
                            <FormSelect
                                label="Tipo de Cálculo"
                                name="tipo"
                                value={form.tipo}
                                onChange={handleChange}
                            >
                                <option value="margem-para-markup">Margem → Markup</option>
                                <option value="markup-para-margem">Markup → Margem</option>
                                <option value="preco-para-margem">Preço Venda → Margem/Markup</option>
                            </FormSelect>

                            <FormInput
                                label="Custo do Produto (R$)"
                                name="custo"
                                type="number"
                                placeholder="100.00"
                                value={form.custo}
                                onChange={handleChange}
                            />

                            <FormInput
                                label={form.tipo === 'preco-para-margem' ? 'Preço de Venda (R$)' : 'Percentual (%)'}
                                name="percentual"
                                type="number"
                                placeholder={form.tipo === 'preco-para-margem' ? '150.00' : '30'}
                                value={form.percentual}
                                onChange={handleChange}
                            />

                            <Button onClick={calculate} className="w-full">
                                <Calculator size={18} /> Calcular
                            </Button>
                        </div>
                    </Card>

                    <Card title="Fórmulas">
                        <div className="text-xs text-slate-600 dark:text-slate-400 space-y-2 font-mono">
                            <div><strong>Margem:</strong> (Venda - Custo) / Venda × 100</div>
                            <div><strong>Markup:</strong> (Venda - Custo) / Custo × 100</div>
                            <div><strong>Preço:</strong> Custo × (1 + Markup/100)</div>
                        </div>
                    </Card>
                </div>

                <div className="space-y-6">
                    {result ? (
                        <div className="animate-fade-in space-y-6">
                            <ResultCard label="Preço de Venda" value={fmt(result.precoVenda)} color="emerald" highlight />

                            <div className="grid grid-cols-2 gap-4">
                                <ResultCard label="Margem de Lucro" value={`${result.margem.toFixed(2)}%`} color="blue" />
                                <ResultCard label="Markup" value={`${result.markup.toFixed(2)}%`} color="purple" />
                            </div>

                            <ResultCard label="Lucro Bruto" value={fmt(result.lucro)} color="amber" />

                            <CalculationMemory
                                hash={result.hash}
                                steps={[
                                    { label: 'Custo', formula: 'Base', value: fmt(result.custo) },
                                    { label: 'Margem', formula: '(Venda - Custo) / Venda', value: `${result.margem.toFixed(2)}%` },
                                    { label: 'Markup', formula: '(Venda - Custo) / Custo', value: `${result.markup.toFixed(2)}%` },
                                    { label: 'Preço Venda', formula: 'Custo + Lucro', value: fmt(result.precoVenda) },
                                ]}
                            />
                        </div>
                    ) : (
                        <div className="h-full bg-slate-50 dark:bg-slate-900 rounded-2xl border-dashed border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center p-10 text-center text-slate-400">
                            <div>
                                <Percent size={48} className="mx-auto mb-4 opacity-50" />
                                <p>Preencha os dados para calcular</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </ToolLayout>
    );
}
