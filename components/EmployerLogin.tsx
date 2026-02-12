
import React from 'react';

interface EmployerLoginProps {
  onLogin: () => void;
}

const EmployerLogin: React.FC<EmployerLoginProps> = ({ onLogin }) => {
  return (
    <div>
      <h1>Employer Login</h1>
      {/* Add your employer login UI here */}
    </div>
  );
};

export default EmployerLogin;
