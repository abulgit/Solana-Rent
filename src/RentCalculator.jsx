import React, { useState } from 'react';
import { Connection } from '@solana/web3.js';

const RentCalculator = () => {
  const [inputValue, setInputValue] = useState('');
  const [unit, setUnit] = useState('bytes');
  const [rent, setRent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const convertToBytes = (value, unit) => {
    const numValue = parseFloat(value);
    switch (unit) {
      case 'kb':
        return numValue * 1024;
      default:
        return numValue;
    }
  };

  const calculateRent = async (bytes) => {
    try {
      setLoading(true);
      const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
      const space = BigInt(Math.floor(bytes));
      const lamports = await connection.getMinimumBalanceForRentExemption(Number(space));
      return lamports / 1000000000; // Convert to SOL
    } catch (error) {
      console.error('Error:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleCalculate = async () => {
    const bytes = convertToBytes(inputValue, unit);
    if (!isNaN(bytes) && bytes > 0) {
      const rentAmount = await calculateRent(bytes);
      setRent(rentAmount);
    }
  };

  const handleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  return (
    <div className="min-h-screen bg-black relative flex items-center justify-center p-4 overflow-hidden">
      {/* Gradient Orbs */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-4000"></div>
      
      {/* Main Content */}
      <div className="relative bg-gray-900/40 backdrop-blur-xl rounded-2xl shadow-2xl p-8 max-w-xl w-full space-y-8 border border-gray-800/50">
        {/* Glass Reflection Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-2xl pointer-events-none"></div>
        
        <div className="space-y-3 relative">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Solana Rent Calculator
              </h1>
              <p className="text-gray-400 text-sm mt-1">Calculate rent-exempt balance for Solana accounts</p>
            </div>
            <button 
              onClick={() => setShowInfo(!showInfo)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>

          {showInfo && (
            <div className="bg-gray-950/50 rounded-xl p-4 space-y-3 text-sm text-gray-300 border border-gray-800/50 backdrop-blur-sm">
              <p>
                <span className="text-blue-400 font-semibold">What is Rent? </span>
                Rent is a mechanism that ensures efficient usage of Solana's blockchain resources by requiring accounts to maintain a minimum balance proportional to their data storage.
              </p>
              <p>
                <span className="text-blue-400 font-semibold">Key Points:</span>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Rent is refundable when an account is closed</li>
                  <li>Accounts below the rent-exempt threshold may be removed</li>
                  <li>Helps compensate validators for storage resources</li>
                </ul>
              </p>
            </div>
          )}
        </div>

        <div className="space-y-6 relative">
          <div className="space-y-4">
            <div className="relative">
              <div className="flex space-x-2">
                <div className="flex-1">
                  <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full px-4 h-11 bg-gray-950/50 border border-gray-800 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition text-white placeholder-gray-500"
                    placeholder="Enter size"
                    min="1"
                  />
                </div>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="h-11 px-4 bg-gray-950/50 border border-gray-800 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition text-white appearance-none pr-8"
                  style={{ WebkitAppearance: 'none' }}
                >
                  <option value="bytes">Bytes</option>
                  <option value="kb">KB</option>
                </select>
              </div>
              <div className="absolute -top-2 left-3 px-1 text-xs font-medium text-gray-400 bg-gray-900">
                Account Data Size
              </div>
            </div>

            <button
              onClick={handleCalculate}
              disabled={loading || !inputValue}
              className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-600 disabled:hover:to-purple-600 transition-all duration-200 group relative overflow-hidden shadow-lg"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-white/10 to-blue-400/0 opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"></span>
              {loading ? 'Calculating...' : 'Calculate Rent'}
            </button>

            <div className="text-xs text-gray-500 text-center">
              Press Enter or click the button to calculate
            </div>
          </div>

          {loading && (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
              <span className="text-gray-400">Calculating...</span>
            </div>
          )}

          {rent !== null && !loading && (
            <div className="bg-gray-950/50 rounded-xl p-6 border border-gray-800/50 backdrop-blur-sm relative overflow-hidden group">
              <div className="space-y-3 relative z-10">
                <div>
                  <p className="text-sm text-gray-400">Required rent-exempt balance</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {rent.toFixed(9)} SOL
                  </p>
                </div>
                <p className="text-xs text-gray-500">
                  This is the minimum balance required to make your account rent-exempt. 
                  Maintaining this balance ensures your account won't be removed from the network.
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-white/[0.05] to-blue-400/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between text-xs relative">
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-lg shadow-green-500/20"></div>
            <span>Connected to Solana Devnet</span>
          </div>
          <a 
            href="https://www.quicknode.com/guides/solana-development/getting-started/understanding-rent-on-solana"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            Learn more about Solana rent →
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default RentCalculator;