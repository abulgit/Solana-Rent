import { useState, useCallback } from 'react';
import { Connection } from '@solana/web3.js';

interface RentCalculation {
  rent: number | null;
  loading: boolean;
  error: string | null;
}

export const useRentCalculator = () => {
  const [calculation, setCalculation] = useState<RentCalculation>({
    rent: null,
    loading: false,
    error: null
  });

  const convertToBytes = useCallback((value: string, unit: string): number => {
    const numValue = parseFloat(value);
    switch (unit) {
      case 'kb':
        return numValue * 1024;
      default:
        return numValue;
    }
  }, []);

  const calculateRent = useCallback(async (size: string, unit: string) => {
    try {
      setCalculation(prev => ({ ...prev, loading: true, error: null }));
      const bytes = convertToBytes(size, unit);
      
      if (isNaN(bytes)) {
        throw new Error('Please enter a valid number');
      }

      const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
      const space = BigInt(Math.floor(bytes));
      const lamports = await connection.getMinimumBalanceForRentExemption(Number(space));
      const solAmount = lamports / 1000000000;

      setCalculation({ rent: solAmount, loading: false, error: null });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to calculate rent';
      setCalculation({ rent: null, loading: false, error: message });
    }
  }, [convertToBytes]);

  return { ...calculation, calculateRent };
}; 