
import React from 'react';
import { User, UserRole } from '../types';

interface HeaderProps {
  user: User;
  onRoleChange: (role: UserRole) => void;
}

const Header: React.FC<HeaderProps> = ({ user, onRoleChange }) => {
  return (
    <div>
      <h1>Header</h1>
      {/* Add your header UI here */}
    </div>
  );
};

export default Header;
