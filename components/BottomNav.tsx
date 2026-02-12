
import React from 'react';
import { AppView, UserRole } from '../types';

interface BottomNavProps {
  activeView: AppView;
  setView: (view: AppView) => void;
  role: UserRole;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeView, setView, role }) => {
  return (
    <div>
      <h1>BottomNav</h1>
      {/* Add your bottom navigation UI here */}
    </div>
  );
};

export default BottomNav;
