
import React, { useState } from 'react';
import { User } from '../types';
import { translations } from '../locales';

interface OnboardingProps {
  user: User;
  onUserUpdate: (user: User) => void;
}

const LANGUAGES = [
  { id: 'en', name: 'English', native: 'English' },
  { id: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { id: 'bn', name: 'Bengali', native: 'বাংলা' },
  { id: 'te', name: 'Telugu', native: 'తెలుగు' },
  { id: 'mr', name: 'Marathi', native: 'मराठी' },
  { id: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { id: 'gu', name: 'Gujarati', native: 'ગુજરાती' },
  { id: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' }
];

const Onboarding: React.FC<OnboardingProps> = ({ user, onUserUpdate }) => {
  const [step, setStep] = useState<'language' | 'phone' | 'otp' | 'wallet' | 'kyc'>('language');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [aadhaar, setAadhaar] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const lang = user.language || 'en';
  const t = translations[lang] || translations['en'];

  const handleLanguageSelect = (langId: string) => {
    onUserUpdate({ ...user, language: langId });
    setStep('phone');
  };

  const handlePhoneSubmit = () => {
    if (phone.length !== 10) return alert("Enter valid 10-digit number");
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('otp');
    }, 1000);
  };

  const handleOtpSubmit = () => {
    if (otp.join('').length !== 4) return alert("Enter 4-digit OTP");
    setIsProcessing(true);
    setTimeout(() => {
      onUserUpdate({ ...user, phoneNumber: phone });
      setIsProcessing(false);
      setStep('wallet');
    }, 1000);
  };

  const connectWallet = () => {
    setIsProcessing(true);
    setTimeout(() => {
      onUserUpdate({ ...user, walletAddress: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F' });
      setStep('kyc');
      setIsProcessing(false);
    }, 1500);
  };

  const verifyKyc = () => {
    if (aadhaar.length !== 12) return alert("Enter valid 12-digit Aadhaar");
    setIsProcessing(true);
    setTimeout(() => {
      onUserUpdate({ ...user, isKycVerified: true, aadhaarNumber: aadhaar });
      setIsProcessing(false);
    }, 2000);
  };

  const renderContent = () => {
    switch (step) {
      case 'language':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-black mb-2 text-gray-900">{t.chooseLanguage}</h2>
            <p className="text-gray-500 mb-8 font-medium">{t.selectLanguageSubtitle}</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {LANGUAGES.map(l => (
                <button 
                  key={l.id}
                  onClick={() => handleLanguageSelect(l.id)}
                  className={`p-5 bg-white border-2 rounded-3xl hover:border-indigo-500 hover:shadow-xl transition-all group text-left ${user.language === l.id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-100'}`}
                >
                  <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${user.language === l.id ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-500'}`}>{l.name}</p>
                  <p className="text-lg font-black text-gray-900">{l.native}</p>
                </button>
              ))}
            </div>
          </div>
        );
      case 'phone':
        return (
          <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-gray-100 animate-in slide-in-from-bottom-8">
            <h2 className="text-3xl font-black mb-2 text-gray-900 text-center">{t.mobileVerification}</h2>
            <p className="text-sm text-gray-500 mb-8 text-center font-medium">{t.mobileSubtitle}</p>
            <div className="relative mb-8">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-indigo-600">+91</span>
              <input 
                type="tel"
                placeholder="9876543210"
                maxLength={10}
                className="w-full bg-slate-50 border-2 border-slate-100 p-6 pl-16 rounded-2xl text-2xl font-black text-gray-900 outline-none focus:border-indigo-500 focus:bg-white transition shadow-inner"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
              />
            </div>
            <button 
              onClick={handlePhoneSubmit}
              disabled={isProcessing}
              className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-indigo-700 transition shadow-xl shadow-indigo-100 active:scale-95 flex items-center justify-center space-x-2"
            >
              {isProcessing ? 'Generating OTP...' : (
                <>
                  <span>{t.sendOtp}</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </>
              )}
            </button>
          </div>
        );
      case 'otp':
        return (
          <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-gray-100 animate-in scale-in-95">
            <h2 className="text-3xl font-black mb-2 text-gray-900 text-center">{t.enterOtp}</h2>
            <p className="text-sm text-gray-500 mb-8 text-center font-medium">{t.otpSubtitle} <span className="text-indigo-600 font-bold">+91 {phone}</span></p>
            <div className="flex justify-center gap-4 mb-10">
              {[0, 1, 2, 3].map(i => (
                <input 
                  key={i}
                  type="text"
                  maxLength={1}
                  className="w-16 h-20 text-center text-3xl font-black bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 focus:bg-white outline-none text-gray-900 transition shadow-sm"
                  value={otp[i]}
                  onChange={(e) => {
                    const newOtp = [...otp];
                    newOtp[i] = e.target.value;
                    setOtp(newOtp);
                    if (e.target.value && e.target.nextSibling) (e.target.nextSibling as HTMLInputElement).focus();
                  }}
                />
              ))}
            </div>
            <button 
              onClick={handleOtpSubmit}
              disabled={isProcessing}
              className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-indigo-700 transition"
            >
              {isProcessing ? 'Verifying Identity...' : t.confirmOtp}
            </button>
            <button className="w-full mt-6 text-xs font-black text-indigo-600 hover:underline uppercase tracking-widest">Resend Code</button>
          </div>
        );
      case 'wallet':
        return (
          <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border border-gray-100 animate-in slide-in-from-right-8 text-center">
            <div className="w-24 h-24 bg-indigo-100 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner transform -rotate-3 hover:rotate-0 transition-transform">
              <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-3xl font-black mb-3 text-gray-900">{t.secureWeb3Id}</h2>
            <p className="text-gray-500 mb-10 font-medium">{t.walletSubtitle}</p>
            <button 
              onClick={connectWallet}
              disabled={isProcessing}
              className="w-full bg-indigo-600 text-white py-5 rounded-[1.5rem] font-black text-lg hover:bg-indigo-700 transition shadow-xl shadow-indigo-100 active:scale-[0.98]"
            >
              {isProcessing ? 'Securely Connecting...' : t.connectWallet}
            </button>
          </div>
        );
      case 'kyc':
        return (
          <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border border-orange-50 animate-in slide-in-from-right-8 text-center">
            <div className="w-24 h-24 bg-orange-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner transform rotate-3 hover:rotate-0 transition-transform">
              <svg className="w-12 h-12 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h2 className="text-3xl font-black mb-3 text-gray-900">{t.aadhaarKyc}</h2>
            <p className="text-gray-500 mb-10 font-medium">{t.aadhaarSubtitle}</p>
            <div className="relative mb-8">
              <input 
                type="text"
                placeholder="0000 0000 0000"
                maxLength={12}
                className="w-full bg-slate-50 border-2 border-slate-100 p-6 rounded-2xl text-3xl tracking-[0.2em] font-black text-gray-900 outline-none focus:border-orange-500 focus:bg-white transition text-center shadow-inner"
                value={aadhaar}
                onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, ''))}
              />
            </div>
            <button 
              onClick={verifyKyc}
              disabled={isProcessing}
              className="w-full bg-orange-600 text-white py-5 rounded-[1.5rem] font-black text-lg hover:bg-orange-700 transition shadow-xl shadow-orange-100 active:scale-[0.98]"
            >
              {isProcessing ? 'Syncing with UIDAI...' : t.verifyGovId}
            </button>
            <p className="mt-6 text-[11px] text-gray-400 font-bold uppercase tracking-widest">End-to-End Encrypted Verification</p>
          </div>
        );
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-4 pb-20 px-4">
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-black text-gray-900 mb-3 tracking-tighter">{t.appName} <span className="text-orange-600">Bharat</span></h1>
        <p className="text-gray-500 font-black uppercase tracking-[0.2em] text-xs">{t.appSubtitle}</p>
      </div>
      {renderContent()}
    </div>
  );
};

export default Onboarding;
