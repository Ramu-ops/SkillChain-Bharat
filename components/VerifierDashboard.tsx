
import React from 'react';
import { Skill } from '../types';

interface VerifierDashboardProps {
  skills: Skill[];
  onVerify: (id: string, status: 'verified' | 'rejected') => void;
}

const VerifierDashboard: React.FC<VerifierDashboardProps> = ({ skills, onVerify }) => {
  return (
    <div>
      <h1>Verifier Dashboard</h1>
      {/* Add your verifier dashboard UI here */}
    </div>
  );
};

export default VerifierDashboard;
