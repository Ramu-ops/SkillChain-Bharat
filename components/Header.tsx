
import React from 'react';
import { User, UserRole } from '../types';
import { translations } from '../locales';

interface HeaderProps {
  user: User;
  onRoleChange: (role: UserRole) => void;
}

const Header: React.FC<HeaderProps> = ({ user, onRoleChange }) => {
  const lang = user.language || 'en';
  const t = translations[lang] || translations['en'];

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case UserRole.GIG_WORKER: return 'bg-blue-600 border-blue-200 text-blue-700 bg-blue-50';
      case UserRole.VERIFIER: return 'bg-purple-600 border-purple-200 text-purple-700 bg-purple-50';
      case UserRole.EMPLOYER: return 'bg-emerald-600 border-emerald-200 text-emerald-700 bg-emerald-50';
      default: return 'bg-gray-600 border-gray-200 text-gray-700 bg-gray-50';
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-18 flex items-center justify-between py-3">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-2.5 rounded-xl shadow-lg shadow-indigo-200">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-gray-900 leading-none tracking-tight">SkillChain</span>
            <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">Bharat</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative flex items-center group">
             <div className={`absolute -inset-0.5 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-1000 ${user.role === UserRole.GIG_WORKER ? 'bg-blue-600' : user.role === UserRole.VERIFIER ? 'bg-purple-600' : 'bg-emerald-600'}`}></div>
             <select 
              className={`relative text-xs font-bold border rounded-full px-4 py-2 outline-none cursor-pointer transition-all appearance-none pr-8 shadow-sm ${getRoleColor(user.role)}`}
              value={user.role}
              onChange={(e) => onRoleChange(e.target.value as UserRole)}
            >
              <option value={UserRole.GIG_WORKER} className="bg-white text-gray-700">{t.workerView}</option>
              <option value={UserRole.VERIFIER} className="bg-white text-gray-700">{t.verifierView}</option>
              <option value={UserRole.EMPLOYER} className="bg-white text-gray-700">{t.employerView}</option>
            </select>
            <div className="absolute right-3 pointer-events-none">
              <svg className="w-3 h-3 text-current opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {user.walletAddress && (
            <div className="hidden sm:flex items-center bg-gray-50 px-4 py-2 rounded-full border border-gray-100 shadow-inner">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
              <span className="text-[11px] font-mono text-gray-500 font-medium">
                {user.walletAddress.slice(0, 6)}...{user.walletAddress.slice(-4)}
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
