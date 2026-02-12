
import React from 'react';
import { Skill, Gig } from '../types';

interface MarketplaceProps {
  userSkills: Skill[];
  gigs: Gig[];
}

const Marketplace: React.FC<MarketplaceProps> = ({ userSkills, gigs }) => {
  return (
    <div>
      <h1>Marketplace</h1>
      {/* Add your marketplace UI here */}
    </div>
  );
};

export default Marketplace;
