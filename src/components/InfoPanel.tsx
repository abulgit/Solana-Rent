import React from 'react';

export const InfoPanel: React.FC = () => (
  <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/90 backdrop-blur-sm md:backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border border-gray-700/30 w-full max-w-2xl">
    <p className="text-lg text-gray-300">
      <span className="text-[#9945FF] font-semibold">What is Rent? </span>
      Rent ensures efficient blockchain resource usage by requiring accounts to maintain 
      a minimum balance proportional to their data storage.
    </p>
    <div className="mt-6">
      <span className="text-[#9945FF] font-semibold text-lg">Key Points:</span>
      <ul className="list-disc list-inside mt-3 space-y-3 text-gray-300">
        <li>Rent is refundable when an account is closed</li>
        <li>Accounts below rent-exempt threshold may be removed</li>
        <li>Compensates validators for storage resources</li>
      </ul>
    </div>
  </div>
); 