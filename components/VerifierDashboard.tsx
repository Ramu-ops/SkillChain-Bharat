
import React, { useState } from 'react';
import { Skill } from '../types';

interface VerifierDashboardProps {
  skills: Skill[];
  onVerify: (id: string, status: 'verified' | 'rejected') => void;
}

const VerifierDashboard: React.FC<VerifierDashboardProps> = ({ skills, onVerify }) => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  
  const pending = skills.filter(s => s.status === 'pending');
  const verified = skills.filter(s => s.status === 'verified');
  const rejected = skills.filter(s => s.status === 'rejected');

  const handleAction = (id: string, status: 'verified' | 'rejected') => {
    onVerify(id, status);
    if (selectedSkill?.id === id) {
      setSelectedSkill(null);
    }
  };

  return (
    <div className="space-y-8 pb-24">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Local Board Node</h2>
          <p className="text-gray-500 font-medium text-sm">Reviewing certifications for regional service experts.</p>
        </div>
        <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-2xl border border-gray-100 shadow-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Active Verification Feed</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard label="Pending Review" count={pending.length} color="bg-orange-500" />
        <StatCard label="Verified" count={verified.length} color="bg-emerald-500" />
        <StatCard label="Declined" count={rejected.length} color="bg-red-500" />
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center">
          <svg className="w-6 h-6 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
          Review Queue
        </h3>
        
        {pending.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-gray-100 shadow-inner">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No pending certificates to verify.</p>
          </div>
        ) : (
          pending.map(skill => (
            <div key={skill.id} className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:border-purple-200 transition-all">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-3">
                  <div className="bg-purple-50 p-3 rounded-2xl text-purple-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  </div>
                  <div>
                    <h3 className="font-black text-lg text-gray-900">{skill.title}</h3>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{skill.issuer}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-[10px] font-mono">
                  <span className="bg-slate-50 px-2 py-1 rounded text-slate-500 border border-slate-100">LEDGER ID: {skill.id.toUpperCase()}</span>
                  <button 
                    onClick={() => setSelectedSkill(skill)}
                    className="text-purple-600 font-black uppercase hover:underline flex items-center"
                  >
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    Inspect Document
                  </button>
                </div>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleAction(skill.id, 'rejected')}
                  className="px-6 py-3 rounded-2xl text-xs font-black text-red-600 bg-red-50 hover:bg-red-100 transition"
                >
                  Reject
                </button>
                <button 
                  onClick={() => handleAction(skill.id, 'verified')}
                  className="px-6 py-3 rounded-2xl text-xs font-black text-white bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-100 transition"
                >
                  Confirm Authenticity
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Certificate Viewer Modal */}
      {selectedSkill && (
        <div className="fixed inset-0 bg-gray-900/70 backdrop-blur-md z-[200] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] p-0 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="bg-gray-50 border-b p-6 flex justify-between items-center">
              <div>
                <h4 className="font-black text-gray-900">Document Inspection Terminal</h4>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Verifying evidence uploaded by worker</p>
              </div>
              <button onClick={() => setSelectedSkill(null)} className="p-2 hover:bg-gray-200 rounded-full transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <div className="p-8 flex flex-col items-center">
              <div className="w-full bg-slate-900 rounded-[2rem] overflow-hidden shadow-2xl relative border-4 border-slate-800">
                {selectedSkill.evidenceUrl ? (
                  <div className="relative group">
                    <img 
                      src={selectedSkill.evidenceUrl} 
                      alt="Uploaded Certificate" 
                      className="w-full h-auto max-h-[60vh] object-contain mx-auto"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl border border-gray-100 flex items-center space-x-2 shadow-sm">
                       <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                       <span className="text-[10px] font-black text-gray-800 uppercase tracking-widest">Original Asset</span>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-[1.414/1] flex flex-col items-center justify-center text-slate-500 p-12 text-center">
                    <svg className="w-20 h-20 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <p className="font-black uppercase tracking-widest text-xs">No visual evidence found</p>
                    <p className="text-[10px] mt-1 opacity-60">This asset only contains metadata hash.</p>
                  </div>
                )}
              </div>
              
              <div className="w-full mt-6 grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Stated Skill</p>
                  <p className="text-sm font-black text-slate-900">{selectedSkill.title}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Declared Issuer</p>
                  <p className="text-sm font-black text-slate-900">{selectedSkill.issuer}</p>
                </div>
              </div>

              <div className="mt-8 w-full flex space-x-4">
                <button 
                  onClick={() => handleAction(selectedSkill.id, 'rejected')}
                  className="flex-1 bg-red-50 text-red-600 py-4 rounded-2xl font-black hover:bg-red-100 transition shadow-sm active:scale-[0.98]"
                >
                  Reject Proof
                </button>
                <button 
                  onClick={() => handleAction(selectedSkill.id, 'verified')}
                  className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-black hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition active:scale-[0.98]"
                >
                  Verify Documentation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard: React.FC<{ label: string; count: number; color: string }> = ({ label, count, color }) => (
  <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center space-x-6">
    <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-current/20`}>
      {count}
    </div>
    <div>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</p>
      <p className="text-2xl font-black text-gray-900">{count}</p>
    </div>
  </div>
);

export default VerifierDashboard;
