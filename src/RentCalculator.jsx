import React, { useState } from "react";
import { Twitter } from 'lucide-react';
import { Connection } from "@solana/web3.js";

const RentCalculator = () => {
  const [inputValue, setInputValue] = useState("");
  const [unit, setUnit] = useState("bytes");
  const [rent, setRent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const convertToBytes = (value, unit) => {
    const numValue = parseFloat(value);
    switch (unit) {
      case "kb":
        return numValue * 1024;
      default:
        return numValue;
    }
  };

  const calculateRent = async (bytes) => {
    try {
      setLoading(true);
      const connection = new Connection(
        "https://api.devnet.solana.com",
        "confirmed"
      );
      const space = BigInt(Math.floor(bytes));
      const lamports = await connection.getMinimumBalanceForRentExemption(
        Number(space)
      );
      return lamports / 1000000000; // Convert to SOL
    } catch (error) {
      console.error("Error:", error);
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
    if (e.key === "Enter") {
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
      <div className="relative bg-gray-900/40 backdrop-blur-xl mb-10 rounded-2xl shadow-2xl p-8 max-w-xl w-full space-y-8 border border-gray-800/50">
        {/* Glass Reflection Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-2xl pointer-events-none"></div>

        <div className="space-y-3 relative">
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
        <div className="flex flex-col sm:flex-row items-center w-full">
          <div className="flex justify-center sm:justify-start w-full sm:w-auto">
            <svg
              width="262"
              height="40"
              viewBox="0 0 262 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-40 sm:w-48"
            >
              <g clipPath="url(#clip0_426_2717)">
                <path
                  d="M37.5657 8.15867V0.241028H7.53529C5.45069 0.241028 3.45147 1.06913 1.97743 2.54317C0.503398 4.0172 -0.324707 6.01643 -0.324707 8.10103V16.134C-0.324707 18.2186 0.503398 20.2178 1.97743 21.6918C3.45147 23.1658 5.45069 23.994 7.53529 23.994H31.3406V31.9064H0.241213V39.824H31.3983C33.4829 39.824 35.4821 38.9959 36.9561 37.5219C38.4302 36.0478 39.2583 34.0486 39.2583 31.964V23.9363C39.2583 21.8517 38.4302 19.8525 36.9561 18.3785C35.4821 16.9044 33.4829 16.0763 31.3983 16.0763H7.59293V8.15867H37.5657Z"
                  fill="white"
                />
                <path
                      d="M45.7451 8.10109V31.9641C45.7451 34.0487 46.5732 36.0479 48.0473 37.5219C49.5213 38.9959 51.5205 39.8241 53.6051 39.8241H77.4681C79.5527 39.8241 81.5519 38.9959 83.0259 37.5219C84.5 36.0479 85.3281 34.0487 85.3281 31.9641V8.10109C85.3281 6.01649 84.5 4.01727 83.0259 2.54323C81.5519 1.06919 79.5527 0.241089 77.4681 0.241089H53.6051C51.5205 0.241089 49.5213 1.06919 48.0473 2.54323C46.5732 4.01727 45.7451 6.01649 45.7451 8.10109ZM77.4104 31.9064H53.647V8.15873H77.3947L77.4104 31.9064Z"
                      fill="white"
                />
                <path
                  d="M129.952 8.10109V39.8241H137.87V26.8184H161.062V39.8241H168.974V8.10109C168.974 6.01649 168.146 4.01727 166.672 2.54323C165.198 1.06919 163.199 0.241089 161.114 0.241089H137.812C135.728 0.241089 133.728 1.06919 132.254 2.54323C130.78 4.01727 129.952 6.01649 129.952 8.10109ZM161.062 18.9007H137.875V8.15873H161.067L161.062 18.9007Z"
                  fill="white"
                />
                <path
                  d="M222.658 8.10109V39.8241H230.56V26.8184H253.747V39.8241H261.665V8.10109C261.665 6.01649 260.837 4.01727 259.363 2.54323C257.889 1.06919 255.889 0.241089 253.805 0.241089H230.518C228.434 0.241089 226.434 1.06919 224.96 2.54323C223.486 4.01727 222.658 6.01649 222.658 8.10109ZM253.758 18.9007H230.56V8.15873H253.747L253.758 18.9007Z"
                  fill="white"
                />
                <path
                  d="M207.703 0.241089V31.9064H204.559L193.178 3.53705C192.789 2.56471 192.119 1.73104 191.252 1.14356C190.385 0.55609 189.362 0.241752 188.315 0.241089H181.267C179.878 0.241089 178.545 0.793159 177.562 1.77585C176.579 2.75854 176.027 4.09135 176.027 5.48109V39.8241H183.924V8.15873H187.094L198.444 36.5333C198.834 37.5055 199.506 38.3387 200.373 38.9252C201.241 39.5118 202.265 39.8249 203.312 39.8241H210.36C211.75 39.8241 213.082 39.272 214.065 38.2893C215.048 37.3066 215.6 35.9738 215.6 34.5841V0.241089H207.703Z"
                  fill="white"
                />
                <path
                  d="M100.283 31.9064V0.241089H92.376V31.9641C92.376 34.0487 93.2041 36.0479 94.6781 37.5219C96.1522 38.9959 98.1514 39.8241 100.236 39.8241H124.041V31.9064H100.283Z"
                  fill="white"
                />

              </g>
              <defs>
                <clipPath id="clip0_426_2717">
                  <rect width="262" height="39.824" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <p className="text-gray-300 text-lg sm:text-2xl sm:ml-6 mt-2 sm:mt-0 text-center sm:text-left">
            Rent Calculator
          </p>
        </div>
        <div className="flex justify-center sm:justify-end w-full sm:w-auto">
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="text-[#9945FF] hover:text-[#14F195] transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
        </div>
      </div>

      {showInfo && (
        <div className="bg-gray-950/50 rounded-xl p-4 space-y-3 text-sm text-gray-300 border border-gray-800/50 backdrop-blur-sm">
          <p>
            <span className="text-[#9945FF] hover:text-[#14F195] font-semibold">
              What is Rent?{" "}
            </span>
            Rent is a mechanism that ensures efficient usage of Solana's
            blockchain resources by requiring accounts to maintain a minimum
            balance proportional to their data storage.
          </p>
          <p>
            <span className="text-[#9945FF] hover:text-[#14F195] font-semibold">Key Points:</span>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>Rent is refundable when an account is closed</li>
              <li>
                Accounts below the rent-exempt threshold may be removed
              </li>
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
                    className="w-full px-4 h-11 bg-gray-950/50 border border-gray-800 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition text-white placeholder-gray-400"
                    placeholder="Enter size"
                    min="1"
                  />
                </div>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="h-11 px-4 bg-gray-950/50 border border-gray-800 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition text-white appearance-none pr-8"
                  style={{ WebkitAppearance: "none" }}
                >
                  <option value="bytes">Bytes</option>
                  <option value="kb">KB</option>
                </select>
              </div>
              <div className="absolute -top-2 left-3 px-1 text-xs font-medium text-gray-300 bg-gray-900">
                Account Data Size
              </div>
            </div>

            <button
              onClick={handleCalculate}
              disabled={loading || !inputValue}
              className="w-full h-11 bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-[#14F195] hover:to-[#9945FF] text-white rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-[#9945FF] disabled:hover:to-[#14F195] transition-all duration-200 group relative overflow-hidden shadow-lg"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-white/10 to-blue-400/0 opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"></span>
              {loading ? "Calculating..." : "Calculate Rent"}
            </button>

            <div className="text-xs text-gray-300 text-center">
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
                  <p className="text-sm text-gray-300">
                    Required rent-exempt balance
                  </p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-[#9945FF] to-[#14F195] bg-clip-text text-transparent">
                    {rent.toFixed(9)} SOL
                  </p>
                </div>
                <p className="text-xs text-gray-300">
                  This is the minimum balance required to make your account
                  rent-exempt. Maintaining this balance ensures your account
                  won't be removed from the network.
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-white/[0.05] to-blue-400/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between text-xs relative">
          <div className="flex items-center space-x-2 text-gray-300">
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-lg shadow-green-500/20"></div>
            <span>Solana Devnet</span>
          </div>
          <a
            href="https://www.quicknode.com/guides/solana-development/getting-started/understanding-rent-on-solana"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-300 transition-colors"
          >
            Learn more about Solana rent →
          </a>
        </div>
      </div>
      <div className="flex absolute bottom-0 left-0 w-full mb-4 justify-center text-center py-2 bg-black text-sm text-gray-100">
      <a 
            href="https://x.com/Abultwitt" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-2 hover:text-indigo-600 transition-colors"
            >
            <span className={`
                text-sm font-medium
            `}>
                Developed by Abul
            </span>
            <Twitter 
                size={20} 
            />
            </a>
      </div>

      {/* <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0, 0) scale(1);
          }
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
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
      `}</style> */}
    </div>
    
  );
};

export default RentCalculator;
