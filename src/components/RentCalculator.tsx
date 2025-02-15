import React, { useState } from 'react';
import { useRentCalculator } from '../hooks/useRentCalculator';
import { RentInputs } from './RentInputs';
import { RentResult } from './RentResult';
import { motion } from 'framer-motion';
import { InfoPanel } from './InfoPanel';

const RentCalculator: React.FC = () => {
  const [size, setSize] = useState('');
  const [unit, setUnit] = useState('bytes');
  const { rent, loading, error, calculateRent } = useRentCalculator();
  const [showInfo, setShowInfo] = useState(false);

  const handleCalculate = () => {
    calculateRent(size, unit);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-space-900 to-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-float"></div>
        <div className="absolute -top-64 right-0 w-96 h-96 bg-cyan-500/20 rounded-full filter blur-3xl animate-float-delayed"></div>
      </div>

      <div className="relative container mx-auto px-4 py-16 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-gray-800/50 to-gray-900/90 backdrop-blur-2xl rounded-xl shadow-2xl p-8 max-w-2xl w-full space-y-8 border border-gray-700/30 relative overflow-hidden"
        >
          {/* Info button positioned top-right */}
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-gray-700/30 hover:bg-gray-600/40 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-cyan-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>

          {/* Holographic Effect */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
          
          {/* Header Section */}
          <div className="space-y-6 text-center">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="inline-block"
            >
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Solana Rent Calculator
              </h1>
            </motion.div>
            {showInfo && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4"
              >
                <InfoPanel />
              </motion.div>
            )}
            <p className="text-gray-400 text-lg">
              Calculate storage costs on the Solana blockchain
            </p>
          </div>

          {/* Input Section */}
          <div className="space-y-8">
            <RentInputs
              size={size}
              unit={unit}
              loading={loading}
              onSizeChange={setSize}
              onUnitChange={setUnit}
              onCalculate={handleCalculate}
            />

            {/* Network Status */}
            <div className="flex items-center justify-center space-x-2 text-cyan-400">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
              <span className="text-sm">Connected to Solana Devnet</span>
            </div>

            {/* Result Section */}
            {rent !== null || error ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <RentResult rent={rent} error={error} />
              </motion.div>
            ) : null}
          </div>

          {/* Decorative Elements */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl"></div>
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-cyan-500/10 rounded-full filter blur-3xl"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default RentCalculator;
