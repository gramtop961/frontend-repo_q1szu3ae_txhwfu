import React, { useMemo, useState } from 'react';
import { Check, ChevronDown, ChevronRight, Download, Filter, Trash2 } from 'lucide-react';

const sample = [
  { id: 'Wallet A', address: '3h1j...x9T', claimableSOL: 0.92, refundable: 0.3 },
  { id: 'Wallet B', address: '9kQ2...11p', claimableSOL: 1.42, refundable: 0.0 },
  { id: 'Wallet C', address: '7Zp0...aa3', claimableSOL: 0.08, refundable: 0.12 },
  { id: 'Wallet D', address: 'D0ff...3mN', claimableSOL: 0.33, refundable: 0.21 },
];

const AccountsTable = () => {
  const [rows, setRows] = useState(sample);
  const [selected, setSelected] = useState({});
  const [faqOpen, setFaqOpen] = useState({ a: true, b: false, c: false });

  const toggleAll = () => {
    const all = {};
    const allChecked = Object.keys(selected).length !== rows.length;
    if (allChecked) rows.forEach((_, i) => (all[i] = true));
    setSelected(allChecked ? all : {});
  };

  const totals = useMemo(() => {
    const indices = Object.keys(selected).map(Number);
    let sol = 0, ref = 0;
    indices.forEach(i => { sol += rows[i].claimableSOL; ref += rows[i].refundable; });
    const fee = sol * 0.03;
    return { sol, ref, fee, net: sol + ref - fee };
  }, [selected, rows]);

  const exportCSV = () => {
    const header = ['id','address','claimableSOL','refundable'];
    const lines = [header.join(',')];
    Object.keys(selected).forEach(k => {
      const r = rows[Number(k)];
      lines.push([r.id, r.address, r.claimableSOL, r.refundable].join(','));
    });
    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'claim-report.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur p-5 md:p-6 text-white shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Contas em lote</h3>
        <div className="flex items-center gap-2 text-xs text-white/70">
          <Filter size={14} />
          <span>Selecione múltiplas wallets</span>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-white/5">
            <tr>
              <th className="text-left p-3"><input type="checkbox" onChange={toggleAll} checked={Object.keys(selected).length === rows.length} /></th>
              <th className="text-left p-3">Wallet</th>
              <th className="text-left p-3">Endereço</th>
              <th className="text-right p-3">SOL</th>
              <th className="text-right p-3">Depósito</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t border-white/10 hover:bg-white/5">
                <td className="p-3"><input type="checkbox" checked={!!selected[i]} onChange={() => setSelected(s => ({ ...s, [i]: !s[i] }))} /></td>
                <td className="p-3 font-medium">{r.id}</td>
                <td className="p-3 text-white/70 font-mono">{r.address}</td>
                <td className="p-3 text-right">{r.claimableSOL.toFixed(2)}</td>
                <td className="p-3 text-right">{r.refundable.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="rounded-xl border border-white/10 bg-[#0b0b0b]/60 p-3">
          <p className="text-xs text-white/60">Total recuperado</p>
          <p className="text-xl">{totals.sol.toFixed(2)} SOL</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#0b0b0b]/60 p-3">
          <p className="text-xs text-white/60">Depósitos resgatados</p>
          <p className="text-xl">{totals.ref.toFixed(2)} SOL</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#0b0b0b]/60 p-3">
          <p className="text-xs text-white/60">Taxas cobradas</p>
          <p className="text-xl">{totals.fee.toFixed(2)} SOL</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button className="rounded-xl bg-[#2E2E2E] text-white px-4 py-2 border border-white/10">Processar em batch</button>
        <button onClick={exportCSV} className="inline-flex items-center gap-2 rounded-xl bg-white/5 text-white px-4 py-2 border border-white/10"><Download size={16} /> Export CSV</button>
      </div>

      <div className="mt-6 border-t border-white/10 pt-4">
        <details open={faqOpen.a} onToggle={e => setFaqOpen(s => ({ ...s, a: e.target.open }))} className="group">
          <summary className="cursor-pointer flex items-center gap-2 text-white/90"><ChevronDown className="group-open:rotate-180 transition" />Como funciona o claim?</summary>
          <p className="mt-2 text-sm text-white/70">Escaneamos contas com saldos residuais e depósitos. Você aprova e executa localmente.</p>
        </details>
        <details open={faqOpen.b} onToggle={e => setFaqOpen(s => ({ ...s, b: e.target.open }))} className="group mt-3">
          <summary className="cursor-pointer flex items-center gap-2 text-white/90"><ChevronDown className="group-open:rotate-180 transition" />O que é depósito reembolsável?</summary>
          <p className="mt-2 text-sm text-white/70">Valores travados por programas; ao fechar contas, o depósito retorna para sua wallet.</p>
        </details>
        <details open={faqOpen.c} onToggle={e => setFaqOpen(s => ({ ...s, c: e.target.open }))} className="group mt-3">
          <summary className="cursor-pointer flex items-center gap-2 text-white/90"><ChevronDown className="group-open:rotate-180 transition" />Posso simular sem conectar?</summary>
          <p className="mt-2 text-sm text-white/70">Sim, use o modo simulação para entender custos e riscos sem assinar transações.</p>
        </details>
      </div>
    </section>
  );
};

export default AccountsTable;
