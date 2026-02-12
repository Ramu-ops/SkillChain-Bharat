
import React from 'react';
import { Skill, Transaction } from '../types';

interface EmployerPortalProps {
  allSkills: Skill[];
  transactions: Transaction[];
}

const EmployerPortal: React.FC<EmployerPortalProps> = ({ allSkills, transactions }) => {
  return (
    <div>
      <h1>Employer Portal</h1>
      {/* Add your employer portal UI here */}
    </div>
  );
};

export default EmployerPortal;
