
import React from 'react';
import { User, Skill, AppView } from '../types';

interface ProfileViewProps {
  user: User;
  skills: Skill[];
  setView: (view: AppView) => void;
  balance: number;
  setBalance: (balance: number) => void;
  onWithdraw: (amount: number) => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user, skills, setView, balance, setBalance, onWithdraw }) => {
  return (
    <div>
      <h1>Profile</h1>
      <p>Welcome, {user.name}!</p>
      {/* Add your profile UI here */}
    </div>
  );
};

export default ProfileView;
