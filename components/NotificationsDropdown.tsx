import React from 'react';
import { AlertTriangle, Info, Calendar, CheckCircle2 } from 'lucide-react';

interface NotificationProps {
    onClose: () => void;
}

export const NotificationsDropdown: React.FC<NotificationProps> = ({ onClose }) => {
    // Mock notifications
    const notifications = [
        { id: 1, type: 'urgent', title: 'Vencimento DAS', msg: 'A guia do Simples vence hoje.', time: '10 min atrás', icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20' },
        { id: 2, type: 'info', title: 'Atualização do Sistema', msg: 'Novas ferramentas de IA disponíveis.', time: '2h atrás', icon: Info, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
        { id: 3, type: 'success', title: 'Relatório Gerado', msg: 'Sua análise fiscal foi concluída.', time: '1d atrás', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
        { id: 4, type: 'reminder', title: 'Reunião Contábil', msg: 'Agendada para amanhã às 14h.', time: '1d atrás', icon: Calendar, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20' },
    ];

    return (
        <div className="absolute top-12 right-0 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-100 dark:border-slate-700 z-50 overflow-hidden animate-fade-in-up">
            <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                <h4 className="font-bold text-slate-900 dark:text-white">Notificações</h4>
                <button className="text-xs text-emerald-600 font-medium hover:underline">Marcar como lidas</button>
            </div>
            <div className="max-h-[300px] overflow-y-auto">
                {notifications.map(note => (
                    <div key={note.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors border-b border-slate-50 dark:border-slate-700/50 last:border-0 cursor-pointer">
                        <div className="flex gap-3">
                            <div className={`p-2 rounded-full h-fit ${note.bg} ${note.color}`}>
                                <note.icon size={16} />
                            </div>
                            <div>
                                <h5 className="text-sm font-bold text-slate-800 dark:text-slate-200">{note.title}</h5>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{note.msg}</p>
                                <span className="text-[10px] text-slate-400 mt-1 block">{note.time}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="p-2 bg-slate-50 dark:bg-slate-900/50 text-center border-t border-slate-100 dark:border-slate-700">
                <button className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-300">Ver todas</button>
            </div>
            
            {/* Backdrop for clicking outside */}
            <div className="fixed inset-0 z-[-1]" onClick={onClose}></div>
        </div>
    );
};