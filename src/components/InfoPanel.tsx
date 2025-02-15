import React from 'react';

export const InfoPanel: React.FC = () => (
  <div className="bg-gray-950/50 rounded-xl p-4 space-y-3 text-sm text-gray-300 border border-gray-800/50 backdrop-blur-sm">
    <p>
      <span className="text-[#9945FF] font-semibold">What is Rent? </span>
      Rent ensures efficient blockchain resource usage by requiring accounts to maintain 
      a minimum balance proportional to their data storage.
    </p>
    <div>
      <span className="text-[#9945FF] font-semibold">Key Points:</span>
      <ul className="list-disc list-inside mt-1 space-y-1">
        <li>Rent is refundable when an account is closed</li>
        <li>Accounts below rent-exempt threshold may be removed</li>
        <li>Compensates validators for storage resources</li>
      </ul>
    </div>
  </div>
); 