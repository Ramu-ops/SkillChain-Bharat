
import React from 'react';
import { Skill, AppView } from '../types';

interface ManageSkillsProps {
  skills: Skill[];
  setSkills: (skills: Skill[]) => void;
  setView: (view: AppView) => void;
}

const ManageSkills: React.FC<ManageSkillsProps> = ({ skills, setSkills, setView }) => {
  return (
    <div>
      <h1>Manage Skills</h1>
      {/* Add your manage skills UI here */}
    </div>
  );
};

export default ManageSkills;
