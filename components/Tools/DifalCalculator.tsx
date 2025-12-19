import React, { useState } from 'react';
import { ToolLayout, Card, Button, FormInput, FormSelect, ResultCard, CalculationMemory } from '../ToolShared';
import { Calculator, RotateCcw } from 'lucide-react';

const ESTADOS = [
    { uf: 'AC', aliq: 17 }, { uf: 'AL', aliq: 17 }, { uf: 'AM', aliq: 18 }, { uf: 'AP', aliq: 18 },
    { uf: 'BA', aliq: 18 }, { uf: 'CE', aliq: 18 }, { uf: 'DF', aliq: 18 }, { uf: 'ES', aliq: 17 },
    { uf: 'GO', aliq: 17 }, { uf: 'MA', aliq: 18 }, { uf: 'MG', aliq: 18 }, { uf: 'MS', aliq: 17 },
    { uf: 'MT', aliq: 17 }, { uf: 'PA', aliq: 17 }, { uf: 'PB', aliq: 18 }, { uf: 'PE', aliq: 18 },
    { uf: 'PI', aliq: 18 }, { uf: 'PR', aliq: 19 }, { uf: 'RJ', aliq: 20 }, { uf: 'RN', aliq: 18 },
    { uf: 'RO', aliq: 17.5 }, { uf: 'RR', aliq: 17 }, { uf: 'RS', aliq: 17 }, { uf: 'SC', aliq: 17 },
    { uf: 'SE', aliq: 18 }, { uf: 'SP', aliq: 18 }, { uf: 'TO', aliq: 18 }
];

export default function DifalCalculator({ onBack }: { onBack: () => void }) {
    const [form, setForm] = useState({
        valor: '',
        origem: 'SP',
        destino: 'RJ',
        fcp: '0'
    });
    const [result, setResult] = useState<any>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setResult(null); // Reset result on change
    };

    const calculate = () => {
        const valor = parseFloat(form.valor);
        const ufOrigem = ESTADOS.find(e => e.uf === form.origem);
        const ufDestino = ESTADOS.find(e => e.uf === form.destino);
        const fcpRate = parseFloat(form.fcp);

        if (!valor || !ufOrigem || !ufDestino) return;

        // Regra Interestadual (Simplificada)
        // Sul/Sudeste (exceto ES) p/ Norte/Nordeste/CO/ES = 7%
        // Resto = 12%
        // Importados (4%) - não implementado neste demo simples
        const sulSudeste = ['MG', 'PR', 'RJ', 'RS', 'SC', 'SP'];
        let aliqInter = 12;
        
        if (sulSudeste.includes(form.origem) && !sulSudeste.includes(form.destino)) {
            aliqInter = 7;
        }

        const difalRate = ufDestino.aliq - aliqInter;
        const valorDifal = valor * (difalRate / 100);
        const valorFcp = valor * (fcpRate / 100);
        const total = valorDifal + valorFcp;

        setResult({
            aliqInter,
            aliqDest: ufDestino.aliq,
            difalRate,
            valorDifal,
            valorFcp,
            total,
            hash: `DIFAL-${Date.now().toString(36).toUpperCase()}`
        });
    };

    const fmt = (v: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);

    return (
        <ToolLayout 
            title="Calculadora DIFAL" 
            description="Cálculo do Diferencial de Alíquota (EC 87/2015) para operações interestaduais a consumidor final."
            onBack={onBack}
        >
            <div className="grid md:grid-cols-12 gap-8">
                {/* Inputs */}
                <div className="md:col-span-5 space-y-6">
                    <Card title="Dados da Operação">
                        <div className="space-y-4">
                            <FormInput 
                                label="Valor da Nota Fiscal (R$)" 
                                name="valor" 
                                type="number" 
                                placeholder="1000.00" 
                                value={form.valor} 
                                onChange={handleChange} 
                            />
                            
                            <div className="grid grid-cols-2 gap-4">
                                <FormSelect label="UF Origem" name="origem" value={form.origem} onChange={handleChange}>
                                    {ESTADOS.map(e => <option key={e.uf} value={e.uf}>{e.uf}</option>)}
                                </FormSelect>
                                <FormSelect label="UF Destino" name="destino" value={form.destino} onChange={handleChange}>
                                    {ESTADOS.map(e => <option key={e.uf} value={e.uf}>{e.uf}</option>)}
                                </FormSelect>
                            </div>

                            <FormInput 
                                label="Fundo Combate Pobreza (%)" 
                                name="fcp" 
                                type="number" 
                                placeholder="0" 
                                value={form.fcp} 
                                onChange={handleChange} 
                            />

                            <div className="pt-2">
                                <Button onClick={calculate} className="w-full">
                                    <Calculator size={18} /> Calcular DIFAL
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Results */}
                <div className="md:col-span-7 space-y-6">
                    {result ? (
                        <div className="animate-fade-in space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <ResultCard label="Valor DIFAL" value={fmt(result.valorDifal)} color="blue" />
                                <ResultCard label="FCP (Fundo Pobreza)" value={fmt(result.valorFcp)} color="amber" />
                            </div>
                            
                            <ResultCard 
                                label="Total a Recolher (GNRE)" 
                                value={fmt(result.total)} 
                                subtext={`Vencimento: Antes da saída da mercadoria`}
                                highlight 
                                color="emerald"
                            />

                            <CalculationMemory 
                                hash={result.hash}
                                steps={[
                                    { label: 'Base de Cálculo', formula: 'Valor da Operação', value: fmt(parseFloat(form.valor)) },
                                    { label: 'Alíquota Interestadual', formula: `Regra entre ${form.origem} e ${form.destino}`, value: `${result.aliqInter}%` },
                                    { label: 'Alíquota Interna Destino', formula: `Legislação ${form.destino}`, value: `${result.aliqDest}%` },
                                    { label: 'Diferencial', formula: `${result.aliqDest}% - ${result.aliqInter}%`, value: `${result.difalRate}%` },
                                    { label: 'Cálculo FCP', formula: `${fmt(parseFloat(form.valor))} x ${form.fcp}%`, value: fmt(result.valorFcp) },
                                ]}
                            />
                        </div>
                    ) : (
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