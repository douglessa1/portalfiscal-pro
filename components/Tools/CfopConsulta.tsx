import React, { useState } from 'react';
import { ToolLayout, Card, FormInput } from '../ToolShared';
import { Search, Package } from 'lucide-react';

// Principais CFOPs (versão resumida - expandir conforme necessário)
const CFOPS = [
    { codigo: '5101', descricao: 'Venda de produção do estabelecimento', tipo: 'Saída Estadual', natureza: 'Venda' },
    { codigo: '5102', descricao: 'Venda de mercadoria adquirida ou recebida de terceiros', tipo: 'Saída Estadual', natureza: 'Venda' },
    { codigo: '5103', descricao: 'Venda de produção do estabelecimento, efetuada fora do estabelecimento', tipo: 'Saída Estadual', natureza: 'Venda' },
    { codigo: '5104', descricao: 'Venda de mercadoria adquirida ou recebida de terceiros, efetuada fora do estabelecimento', tipo: 'Saída Estadual', natureza: 'Venda' },
    { codigo: '5405', descricao: 'Venda de mercadoria adquirida ou recebida de terceiros em operação com mercadoria sujeita ao regime de substituição tributária, na condição de contribuinte substituto', tipo: 'Saída Estadual', natureza: 'Venda ST' },
    { codigo: '6101', descricao: 'Venda de produção do estabelecimento', tipo: 'Saída Interestadual', natureza: 'Venda' },
    { codigo: '6102', descricao: 'Venda de mercadoria adquirida ou recebida de terceiros', tipo: 'Saída Interestadual', natureza: 'Venda' },
    { codigo: '6404', descricao: 'Venda de mercadoria sujeita ao regime de substituição tributária, cujo imposto já tenha sido retido anteriormente', tipo: 'Saída Interestadual', natureza: 'Venda ST' },
    { codigo: '1101', descricao: 'Compra para industrialização ou produção rural', tipo: 'Entrada Estadual', natureza: 'Compra' },
    { codigo: '1102', descricao: 'Compra para comercialização', tipo: 'Entrada Estadual', natureza: 'Compra' },
    { codigo: '1403', descricao: 'Compra para comercialização em operação com mercadoria sujeita ao regime de substituição tributária', tipo: 'Entrada Estadual', natureza: 'Compra ST' },
    { codigo: '2101', descricao: 'Compra para industrialização ou produção rural', tipo: 'Entrada Interestadual', natureza: 'Compra' },
    { codigo: '2102', descricao: 'Compra para comercialização', tipo: 'Entrada Interestadual', natureza: 'Compra' },
    { codigo: '2403', descricao: 'Compra para comercialização em operação com mercadoria sujeita ao regime de substituição tributária', tipo: 'Entrada Interestadual', natureza: 'Compra ST' },
    { codigo: '5949', descricao: 'Outra saída de mercadoria ou prestação de serviço não especificado', tipo: 'Saída Estadual', natureza: 'Outros' },
    { codigo: '6949', descricao: 'Outra saída de mercadoria ou prestação de serviço não especificado', tipo: 'Saída Interestadual', natureza: 'Outros' },
    { codigo: '5202', descricao: 'Devolução de compra para comercialização', tipo: 'Saída Estadual', natureza: 'Devolução' },
    { codigo: '6202', descricao: 'Devolução de compra para comercialização', tipo: 'Saída Interestadual', natureza: 'Devolução' },
    { codigo: '1202', descricao: 'Devolução de venda de mercadoria adquirida ou recebida de terceiros', tipo: 'Entrada Estadual', natureza: 'Devolução' },
    { codigo: '2202', descricao: 'Devolução de venda de mercadoria adquirida ou recebida de terceiros', tipo: 'Entrada Interestadual', natureza: 'Devolução' },
];

export default function CfopConsulta({ onBack }: { onBack: () => void }) {
    const [busca, setBusca] = useState('');
    const [filtroTipo, setFiltroTipo] = useState('todos');

    const cfopsFiltrados = CFOPS.filter(cfop => {
        const matchBusca = busca === '' ||
            cfop.codigo.includes(busca) ||
            cfop.descricao.toLowerCase().includes(busca.toLowerCase()) ||
            cfop.natureza.toLowerCase().includes(busca.toLowerCase());

        const matchTipo = filtroTipo === 'todos' || cfop.tipo === filtroTipo;

        return matchBusca && matchTipo;
    });

    const tipos = ['todos', ...Array.from(new Set(CFOPS.map(c => c.tipo)))];

    return (
        <ToolLayout
            title="Consulta CFOP"
            description="Consulte os Códigos Fiscais de Operações e Prestações mais utilizados"
            onBack={onBack}
        >
            <div className="space-y-6">

                {/* Filtros */}
                <Card title="Buscar CFOP">
                    <div className="grid md:grid-cols-2 gap-4">
                        <FormInput
                            label="Buscar por código ou descrição"
                            placeholder="Ex: 5102, venda, devolução..."
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                            icon={<Search size={18} />}
                        />
                        <div>
                            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">Tipo de Operação</label>
                            <select
                                value={filtroTipo}
                                onChange={(e) => setFiltroTipo(e.target.value)}
                                className="w-full h-11 px-3 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
                            >
                                {tipos.map(tipo => (
                                    <option key={tipo} value={tipo}>
                                        {tipo === 'todos' ? 'Todos os Tipos' : tipo}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </Card>

                {/* Resultados */}
                <Card title={`Resultados (${cfopsFiltrados.length})`}>
                    {cfopsFiltrados.length === 0 ? (
                        <div className="text-center py-12 text-slate-400">
                            <Package size={48} className="mx-auto mb-4 opacity-50" />
                            <p>Nenhum CFOP encontrado com os filtros selecionados</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {cfopsFiltrados.map((cfop, idx) => (
                                <div
                                    key={idx}
                                    className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                                                {cfop.codigo}
                                            </div>
                                            <div>
                                                <div className="px-2 py-0.5 text-xs font-bold rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 inline-block">
                                                    {cfop.natureza}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-xs text-slate-500 dark:text-slate-400">
                                            {cfop.tipo}
                                        </div>
                                    </div>
                                    <p className="text-sm text-slate-700 dark:text-slate-300">
                                        {cfop.descricao}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </Card>

                {/* Info */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 text-sm text-blue-800 dark:text-blue-200">
                    <strong>ℹ️ Sobre CFOPs:</strong> O CFOP identifica a natureza da circulação de mercadorias ou prestação de serviços.
                    Primeiro dígito: 1/2 (entrada), 5/6 (saída), 3 (serviços).
                    Estados diferentes: 2 ou 6. Mesmo estado: 1 ou 5.
                </div>

            </div>
        </ToolLayout>
    );
}
