
export enum AppView {
  ONBOARDING = 'onboarding',
  PROFILE = 'profile',
  SKILLS = 'skills',
  VERIFICATION = 'verification',
  MARKETPLACE = 'marketplace',
  EMPLOYER = 'employer',
  MANAGE_SKILLS = 'manage_skills',
  VERIFIER_LOGIN = 'verifier_login',
  EMPLOYER_LOGIN = 'employer_login'
}

export enum UserRole {
  GIG_WORKER = 'gig_worker',
  VERIFIER = 'verifier',
  EMPLOYER = 'employer'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  aadhaarNumber?: string;
  phoneNumber?: string;
  walletAddress?: string;
  bio?: string;
  avatar?: string;
  isKycVerified: boolean;
  language?: string;
}

export interface Skill {
  id: string;
  userId: string;
  title: string;
  issuer: string;
  date: string;
  status: 'pending' | 'verified' | 'rejected';
  ipfsHash: string;
  blockchainHash: string;
  qrCode?: string;
  evidenceUrl?: string;
}

export interface Gig {
  id: string;
  title: string;
  description: string;
  budget: string;
  requiredSkills: string[];
  location: string;
  postedBy: string;
  postedAt: string;
  matchScore?: number;
}

export interface MatchingResult {
  gigId: string;
  relevanceReason: string;
  matchScore: number;
}

export interface Transaction {
  id: string;
  worker: string;
  type: 'Payment' | 'Verification' | 'Withdrawal';
  amount?: string;
  status: 'Completed' | 'Pending';
  date: string;
}
