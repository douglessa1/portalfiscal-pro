import React, { useState } from 'react';
import { Calendar, CheckCircle2, AlertTriangle, Clock, ChevronRight, Server, FileText, ArrowRight, Bell, X } from 'lucide-react';
import { Card } from './ToolShared';

export const Dashboard: React.FC = () => {
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  // Mock Calendar Days
  const days = [
      { day: '14', week: 'SEG', status: 'done' },
      { day: '15', week: 'TER', status: 'today' },
      { day: '16', week: 'QUA', status: 'pending' },
      { day: '17', week: 'QUI', status: 'pending' },
      { day: '18', week: 'SEX', status: 'warning' },
      { day: '19', week: 'SÁB', status: 'free' },
      { day: '20', week: 'DOM', status: 'free' },
  ];

  return (
    <div className="space-y-8 animate-fade-in-up pb-10">
      
      {/* 1. Top Section: Greeting & System Status */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Bom dia, Douglas.</h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1">
                  Você tem <strong className="text-emerald-600">2 obrigações</strong> vencendo esta semana e <strong className="text-amber-500">1 alerta</strong> pendente.
              </p>
          </div>
          <div className="flex items-center gap-4 bg-white dark:bg-slate-800 p-2 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase">SEFAZ SP: Online</span>
              </div>
              <div className="h-4 w-px bg-slate-200 dark:bg-slate-600"></div>
              <div className="flex items-center gap-2 px-3 py-1.5">
                  <Server size={14} className="text-slate-400" />
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">API: Estável</span>
              </div>
          </div>
      </div>

      {/* 2. Fiscal Calendar Strip (Focus on Time) */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm overflow-x-auto">
          <div className="flex items-center justify-between min-w-[600px]">
              {days.map((d, i) => (
                  <div key={i} className={`flex flex-col items-center gap-2 group cursor-pointer rounded-xl p-3 transition-all ${d.status === 'today' ? 'bg-slate-900 dark:bg-emerald-600 shadow-lg scale-110' : 'hover:bg-slate-50 dark:hover:bg-slate-700'}`}>
                      <span className={`text-xs font-bold uppercase tracking-wider ${d.status === 'today' ? 'text-slate-400 dark:text-emerald-200' : 'text-slate-400'}`}>{d.week}</span>
                      <span className={`text-2xl font-extrabold ${d.status === 'today' ? 'text-white' : 'text-slate-900 dark:text-white'}`}>{d.day}</span>
                      {d.status === 'warning' && <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>}
                      {d.status === 'pending' && <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>}
                      {d.status === 'done' && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>}
                  </div>
              ))}
          </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
          
          {/* 3. Priority Timeline (The "Feed") */}
          <div className="lg:col-span-2 space-y-6">
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Clock size={20} className="text-slate-400" /> Linha do Tempo
              </h3>
              
              <div className="relative border-l-2 border-slate-100 dark:border-slate-800 ml-3 space-y-8 pb-4">
                  
                  {/* Item 1: Urgent */}
                  <div className="relative pl-8 group">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-amber-500 border-4 border-white dark:border-slate-950 shadow-sm group-hover:scale-125 transition-transform"></div>
                      <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all group-hover:border-amber-200 dark:group-hover:border-amber-900">
                          <div className="flex justify-between items-start mb-2">
                              <span className="text-xs font-bold text-amber-600 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-md uppercase tracking-wide">Vence em 2 dias</span>
                              <button className="text-slate-400 hover:text-slate-600"><ChevronRight size={16} /></button>
                          </div>
                          <h4 className="text-lg font-bold text-slate-900 dark:text-white">Envio da EFD-Reinf</h4>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-4">Competência Setembro/2024. Pendente de validação dos eventos R-4000.</p>
                          <div className="flex gap-3">
                              <button onClick={() => setShowSubmitModal(true)} className="text-sm font-bold text-white bg-slate-900 dark:bg-white dark:text-slate-900 px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">Iniciar Envio</button>
                              <button onClick={() => setShowErrorModal(true)} className="text-sm font-bold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600 px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">Verificar Erros</button>
                          </div>
                      </div>
                  </div>

                  {/* Item 2: Normal */}
                  <div className="relative pl-8 group">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 border-4 border-white dark:border-slate-950 shadow-sm"></div>
                      <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                           <div className="flex justify-between items-start mb-2">
                              <span className="text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-md uppercase tracking-wide">Hoje, 14:00</span>
                          </div>
                          <h4 className="text-lg font-bold text-slate-900 dark:text-white">Reunião de Fechamento</h4>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Alinhamento trimestral com a diretoria.</p>
                      </div>
                  </div>

                  {/* Item 3: Done */}
                  <div className="relative pl-8 opacity-60 hover:opacity-100 transition-opacity">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white dark:border-slate-950 shadow-sm"></div>
                      <div className="bg-slate-50 dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                           <div className="flex justify-between items-start mb-2">
                              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-md uppercase tracking-wide flex items-center gap-1"><CheckCircle2 size={12}/> Concluído</span>
                          </div>
                          <h4 className="text-lg font-bold text-slate-900 dark:text-white decoration-slate-400">Pagamento do DAS</h4>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Conciliado automaticamente pelo sistema.</p>
                      </div>
                  </div>
              </div>
          </div>

          {/* 4. Sidebar Widgets */}
          <div className="space-y-6">
              
              {/* Quick Access Grid */}
              <div className="bg-slate-900 dark:bg-slate-800 rounded-3xl p-6 text-white shadow-xl">
                  <h3 className="font-bold text-lg mb-4">Acesso Rápido</h3>
                  <div className="grid grid-cols-2 gap-3">
                      <button className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-left group">
                          <FileText size={20} className="mb-2 text-emerald-400 group-hover:scale-110 transition-transform" />
                          <span className="text-xs font-bold">Emitir NFe</span>
                      </button>
                      <button className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-left group">
                          <Calendar size={20} className="mb-2 text-blue-400 group-hover:scale-110 transition-transform" />
                          <span className="text-xs font-bold">Agenda</span>
                      </button>
                      <button className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-left group">
                          <AlertTriangle size={20} className="mb-2 text-amber-400 group-hover:scale-110 transition-transform" />
                          <span className="text-xs font-bold">Pendências</span>
                      </button>
                      <button className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-left group">
                          <Bell size={20} className="mb-2 text-purple-400 group-hover:scale-110 transition-transform" />
                          <span className="text-xs font-bold">Avisos</span>
                      </button>
                  </div>
              </div>

              {/* Updates */}
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center justify-between">
                      Atualizações
                      <ArrowRight size={16} className="text-slate-400" />
                  </h3>
                  <div className="space-y-4">
                      <div className="flex gap-3 items-start pb-4 border-b border-slate-100 dark:border-slate-700 last:border-0 last:pb-0">
                          <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 shrink-0"></div>
                          <div>
                              <p className="text-sm font-medium text-slate-800 dark:text-slate-200">Nova versão do Layout NFe 4.01 disponível.</p>
                              <p className="text-xs text-slate-400 mt-1">Há 2 horas</p>
                          </div>
                      </div>
                      <div className="flex gap-3 items-start">
                          <div className="w-2 h-2 mt-2 rounded-full bg-emerald-500 shrink-0"></div>
                          <div>
                              <p className="text-sm font-medium text-slate-800 dark:text-slate-200">Certificado Digital vence em 15 dias.</p>
                              <p className="text-xs text-slate-400 mt-1">Há 1 dia</p>
                          </div>
                      </div>
                  </div>
              </div>

          </div>
      </div>

      {/* Modal: Submeter EFD-Reinf */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowSubmitModal(false)}></div>
          <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fade-in-up">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Iniciar Envio</h3>
              <button onClick={() => setShowSubmitModal(false)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded">
                <X size={20} className="text-slate-400" />
              </button>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">Você está prestes a enviar a EFD-Reinf para a Receita Federal.</p>
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900 rounded-lg p-3 mb-4 flex gap-2">
              <AlertTriangle size={16} className="text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-700 dark:text-amber-200"><strong>Atenção:</strong> Certifique-se de que todos os eventos foram validados.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowSubmitModal(false)} className="flex-1 py-2 px-3 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-sm">
                Cancelar
              </button>
              <button className="flex-1 py-2 px-3 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-500 transition-colors text-sm">
                Confirmar Envio
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Erros de Validação */}
      {showErrorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowErrorModal(false)}></div>
          <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fade-in-up">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Erros de Validação</h3>
              <button onClick={() => setShowErrorModal(false)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded">
                <X size={20} className="text-slate-400" />
              </button>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto mb-4">
              <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-3 rounded text-sm">
                <p className="font-bold text-red-700 dark:text-red-400">Evento R-4001</p>
                <p className="text-xs text-red-600 dark:text-red-300">Informação obrigatória faltando: nrInsc</p>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-3 rounded text-sm">
                <p className="font-bold text-red-700 dark:text-red-400">Evento R-4010</p>
                <p className="text-xs text-red-600 dark:text-red-300">Valor total não confere com soma dos items</p>
              </div>
            </div>
            <button onClick={() => setShowErrorModal(false)} className="w-full py-2 px-3 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-lg font-bold hover:opacity-90 transition-opacity text-sm">
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
