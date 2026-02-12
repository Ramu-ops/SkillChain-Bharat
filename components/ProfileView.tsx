
import React, { useState } from 'react';
import { User, Skill, AppView } from '../types';
import { translations } from '../locales';

interface ProfileViewProps {
  user: User;
  skills: Skill[];
  setView: (view: AppView) => void;
  balance: number;
  setBalance: (val: number | ((prev: number) => number)) => void;
  onWithdraw: (amount: string) => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user, skills, setView, balance, setBalance, onWithdraw }) => {
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [bankDetails, setBankDetails] = useState({ acc: '', ifsc: '', amount: '' });
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [withdrawStep, setWithdrawStep] = useState<'form' | 'success'>('form');

  const lang = user.language || 'en';
  const t = translations[lang] || translations['en'];

  const handleWithdraw = () => {
    const amountNum = parseFloat(bankDetails.amount);
    if (!bankDetails.acc || !bankDetails.ifsc || !bankDetails.amount) return alert("Please fill all details");
    if (isNaN(amountNum) || amountNum <= 0) return alert("Please enter a valid amount");
    if (amountNum > balance) return alert("Insufficient balance");
    
    setIsWithdrawing(true);
    setTimeout(() => {
      setIsWithdrawing(false);
      setBalance(prev => prev - amountNum);
      onWithdraw(bankDetails.amount);
      setWithdrawStep('success');
    }, 2000);
  };

  const closeWithdraw = () => {
    setShowWithdrawModal(false);
    setWithdrawStep('form');
    setBankDetails({ acc: '', ifsc: '', amount: '' });
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-8 duration-700">
      <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-indigo-50/50 border border-indigo-50 flex flex-col items-center sm:flex-row sm:items-start sm:space-x-8 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000 opacity-50" />
        
        <div className="relative mb-6 sm:mb-0">
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="w-32 h-32 rounded-3xl object-cover ring-8 ring-indigo-50 shadow-2xl transition-transform duration-500 group-hover:rotate-3"
          />
          {user.isKycVerified && (
            <div className="absolute -bottom-3 -right-3 bg-white p-1 rounded-2xl shadow-lg">
              <div className="bg-green-500 text-white p-2 rounded-xl">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          )}
        </div>

        <div className="text-center sm:text-left flex-1 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">{user.name}</h1>
            <span className="w-fit mx-auto sm:mx-0 bg-indigo-600 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-indigo-100">
              Verified Expert
            </span>
          </div>
          <p className="text-gray-500 text-sm font-medium mb-6">{user.bio || 'Local Service Professional'}</p>
          
          <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
            <div className="bg-gray-50 px-4 py-2 rounded-2xl text-xs font-black text-gray-600 border border-gray-100 flex items-center shadow-sm">
              <span className="text-orange-500 mr-2">★</span> 4.9 Service Rating
            </div>
            <div className="bg-gray-50 px-4 py-2 rounded-2xl text-xs font-black text-gray-600 border border-gray-100 flex items-center shadow-sm">
              <span className="text-indigo-500 mr-2">⚡</span> 128 Gigs Done
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-blue-800 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-indigo-200 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-20 -mt-20 blur-2xl group-hover:bg-white/20 transition-all duration-700" />
          <h3 className="text-indigo-100 text-xs font-black uppercase tracking-widest mb-2">{t.escrowEarnings}</h3>
          <div className="text-4xl font-black mb-6 tracking-tighter">₹ {balance.toLocaleString()}<span className="text-indigo-300 text-xl font-medium">.00</span></div>
          <div className="flex space-x-3 relative z-10">
            <button 
              onClick={() => setShowWithdrawModal(true)}
              className="flex-1 bg-white text-indigo-700 hover:bg-indigo-50 py-4 rounded-2xl text-sm font-black transition-all shadow-lg active:scale-95"
            >
              {t.withdrawToBank}
            </button>
            <button 
              onClick={() => alert("Settings & Preferences Coming Soon")}
              className="p-4 bg-white/20 hover:bg-white/30 rounded-2xl transition-all active:scale-95"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
            </button>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <h3 className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-4">Identity Health</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-2xl border border-gray-100">
                <span className="text-gray-500 text-xs font-bold">Skills In Locker</span>
                <span className="font-black text-gray-900">{skills.filter(s => s.status === 'verified').length} Verified</span>
              </div>
              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-2xl border border-gray-100">
                <span className="text-gray-500 text-xs font-bold">{t.kycStatus}</span>
                <span className="text-green-600 font-black text-xs uppercase tracking-tighter">Gov Verified</span>
              </div>
            </div>
          </div>
          <p className="text-[10px] text-gray-400 mt-4 leading-relaxed italic">Your profile is visible to local businesses in your pincode area.</p>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-black text-gray-900 tracking-tight">Expert Credentials</h3>
          <button 
            onClick={() => setView(AppView.MANAGE_SKILLS)}
            className="text-indigo-600 text-xs font-black uppercase hover:underline"
          >
            Manage Digital ID
          </button>
        </div>
        
        {skills.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-[2.5rem] border-2 border-dashed border-gray-100 shadow-inner">
            <p className="text-gray-400 font-medium">Your digital skill locker is empty.</p>
          </div>
        ) : (
          <div className="grid gap-5">
            {skills.slice(0, 3).map(skill => (
              <div key={skill.id} className="group bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all flex items-center justify-between hover:border-indigo-100">
                <div className="flex items-center space-x-5">
                  <div className={`p-4 rounded-2xl transition-colors duration-300 ${skill.status === 'verified' ? 'bg-green-50 text-green-600' : skill.status === 'pending' ? 'bg-orange-50 text-orange-600' : 'bg-red-50 text-red-600'}`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900 group-hover:text-indigo-600 transition-colors">{skill.title}</h4>
                    <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">{skill.issuer} • {skill.date}</p>
                  </div>
                </div>
                <div className="text-right hidden sm:block">
                  <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${
                    skill.status === 'verified' ? 'bg-green-100 text-green-700' : 
                    skill.status === 'pending' ? 'bg-orange-100 text-orange-700' : 
                    'bg-red-100 text-red-700'
                  }`}>
                    {skill.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showWithdrawModal && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 relative animate-in zoom-in-95 duration-200">
            {withdrawStep === 'form' ? (
              <>
                <button onClick={closeWithdraw} className="absolute top-8 right-8 text-gray-400 hover:text-gray-900">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <h3 className="text-2xl font-black mb-6 text-gray-900">Withdraw Funds</h3>
                <div className="space-y-4 text-left">
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Withdrawal Amount (₹)</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 5000"
                      className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl font-black text-gray-900 focus:border-indigo-600 outline-none placeholder:font-normal"
                      value={bankDetails.amount}
                      onChange={e => setBankDetails({...bankDetails, amount: e.target.value})}
                    />
                    <p className="text-[10px] text-gray-400 mt-1 font-bold">Max balance: ₹ {balance}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Account Number</label>
                    <input 
                      type="text" 
                      placeholder="0000 1111 2222 3333"
                      className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl font-black text-gray-900 focus:border-indigo-600 outline-none"
                      value={bankDetails.acc}
                      onChange={e => setBankDetails({...bankDetails, acc: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">IFSC Code</label>
                    <input 
                      type="text" 
                      placeholder="SBIN0001234"
                      className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl font-black text-gray-900 focus:border-indigo-600 outline-none"
                      value={bankDetails.ifsc}
                      onChange={e => setBankDetails({...bankDetails, ifsc: e.target.value})}
                    />
                  </div>
                  <button 
                    onClick={handleWithdraw}
                    disabled={isWithdrawing}
                    className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all active:scale-[0.98] mt-4"
                  >
                    {isWithdrawing ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Processing Transfer...</span>
                      </div>
                    ) : 'Confirm Withdrawal'}
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-6 animate-in zoom-in-95">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">Transfer Initiated!</h3>
                <p className="text-gray-500 mb-8 font-medium">₹ {bankDetails.amount} has been released from escrow to your bank account ending in {bankDetails.acc.slice(-4)}.</p>
                <div className="bg-slate-50 p-4 rounded-2xl text-[10px] font-mono text-gray-400 break-all mb-8">
                  TX_ID: 0x{Math.random().toString(16).substr(2, 40)}
                </div>
                <button 
                  onClick={closeWithdraw}
                  className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black text-sm hover:bg-gray-800 transition shadow-lg"
                >
                  Return to Profile
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileView;
