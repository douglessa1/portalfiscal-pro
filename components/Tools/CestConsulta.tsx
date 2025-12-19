import React, { useState } from 'react';
import { ToolLayout, Card, FormInput } from '../ToolShared';
import { Search, Hash } from 'lucide-react';

// CESTs principais (versão resumida - expandir conforme necessário)
const CESTS = [
    { codigo: '01.001.00', ncm: '2203.00.00', descricao: 'Cervejas de malte, inclusive chope', segmento: 'Bebidas alcoólicas' },
    { codigo: '01.002.00', ncm: '2204 a 2206', descricao: 'Vinhos, sidras, hidromel e outras bebidas fermentadas', segmento: 'Bebidas alcoólicas' },
    { codigo: '01.003.00', ncm: '2207 e 2208', descricao: 'Aguardentes, licores e outras bebidas destiladas', segmento: 'Bebidas alcoólicas' },
    { codigo: '02.001.00', ncm: '2401', descricao: 'Charutos, cigarrilhas, cigarros de tabaco ou dos seus sucedâneos', segmento: 'Cigarros e produtos derivados do fumo' },
    { codigo: '03.001.00', ncm: '2710.12', descricao: 'Gasolina automotiva', segmento: 'Combustíveis e lubrificantes' },
    { codigo: '03.002.00', ncm: '2710.19.1', descricao: 'Óleo diesel', segmento: 'Combustíveis e lubrificantes' },
    { codigo: '03.003.00', ncm: '2710.12.5', descricao: 'Gasolina de aviação', segmento: 'Combustíveis e lubrificantes' },
    { codigo: '03.004.00', ncm: '2710.19.2', descricao: 'Querosene de aviação', segmento: 'Combustíveis e lubrificantes' },
    { codigo: '03.005.00', ncm: '2711.1', descricao: 'Gás liquefeito de petróleo (GLP)', segmento: 'Combustíveis e lubrificantes' },
    { codigo: '06.001.00', ncm: '3303.00', descricao: 'Perfumes (extratos)', segmento: 'Produtos de perfumaria e de higiene pessoal e cosméticos' },
    { codigo: '06.002.00', ncm: '3304.10.00', descricao: 'Produtos de maquiagem para os lábios', segmento: 'Produtos de perfumaria e de higiene pessoal e cosméticos' },
    { codigo: '06.003.00', ncm: '3304.20.10', descricao: 'Sombra, delineador, lápis para sobrancelhas e rímel', segmento: 'Produtos de perfumaria e de higiene pessoal e cosméticos' },
    { codigo: '06.004.00', ncm: '3305.10.00', descricao: 'Xampus para o cabelo', segmento: 'Produtos de perfumaria e de higiene pessoal e cosméticos' },
    { codigo: '06.005.00', ncm: '3305.20.00', descricao: 'Preparações para ondulação ou alisamento, permanentes, dos cabelos', segmento: 'Produtos de perfumaria e de higiene pessoal e cosméticos' },
    { codigo: '06.006.00', ncm: '3307.10.00', descricao: 'Preparações para barbear (antes, durante ou após)', segmento: 'Produtos de perfumaria e de higiene pessoal e cosméticos' },
    { codigo: '06.007.00', ncm: '3307.20', descricao: 'Desodorantes (desodorizantes) corporais e antiperspirantes, líquidos', segmento: 'Produtos de perfumaria e de higiene pessoal e cosméticos' },
    { codigo: '17.001.00', ncm: '8471.30', descricao: 'Máquinas automáticas para processamento de dados, portáteis (notebooks, tablets)', segmento: 'Produtos de informática e tecnologia' },
    { codigo: '17.002.00', ncm: '8471.41', descricao: 'Unidades de processamento, de pequena capacidade', segmento: 'Produtos de informática e tecnologia' },
    { codigo: '17.003.00', ncm: '8471.50', descricao: 'Unidades de processamento, exceto as das subposições 8471.41 ou 8471.49', segmento: 'Produtos de informática e tecnologia' },
    { codigo: '21.001.00', ncm: '8504.40.10', descricao: 'Carregadores de acumuladores', segmento: 'Materiais elétricos' },
];

export default function CestConsulta({ onBack }: { onBack: () => void }) {
    const [busca, setBusca] = useState('');

    const cestsFiltrados = CESTS.filter(cest => {
        if (busca === '') return true;

        return cest.codigo.includes(busca) ||
            cest.ncm.includes(busca) ||
            cest.descricao.toLowerCase().includes(busca.toLowerCase()) ||
            cest.segmento.toLowerCase().includes(busca.toLowerCase());
    });

    return (
        <ToolLayout
            title="Consulta CEST"
            description="Consulte os Códigos Especificadores da Substituição Tributária"
            onBack={onBack}
        >
            <div className="space-y-6">

                {/* Busca */}
                <Card title="Buscar CEST">
                    <FormInput
                        label="Buscar por código, NCM ou descrição"
                        placeholder="Ex: 01.001.00, 2203, cerveja..."
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                        icon={<Search size={18} />}
                    />
                </Card>

                {/* Resultados */}
                <Card title={`Resultados (${cestsFiltrados.length})`}>
                    {cestsFiltrados.length === 0 ? (
                        <div className="text-center py-12 text-slate-400">
                            <Hash size={48} className="mx-auto mb-4 opacity-50" />
                            <p>Nenhum CEST encontrado</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-slate-100 dark:bg-slate-800">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">CEST</th>
                                        <th className="px-4 py-3 text-left text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">NCM</th>
                                        <th className="px-4 py-3 text-left text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">Descrição</th>
                                        <th className="px-4 py-3 text-left text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">Segmento</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                    {cestsFiltrados.map((cest, idx) => (
                                        <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                            <td className="px-4 py-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                                                {cest.codigo}
                                            </td>
                                            <td className="px-4 py-3 font-mono text-slate-600 dark:text-slate-400">
                                                {cest.ncm}
                                            </td>
                                            <td className="px-4 py-3 text-slate-900 dark:text-white">
                                                {cest.descricao}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="px-2 py-1 text-xs font-medium rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                                                    {cest.segmento}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </Card>

                {/* Info */}
                <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-4 text-sm text-purple-800 dark:text-purple-200">
                    <strong>ℹ️ Sobre CEST:</strong> O Código Especificador da Substituição Tributária identifica mercadorias sujeitas ao regime de ST.
                    É obrigatório na emissão de NF-e para produtos listados no Convênio ICMS 92/2015.
                </div>

            </div>
        </ToolLayout>
    );
}
