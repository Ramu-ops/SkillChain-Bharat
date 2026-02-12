
import React, { useState, useEffect } from 'react';
import { AppView, User, Skill, Gig, UserRole, Transaction } from '/types';
import { INITIAL_USER, MOCK_SKILLS, MOCK_GIGS, MOCK_VERIFIER } from '/constants';
import Onboarding from '/components/Onboarding';
import ProfileView from '/components/ProfileView';
import SkillUpload from '/components/SkillUpload';
import VerifierDashboard from '/components/VerifierDashboard';
import VerifierLogin from '/components/VerifierLogin';
import EmployerLogin from '/components/EmployerLogin';
import Marketplace from '/components/Marketplace';
import EmployerPortal from '/components/EmployerPortal';
import BottomNav from '/components/BottomNav';
import Header from '/components/Header';
import ManageSkills from '/components/ManageSkills';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User>(INITIAL_USER);
  const [currentView, setCurrentView] = useState<AppView>(AppView.ONBOARDING);
  const [skills, setSkills] = useState<Skill[]>(MOCK_SKILLS);
  const [balance, setBalance] = useState(14250);
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 'tx_101', worker: 'Rahul Joshi', type: 'Payment', amount: '₹12,000', status: 'Completed', date: '2024-03-20' },
    { id: 'tx_102', worker: 'Rahul Joshi', type: 'Verification', status: 'Completed', date: '2024-03-19' }
  ]);
  const [isVerifierAuthenticated, setIsVerifierAuthenticated] = useState(false);
  const [isEmployerAuthenticated, setIsEmployerAuthenticated] = useState(false);
  const [gigs] = useState<Gig[]>(MOCK_GIGS);

  useEffect(() => {
    if (currentUser.walletAddress && currentUser.isKycVerified && currentView === AppView.ONBOARDING) {
      setCurrentView(AppView.PROFILE);
    }
  }, [currentUser, currentView]);

  const handleRoleChange = (role: UserRole) => {
    setCurrentUser(prev => ({
      ...prev,
      role,
      name: role === UserRole.VERIFIER ? MOCK_VERIFIER.name : INITIAL_USER.name,
      avatar: role === UserRole.VERIFIER ? MOCK_VERIFIER.avatar : INITIAL_USER.avatar
    }));

    if (role === UserRole.VERIFIER) {
      if (isVerifierAuthenticated) setCurrentView(AppView.VERIFICATION);
      else setCurrentView(AppView.VERIFIER_LOGIN);
    } else if (role === UserRole.EMPLOYER) {
      if (isEmployerAuthenticated) setCurrentView(AppView.EMPLOYER);
      else setCurrentView(AppView.EMPLOYER_LOGIN);
    } else {
      setCurrentView(AppView.PROFILE);
    }
  };

  const addTransaction = (tx: Transaction) => {
    setTransactions(prev => [tx, ...prev]);
  };

  const handleVerifySkill = (id: string, status: 'verified' | 'rejected') => {
    setSkills(prevSkills => prevSkills.map(s => s.id === id ? { ...s, status } : s));
  };

  const renderView = () => {
    if (currentView === AppView.ONBOARDING && !currentUser.walletAddress) {
      return <Onboarding user={currentUser} onUserUpdate={setCurrentUser} />;
    }

    switch (currentView) {
      case AppView.PROFILE:
        return <ProfileView 
          user={currentUser} 
          skills={skills} 
          setView={setCurrentView} 
          balance={balance} 
          setBalance={setBalance}
          onWithdraw={(amount) => addTransaction({
            id: `tx_${Math.random().toString(36).substr(2, 5)}`,
            worker: currentUser.name,
            type: 'Withdrawal',
            amount: `₹${amount}`,
            status: 'Completed',
            date: new Date().toISOString().split('T')[0]
          })}
        />;
      case AppView.SKILLS:
        return <SkillUpload 
          onUpload={(newSkill) => setSkills(prev => [...prev, newSkill])} 
          onCancel={() => setCurrentView(AppView.PROFILE)}
        />;
      case AppView.VERIFIER_LOGIN:
        return <VerifierLogin onLogin={() => { setIsVerifierAuthenticated(true); setCurrentView(AppView.VERIFICATION); }} />;
      case AppView.EMPLOYER_LOGIN:
        return <EmployerLogin onLogin={() => { setIsEmployerAuthenticated(true); setCurrentView(AppView.EMPLOYER); }} />;
      case AppView.VERIFICATION:
        return (
          <VerifierDashboard 
            skills={skills} 
            onVerify={handleVerifySkill}
          />
        );
      case AppView.MARKETPLACE:
        return <Marketplace userSkills={skills.filter(s => s.status === 'verified')} gigs={gigs} />;
      case AppView.EMPLOYER:
        return <EmployerPortal allSkills={skills} transactions={transactions} />;
      case AppView.MANAGE_SKILLS:
        return <ManageSkills skills={skills} setSkills={setSkills} setView={setCurrentView} />;
      default:
        return <ProfileView 
          user={currentUser} 
          skills={skills} 
          setView={setCurrentView} 
          balance={balance} 
          setBalance={setBalance}
          onWithdraw={(amount) => addTransaction({
            id: `tx_${Math.random().toString(36).substr(2, 5)}`,
            worker: currentUser.name,
            type: 'Withdrawal',
            amount: `₹${amount}`,
            status: 'Completed',
            date: new Date().toISOString().split('T')[0]
          })}
        />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen pb-20 bg-slate-50">
      <Header user={currentUser} onRoleChange={handleRoleChange} />
      <main className="flex-grow p-4 md:p-8 max-w-5xl mx-auto w-full">
        {renderView()}
      </main>
      {currentUser.walletAddress && currentView !== AppView.ONBOARDING && 
       currentView !== AppView.VERIFIER_LOGIN && currentView !== AppView.EMPLOYER_LOGIN && (
        <BottomNav activeView={currentView} setView={setCurrentView} role={currentUser.role} />
      )}
    </div>
  );
};

export default App;
