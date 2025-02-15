import React, { ChangeEvent, KeyboardEvent } from 'react';

interface RentInputsProps {
  size: string;
  unit: string;
  loading: boolean;
  onSizeChange: (value: string) => void;
  onUnitChange: (unit: string) => void;
  onCalculate: () => void;
}

export const RentInputs: React.FC<RentInputsProps> = ({
  size,
  unit,
  loading,
  onSizeChange,
  onUnitChange,
  onCalculate
}) => {
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onCalculate();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full">
          <label className="block text-gray-300 text-lg mb-2 ml-1" htmlFor="size-input">
            Storage Size
          </label>
          <input
            id="size-input"
            value={size}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onSizeChange(e.target.value)}
            onKeyDown={handleKeyPress}
            className="bg-gray-800/50 border-2 border-gray-700/30 rounded-xl w-full h-14 px-5 py-2 text-lg text-white 
                     focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20
                     transition-all duration-200 placeholder-gray-500"
            type="number"
            min="0"
            placeholder="Enter size"
            disabled={loading}
          />
        </div>
        <div className="w-full sm:w-auto relative z-10">
          <label 
            htmlFor="unit-select" 
            className="block text-gray-300 text-lg mb-2 ml-1 sr-only"
          >
            Storage Unit
          </label>
          <select
            id="unit-select"
            aria-label="Select storage unit"
            value={unit}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => onUnitChange(e.target.value)}
            className="bg-gray-800/50 border-2 border-gray-700/30 rounded-xl h-14 px-5 text-lg text-white 
                     focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20
                     transition-all duration-200 w-40 cursor-pointer appearance-none
                     bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSI2IDkgMTIgMTUgMTggOSIvPjwvc3ZnPg==')]
                     bg-no-repeat bg-[center_right_1rem]"
            disabled={loading}
          >
            <option value="bytes">Bytes</option>
            <option value="kb">Kilobytes</option>
          </select>
        </div>
      </div>

      <button
        onClick={onCalculate}
        className="group relative w-full bg-gradient-to-r from-purple-500 to-cyan-500 h-14 px-8 rounded-xl 
                 text-lg font-semibold text-white overflow-hidden transition-all duration-300
                 hover:shadow-lg hover:shadow-purple-500/20 disabled:opacity-50"
        disabled={loading}
      >
        <span className="relative z-10">{loading ? 'Calculating...' : 'Calculate Rent'}</span>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 opacity-0 
                       group-hover:opacity-100 transition-opacity duration-300"></div>
      </button>
    </div>
  );
}; 