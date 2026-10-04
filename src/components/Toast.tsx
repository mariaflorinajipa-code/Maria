import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full px-4 sm:px-0 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center justify-between p-4 rounded-xl shadow-2xl border backdrop-blur-md transition-all duration-300 transform translate-y-0 opacity-100 ${
            toast.type === 'success'
              ? 'bg-[#0E1B2D]/95 border-emerald-500/40 text-emerald-100 shadow-emerald-950/40'
              : toast.type === 'error'
              ? 'bg-[#1F0F1A]/95 border-rose-500/40 text-rose-100 shadow-rose-950/40'
              : 'bg-[#15102A]/95 border-violet-500/40 text-violet-100 shadow-violet-950/40'
          }`}
        >
          <div className="flex items-center gap-3">
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-violet-400 shrink-0" />}
            <span className="text-sm font-medium leading-snug">{toast.message}</span>
          </div>
          <button
            onClick={() => onDismiss(toast.id)}
            className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors ml-3"
            aria-label="Cerrar notificación"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
