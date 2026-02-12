
import React from 'react';
import { User } from '../types';

interface OnboardingProps {
  user: User;
  onUserUpdate: (user: User) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ user, onUserUpdate }) => {
  return (
    <div>
      <h1>Onboarding</h1>
      <p>Welcome, {user.name}!</p>
      {/* Add your onboarding UI here */}
    </div>
  );
};

export default Onboarding;
