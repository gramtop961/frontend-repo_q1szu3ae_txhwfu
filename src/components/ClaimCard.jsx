import React, { useMemo, useState } from 'react';
import { AlertTriangle, CheckCircle2, Copy, Download, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const pastel = {
  lilac: '#CBB7FF',
  mint: '#CFF7E0',
  matte: '#2E2E2E',
};

const TerminalSnippet = ({ command }) => (
  <div className="mt-3 rounded-2xl border border-white/10 bg-[#0b0b0b]/60 backdrop-blur p-3 font-mono text-xs text-white/80">
    <div className="flex items-center gap-2 text-white/50 mb-2">
      <span className="inline-block h-2 w-2 rounded-full bg-red-400/70" />
      <span className="inline-block h-2 w-2 rounded-full bg-yellow-300/70" />
      <span className="inline-block h-2 w-2 rounded-full bg-emerald-300/70" />
      <span className="ml-auto text-[10px]">terminal</span>
    </div>
    <code>$ {command}</code>
  </div>
);

const Toast = ({ show, onClose }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/10 backdrop-blur px-4 py-3 shadow-lg shadow-[#CBB7FF]/20">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-6 -left-6 h-24 w-24 rounded-full bg-[#CBB7FF55] blur-2xl" />
            <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-[#CFF7E055] blur-2xl" />
          </div>
          <div className="flex items-center gap-2 text-white">
            <CheckCircle2 className="text-emerald-300" size={18} />
            <p className="text-sm">Claim concluído! Confetti pastel liberado.</p>
          </div>
          <button onClick={onClose} className="mt-2 text-xs text-white/70 underline">Fechar</button>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

const ConfirmModal = ({ open, onClose, onConfirm }) => (
  <AnimatePresence>
    {open && (
      <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className="absolute inset-0 bg-black/60" onClick={onClose} />
        <motion.div initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.96, opacity: 0 }} className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-[#0b0b0b]/80 backdrop-blur p-6 text-white shadow-xl">
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle className="text-yellow-300" />
            <h3 className="text-xl font-semibold">Confirme antes de executar</h3>
          </div>
          <p className="text-white/80 mb-3">Entenda a diferença:</p>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li><span className="font-semibold">Taxa</span>: percentual cobrado sobre o total recuperado. Exibido antecipadamente (3.0% máx 5%).</li>
            <li><span className="font-semibold">Depósito Reembolsável</span>: valor travado em algumas contas, devolvido após o claim.</li>
          </ul>
          <div className="mt-4 flex items-center gap-2 text-xs text-white/70">
            <Info size={14} />
            <span>Você poderá exportar um relatório em CSV ao final.</span>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button onClick={onClose} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10">Cancelar</button>
            <button onClick={onConfirm} className="px-4 py-2 rounded-xl bg-[#2E2E2E] border border-white/10 text-white">Confirmar e Executar</button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const ClaimCard = () => {
  const [connected, setConnected] = useState(false);
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const feePct = 3.0;

  const simulate = async () => {
    setRunning(true);
    setProgress(0);
    for (let i = 0; i <= 100; i += 5) {
      await new Promise(r => setTimeout(r, 35));
      setProgress(i);
    }
    setRunning(false);
    setShowToast(true);
  };

  const handleExecute = async () => {
    setModalOpen(false);
    await simulate();
  };

  const command = useMemo(() => `claim --wallet 3 --optimize --fee ${feePct}%`, [feePct]);

  return (
    <div className="relative rounded-3xl border border-white/10 bg-white/10 backdrop-blur p-5 md:p-6 shadow-lg shadow-[#CBB7FF]/10 text-white">
      <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-[#CBB7FF22] to-[#CFF7E022] pointer-events-none" aria-hidden />
      <div className="relative space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">Painel de Claim</h2>
            <p className="font-mono text-sm text-white/70">Recupere SOL e depósitos reembolsáveis</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-white/70">Taxa</p>
            <p className="text-xl font-mono">{feePct.toFixed(1)}% <span className="text-white/60 text-xs">(máx 5%)</span></p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="rounded-2xl border border-white/10 bg-[#0b0b0b]/60 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs text-white/70">Status</span>
                <span className="text-xs text-emerald-300/90">{running ? 'Processando' : 'Pronto'}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <motion.div className="h-full bg-gradient-to-r from-[#CBB7FF] to-[#CFF7E0]" initial={{ width: '0%' }} animate={{ width: `${progress}%` }} />
              </div>
              <TerminalSnippet command={command} />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm">
              <p className="text-white/80">Antes de conectar, você já vê a <span className="font-semibold">taxa</span> e os <span className="font-semibold">riscos</span>. Transparência total.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={simulate} disabled={running} className="flex-1 min-w-[160px] rounded-xl bg-[#2E2E2E] text-white px-4 py-2 border border-white/10 hover:bg-black/70 transition disabled:opacity-50">Simular Claim</button>
              <button onClick={() => setModalOpen(true)} disabled={running} className="flex-1 min-w-[200px] rounded-xl bg-gradient-to-r from-[#CBB7FF33] to-[#CFF7E033] text-white px-4 py-2 border border-white/10 hover:from-[#CBB7FF55] hover:to-[#CFF7E055] transition disabled:opacity-50">Executar Claim — Pagar {feePct.toFixed(1)}%</button>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/60">
              <Copy size={14} />
              <span>Dica: copie o comando para terminal offline</span>
            </div>
          </div>
        </div>
      </div>
      <Toast show={showToast} onClose={() => setShowToast(false)} />
      <ConfirmModal open={modalOpen} onClose={() => setModalOpen(false)} onConfirm={handleExecute} />
    </div>
  );
};

export default ClaimCard;
