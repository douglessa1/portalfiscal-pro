import React, { useState } from 'react';
import { Card, Button } from './ToolShared';
import { FileText, Wallet, Search, Filter, ArrowUpRight, ArrowDownLeft, Download, CreditCard, LayoutGrid, PieChart, Landmark, ChevronDown, Plus, X } from 'lucide-react';

interface FinancialModuleProps {
    currentCompany: string;
}

export const FinancialModule: React.FC<FinancialModuleProps> = ({ currentCompany }) => {
    const [activeView, setActiveView] = useState<'overview' | 'extract' | 'pay' | 'receive'>('overview');
    const [selectedAccount, setSelectedAccount] = useState<string>('inter');
    const [showOperationModal, setShowOperationModal] = useState(false);
    const isMatriz = currentCompany.includes('Matriz');

    // Banking Interface Layout
    return (
        <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-8rem)] animate-fade-in-up">
            
            {/* 1. Internal Sidebar (Banking Menu) */}
            <div className="w-full md:w-64 flex-shrink-0 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col p-4">
                <div className="mb-6 px-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Saldo Total</p>
                    <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        R$ {isMatriz ? '190.200,50' : '37.450,00'}
                    </h2>
                </div>
                
                <div className="space-y-1 flex-1">
                    <NavButton icon={LayoutGrid} label="Visão Geral" active={activeView === 'overview'} onClick={() => setActiveView('overview')} />
                    <NavButton icon={FileText} label="Extrato & Notas" active={activeView === 'extract'} onClick={() => setActiveView('extract')} />
                    <div className="my-4 border-t border-slate-100 dark:border-slate-700"></div>
                    <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Contas</p>
                    <NavButton icon={Landmark} label="Banco Inter" sub="Principal" active={selectedAccount === 'inter'} onClick={() => setSelectedAccount('inter')} />
                    <NavButton icon={Landmark} label="Nubank" sub="Reserva" active={selectedAccount === 'nubank'} onClick={() => setSelectedAccount('nubank')} />
                </div>

                <button onClick={() => setShowOperationModal(true)} className="w-full mt-4 py-3 bg-emerald-600 text-white rounded-xl font-bold text-sm shadow-lg hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2">
                    <Plus size={16} /> Nova Operação
                </button>
            </div>

            {/* 2. Main Content Area */}
            <div className="flex-1 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col">
                
                {/* Header Toolbar */}
                <div className="h-16 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between px-6 bg-slate-50/50 dark:bg-slate-900/50">
                    <h2 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        {activeView === 'overview' ? 'Fluxo de Caixa' : 'Extrato Detalhado'}
                        <ChevronDown size={16} className="text-slate-400" />
                    </h2>
                    <div className="flex items-center gap-3">
                         <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                            <input 
                                type="text" 
                                placeholder="Buscar transação..." 
                                className="pl-9 pr-4 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                         </div>
                         <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-500 transition-colors">
                             <Filter size={18} />
                         </button>
                         <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-500 transition-colors">
                             <Download size={18} />
                         </button>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 scroll-smooth custom-scrollbar">
                    
                    {activeView === 'overview' ? (
                        <div className="space-y-8">
                            {/* Charts Area - Very Visual */}
                            <div className="h-64 w-full bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-700 p-6 flex items-end justify-between gap-2 relative">
                                <div className="absolute top-4 left-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Entradas vs Saídas (Últimos 30 dias)</div>
                                {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95].map((h, i) => (
                                    <div key={i} className="flex-1 flex gap-1 h-full items-end">
                                        <div style={{ height: `${h}%` }} className="flex-1 bg-emerald-500 rounded-t opacity-80 hover:opacity-100 transition-all"></div>
                                        <div style={{ height: `${h * 0.6}%` }} className="flex-1 bg-slate-300 dark:bg-slate-600 rounded-t opacity-80 hover:opacity-100 transition-all"></div>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="p-6 rounded-xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900">
                                    <div className="flex items-center gap-3 mb-2 text-emerald-700 dark:text-emerald-400">
                                        <div className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm"><ArrowUpRight size={20} /></div>
                                        <span className="font-bold">Receitas do Mês</span>
                                    </div>
                                    <div className="text-2xl font-extrabold text-slate-900 dark:text-white">R$ {isMatriz ? '54.200,00' : '12.400,00'}</div>
                                    <div className="text-xs text-emerald-600 font-medium mt-1">+12% vs mês anterior</div>
                                </div>
                                <div className="p-6 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900">
                                    <div className="flex items-center gap-3 mb-2 text-red-700 dark:text-red-400">
                                        <div className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm"><ArrowDownLeft size={20} /></div>
                                        <span className="font-bold">Despesas do Mês</span>
                                    </div>
                                    <div className="text-2xl font-extrabold text-slate-900 dark:text-white">R$ {isMatriz ? '32.100,00' : '8.100,00'}</div>
                                    <div className="text-xs text-slate-500 font-medium mt-1">Dentro do orçamento</div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-slate-500 uppercase bg-slate-50 dark:bg-slate-900/50 sticky top-0">
                                    <tr>
                                        <th className="px-4 py-3 rounded-l-lg">Data</th>
                                        <th className="px-4 py-3">Descrição</th>
                                        <th className="px-4 py-3">Categoria</th>
                                        <th className="px-4 py-3">Doc</th>
                                        <th className="px-4 py-3 text-right rounded-r-lg">Valor</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                                    {[
                                        { date: '16/10', desc: 'Recebimento NF 10240', cat: 'Vendas', doc: 'NFe', val: 8200, type: 'in' },
                                        { date: '16/10', desc: 'Papelaria Central', cat: 'Mat. Escritório', doc: 'NFe', val: -450, type: 'out' },
                                        { date: '16/10', desc: 'Pgto DAS Simples', cat: 'Impostos', doc: 'Guia', val: -2340.50, type: 'out' },
                                        { date: '15/10', desc: 'Tech Solutions Ltda', cat: 'Serviços', doc: 'NFe', val: 15450, type: 'in' },
                                        { date: '14/10', desc: 'Tarifa Bancária', cat: 'Financeiro', doc: '-', val: -12.90, type: 'out' },
                                        { date: '14/10', desc: 'Cliente Local RJ', cat: 'Vendas', doc: 'NFe', val: 2300, type: 'in' },
                                    ].map((row, idx) => (
                                        <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                            <td className="px-4 py-3 text-slate-500 font-mono text-xs">{row.date}</td>
                                            <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{row.desc}</td>
                                            <td className="px-4 py-3">
                                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
                                                    {row.cat}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-xs text-slate-500">{row.doc}</td>
                                            <td className={`px-4 py-3 text-right font-bold ${row.type === 'in' ? 'text-emerald-600' : 'text-slate-900 dark:text-white'}`}>
                                                {row.type === 'in' ? '+' : ''} {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(row.val)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                </div>
            </div>
        </div>

        {/* Modal: Nova Operação */}
        {showOperationModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowOperationModal(false)}></div>
                <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fade-in-up">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Nova Operação</h3>
                        <button onClick={() => setShowOperationModal(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                            <X size={20} className="text-slate-500" />
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Tipo de Operação</label>
                            <select className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500">
                                <option>Transferência</option>
                                <option>Pagamento</option>
                                <option>Depósito</option>
                                <option>Saque</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Valor (R$)</label>
                            <input type="number" placeholder="0.00" step="0.01" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Descrição</label>
                            <input type="text" placeholder="Ex: Pagamento NF..." className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500" />
                        </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                        <button onClick={() => setShowOperationModal(false)} className="flex-1 py-2.5 px-4 rounded-lg border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                            Cancelar
                        </button>
                        <button className="flex-1 py-2.5 px-4 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2">
                            <Plus size={16} /> Registrar
                        </button>
                    </div>
                </div>
            </div>
        )}
    );
};

const NavButton = ({ icon: Icon, label, sub, active, onClick }: any) => (
    <button 
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-slate-700 dark:hover:text-slate-300'}`}
    >
        <Icon size={18} className={active ? 'text-emerald-600' : 'opacity-70'} />
        <div className="text-left">
            <div className="text-sm font-bold leading-none">{label}</div>
            {sub && <div className="text-[10px] font-medium opacity-60 mt-0.5">{sub}</div>}
        </div>
    </button>
);

export default FinancialModule;
