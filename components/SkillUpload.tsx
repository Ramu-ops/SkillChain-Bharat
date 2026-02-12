
import React from 'react';
import { Skill } from '../types';

interface SkillUploadProps {
  onUpload: (skill: Skill) => void;
  onCancel: () => void;
}

const SkillUpload: React.FC<SkillUploadProps> = ({ onUpload, onCancel }) => {
  return (
    <div>
      <h1>Upload Skill</h1>
      {/* Add your skill upload UI here */}
    </div>
  );
};

export default SkillUpload;
