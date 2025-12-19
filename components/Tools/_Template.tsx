import React, { useState } from 'react';
import { ToolLayout, Card, Button, FormInput, FormSelect, ResultCard, CalculationMemory } from '../ToolShared';
import { Calculator, RotateCcw } from 'lucide-react';

// Template base para migração de ferramentas fiscais
// Baseado em DifalCalculator.tsx e padrões do Portal Pro

export default function ToolTemplate({ onBack }: { onBack: () => void }) {
    // Estado do formulário
    const [form, setForm] = useState({
        campo1: '',
        campo2: '',
        campo3: ''
    });

    // Estado do resultado
    const [result, setResult] = useState<any>(null);

    // Handler de mudanças no formulário
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setResult(null); // Reset result on change
    };

    // Função de cálculo (MANTER LÓGICA ORIGINAL)
    const calculate = () => {
        const valor1 = parseFloat(form.campo1);
        const valor2 = parseFloat(form.campo2);

        if (!valor1 || !valor2) {
            alert('Preencha todos os campos obrigatórios');
            return;
        }

        // LÓGICA DE CÁLCULO AQUI
        // Copiar do arquivo original e adaptar

        const resultado = valor1 + valor2; // Exemplo

        setResult({
            resultado,
            hash: `HASH-${Date.now().toString(36).toUpperCase()}`
        });
    };

    // Formatadores
    const fmt = (v: number) => new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(v);

    const fmtPercent = (v: number) => `${v.toFixed(2)}%`;

    return (
        <ToolLayout
            title="Título da Ferramenta"
            description="Descrição clara e concisa da funcionalidade."
            onBack={onBack}
        >
            <div className="grid md:grid-cols-12 gap-8">

                {/* Coluna de Inputs - 5 colunas */}
                <div className="md:col-span-5 space-y-6">
                    <Card title="Dados da Operação">
                        <div className="space-y-4">

                            <FormInput
                                label="Campo 1 (R$)"
                                name="campo1"
                                type="number"
                                placeholder="0.00"
                                value={form.campo1}
                                onChange={handleChange}
                            />

                            <FormInput
                                label="Campo 2 (%)"
                                name="campo2"
                                type="number"
                                placeholder="0"
                                value={form.campo2}
                                onChange={handleChange}
                            />

                            <FormSelect
                                label="Campo 3"
                                name="campo3"
                                value={form.campo3}
                                onChange={handleChange}
                            >
                                <option value="">Selecione...</option>
                                <option value="opcao1">Opção 1</option>
                                <option value="opcao2">Opção 2</option>
                            </FormSelect>

                            <div className="pt-2">
                                <Button onClick={calculate} className="w-full">
                                    <Calculator size={18} /> Calcular
                                </Button>
                            </div>

                        </div>
                    </Card>

                    {/* Card adicional se necessário */}
                    <Card title="Informações">
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Informações adicionais ou ajuda contextual podem ficar aqui.
                        </p>
                    </Card>
                </div>

                {/* Coluna de Resultados - 7 colunas */}
                <div className="md:col-span-7 space-y-6">
                    {result ? (
                        <div className="animate-fade-in space-y-6">

                            {/* Resultados em Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <ResultCard
                                    label="Resultado 1"
                                    value={fmt(result.resultado)}
                                    color="blue"
                                />
                                <ResultCard
                                    label="Resultado 2"
                                    value={fmt(result.resultado)}
                                    color="amber"
                                />
                            </div>

                            {/* Resultado Principal (Destaque) */}
                            <ResultCard
                                label="Total a Recolher"
                                value={fmt(result.resultado)}
                                subtext="Informação adicional sobre o resultado"
                                highlight
                                color="emerald"
                            />

                            {/* Memória de Cálculo Auditável */}
                            <CalculationMemory
                                hash={result.hash}
                                steps={[
                                    {
                                        label: 'Passo 1',
                                        formula: 'Descrição do cálculo',
                                        value: fmt(100)
                                    },
                                    {
                                        label: 'Passo 2',
                                        formula: 'Fórmula aplicada',
                                        value: fmt(200)
                                    },
                                    {
                                        label: 'Resultado Final',
                                        formula: 'Passo 1 + Passo 2',
                                        value: fmt(result.resultado)
                                    },
                                ]}
                            />

                        </div>
                    ) : (
                        // Estado vazio
                        <div className="h-full bg-slate-50 dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center text-slate-400 p-10 text-center">
                            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                                <Calculator size={32} />
                            </div>
                            <p className="font-medium">Preencha os dados ao lado para simular o cálculo.</p>
                        </div>
                    )}
                </div>

            </div>
        </ToolLayout>
    );
}
