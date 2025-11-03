import React from 'react';
import { AlertTriangle, CheckSquare, Play } from 'lucide-react';

const RiskSidebar = ({ onSimulate }) => {
  return (
    <aside className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur p-5 text-white shadow-lg shadow-[#CFF7E0]/10">
      <div className="flex items-center gap-3 mb-3">
        <AlertTriangle className="text-yellow-300" />
        <h3 className="text-lg font-semibold">Atenção / Riscos</h3>
      </div>
      <ul className="space-y-2 text-sm">
        <li className="flex items-start gap-2"><CheckSquare size={16} className="mt-0.5 text-white/70" />Pode queimar contas</li>
        <li className="flex items-start gap-2"><CheckSquare size={16} className="mt-0.5 text-white/70" />Pode perder NFTs</li>
        <li className="flex items-start gap-2"><CheckSquare size={16} className="mt-0.5 text-white/70" />Revise permissões antes de assinar</li>
      </ul>
      <button onClick={onSimulate} className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#2E2E2E] border border-white/10 px-4 py-2 text-white hover:bg-black/70 transition">
        <Play size={16} />
        Simular sem conectar
      </button>
      <div className="mt-4 rounded-xl border border-white/10 bg-[#0b0b0b]/60 p-3 text-xs text-white/70">
        <p className="font-mono">Dica: use uma wallet vazia para testes.</p>
      </div>
    </aside>
  );
};

export default RiskSidebar;
