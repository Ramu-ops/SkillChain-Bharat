
import React, { useState, useEffect } from 'react';
import { Skill, Gig, MatchingResult } from '../types';
import { getSkillMatches } from '../geminiService';

interface MarketplaceProps {
  userSkills: Skill[];
  gigs: Gig[];
}

const Marketplace: React.FC<MarketplaceProps> = ({ userSkills, gigs }) => {
  const [matches, setMatches] = useState<MatchingResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGig, setSelectedGig] = useState<Gig | null>(null);
  const [showPayoutSetup, setShowPayoutSetup] = useState(false);
  const [upiId, setUpiId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const fetchMatches = async () => {
      setIsLoading(true);
      const results = await getSkillMatches(userSkills, gigs);
      setMatches(results);
      setIsLoading(false);
    };

    if (userSkills.length > 0) {
      fetchMatches();
    }
  }, [userSkills, gigs]);

  const handleApply = (gig: Gig) => {
    setSelectedGig(gig);
    setShowPayoutSetup(true);
    setIsSuccess(false);
  };

  const confirmApplication = () => {
    if (!upiId.includes('@')) {
      alert("Please enter a valid UPI ID (e.g., name@okaxis)");
      return;
    }
    setIsSubmitting(true);
    // Simulation of application and smart contract escrow initiation
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setShowPayoutSetup(false);
        setUpiId('');
      }, 2000);
    }, 1800);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 mb-2">Gig Marketplace</h2>
          <p className="text-gray-500 font-medium">Verified opportunities with automated smart-contract payouts.</p>
        </div>
        <div className="flex bg-white p-1 rounded-xl border border-gray-200 shadow-sm w-fit">
          <button className="px-4 py-2 text-xs font-bold bg-indigo-600 text-white rounded-lg shadow-md shadow-indigo-100">All Gigs</button>
          <button className="px-4 py-2 text-xs font-bold text-gray-500 hover:text-indigo-600 transition">My Matches</button>
        </div>
      </div>

      {isLoading && (
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-8 rounded-3xl border border-indigo-100 flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-14 h-14 border-4 border-indigo-200 rounded-full" />
              <div className="absolute inset-0 w-14 h-14 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            </div>
            <div>
              <p className="font-black text-indigo-900 text-lg">AI Matching Engine</p>
              <p className="text-sm text-indigo-700 font-medium">Comparing your {userSkills.length} verified credentials with global listings...</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-6">
        {gigs.map(gig => {
          const match = matches.find(m => m.gigId === gig.id);
          return (
            <div key={gig.id} className="group bg-white p-7 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300 relative overflow-hidden">
              {match && (
                <div className="absolute top-0 right-0">
                  <div className="bg-indigo-600 text-white text-[10px] font-black px-5 py-2 transform rotate-0 rounded-bl-2xl flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {match.matchScore}% BEST MATCH
                  </div>
                </div>
              )}
              
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="flex-1">
                  <h3 className="text-2xl font-black text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">{gig.title}</h3>
                  <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-sm text-gray-500 mb-5">
                    <span className="flex items-center font-bold text-gray-700 bg-gray-50 px-2 py-1 rounded-md">
                      <svg className="w-4 h-4 mr-1 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                      {gig.postedBy}
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      {gig.location}
                    </span>
                    <span className="flex items-center font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                      {gig.budget}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed line-clamp-3">{gig.description}</p>
                  
                  <div className="flex flex-wrap gap-2.5 mb-6">
                    {gig.requiredSkills.map(skill => (
                      <span key={skill} className="bg-indigo-50 text-indigo-700 text-[11px] font-black px-3 py-1.5 rounded-lg border border-indigo-100 uppercase tracking-wider">
                        {skill}
                      </span>
                    ))}
                  </div>

                  {match && (
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 border-l-4 border-l-indigo-500 shadow-inner">
                      <p className="text-xs text-gray-700 leading-relaxed font-medium">
                        <span className="text-indigo-600 font-black uppercase mr-2 tracking-tighter">Gemini Insights</span> 
                        {match.relevanceReason}
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col justify-end">
                  <button 
                    onClick={() => handleApply(gig)}
                    className="w-full md:w-auto bg-gray-900 text-white px-10 py-4 rounded-2xl font-black hover:bg-indigo-600 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-gray-200 hover:shadow-indigo-200"
                  >
                    Apply & Setup Payout
                  </button>
                  <p className="text-[10px] text-gray-400 mt-3 text-center md:text-right">Smart Contract Escrow Protected</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showPayoutSetup && selectedGig && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-10 relative shadow-2xl animate-in zoom-in-95 duration-200">
            {!isSuccess ? (
              <>
                <button 
                  onClick={() => setShowPayoutSetup(false)}
                  className="absolute top-8 right-8 text-gray-400 hover:text-gray-600 transition p-2 hover:bg-gray-100 rounded-full"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-indigo-100 rounded-3xl flex items-center justify-center mx-auto mb-6 transform rotate-6 hover:rotate-0 transition-transform duration-500">
                    <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2">Setup Your Payout</h3>
                  <p className="text-sm text-gray-500 max-w-xs mx-auto">Set where you want to receive your earnings. Funds will be secured in Escrow by the employer.</p>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-indigo-50/50 p-5 rounded-3xl border border-indigo-100 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-indigo-500 font-black uppercase tracking-widest mb-1">Estimated Payout</p>
                      <p className="text-2xl font-black text-indigo-900">{selectedGig.budget.split('-')[0]}</p>
                    </div>
                    <div className="text-right">
                      <span className="bg-indigo-200 text-indigo-700 text-[10px] font-bold px-2 py-1 rounded-md">BLOCKCHAIN SECURED</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="block text-sm font-black text-gray-700">Enter Your UPI ID</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="rahul@okaxis"
                        className="w-full bg-gray-50 border-2 border-gray-100 p-5 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white transition-all text-lg font-bold placeholder:text-gray-300 shadow-sm"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                      />
                      <div className="absolute right-5 top-1/2 -translate-y-1/2">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" className="h-4 opacity-50" />
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-400 italic">This UPI ID will be linked to the Smart Contract for this specific gig.</p>
                  </div>

                  <button 
                    onClick={confirmApplication}
                    disabled={isSubmitting || !upiId}
                    className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-indigo-200 flex items-center justify-center space-x-3 transition-all active:scale-[0.98]"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Linking Account...</span>
                      </>
                    ) : (
                      <>
                        <span>Confirm & Apply</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      </>
                    )}
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-10 animate-in zoom-in-90 duration-300">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                  <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-3">Application Sent!</h3>
                <p className="text-gray-500 font-medium mb-8">Your profile and Payout ID are now linked to this gig's smart contract. You'll be notified when the employer approves.</p>
                <div className="bg-gray-50 p-4 rounded-2xl text-[10px] font-mono text-gray-400 break-all">
                  TX_HASH: 0x{Math.random().toString(16).substr(2, 40)}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
