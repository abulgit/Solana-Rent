import React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

interface RentResultProps {
  rent: number | null;
  error: string | null;
}

export const RentResult: React.FC<RentResultProps> = ({ rent, error }) => {
  if (!rent && !error) return null;

  return (
    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/90 p-6 rounded-2xl border border-gray-700/30 
                   shadow-lg backdrop-blur-sm">
      {error ? (
        <div className="flex items-center space-x-3 text-red-400">
          <ExclamationCircleIcon className="h-6 w-6 flex-shrink-0" />
          <p className="text-lg">{error}</p>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-gray-400 text-lg">Estimated Rent:</p>
          <div className="flex items-baseline space-x-2">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent 
                            text-4xl font-bold">
              {rent?.toFixed(6)}
            </span>
            <span className="text-2xl text-gray-400">SOL</span>
          </div>
          <p className="text-gray-500 text-sm mt-2">
            Based on current network conditions
          </p>
        </div>
      )}
    </div>
  );
}; 