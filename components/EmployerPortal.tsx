
import React, { useState } from 'react';
import { Skill, Transaction } from '../types';

interface EmployerPortalProps {
  allSkills: Skill[];
  transactions: Transaction[];
}

const EmployerPortal: React.FC<EmployerPortalProps> = ({ allSkills, transactions }) => {
  const [searchId, setSearchId] = useState('');
  const [scannedSkill, setScannedSkill] = useState<Skill | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleScanMock = () => {
    setIsScanning(true);
    setTimeout(() => {
      setScannedSkill(allSkills[0]);
      setIsScanning(false);
    }, 2000);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Talent Verifier</h2>
          <p className="text-gray-500 font-medium">Verify credentials directly from the blockchain node.</p>
        </div>
        <div className="bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-100 flex items-center">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse mr-2" />
          <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Enterprise Access Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-xl overflow-hidden relative">
          <h3 className="text-lg font-black mb-6">QR Terminal</h3>
          <div className="aspect-square bg-gray-900 rounded-3xl relative flex items-center justify-center overflow-hidden shadow-inner ring-8 ring-gray-50">
            {isScanning ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-full h-1.5 bg-indigo-500 animate-[bounce_2s_infinite] absolute top-1/2 shadow-[0_0_20px_#6366f1]" />
                <p className="text-white text-xs font-black uppercase tracking-widest mt-12 animate-pulse">Syncing Scanner...</p>
              </div>
            ) : scannedSkill ? (
              <div className="text-center p-8 animate-in zoom-in-95">
                <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                <p className="text-white font-black text-xl mb-2">Hash Validated</p>
                <button onClick={() => setScannedSkill(null)} className="text-green-400 text-xs font-bold hover:underline">Scan Another</button>
              </div>
            ) : (
              <div className="text-center px-10">
                <svg className="w-20 h-20 text-gray-700 mx-auto mb-6 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" /></svg>
                <button 
                  onClick={handleScanMock}
                  className="bg-white text-gray-900 px-10 py-4 rounded-2xl font-black text-sm hover:scale-105 transition shadow-xl"
                >
                  Activate Camera
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-xl">
            <h3 className="text-lg font-black mb-6">Global ID Lookup</h3>
            <div className="flex gap-3">
              <input 
                type="text" 
                placeholder="Enter Blockchain Hash (0x...)"
                className="flex-1 bg-slate-50 border-2 border-slate-100 p-5 rounded-2xl outline-none focus:border-indigo-500 transition-all font-black text-gray-900 placeholder:text-gray-300"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
              />
              <button 
                onClick={() => searchId && setScannedSkill(allSkills[0])}
                className="bg-indigo-600 text-white p-5 rounded-2xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </button>
            </div>
            <p className="mt-4 text-[10px] text-gray-400 font-bold uppercase tracking-widest">Verify Worker via Decentralized Identifier (DID)</p>
          </div>

          {scannedSkill && (
            <div className="bg-white p-8 rounded-[3rem] border-4 border-green-500 shadow-2xl animate-in fade-in slide-in-from-bottom-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-green-100 p-4 rounded-3xl text-green-600">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <div>
                  <h4 className="font-black text-2xl text-gray-900 leading-tight">Authentic Entry</h4>
                  <p className="text-xs font-black text-green-600 uppercase tracking-widest">Blockchain Verified</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <DataRow label="Credential" value={scannedSkill.title} />
                <DataRow label="Issued By" value={scannedSkill.issuer} />
                <DataRow label="Ledger Date" value={scannedSkill.date} />
                <div className="pt-6 mt-2 border-t border-gray-100">
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2">Immutable Hash</p>
                  <p className="text-[10px] font-mono break-all text-indigo-600 bg-indigo-50 p-3 rounded-xl border border-indigo-100">
                    {scannedSkill.blockchainHash}
                  </p>
                </div>
              </div>

              <button 
                onClick={() => { setScannedSkill(null); setSearchId(''); }}
                className="w-full mt-8 py-4 text-xs font-black text-gray-400 hover:text-gray-900 uppercase tracking-widest transition-colors"
              >
                Reset Authenticator
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-xl">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-black text-gray-900">Transaction History</h3>
          <button className="text-indigo-600 text-xs font-black uppercase tracking-widest hover:underline">Download CSV</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Worker</th>
                <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Action</th>
                <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Amount</th>
                <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {transactions.map(tx => (
                <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 font-black text-gray-900 text-sm">{tx.worker}</td>
                  <td className="py-4 text-sm font-medium text-gray-600">{tx.type}</td>
                  <td className="py-4 text-sm font-black text-gray-900">{tx.amount || '-'}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${tx.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="py-4 text-sm text-gray-400 font-mono">{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const DataRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</span>
    <span className="text-sm font-black text-gray-900">{value}</span>
  </div>
);

export default EmployerPortal;
